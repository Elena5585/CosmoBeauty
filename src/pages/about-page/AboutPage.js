import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import StayInTouchComponent from '../../components/stay_intouch-component/StayInTouchComponent.jsx';
import FeaturesComponent from '../../components/features-component/FeaturesComponent.jsx';
import TestimonialsComponent from '../../components/testimonials-component/TestimonialsComponent.jsx';
import { setPageAction } from '../../store/pageReducer.js';
import { styles } from '../../styles/styles.js';

import './styles/about.scss';
import './styles/promotion.scss';
import './styles/success.scss';
import '../../assets/icons/about/delivery.svg';
import '../../assets/icons/about/bg_advantages.svg';
import "../../assets/icons/about/phone.svg";
import "../../assets/icons/about/support.svg";
import "../../assets/icons/about/bg__trackers.svg";

export default function AboutPage() { 
  
  const dispatch = useDispatch();

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  } 

  return (
    <div className='about'>      
      <SubHeaderComponent/>      
      <section className='about__intro'>       
        <HeaderIntroComponent/>
        <div className='about__intro-advantages'>
          <div className='about__advantages-item'>
            <div className='about__item-image--block'>
              <img src= '../../../src/assets/icons/about/delivery.svg' alt=""  className='about__block-img'/>
              <img src='../../../src/assets/icons/about/bg_advantages.svg' alt="" className='about__block-img--background'/>              
            </div>
            <div className='about__item-info'>
                <h5 className='about__info-title' style={styles.titleStyle}>Free Shipping</h5>
                <p className='about__info-text' style={styles.headerText}>World wide</p>
              </div>
          </div>
          <div className='about__advantages-item helpline-contacts'>
            <div className='about__item-image--block'>
              <img src="../../../src/assets/icons/about/phone.svg" alt=""  className='about__block-img'/>
              <img src='../../../src/assets/icons/about/bg_advantages.svg' alt="" className='about__block-img--background'/>              
            </div>
            <div className='about__item-info'>
                <h5 className='about__info-title' style={styles.titleStyle}>Helpline</h5>
                <p className='about__info-text' style={styles.headerText}>
                  <a href="tel:+13459971345" className='about__info-text'>+1(345)99-71-345</a>
                </p>
              </div>
          </div>
          <div className='about__advantages-item'>
            <div className='about__item-image--block'>
              <img src="../../../src/assets/icons/about/support.svg" alt=""  className='about__block-img'/>
              <img src='../../../src/assets/icons/about/bg_advantages.svg' alt="" className='about__block-img--background'/>              
            </div>
            <div className='about__item-info'>
                <h5 className='about__info-title' style={styles.titleStyle}>24x7 Extensive</h5>
                <p className='about__info-text' style={styles.headerText}>Customer Support</p>
              </div>
          </div>
        </div>
      </section>
      <section className='about__promotion'>
        <img src="../../../src/assets/pink_powder.png" alt="" className='about__promotion-decor'/>
          <div className='about__promotion-block'>
            <p className='about__block-logo' style={styles.logoStyle}>Promotion block</p>
            <h3 className='about__block-title' style={styles.titleStyle}>Welcome to CosmoBeauty</h3>
            <p className='about__block-text' style={styles.headerText}>
            The whole idea behind <span className='about__block-logo small' style={styles.logoStyle}>Cosmo Beauty</span> is to encourage everyone to realize that true beauty comes from within. However, we also understand that taking good care of our skin and hair has a huge impact on how we feel about ourselves. This is why we offer a wide range of organic beauty products online so you can have a comprehensive collection of skin care products that help you achieve your inner and outer beauty goals.

            When buying natural beauty products online, you need to be sure you’re getting authentic products from a reliable source. We offer a detailed description of every product, including a list of ingredients, uses, and benefits. This way, you make sure you buy organic products that actually do what they say. We have everything you need to create a calming, self-care, natural beauty routine, from organic makeup to facial creams for oily skin to strengthening hair oils.

            If you have any questions about our organic beauty products online, our staff is trained and happy to help. Get in touch with us today!
            </p>
          </div>
          <div className='about__promotion-trackers'>
            <div className='about__trackers-item'>
              <div className='about__trackers-block--digit'>
                <p className='about__block-digit_info' style={styles.headerMessage}>2300<sup>+</sup></p>
                <img src="../../../src/assets/icons/about/bg__trackers.svg" alt="" className='about__block-digit_img'/>
              </div>
              <p className='about__block-digit-text' style={styles.titleStyle}>Products</p>
            </div>
            <div className='about__trackers-item'>
              <div className='about__trackers-block--digit'>
                <p className='about__block-digit_info add-padding' style={styles.headerMessage}>108</p>
                <img src="../../../src/assets/icons/about/bg__trackers.svg" alt="" className='about__block-digit_img'/>
              </div>
              <p className='about__block-digit-text' style={styles.titleStyle}>Brands</p>
            </div>
            <div className='about__trackers-item'>
              <div className='about__trackers-block--digit'>
                <p className='about__block-digit_info add-padding' style={styles.headerMessage}>32</p>
                <img src="../../../src/assets/icons/about/bg__trackers.svg" alt="" className='about__block-digit_img'/>
              </div>
              <p className='about__block-digit-text' style={styles.titleStyle}>partners</p>
            </div>
            <div className='about__trackers-item'>
              <div className='about__trackers-block--digit'>
                <p className='about__block-digit_info' style={styles.headerMessage}>618<sup>+</sup></p>
                <img src="../../../src/assets/icons/about/bg__trackers.svg" alt="" className='about__block-digit_img'/>
              </div>
              <p className='about__block-digit-text' style={styles.titleStyle}>Customers</p>
            </div>
            
          </div>
      </section>
      <section className='about__success'>          
          <img src="../../../src/assets/about-success.png" alt="" className='about__success-woman' />   
          <img src="../../../src/assets/eye-shadow-crushed-samples-isolated-on-white.png" alt="" className='about__success-decor'/> 
          <div className='about__success-content'>
              <p className='about__success-content--logo' style={styles.logoStyle}>Success story</p>
              <h2 className='about__success-content--title' style={styles.titleStyle}>CosmoBeauty develops
                  its own brands</h2>
              <p className='about__success-content--subtitle' style={styles.titleStyle}>The CosmoBeauty network is being developed and improved, taking into account all consumer.</p>
              <p className='about__success-content--text' style={styles.headerText}>Forming the range of stores, we, above all, strive not only to meet the format of "home shop", offering each customer the most basic household goods, but also to create a unique space of beauty and care. CosmoBeauty stores offer their customers the widest and highest quality selection of products from world-renowned manufacturers.</p> 
              <Link to="/shop" className='about__success-content--btn' style={styles.headerMessage} onClick={() => {setPageInfo('shop'); window.scrollTo(0,0)}}>
                <p className='about__success-btn-link' >SHOP NOW!</p>
              </Link>           
          </div> 
      </section>     
      <FeaturesComponent/>
      <TestimonialsComponent/>
      <StayInTouchComponent/>
    </div>
  )
}
