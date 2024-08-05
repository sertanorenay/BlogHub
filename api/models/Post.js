const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
	title: {type: String, required: true, minlength: 2 },
	content: {type: String, required: true},
	//author: {type: Schema.Types.ObjectId, ref:'User'},
	cover:String
}, {
	timestamps: true
});

const PostModel = model('Post', PostSchema);
module.exports = PostModel;
