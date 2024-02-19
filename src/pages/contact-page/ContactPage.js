import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import BrandsComponent from '../../components/brands-component/BrandsComponent.jsx';
import { addToMessagesAction } from '../../store/messageReducer.js';
import { styles } from '../../styles/styles.js';
import './styles/contact.scss';
import './styles/connection.scss';
import './styles/message.scss';
import './styles/map.scss';

import "../../assets/icons/contact-address.svg";
import "../../assets/icons/contact-tel.svg";
import "../../assets/icons/contact-worktime.svg";
import "../../assets/icons/contact-fb.svg";
import "../../assets/icons/contact-twitter.svg";
import "../../assets/icons/contact-instagram.svg";
import "../../assets/icons/contact-linkedin.svg";



export default function ContactPage() {

  const dispatch = useDispatch();
  const {messages} = useSelector(state => state.messageReducer);
  const [messageSender, setMessageSender] = useState({name: "", email: "", message: ""});
  const [formMessage, setFormMessage] = useState("");

  function sendMessage(e){
    e.preventDefault();
    const emailRegExp = /^\S+@\S+\.\S+$/g;
    if((messageSender.name.length >=1) || (localStorage['lastname'].length >=1)){
      if((messageSender.email.match(emailRegExp)) || localStorage['email'].match(emailRegExp)){
        if(messageSender.message.length > 10){
            let senderObject ={
              name: messageSender.name || `${localStorage['name']} ${localStorage['lastname']}`,
              email: messageSender.email || localStorage['email'],
              message: messageSender.message
            }            
            dispatch(addToMessagesAction(senderObject));
            localStorage.setItem('messages', JSON.stringify(messages));
            setMessageSender({name:"", email: "", message: ""})
            setFormMessage("Successfully done!");
            setTimeout(() => {
              setFormMessage("")
            }, 3000);
        }else {
          setFormMessage("Message can not be less than 10 symbols");
          setTimeout(() => {
            setFormMessage("")
          }, 3000);
        }
      }else {
        setFormMessage("Enter correct email");
        setTimeout(() => {
          setFormMessage("")
        }, 3000);
      }
    }else{
      setFormMessage("Enter your name");
      setTimeout(() => {
        setFormMessage("")
      }, 3000)
    }
  } 

  return (
    <div className='contact'>        
        <SubHeaderComponent/>
        <section className='contact__intro'>
          <HeaderIntroComponent/>              
        </section>
        <div className='contact__intro-advantages'>
            <div className='contact__advantages-item'>
              <div className='contact__item-image--block'>
                <img src="./assets/icons/contact-address.svg" alt=""  className='contact__block-img'/>
                <img src="./assets/icons/about/bg_advantages.svg" alt="" className='contact__block-img--background'/>              
              </div>
              <div className='contact__item-info'>                
                  <p className='contact__info-text' style={styles.headerText}>27 Division St, New York, NY 10002, USA</p>                
                </div>
            </div>
            <div className='contact__advantages-item phone-email-contacts'>
              <div className='contact__item-image--block'>
                <img src="./assets/icons/contact-tel.svg" alt=""  className='contact__block-img'/>
                <img src="./assets/icons/about/bg_advantages.svg" alt="" className='contact__block-img--background'/>              
              </div>
              <div className='contact__item-info'>                
                  <div className='contact__info-text' style={styles.headerText}>
                    <a href="tel:+13459971345" className='contact__info-text'>+1(345)99-71-345</a>
                    <br/>
                    <a href="mailto:info@cosmobeauty.com" className='contact__info-text'>info@cosmobeauty.com</a>
                  </div>
                </div>
            </div>
            <div className='contact__advantages-item'>
              <div className='contact__item-image--block'>
                <img src="./assets/icons/contact-worktime.svg" alt=""  className='contact__block-img'/>
                <img src="./assets/icons/about/bg_advantages.svg" alt="" className='contact__block-img--background'/>              
              </div>
              <div className='contact__item-info'>                
                  <p className='contact__info-text' style={styles.headerText}>Mon - Fri: 9 am - 6 pm</p>
                  <p className='contact__info-text' style={styles.headerText}>Sat - Sun: Holiday</p>
                </div>
            </div>
          </div>  
        <section className='contact__connection'>
          <div className='contact__connection-block'>
            <div className='contact__connection-info'>
              <h3 style={styles.titleStyle} className="contact__connection-info--title">We take care of you</h3>
              <p style={styles.headerText} className="contact__connection-info--text">Email us if you have any questions, we will be sure to contact you and find a solution. Also, our managers will help you choose the product that suits you best, at the best price. From year to year, the CosmoBeauty network develops and improves, taking into account all consumer needs and market trends. But for us, the concern remains that when coming to the CosmoBeauty store, customers do not have questions about the convenience and comfort of shopping, product quality and the level of professionalism of sales consultants.</p>
            </div>
            <div className='contact__connection-social'>
              <p style={styles.headerText} className="contact__connection-social--title">Find us here:</p>
              <div className='contact__connection-social--links'>
                <div className='contact__links-block'>
                  <a href="true" alt="" className='contact__links-item--link' onClick={(e) => {e.preventDefault(); window.scrollTo(0,0);}}>
                    <img src="./assets/icons/contact-fb.svg" alt="" className='contact__links-block--img'/>
                  </a>
                </div>
                <div className='contact__links-block'>
                  <a href="true" alt="" className='contact__links-item--link' onClick={(e) => {e.preventDefault(); window.scrollTo(0,0);}}>
                    <img src="./assets/icons/contact-twitter.svg" alt="" className='contact__links-block--img'/>
                    </a>
                </div>
                <div className='contact__links-block'>
                  <a href="true" alt="" className='contact__links-item--link' onClick={(e) => {e.preventDefault(); window.scrollTo(0,0);}}>
                    <img src="./assets/icons/contact-instagram.svg" alt="" className='contact__links-block--img'/>
                  </a>
                </div>
                <div className='contact__links-block'>
                  <a href="true" alt="" className='contact__links-item--link' onClick={(e) => {e.preventDefault(); window.scrollTo(0,0);}}>
                    <img src="./assets/icons/contact-linkedin.svg" alt="" className='contact__links-block--img'/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      <BrandsComponent/>
      <section className='contact-message'>          
          <img src="./assets/contact-bg-section.png" alt="" className='contact-message__image-block'/>
          <div className='contact-message__block'>
            <h3 className='contact-message__logo' style={styles.fullLogoStyle}>write to us</h3>
            <h3 className='contact-message__title' style={styles.fullTitleStyle}>leave a message</h3>
            <p className='contact-message__text' style={styles.fullTextStyle}>Write to us if you have any questions, we will definitely contact you and find a solution.</p>
            <form className='contact-message__form' name='form-message' onSubmit={(e) => sendMessage(e)}>
              <input type="text" className='contact-message__input' placeholder={localStorage['lastname'] ? `${localStorage['name']} ${localStorage['lastname']}` :'Enter your name'}
                name="senderName" style={styles.headerText} value={messageSender.name} onChange={(e) => setMessageSender({...messageSender, name: e.target.value})}/>
              <input type="text" className='contact-message__input' placeholder={localStorage['email'] ? `${localStorage['email']}` : 'Enter your email'} 
                name="senderEmail" style={styles.headerText} value={messageSender.email} onChange={(e) => setMessageSender({...messageSender, email: e.target.value})}/>
              <textarea className='contact-message__form-text' name="senderMessage" id="message-text" placeholder='Enter your message...' 
                style={styles.headerText} value={messageSender.message}  onChange={(e) => setMessageSender({...messageSender, message: e.target.value})}></textarea>
              <p className='contact-message__form-message' style={styles.headerMessage}>{formMessage}</p>
              <button type="submit" className='contact-message__btn' style={styles.headerMessage}>SEND</button>
            </form>
          </div> 
          <img src="./assets/eye-shadow-crushed-samples-isolated-on-white.png" alt="" className='contact-message__decorator'/>          
      </section>
      <section className='contact-map'>         
            <h3 className='contact-map__title' style={styles.fullLogoStyle}>Find us here</h3> 
            <p className='contact__map-text' style={styles.fullTextStyle}>27 Division St, New York, NY 10002, USA</p>                
           <iframe title='map-location' className='contact-map__img'  
           src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaf2dfa2f7d854a37aba96382ca633b10a29dcd6aaf131914c5f69cef647dcd40&amp;source=constructor" 
           width="1140" height="300" lang="en_US"></iframe>        
      </section>      
    </div>
  )
}
