import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import API from '../../content/json/API.json';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import ShopCategoryComponent from '../../components/shop-components/shop-category-component/ShopCategoryComponent.jsx';
import ShopPriceComponent from '../../components/shop-components/shop-price-component/ShopPriceComponent.jsx';
import ShopViewedComponent from '../../components/shop-components/shop-viewed-component/ShopViewedComponent.jsx';
import ShopTopComponent from '../../components/shop-components/shop-top-component/ShopTopComponent.jsx';
import ShopCardComponent from '../../components/shop-components/shop-card-component/ShopCardComponent.jsx';
import StayInTouchComponent from '../../components/stay_intouch-component/StayInTouchComponent.jsx';
import { getCardsAction,
         searchCardsAction, 
         getSearchedCardsAction, 
         getSearchedNewCardsAction, 
         getSearchedSaleCardsAction, 
         getSearchedNewAndSaleCardsAction,
         setPageQuantityAction,
         getPageItemsAction,
         changeCategoryAction,
         pageIncrementAction,
         pageDecrementAction,
         changeNewStatusAction,
         changeSaleStatusAction,
         changeCategoryStatusAction, 
         setDefaultNewSaleStatusAction,
         getSearchAction} from '../../store/cardsReducer.js';
import { setPageAction } from '../../store/pageReducer.js';      
import { styles } from '../../styles/styles.js';
import './styles/shop.scss';
import './styles/view.scss';

import "../../assets/icons/search.svg";


