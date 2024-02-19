import React from 'react';
import { useLocation } from 'react-router-dom';
import { styles } from '../../styles/styles.js';
import './header-intro.scss';

export default function HeaderIntroComponent() {

	const {pathname} = useLocation();

	function changePageName(pathname){
		let pageTitle = '';

		if((pathname !== '/')
		&& (pathname !== '/about')
		&& (pathname !== '/basket')
		&& (pathname !== '/category')
		&& (pathname !== '/order')
		&& (pathname !== '/wish')
		&& (pathname !== '/shop')
		&& (pathname !== '/contacts')
		&& (pathname !== '/discount')
		&& (pathname !== '/info')
		&& (pathname !== '/myorders')
		&& (pathname !== '/mywish')
		&& (pathname !== '/subscribe')
		&& (pathname !== '/register')
		&& (pathname !== '/login')
		) pageTitle = '404 page!';

		if(pathname === '/')  pageTitle = 'Home page'; 
		if(pathname === '/about')  pageTitle = 'About'; 
		if(pathname === '/basket')  pageTitle = 'Cart';
		if(pathname === '/category') pageTitle = 'Category'; 
		if(pathname === '/order')  pageTitle = 'Checkout'; 
		if(pathname === '/wish') pageTitle = 'Wishlist'; 
		if(pathname === '/shop')  pageTitle = 'Shop'; 
		if(pathname === '/contacts')  pageTitle = 'Contact'; 
		if(pathname === '/discount')  pageTitle = 'Discount'; 
		if(pathname === '/info')  pageTitle = ' My Profile'; 
		if(pathname === '/myorders')  pageTitle = 'My orders'; 
		if(pathname === '/mywish')  pageTitle = 'My wishlist'; 
		if(pathname === '/subscribe')  pageTitle = 'My subscribtion'; 
		if((pathname === '/register') || (pathname === '/login'))  pageTitle = 'Profile Form'; 			
		return pageTitle;
	}
	

  return (
	<div className='header-intro'>
		<img src="./assets/damask_rose-background.png" alt="" className='header-intro_bg-decor'/>
		<img src="./assets/damask_rose-background.png" alt="" className='header-intro_bg-decor second-left'/>        
		<img src="./assets/damask_rose-background.png" alt="" className='header-intro__bg-decor left-right' />
		<img src="./assets/damask_rose-background.png" alt="" className='header-intro__bg-decor right' />
		<div className='header-intro-content'>
		<h3 className='header-intro__content-title' style={styles.titleStyle}>{changePageName(pathname)}</h3>
		<p className='header-intro__content-tracker' style={styles.headerText}>Home - <span id='tracker-red'>{changePageName(pathname)}</span></p>
		</div>
	</div>
  )
}
