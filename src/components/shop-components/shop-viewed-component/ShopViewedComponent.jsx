import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSaleprice } from '../../../utils/Utils.js';
import { setProductAction } from '../../../store/cardsReducer.js';
import { styles } from '../../../styles/styles.js';
import './shop-viewed.scss';

export default function ShopViewedComponent() {

	const dispatch = useDispatch();	
	const {viewed} = useSelector(state => state.cardsReducer);

	const viewed_storage = localStorage.getItem('viewed');
	const viewed_items = JSON.parse(viewed_storage);

	function showViewedProduct(card){
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
	<div className='shop-viewed'>
		<h3 className='shop-viewed__title' style={styles.titleStyle}>You have viewed</h3> 
		{viewed?.length > 3 ? (
			<div className='shop-viewed__block'>
				{viewed?.slice(viewed?.length - 4, viewed?.length -1)?.map((card, index) => (
					<Link to="/product" key={index + 1} className='shop-viewed__block-item' onClick = {() => showViewedProduct(card)}>
						<img src={card?.image} alt="" className='shop-viewed__item-image'/>
						<div className='shop-viewed__item-info'>
							<h5 className='shop-viewed__info-title' style={styles.headerText}>{card?.title?.toLowerCase()}</h5>
							<p className='shop-viewed__info-text' style={styles.headerText}>{getSaleprice(card)}$</p>
						</div>
					</Link>
				))}			
			</div>
		) : (
			<div className='shop-viewed__block'>
				{viewed?.slice(0,3)?.map((card, index) => (
					<Link to="/product" key={index + 1} className='shop-viewed__block-item' onClick = {() => showViewedProduct(card)}>
						<img src={card?.image} alt="" className='shop-viewed__item-image'/>
						<div className='shop-viewed__item-info'>
							<h5 className='shop-viewed__info-title' style={styles.headerText}>{card?.title?.toLowerCase()}</h5>
							<p className='shop-viewed__info-text' style={styles.headerText}>{getSaleprice(card)}$</p>
						</div>
					</Link>
				))}			
			</div>
		)}
	</div>
  )
}
