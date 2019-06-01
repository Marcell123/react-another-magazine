import React from 'react';
import ReactDOM from 'react-dom';

const Thumb = (props) => {
	return(
		<div className="thumb">
			<img src={props.src} alt={props.title}/>
		</div>
	);
}

export default Thumb;