import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import Selectbox from './Select';

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: '', label: ''};
		this.handleOnChange = this.handleOnChange.bind(this);
	};

	handleOnChange(e) {
		//Sort products on select value(asc/desc)

		const event = e.target.value;
		const index = e.nativeEvent.target.selectedIndex;
    	const label = e.nativeEvent.target[index].text;

		const products = this.props.productsList.products;
		const updateSort = this.props.updateSort;
		
		//array with sorted prices
		const copy = [];
		for (let key in products) {
		  copy[key] = products[key];
		};

		//conditional sorting functions which depends on user's chosen select 
		{event === 'lowestprice' && copy.sort((a, b) => a.price - b.price)};
		{event === 'highestprice' && copy.sort((a, b) => b.price - a.price)};
		
		this.setState(
			{
				value: event,
				label: label
			},
			//pass sorted array of objects(products) to main component in order to update it's state
			() => {
				this.props.updatePrice(copy);
			}
		);
	};


	render() {
		const products = this.props.productsList.products;
		const updateFilters = this.props.updateFilters;
		let x;
		const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
		

		const optionsMock = [
		  { value: '', label: 'Select' },
		  { value: 'lowestprice', label: 'Lowest to highest' },
		  { value: 'highestprice', label: 'Highest to lowest' }
		];

		//filtering function
		function finalFiltered(updateFilters) {
			return function(x) {
				return x.availableSizes.some(function(v) { return updateFilters.indexOf(v) != -1; }) || !availableSizes;			
			};
		};

		//sorted array of objects
		let productsData = this.props.updateSort
		//filter this array on user's chosen size(checkboxes)
		.filter(finalFiltered(updateFilters))
		//render sorted and filtered products
		.map(product => {
			return(
				<Product 
					key={product.id}
					sku={product.sku}
					id={product.id}
					title={product.title}
					description={product.description}
					availableSizes={product.availableSizes}
					style={product.style}
					price={product.price}
					installments={product.installments}
					currencyId={product.currencyId}
					currencyFormat={product.currencyFormat}
					productSku={product.sku}
					isFreeShipping={product.isFreeShipping}
					addToCart={this.props.addToCart}
					getDecimal={this.props.getDecimal}
					formatPrice={this.props.formatPrice}
				/>
			);
		})
	


		return(
			<div className="products-wrapper">
				<div className="products-header">
					<small className="products-found">
						<span>{products.length} Product(s) found.</span>
					</small>
					<Selectbox
						options={optionsMock} 
						handleOnChange={this.handleOnChange}
						value={this.state.value}
					/>
				</div>
				<div className="products">
					{productsData}
				</div>
			</div>
		);
	}
}

export default Products;