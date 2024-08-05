export default function Post() {
	const now = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false, // Use 24-hour time format
	});
	const formattedDate = formatter.format(now);
	return (
			<div className="post">
				<div className="image">
					<img src="https://www.apollo-magazine.com/wp-content/uploads/2021/09/Web-lead-image_FINAL_Moreau.jpg?resize=900%2C600" alt="" height="200"/>
				</div>
				<div className="post-content">
					<h2 className="Header">First Post</h2>
					<time>{formattedDate}</time>
					<p className="text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet, atque
						blanditiis cupiditate debitis delectus enim ex explicabo fugit modi quidem
						ratione, tempore! Dolorum ducimus fugiat maiores obcaecati reiciendis vitae.
					</p>
				</div>
			</div>
	);
}