const ADD_TO_BASKET = "ADD_TO_BASKET";
const ADD_TO_ITEM = "ADD_TO_ITEM";
const INCREMENT_ITEM = "INCREMENT_ITEM";
const DECREMENT_ITEM = "DECREMENT_ITEM";
const RENEW_BASKET = "RENEW_BASKET";
const GET_TOTAL_AMOUNT = "GET_TOTAL_AMOUNT";
const CLEAR_BASKET = "CLEAR_BASKET";
const GET_PROMOCODES = "GET_PROMOCODES";


const defaultState ={
    basket: [], 
    totalAmount: 0,
    promo_codes: [],
}

export const basketReducer = (state=defaultState, action) => {
    switch(action.type){
        case ADD_TO_BASKET: return {...state, basket: [...state.basket, action.payload]};
        case ADD_TO_ITEM: return {...state, basket: state.basket.map((bask) => {
            if(bask.id === action.payload.id){
                return {...bask, order: bask.order + action.payload.order}
            }
            return bask;
        } )};
        case INCREMENT_ITEM: return {...state, basket: state.basket.map((bask) => {
            if(bask.id === action.payload.id){                
                return {...bask, order: bask.order + 1}
            }
            return bask;
        })};
        case DECREMENT_ITEM: return {...state, basket: state.basket.map((bask) => {
            if(bask.id === action.payload.id){                
                return {...bask, order: bask.order - 1}
            }
            return bask;
        })};  
        case RENEW_BASKET: return {...state, basket: action.payload};           
        case GET_TOTAL_AMOUNT: return {...state, totalAmount: action.payload};
        case CLEAR_BASKET: return {...state, basket : []};
        case GET_PROMOCODES: return {...state, promo_codes: action.payload};
        

        default:return state;
    }
}

export const addToBasketAction = (payload) => {
    return {type: ADD_TO_BASKET, payload};
};

export const addToBasketItemAction = (payload) => {
    return {type: ADD_TO_ITEM, payload};
};

export const incrementBasketItemAction = (payload) => {
    return {type: INCREMENT_ITEM, payload}
};

export const decrementBasketItemAction = (payload) => {
    return {type: DECREMENT_ITEM, payload}
};
export const renewBasketAction = (payload) => {
    return{type: RENEW_BASKET, payload}
};
export const getTotalAmountAction = (payload) => {
    return {type: GET_TOTAL_AMOUNT, payload}
};
export const clearBasketAction = () => {
    return {type: CLEAR_BASKET}
};
export const getPromoCodesAction = (payload) => {
    return {type: GET_PROMOCODES, payload}
};

