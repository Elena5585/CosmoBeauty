const SET_WISH = "SET_WISH";
const CLEAR_WISHLIST = "CLEAR_WISHLIST";

const defaultState ={    
    wishlist: []
}

export const wishReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_WISH: return {...state, wishlist: [...state.wishlist, action.payload]}; 
        case CLEAR_WISHLIST: return {...state, wishlist: []};      
        default: return state;
    }
}

export const setWishAction = (payload) => {
    return { type: SET_WISH, payload}
};
export const clearWishlistAction = () => {
    return { type: CLEAR_WISHLIST}
};

