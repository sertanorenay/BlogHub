export default function Post({_id, title, cover, content, createdAt, author}) {
	const coverUrl = `http://localhost:4000/${cover}`;
	const date = new Date(createdAt);
	const summary = content.substr(0,300); //

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};

	const formattedDate = date.toLocaleString('en-US', options);
	return (
		<div className="post">
			<div className="image">
				<img src={coverUrl} alt="" height="200"/>
			</div>
			<div className="post-content">
				<h2 className="Header">{title}</h2>
				<time>{formattedDate}</time>
				<p className="author">Author: {author.username}</p>
				{content}
			</div>
		</div>
	);
}