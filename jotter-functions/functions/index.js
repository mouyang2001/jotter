const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require("express");
const app = express();

//41:45

app.get('/notes', (req, res) => {
  admin
    .firestore()
    .collection('notes')
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

app.post('/note', (req, res) => {
  const newNote = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection("notes")
    .add(newNote)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: `something went wrong` });
      console.log(err);
    });
});

exports.api = functions.https.onRequest(app);
