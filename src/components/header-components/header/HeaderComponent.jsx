import React, { useState } from 'react';
import { styles } from '../../../styles/styles.js';
import './header.scss';

import "../../../assets/icons/header_close.svg";

export default function HeaderComponent() {

  const discountMessage = '30% OFF ON ALL PRODUCTS ENTER CODE: cosmobeauty2023';
  const [discountWindow, setDiscountWindow] = useState(true);
  function hideDiscountBlock(){setDiscountWindow(false);}

  return (
    <header className='header'>      
      {discountWindow && (
        <div className='header__discount-window'>
            <h4 className='header__window-title' style={styles.headerMessage}>{discountMessage}</h4>
            <button className='header__window-btn' onClick={hideDiscountBlock}>
              <img src="./assets/icons/header_close.svg" alt="" className='header__btn-icon'/>
            </button>
        </div>        
      )}      
    </header>
  )
}
