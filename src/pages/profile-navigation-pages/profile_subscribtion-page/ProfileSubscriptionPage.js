import React from 'react';
import { useSelector } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import ProfileComponent from "../../../components/profile-page-components/profile-component/ProfileComponent.jsx";
import SubscriptionComponent from '../../../components/profile-page-components/subscription-component/SubscriptionComponent.jsx';
import LeaveAReviewComponent from '../../../components/leave_a_review-component/LeaveAReviewComponent.jsx';
import TestimonialsDashboardComponent from '../../../components/testimonials_dashboard-component/TestimonialsDashboardComponent.jsx';
import './profile-subscription.scss';

export default function ProfileSubscriptionPage() {
	const { testimonials} = useSelector(state => state.testimonialReducer)
  return (
	<div className='profile-subscription'>
		<SubHeaderComponent/>
		<HeaderIntroComponent/>
		<section className="profile-subscription__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-subscription--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-subscription--decor2"/>       
			<div className='profile-subscription-block'>
				<div className='profile-subscription--links'>
					<ProfileComponent/>   
				</div>      		
				<SubscriptionComponent/>		     		
			</div>
			<div className='profile-subscription__addition'>
			{testimonials?.length > 0 &&(              
				<TestimonialsDashboardComponent/>              
			)}          
            <LeaveAReviewComponent />         
        </div>
      </section>
	</div>
  )
}
