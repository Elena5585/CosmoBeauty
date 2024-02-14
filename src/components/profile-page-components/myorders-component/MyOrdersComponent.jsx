import React from 'react';
import OrderViewComponent from '../../order-components/order-component/OrderViewComponent.jsx';
import { styles } from '../../../styles/styles.js';
import './myorders.scss';

export default function MyOrdersComponent() {
    
    const orderItem = localStorage.getItem('orders');
    const orders = JSON.parse(orderItem)?.filter((order) => order.length > 0);       
   
  return (    
        <div className = 'my-orders__content'>
          <div className='my-orders__content-block'>
            <div className='my-orders__block-head'>
              <p className='my-orders__head-item orders-item-product' style={styles.titleStyle}>Product</p>
              <p className='my-orders__head-item orders-item-price' style={styles.titleStyle}>Price</p>
              <p className='my-orders__head-item orders-item-quantity' style={styles.titleStyle}>Quantity</p>
              <p className='my-orders__head-item orders-item-total' style={styles.titleStyle}>Delivery day</p>
              <p className='my-orders__head-item orders-item-status' style={styles.titleStyle}>Delivery status</p>
            </div>            
              {orders?.length > 0 ? (
                <div className='my-orders__block-body'>
                  {orders?.reverse()?.map((order, index) => (
                    <OrderViewComponent order={order} key={index}/>                  
                  ))}                  
                </div>
                ) : (
                <div className='my-orders__block-body--message'>You have no any orders yet.</div>
              )}                     
          </div>           
        </div>  
  )
}
