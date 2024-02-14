const SET_CURRENT_PAGE_NAME = "SET_CURRENT_PAGE_NAME";
const SET_BURGERMENU_STATUS ="SET_BURGERMENU_STATUS";

const defaultState ={ 
    currentPageName: '', 
    isBurger: true,
}

export const headerReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_CURRENT_PAGE_NAME: return {...state, currentPageName: action.payload };         
        case SET_BURGERMENU_STATUS: return {...state, isBurger: action.payload };         
        default: return state;
    }
}

export const setCurrentPageNameAction = (payload) => {
    return { type: SET_CURRENT_PAGE_NAME, payload}
};
export const setBurgerMenuStatusAction = (payload) => {
    return { type: SET_BURGERMENU_STATUS, payload}
};


