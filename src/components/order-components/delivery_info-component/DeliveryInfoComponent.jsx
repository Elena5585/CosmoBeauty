import React, { useState, useEffect } from 'react';
import { styles } from '../../../styles/styles.js';
import './delivery-info.scss';

export default function DeliveryInfoComponent() {

	const [note, setNote] = useState('');

	function setDeliveryDay(){
        let today = new Date(); 
		let delivery_date =  today.getDate() + 10;
		let delivery_month = today.getMonth() + 1;
		let delivery_year = today.getFullYear();		

		if(delivery_date > 30){delivery_date -= 30; delivery_month++;}
		if(delivery_month > 12){delivery_year++;};	
		    
        let delivery_day = `${delivery_date} / ${delivery_month} / ${delivery_year}`;   
		localStorage.setItem('deliverydate', delivery_date); 		
		localStorage.setItem('deliverymonth', delivery_month); 		
		localStorage.setItem('deliveryyear', delivery_year); 		
        return delivery_day;   }

	useEffect(() => {localStorage.setItem('note', note)}, []);
	
  return (
	<div className='delivery-info'>
		<div className='delivery-info__item'>
			<h3 className='delivery-info__item-title' style={styles.titleStyle}>Info about you</h3>
			<div className='delivery-info__item-tip'>**You can change your personal information in your account!</div>
			<div className='delivery-info__item-block'>
				<p className='delivery-info__block-item' style={styles.headerText}>Your name: <span>{localStorage["name"]}</span></p>
				<p className='delivery-info__block-item' style={styles.headerText}>Your last name: <span>{localStorage["lastname"]}</span></p>				
				<p className='delivery-info__block-item' style={styles.headerText}>Your phone: <span>{localStorage["phone"]}</span></p>
				<p className='delivery-info__block-item' style={styles.headerText}>Your email: <span>{localStorage["email"]}</span></p>				
			</div>
		</div>
		<div className='delivery-info__item'>			
			<h3 className='delivery-info__item-title' style={styles.titleStyle}>Delivery Info</h3>
			<div className='delivery-info__item-tip'>**You can change your delivery information in your account!</div>
			<div className='delivery-info__item-block'>
			<p className='delivery-info__block-item' style={styles.headerText}>Your country: <span>{localStorage["country"]}</span></p>
				<div className='delivery-info__item-flex'>
					<p className='delivery-info__block-item item-flex' style={styles.headerText}>Your region: <span>{localStorage["region"]}</span></p>
					<p className='delivery-info__block-item item-flex' style={styles.headerText}>Your city: <span>{localStorage["city"]}</span></p>
				</div>
				<p className='delivery-info__block-item' style={styles.headerText}>Your address: <span>{localStorage["address"]}</span></p>
				<div className='delivery-info__item-flex'>
					<p className='delivery-info__block-item item-flex' style={styles.headerText}>Delivery date: <span>{setDeliveryDay()}</span></p>
					<p className='delivery-info__block-item item-flex' style={styles.headerText}>Delivery time: <span>10AM - 5PM</span></p>
				</div>
			</div>
		</div>
		<div className='delivery-info__item'>
			<h3 className='delivery-info__item-title' style={styles.titleStyle}>Note</h3>
			<textarea className='delivery-info__item-note' style={styles.headerText} value={note} onChange={(e) => {setNote(e.target.value); localStorage.setItem("note", e.target.value)}}>				
			</textarea>
		</div>
	</div>
  )
}
