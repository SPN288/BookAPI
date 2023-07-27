const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        language: String,
        numpage: Number,
        author: [Number],
        publications: [Number],
        category: [String]
    }
);

const bookModal = mongoose.model("books", BookSchema);

module.exports = bookModal;