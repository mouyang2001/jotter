const { admin, db } = require('../util/admin');

const getAllNotes = (req, res) => {
  db.collection("notes")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push({
          noteId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(notes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

const postNote = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newNote = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };

  db.collection("notes")
    .add(newNote)
    .then((doc) => {
      const resNote = newNote;
      resNote.noteId = doc.id;
      res.json(resNote);
    })
    .catch((err) => {
      res.status(500).json({ error: `something went wrong` });
      console.log(err);
    });
};

const getNote = (req, res) => {
  let noteData = {};
  const noteId = req.params.noteId.trim(); // very important to trim as a it adds in spaces randomly
  db.doc(`/notes/${noteId}`).get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Note not found" });
      }
      noteData = doc.data();
      noteData.noteId = doc.id;
      return db.collection("comments").where("noteId", "==", noteId).get();
      // TODO: comments .orderBy('createdAt', 'desc')
      // need index to build first
    })
    .then(data => {
      noteData.comments = [];
      data.forEach(doc => {
        noteData.comments.push(doc.data());
      });
      return res.json(noteData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
}

const commentOnNote = (req, res) => {
  if (req.body.body.trim() === '') return res.status(400).json({ error: 'Must not be empty'});
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    noteId: req.params.noteId.trim(),
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  }

  db.doc(`/notes/${req.params.noteId.trim()}`).get()
    .then(doc => {
      if (!doc.exists) res.status(404).json( {error:'Note not found'});
      return doc.ref.update({ commentCount: doc.data().commentCount + 1});
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
    })
}

const likeNote = (req, res) => {
  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('noteId', '==', req.params.noteId.trim()).limit(1);

  const noteDocument = db.doc(`/notes/${req.params.noteId.trim()}`);

  let noteData;
  noteDocument.get()
    .then(doc => {
      if (doc.exists) {
        noteData = doc.data();
        noteData.noteId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Note not found'});
      }
    })
    .then(data => {
      if (data.empty) {
        return db.collection('likes').add({
          noteId: req.params.noteId.trim(),
          userHandle: req.user.handle
        })
        .then(() => {
          noteData.likeCount++;
          return noteDocument.update({ likeCount: noteData.likeCount});
        })
        .then(() => {
          return res.json(noteData);
        });
      } else {
        return res.status(400).json({error: 'Note already liked'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code});
    });
}

const unlikeNote = (req, res) => {
    const likeDocument = db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("noteId", "==", req.params.noteId.trim())
      .limit(1);

    const noteDocument = db.doc(`/notes/${req.params.noteId.trim()}`);

    let noteData;
    noteDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          noteData = doc.data();
          noteData.noteId = doc.id;
          return likeDocument.get();
        } else {
          return res.status(404).json({ error: "Note not found" });
        }
      })
      .then((data) => {
        if (data.empty) {
          return res.status(400).json({ error: "Note not liked" });
        } else {
          return db.doc(`/likes/${data.docs[0].id}`).delete()
            .then(() => {
              noteData.likeCount--;
              return noteDocument.update({likeCount: noteData.likeCount});
            })
            .then(() => {
              res.json(noteData); 
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.code });
      });
}

module.exports = { getAllNotes, postNote, getNote, commentOnNote, likeNote, unlikeNote };
