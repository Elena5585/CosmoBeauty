// import React from 'react';
import { combineReducers, createStore} from "redux";
import { basketReducer } from "./basketReducer";
import { cardsReducer } from "./cardsReducer";
import { wishReducer } from "./wishReducer";
import { categoryReducer } from "./categoryReducer";
import { authReducer } from "./authReducer";
import { orderReducer } from "./orderReducer";
import { testimonialReducer } from './testimonialReducer';
import { messageReducer } from './messageReducer';
import { trendReducer } from './trendReducer';
import { showRoomReducer } from './showroomReducer';
import { headerReducer } from './headerReducer';
import { personalReducer } from './personalReducer';
import { pageReducer } from './pageReducer';



const rootReducer = {
    basketReducer,
    cardsReducer,    
    wishReducer,
    categoryReducer,
    authReducer,
    orderReducer,
    testimonialReducer,
    messageReducer, 
    trendReducer, 
    showRoomReducer,
    headerReducer, 
    personalReducer,
    pageReducer,
};

export const store = createStore(combineReducers(rootReducer));

