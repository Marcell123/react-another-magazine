import React from 'react';
import ReactDOM from 'react-dom';

const CartClosed = (props) => {
	return(
		<span className="cart closed">
			<span className="cart-quantity">{props.quantity}</span>
		</span>
	);
}

export default CartClosed;