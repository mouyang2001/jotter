const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require("express")();

admin.initializeApp();

const db = admin.firestore();

const firebaseConfig = {
    apiKey: "AIzaSyB48-JoBV2zK2SH2MC9EDSSK9MBQbvo2wY",
    authDomain: "jotter-8af9d.firebaseapp.com",
    databaseURL: "https://jotter-8af9d.firebaseio.com",
    projectId: "jotter-8af9d",
    storageBucket: "jotter-8af9d.appspot.com",
    messagingSenderId: "354747524983",
    appId: "1:354747524983:web:20d89c0ecd9e50175aa372"
  };

const firebase = require('firebase');
const { user } = require('firebase-functions/lib/providers/auth');
firebase.initializeApp(firebaseConfig);

// get all notes route
app.get('/notes', (req, res) => {
  db.collection('notes')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push({
          noteId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      }); 
      return res.json(notes);
    })
    .catch((err) => console.error(err));
});

// post a new note route
app.post('/note', (req, res) => {
  const newNote = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection("notes")
    .add(newNote)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: `something went wrong` });
      console.log(err);
    });
});

// helper functions
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

// sign up route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // validate input data
  let errors = {};
  if (isEmpty(newUser.email)) errors.email = "Email must not be empty";
  else if (!isEmail(newUser.email)) errors.email = 'Must be a valid email address';

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password != newUser.confirmPassword) errors.confirmPassword = 'passwords must match';
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";
  
  // if any errors pile up return response with errors
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  // validate data in database
  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({handle: 'handle already taken'});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };

      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({email: 'Email is already in use'});
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.https.onRequest(app);
