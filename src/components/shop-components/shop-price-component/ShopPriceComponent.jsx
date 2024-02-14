import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePriceValueAction,
         getSearchedBodyCareCardsAction, 
         getSearchedHairCareCardsAction, 
         getSearchedSkinCareCardsAction, 
         getSearchedSpaCardsAction,
         getSearchedMakeupCardsAction, 
         getSearchedCardsAction,
         getSearchedNewCardsAction, 
         getSearchedSaleCardsAction, 
         getSearchedNewAndSaleCardsAction,
         setPageQuantityAction,
          searchCardsAction} from '../../../store/cardsReducer.js';
import { styles } from '../../../styles/styles.js';
import './shop-price.scss';

export default function ShopPriceComponent({currentPage, setCurrentPage}) {

  const dispatch = useDispatch();
  const {category, cards, search_item} = useSelector(state => state.cardsReducer);
  const [rangeValue, setRangeValue] = useState({firstValue: 0, secondValue: 200, min: 0, max: 200, left: 0, right: 200, display1: 0, display2: 200});  
  const [rangeMessage, setRangeMessage] = useState("");

  function SlideController(){   
    if(parseInt(rangeValue.display1) <= 20)   {setRangeValue({...rangeValue, display1: 0});}
  }
  function checkCoordinates(){
      setRangeValue({...rangeValue, left: parseInt(rangeValue.firstValue), right: parseInt(rangeValue.max) - parseInt(rangeValue.secondValue) });  
      dispatch(changePriceValueAction(rangeValue));    
  }

  function sortByPriceRange(){    
    if(parseInt(rangeValue.display1) < parseInt(rangeValue.display2) && parseInt(rangeValue.display2) > parseInt(rangeValue.display1)){
      if(category === 'bodycare') dispatch(getSearchedBodyCareCardsAction());
      if(category === 'haircare') dispatch(getSearchedHairCareCardsAction());
      if(category === 'skincare') dispatch(getSearchedSkinCareCardsAction());
      if(category === 'spa') dispatch(getSearchedSpaCardsAction());
      if(category === 'makeup') dispatch(getSearchedMakeupCardsAction());
      if(category === 'new') dispatch(getSearchedNewCardsAction());
      if(category === 'sale') dispatch( getSearchedSaleCardsAction());
      if(category === 'new&sale') dispatch(getSearchedNewAndSaleCardsAction());
      if(category === 'search') dispatch(searchCardsAction(search_item))
      if(category === 'all') dispatch( getSearchedCardsAction(cards));
      dispatch(setPageQuantityAction())
      setCurrentPage(1);
      setRangeMessage("");
    }else {
      setRangeMessage("Range is incorrect");      
    }
  }

  useEffect(() => { checkCoordinates(); sortByPriceRange()}, [rangeValue.display1, rangeValue.display2, category])
  useEffect(() => { SlideController();}, [rangeValue.display1]);
  
 
  return (
	<div className='shop-price'>
    <h3 className='shop-price-title' style={styles.titleStyle}>Price</h3> 
    <div className='shop-price__indicator'>
      <p style={styles.titleStyle}  className='shop-price__indicator-label'>{rangeValue.display1}$</p>
      <p style={styles.titleStyle} className='shop-price__indicator-label'>-</p>
      <p style={styles.titleStyle}  className='shop-price__indicator-label'>{rangeValue.display2}$</p>
    </div>  
    <div className='shop-price__container'>
      <div className='shop-price__slider'>        
        <div className='shop-price__slider-indicator' style={{left: rangeValue.left + 'px', right: rangeValue.right + 'px'}}></div>
      </div>            
      <input type="range" min="0" max="180" step="1"  className='shop-price__range-input' id='slide-1' placeholder='Min'
        value={rangeValue.firstValue} onChange={(e) => setRangeValue({...rangeValue, firstValue: e.target.value, display1: parseInt(e.target.value) + 20})}/>
      <input type="range" min="20" max="200" step="1"  className='shop-price__range-input' id='slide-2'
        value={rangeValue.secondValue} onChange={(e) => setRangeValue({...rangeValue, secondValue: e.target.value, display2: parseInt(e.target.value) })}/>   
    </div>
    {rangeMessage}    
  </div>
  )
}
