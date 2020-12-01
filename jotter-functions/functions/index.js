const functions = require('firebase-functions');

const app = require("express")();

const fbAuth = require('./util/fbAuth');

const { getAllNotes, postNote } = require('./handlers/notes');
const { signUp, login, uploadImage } = require("./handlers/users");

// Note routes
app.get('/notes', getAllNotes);
app.post('/note', fbAuth, postNote);

// Users routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);

// fbAuth, middleware for protected routes

exports.api = functions.https.onRequest(app);

//1:47:16