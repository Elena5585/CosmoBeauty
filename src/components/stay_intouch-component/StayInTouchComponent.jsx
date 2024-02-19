import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageAction } from '../../store/pageReducer.js';
import { styles } from '../../styles/styles.js';
import './stay_touch.scss'

export default function StayInTouchComponent() {   
   
    const dispatch = useDispatch();
    const [subscribtion, setSubscribtion] =useState('');
    const [subscribeMessage, setSubscribeMessage] = useState('');

    function setPageInfo(pageName){
      dispatch(setPageAction(pageName));
      localStorage.setItem('pageName', pageName);
    }

    function subcribeUser(){
      const emailRegExp = /^\S+@\S+\.\S+$/g;
      if(subscribtion.match(emailRegExp)){
          if(localStorage.getItem('subscription')){
            setSubscribeMessage(`You have already subscribed, but you can change it in your profile settings`);
            setTimeout(() => {
              setSubscribeMessage('');
            }, 4000);
            setSubscribtion('');
          }else {                     
              localStorage.setItem('subscription', subscribtion);             
              setSubscribtion('');
              setSubscribeMessage('Now, you will receive all news of CosmoBeauty');
              setTimeout(() => {
                setSubscribeMessage('');
              }, 3000);            
          }
    }else {
        setSubscribeMessage('Input correct email value');
        setTimeout(() => {
          setSubscribeMessage('');
        }, 3000);
        setSubscribtion('');
    }
    } 

  return (
    <div className='touch'>
        <div className='touch__content'>          
          <img src="./assets/icons/touch_bg-image.svg" alt="" className='touch__content-bg-image' />
          <img src="./assets/bodycare/Bouquet-Fragola-Edt.png" alt="" className='touch__content-img' />
          <div className='touch__content-block'>
            <h3 className='touch__block-title' style={styles.titleStyle}>Stay in touch</h3>
            <p className='touch__block-text' style={styles.headerText}>Nourish your skin with toxin-free cosmetic products</p>
            <div className='touch__block-subscription'>
              <input type="text" value={subscribtion} onChange={(e) => setSubscribtion(e.target.value)} className="touch__subscription-input" 
                style={styles.headerText} placeholder="Enter your email..."/>
              {localStorage.getItem('isAuth') === 'true' ? (
                <button className='touch__subscription-btn' style={styles.headerMessage} onClick={subcribeUser}>subscribe</button>   
              ):(
                <Link to="/profile" onClick={() => {setPageInfo('profile form'); window.scrollTo(0,0);}} className='touch__subscription-btn--link' style={styles.headerMessage}>subscribe</Link>   
              )}                           
            </div>
            <div className='touch__block-message' style={styles.headerMessage}>{subscribeMessage}</div>
          </div>
        </div>
    </div>
  )
}
