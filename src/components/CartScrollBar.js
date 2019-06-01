import React from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';

class CartScrollBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		const positions = this.refs.scrollbars.getValues();
	}

	render() {
		return(
			<Scrollbars
			 ref="scrollbars" 
			 renderTrackVertical={props => <div {...props} className="track-vertical"/>}
			 renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
				{this.props.children}
			</Scrollbars>
		);
	}
}

export default CartScrollBar;