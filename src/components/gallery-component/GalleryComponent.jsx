import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound-component/NotFoundComponent.jsx';
import {setProductAction} from '../../store/cardsReducer.js';
import { setCurrentPageNameAction } from '../../store/headerReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { getSaleprice } from '../../utils/Utils.js';
import {styles} from '../../styles/styles.js';
import './gallery.scss';


export default function GalleryComponent() {

	const dispatch = useDispatch();
  	const {cards} = useSelector(state => state.cardsReducer); 	
	const [firstCount, setFirstCount] = useState(0);
	const [secondCount, setSecondCount] = useState(1);	

	const viewed_storage = localStorage['viewed'];
	const viewed_items = JSON.parse(viewed_storage);

	function getNextGalleryItems(){
		if(viewed_items.length > 1){
			if(secondCount < viewed_items.length - 1){
				setFirstCount(firstCount + 1);
				setSecondCount(secondCount + 1);
			}
		}   
    }

  function getPreviousGalleryItems(){
	if(viewed_items.length > 1){
		if(firstCount > 0){
			setFirstCount(firstCount - 1);
			setSecondCount(secondCount - 1);
		}
	}   
  }

  function setPageInfo(pageName){
	dispatch(setPageAction(pageName));
	localStorage.setItem('pageName', pageName);
  }

  function goToProductCardOnly(card){
    dispatch(setProductAction(card));  
    dispatch(setCurrentPageNameAction('shop'));
	setPageInfo('shop');
	window.scrollTo(0, 450);      
  }
  
 
  return (
	<div>
		{viewed_items?.length > 0 ? (
		<div className='gallery'>
			{cards.length ? (
	        <div className="gallery-block">         
	          {viewed_items.length > 0 && (
				<div className="gallery-block__content">
	            <p className="gallery-block__content-logo" style={styles.logoStyle}>Cosmetics</p>
	            <h2 className="gallery-block__content-title" style={styles.titleStyle}>You have viewed</h2>
	            <p className="gallery-block__content-text" style={styles.headerText}>
	              Nourish your skin with toxin-free cosmetic products. With the
	              offers that you can’t refuse.
	            </p>
	          	</div>
			  )}
			  {viewed_items.length > 0 && (		
	          <div className="gallery-block__cards">
	            <div className="gallery-block__cards_btn">
	              <button className={viewed_items?.length > 1 ? "gallery-block__btns-btn gallery-left-btn--active" : "gallery-block__btns-btn gallery-left-btn"} 
	               style={firstCount >= 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999', border: '2px solid #999999'}}
	               onClick={getPreviousGalleryItems}>&#10094;
	               </button>
	            </div>
	            <div className="gallery-block__cards-block">
	              <Link to="/product" className="gallery-block__block-card" style={viewed_items.length < 2 ? styles.galleryOneItemStyle: styles.galleryTwoItemStyle}
				   onClick={() => goToProductCardOnly(viewed_items[firstCount])}>                
	                  <div className="gallery-block__card-img">
	                    <img src={viewed_items[firstCount]?.image} alt="" className="gallery-block__card-image"/>                    
	                  </div>               
						{viewed_items[firstCount]?.sale > 0 ? (
						    <div className='gallery-block__card-info'>							
								<div className="gallery-block__img-sale" style={styles.headerMessage}>SALE</div>
								{viewed_items[firstCount]?.new === true && (
									<div className="gallery-block__img-new" style={styles.headerMessage}>NEW</div>
								)}
								<h5 className="gallery-block__card-title" style={ styles.titleStyle}>{viewed_items[firstCount]?.title.toLowerCase()}</h5>
								<p className="gallery-block__card-text" style={viewed_items.length < 2 ? styles.galleryOneCardText :styles.headerText}>{viewed_items[firstCount]?.description}</p>
								{viewed_items[firstCount]?.sale > 0 ? (
								<div className="gallery-block__card-cost">
									<span className="gallery-block__card-old-price" style={styles.headerText}>{viewed_items[firstCount]?.price}$</span>
									<span className="gallery-block__card-price" style={styles.headerMessage}>{getSaleprice(viewed_items[firstCount])}$</span>
								</div>
								) : (
								<div className="gallery-block__card-cost">
									<span className="gallery-block__card-price" style={styles.headerMessage}>{viewed_items[firstCount]?.price}$</span>
								</div>
								)}
							</div>
							) : (
							<div className='gallery-block__card-info'>
								{viewed_items[firstCount]?.new === true && (
									<div className="gallery-block__img-new new-gallery" style={styles.headerMessage}>NEW</div>
								)}
								<h5 className="gallery-block__card-title" style={styles.titleStyle}>{viewed_items[firstCount]?.title.toLowerCase()}</h5>
								<p className="gallery-block__card-text" style={viewed_items.length < 2 ? styles.galleryOneCardText :styles.headerText}>{viewed_items[firstCount]?.description}</p>
							{viewed_items[firstCount]?.sale > 0 ? (
							<div className="gallery-block__card-cost">
								<span className="gallery-block__card-old-price" style={styles.headerText}>{viewed_items[firstCount]?.price}$</span>
								<span className="gallery-block__card-price" style={styles.headerMessage}>{getSaleprice(viewed_items[firstCount])}$</span>
							</div>
							) : (
							<div className="gallery-block__card-cost">
								<span className="gallery-block__card-price" style={styles.headerMessage}>{viewed_items[firstCount]?.price}$</span>
							</div>
							)}
						</div>
					)}
	              </Link>
	              {viewed_items.length > 1 && (
					<Link to="/product" className="gallery-block__block-card" style={viewed_items.length > 1 ? styles.galleryTwoItemStyle: styles.galleryOneItemStyle}
					 onClick={() => goToProductCardOnly(viewed_items[secondCount])} >
						<div className="gallery-block__card-img">
	                    <img src={viewed_items[secondCount]?.image} alt="" className="gallery-block__card-image"/>                    
	                  </div>               
						{viewed_items[secondCount]?.sale > 0 ? (
						    <div className='gallery-block__card-info'>							
								<div className="gallery-block__img-sale" style={styles.headerMessage}>SALE</div>
								{viewed_items[secondCount]?.new === true && (
									<div className="gallery-block__img-new" style={styles.headerMessage}>NEW</div>
								)}
								<h5 className="gallery-block__card-title"style={styles.titleStyle}>{viewed_items[secondCount]?.title.toLowerCase()}</h5>
								<p className="gallery-block__card-text" style={styles.headerText}>{viewed_items[secondCount]?.description}</p>
								{viewed_items[secondCount]?.sale > 0 ? (
								<div className="gallery-block__card-cost">
									<span className="gallery-block__card-old-price" style={styles.headerText}>{viewed_items[secondCount]?.price}$</span>
									<span className="gallery-block__card-price" style={styles.headerMessage}>{getSaleprice(viewed_items[secondCount])}$</span>
								</div>
								) : (
								<div className="gallery-block__card-cost">
									<span className="gallery-block__card-price" style={styles.headerMessage}>{viewed_items[secondCount]?.price}$</span>
								</div>
								)}
							</div>
							) : (
							<div className='gallery-block__card-info'>
								{viewed_items[secondCount]?.new === true && (
									<div className="gallery-block__img-new new-gallery" style={styles.headerMessage}>NEW</div>
								)}
								<h5 className="gallery-block__card-title" style={styles.titleStyle}>{viewed_items[secondCount]?.title.toLowerCase()}</h5>
								<p className="gallery-block__card-text" style={styles.headerText}>{viewed_items[secondCount]?.description}</p>
							{viewed_items[secondCount]?.sale > 0 ? (
							<div className="gallery-block__card-cost">
								<span className="gallery-block__card-old-price" style={styles.headerText}>{viewed_items[secondCount]?.price}$</span>
								<span className="gallery-block__card-price" style={styles.headerMessage}>{getSaleprice(viewed_items[secondCount])}$</span>
							</div>
							) : (
							<div className="gallery-block__card-cost">
								<span className="gallery-block__card-price" style={styles.headerMessage}>{viewed_items[secondCount]?.price}$</span>
							</div>
							)}
						</div>
					)}					
					</Link>
				  )}              
	            </div>
	            <div className="gallery-block__cards_btn">
	              	<button className={viewed_items?.length > 1 ? "gallery-block__btns-btn gallery-right-btn--active" : "gallery-block__btns-btn gallery-right-btn"} 
						style={secondCount < viewed_items.length - 1 ? styles.galleryBtnStyle: {backgroundColor: "#FAF9FF", color: '#999999', border: '2px solid #999999'}}
						onClick={getNextGalleryItems}>&#10095;
					</button>
	            </div>
	          </div>
			  )}		  
	        </div>
	      ) : (
	        <NotFound />
	      )}
		</div>
		):(
			<div></div>
		)}
	</div>
  )
}
