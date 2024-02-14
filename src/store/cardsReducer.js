const GET_CARDS = "GET_CARDS";
const GET_SEARCH_CARDS = "GET_SEARCH_CARDS";
const GET_SEARCH_NEW = "GET_SEARCH_NEW";
const GET_SEARCH_SALE = "GET_SEARCH_SALE";
const GET_SEARCH_NEW_AND_SALE = "GET_SEARCH_NEW_AND_SALE";
const GET_BODY_CARE ="GET_BODY_CARE";
const GET_HAIR_CARE = "GET_HAIR_CARE";
const GET_SKIN_CARE = "GET_SKIN_CARE";
const GET_MAKEUP = "GET_MAKEUP";
const GET_SPA = "GET_SPA";
const GET_SEARCH = "GET_SEARCH";
const CHANGE_NEW_STATUS = "CHANGE_NEW_STATUS";
const CHANGE_SALE_STATUS = "CHANGE_SALE_STATUS";
const SET_DEFAUILT_SALE_NEW_STATUS = "SET_DEFAUILT_SALE_NEW_STATUS";
const CHANGE_CATEGORY_STATUS = "CHANGE_CATEGORY_STATUS";
const GET_SEARCH_BY_PRICE = "GET_SEARCH_BY_PRICE";
const SEARCH_CARDS = "SEARCH_CARDS";
const CHANGE_PRICE_VALUE = "CHANGE_PRICE_VALUE";
const CHANGE_CATEGORY = "CHANGE_CATEGORY";
const SET_PAGE_QUANTITY = "SET_PAGE_QUANTITY";
const GET_PAGE_ITEMS = "GET_PAGE_ITEMS";
const PAGE_INCREMENT = "PAGE_INCREMENT";
const PAGE_DECREMENT = "PAGE_DECREMENT";


const GET_PRODUCT = "GET_PRODUCT";
const BUY_ITEM = "BUY_ITEM";
const BASKET__INCREMENT = "BASKET__INCREMENT";
const BASKET__DECREMENT = "BASKET__DECREMENT";
const SET_FAVOURITE = "SET_FAVOURITE";


const defaultState = {
    cards: [],     
    searchedCards: [], 
    shopCards: [],    
    newItems: [],
    discounts: [],
    newCollection: [],   
    bodycare: [],
    skincare: [],
    haircare: [],
    spa: [],
    makeup: [],
    new_status: false,
    sale_status: false,
    category_status: 'all',
    search_item: '',
    product: {},
    viewed: [],
    limit: 12,
    pageCount: 1,
    current_page: 1,
    priceValue: {firstValue: 0, secondValue: 200, min: 0, max: 200, left: 0, right: 200, display1: 0, display2: 200},
    category: 'all'
}

