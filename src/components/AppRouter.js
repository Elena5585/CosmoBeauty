import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, routes, } from '../routes/routes.js';
import { useSelector } from 'react-redux';


export default function AppRouter() { 
  const {isAuth} = useSelector(state => state.authReducer);
  return (
    <div>
      {((isAuth === true ) || (localStorage['isAuth'] === 'true'))  ? ( 
        <Routes>            
              {routes.map((route, index) => (
                  <Route key={index + 1} path={route.path} element={route.element}/>
              ))}                                       
        </Routes>  
        ): (
          <Routes>            
            {privateRoutes.map((route, index) => (
                <Route key={index + 1} path={route.path} element={route.element}/>
            ))}                  
          </Routes>
        )}
    </div>
    
  )
}

  