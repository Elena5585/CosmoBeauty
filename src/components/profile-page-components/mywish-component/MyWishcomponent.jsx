import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getSaleprice } from '../../../utils/Utils.js';
import { setProductAction } from '../../../store/cardsReducer.js';
import { styles } from '../../../styles/styles.js';
import './mywish.scss';

export default function MyWishcomponent() {
    const dispatch = useDispatch();    
    const wishes = localStorage.getItem('wishes');
    const wishlists = JSON.parse(wishes);  
   
    const viewed_storage = localStorage.getItem('viewed');
	  const viewed_items = JSON.parse(viewed_storage);


    function showProductFromWishlist(wish){
      dispatch(setProductAction(wish));  
      if(viewed_items?.length > 0){
        let viewed_elems = [...viewed_items, wish]
        localStorage.setItem('viewed', JSON.stringify(viewed_elems));
    }else {
        let viewed_elems = [wish]
        localStorage.setItem('viewed', JSON.stringify(viewed_elems));
    }
      window.scrollTo(0, 450)
    }
    function updateGallery(){localStorage.setItem('viewed', JSON.stringify(viewed_items))}

    useEffect(() => { updateGallery() }, [viewed_items]);  
    
  return (
    <div className='wish__content-block'>
          <div className='wish__block-head'>
            <p className='wish__head-item wish-item-product' style={styles.titleStyle}>Product</p>
            <p className='wish__head-item wish-item-price' style={styles.titleStyle}>Price</p>
            <p className='wish__head-item wish-item-status' style={styles.titleStyle}>Status</p>
            <p className='wish__head-item wish-item-total' style={styles.titleStyle}>Add to Cart</p>
          </div>          
            {wishlists?.length > 0 ? (
              <div className='wish__block-body'>
                {wishlists?.map((wish) => (
                  <div key= {wish?.id} className="wish__body-item">
                    <div className='wish__item-product'>
                      <img src={wish?.image} alt="" className='wish__product-image'/>
                      <div className='wish__product-info'>
                        <p className='wish__product-info--title' style={styles.titleStyle}>{wish?.title?.toLowerCase()}</p>                        
                        <p className='wish__product-info--sku' style={styles.headerText}>SKU: IN23{wish?.id}</p>
                      </div>                                            
                    </div>
                    {wish?.sale > 0 ?(
                        <div className='wish__item-price'>
                          <p className='wish__price-old' style={styles.headerText}>${wish?.price}</p>
                          <p className='wish__price-new' style={styles.headerText}>${getSaleprice(wish)}</p>
                        </div>
                        ) : (
                        <div className='wish__item-price'>
                          <p className='wish__price-new' style={styles.headerText}>${wish?.price}</p>                      
                        </div>
                      )} 
                      <div className='wish__item-status'>
                      <p className='wish__status-item' style={styles.headerText}>{wish?.quantity > 0 ? 'IN STOCK' : ' OUT OF STOCK'}</p>
                      </div>
                      <div className='wish__item-link' style={styles.headerMessage}>
                        <Link to="/product" className='wish__link-item' style={styles.headerText} onClick={()=> showProductFromWishlist(wish)}>Buy now &#10230;</Link>
                      </div>
                  </div>
                ))}
              </div>
              ) : (
              <div className='wish__block-body--message'>Your wishlist is empty.</div>
            )}          
        </div>   
  )
}
