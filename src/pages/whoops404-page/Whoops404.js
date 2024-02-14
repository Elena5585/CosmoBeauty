import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import { styles } from '../../styles/styles.js';
import './whoops.scss';

export default function Whoops404() {
	let location = useLocation();
  return (
	<div className='whoops'>
		<SubHeaderComponent/>
		<HeaderIntroComponent/>		
	  <section className='whoops__body'>		
		<img src="../../../src/assets/young-beautiful-sexy-hipster-woman-eating-candy-lollipop.png" alt="" className='whoops__body-img'/>
		<div className='whoops__body-block'>
			<h3 className='whoops__body-block--title' style={styles.titleStyle}>
				404
				<span className='title-404-span'>Page! not found!</span> 
			</h3>
			<p className='whoops__body-block--text' style={styles.headerText}>( Resource not found at <span className='whoops__tracker-red'>{location.pathname}</span> )</p>
			<Link to="/" className='whoops__body-block--link' style={styles.headerText}>Home page</Link>
			<Link to="/about" className='whoops__body-block--link' style={styles.headerText}>About page</Link>
			<Link to="/shop" className='whoops__body-block--link' style={styles.headerText}>Shop page</Link>
			<Link to="/profile" className='whoops__body-block--link' style={styles.headerText}>Profile page</Link>
		</div>
	  </section>
	</div>
  )
}
