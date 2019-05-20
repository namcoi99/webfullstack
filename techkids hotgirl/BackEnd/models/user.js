
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true
	},
	avatar: String,
	name: String
}, {
	timestamps: true
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
