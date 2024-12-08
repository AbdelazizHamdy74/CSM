const knex = require("../../db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../../utlis/appError");
const catchAsync = require("../../utlis/catchAsync");

// Configure multer for in-memory storage and image-only uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    cb(
      null,
      file.mimetype.startsWith("image") ||
        new AppError("Only images allowed.", 400)
    );
  },
  limits: { files: 3 },
});

// Middleware to handle file upload errors
exports.uploadAttachNote = (req, res, next) => {
  upload.array("noteAttachment", 3)(req, res, next);
};

// Helper to process image resizing and saving
const processImage = async (file, filename) => {
  if (!file) return;

  file.filename = filename; // Set filename on the file object
  await sharp(file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`public/attach-note/${filename}`);
};

// Middleware to resize images and set custom filenames
exports.resizeAttachNote = catchAsync(async (req, res, next) => {
  await Promise.all(
    (req.files || []).map((file, index) => {
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const filename = `note-${timestamp}-${index}.jpeg`;
      file.filename = filename; // Assign filename here for later use

      return processImage(file, filename);
    })
  );
  next();
});

// Controller function to add a new note with optional attachments
exports.addNote = catchAsync(async (req, res) => {
  const { text, userId } = req.body;
  const noteId = uuidv4();

  // Insert the note into the database
  await knex("notes").insert({
    id: noteId,
    text,
    users_id: userId,
    isDeleted: false,
  });

  // Prepare and insert attachments if files were uploaded
  const attachments = (req.files || []).map((file) => ({
    id: uuidv4(),
    notes_id: noteId,
    images: `/attach-note/${file.filename}`,
    isDeleted: false,
  }));

  if (attachments.length) {
    await knex("attachment_notes").insert(attachments);
  }

  res.status(201).json({
    message: "Note created successfully",
    note: {
      noteId,
      text,
      images: attachments.map((a) => a.images),
    },
  });
});
exports.getAllNotes=async(req,res)=>{
    try {
    const notes= await knex('notes').select('*').where({isDeleted:false}); ;
     res.status(200).json({success:true,data:notes});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to retrieve notes",error:error.message});
    }
};