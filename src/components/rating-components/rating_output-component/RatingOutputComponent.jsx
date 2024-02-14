import React, {useState, useEffect} from 'react';
import './rating_output.scss';

export default function RatingOutputComponent({card}) {
	const [rateIndicator, setRateIndicator] = useState([]);

	function getRateArray(card){
		let array = [];
		for(let i = 1; i <= card; i++ ){
			array.push(i);			
		}		
		setRateIndicator(array);		
	}

	useEffect(() => {getRateArray(card)}, [])
	
  return (
	<div className='rating-output'>
		{rateIndicator?.map((index) => (
			<span className="active" key={index + 1}></span>
		))}	
	</div>
  )
}
