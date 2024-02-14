const SET_CATEGORY = "SET_CATEGORY";

const defaultState ={    
    category: "body care"
}

export const categoryReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_CATEGORY: return {...state, category: action.payload};       
        default: return state;
    }
}

export const setCategoryAction = (payload) => {
    return { type: SET_CATEGORY, payload}
};