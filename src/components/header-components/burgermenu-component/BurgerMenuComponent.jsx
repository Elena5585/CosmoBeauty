import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAction } from '../../../store/pageReducer.js';
import { setBurgerMenuStatusAction } from '../../../store/headerReducer.js';
import { setShowRoomAction, getShowRoomPageCountAction } from '../../../store/showroomReducer.js';
import { styles } from '../../../styles/styles.js';
import './burgermenu.scss';

import "../../../assets/icons/header_basket.svg";

export default function BurgerMenuComponent() {

	const dispatch = useDispatch();
	const {basket} = useSelector(state=> state.basketReducer); 
	const {isBurger} = useSelector(state=> state.headerReducer); 
	const {discounts} = useSelector(state => state.cardsReducer);  	
	
	function setPageInfo(pageName){
		dispatch(setPageAction(pageName));
		localStorage.setItem('pageName', pageName);
	}
	function goToSale(array, title, status, info){
		dispatch(setShowRoomAction(array, title, status, info)); 
		dispatch(getShowRoomPageCountAction()); 
		setPageInfo(title);
	  } 

  return (
	<div className='burger-menu'>
		{isBurger && (
			<div className='burger-menu__content'>
				<div className='burger-menu__content-logo'>
					<h2 style={styles.logoStyle} className="burger-menu__logo-logo">CosmoBeauty</h2>
					{localStorage?.getItem('isAuth')  === 'true'  && (
						<div className='burger-menu__logo-basket'>					
							<div className='burger-menu__basket-item'>
								{basket?.length > 0 ? (
									<Link to="/basket" onClick={() => { setPageInfo('cart')}} className="burger-menu__basket-link">
										<img src="../../../../src/assets/icons/header_basket.svg" alt="" className='burger-menu__basket-link'/>									
									</Link>
								): (
									<img src="../../../../src/assets/icons/header_basket.svg" alt="" className='burger-menu__basket-link'/>
								)}
								<div className='burger-menu__basket-quantities'>
									{basket?.length > 0 ? (
										<Link to="/basket" onClick={() => {setPageInfo('cart')}} className='burger-menu__quantities-link' style={styles.headerCounter}>{basket?.length}</Link>
									): (
										<div className='burger-menu__quantities-link' style={styles.headerCounter}>{basket?.length}</div>
									)}
								</div>
							</div>
						</div>	
					)}				
					<button className='burger-menu__logo-btn' style={styles.headerText} onClick={() => dispatch(setBurgerMenuStatusAction(false))}>X</button>
				</div>
				<div className='burger-menu__content-links'>
					<Link to="/" className='burger-menu__links-link' style={styles.titleStyle}  onClick={() => {setPageInfo('home'); dispatch(setBurgerMenuStatusAction(false));}}>Home</Link>
					<Link to="/about" className='burger-menu__links-link' style={styles.titleStyle} onClick={() => {setPageInfo('about'); dispatch(setBurgerMenuStatusAction(false));}}>About</Link>
					<Link to="/category" className='burger-menu__links-link' style={styles.titleStyle} onClick={() => {setPageInfo('category'); dispatch(setBurgerMenuStatusAction(false));}}>Category</Link>
					<Link to="/discount" className='burger-menu__links-link' style={styles.titleStyle} 
						onClick={() => {goToSale(discounts, 'DISCOUNT', 'CATEGORY', 'Today on sale...'); dispatch(setBurgerMenuStatusAction(false));}}>
						Discount
					</Link>
					<Link to="/shop" className='burger-menu__links-link' style={styles.titleStyle}  onClick={() => { setPageInfo('shop'); dispatch(setBurgerMenuStatusAction(false));}}>Shop</Link>
					<Link to="/contacts" className='burger-menu__links-link' style={styles.titleStyle} onClick={() => { setPageInfo('contact'); dispatch(setBurgerMenuStatusAction(false));}}>Contact us</Link>
					<Link to="/info" className='burger-menu__links-link' style={styles.titleStyle} onClick={() => {setPageInfo('profile form'); dispatch(setBurgerMenuStatusAction(false));}}>Your account</Link>					
				</div>
			</div>
		)}
	</div>
  )
}
