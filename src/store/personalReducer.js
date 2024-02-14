const SET_USER = "SET_USER";
const ADD_SUBSCRIBTION_TO_USER ="ADD_SUBSCRIBTION_TO_USER";
const ADD_PAYMENT_INFO = "ADD_PAYMENT_INFO";
const CLEAR_PAYMENT_INFO = "CLEAR_PAYMENT_INFO";

const defaultState ={ 
   user: {},  
   payment_way: '' 
}

export const personalReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_USER: return {...state,  user: {...action.payload, image: localStorage['image']}}; 
        case ADD_SUBSCRIBTION_TO_USER: return {...state, user: {...state.user, subscribtion: action.payload}}       
        case ADD_PAYMENT_INFO: return {...state, user: {...state.user, payment_way: action.payload}}   
        case CLEAR_PAYMENT_INFO: return {...state, user: {...state.user, payment_way: ''}}    
        default: return state;
    }
}

export const setUserItemAction = (payload) => {
    return { type: SET_USER, payload}
};
export const addSubscribtionToUserAction = (payload) => {
    return { type: ADD_SUBSCRIBTION_TO_USER, payload}
};
export const addPaymentWayAction = (payload) => {
    return { type: ADD_PAYMENT_INFO, payload}
};

export const clearPaymentWayAction = () => {
    return {type: CLEAR_PAYMENT_INFO}
}




