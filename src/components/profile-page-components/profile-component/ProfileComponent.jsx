import React from "react";
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageAction } from '../../../store/pageReducer.js';
import { styles } from '../../../styles/styles.js';
import "./profileComp.scss";

export default function ProfileComponent() {

  const dispatch = useDispatch();
  const {pathname} = useLocation();

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }

  return (    
      <div className='profile-component'>
        <div className="profile-component__trackers">       
          <Link to='/info' className="profile-component__trackers-btn" style={pathname === "/info" ? styles.tabActiveStyle : styles.tabStyle} 
              onClick={() => {setPageInfo('profile page'); window.scrollTo(0,0);}}>
            My info
          </Link>
          <Link to='/myorders' className="profile-component__trackers-btn" style={pathname === "/myorders" ? styles.tabActiveStyle : styles.tabStyle} 
              onClick={() => {setPageInfo('profile page'); window.scrollTo(0,0);}}>
            My orders
          </Link>
          <Link to='/mywish' className="profile-component__trackers-btn" style={pathname === "/mywish" ? styles.tabActiveStyle : styles.tabStyle} 
              onClick={() => {setPageInfo('profile page'); window.scrollTo(0,0);}}>
            My wishlist
          </Link>
          <Link to='/subscribe' className="profile-component__trackers-btn" style={pathname === "/subscribe" ? styles.tabActiveStyle : styles.tabStyle}
              onClick={() => {setPageInfo('profile page'); window.scrollTo(0,0);}}>
            My subscription
          </Link>
        </div>        
      </div>  
  );
}
