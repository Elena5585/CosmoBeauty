import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import GalleryComponent from '../../components/gallery-component/GalleryComponent.jsx';
import MyWishcomponent from '../../components/profile-page-components/mywish-component/MyWishcomponent.jsx';
import { setPageAction } from '../../store/pageReducer.js';
import { clearWishlistAction } from '../../store/wishReducer.js';
import { styles } from '../../styles/styles.js';
import './wish.scss';

export default function WishPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {viewed} = useSelector(state => state.cardsReducer);

  const wishes = localStorage.getItem('wishes');
  const wishlists = JSON.parse(wishes);

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
    window.scrollTo(0,0);
  }

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishlists));
  }, [wishlists])

  return (
    <div className='wish'>
      <img src="../../../src/assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className='wish__card-decor2' />  
      <SubHeaderComponent/>      
      <HeaderIntroComponent/>
      <section className='wish__content'>
        <img src="../../../src/assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className='wish__card-decor' />             
        <MyWishcomponent/>      
        <div className='wish__content-btns'>
          <button className='wish__content-btns--item' style={styles.headerMessage} 
            onClick={() => {dispatch(clearWishlistAction()); localStorage.removeItem('wishes'); navigate('/wish')}}>
            Clear Wishlist
          </button>
          <Link to="/shop" className='wish__content-btns--item item-black' style={styles.headerMessage} onClick={() => setPageInfo('shop')}>Go Shopping</Link>
        </div>       
      </section> 
      {viewed?.length > 0 && (
        <GalleryComponent/>
      )}
    </div>
  )
}
