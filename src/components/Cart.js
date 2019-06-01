import React from 'react';
import ReactDOM from 'react-dom';
import EmptyCart from '../empty/EmptyCart';
import Thumb from './Thumb';
import CartClosed from './CartClosed.js';
import CartScrollBar from './CartScrollBar.js';
import InstallmentsPrice from './InstallmentsPrice.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { findDOMNode } from "react-dom";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCart: true,
			cart: this.props.cartItems
		};
		this.openCart = this.openCart.bind(this);
	};

	openCart(e) {
		this.setState({
			showCart: !this.state.showCart
		});
	}

	render() {
		const {itemRemove, quantity, totalCartPrice, installments} = this.props;
		let cartItems;
		cartItems = this.state.cart.map(product => {
			return(
				
			<CSSTransition key={product.id} classNames={'fade'} timeout={{enter:300, exit: 100}}>		
				<div className="product-item-wrapper">
					<div className="product-item">
						<div 
							className="item-remove"
							onClick={itemRemove.bind(this, product.id, product.quantity, product.price)}
						>
						</div>
						<div className="item-img">
							{product.thumb}
						</div>
						<div className="item-info">
							<p className="item-name">{product.title}</p>
							<p className="item-desc">{product.availableSizes[0]} | {product.style}</p>
							<p className="item-quantity">Quantity: {product.quantity}</p>
						</div>
						<div className="price">
							<p>$ {product.price.toFixed(2)}</p>
						</div>
					</div>
				</div>
			</CSSTransition>		
			);
		});
		let view;
		if(cartItems.length <= 0) {
			view = <EmptyCart />
		} else {
			view = (
				<TransitionGroup component="ul" style={{paddingBottom: 200 + 'px'}}>
					{cartItems}
				</TransitionGroup>
			)
		}

		return(
			<div 
				className={!this.state.showCart ? "whole-wrapper" : "whole-wrapper closed"} ref="cartList"
			>
				<div className="item-list">
					<div 
						className={!this.state.showCart ? 'open' : 'close'}
						onClick={this.openCart}
					>
					{this.state.showCart ? <CartClosed quantity={this.props.quantity}/> : 'X'}
					</div>

					<CartScrollBar>
						<div className="cart-header">
							<span className="cart">
								<span className="cart-quantity">{quantity}</span>
							</span>
							<span className="header-title">Cart</span>
						</div>
						<React.Fragment>{view}</React.Fragment>
					</CartScrollBar>

					<div className="cart-footer">
						<div className="subtotal">subtotal</div>
						<div className="subprice">
							<p className="subprice-value">$ {(totalCartPrice).toFixed(2)}</p>
							{totalCartPrice == 0 ? null : <InstallmentsPrice installments={installments}
							 totalCartPrice={totalCartPrice}/>}
						</div>
						<div className="checkout">checkout</div>
					</div>
				</div>
			</div>
		);

		
	}
}

export default Cart;