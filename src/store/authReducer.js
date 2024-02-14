const SET_AUTH = "SET_AUTH";
const SET_REGISTER = "SET_REGISTER";

const defaultState ={    
    isAuth: false,
    isRegister: false,    
}

export const authReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_AUTH: return {...state, isAuth: action.payload };  
        case SET_REGISTER: return {...state, isRegister: action.payload};    
        default: return state;
    }
}

export const setAuthAction = (payload) => {
    return { type: SET_AUTH, payload}
};

export const setRegisterAction = (payload) => {
    return { type: SET_REGISTER, payload}
};