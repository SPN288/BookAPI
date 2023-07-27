const mongoose = require("mongoose");
const authorSchema = mongoose.Schema(
    {
        authorid: Number,
        name: String,
        book: [String]
    }
);

const authorModal = mongoose.model("authors", authorSchema);

module.exports = authorModal;