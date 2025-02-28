const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const {response} = require("express");

const SECRET_KEY = '7793B15EAC56DFC1D3EA5D021F6E1CB45F45C77DFB517A64DAB6C9F371D81249';
const CONNECTION_STRING = "mongodb+srv://sertan:SCBiMDMGGys5XhDK@blogcluster.909konm.mongodb.net/";

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/uploads', express.static(__dirname +  '/uploads'));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(CONNECTION_STRING).then(() => {
	console.log("Successfully Connected to the Database.");
}).catch(err => {
	console.error("Database Connection Error", err);
});

app.post('/register', async (req, res) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const {name, lastname, email, username, password} = req.body;
		const userDoc = await User.create({
			name,
			lastname,
			email,
			username,
			password: bcrypt.hashSync(password, salt)
		});
		console.log(userDoc);
		res.status(201).json(userDoc);
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(400).json({error: 'Error creating user'});
	}
});

app.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const userDoc = await User.findOne({username});

	if (bcrypt.compareSync(password, userDoc.password)) {
		jwt.sign({username, id: userDoc._id}, SECRET_KEY, {}, (err, token) => {
			if (err) throw err;
			res.cookie('token', token).json({
				id: userDoc._id,
				username
			});
		});
	} else {
		res.status(400).json("Password Didn't Matched.");
	}
});

app.get('/profile', (req, res) => {
	const {token} = req.cookies;
	jwt.verify(token, SECRET_KEY, {}, (err, info) => {
		if (err) throw err;
		res.json(info);
	});
});

app.post('/logout', (req, res) => {
	res.cookie('token', '').json('ok');
});

app.post('/post', upload.single('file'), async (req, res) => {
	let newPath = null;
	const {originalname, path} = req.file;
	if (typeof originalname === 'string') {
		const parts = originalname.split('.');
		const ext = parts[parts.length - 1];
		newPath = `${path}.${ext}`;
		fs.renameSync(path, newPath);
	}

	const {token} = req.cookies;
	jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
		if (err) throw err;
		const {title, summary, content} = req.body;
		const postDoc = await Post.create({
			title,
			summary,
			content,
			cover: newPath,
			author: info.id
		});
		res.json(postDoc);
	});
});

app.get('/post', async (req, res) => {
	const posts = await Post.find();
	res.json(
		await Post.find()
			.populate('author', ['username'])
			.sort({createdAt: -1})
			.limit(10)
	);
});

app.listen(4000, () => {
	console.log('Server running on port 4000');
});
