import React from 'react';
import { getSaleprice } from '../../../utils/Utils.js';
import { styles } from '../../../styles/styles.js';
import './order-view.scss';


export default function OrderViewComponent({order}) {
	
	const paymentItem = localStorage.getItem('paymentinfo');
    const paymentInfo = JSON.parse(paymentItem);

	
	
	function getOrderAmount(){	
		
		let total = 0;
		order.forEach((item) => {
		  total += item.amount;			   
		}); 
		return total.toFixed(1); 
	}

	function setDeliveryStatus(index) {
		const today = new Date().getDate();
		const month = new Date().getMonth();		
		if((Number(paymentInfo[index]?.delivery_date[0]) < Number(today)) && (Number(paymentInfo[index]?.delivery_date[1]) <= Number(month))){ return `Successfully delivered`}
		else {return `On the way`};		
	}

  return (
	<div className='order-view'>
		{order?.map((item, index) => (
			<div className="order-view__body-item" key={index + 1}>
				<div className='order-view__item-product'>
				<img src={item?.image} alt="" className='order-view__product-image'/>
				<div className='order-view__product-info'>
					<p className='order-view__product-info--title' style={styles.titleStyle}>
						{item?.title?.toLowerCase()} 
						<span id='adaptive-order-quantity' style={styles.titleStyle}> x {item?.order}</span>
					</p>                        
					<p className='order-view__product-info--sku' style={styles.headerText}>SKU: IN23{item?.id}</p>
				</div>                                            
				</div>
				{item?.sale > 0 ?(
					<div className='order-view__item-price'>
						<p className='order-view__price-old' style={styles.headerText}>${item?.price}</p>
						<p className='order-view__price-new' style={styles.headerText}>${getSaleprice(item)}</p>
					</div>
					) : (
					<div className='order-view__item-price'>
						<p className='order-view__price-new' style={styles.headerText}>${item?.price}</p>                      
					</div>
				)} 
				<div className='order-view__item-quantity'style={styles.headerText}>{item?.order}</div>
				<div className='order-view__item-delivery' style={styles.headerText}>
					{localStorage['deliverydate']} / {localStorage['deliverymonth']} / {localStorage['deliveryyear']}
					<span id='adaptive-order-status' style={styles.titleStyle}> {setDeliveryStatus(index)}</span>
				</div>			  
			  	<div className='order-view__item-status'style={styles.headerText}>{setDeliveryStatus(index)}</div>		
		  	</div>
		))}
		<div className='order-view__item-amount' style={styles.headerText}>Amount: ${getOrderAmount()}</div>	
	</div>
  )
}
