import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { useDispatch} from 'react-redux';
import axios from 'axios';
import AppRouter from "./components/AppRouter.js";
import HeaderComponent from './components/header-components/header/HeaderComponent.jsx';
import FooterComponent from "./components/footer-component/FooterComponent.jsx";
import API from '../src/content/json/API.json';
import Testimonials from './content/json/Testimonials.json';
import Promo_codes from './content/json/Promo_codes.json';
import { getCardsAction, setPageQuantityAction} from "./store/cardsReducer.js";
import { getTrendsAction } from './store/trendReducer.js';
import { getTestimonialsAction } from './store/testimonialReducer.js';
import './App.scss';
import './images.js';

function App() {
  const dispatch = useDispatch();

  function getApi(){  
      dispatch(getCardsAction(API));        
      dispatch(getTrendsAction(API)); 
      dispatch(getTestimonialsAction(Testimonials)); 
      dispatch(getPromoCodesAction(Promo_codes)); 
      dispatch(setPageQuantityAction());    
  } 
  
  useEffect(() =>  {getApi();}, []);

     
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []); 


  return (      
    <HashRouter>
      <HeaderComponent/>   
      <AppRouter/>
      <FooterComponent/>      
    </HashRouter>   
  );
}

export default App;
