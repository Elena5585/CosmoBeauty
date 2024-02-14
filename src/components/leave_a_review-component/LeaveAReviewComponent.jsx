import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RatingInputComponent from '../rating-components/rating_input-component/RatingInputComponent.jsx';
import { addTestimonialAction } from '../../store/testimonialReducer.js';
import { styles } from '../../styles/styles.js';
import './leaveReview.scss';

import "../../assets/icons/leave_review.svg";

export default function LeaveAReviewComponent() {
	const dispatch = useDispatch();	
	const [comment, setComment] = useState({user:  "", email:  "" , rating: "", review: ""});
	const {testimonials} = useSelector(state => state.testimonialReducer);
	const {rating} = useSelector(state => state.testimonialReducer);
	const [formMessage, setFormMessage] = useState('');
	const avatar = '../../assets/profile/avatar.webp';

	

	function sendTestimonial(e){		
		e.preventDefault();			
		if ((comment.user || localStorage['lastname']) && (comment.email || localStorage['email']) && comment.review) {
			if((comment.user.length >= 3) || ((localStorage['lastname'].length >=1) && (localStorage['name'].length >=1))) {
				const emailRegExp = /^\S+@\S+\.\S+$/g;
				if ((comment.email.match(emailRegExp)) || (localStorage['email'].match(emailRegExp))){
					let today_date = new Date();
					let date = today_date.getDate();
					let month = today_date.toLocaleString('en', {month: 'long'});
					let year = today_date.getFullYear();
					const testimonial = {
						id: `${testimonials.length + 1}${(comment?.user?.slice(0,2).toUpperCase()) || (localStorage['lastname']?.slice(0,2).toUpperCase())}`,
						name: comment.user || `${localStorage['name']} ${localStorage['lastname']}`,
						email: comment.email || localStorage['email'],
						date: `${month} ${date}, ${year}`,
						rating: Number(rating),
						review: comment.review,
						image: localStorage['image'] || avatar,
					}				
					dispatch(addTestimonialAction(testimonial));
					setFormMessage('Your message has been sent successfully!');
					setTimeout(() => {
						setFormMessage("");
					}, 3000);			
					setComment({user: "", email: "", rating: "", review: ""});

				}else {
					setFormMessage("Enter correct email");
					setTimeout(() => {
						setFormMessage("");
					}, 3000);
				}

			}else {
				setFormMessage("Enter correct  user name");
				setTimeout(() => {
				setFormMessage("");
				}, 3000);
			}
		}else {
			setFormMessage("Enter empty fields");
			setTimeout(() => {
				setFormMessage("");
			}, 3000);			
		}		
	}	

  return (
	<div className='leave-comment'>		
		<div className='leave-comment__block-item'>
			<h2 className='leave-comment__item-title' style={styles.titleStyle}>Leave a review</h2>
			<p className='leave-comment__item-text' style={styles.headerText}>Your email address will not be published.</p>
			<div className='leave-comment__rating-block'><RatingInputComponent/></div>
		</div>
		<form action="#" name='comment' className='leave-comment__block-form' onSubmit={(e) => sendTestimonial(e)}>			
			<input type="text" className='leave-comment__form-input' style={styles.headerText} 
				placeholder={(localStorage['name'] && localStorage['lastname']) ? `${localStorage['name']} ${localStorage['lastname']}` : 'Enter your first name and last name...'}
				value={comment.user} onChange={(e) => setComment({...comment, user: e.target.value})}/>
			<input type="email" className='leave-comment__form-input' style={styles.headerText} 
				placeholder={localStorage['email']  ? `${localStorage['email']}` : 'Enter your email...'}
				value={comment.email} onChange={(e) => setComment({...comment, email: e.target.value})}/>			
			<input type="text" className='leave-comment__form-input input-review' placeholder='Enter your review...' style={styles.headerText}
				value={comment.review} onChange={(e) => setComment({...comment, review: e.target.value})}/>	
			<button type="submit" className='leave-comment__form-btn' style={styles.headerMessage}>SEND</button>		
			<p className='leave-comment__form-message' style={styles.headerMessage}>{formMessage}</p>				
		</form>
		<img src="../../../src/assets/icons/leave_review.svg" alt="" className='leave-comment__icon'/>
		<img src="../../../src/assets/bodycare/GiardinoAgrumiCremaManiPiedi.png" alt="" className='leave-comment__image'/>		
	</div>
  )
}
