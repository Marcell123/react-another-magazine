import React from 'react';
import ReactDOM from 'react-dom';

class Checkboxes extends React.Component {
	constructor(props) {
		super(props);
		this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
		this.state = {
			isChecked: false
		};
	}

	toggleCheckboxChange() {
		const { handleCheckboxChange, label } = this.props;
		this.setState({
			isChecked: !this.state.isChecked
		});
		handleCheckboxChange(label);
	}

	render() {
		const { label, classes } = this.props;
    	const { isChecked } = this.state;
		return(
			<div className="size">
				<label>
					<input 
						type="checkbox"
						value={label}
						checked={this.state.isChecked}
						onChange={this.toggleCheckboxChange}
					/>
					<span className="sizeMark">{label}</span>
				</label>
			</div>
		);
	}
}

export default Checkboxes;