export default function ShopPage() {

  const dispatch = useDispatch();  
  const {cards, searchedCards, pageCount, shopCards, viewed, current_page, sale_status, new_status} = useSelector(state => state.cardsReducer); 

  const [search, setSearch] = useState(''); 
  const [isSale, setIsSale] = useState(false);
  const [isNew, setIsNew] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const [startPage, setStartPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState([]);
  
  
   function setAll(){   
    dispatch(getSearchedCardsAction(cards));
    dispatch(changeNewStatusAction());
    dispatch(changeSaleStatusAction());
    setIsNew(false);
    setIsSale(false);
    dispatch(setPageQuantityAction());
    setCurrentPage(1);
  } 
  
  function countPage(startPage){
      dispatch(setPageQuantityAction());
      let array = [];
      if(pageCount > 5){
        if(startPage < pageCount - 4){
            for(let i = startPage; i <= pageCount; i++){
                array.push(i);
            }   
        }else{
            for(let i = pageCount- 4; i <= pageCount; i++){
                array.push(i);
            }  
        }  
    }else {
        for(let i = startPage; i <= pageCount; i++){
            array.push(i);
        }   
    }          
    setPagesQuantity(array);    
  }

  function goToNextPages(){
    if(startPage < pageCount){
      dispatch(pageIncrementAction());  
      setStartPage(startPage + 1);  
      countPage(startPage + 1);       
      setPage(startPage + 1);      
    }
    
  }

  function goToPreviousPages(){
    if(startPage > 1){   
      dispatch(pageDecrementAction());    
      setStartPage(startPage - 1);  
      countPage(startPage - 1);      
      setPage(startPage - 1);         
    }
    
  }

  function setPage(page){
    setCurrentPage(page);
    dispatch(getPageItemsAction(page));
    window.scrollTo(0, 0);            
  } 

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }  
  
  
  useEffect(() => { 
    function searchItem(){      
      dispatch(setDefaultNewSaleStatusAction());
      dispatch(changeCategoryStatusAction('all'));
    if(search.length){
      dispatch(searchCardsAction(search));
      dispatch(getSearchAction(search));
      dispatch(changeCategoryAction('search'))
      setIsNew(false);
      setIsSale(false);
      dispatch(setPageQuantityAction()); 
    }
    else { dispatch(getSearchedCardsAction(cards));  dispatch(setPageQuantityAction());};    
  }
  searchItem();
}, [search]); 

function setNewAndSale(){          
  if(new_status === true && sale_status === false){
    dispatch(getSearchedNewCardsAction());
    dispatch(setPageQuantityAction());
    dispatch(changeCategoryAction('new'));
    dispatch(getPageItemsAction(1));
    setCurrentPage(1);
    dispatch(changeCategoryStatusAction('all'));
  }else if(new_status === true && sale_status === true){
    dispatch(getSearchedNewAndSaleCardsAction());
    dispatch(setPageQuantityAction());
    dispatch(changeCategoryAction('new&sale'));
    dispatch(getPageItemsAction(1));
    setCurrentPage(1);
    dispatch(changeCategoryStatusAction('all'));
  }else if(new_status === false && sale_status === true){
    dispatch(getSearchedSaleCardsAction());
    dispatch(setPageQuantityAction());
    dispatch(changeCategoryAction('sale'));
    dispatch(getPageItemsAction(1));
    setCurrentPage(1);
    dispatch(changeCategoryStatusAction('all'));
  }else if(new_status === false && sale_status === false){
    dispatch(getSearchedCardsAction(cards));
    dispatch(setPageQuantityAction());
    dispatch(changeCategoryAction('all'));
    dispatch(getPageItemsAction(1));
    setCurrentPage(1);
    dispatch(changeCategoryStatusAction('all'));
  }
}

  useEffect(() => {setNewAndSale();}, [new_status, sale_status]); 

  useEffect(() => {    
    countPage(1);   
    setStartPage(1)}, [shopCards.length]);

    
  return (    
      <div className='shop'>         
        <SubHeaderComponent/>       
        <HeaderIntroComponent/>
        {searchedCards?.length > 0 ? (
          <section className='shop__view'>  
            <img src="./assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className='shop__view-image--decor'/>                  
            <div className='shop__view-block'>
              <div className='shop__view-block--cards'>
                <div className='shop__view-cards--trackers'>
                  <div className='shop__view-trackers--search'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
                      className='shop__view-trackers--input' style={styles.headerText}/>
                    <img src="./assets/icons/search.svg" alt="" className='shop__view-trackers-icon'/>
                  </div>
                  <ShopCategoryComponent/>
                  <ShopPriceComponent currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                  {viewed.length > 1 &&
                    <ShopViewedComponent/>
                  }
                  <ShopTopComponent/> 
                </div>
                <div className='shop__view-cards--block'>
                  <div className='shop__view-block--form'>
                    <div className='shop__view-form--item' 
                      style={new_status ? styles.newStyle : {backgroundColor: "#FAF9FF", color: '#666666'} } 
                      onClick={() => {dispatch(changeNewStatusAction()); setIsNew(!isNew);  setSearch('');}}>                 
                        <p style={styles.headerText} className="shop__view-item--text">NEW</p>
                    </div>
                    <div className='shop__view-form--item'
                      style={sale_status ? styles.saleStyle : {backgroundColor: "#FAF9FF", color: '#666666'} } 
                      onClick={() => {setIsSale(!isSale); dispatch(changeSaleStatusAction()); setSearch('')}}>                  
                        <p style={styles.headerText} className="shop__view-item--text">SALE</p>
                    </div>
                    <div className='shop__view-form--item' onClick={setAll}>                  
                      <p style={styles.headerText} className="shop__view-item--text">ALL</p>
                    </div>
                  </div>
                  {cards?.length > 0 ?(                                 
                      <ShopCardComponent/>                 
                  ): (
                    <div></div>
                  )}
                </div>
              </div>
              <div className='shop__view-block--pagination' style={pageCount > 1 ? styles.activeStyle : styles.passiveStyle}>
                <button className='shop__view-pagination-button' style={pageCount > 5 ? styles.activeStyle: styles.passiveStyle} onClick={() => goToPreviousPages()}>&#10094;</button>
                    {pagesQuantity?.slice(0, 5)?.map((page, index) => (
                      <div className='shop__view-pagination-item' style={page === current_page ? styles.currentPageBtnStyle : styles.headerText} key= {index + 1} 
                      onClick={() => setPage(page)}>
                        {page}
                      </div>
                    ))}
                  <button className='shop__view-pagination-button' style={pageCount > 5 ? styles.activeStyle: styles.passiveStyle} onClick={() => goToNextPages()}>&#10095;</button>
              </div>
            </div>
          </section>
        ):(
          <div className='shop-view__notfound'>
            <p  style={styles.headerMessage} className="shop-view__notfound-message">Sorry, but we have no items, according to your request...</p>
            <div className='shop-view__notfound-navigators'>
              <Link to="/shop" onClick={() => { dispatch(getCardsAction(API)); setPageInfo('shop'); setSearch(''); window.scrollTo(0, 0);}} className='shop-view__notfound-navigator' style={styles.headerMessage}
             >Back to Shop Page &#11148;</Link>
              <Link to="/" className='shop-view__notfound-navigator' style={styles.headerMessage}
             onClick={() => {dispatch(getCardsAction(API)); setPageInfo('home'); setSearch(''); window.scrollTo(0, 0);}}
              >Back to Home Page &#11148;</Link>
            </div>
          </div>
        )}
        {searchedCards?.length > 0 && (
          <StayInTouchComponent/>
        )}
      </div>
    
  )
}
