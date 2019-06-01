import React from 'react';
import ReactDOM from 'react-dom';

const Select = (props) => {

	const createOptions = (options) =>
    options.map(o => (
      <option value={o.value} key={o.value}>
        {o.label}
      </option>
    ));

	const { classes, options } = props;
	
	return(
		<div className="sort">
			Order by 
			<select value={props.value} onChange={props.handleOnChange}>
				{createOptions(options)}
			</select>
		</div>
	);

}

export default Select;