import React from 'react';
import { getSaleprice } from '../../../utils/Utils.js';
import { styles } from '../../../styles/styles.js';
import './basketcomponent.scss';

export default function BasketComponent() {
	const basket_items = JSON.parse(localStorage["basket"]);
  return (
	<div className='basket-component'>
		<h3 className='basket-component__title' style={styles.titleStyle}>Your Order</h3>
		<div className='basket-component__block'>
			{basket_items?.map((item, index) => (
				<div className='basket-component__block-item' key={index}>
					<img src={item?.image} alt="" className='basket-component__item-image'/>
					<div className='basket-component__item-info'>
						<h4 className='basket-component__info-title' style={styles.titleStyle}>{item?.title?.toLowerCase()}  <span style={styles.headerText}>x {item?.order}</span></h4>
						<p className='basket-component__info-price' style={styles.headerText}>${getSaleprice(item)}</p>
						<p className='basket-component__info-sku' style={styles.headerText}>SKU: CB {item?.id}</p>
					</div>
				</div>
			))}
		</div>
	</div>
  )
}
