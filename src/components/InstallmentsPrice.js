import React from 'react';
import ReactDOM from 'react-dom';


const InstallmentsPrice = (props) => {
	const {installments, totalCartPrice} = props;
	const installmentsPrice =  (totalCartPrice/installments).toFixed(2);
	return(
		<small className="subprice-installment">
			{installments > 0 ? <span>OR UP TO {installments} x $ {installmentsPrice}</span> : null}
		</small>
	);
}

export default InstallmentsPrice;