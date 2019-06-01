import React from 'react';
import ReactDOM from 'react-dom';
import Thumb from './Thumb';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedProduct: {}}
	}

	addToCart(style, title, price, id, thumb, installments, availableSizes) {
		this.setState(
			{
				selectedProduct: {
					style: style,
					title: title,
					price: price,
					id: id,
					thumb: thumb,
					installments: installments,
					availableSizes: availableSizes
				},
			},
			function() {
				this.props.addToCart(this.state.selectedProduct);
			}
		);
	}

	render() {
		
		const {id, title, style, price, currency, installments} = this.props;
		const {productSku, currencyFormat, isFreeShipping, availableSizes} = this.props;
		const thumb = <Thumb src={require(`../img/products/${productSku}_1.jpg`)} />;

		const integer = parseInt(price);

		return(
			<div className="product">
				<div
					className={!isFreeShipping ? '' : 'free'}
				>
					{!isFreeShipping ? '' : 'Free shipping'}
				</div>
				<Thumb src={require(`../img/products/${productSku}_1.jpg`)} />
				<p className="product-title">{title}</p>
				<div className="value">
					<div className="price-wrapper">
						<div className="price-value">
							<small>{currencyFormat}</small>
							<b>{integer}</b>
					    <span>{this.props.getDecimal(price)}</span>
						</div>
					</div>
					<div className="installments-wrapper">
						<div className="installments-value">
							{installments > 0 ? 
								<React.Fragment>
									<span>or {installments} x</span>
									<b>{currencyFormat}{this.props.formatPrice(price, installments)}</b>
								</React.Fragment>
									:
								null
							}
						</div>
					</div>
				</div>
				<div 
					className="buy-btn"
					onClick={this.addToCart.bind(
						this,
						style,
						title,
						price,
						id,
						thumb,
						installments,
						availableSizes
					)}
				>
					Add to cart
				</div>
			</div>
		);
	}
}

export default Product;