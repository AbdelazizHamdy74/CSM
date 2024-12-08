const express = require("express");
const noteController = require("./controller"); // Adjust path as needed

const router = express.Router();

router.post(
  "/",
  noteController.uploadAttachNote,
  noteController.resizeAttachNote,
  noteController.addNote
);

router.get("/", noteController.getAllNotes);

module.exports = router;