import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowRoomAction, getShowRoomPageCountAction } from '../../store/showroomReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { styles } from '../../styles/styles.js';
import './footer.scss';


import '../../assets/cards/master_card.svg';
import '../../assets/cards/pay_pal.svg';
import '../../assets/cards/payoneer.svg';
import '../../assets/cards/visa.svg';
import "../../assets/icons/geo_position.svg";
import "../../assets/icons/phone.svg";
import "../../assets/icons/mail.svg";


export default function FooterComponent() {

  const dispatch = useDispatch();
  const {bodycare, skincare, haircare, spa, makeup} = useSelector(state => state.cardsReducer);
  const {discounts} = useSelector(state => state.cardsReducer);

  function goToCategory(array, title, status, info, pageName){     
    dispatch(setShowRoomAction(array, title, status, info)); 
    dispatch(getShowRoomPageCountAction()); 
    setPageInfo(pageName);   
  } 

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }

  return (
    <footer className='footer'>      
        <div className='footer__header'>
          <h3 className='footer__header-logo' style={styles.logoStyle}>CosmoBeauty</h3>
          <div className='footer__header-payment'>
            <p className='footer__payment-title' style={styles.headerText}>Payment methods:</p>
            <div className='footer__payment-ways'>
              <img src="./assets/cards/visa.svg" alt="" className='footer__ways-card--type'/>
              <img src="./assets/cards/master_card.svg" alt="" className='footer__ways-card--type'/>
              <img src="./assets/cards/pay_pal.svg" alt="" className='footer__ways-card--type'/>
              <img src="./assets/cards/payoneer.svg" alt="" className='footer__ways-card--type'/>
            </div>
          </div>
        </div>      
      <div className='footer__body'>
          <div className='footer__body-block'>
            <h3 className='footer__block-title' style={styles.titleStyle}>About</h3>
            <div className='footer__block-list'>
              <Link to="/" className='footer__list-link' style={styles.headerText}
              onClick={() => {setPageInfo("home"); window.scrollTo(0,0);}} 
              ><span id='arrow'>&#707;</span> Home</Link> 
              <Link to="/about" className='footer__list-link' style={styles.headerText}
              onClick={() => {setPageInfo("about"); window.scrollTo(0,0);}} 
              ><span id='arrow'>&#707;</span>  About us</Link>
              <Link to="/category" className='footer__list-link' style={styles.headerText}
              onClick={() => {setPageInfo("category"); window.scrollTo(0,0);}} 
              ><span id='arrow'>&#707;</span>  Categories</Link>              
              <Link to="/discount" className='footer__list-link' style={styles.headerText}
              onClick={() => {goToCategory(discounts, 'DISCOUNT', 'CATEGORY', 'Today on sale...', 'discount'); window.scrollTo(0, 0)}}
              ><span id='arrow'>&#707;</span>on Sale</Link>              
              <Link to="/shop" className='footer__list-link' style={styles.headerText}
              onClick={() => {setPageInfo("shop"); window.scrollTo(0,0);}} 
              ><span id='arrow'>&#707;</span>  Shop</Link> 
              <Link to="/contacts" className='footer__list-link' style={styles.headerText}
              onClick={() => {setPageInfo("contact"); window.scrollTo(0,0);}} 
              ><span id='arrow'>&#707;</span>Contact us</Link> 
            </div>
          </div>
          <div className='footer__body-block'>
            <h3 className='footer__block-title' style={styles.titleStyle}>Categories</h3>
            <div className='footer__block-list'>
                <Link to="/showroom" className='footer__list-link' style={styles.headerText}
                onClick={() => {goToCategory(makeup, 'MAKE UP', 'CATEGORY', 
                  "Clean, cruelty-free face makeup that's powered by plants and loved by all.", 'category', 'category'); window.scrollTo(0, 0);}}
                ><span id='arrow'>&#707;</span>Make Up</Link>
                <Link to="/showroom" className='footer__list-link' style={styles.headerText} 
                  onClick={() => {goToCategory(spa, 'SPA', 'CATEGORY',           
                  "Natural body creams and products with organic ingredients that contain the most effective ingredients and the best and selected plant extracts from around the world. Natural body products to gently moisturize, cleanse and scent.", 'category'); window.scrollTo(0, 0);}}               
                ><span id='arrow'>&#707;</span>SPA</Link>              
                <Link to="/showroom" className='footer__list-link' style={styles.headerText}
                onClick={()=> {goToCategory(bodycare, 'BODY CARE', 'CATEGORY', 
                  "Natural cosmetics for the care of the body, the result of the most advanced research. Natural body creams and products with organic ingredients that contain the most effective elements and the best plant extracts selected from all over the world. Natural products to hydrate, cleanse and perfume with tenderness.", 'category', 'category'); window.scrollTo(0, 0);}}
                ><span id='arrow'>&#707;</span>Body Care</Link>
                <Link to="/showroom" className='footer__list-link' style={styles.headerText}
                 onClick={()=> {goToCategory(skincare, 'SKIN CARE', 'CATEGORY', 
                "Natural products for the beauty of the face, developed with the most advanced cosmetic technologies and the best ingredients. Natural creams for the face, face serums and masks formulated with the most effective natural and organic extracts, such as Blueberry, Unicellular Waters, Argan oil, Chianti wine and Hyaluronic Acid, to better meet the requirements of every type of skin", 'category', 'category'); window.scrollTo(0, 0);}}
                ><span id='arrow'>&#707;</span>Skin Care</Link>
                <Link to="/showroom" className='footer__list-link' style={styles.headerText}
                  onClick={() => {goToCategory(haircare, 'HAIR CARE', 'CATEGORY', 
                  "Naturally beautiful, strong and shiny hair. A complete range of natural hair products formulated with organic ingredients and phytoextracts to guarantee effectiveness and gentleness. Natural treatments specific for any type of hair and any requirement, also for the little ones.", 'category', 'category');window.scrollTo(0, 0);}}
                ><span id='arrow'>&#707;</span> Hair Care</Link>                
            </div>
          </div>
          <div className='footer__body-block'>
            <h3 className='footer__block-title' style={styles.titleStyle}>Contact</h3>
            <div className='footer__block-contacts'>
              <div className='footer__contacts-item'>
                <img src="./assets/icons/geo_position.svg" alt="" className='footer__item-img'/>
                <p className='footer__item-text' style={styles.headerText}>27 Division St, New York,
                  NY 10002, USA</p>
              </div>
              <div className='footer__contacts-item'>
                <img src="./assets/icons/phone.svg" alt="" className='footer__item-img'/>
                <p className='footer__item-phone' style={styles.headerMessage}>+1 345 99 71 345
                    +1 345 74 64 975</p>
              </div>
              <div className='footer__contacts-item'>
                <img src="./assets/icons/mail.svg" alt="" className='footer__item-img'/>
                <p className='footer__item-text' style={styles.headerText}>info@cosmobeauty.com</p>
              </div>
            </div>
          </div>          
      </div>
      <div className='footer__footer'>
        <p style={styles.headerText} className="footer__footer-content">&#9400; All rights reserved. CosmoBeauty 2023</p>
      </div>
    </footer>
  )
}
