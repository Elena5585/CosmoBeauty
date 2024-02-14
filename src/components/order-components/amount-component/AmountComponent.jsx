import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Promo_codes from '../../../../src/content/json/Promo_codes.json';
import { getSaleprice } from '../../../utils/Utils.js';
import { getPromoCodesAction, getTotalAmountAction, renewBasketAction } from '../../../store/basketReducer.js';
import { setPageAction } from '../../../store/pageReducer.js';
import { styles } from '../../../styles/styles.js';
import './amount.scss';

export default function AmountComponent() {

	const dispatch = useDispatch();
	const {basket, promo_codes} = useSelector(state => state.basketReducer);

	const[ promoCode, setPromoCode] = useState(localStorage['promocode']);
	const [promoMessage, setPromoMessage] = useState('');  

	async function getApi(){
		try{
			const response = await axios.get(Promo_codes);
			const data = response.data;
			dispatch(getPromoCodesAction(data));
		}
		catch(e){console.log(e);}
		
	}

	function getAmount(item){
		let amount = 0
		if(item.sale > 0){
		   amount = item.order * getSaleprice(item)
		}else {
		  amount = item.order * item.price;
		}
		return amount;
	}	

	function getTotalAmount(){
		let total = 0;
		basket.forEach((bask) => {
		  total += getAmount(bask);		  
		});  
		basket.map((bask) => bask.amount = getAmount(bask));
		
		dispatch(renewBasketAction(basket));
		if(promoCode?.length > 0) {
		  promo_codes.filter((code) => { 
		  if(code?.key === promoCode?.toLowerCase()){
			total = total - (total * (code.discount / 100)); 
			basket?.map((bask) => bask.amount = bask.amount - (bask.amount *(code.discount / 100)))
			dispatch(renewBasketAction(basket));
		  }})      
		}
		
		dispatch(getTotalAmountAction(total));  
		localStorage.setItem('totalamount', total?.toFixed(1));
	}
	
	function savePromoCode(){   
		if(promoCode?.length > 0){      
		 	if (promo_codes.find((code) => code?.key === promoCode?.toLowerCase())){         
			 getTotalAmount(); 
			 localStorage?.setItem("promocode", promoCode);        
			}		  
			if(!promo_codes.find((code) =>  code.key === promoCode?.toLowerCase())) {
				getTotalAmount(); 
				localStorage.setItem("promocode", promoCode);
			}	
		}else {setPromoMessage("*fill promo code"); setTimeout(() => {setPromoMessage("")}, 4000); localStorage.setItem("promocode", promoCode); }
	}

	function setPageInfo(pageName){
		dispatch(setPageAction(pageName));
		localStorage.setItem('pageName', pageName);
		window.scrollTo(0,0);
	} 
	
	useEffect(() => { getApi();}, []);
	useEffect(() => {getTotalAmount();}, [basket]);
	useEffect(() => {savePromoCode()}, [promoCode])

  return (
		<div className='total__full-block-content'>
            <div className='total__block-item item-goods'>
              <p className='total__item-title' style={styles.headerText}>Goods on</p>
              <p className='total__item-totalAmount' style={styles.headerText}>${localStorage["totalamount"]}</p>
            </div>            
            <div className='total__block-item item-discount'>
              <p className='total__item-title' style={styles.headerText}>Discount on promo code</p>              
              <div className='total__item-promo--block'>
                <input className='total__item-promocode--input' style={styles.headerText}  value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
                <button className='total__item-promocode--btn' onClick={savePromoCode}>Save</button>
              </div>             
            </div>                               
            <div className='total__block-item item-total'>
              <p className='total__item-total--item' style={styles.headerText}>total:</p>
              <p className='total__item-total--item' style={styles.headerText}>${localStorage["totalamount"]}</p>
            </div>
            <p className='total__item-message' style={styles.headerMessage}>{promoMessage}</p>
            <Link to="/order" style={styles.headerText} className='total-amount__block-btn total__btn-link' 
				onClick={() => { setPageInfo('checkout'); localStorage.setItem('basket', JSON.stringify(basket))}}>
              	CHECKOUT
            </Link>
        </div>
  )
}
