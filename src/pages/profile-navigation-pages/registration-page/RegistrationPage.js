import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import RegistrationModalComponent from "../../../components/profile-page-components/registration-component/RegistrationModalComponent.jsx";
import { setPageAction } from '../../../store/pageReducer.js';
import './registration.scss';

export default function RegistrationPage() {

	const dispatch = useDispatch();
	
	function setPageInfo(pageName){
		dispatch(setPageAction(pageName));
		localStorage.setItem('pageName', pageName);
	}

	useEffect(() => {setPageInfo('Register form');}, []);	

  return (
	<div className='registration-page'>
		<SubHeaderComponent />
     	<HeaderIntroComponent/>
		<section className="registration-page__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="registration-page__body--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="registration-page__body--decor2"/>		
			<div className="registration-page__body-block">			
				<div className='registration-page__body-block--component'>
					<RegistrationModalComponent />
				</div>			
			</div>      
      	</section>
	</div>
  )
}
