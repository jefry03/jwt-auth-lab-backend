const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    entryBody: {
        type: String,
        maxlength: 350,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;

