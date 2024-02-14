const GET_TESTIMONIALS = "GET_TESTIMONIALS";
const ADD_TESTIMONIAL = "ADD_TESTIMONIAL";
const SET_RATING = "SET_RATING";

const defaultState ={
    testimonials: [],  
    rating: 5,   
}

export const testimonialReducer = (state = defaultState, action) => {
    switch(action.type){        
        case GET_TESTIMONIALS: return {...state, testimonials: action.payload};
		case ADD_TESTIMONIAL: return {...state, testimonials: [...state.testimonials, action.payload]};

        case SET_RATING: return {...state, rating: action.payload}
		default: return state;
	}
}

export const getTestimonialsAction = (payload) => {
    return { type: GET_TESTIMONIALS, payload}
};
export const addTestimonialAction = (payload) => {
    return { type: ADD_TESTIMONIAL, payload}
};

export const setRatingAction = (payload) => {
    return {type: SET_RATING, payload}
};