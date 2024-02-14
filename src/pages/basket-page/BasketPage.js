import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import AmountComponent from '../../components/order-components/amount-component/AmountComponent.jsx';
import { getSaleprice } from '../../utils/Utils.js';
import { incrementBasketItemAction, decrementBasketItemAction } from '../../store/basketReducer.js';
import { basketDecrementItemAction, basketIncrementItemAction } from '../../store/cardsReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { styles } from '../../styles/styles.js';
import './basket.scss';
import './total-basket.scss';


export default function BasketPage() {

  const dispatch = useDispatch();  
  // const {product} = useSelector(state => state.cardsReducer);
  const {basket} = useSelector(state => state.basketReducer);

  // const baskets = localStorage.getItem('basket_storage');
  // const basketlist = JSON.parse(baskets);
  const [basketMessage, setBasketMessage] = useState('Your cart is empty');  
  
  function incrementOrderItem(item){    
    // if(item.id !== product.id){
    //   setProductAction(item);       
    // }     
    if(item.quantity > item.order){          
      dispatch(incrementBasketItemAction(item));
      dispatch(basketIncrementItemAction(item));      
    }
  };

  function decrementOrderItem(item){
    // if(item.id !== product.id){
    //   setProductAction(item);
    // }      
    if(item.order > 0){               
      dispatch(decrementBasketItemAction(item));
      dispatch(basketDecrementItemAction(item));           
    }
  };

  function getAmount(item){
    let amount = 0
    if(item.sale > 0){
       amount = item.order * getSaleprice(item)
    }else {
      amount = item.order * item.price;
    }
    return amount;
  } 

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }
  

  return (
    <div className='cart'>     
      <SubHeaderComponent/>
      <HeaderIntroComponent/>
      <img src="../../../src/assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className='cart__card-decor' />     
      <section className='cart__content'>                     
        <div className='cart__content-block'>
          <div className='cart__block-head'>
            <p className='cart__head-item item-product' style={styles.titleStyle}>Product</p>
            <p className='cart__head-item item-price' style={styles.titleStyle}>Price</p>
            <p className='cart__head-item item-quantity' style={styles.titleStyle}>Quantity</p>
            <p className='cart__head-item item-totals' style={styles.titleStyle}>Total</p>
          </div>          
            {basket?.length > 0 ? (
              <div className='cart__block-body'>
                {basket?.map((item) => (
                  <div key= {item?.id} className="cart__body-item">
                    <div className='cart__item-product'>
                      <img src={item?.image} alt="" className='cart__product-image'/>
                      <div className='cart__product-info'>
                        <p className='cart__product-info--title' style={styles.titleStyle}>{item?.title?.toLowerCase()}</p>
                        <p className='cart__product-info--stock' style={styles.headerText}>{item?.quantity > 0 ? 'IN STOCK' : ' OUT OF STOCK'}</p>
                        <p className='cart__product-info--sku' style={styles.headerText}>SKU: IN23{item?.id}</p>
                      </div>                                            
                    </div>
                    {item?.sale > 0 ?(
                        <div className='cart__item-price'>
                          <p className='cart__price-old' style={styles.headerText}>${item?.price}</p>
                          <p className='cart__price-new' style={styles.headerText}>${getSaleprice(item)}</p>
                        </div>
                        ) : (
                        <div className='cart__item-price'>
                          <p className='cart__price-new' style={styles.headerText}>${item?.price}</p>                      
                        </div>
                      )} 
                      <div className='cart__item-quantity'>
                          <button className='cart__item-change--btn' onClick={() => decrementOrderItem(item)}>&#5130;</button>
                          <div className='cart__item-change--indicator' style={styles.headerText}>{item?.order}</div>
                          <button className='cart__item-change--btn' onClick={() => incrementOrderItem(item)}>&#5125;</button>
                      </div>
                      <div className='cart__item-amount' style={styles.headerText}>${getAmount(item)}</div>
                  </div>
                ))}
              </div>
              ) : (
              <div className='cart__block-body--message'>{basketMessage}</div>
            )}          
        </div>        
      </section>      
      <section className='total-cart'>
        <div className='total-cart__content'>
          <div className='total-cart__content-block without-bgc'>
            <div className='total-cart__content-block--special-info'>
              <h3 className='total-cart__content-special--title' style={styles.titleStyle}>How to get a promo code?</h3>
              <p className='total-cart__content-special--text' style={styles.headerText}>Follow our news on the website, as well as subscribe to our social networks. So you will not only    be able to receive up-to-date codes, but also learn about new products and promotional items.
              </p>
            </div>
            <div className='total-cart__block-item cart__btns-items'>
              <Link to="/shop" className='total-cart__block-btns cart-back-btn total-cart__btn-link cart-back-link' style={styles.headerMessage} onClick={() => {setPageInfo('shop'); window.scrollTo(0,0);}}>
                Back to shop
              </Link>              
              <Link to="/product" className=' total-cart__block-btns cart-back-btn total-cart__btn-link cart-back-link' style={styles.headerMessage} onClick={() => {setPageInfo('shop'); window.scrollTo(0,450);}}>
                <span className='cart__back__btn-arrow'>&#8592;</span> Back
              </Link>              
            </div>
          </div>
            <div className='total-cart__block-amount'>
              <AmountComponent/>
            </div>
          </div>
          <img src="../../../src/assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className='cart__card-decor2' /> 
      </section>
    </div>
  )
}
