export default function Post({title, cover, content, createdAt}) {
	const coverUrl = `http://localhost:4000/${cover}`;
	const date = new Date(createdAt);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};

	const formattedDate = date.toLocaleString('en-US', options);
// 					src="https://artrkl.com/cdn/shop/articles/gustave_moreau_-_perseus_and_andromeda_1870-1701383579564.jpg?v=1701384275&width=1100"
	return (
		<div className="post">
			<div className="image">
				<img src={coverUrl} alt="" height="200"/>
			</div>
			<div className="post-content">
				<h2 className="Header">{title}</h2>
				<time>{formattedDate}</time>
				<p className="text">{content}</p>
			</div>
		</div>
	);
}