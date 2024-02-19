import React from 'react';
import './brands.scss';

import '../../assets/brands/fifth_brand.svg';
import '../../assets/brands/first_brand.svg';
import '../../assets/brands/fourth_brand.svg';
import '../../assets/brands/second_brand.svg';
import '../../assets/brands/third_brand.svg';


export default function BrandsComponent() {
	
  return (
	<div className='brands__component'>
		<div className="trend__brands">
			<img src='./assets/brands/first_brand.svg' alt="" className="trend__brands-item"/>
			<img src="./assets/brands/second_brand.svg" alt="" className="trend__brands-item"/>
			<img src="./assets/brands/third_brand.svg" alt="" className="trend__brands-item"/>
			<img src="./assets/brands/fourth_brand.svg" alt="" className="trend__brands-item"/>
			<img src="./assets/brands/fifth_brand.svg" alt="" className="trend__brands-item"/>
	    </div>
	</div>
  )
}
