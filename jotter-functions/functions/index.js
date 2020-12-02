// database notes:
// documents 4MB max
// keep subcollections to a minimum
const functions = require('firebase-functions');

const app = require("express")();

const fbAuth = require('./util/fbAuth');

const { getAllNotes, postNote, getNote, commentOnNote, likeNote, unlikeNote } = require('./handlers/notes');
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser } = require("./handlers/users");

// Note routes
app.get('/notes', getAllNotes);
app.post('/note', fbAuth, postNote);
app.get('/note/:noteId', getNote);
app.post('/note/:noteId/comment', fbAuth, commentOnNote);
app.get('/note/:noteId/like', fbAuth, likeNote);
app.get('/note/:noteId/unlike', fbAuth, unlikeNote);
// 3:20:37 delete note;
// colons for route parameters

// Users routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getAuthenticatedUser);

// **fbAuth, middleware for protected routes

exports.api = functions.https.onRequest(app);
