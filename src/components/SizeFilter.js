import React from 'react';
import ReactDOM from 'react-dom';
import Checkboxes from './Checkboxes';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];


class SizeFilter extends React.Component {
	/*there is no constructor and super because
    there is no initialized state and binded methods
  */

	componentDidMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {

    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    
    let filtered = Array.from(this.selectedCheckboxes);
      if(filtered.length == 0) {
      filtered = availableSizes;
    }
    this.props.updateFilters(filtered);

  };

  createCheckbox = label => (
    <Checkboxes
      classes="filters-available-size"
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => availableSizes.map(this.createCheckbox);
	render() {
		return(
			<div className="filters">
        <h4 className="title">Sizes:</h4>
        {this.createCheckboxes()}
      </div>
		);		
	}
}

export default SizeFilter;