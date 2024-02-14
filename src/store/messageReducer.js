const ADD_TO_MESSAGES = "ADD_TO_MESSAGES";

const defaultState ={
    messages: [],     
}

export const messageReducer = (state = defaultState, action) => {
    switch(action.type){       
		case ADD_TO_MESSAGES: return {...state, messages: [...state.messages, action.payload]};
		default: return state;
	}
}

export const addToMessagesAction = (payload) => {
    return { type: ADD_TO_MESSAGES, payload}
};