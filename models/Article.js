const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const articleSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  publisher: {
    type: String,
    required: true,
  },
  privacy: {
    type: String,
    default: "private",
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
