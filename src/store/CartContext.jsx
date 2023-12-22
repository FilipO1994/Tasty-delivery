import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext({
	items: [],
	addItem: item => {},
	removeItem: id => {},
	clearCart: () => {},
})

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			const existingCartItemIndexAdd = state.items.findIndex(cartItem => cartItem.id === action.item.id)

			if (existingCartItemIndexAdd > -1) {
				const updatedItems = state.items.map(cartItem =>
					cartItem.id === action.item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
				)
				return { ...state, items: updatedItems }
			} else {
				return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] }
			}

		case 'REMOVE_ITEM':
			const existingCartItemIndexRemove = state.items.findIndex(cartItem => cartItem.id === action.id)
			const existingCartItem = state.items[existingCartItemIndexRemove]

			if (existingCartItem.quantity === 1) {
				return { ...state, items: state.items.filter(item => item.id !== action.id) }
			} else {
				const updatedItems = state.items.map(cartItem =>
					cartItem.id === action.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
				)
				return { ...state, items: updatedItems }
			}

		case 'CLEAR_CART':
			return { ...state, items: [] }

		default:
			return state
	}
}

export const CartContextProvider = ({ children }) => {
	const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

	const addItem = item => {
		dispatchCartAction({ type: 'ADD_ITEM', item })
	}

	const removeItem = id => {
		dispatchCartAction({ type: 'REMOVE_ITEM', id })
	}

	const clearCart = () => {
		dispatchCartAction({ type: 'CLEAR_CART' })
	}

	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
		clearCart,
	}

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export const useCart = () => {
	return useContext(CartContext)
}

export default CartContext
