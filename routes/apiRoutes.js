const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the path to the db.json file
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// Read the notes from the db.json file
function getNotes() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Save the notes to the db.json file
function saveNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
}

router.get('/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = getNotes();
  newNote.id = Date.now().toString();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  saveNotes(updatedNotes);
  res.json({ message: 'Note deleted successfully.' });
});

module.exports = router;