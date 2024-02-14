
import AboutPage from "../pages/about-page/AboutPage.js";
import BasketPage from "../pages/basket-page/BasketPage.js";
import OrderPage from "../pages/order-page/OrderPage.js";
import WishPage from "../pages/wish-page/WishPage.js";
import CategoryPage from "../pages/category-page/CategoryPage.js";
import HomePage from "../pages/home-page/HomePage.js";
import ShopItemPage from "../pages/shop_item-page/ShopItemPage.js";
import ShopPage from "../pages/shop-page/ShopPage.js";
import ContactPage from "../pages/contact-page/ContactPage.js";
import ShowRoomPage from '../pages/showroom-page/ShowRoomPage.js';
import RegistrationPage from '../pages/profile-navigation-pages/registration-page/RegistrationPage.js';
import LoginPage from '../pages/profile-navigation-pages/login-page/LoginPage.js';
import ProfileInfoPage from '../pages/profile-navigation-pages/profile_info-page/ProfileInfoPage.js';
import ProfileOrdersPage from '../pages/profile-navigation-pages/profile_orders-page/ProfileOrdersPage.js';
import ProfileWishesPage from '../pages/profile-navigation-pages/profile_wishes-page/ProfileWishesPage.js';
import ProfileSubscriptionPage from '../pages/profile-navigation-pages/profile_subscribtion-page/ProfileSubscriptionPage.js';
import Whoops404 from '../pages/whoops404-page/Whoops404.js';




export const routes = [
    {path: '/', element: <HomePage/>},    
    {path: '/about', element: <AboutPage/>},
    {path: '/basket', element: <BasketPage/>},
    {path: '/order', element: <OrderPage/>},    
    {path: '/wish', element: <WishPage/>},       
    {path: '/category', element: <CategoryPage/>},     
    {path: '/product', element: <ShopItemPage/>},
    {path: '/shop', element: <ShopPage/>},    
    {path: '/contacts', element: <ContactPage/>},
    {path: '/discount', element: <ShowRoomPage/>},
    {path: '/showroom', element: <ShowRoomPage/>},
    {path: '/info', element: <ProfileInfoPage/>},
    {path: '/myorders', element: <ProfileOrdersPage/>},
    {path: '/mywish', element: <ProfileWishesPage/>},
    {path: '/subscribe', element: <ProfileSubscriptionPage/>},
    {path: '*', element: <Whoops404/>},
];
export const privateRoutes = [    
    {path: '/', element: <HomePage/>},
    {path: '/about', element: <AboutPage/>}, 
    {path: '/register', element:<RegistrationPage/>},   
    {path: '/login', element:<LoginPage/>},       
    {path: '/category', element: <CategoryPage/>},     
    {path: '/product', element: <ShopItemPage/>},
    {path: '/shop', element: <ShopPage/>},    
    {path: '/contacts', element: <ContactPage/>},
    {path: '/discount', element: <ShowRoomPage/>},
    {path: '/showroom', element: <ShowRoomPage/>},
    {path: '*', element: <Whoops404/>},
    {path: '/info', element: <ProfileInfoPage/>},
];