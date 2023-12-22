import { useContext } from 'react'

import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
import logo from '../assets/logo.jpeg'

const Header = () => {
	const cartCtx = useContext(CartContext)
	const userProgressCtx = useContext(UserProgressContext)
	const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity
	}, 0)

	const handleShowCart = () => {
		userProgressCtx.showCart()
	}
	return (
		<header id="main-header">
			<div id="title">
				<img src={logo} alt="Logo" />
				<h1>Tasty delivery</h1>
			</div>
			<nav>
				<Button textOnly onClick={handleShowCart}>
					Cart({totalCartItems})
				</Button>
			</nav>
		</header>
	)
}
export default Header
