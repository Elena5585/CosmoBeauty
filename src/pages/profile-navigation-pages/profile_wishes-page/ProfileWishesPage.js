import React from 'react';
import { useSelector } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import ProfileComponent from "../../../components/profile-page-components/profile-component/ProfileComponent.jsx";
import MyWishcomponent from '../../../components/profile-page-components/mywish-component/MyWishcomponent.jsx';
import GalleryComponent from '../../../components/gallery-component/GalleryComponent.jsx';
import './profile-wishes.scss';

export default function ProfileWishesPage() {

	const viewed_storage = localStorage['viewed'];
	const viewed_items = JSON.parse(viewed_storage);

  return (
	<div className='profile-wishes'>
		<SubHeaderComponent />
      	<HeaderIntroComponent/>
		<section className="profile-wishes__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-wishes--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="profile-wishes--decor2"/>       
			<div className='profile-wishes__block'>
				<ProfileComponent/>
				<div className='profile-wishes-components'>
	          		<MyWishcomponent/>
	            	{viewed_items.length > 0 && (
						<div className='profile-wishes-components-gallery'>                  
							<GalleryComponent/>                 
						</div>
					)}					
	        	</div>
			</div>
      	</section>
	</div>
  )
}
