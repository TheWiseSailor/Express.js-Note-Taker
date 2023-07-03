// Declare router variable and store variable express.Router() and db store 
// Require express and router
const router = require("express").Router();
const store = require("../db/db.json");
const path = require('path');
// request existing notes from the db.json file
router.get("/notes", function (_req, res) {
    // get notes from the db.json file
    res.sendFile(path.join(__dirname, '../db/db.json'))

//  store.getNotes()
//         // send notes if there are no errors
//         .then(notes => res.json(notes))
//         // send err if there is an error
//         .catch(err => res.status(500).json(err));
});
// posting note function route
router.post("/notes", (req, res) => {
    console.log(req.body);
    store.addNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(500).json(err))
});
// delete note function route
router.delete("/notes/:id", (req, res) => {
    store.removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
});
// export router
module.exports = router;