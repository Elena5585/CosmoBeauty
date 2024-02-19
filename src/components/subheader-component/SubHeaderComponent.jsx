import React from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from '../../store/authReducer.js';
import { setShowRoomAction , getShowRoomPageCountAction} from '../../store/showroomReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { setBurgerMenuStatusAction } from '../../store/headerReducer.js';
import BurgerMenuComponent from '../header-components/burgermenu-component/BurgerMenuComponent.jsx';
import { styles } from '../../styles/styles.js';
import './subheader.scss';

import "../../assets/icons/header_heart.svg";
import "../../assets/icons/hover_img.svg";
import "../../assets/icons/header_user.svg";
import "../../assets/icons/log-out.svg";
import "../../../src/assets/icons/log-in.svg";


export default function SubHeaderComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{pathname} = useLocation();

    const {basket} = useSelector(state=> state.basketReducer);    
    const {discounts} = useSelector(state => state.cardsReducer);    
    // const {viewed} = useSelector(state => state.personalReducer);

    const wishes = localStorage.getItem('wishes');
    const wishlists = JSON.parse(wishes);  
    
    // const baskets = localStorage.getItem('basket_storage');
    // const basketlist = JSON.parse(baskets);

    function logoutAcount(){
      dispatch(setAuthAction(false));
      localStorage.setItem('isAuth', false);
      // localStorage.setItem('viewed', JSON.stringify(viewed));
      navigate('/');       
    }

    function goToSale(array, title, status, info){
      dispatch(setShowRoomAction(array, title, status, info)); 
      dispatch(getShowRoomPageCountAction()); 
      setPageInfo(title);
    }   

    function setPageInfo(pageName){
      dispatch(setPageAction(pageName));
      localStorage.setItem('pageName', pageName);
    }     


  return (
    <div className='header__container'>
      <BurgerMenuComponent/>      
      <div className="header__content">          
          <div className="header__content-links">          
            <p style={styles.logoStyle} className="header_logo">CosmoBeauty</p>             
            <div className="header__links-block">
              <Link to="/" className={pathname === "/" ? 'header__links-link--active' : 'header__links-link'}
              style={pathname === "/" ? styles.headerLinkActive : styles.headerText}
                onClick={() => setPageInfo('home')}
              >Home</Link>
              <Link to="/about" className={pathname === "/about" ? 'header__links-link--active' :'header__links-link'} 
              style={pathname === "/about" ? styles.headerLinkActive : styles.headerText}
                onClick={() => {setPageInfo('about')}}
              >About</Link>            
              <Link to="/category" className={(pathname === "/category" || pathname === "/showroom") ? 'header__links-link--active' : 'header__links-link'} 
              style={(pathname === "/category" || pathname === "/showroom") ? styles.headerLinkActive : styles.headerText}
                onClick={() => {setPageInfo('category')}}
              >Categories</Link>
              <Link to="/discount" className={pathname === "/discount" ? 'header__links-link--active' : 'header__links-link'} 
              style={pathname === "/discount" ? styles.headerLinkActive : styles.headerText} 
                onClick={() => {goToSale(discounts, 'DISCOUNT', 'CATEGORY', 'Today on sale...')}}>Discount</Link>
              <Link to="/shop" 
                className={(pathname === "/shop" || pathname ==='/product') ? 'header__links-link--active' : 'header__links-link'} 
                style={(pathname === "/shop" || pathname ==='/product') ? styles.headerLinkActive : styles.headerText}
                onClick={() => { setPageInfo('shop')}}
              >Shop</Link>            
              <Link to="/contacts" className={pathname === "/contacts" ? 'header__links-link--active' :'header__links-link'} 
              style={pathname === "/contacts" ? styles.headerLinkActive : styles.headerText}
                onClick={() => { setPageInfo('contact')}}
              >Contact</Link>            
            </div>
          </div>
          <div className='header__links-block--burger' style={styles.titleStyle} onClick={() => dispatch(setBurgerMenuStatusAction(true))}>
            <span>Pages</span>
            <button type='button' className='header__links-burger--button'>&#9776;</button>
          </div>  
          {localStorage?.getItem('isAuth')  === 'true'  ? (
              <div className="header__content-indicators">            
                  <div className="header__indicators-item adaptive-hide">
                    <div className='header__item-wish specialPosition'>
                    {wishlists?.length ? (
                        <Link to="/wish" onClick={() => {setPageInfo('wishlist')}} className="header__indicators-item--link">
                          <img src="./assets/icons/header_heart.svg" alt="" className='header__item-icon specialSize' />
                          <img src="./assets/icons/hover_img.svg"  alt="" className={pathname === "/wish" ? 'header__item-icon--icon-active' : 'header__item-icon--icon'} style={styles.headerMessage} />
                        </Link>
                      ): (
                        <img src="./assets/icons/header_heart.svg" alt="" className='header__item-icon specialSize' />
                      )}
                      <div className='header__wish-block'>
                      {wishlists?.length ? (
                        <Link to="/wish" onClick={() => {setPageInfo('wishlist')}} className='header__wish-items' style={styles.headerCounter}>{wishlists?.length}</Link>
                      ):(
                        <div className='header__wish-items' style={styles.headerCounter}>{wishlists?.length || 0}</div>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className="header__indicators-item adaptive-hide" >
                  <div className='header__item-basket specialPosition'>
                    {basket?.length > 0 ? (
                        <Link to="/basket" onClick={() => { setPageInfo('cart')}} className="header__indicators-item--link">
                          <img src="./assets/icons/header_basket.svg" alt="" className='header__item-icon specialSize'/>
                          <img src="./assets/icons/hover_img.svg"  alt="" className={(pathname === "/basket" || pathname ==="/order") ? 'header__item-icon--icon-active' : 'header__item-icon--icon'} style={ styles.headerMessage} />
                        </Link>
                    ): (
                      <img src="./assets/icons/header_basket.svg" alt="" className='header__item-icon specialSize'/>
                    )}
                    <div className='header__basket-block'>
                    {basket?.length ? (
                      <Link to="/basket" onClick={() => {setPageInfo('cart')}} className='header__basket-items' style={styles.headerCounter}>{basket?.length}</Link>
                    ): (
                      <div className='header__basket-items' style={styles.headerCounter}>{basket?.length}</div>
                    )}
                    </div>
                  </div>
                  </div>
                  <div className="header__indicators-item adaptive-hide-image">             
                      {localStorage["image"] ? (
                        <Link to="/info" onClick={() => setPageInfo('profile form')} className="header__indicators-item--link">                    
                          <img src={localStorage["image"]}  alt="" className='header__item-icon--userImage' />                   
                        </Link>
                      ): (
                        <Link to="/info" onClick={() => { setPageInfo('profile form')}} className="header__indicators-item--link">
                          <img src="./assets/icons/header_user.svg"  alt="" className='header__item-icon' />
                          <img src="./assets/icons/hover_img.svg"  alt="" className={pathname === "/info" ? 'header__item-icon--icon-active image-padding' :  'header__item-icon--icon'} 
                          style={styles.headerMessage} />
                        </Link>
                      )}              
                  </div>
                  <div className='header__indicators-item' onClick={() => {logoutAcount();}}>
                    <img src="./assets/icons/log-out.svg" alt="" className='header__item-icon'/>
                  </div>
              </div>
          ):(
            <div className="header__content-indicators login-icon-item">              
                <Link to="/login" onClick={() => {setPageInfo('Login page');}} className="header__indicators-item--link">
                  <img src="./assets/icons/log-in.svg" alt="" className='header__item-icon login-icon' />                
                </Link>
              </div>
          )}          
      </div>
    </div>
  )
}
