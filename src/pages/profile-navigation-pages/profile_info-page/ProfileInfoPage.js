import React from 'react';
import { useSelector } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import ProfileComponent from "../../../components/profile-page-components/profile-component/ProfileComponent.jsx";
import MyInfoComponent from '../../../components/profile-page-components/myinfo-component/MyInfoComponent.jsx';
import GalleryComponent from '../../../components/gallery-component/GalleryComponent.jsx';
import './profile-info.scss';



export default function ProfileInfoPage() {

	const {viewed} = useSelector(state => state.cardsReducer);
	const viewed_storage = localStorage['viewed'];
	const viewed_items = JSON.parse(viewed_storage);

  return (
	<div className='profile-info'>
		<SubHeaderComponent />
      	<HeaderIntroComponent/>
		<section className="profile-info__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="profile__info--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="profile__info--decor2"/>       
			<div className='profile__info-block'>
				<div className='profile-info--links'>
					<ProfileComponent/>
				</div>
				<div className='profile__info-components'>
          			<MyInfoComponent /> 
          			<div className='profile__info-components-gallery'>
						{(viewed_items?.length || viewed.length) > 0 && (
							<GalleryComponent/>
						)}           
          			</div>          			    
        		</div>
			</div>
      </section>
	</div>
  )
}
