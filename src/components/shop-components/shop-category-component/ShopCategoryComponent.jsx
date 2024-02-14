import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { bodyCare, skinCare, hairCare, spa, makeup } from '../../../utils/Utils.js';
import { getSearchedBodyCareCardsAction, 
         getSearchedHairCareCardsAction, 
         getSearchedSkinCareCardsAction, 
         getSearchedSpaCardsAction,
         getSearchedMakeupCardsAction, 
         getSearchedCardsAction,
         setPageQuantityAction, 
         changeCategoryAction,  
         getPageItemsAction, 
         setDefaultNewSaleStatusAction, 
         changeCategoryStatusAction } from '../../../store/cardsReducer.js';
import { styles } from '../../../styles/styles.js';
import './shopCategory.scss';

export default function ShopCategoryComponent() {
    const dispatch = useDispatch();
    const {cards, shopCards, category_status} = useSelector(state => state.cardsReducer);  
    

    function setBodyCare(){
        dispatch(getSearchedBodyCareCardsAction());
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('bodycare')); 
        dispatch(changeCategoryStatusAction('bodycare'));
        dispatch(getPageItemsAction(1))
    };
    function setHairCare(){
        dispatch(getSearchedHairCareCardsAction()); 
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('haircare')); 
        dispatch(changeCategoryStatusAction('haircare')); 
        dispatch(getPageItemsAction(1))
    };
    function setSkinCare(){
        dispatch(getSearchedSkinCareCardsAction()); 
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('skincare')); 
        dispatch(changeCategoryStatusAction('skincare')); 
        dispatch(getPageItemsAction(1))
    };
    function setSPA(){
        dispatch(getSearchedSpaCardsAction()); 
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('spa')); 
        dispatch(changeCategoryStatusAction('spa')); 
        dispatch(getPageItemsAction(1))
    };
    function setMakeUp(){
        dispatch(getSearchedMakeupCardsAction()); 
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('makeup')); 
        dispatch(changeCategoryStatusAction('makeup')); 
        dispatch(getPageItemsAction(1))
    };
    function setAll(){
        dispatch(getSearchedCardsAction(cards)); 
        dispatch(setPageQuantityAction()); 
        dispatch(changeCategoryAction('all')); 
        dispatch(changeCategoryStatusAction('all')); 
        dispatch(getPageItemsAction(1))
    };

    const bodycare_quantity = bodyCare(shopCards);
    const haircare_quantity = hairCare(shopCards);
    const skincare_quantity = skinCare(shopCards);
    const spa_quantity = spa(shopCards);
    const makeup_quantity = makeup(shopCards);

  return (
    <div className='shop__view-categories'>
        <h3 className='shop__view-categories--title' style={styles.titleStyle}>Categories</h3>                
        <p className='shop__view-categories--item' style={category_status === 'bodycare' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setBodyCare(); dispatch(setDefaultNewSaleStatusAction())} }>
            Body Care <span className='category__items-quantity' style={ bodycare_quantity > 0 ? styles.activeQuantityStyle: styles.passiveStyle}>({bodycare_quantity})</span>
        </p>
        <p className='shop__view-categories--item' style={category_status === 'haircare' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setHairCare(); dispatch(setDefaultNewSaleStatusAction())}}>
            Hair care <span className='category__items-quantity' style={ haircare_quantity > 0 ? styles.activeQuantityStyle: styles.passiveStyle}>({haircare_quantity})</span>
        </p>
        <p className='shop__view-categories--item' style={category_status === 'skincare' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setSkinCare(); dispatch(setDefaultNewSaleStatusAction())}}>
            Skin care <span className='category__items-quantity' style={ skincare_quantity > 0 ? styles.activeQuantityStyle: styles.passiveStyle}>({skincare_quantity})</span>
        </p>
        <p className='shop__view-categories--item' style={category_status === 'spa' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setSPA(); dispatch(setDefaultNewSaleStatusAction())}}>
            SPA <span className='category__items-quantity' style={ spa_quantity > 0 ? styles.activeQuantityStyle: styles.passiveStyle}>({spa_quantity})</span>
        </p>
        <p className='shop__view-categories--item' style={category_status === 'makeup' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setMakeUp(); dispatch(setDefaultNewSaleStatusAction())}}>
            Make up <span className='category__items-quantity' style={ makeup_quantity > 0 ? styles.activeQuantityStyle: styles.passiveStyle}>({makeup_quantity})</span>
        </p>                
        <p className='shop__view-categories--item' style={category_status === 'all' ? styles.categoryActiveStyle : styles.headerText} onClick={() => {setAll(); dispatch(setDefaultNewSaleStatusAction())}}>
            All <span className='category__items-quantity'>({shopCards?.length})</span></p>                
    </div>
  )
}
