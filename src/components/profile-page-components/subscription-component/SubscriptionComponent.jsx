import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../../styles/styles.js';
import './subscription.scss';

import "../../../assets/icons/touch_bg-image.svg";
import "../../../assets/icons/touch_img.svg";


export default function SubscriptionComponent() {
    
    const [subscribtion, setSubscribtion] =useState('');

    const subscription_storage = localStorage.getItem('subscription');

    function subcribeUser(){
        localStorage.setItem('subscription', subscribtion);
        setSubscribtion('');
    }
    function unsubscribeUser(){
      localStorage.setItem("subscription", "");
      setSubscribtion('');
    }
    
    useEffect(() => {setSubscribtion()}, [subscription_storage])

  return (
    <div className='subscription'>
        <div className='subscription__title-block'>
          <p className='subscription__title' style={styles.titleStyle}>
              Your subriction: {subscription_storage?.length > 0
              ? `You have already subscribed (${localStorage.getItem('subscription')})` 
              : `You have no subscribtion yet`}
          </p>
          {localStorage.getItem("subscription") &&(
            <button className='subscription__title-block--btn' style={styles.headerMessage} onClick={() => {unsubscribeUser()}}>unsubscribe</button>
          )}
        </div>
        <div className='subcription__block'>
        <div className='subscription__touch-content'>          
          <img src="./assets/icons/touch_bg-image.svg" alt="" className='subscription__touch-content--bg-image' />
          <img src="./assets/icons/touch_img.svg" alt="" className='subscription__touch-content--img' />
          <div className='subscription__touch-content--block'>
            <h3 className='subscription__touch-block--title' style={styles.titleStyle}>Stay in touch</h3>
            <p className='subscription__touch-block--text' style={styles.headerText}>Nourish your skin with toxin-free cosmetic  products</p>
            <div className='subscription__touch-block-subscription'>
              <input type="text" value={subscribtion} onChange={(e) => setSubscribtion(e.target.value)} className="subscription__touch-subscription--input" 
                style={styles.headerText} placeholder="Enter your email..."/>
              {localStorage.getItem('isAuth') === 'true' ? (
                <button className='subscription__touch-subscription--btn' style={styles.headerMessage} onClick={subcribeUser}>subscribe</button>   
              ):(
                <Link to="/profile" className='subscription__touch-subscription--btn' style={styles.headerMessage}>subscribe</Link>   
              )}                           
            </div>
          </div>
        </div>
        </div>        
    </div>
  )
}
