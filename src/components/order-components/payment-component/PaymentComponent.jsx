import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { PayPalButton } from "react-paypal-button-v2";
import { addPaymentWayAction } from '../../../store/personalReducer.js';
import { styles } from '../../../styles/styles.js';
import './payment.scss';


export default function PaymentComponent() {

	const dispatch = useDispatch();	
	const [checked, setChecked] = useState({card: false, paypal: false, cash: false});	
	const [payment, setPayment] = useState({
		number: "",
		name: "",
		expiry: "",
		cvc: "",		
		focus: ""		
	  });	  

	  const handleInputFocus = (e) => {
		setPayment((prev) => ({ ...prev, focus: e.target.name }));
	  }	
	  const { name, number, expiry, cvc, focus } = payment;

	  const [cardMessage, setCardMessage] = useState('');

	  function checkCardNumber(){		
		if(number.length >= 16){setPayment({...payment, number:number.slice(0, 16)});}
	  }
	  function checkCVCCode(){		
		if(cvc.length >= 3){setPayment({...payment, cvc:cvc.slice(0, 3)});}
	  }	

	  function checkCardFilling(e){
		e.preventDefault();
		if(payment.number && payment.name && payment.cvc && payment.expiry){
		if((payment.number.length === 16) && (payment.name.length >2) && (payment.expiry.match(/\d{2}\/\d{2}/)) && (payment.cvc.match(/\d{3}/)) ){
			const cardInfo = {number: payment.number, name: payment.name, expiry: payment.expiry, cvc: payment.cvc}
			localStorage.setItem('card', JSON.stringify(cardInfo));			
			setCardMessage('Your card information has been successfully saved!');
			setTimeout(() => {
				setCardMessage('')
			}, 3000);
		}else {
			setCardMessage('Check your card information');
			setTimeout(() => {
				setCardMessage('')
			}, 3000);
		}
		}else {
			setCardMessage('Fill empty fields!')
			setTimeout(() => {
				setCardMessage('')
			}, 3000);
		}
	  }

	  useEffect(() => {checkCardNumber()}, [number]);
	  useEffect(() => {checkCVCCode()}, [cvc]);	  
	
  return (
	<div className='payment'>
		<div className='payment__item'>
			<h3 className='payment__item-title' style={styles.titleStyle}>Payment Methods</h3>				
			<div className='payment__item-block'>	
				<div className='payment__block-item' style={checked.card ===true ? {backgroundColor: "#FAF9FF"} :{ backgroundColor: "#FFFFFF"}}>
					<div className='payment__block-title--block' style={checked.card === true ? styles.cardTitleStyle : styles.titleStyle}>
						<div className='payment__block-item--check' onClick={() => 	
							{setChecked({card: !checked.card, paypal: false, cash: false});							
							 dispatch(addPaymentWayAction('card'));												 
							 }}>
							{checked.card === true && (
								<div className='payment__item-check--checked'></div>
							)}
						</div>
						<h3 className='payment__block-item--title' style={styles.titleStyle}>Credit card <span className='payment-indicator' >i</span></h3>						
					</div>
					{checked.card === true && (						
						<div className='payment__block-item--form-block'>
							<div className='payment__block-item--cards'>
								<Cards className='payment__block-item--card' number={number} name={name} expiry={expiry} cvc={cvc} focused={focus}/>
							</div>
							<form className="payment__block-item-form">
								<div className="payment__form-input--block">										
									<input type="number" name="number" className="payment__form-input" placeholder="Card Number" pattern="[\d]{16}" required value={number}
									 onChange={(e) => setPayment({...payment, number: e.target.value})} onFocus={handleInputFocus}  style={styles.headerText} />									
								</div>
								<div className="payment__form-input--block">
									<input type="text" name="name" className="payment__form-input" placeholder="Card Holder Name" required value={name} 
									onChange={(e) => setPayment({...payment, name: e.target.value})} onFocus={handleInputFocus}  style={styles.headerText}/>
								</div>
								<div className="payment__form-input--block">
									<div className="col-6">
										<input type="tel" name="expiry" className="payment__form-input--half" placeholder="Valid Thru" pattern="\d\d/\d\d" value={expiry} required 
										onChange={(e) => setPayment({...payment, expiry: e.target.value})} onFocus={handleInputFocus} style={styles.headerText}/>
									</div>
									<div className="col-6">
										<input type="tel" name="cvc" className="payment__form-input--half" placeholder="CVC" pattern="[\d]{3}" required value={cvc}
										onChange={(e) => setPayment({...payment, cvc: e.target.value})} onFocus={handleInputFocus} style={styles.headerText}/>
									</div>
								</div>																
								<button className="payment__form-btn" style={styles.headerMessage} onClick={(e) => checkCardFilling(e)}>Confirm</button>	
								<p style={styles.headerText} className ="payment__form-message">{cardMessage}</p>								
							</form>
						</div>					
					)}
				</div>					
				<div className='payment__block-item'  style={checked.paypal ===true ? {backgroundColor: "#FAF9FF"} :{ backgroundColor: "#FFFFFF"}}>
					<div className='payment__block-title--block' style={checked.paypal === true ? styles.cardTitleStyle : styles.titleStyle}>
						<div className='payment__block-item--check' onClick={() => 
							{setChecked({card: false, paypal: !checked.paypal, cash: false});							 
							 dispatch(addPaymentWayAction('paypal'));							 						 
							}}>
							{checked.paypal === true && (
								<div className='payment__item-check--checked'></div>
							)}
						</div>
						<h3 className='payment__block-item--title' style={styles.titleStyle}>PayPal <span className='payment-indicator' >i</span></h3>
					</div>
					{checked.paypal === true && (
						<div className='payment__block-item--paypal'>
							<PayPalButton 
							amount="0.01"							
							onSuccess={(details, data) => {
							  alert("Transaction completed by " + details.payer.name.given_name);
							 
							  return fetch("/paypal-transaction-complete", {
								method: "post",
								body: JSON.stringify({
								  orderID: data.orderID
								})
							  });
							}}
						  />
						</div>						
					)}
				</div>					
				<div className='payment__block-item' style={checked.cash ===true ? {backgroundColor: "#FAF9FF"} :{ backgroundColor: "#FFFFFF"}}>
					<div className='payment__block-title--block' style={styles.titleStyle}>
						<div className='payment__block-item--check' onClick={() => 
							{setChecked({card: false, paypal: false, cash: !checked.cash});							
							 dispatch(addPaymentWayAction('cash'));					 							 
							}}>
							{checked.cash === true && (
								<div className='payment__item-check--checked'></div>
							)}
						</div>
						<h3 className='payment__block-item--title' style={styles.titleStyle}>Cash payment <span className='payment-indicator' >i</span></h3>
					</div>
				</div>					
			</div>
		</div>		
	</div>
  )
}
