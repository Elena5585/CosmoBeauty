import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import { getShowRoomPageITEMSAction, incrementShowroomCurrentPageAction, decrementShowroomCurrentPageAction } from '../../store/showroomReducer.js';
import { setProductAction} from '../../store/cardsReducer.js';
import { setPageAction } from '../../store/pageReducer.js';
import { getSaleprice } from '../../utils/Utils.js';
import { styles } from '../../styles/styles.js';
import './styles/showroom.scss';
import './styles/showroom-body.scss';



export default function ShowRoomPage() {
    const dispatch = useDispatch();
	const {showroom_items, 
           showroom_title, 
           showroom_status, 
           showroom_info, 
           showroom_countPage,            
           showroom_shopCards, 
		   showroom_current_page} = useSelector(state => state.showRoomReducer);     
    const {discounts} = useSelector(state => state.cardsReducer); 
    
    const [pagesQuantity, setPagesQuantity] = useState([]);
    const [startPage, setStartPage] = useState(1);

    const viewed_storage = localStorage.getItem('viewed');
	const viewed_items = JSON.parse(viewed_storage);

    function setPageInfo(pageName){
        dispatch(setPageAction(pageName));
        localStorage.setItem('pageName', pageName);
    }

    function setCardProduct(card){        
        dispatch(setProductAction(card)); 
        if(viewed_items?.length > 0){
            let viewed_elems = [...viewed_items, card]
            localStorage.setItem('viewed', JSON.stringify(viewed_elems));
        }else {
            let viewed_elems = [card]
            localStorage.setItem('viewed', JSON.stringify(viewed_elems));
        }
        setPageInfo('shop');
        window.scrollTo(0,450);       
    }

    function countPageInShowroom(startPage){             
        let array = [];
        if(showroom_countPage > 5){
            if(startPage < showroom_countPage -4){
                for(let i = startPage; i <= showroom_countPage; i++){
                    array.push(i);
                }   
            }else{
                for(let i = showroom_countPage - 4; i <= showroom_countPage; i++){
                    array.push(i);
                }  
            }  
        }else {
            for(let i = startPage; i <= showroom_countPage; i++){
                array.push(i);
            }   
        }          
        setPagesQuantity(array);      
    }

    function goToNextPages(){
        if(startPage <  showroom_countPage){
          setStartPage(startPage + 1);
          countPageInShowroom(startPage + 1); 
          setPage(startPage); 
          dispatch(incrementShowroomCurrentPageAction());          
        }        
    }
    
    function goToPreviousPages(){
        if(startPage > 1){
            setStartPage(startPage - 1);  
            countPageInShowroom(startPage - 1);      
            setPage(startPage);
            dispatch(decrementShowroomCurrentPageAction());       
        }    
    }
  
    function setPage(page){      
      dispatch(getShowRoomPageITEMSAction(page)); 
      window.scrollTo(0,250);                   
    }  

    function updateGallery(){localStorage.setItem('viewed', JSON.stringify(viewed_items))}

    useEffect(() => { updateGallery() }, [viewed_items]);   

    useEffect(() => {setStartPage(1); countPageInShowroom(1);}, []);
    useEffect(() => {setStartPage(1); countPageInShowroom(1);}, [showroom_shopCards.length]);   

  return (
	<div className='showroom'>
		<SubHeaderComponent/>
		<section className='showroom__intro'> 
		    <img src="./assets/damask_rose-background.png" alt="" className='showroom_bg-decor'/>
			<img src="./assets/damask_rose-background.png" alt="" className='showroom_bg-decor showroom-second-left'/>        
			<img src="./assets/damask_rose-background.png" alt="" className='showroom__bg-decor showroom-left-right' />
			<img src="./assets/damask_rose-background.png" alt="" className='showroom__bg-decor showroom-right' />			
			<div className='showroom__intro-content'>
				<h3 className='showroom__content-title' style={styles.titleStyle}>{showroom_title.toLowerCase()}</h3>
				<p className='showroom__content-tracker' style={styles.headerText}>Home - {showroom_status.toLowerCase()} - <span className='tracker-red-style'>{showroom_title.toLowerCase()}</span></p>
                <p className='showroom__content-info' style={styles.middleTextStyle}>{showroom_info}</p>
			</div>
      	</section>
		<section className='showroom-body'>
			<img src="./assets/pink_powder.png" alt="" className='showroom-body__decor'/>
			<img src="./assets/pink.png" alt="" className='showroom-body__decor-2'/>            
			{showroom_items?.length > 0 ? (
                <div className='showroom__body-shop'>
                    {showroom_items?.map((card) => (
                        <Link to="/product"className='showroom__body-shop--card' key={card?.id} onClick={() => setCardProduct(card)}>
                            <div className='showroom__body-card--trackers'>
                                {card?.sale > 0 && (
                                    <div className='showroom__body-trackers--sale' style={styles.headerMessage}>SALE</div>
                                )}
                                {card?.new === true && (
                                    <div className='showroom__body-trackers--new' style={styles.headerMessage}>NEW</div>
                                )}
                            </div>
                            <div className='showroom__body-card--image'>
                                <img src={card?.image} alt="" className='showroom__body-card--img' />
                            </div>
                            <div className='showroom__body-card--info'>
                                <h4 className='showroom__body-info--title' style={styles.titleStyle}>{card?.title.toLowerCase()}</h4>                        
                                <h4 className='showroom__body-info--title showroom-card-brand' style={styles.titleStyle}>{card?.brand.toLowerCase()}</h4> 
                                <p className='showroom__body-info--text' style={styles.headerText}>{card?.description}</p>                       
                                {card?.sale > 0 ?(
                                <div className='showroom__body-price--block'>
                                    <p className='showroom__body-price--old' style={styles.headerText}>${card?.price}</p>
                                    <p className='showroom__body-price' style={styles.headerText}>${getSaleprice(card)}</p>
                                </div>
                                ): (
                                <div className='showroom__body-price--block'>
                                    <p className='showroom__body-price'style={styles.headerText}>${card?.price}</p>                              
                                </div>
                                )}                        
                            </div>
                        </Link>
                    ))}
                </div>
            ): (
                <div className='showroom__body-shop'>
                {discounts?.map((card) => (
                    <Link to="/product"className='showroom__body-shop--card' key={card?.id} onClick={() => setCardProduct(card)}>
                        <div className='showroom__body-card--trackers'>
                            {card?.sale > 0 && (
                                <div className='showroom__body-trackers--sale' style={styles.headerMessage}>SALE</div>
                            )}
                            {card?.new === true && (
                                <div className='showroom__body-trackers--new' style={styles.headerMessage}>NEW</div>
                            )}
                        </div>
                        <div className='showroom__body-card--image'>
                            <img src={card?.image} alt="" className='showroom__body-card--img' />
                        </div>
                        <div className='showroom__body-card--info'>
                            <h4 className='showroom__body-info--title' style={styles.titleStyle}>{card?.title.toLowerCase()}</h4>                        
                            <h4 className='showroom__body-info--title showroom-card-brand' style={styles.titleStyle}>{card?.brand.toLowerCase()}</h4> 
                            <p className='showroom__body-info--text' style={styles.headerText}>{card?.description}</p>                       
                            {card?.sale > 0 ?(
                            <div className='showroom__body-price--block'>
                                <p className='showroom__body-price--old' style={styles.headerText}>${card?.price}</p>
                                <p className='showroom__body-price' style={styles.headerText}>${getSaleprice(card)}</p>
                            </div>
                            ): (
                            <div className='showroom__body-price--block'>
                                <p className='showroom__body-price'style={styles.headerText}>${card?.price}</p>                              
                            </div>
                            )}                        
                        </div>
                    </Link>
                ))}
            </div>  
            )}
            <div className='showroom__block-pagination'>
                 <button className='showroom__pagination-button'  style={showroom_countPage > 5 ? styles.activeStyle: styles.passiveStyle} onClick={() => goToPreviousPages()}>&#10094;</button>
                {pagesQuantity?.slice(0, 5)?.map((page, index) => (
                    <div className='showroom__pagination-item' style={page === showroom_current_page ? styles.currentPageBtnStyle : styles.headerText} key= {index + 1} 
                     onClick={() => setPage(page)}>
                        {page}
                    </div>
                ))}
                <button className='showroom__pagination-button'  style={showroom_countPage > 5 ? styles.activeStyle: styles.passiveStyle} onClick={() => goToNextPages()}>&#10095;</button>                
            </div>
		</section>        
	</div>
  )
}
