import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { useDispatch} from 'react-redux';
import axios from 'axios';
import AppRouter from "./components/AppRouter.js";
import HeaderComponent from './components/header-components/header/HeaderComponent.jsx';
import FooterComponent from "./components/footer-component/FooterComponent.jsx";
import API from '../src/content/json/API.json';
import Testimonials from './content/json/Testimonials.json';
import { getCardsAction, setPageQuantityAction} from "./store/cardsReducer.js";
import { getTrendsAction } from './store/trendReducer.js';
import { getTestimonialsAction } from './store/testimonialReducer.js';
import './App.scss';
import './images.js';

function App() {
  const dispatch = useDispatch();

  async function getApi(){ 
  //   try{        
  //     const response = await axios.get(API);
  //     const data = response.data;
  //     const responseTestimonials = await axios.get(Testimonials);
  //     const dataTestimonials = responseTestimonials.data;  
  //     dispatch(getCardsAction(data));        
  //     dispatch(getTrendsAction(data)); 
  //     dispatch(getTestimonialsAction(dataTestimonials));  
  //     dispatch(setPageQuantityAction());   
  //   } 
  //   catch(e){ console.log(e);}  
      dispatch(getCardsAction(API));
      dispatch(getTrendsAction(API)); 
      dispatch(getTestimonialsAction(Testimonials));  
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
