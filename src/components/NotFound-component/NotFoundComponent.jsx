import React from 'react';
import { styles } from '../../styles/styles.js';
import './notfound.scss';

import "../../assets/icons/loader2.gif";

export default function NotFound() {
  return (
    <div className='notfound-item'>         
      <h1 className='notfound__title-item' style={styles.titleStyle}>
        Upps...! 
        <span className='notfound__title-span'> We try to solve the problem!</span>
      </h1>
      <img src="../../../src/assets/icons/loader2.gif" alt="notfound" className='notfound__item-loader'/>
    </div>
  )
  
}