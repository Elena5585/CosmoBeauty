import React from 'react';
import { useSelector } from 'react-redux';
import RatingOutputComponent from '../rating-components/rating_output-component/RatingOutputComponent.jsx';
import { styles } from '../../styles/styles.js';
import './testimonialsdashboard.scss';

import '../../../src/assets/testimonials/Alex_Burn.jpg';
import '../../../src/assets/testimonials/Alexander_Swang.jpg';
import '../../../src/assets/testimonials/Amanda_Clement.jpg';
import '../../../src/assets/testimonials/Kate McClain.jpg';
import '../../../src/assets/testimonials/Larry_CaseBolt.jpg';
import '../../../src/assets/testimonials/Lisa_Taipor.jpg';
import '../../../src/assets/testimonials/Melissa_Jones.jpg';
import '../../../src/assets/testimonials/Renee.jpg';
import '../../../src/assets/testimonials/Steve Gentley.jpg';
import '../../../src/assets/testimonials/Yolande.jpg';
import '../../../src/assets/testimonials/Steven_Liverio.jpg';
import '../../../src/assets/profile/avatar.webp'

export default function TestimonialsDashboardComponent() {
	const {testimonials} = useSelector(state => state.testimonialReducer);
	const avatar = './assets/profile/avatar.webp';
	
  return (
	<div className='testimonials-dashboard'>
		{testimonials?.map((card, index) => (
			<div className='testimonials-dashboard__item' key={index + 1}>
				<div className='testimonials-dashboard__item-author'>
					<div className='testimonials-dashboard__author-image--block'>
						<img src={card.image || avatar} alt="" className='testimonials-dashboard__author-image'/>
					</div>
					<p className='testimonials-dashboard__author-name' style={styles.headerText}>{card.name}</p>
					<p className='testimonials-dashboard__author-date' style={styles.headerText}>{card.date}</p>
					<div className='testimonials-dashboard__author-rating'><RatingOutputComponent card={card.rating}/></div>
				</div>
				<p className='testimonials-dashboard__item-review' style={styles.headerText}>{card.review}</p>
			</div>
		))}
	</div>
  )
}
