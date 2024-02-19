import React from 'react';
import { useSelector } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import ProfileComponent from "../../../components/profile-page-components/profile-component/ProfileComponent.jsx";
import MyOrdersComponent from '../../../components/profile-page-components/myorders-component/MyOrdersComponent.jsx';
import GalleryComponent from '../../../components/gallery-component/GalleryComponent.jsx';
import './profile-orders.scss';

export default function ProfileOrdersPage() {

	const viewed_storage = localStorage['viewed'];
	const viewed_items = JSON.parse(viewed_storage);

  return (
	<div className='profile-orders'>
		<SubHeaderComponent />
      	<HeaderIntroComponent/>
		<section className="profile-orders__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-orders--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-orders--decor2"/>       
			<div className='profile-orders-block'>
				<ProfileComponent/>
				<div className='profile-orders-components'>
          			<MyOrdersComponent/> 
          			<div className='profile-orders-components-gallery'>
						{viewed_items?.length > 0 && (
							<GalleryComponent/>
						)}           
          			</div>           			       
        		</div>
			</div>
      </section>
	</div>
  )
}
