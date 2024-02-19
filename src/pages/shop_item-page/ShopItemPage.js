import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import LeaveAReviewComponent from '../../components/leave_a_review-component/LeaveAReviewComponent.jsx';
import TestimonialsDashboardComponent from '../../components/testimonials_dashboard-component/TestimonialsDashboardComponent.jsx';
import GalleryComponent from '../../components/gallery-component/GalleryComponent.jsx';
import { getSaleprice } from '../../utils/Utils.js';
import { buyItemAction} from '../../store/cardsReducer.js';
import { addToBasketAction, addToBasketItemAction } from '../../store/basketReducer.js';
import { setWishAction } from '../../store/wishReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { styles } from '../../styles/styles.js';
import './styles/shopitem.scss';
import './styles/shop-review.scss';

import "../../assets/icons/shopItem_cart.svg";
import "../../assets/icons/heart-wish.svg";
import "../../assets/icons/shopItem_wish.svg";


export default function ShopItemPage() {
  const dispatch = useDispatch();  
  const {product} = useSelector(state => state.cardsReducer);
  const [quantity, setQuantity] = useState(0);
  const {basket} = useSelector(state => state.basketReducer); 
  const {wishlist} = useSelector(state => state.wishReducer);
  const [stockMessage, setStockMessage] = useState('');
  const [wish, setWish] = useState(false);

  const wishes = localStorage.getItem('wishes');
  const wishlists = JSON.parse(wishes);  

  
  function incrementQuan() {
    setQuantity(quantity + 1);
  };

  function decrementQuan() {
    if(quantity > 0){
    setQuantity(quantity - 1);
    }else {
      setQuantity(quantity);
    }
  };  

  function addToBasket(product){
    if(quantity > 0){
      if(quantity <= product.quantity){ 
        if(basket.find((bask) => bask.id === product.id)) {                  
          const order = {...product, order: quantity};
          dispatch(addToBasketItemAction(order));          
          dispatch(buyItemAction(order));          
          setStockMessage('Great! You added this item to your basket!');
          setTimeout(() => {setStockMessage("")}, 4000);
          localStorage.setItem('basket_storage', basket);      
         
        }else{                             
          const order = {...product, order: quantity};          
          dispatch(addToBasketAction(order));          
          dispatch(buyItemAction(order));          
          setStockMessage('Great! You added this item to your basket!');
          setTimeout(() => {setStockMessage("")}, 4000);
          localStorage.setItem('basket_storage', JSON.stringify(basket));
          }               
      }else {
        setStockMessage(`Sorry, but we have only ${product.quantity} on stock`);
        setTimeout(() => {setStockMessage("")}, 5000);
      }
    }else {
      setStockMessage('Please, choose quantity of your wish item');
      setTimeout(() => {setStockMessage("")}, 4000);
    }
  }

  function addToWishList(product){
    if(wishlist.length > 0){
      if(wishlist.every((wish) => wish.id !== product.id)){
        dispatch(setWishAction(product));
        if(wishlists?.length > 0){
          let wish_items = [...wishlists, product]
          localStorage.setItem('wishes', JSON.stringify(wish_items));
        }else {
          let wish_items = [product]
          localStorage.setItem('wishes', JSON.stringify(wish_items));
        }
        setWish(true);
        
      }else {          
          setWish(true);
      }
    }else {
        dispatch(setWishAction(product));
        if(wishlists?.length > 0){
          let wish_items = [...wishlists, product]
          localStorage.setItem('wishes', JSON.stringify(wish_items));
        }else {
          let wish_items = [product]
          localStorage.setItem('wishes', JSON.stringify(wish_items));
        }
        setWish(true);        
    }
  } 

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
    window.scrollTo(0, 0);
  }
  function updateWishlist(){localStorage.setItem('wishes', JSON.stringify(wishlists))}

  useEffect(() => { updateWishlist() }, [wishlists]);   
  
  return (
    <div className='product'>
      <div className='product__block-navigator'>
        <Link to="/shop" className='product__block-navigator--item' style={styles.headerMessage}
            onClick={() => {setPageInfo('shop');}}
            >Back to Shop Page &#11148;
        </Link>             
        {localStorage?.getItem('isAuth') === 'true' && (
          <Link to="/basket" className='product__block-navigator--item basket-navigator' style={styles.headerMessage}
            onClick={() => {setPageInfo('cart');}}
            >Go To Basket Page &#11149;
        </Link>
        )} 
      </div>     
      <SubHeaderComponent/>
      <section className='product__intro'>       
        <img src="./assets/damask_rose-background.png" alt="" className='product_bg-decor'/>
        <img src="./assets/damask_rose-background.png" alt="" className='product_bg-decor shopitem__second-left'/>        
        <img src="./assets/damask_rose-background.png" alt="" className='product__bg-decor shopitem__left-right' />
        <img src="./assets/damask_rose-background.png" alt="" className='product__bg-decor shopitem__right' />
        <div className='product__intro-content'>
              <h3 className='product__content-title' style={styles.titleStyle}>Shop</h3>
              <p className='product__content-tracker' style={styles.headerText}>Home - Shop<br></br><span className='shop__item-tracker-red'>{product.title}</span></p>
        </div>       
      </section>
      <section className='product__card'>
        <img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className='product__card-decor'/>            
        <div className='product__card-block'>          
          <div className='product__block-image--block'>
            <img src={product?.image} alt="" className='product__block-image'/>            
            <div className='product__block-trackers'>
                    {product?.sale > 0 && (
                        <div className='product__block-trackers--sale' style={styles.headerMessage}>SALE</div>
                    )}
                    {product?.new === true && (
                        <div className='product__block-trackers--new' style={styles.headerMessage}>NEW</div>
                    )}
            </div>
          </div>
          <div className='product__block-info'>
                <h3 className='product__block-info--title' style={styles.titleStyle}>{product?.title?.toLowerCase()}</h3>
                <p className='product__block-info--stock' style={styles.headerText}>Stock:  {product?.quantity > 0 ? product?.quantity : 'out of stock'}</p>
                {product?.sale > 0 ?(
                    <div className='product__block-info--price'>
                        <p className='product__block-price--old' style={styles.headerText}>${product?.price}</p>
                        <p className='product__block-price--new' style={styles.headerText}>${getSaleprice(product)}</p>
                    </div>
                  ): (
                    <div className='product__block-info--price'>
                      <p className='product__block-price--new' style={styles.headerText}>${product?.price}</p>                      
                    </div>
                  )} 
                  <div className='product__block-info--descr_block'>
                    <p className='product__block-info--description' style={styles.headerText}>{product?.description}</p>
                  </div> 
                  <div className='product__block-order--quatity'>
                      <p className='product__block-quantity--title' style={styles.headerText}>Quantity:</p>
                      <div className='product__block-quantity-change'>
                        <button className='product__block-change--btn' onClick={decrementQuan}>&#5130;</button>
                        <div className='product__block-change--indicator' style={styles.headerText}>{quantity}</div>
                        <button className='product__block-change--btn' onClick={incrementQuan}>&#5125;</button>
                      </div>
                  </div>
                  <div className='product__block-btns'>
                    {localStorage?.getItem('isAuth') === 'true' ? (
                      <button className='product__block-btns--btn cart-btn' style={styles.headerMessage} onClick={() => addToBasket(product)}>
                      <img src="./assets/icons/shopItem_cart.svg" alt="" className='product__block-btn-image'/>
                      Cart
                    </button>
                    ):(
                      <Link to="/login" onClick={() => setPageInfo('profile form')} className='product__block-btns--btn cart-btn' style={styles.headerMessage} >
                        <img src="./assets/icons/shopItem_cart.svg" alt="" className='product__block-btn-image'/>
                        Cart
                      </Link>
                    )}
                      {localStorage?.getItem('isAuth') === 'true' ? (
                        <button className='product__block-btns--btn wish' style={styles.headerMessage} onClick={() => addToWishList(product)}>
                        { wish === true ? (
                          <img src="./assets/icons/heart-wish.svg" alt="" className='product__block-btn-image wish-image' />
                        ): (
                          <img src="./assets/icons/shopItem_wish.svg" alt="" className='product__block-btn-image wish-image' />
                        )}
                        Wish
                      </button>  
                      ):(
                        <Link to="/profile" onClick={() => setPageInfo('profile form')} className='product__block-btns--btn wish' style={styles.headerMessage}>                        
                          <img src="./assets/icons/shopItem_wish.svg" alt="" className='product__block-btn-image wish-image' />                        
                          Wish
                      </Link>  
                      )}
                                          
                  </div>
                  <div className='product__order-message' style={styles.headerText}>{stockMessage}</div>          
          </div>          
        </div>        
      </section>
      <section className='product-review'>       
        <div className='product-review__testimonials-block'>
          <TestimonialsDashboardComponent/>
          <LeaveAReviewComponent/>          
        </div>      
      </section>
      <GalleryComponent/>
      <img src="./assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className='product__card-decor2'/>  
    </div>
  )
}
