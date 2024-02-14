const SET_SHOWROOM = "SET_SHOWROOM";
const GET_SHOWROOM_PAGE_COUNT = "GET_SHOWROOM_PAGE_COUNT";
const GET_SHOWROOM_PAGE_ITEMS = "GET_SHOWROOM_PAGE_ITEMS";
const INCREMENT_CURRENT_PAGE ="INCREMENT_CURRENT_PAGE";
const DECREMENT_CURRENT_PAGE = "DECREMENT_CURRENT_PAGE";


const defaultState ={ 
    showroom_shopCards: [] ,  
    showroom_items: [],
	showroom_title: "",
    showroom_status: "",
	showroom_info: "",  
    showroom_limit: 6,
    showroom_countPage: 1,
    showroom_current_page : 1,
}

export const showRoomReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_SHOWROOM: return {...state, showroom_items: action.payload.slice(0, 6),
                                    showroom_shopCards: action.payload,
									showroom_title: action.payload2,
                                    showroom_status:action.payload3,
									showroom_info:action.payload4,
                                    showroom_current_page: 1 }; 
        case GET_SHOWROOM_PAGE_COUNT: return {...state, showroom_countPage: Math.ceil(state.showroom_shopCards.length / state.showroom_limit)};
        case GET_SHOWROOM_PAGE_ITEMS: return {...state, showroom_items: state.showroom_shopCards.slice((action.payload - 1) * state.showroom_limit, action.payload * state.showroom_limit),
                                                showroom_current_page: action.payload};
        case INCREMENT_CURRENT_PAGE: return {...state, showroom_current_page: state.showroom_current_page + 1};                                    
        case DECREMENT_CURRENT_PAGE: return {...state, showroom_current_page: state.showroom_current_page - 1}                                    
        default: return state;
    }
}

export const setShowRoomAction = (payload, payload2, payload3, payload4) => {
    return { type: SET_SHOWROOM, payload, payload2, payload3, payload4}
};

export const getShowRoomPageCountAction = () => {
    return { type: GET_SHOWROOM_PAGE_COUNT}
};
export const getShowRoomPageITEMSAction = (payload) => {
    return { type: GET_SHOWROOM_PAGE_ITEMS, payload}
};
export const incrementShowroomCurrentPageAction = () => {
    return { type: INCREMENT_CURRENT_PAGE}
};
export const decrementShowroomCurrentPageAction = () => {
    return { type: DECREMENT_CURRENT_PAGE}
};

