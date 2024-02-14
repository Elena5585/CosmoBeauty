const SET_PAGE = "SET_PAGE";

const defaultState ={    
    pageName: 'home', 
}

export const pageReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_PAGE: return {...state, pageName: action.payload};               
        default: return state;
    }
}

export const setPageAction = (payload) => {
    return { type: SET_PAGE, payload}
};

