const functions = require('firebase-functions');

const app = require("express")();

const fbAuth = require('./util/fbAuth');

const { getAllNotes, postNote } = require('./handlers/notes');
const { signUp, login } = require("./handlers/users");

// Note routes
app.get('/notes', getAllNotes);
app.post('/note', fbAuth, postNote);

// Users routes
app.post('/signup', signUp);
app.post('/login', login);

exports.api = functions.https.onRequest(app);
