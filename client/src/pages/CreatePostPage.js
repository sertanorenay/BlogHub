import {UserContext} from "../UserContext";
import {useContext, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
//import {model} from "mongoose";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
import {Form, Navigate} from "react-router-dom";

export default function CreatePostPage() {
	//const {setUserInfo} = useContext(UserContext);

	const [title, setTitle] = useState('');
	const [files, setFiles] = useState(null);
	const [content, setContent] = useState('');

	const modules = {
		toolbar: [
			[{font: []}],
			[{header: [1, 2, 3, 4, 5, 6, false]}],
			["bold", "italic", "underline", "strike"],
			[{color: []}, {background: []}],
			[{script: "sub"}, {script: "super"}],
			["blockquote", "code-block"],
			[{list: "ordered"}, {list: "bullet"}],
			[{indent: "-1"}, {indent: "+1"}, {align: []}],
			["link", "image", "video"],
			["clean"],
		]
	};

	const formats = ["header", "bold", "italic", "underline", "strike", "blockquote",
		"list", "bullet", "indent", "link", "image", "color", "clean",];

	async function createPost(ev) {
		ev.preventDefault();
		const data = new FormData();
		data.set('title', title);
		data.set('file', files[0]);
		data.set('content', content);

		const response = await fetch('http://localhost:4000/post', {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	return (
		<form onSubmit={createPost}>
			<div>
				<input type="text"
				       placeholder="Enter the post title."
				       value={title}
				       onChange={ev => setTitle(ev.target.value)}/>
				<input type="file"
				       onChange={ev => setFiles(ev.target.files)}/>
				<ReactQuill value={content}
				            modules={modules}
				            formats={formats}
				            onChange={newValue => setContent(newValue)}/>
			</div>
			<div>
				<button>Post</button>
			</div>
		</form>
	);
}
