const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  description: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  userID: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
