import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Products from './components/Products';
import SizeFilter from './components/SizeFilter';
import Cart from './components/Cart';
import FullCart from './components/FullCart';
import './scss/style.scss';

class App extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.itemRemove = this.itemRemove.bind(this);
    this.getDecimal = this.getDecimal.bind(this);
    this.state = {
      products: {products: []},
      items: ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'],
      price: [],
      cart: [],
      quantity: 0,
      totalCartPrice: 0,
      installments: 0,
      installmentsPrice: 0
    };
  }

  getProducts() {
    let url = 'https://res.cloudinary.com/dssum2bol/raw/upload/v1551822356/products.json';
    axios.get(url).then(response => {
      this.setState({
          products: response.data,
          price: response.data.products
      });
    });
  }
  
  componentWillMount() {
    this.getProducts();
  }

  getDecimal(number) {
    //Grab decimal from price in order to set a styles on it
    //(handed over to Products=>Product component)

    let str = "" + number; // 1
    //Calculate decimal
    let decimal = (parseFloat(number) - Math.floor(number)).toFixed(2);

    //Grab zero before comma(when let decimal gives us 0 as a result)
    let zeroMatch = decimal.toString().indexOf('.');
    let zeroPos = str.indexOf("."); // 2
    let fixedDecimal = str.slice(zeroPos)

    if (zeroPos == -1) {
      //Get rid of zero before comma by turning it into a string
      str = decimal.slice(zeroMatch);
    } else {
      str = '.' + decimal.slice(zeroPos); // 4
    };

    return str;
  };

  formatPrice(a, b) {
    //(handed over to Products=>Product component)
    let num = (a / b);
    if( String(num).split('.').length < 2 || String(num).split('.')[1].length <= 2 ) {
      num = num.toFixed(2);
    } else {
      num = num.toFixed(2);
    };
    return num;
  };

  handleCheck(filter) {
    //Size filter on checkbox
    //(handed over to SizeFilter component)
    this.setState({
      items: filter
    });
  };

  handlePrice(filteredArr) {
    //Sort products on select value(asc/desc).
    //(handed over to Products component)
    this.setState({
      price: filteredArr
    });
  };

  handleAddToCart(selectedProducts) {
    // Add product to shopping cart
    //(handed over to Products=>Product component)

    let cartItems = this.state.cart;
    let productID = selectedProducts.id;

    //check in case the same product is added
    if(this.checkProduct(productID)) {
      let index = cartItems.findIndex(x => x.id == productID);

      //item quantity counter
      cartItems[index].quantity += 1;

      /*calculate item price including it's quantity
      (in order to calculate cart price later)*/
      let totalItemPrice = cartItems[index].price * cartItems[index].quantity;
      cartItems[index].totalprice = totalItemPrice;

      this.setState({
        cart: cartItems,
        quantity: cartItems[index].quantity,
      });
    } else {
      selectedProducts.quantity = 1;
      selectedProducts.totalprice = selectedProducts.price;     
      cartItems.push(selectedProducts);
    }

    //amount counter which represents cart quantity at all
    let amount = 0;
    let cartPrice = 0;
    cartItems.map(qty => {
        amount += qty.quantity;
        cartPrice += qty.totalprice;
    });

    //calculate cart price
    let totalCartPrice = (Math.round(cartPrice*100)/100);

    this.setState({
      cart: cartItems,
      quantity: amount,
      totalCartPrice: totalCartPrice,
      installments: selectedProducts.installments,
    });

  };

  itemRemove(id, amount, price, e) {
    //(handed over to Cart component)
    let cart = this.state.cart;
    let quantity = this.state.quantity;
    let totalprice = this.state.totalCartPrice;
    let test = amount;
    let index = cart.findIndex(x => x.id == id);
    let totalItemPrice = price * amount;

    //remove item price that was deleted from totalCartPrice
    let removeItemPrice = (Math.round( (totalprice - totalItemPrice) * 100) /100);

    //reset item quantity to 1 after removing it from cart
    cart[index].quantity = 1;
    cart.splice(index, 1);
    this.setState({
      cart: cart,
      quantity: quantity - amount,
      totalCartPrice: removeItemPrice
    });
    e.preventDefault();
  };

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }

  render() {
    return(
      <div className="main">
        <SizeFilter 
          updateFilters={this.handleCheck}
        />
        <Products
          addToCart={this.handleAddToCart} 
          productsList={this.state.products}
          updateFilters={this.state.items}
          updatePrice={this.handlePrice}
          updateSort={this.state.price}
          itemQuantity={this.state.itemQuantity}
          getDecimal={this.getDecimal}
          formatPrice={this.formatPrice}
        />
        <Cart 
          cartItems={this.state.cart}
          itemRemove={this.itemRemove}
          quantity={this.state.quantity}
          totalCartPrice={this.state.totalCartPrice}
          installments={this.state.installments}
        />
      </div>
    );
  }
}

ReactDOM.render( <App /> , document.getElementById('root') );