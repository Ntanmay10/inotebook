const express = require('express');
const router = express.Router();
//const multer = require('multer');
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const multipart = require('connect-multiparty');

// ROUTE 1 : Get All The Notes of Loggd In user using : GET "/api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//file upload
router.post('/upload', multipart({ uploadDir: './uploadfiles' }), function (req, res) {
    // don't forget to dlete all req.files when done
    res.send({ name: req.files.file.name, path: req.files.file.path });
});

// ROUTE 2 : Adding Notes of Logged In user using : POST "/api/notes/addnote" Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter A Valid Title').isLength({ min: 3 }),
    body('description', 'Description Must Be Minimum 6 Character Long').isLength({ min: 6 })
], async (req, res) => {
    try {

        const { title, description, tag, fileName, filePath } = req.body;

        //if there are errors,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, fileName, filePath, user: req.user.id
        })
        const saveNote = await note.save()

        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 3: Update A Note Using :PUT ""/api/notes/updatenote" Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create A New Note Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the Note to Be Updated and Update It
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        };
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 4: Delete A Note Using :Delete ""/api/notes/deletenote" Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the Note to Be Deleted And Delete It
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        };

        //Allow Deletion Only If User Owns The Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has Been Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router