const ADD_TO_ORDERS = "ADD_TO_ORDERS";
const SEND_USER_ORDER = "SEND_USER_ORDER";


const defaultState ={
    orders: [], 
    payment_info: [],
    order_amount: 0,
    user_orders: [],
    user_order: {},
    note: ''
      
}

export const orderReducer = (state=defaultState, action) => {
    switch(action.type){
        case ADD_TO_ORDERS: return {...state, orders: [...state.orders, action.payload, action.payload2],
            payment_info: [...state.payment_info, 
                {payment_way: localStorage['payment_way'], 
                    user: JSON.parse(localStorage['user']), 
                    delivery_date:JSON.parse(localStorage['deliverydate']), 
                    order_number: localStorage['ordernumber']
                }                
            ]
        };
        case SEND_USER_ORDER: return {...state, user_order: action.payload}
        
        default:return state;
    }
}

export const addToOrdersAction = (payload, payload2) => {
    return {type: ADD_TO_ORDERS, payload, payload2};
};
export const sendOrderAction = (payload) => {
    return {type: SEND_USER_ORDER, payload};
};

