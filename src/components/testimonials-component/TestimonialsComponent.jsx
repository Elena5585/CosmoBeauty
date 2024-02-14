import React, {useState} from 'react';
import {useSelector } from 'react-redux';
import NotFound from '../NotFound-component/NotFoundComponent.jsx';
import { styles } from '../../styles/styles.js';
import './testimonials.scss';


export default function TestimonialsComponent() {
	
	const {testimonials} = useSelector(state => state.testimonialReducer);
	const [firstItem, setFirstItem] = useState(0);	

	function getNextNewItem(){
		if(firstItem < testimonials.length - 1){
		  setFirstItem(firstItem + 1);		  
		}
	  }
	
	function getPreviousNewItem(){
	if(firstItem > 0){
		setFirstItem(firstItem - 1);		  
	}
	}	

	return (
	<div className='testimonials'>
		<div className="testimonials__btn-block">
			<button className="testimonials__block-btn--item" style={firstItem >= 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999'}} 
				onClick={getPreviousNewItem}>&#10094;</button>
        </div>
		{testimonials.length > 0 ? (
			<div className='testimonials__items'>
				<div className='testimonials__items-header'>
					<h3 style={styles.logoStyle} className="testimonials__header-logo">They say</h3>
					<h2 style={styles.titleStyle} className="testimonials__header-title">testimonials</h2>
				</div>	
				<div className='testimonials__items-body' style={styles.titleStyle}>
					"{testimonials[firstItem]?.review}"
				</div>	
				<div className='testimonials__items-footer'>
					<img src={testimonials[firstItem]?.image} alt="" className='testimonials__footer-indicator'/>
					<p style={styles.titleStyle} className="testimonials__footer-title">{testimonials[firstItem]?.name}</p>
				</div>	
			</div>
		): (
			<NotFound/>
		)}
		<div className="testimonials__btn-block">
			<button className="testimonials__block-btn--item" style={firstItem < testimonials.length - 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999'}} 
			onClick={getNextNewItem}>&#10095;</button>
		</div>
	</div>
  )
}
