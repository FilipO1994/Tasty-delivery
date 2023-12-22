const Button = ({ children, textOnly, className, ...props }) => {
	const cssClassess = textOnly ? `text-button ${className}` : 'button'
	return <button className={cssClassess} {...props}>{children}</button>
}
export default Button