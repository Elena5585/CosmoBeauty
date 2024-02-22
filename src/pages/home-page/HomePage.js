import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from "lodash.debounce";
import axios from 'axios';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import StayInTouchComponent from '../../components/stay_intouch-component/StayInTouchComponent.jsx';
import FeaturesComponent from '../../components/features-component/FeaturesComponent.jsx';
import BrandsComponent from '../../components/brands-component/BrandsComponent.jsx';
import NotFound from '../../components/NotFound-component/NotFoundComponent.jsx';
import API from '../../../src/content/json/API.json';
import { getBodyCareAction, getHairCareAction, getTrendsAction, getSkinCareAction, getMakeupAction, getSpaAction } from '../../store/trendReducer.js';
import { setProductAction, getCardsAction, setPageQuantityAction} from '../../store/cardsReducer.js';
import { getShowRoomPageCountAction } from '../../store/showroomReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { setShowRoomAction } from '../../store/showroomReducer.js';
import { styles } from '../../styles/styles.js';
import './styles/home.scss';
import './trend.scss';
import './styles/discount.scss';
import './styles/new.scss';


export default function HomePage() {

  const dispatch = useDispatch();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const listRef = useRef(null);

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  
  const {cards, newItems, newCollection, viewed} = useSelector(state => state.cardsReducer);  
  const categories = ['Body care', 'Hair care', 'Make up', 'Skin care', 'SPA', 'All'];
  const {searchedTrends} = useSelector(state => state.trendReducer);  
  const {discounts} = useSelector(state => state.cardsReducer);  
  const [firstCount, setFirstCount] = useState(0);
  const [secondCount, setSecondCount] = useState(1);
  const [thirdCount, setThirdCount] = useState(2);
  const [fourthCount, setFourthCount] = useState(3);

  const viewed_storage = localStorage.getItem('viewed');
  const viewed_items = JSON.parse(viewed_storage);

  function getSaleprice(card){
    if(card.sale > 0){
      const salePrice = (card.price - (card.price * card.sale)/100).toFixed(0);
      return salePrice;
    }
  }

  function goToProductCard(card){    
    dispatch(setProductAction(card));
    if(viewed_items?.length > 0){
      let viewed_elems = [...viewed_items, card]
      localStorage.setItem('viewed', JSON.stringify(viewed_elems));
    }else {
        let viewed_elems = [card]
        localStorage.setItem('viewed', JSON.stringify(viewed_elems));
    }
    setPageInfo('shop'); 
    window.scrollTo(0, 450);    
  } 

    function getCategoryInTrend(categoryItem){
      switch(categoryItem.toLowerCase()){
        case 'body care': dispatch(getBodyCareAction()); break;
        case 'hair care': dispatch(getHairCareAction()); break;
        case 'skin care': dispatch(getSkinCareAction()); break;
        case 'make up': dispatch(getMakeupAction()); break;
        case 'spa': dispatch(getSpaAction()); break;
        case 'all': dispatch(getTrendsAction(cards)); break;
        default: dispatch(getTrendsAction(cards));
      }
  }
  
  function getNextNewItems(){
    if(fourthCount < newItems.length - 1){
      setFirstCount(firstCount + 1);
      setSecondCount(secondCount + 1);
      setThirdCount(thirdCount + 1);
      setFourthCount(fourthCount + 1);
    }
  }

  function getPreviousNewItems(){
    if(firstCount > 0){
      setFirstCount(firstCount - 1);
      setSecondCount(secondCount - 1);
      setThirdCount(thirdCount - 1);
      setFourthCount(fourthCount - 1);
    }
  }

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }

  function getNewCollection(array, title, status, info){
    dispatch(setShowRoomAction(array, title, status, info));  
      dispatch(getShowRoomPageCountAction());
      setPageInfo('shop');
      window.scrollTo(0,0);
  }

  function goToDiscount(array, title, status, info){
    dispatch(setShowRoomAction(array, title, status, info)); 
    dispatch(getShowRoomPageCountAction()); 
    setPageInfo('discount');
    window.scrollTo(0,0);
  } 

  async function getApi(){  
    try{        
      const response = await axios.get(API);
      const data = response.data;  
      dispatch(getCardsAction(data));        
      dispatch(getTrendsAction(data)); 
      dispatch(setPageQuantityAction());            
  } 
  catch(e){ console.log(e);}
}
  
  useEffect(() => { getApi();}, []);

  function updateGallery(){localStorage.setItem('viewed', JSON.stringify(viewed_items))}

  useEffect(() => { updateGallery() }, [viewed_items]);     
    

  return (
    <div className="home">
      <SubHeaderComponent />      
      <section className="intro">
        <img src="./assets/woman_home3.png" alt="" className="intro__decor"/>
        <div className="intro__content">
          <p className="intro__content-logo" style={styles.logoStyle}>Professional</p>
          <h2 className="intro__content-title" style={styles.title}>Beauty & Care</h2>
          <p className="intro__content-text" style={styles.title}>
            Nourish your skin with toxin-free cosmetic products. With the offers
            that you can’t refuse
          </p>
          <button className="intro__content-btn" style={styles.headerMessage}>
            <Link to="shop" className="intro__btn-link" onClick={() => setPageInfo('shop')}>Shop now</Link>
          </button>          
          <img src="./assets/powder_home.png" alt="" className="intro__background-effect"/>
        </div>
      </section>
      {cards?.length > 0 ? (
        <section className="trend">
          <div className="trend__content">
            <p className="trend__content-logo" style={styles.logoStyle}>Cosmetics</p>
            <h2 className="trend__content-title" style={styles.titleStyle}>Trending products</h2>
            <p className="trend__content-text" style={styles.headerText}>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>
          </div>
          <div className="trend__category-block">
            {categories?.map((categoryItem, index) => (
              <button key={index} className="trend__category-block--item" style={styles.headerText} onClick={() => getCategoryInTrend(categoryItem)}>
                {categoryItem}
              </button>
            ))}
          </div>
          <div className="trend__cards">
            <div className="trend__cards-block" style={searchedTrends.length < 4 ? styles.cardsStyle : { justifyContent: "start" }} ref={listRef}>
              {searchedTrends?.map((card) => (
                <Link to="/product" className="trend__block-card" key={card?.id} onClick={() => goToProductCard(card)}>
                  <div className="trend__card-img">
                    <img src={card?.image} alt="" className="trend__card-image"/>
                    {card?.sale > 0 ? (
                      <div className="trend__card-trackers--together">
                        <div className="trend__img-sale" style={styles.headerMessage}>SALE</div>
                        {card.new === true && (
                          <div className="trend__img-sale new-together" style={styles.headerMessage}>NEW</div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {card?.sale <= 0 && card?.new === true && (
                      <div className="trend__img-sale new-trend-position" style={styles.headerMessage}>NEW</div>
                    )}
                  </div>
                  <h5 className="trend__card-title" style={styles.titleStyle}>{card.title.toLowerCase()}</h5>
                  {card?.sale > 0 ? (
                    <div className="trend__card-cost">
                      <span className="trend__card-old-price" style={styles.headerText}>{card?.price}$</span>
                      <span className="trend__card-price" style={styles.headerMessage}>{getSaleprice(card)}$</span>
                    </div>
                  ) : (
                    <div className="trend__card-cost">
                      <span className="trend__card-price" style={styles.headerMessage}>{card?.price}$</span>
                    </div>
                  )}                  
                </Link>
              ))}              
            </div>
            <div className='trends__cards-arrows' style={searchedTrends.length < 2 ? styles.passiveStyle : styles.activeStyle}>
                <div className='trends__cards-arrow--left' style={styles.headerText} disabled={!canScrollLeft} onClick={() => scrollContainerBy(-450)}>←</div>                
                <div className='trends__cards-arrow--right' style={styles.headerText} disabled={!canScrollRight} onClick={() => scrollContainerBy(450)}>→</div>
            </div>            
          </div>        
        </section>
      ) : (
        <NotFound />
      )}
       <BrandsComponent/>
      <section className="discount">        
        <div className="discount__content">
          <img src="./assets/eating-candy-lollupop.png" alt="" className="discount__content-img" />
          <div className="discount__content-info">
            <p className="discount__content-logo" style={styles.logoStyle}>Discount</p>
            <h2 className="discount__content-title" style={styles.titleStyle}>Get Your<span id="red-title" style={styles.redTitle}>50%</span>Off</h2>
            <p className="discount__content-text" style={styles.titleStyle}>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>
            <Link to="/discount" className="discount__content-btn"  onClick={() => goToDiscount(discounts, 'DISCOUNT', 'CATEGORY', 'Today on sale...')}>
              <p style={styles.headerMessage} className="discount__btn-link">Get Now!</p>
            </Link>
          </div>
        </div>        
        <img src="./assets/eye-shadow-crushed-samples-isolated-on-white.png" alt="" className='discount__decorator'/>
      </section>
      {cards.length ? (
        <section className="new-arrival">          
          <FeaturesComponent/>
          <div className='new-collection'>
            <div className='new-collection__title-block'>
              <h3 className='new-collection__block-subtitle' style={styles.logoStyle}>Soon...</h3>
              <h2 className='new-collection__block-title' style={styles.titleStyle}>New Collection</h2>
              <p className='new-collection__block-text' style={styles.headerText}>A tropical skincare range coming from Hawaii ... with somptuous scents and unique textures!</p>
            </div>
            <div className='new-collection__block-image'>
              <div className='new-collection__image-item text-item'>               
                <div className='new-collection__item-body'>
                  <h3 className='new-collection__body-subtitle' style={styles.logoStyle}>Check this out</h3>
                  <h2 className='new-collection__body-title' style={styles.titleStyle}>New Collection <br/><span>LEAHLANI</span></h2> 
                  <p className='new-collection__body-description' style={styles.titleStyle}>A tropical skincare range coming from Hawaii ... with somptuous scents and unique textures!</p>                 
                  <p className='new-collection__body-text' style={styles.headerText}>Leahlani is a Hawaii-based artisanal skincare collection, infused with the island’s abundant blooming botanicals, vibrant fruit nectars, and lush tropical beauty oils.
                  </p> 
                  <button className='new-collection__body-btn'>
                  <Link to="/showroom" style={styles.headerMessage} className="new-collection__btn-link" 
                    onClick={() => {getNewCollection(newCollection, 'LEAHLANI', 'New Collection', "Leahlani is a Hawaii-based artisanal skincare collection, infused with the island’s abundant blooming botanicals, vibrant fruit nectars, and lush tropical beauty oils.")}} >SHOW NOW!</Link>
                  </button>                
                </div>
              </div>
              <div className='new-collection__image-item image-item'>
                <img src="./assets/skin_care/Leahlani/leahlani_home.jpg" alt="" className='new-collection__item-image'/>
              </div>             
            </div>
          </div>
          <div className="new-arrival__content">
            <p className="new-arrival__content-logo" style={styles.logoStyle}>Cosmetics</p>
            <h2 className="new-arrival__content-title" style={styles.titleStyle}>New arrivals</h2>
            <p className="new-arrival__content-text" style={styles.headerText}>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>
          </div>
          <div className="new-arrival__cards">
            <div className="new-arrival__cards_btn">
              <button className="new-arrival__btns-btn btn-new-arrival-back"  style={firstCount >= 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999'}}
               onClick={getPreviousNewItems}>&#10094; </button>
            </div>
            <div className="new-arrival__cards-block">
              <Link to="/product" className="new-arrival__block-card" onClick={() => goToProductCard(newItems[firstCount])}>
                {newItems[firstCount]?.sale > 0 ? (
                  <div className="new-arrival__card-img">
                    <img src={newItems[firstCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                    <div className="new-arrival__img-sale" style={styles.headerMessage}>SALE</div>
                  </div>
                ) : (
                  <div className="new-arrival__card-img">
                    <img src={newItems[firstCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                  </div>
                )}
                <h5 className="new-arrival__card-title" style={styles.titleStyle}>{newItems[firstCount]?.title?.toLowerCase()}</h5>
                {newItems[firstCount]?.sale > 0 ? (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-old-price" style={styles.headerText}>{newItems[firstCount]?.price}$</span>
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{getSaleprice(newItems[firstCount])}$</span>
                  </div>
                ) : (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{newItems[firstCount]?.price}$</span>
                  </div>
                )}
              </Link>
              <Link to="/product" className="new-arrival__block-card second-block-item" onClick={() => goToProductCard(newItems[secondCount])}>
                {newItems[secondCount]?.sale > 0 ? (
                  <div className="new-arrival__card-img">
                    <img src={newItems[secondCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                    <div className="new-arrival__img-sale" style={styles.headerMessage}>SALE</div>
                  </div>
                ) : (
                  <div className="new-arrival__card-img">
                    <img src={newItems[secondCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                  </div>
                )}
                <h5 className="new-arrival__card-title" style={styles.titleStyle}>{newItems[secondCount]?.title}</h5>
                {newItems[secondCount]?.sale > 0 ? (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-old-price" style={styles.headerText}>{newItems[secondCount]?.price}$</span>
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{getSaleprice(newItems[secondCount])}$</span>
                  </div>
                ) : (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{newItems[secondCount]?.price}$</span>
                  </div>
                )}
              </Link>
              <Link to="/product" className="new-arrival__block-card third-block-item" onClick={() => goToProductCard(newItems[thirdCount])}>
                {newItems[thirdCount]?.sale > 0 ? (
                  <div className="new-arrival__card-img">
                    <img src={newItems[thirdCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                    <div className="new-arrival__img-sale" style={styles.headerMessage}>SALE</div>
                  </div>
                ) : (
                  <div className="new-arrival__card-img">
                    <img src={newItems[thirdCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                  </div>
                )}
                <h5 className="new-arrival__card-title" style={styles.titleStyle}>{newItems[thirdCount]?.title}</h5>
                {newItems[thirdCount]?.sale > 0 ? (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-old-price" style={styles.headerText}>{newItems[thirdCount]?.price}$</span>
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{getSaleprice(newItems[thirdCount])}$</span>
                  </div>
                ) : (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{newItems[thirdCount]?.price}$</span>
                  </div>
                )}
              </Link>
              <Link to="/product" className="new-arrival__block-card fourth-block-item" onClick={() => goToProductCard(newItems[fourthCount])}>
                {newItems[fourthCount]?.sale > 0 ? (
                  <div className="new-arrival__card-img">
                    <img src={newItems[fourthCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                    <div className="new-arrival__img-sale" style={styles.headerMessage}>SALE</div>
                  </div>
                ) : (
                  <div className="new-arrival__card-img">
                    <img src={newItems[fourthCount]?.image} alt="" className="new-arrival__card-image"/>
                    <div className="new-arrival__img-new" style={styles.headerMessage}>NEW</div>
                  </div>
                )}
                <h5 className="new-arrival__card-title" style={styles.titleStyle}>{newItems[fourthCount]?.title}</h5>
                {newItems[fourthCount]?.sale > 0 ? (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-old-price" style={styles.headerText}>{newItems[fourthCount]?.price}$</span>
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{getSaleprice(newItems[fourthCount])}$</span>
                  </div>
                ) : (
                  <div className="new-arrival__card-cost">
                    <span className="new-arrival__card-price" style={styles.headerMessage}>{newItems[fourthCount]?.price}$</span>
                  </div>
                )}
              </Link>
            </div>
            <div className="new-arrival__cards_btn">
              <button className="new-arrival__btns-btn btn-new-arrival-next" style={fourthCount < newItems.length - 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999'}} onClick={getNextNewItems}>&#10095;</button>
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
      <StayInTouchComponent />
    </div>
  );
}
