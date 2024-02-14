import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleprice } from '../../../utils/Utils.js';
import { setProductAction} from '../../../store/cardsReducer.js';
import { styles } from '../../../styles/styles.js';
import './shopcard.scss';
import '../../../pages/home-page/trend.scss';


export default function ShopCardComponent() {
    const dispatch = useDispatch();
    const {searchedCards} = useSelector(state => state.cardsReducer);

    const viewed_storage = localStorage.getItem('viewed');
	const viewed_items = JSON.parse(viewed_storage);
    

    function setCardProduct(card){
        dispatch(setProductAction(card));            
        if(viewed_items?.length > 0){
            let viewed_elems = [...viewed_items, card]
            localStorage.setItem('viewed', JSON.stringify(viewed_elems));
        }else {
            let viewed_elems = [card]
            localStorage.setItem('viewed', JSON.stringify(viewed_elems));
        }
        window.scrollTo(0, 450);
    } 
    
    function updateGallery(){localStorage.setItem('viewed', JSON.stringify(viewed_items))}

     useEffect(() => { updateGallery() }, [viewed_items]);   
    

  return (
    <div className='shop__view-shop'>
        {searchedCards?.map((card) => (
            <Link to="/product"className='shop__view-shop--card' key={card?.id} onClick={() => setCardProduct(card)}>
                <div className='shop__view-card--trackers'>
                    {card?.sale > 0 && (
                        <div className='shop__view-trackers--sale' style={styles.headerMessage}>SALE</div>
                    )}
                    {card?.new === true && (
                        <div className='shop__view-trackers--new' style={styles.headerMessage}>NEW</div>
                    )}
                </div>
                <div className='shop__view-card--image'>
                    <img src={card?.image} alt="" className='shop__view-card--img' />
                </div>
                <div className='shop__view-card--info'>
                    <h4 className='shop__view-info--title' style={styles.titleStyle}>{card?.title.toLowerCase()}</h4>                        
                    <h4 className='shop__view-info--title card-brand' style={styles.titleStyle}>{card?.brand.toLowerCase()}</h4>                        
                    {card?.sale > 0 ?(
                    <div className='shop__view-price--block'>
                        <p className='shop__view-price--old' style={styles.headerText}>${card?.price}</p>
                        <p className='shop__view-price' style={styles.headerText}>${getSaleprice(card)}</p>
                    </div>
                    ): (
                    <div className='shop__view-price--block'>
                        <p className='shop__view-price'style={styles.headerText}>${card?.price}</p>                              
                    </div>
                    )}                        
                </div>
            </Link>
        ))}
     </div>
  )
}
