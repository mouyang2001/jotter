// database notes:
// documents 4MB max
// keep subcollections to a minimum
const functions = require('firebase-functions');
const app = require("express")();
const fbAuth = require('./util/fbAuth');

const { admin, db } = require("./util/admin");

const {
  getAllNotes,
  postNote,
  getNote,
  commentOnNote,
  likeNote,
  unlikeNote,
  deleteNote
} = require("./handlers/notes");

const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");

// Note routes
app.get('/notes', getAllNotes);
app.post('/note', fbAuth, postNote);
app.get('/note/:noteId', getNote);
app.post('/note/:noteId/comment', fbAuth, commentOnNote);
app.get('/note/:noteId/like', fbAuth, likeNote);
app.get('/note/:noteId/unlike', fbAuth, unlikeNote);
app.delete('/note/:noteId/', fbAuth, deleteNote);
// colons for route parameters

// Users routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', fbAuth, markNotificationsRead);

// **fbAuth, middleware for protected routes

exports.api = functions.https.onRequest(app);

// database triggers
exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/notes/${snapshot.data().noteId.trim()}`).get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            noteId: doc.id
          })
        }
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnlike = functions
  .firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
        return;
      })
  });

exports.createNotificaionOnComment = functions
  .firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/notes/${snapshot.data().noteId.trim()}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            noteId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions
  .firestore
  .document('/users/{userId}')
  .onUpdate((change) => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      const batch = db.batch();
      return db
        .collection("notes")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const note = db.doc(`/notes/${doc.id}`);
            batch.update(note, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  })

exports.onNoteDelete = functions.firestore.document('/notes/{noteId}')
  .onDelete((snapshot, context) => {
    const noteId = context.params.noteId;
    const batch = db.batch();
    return db.collection("comments").where("noteId", "==", noteId).get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("noteId", "==", noteId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db.collection("notifications").where("noteId", "==", noteId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => {console.error(err)});
  })