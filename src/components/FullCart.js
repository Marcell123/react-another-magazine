import React from 'react';
import ReactDOM from 'react-dom';

const FullCart = (props) => {
	return(
		<div className="product-item-wrapper">
			<div className="product-item">
				<div className="item-remove"></div>
				<div className="item-img">
					{product.thumb}
				</div>
				<div className="item-info">
					<p className="item-name">{product.title}</p>
					<p className="item-desc">{product.style}</p>
					<p className="item-quantity">Quantity: 1</p>
				</div>
				<div className="price">
					<p>$ {product.price}</p>
				</div>
			</div>
		</div>
	);
}

export default FullCart;