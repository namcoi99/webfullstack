
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const PostSchema = new Schema({
	author: {type: Schema.Types.ObjectId,ref: 'user' },
    post: String,
    view: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        require: true
    },
    like: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        require: true
    },
}, {
	timestamps: true
});

const PostModel = model("post", PostSchema);

module.exports = PostModel;
