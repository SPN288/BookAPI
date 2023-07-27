const mongoose = require("mongoose");
const publicationSchema = mongoose.Schema(
{
    pubid:Number,
    name:String,
    book:[String]
}
);

const publicationModal = mongoose.model("publication",publicationSchema);

module.exports= publicationModal;