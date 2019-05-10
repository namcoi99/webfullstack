
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// _id
const NameSchema = new Schema({
    name1: { type: String, required: true },
    name2: { type: String, required: true },
    name3: { type: String, required: true },
    name4: { type: String, required: true }
}, {
	// _id: false,
	// versionKey: false,
	timestamps: true // createdAt & updatedAt
});

const NameModel = model("question", NameSchema);

module.exports = NameModel;
