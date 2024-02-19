import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import SubHeaderComponent from "../../../components/subheader-component/SubHeaderComponent.jsx";
import HeaderIntroComponent from '../../../components/header_intro-component/HeaderIntroComponent.jsx';
import LoginComponent from '../../../components/profile-page-components/login-component/LoginComponent.jsx';
import { setPageAction } from '../../../store/pageReducer.js';
import './loginpage.scss';

export default function LoginPage() {

	const dispatch = useDispatch();

	function setPageInfo(pageName){
		dispatch(setPageAction(pageName));
		localStorage.setItem('pageName', pageName);
	}
	useEffect(() => {setPageInfo('Login form');}, []);	
	
  return (
	<div className='login-page'>
		<SubHeaderComponent />
     	<HeaderIntroComponent/>
		 <section className="login-page__body">
			<img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className="login-page__body--decor"/>        
			<img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className="login-page__body--decor2"/>		
			<div className="login-page__body-block">				
				<div className='login-page__body-block--component'>
					<LoginComponent/>
				</div>			
			</div>      
      	</section>
	</div>
  )
}