export const cardsReducer = (state = defaultState, action) => {
    switch(action.type){
        // получаем все массивы        
        case GET_CARDS: return {...state, cards: action.payload, 
            searchedCards: action.payload.slice(0, 12),   
            shopCards:action.payload,        
            newItems: action.payload.filter((action) => action.new === true),  
            discounts: action.payload.filter((action) => action.sale > 0), 
            newCollection: action.payload.filter((card) => card.new_collection === true),
            bodycare: action.payload.filter((card) => card.category.toLowerCase() === 'body care'),                  
            skincare: action.payload.filter((card) => card.category.toLowerCase() === 'skin care'),                  
            haircare: action.payload.filter((card) => card.category.toLowerCase() === 'hair care'),                  
            spa: action.payload.filter((card) => card.category.toLowerCase() === 'spa'),                  
            makeup: action.payload.filter((card) => card.category.toLowerCase() === 'make up')                            
        }; 
        // сортируем searchedCards
        case GET_SEARCH_CARDS: return {...state, searchedCards: action.payload.filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                         shopCards: action.payload.filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2), current_page: 1}; // полныe массивы для фильтрации        
        case SEARCH_CARDS: return {...state, searchedCards: state.cards.filter(
            (card) => card.title.toLowerCase().startsWith(action.payload.toLowerCase()))
            .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0,12),
            shopCards: state.cards.filter((card) => card.title.toLowerCase().startsWith(action.payload.toLowerCase())).filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
             current_page: 1};
        case GET_SEARCH_NEW: return {...state, searchedCards: state.cards.filter((card) => card.new === true)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                        shopCards: state.cards.filter((card) => card.new === true)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2), 
                                        current_page: 1};
        case GET_SEARCH_SALE: return {...state, searchedCards: state.cards.filter((card) => card.sale > 0)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0,12),
                                        shopCards: state.cards.filter((card) => card.sale > 0)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                        current_page: 1};
        case GET_SEARCH_NEW_AND_SALE: return {...state, searchedCards: state.cards.filter((card) => card.new === true && card.sale > 0)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                        shopCards: state.cards.filter((card) => card.new === true && card.sale > 0)
                                        .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                        current_page: 1};
        case GET_BODY_CARE: return {...state, searchedCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('body care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                    shopCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('body care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                    current_page: 1};
        case GET_HAIR_CARE: return {...state, searchedCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('hair care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                    shopCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('hair care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                current_page: 1};
        case GET_SKIN_CARE: return {...state, searchedCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('skin care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                    shopCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('skin care'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                current_page: 1};
        case GET_MAKEUP: return {...state, searchedCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('make up'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                     shopCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('make up'))
                                     .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2), 
                                    current_page: 1};
        case GET_SPA: return {...state, searchedCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('spa'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2).slice(0, 12),
                                    shopCards: state.cards.filter((card) => card.category.toLowerCase().startsWith('spa'))
                                    .filter((card) => card.price >= state.priceValue.display1 && card.price <= state.priceValue.display2),
                                current_page: 1};
        case CHANGE_NEW_STATUS: return {...state, new_status: !state.new_status};
        case CHANGE_SALE_STATUS: return {...state, sale_status: !state.sale_status}; 
        case SET_DEFAUILT_SALE_NEW_STATUS: return {...state, new_status: false, sale_status: false};
        case CHANGE_CATEGORY_STATUS : return {...state, category_status: action.payload};                           
        case GET_SEARCH_BY_PRICE: return {...state, searchedCards: state.cards.filter((card) => card.price >= action.payload && card.price <= action.payload2).slice(0, 12),
                                            shopCards: state.cards.filter((card) => card.price >= action.payload && card.price <= action.payload2) }
        case CHANGE_PRICE_VALUE: return {...state, priceValue: action.payload}
        case CHANGE_CATEGORY: return {...state, category: action.payload}
        case GET_SEARCH: return {...state, search_item: action.payload}


        // получаем страницы и их содержимое
        case SET_PAGE_QUANTITY: return {...state, pageCount: Math.ceil(state.shopCards.length / state.limit)}
        case GET_PAGE_ITEMS: return{...state, searchedCards: state.shopCards.slice((action.payload - 1) * state.limit, action.payload * state.limit), current_page: action.payload}
        case PAGE_INCREMENT: return {...state, current_page: state.current_page + 1};                                    
        case PAGE_DECREMENT: return {...state, current_page: state.current_page - 1}  

        
        // получаем карточку продукта        
        case GET_PRODUCT: return {...state, product: action.payload, viewed: [...state.viewed, action.payload]};


        // покупаем товар
        case BUY_ITEM: return {...state, product: {...state.product, quantity: state.product.quantity - action.payload.order}, 
        cards: state.cards.map((card) => {
            if(card.id === action.payload.id){
                return{...card, quantity: card.quantity - action.payload.order}
            }
            return card;
        })}
        case BASKET__INCREMENT: return {...state, product: {...state.product, quantity: state.product.quantity - 1, order: state.product.order + 1}, 
        cards: state.cards.map((card) => {
            if(card.id === action.payload.id){
                return{...card, quantity: card.quantity - 1, order: card.order + 1}
            }
            return card;
        })};
        case BASKET__DECREMENT: return {...state, product: {...state.product, quantity: state.product.quantity + 1, order: state.product.order - 1}, 
        cards: state.cards.map((card) => {
            if(card.id === action.payload.id){
                return{...card, quantity: card.quantity + 1, order: card.order - 1}
            }
            return card;
        })};          
        case SET_FAVOURITE: return {...state, cards: state.cards.filter((card) => card.id === action.payload.id).map((card) => card.favourite = true)}     
        default: return state;
    }
}
//
export const getCardsAction = (payload) => {
    return { type: GET_CARDS, payload}
};
export const getSearchedCardsAction = (payload) => {
    return { type: GET_SEARCH_CARDS, payload}
};
export const getSearchedNewCardsAction = () => {
    return { type: GET_SEARCH_NEW}
};
export const getSearchedSaleCardsAction = () => {
    return { type: GET_SEARCH_SALE}
};
export const getSearchedNewAndSaleCardsAction = () => {
    return { type: GET_SEARCH_NEW_AND_SALE}
};
export const getSearchedBodyCareCardsAction = () => {
    return { type: GET_BODY_CARE}
};
export const getSearchedHairCareCardsAction = () => {
    return { type: GET_HAIR_CARE}
};
export const getSearchedSkinCareCardsAction = () => {
    return { type: GET_SKIN_CARE}
};
export const getSearchedSpaCardsAction = () => {
    return { type: GET_SPA}
};
export const getSearchedMakeupCardsAction = () => {
    return { type: GET_MAKEUP}
};
export const  getSearchAction = (payload) => {
    return {type: GET_SEARCH, payload}
};
export const changeNewStatusAction = () => {
    return { type: CHANGE_NEW_STATUS}
};
export const changeSaleStatusAction = () => {
    return { type: CHANGE_SALE_STATUS}
};
export const setDefaultNewSaleStatusAction = () => {
    return { type: SET_DEFAUILT_SALE_NEW_STATUS}
};
export const changeCategoryStatusAction = (payload) => {
    return { type: CHANGE_CATEGORY_STATUS, payload}
};

export const getSearchedCardsByPriceRange = (payload, payload2) => {
    return {type: GET_SEARCH_BY_PRICE, payload, payload2}
}
export const searchCardsAction = (payload) => {
    return { type: SEARCH_CARDS, payload}
};
export const pageIncrementAction = () => {
    return { type: PAGE_INCREMENT}
};
export const pageDecrementAction = () => {
    return { type: PAGE_DECREMENT}
};
export const changePriceValueAction = (payload) => {
    return {type: CHANGE_PRICE_VALUE, payload}
};
export const changeCategoryAction = (payload) => {
    return {type: CHANGE_CATEGORY, payload}
};
export const setPageQuantityAction = () => {
    return { type: SET_PAGE_QUANTITY}
};
export const getPageItemsAction = (payload) => {
    return { type: GET_PAGE_ITEMS, payload}
};


//
export const setProductAction = (payload) => {
    return { type: GET_PRODUCT, payload}
};

export const buyItemAction = (payload) => {
    return { type: BUY_ITEM, payload}
};
export const basketIncrementItemAction = (payload) => {
    return { type: BASKET__INCREMENT, payload}
};
export const basketDecrementItemAction = (payload) => {
    return { type: BASKET__DECREMENT, payload}
};

export const setFavouriteToCard = (payload) => {
    return {type: SET_FAVOURITE, payload}
}

