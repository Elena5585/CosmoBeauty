import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { setProductAction} from '../../../store/cardsReducer.js';
import { getSaleprice } from '../../../utils/Utils.js';
import { styles } from '../../../styles/styles.js';
import './shopTop.scss';


export default function ShopTopComponent() {
    const dispatch = useDispatch();
    const {cards} = useSelector(state => state.cardsReducer);  
    const [tops, setTops] = useState(cards);    

    const viewed_storage = localStorage.getItem('viewed');
	  const viewed_items = JSON.parse(viewed_storage);

    function getTops(){ setTops(tops.sort((a,b) => parseFloat(b.sale) - parseFloat(a.sale)).slice(50, 53));};
    
    function showTopCard(top){
      dispatch(setProductAction(top));  
      if(viewed_items?.length > 0){
        let viewed_elems = [...viewed_items, top]
        localStorage.setItem('viewed', JSON.stringify(viewed_elems));
      }else {
          let viewed_elems = [top]
          localStorage.setItem('viewed', JSON.stringify(viewed_elems));
      }
      window.scrollTo(0, 450);       
    }    

    useEffect(() => {      
       getTops();}, []);

    function updateGallery(){localStorage.setItem('viewed', JSON.stringify(viewed_items))}

    useEffect(() => { updateGallery() }, [viewed_items]);  
    
      
  return (
    <div className='shop__view-products'>
        <h3 className='shop__view-products--title' style={styles.titleStyle}>Top 3 For Today</h3>               
        {tops?.map((top) => (
            <Link to="/product" key={top?.id} className='shop__view-products--item' onClick={() => showTopCard(top)}>
              <img src={top?.image} alt="" className='shop__view-products--image'/>
              <div className='shop__view-products--info'>
                  <h4 className='shop__view-products--info_title' style={styles.headerText}>{top?.title.toLowerCase()}</h4>
                  <p className='shop__view-products--info_price' style={styles.headerText}>{getSaleprice(top)}$</p>
              </div>
            </Link>
        ))}
    </div>
  )
}
