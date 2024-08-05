const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
	name: { type: String, required: true, minlength: 2 },
	lastname: { type: String, required: true, minlength: 2 },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 }
});

const UserModel = model('User', UserSchema);
module.exports = UserModel;