const GET_TRENDS = "GET_TRENDS";
const GET_BODY_CARE ="GET_BODY_CARE";
const GET_HAIR_CARE = "GET_HAIR_CARE";
const GET_SKIN_CARE = "GET_SKIN_CARE";
const GET_MAKEUP = "GET_MAKEUP";
const GET_SPA = "GET_SPA";

const defaultState = {
	trends: [],
	searchedTrends: []
};

export const trendReducer = (state = defaultState, action) => {
    switch(action.type){        
        case GET_TRENDS: return {...state, 
			trends: action.payload.filter((action) => action.trend === true),
			searchedTrends: action.payload.filter((action) => action.trend === true)
		};        
        case GET_BODY_CARE: return {...state, searchedTrends: state.trends.filter((card) => card.category.toLowerCase().startsWith('body care'))};
        case GET_HAIR_CARE: return {...state, searchedTrends: state.trends.filter((card) => card.category.toLowerCase().startsWith('hair care'))};
        case GET_SKIN_CARE: return {...state, searchedTrends: state.trends.filter((card) => card.category.toLowerCase().startsWith('skin care'))};
        case GET_MAKEUP: return {...state, searchedTrends: state.trends.filter((card) => card.category.toLowerCase().startsWith('make up'))};
        case GET_SPA: return {...state, searchedTrends: state.trends.filter((card) => card.category.toLowerCase().startsWith('spa'))};         
		default: return state;
    }
}

export const getTrendsAction = (payload) => {
    return { type: GET_TRENDS, payload}
};

export const getBodyCareAction = () => {
    return { type: GET_BODY_CARE}
};
export const getHairCareAction = () => {
    return { type: GET_HAIR_CARE}
};

export const getSkinCareAction = () => {
    return { type: GET_SKIN_CARE}
};

export const getMakeupAction = () => {
    return { type: GET_MAKEUP}
};

export const getSpaAction = () => {
    return { type: GET_SPA}
};