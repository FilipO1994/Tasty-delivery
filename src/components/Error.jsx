const Error = ({ title, message }) => {
	return (
		<div className="error">
			<h2>{title}</h2>
			<h2>{message}</h2>
		</div>
	)
}
export default Error
