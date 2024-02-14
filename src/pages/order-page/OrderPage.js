import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SubHeaderComponent from '../../components/subheader-component/SubHeaderComponent.jsx';
import HeaderIntroComponent from '../../components/header_intro-component/HeaderIntroComponent.jsx';
import DeliveryInfoComponent from '../../components/order-components/delivery_info-component/DeliveryInfoComponent.jsx';
import BasketComponent from '../../components/order-components/basket-component/BasketComponent.jsx';
import AmountComponent from '../../components/order-components/amount-component/AmountComponent.jsx';
import PaymentComponent from '../../components/order-components/payment-component/PaymentComponent.jsx';
import { addToOrdersAction, sendOrderAction } from '../../store/orderReducer.js';
import { clearBasketAction } from '../../store/basketReducer.js';
import { clearPaymentWayAction } from '../../store/personalReducer.js';
import { styles } from '../../styles/styles.js';
import './styles/order.scss';
import './styles/delivery.scss';

import "../../assets/icons/checkout_step1.svg";
import "../../assets/icons/checkout-vector-done.svg";
import '../../assets/icons/checkout_step2_done.svg';
import '../../assets/icons/checkout_step2.svg';
import '../../assets/icons/checkout-vector-grey.svg';
import '../../assets/icons/checkout_step3_done.svg';
import '../../assets/icons/checkout_step3.svg';

export default function OrderPage() { 
    const dispatch= useDispatch();
    const {basket, totalAmount} = useSelector(state => state.basketReducer);
    const {orders, payment_info} = useSelector(state => state.orderReducer); 
    const {user} =   useSelector(state => state.personalReducer);   
    const {payment_way} = user;
    const [confirm, setConfirm]  = useState(0);
    const [infoMessage, setInfoMessage] = useState('');   
    const [count, setCount] = useState(0);
    const [paymentDone, setPaymentDone] = useState(false);

    const userObj = localStorage['user'];
    const userItem = JSON.parse(userObj);    

    function paymentStatus(){
        if(paymentDone === true){ return `Payment is successfully done`;};
        if(paymentDone === false) {return `Awaiting payment`;};
    }    

    function setConfirmPersonalInfo(){
        if(localStorage.getItem('name') 
            && localStorage.getItem('lastname')
            && localStorage.getItem('phone')
            && localStorage.getItem('email')
            && localStorage.getItem('address')
        ){
            setConfirm(1);                     
        }else {
            setInfoMessage('Please, fill all empty fields');
            setTimeout(() => {
                setInfoMessage('');
            }, 3000)
        }
    }   

    function confirmOrder(){                     
        if((payment_way === 'cash') || (payment_way === 'paypal') || (payment_way === 'card') ) {           
            if((payment_way === 'cash') || (payment_way === 'paypal') ) { 
                localStorage.removeItem('card');          
                setOrderNumber();              
                dispatch(addToOrdersAction(basket, totalAmount));        
                localStorage.setItem('orders', JSON.stringify(orders)); 
                localStorage.setItem('paymentinfo', JSON.stringify(payment_info));                 
                dispatch(clearBasketAction());        
                setConfirm(2); 
                dispatch(clearPaymentWayAction());
                localStorage.removeItem('payment_way');  
                const userObject ={
                    id: userItem.id,
                    name: localStorage['name'],
                    lastname:localStorage['lastname'],
                    email: localStorage['email'],
                    phone: localStorage['phone'],
                    country: localStorage['country'],
                    region: localStorage['region'],
                    city: localStorage['city'],
                    address: localStorage['address'],
                    deliverydate: `${localStorage['deliverydate']}/${localStorage['deliverymonth']}/${localStorage['deliveryyear']}`,
                    order: basket,
                    totalamount: totalAmount,
                    ordernumber: setOrderNumber(),
                    note: localStorage['note'], 
                    paymentinfo: payment_way,
                } 
                dispatch(sendOrderAction(userObject));         
            } 
            if(payment_way === 'card')  {                
                if(localStorage['card']){                   
                    setOrderNumber();              
                    dispatch(addToOrdersAction(basket, totalAmount));        
                    localStorage.setItem('orders', JSON.stringify(orders)); 
                    localStorage.setItem('paymentinfo', JSON.stringify(payment_info));                 
                    dispatch(clearBasketAction());        
                    setConfirm(2); 
                    dispatch(clearPaymentWayAction());
                    localStorage.removeItem('payment_way');  
                    const userObject ={
                        id: userItem.id,
                        name: localStorage['name'],
                        lastname:localStorage['lastname'],
                        email: localStorage['email'],
                        phone: localStorage['phone'],
                        country: localStorage['country'],
                        region: localStorage['region'],
                        city: localStorage['city'],
                        address: localStorage['address'],
                        deliverydate: `${localStorage['deliverydate']}/${localStorage['deliverymonth']}/${localStorage['deliveryyear']}`,
                        order: basket,
                        totalamount: totalAmount,
                        ordernumber: setOrderNumber(),
                        note: localStorage['note'], 
                        paymentinfo: payment_way,
                    } 
                    dispatch(sendOrderAction(userObject));
                    console.log(userObject); 
                }                
                localStorage.removeItem('card');
            } 
                       
        } else {
            setInfoMessage('*Please, choose convenient payment way!');
            setTimeout(() => {
                setInfoMessage('');
            }, 3000)
        }                  
    }

    function setOrderNumber(){
        const number = Date.now();
        const orderNumber = `CB-${number}_${count}`;
        localStorage.setItem('ordernumber', orderNumber);
        setCount(count + 1);
        return orderNumber;
    }

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    
  return (
    <div className='order'>        
        <SubHeaderComponent/>
        <img src="../../../src/assets/Depositphotos_127946766_XL-PhotoRoom.png-PhotoRoom.png" alt="" className='order-bg1'/>
        <section className='order__intro'>
            <HeaderIntroComponent/>        
            <div className='order__intro-steps'>
                <div className='order__intro-steps--item'>
                    <div className='order__steps-item--image-block'>
                        <img src="../../../src/assets/icons/checkout_step1.svg" alt="" className='order__steps-image--block-img'/>
                        <img src="../../../src/assets/icons/checkout-vector-done.svg" alt="" className='order__steps-image--block-vector'/>
                    </div>
                    <div className='order__steps-item--info-block'></div>
                </div>
                <div className='order__intro-steps--item'>
                    <div className='order__steps-item--image-block'>
                        <img src={ confirm >= 1 ? '../../../src/assets/icons/checkout_step2_done.svg' : '../../../src/assets/icons/checkout_step2.svg'} alt="" className='order__steps-image--block-img'/>
                        <img src={ confirm >= 1 ? '../../../src/assets/icons/checkout-vector-done.svg': '../../../src/assets/icons/checkout-vector-grey.svg'} alt="" className='order__steps-image--block-vector'/>
                    </div>
                    <div className='order__steps-item--info-block'></div>
                </div>
                <div className='order__intro-steps--item'>
                    <div className='order__steps-item--image-block'>
                        <img src={ confirm >= 2 ? '../../../src/assets/icons/checkout_step3_done.svg' : '../../../src/assets/icons/checkout_step3.svg'} alt="" className='order__steps-image--block-img'/>
                        <img src={ confirm >= 2 ? '../../../src/assets/icons/checkout-vector-done.svg': '../../../src/assets/icons/checkout-vector-grey.svg'} alt="" className='order__steps-image--block-vector'/>
                    </div>
                    <div className='order__steps-item--info-block'></div>
                </div>
            </div> 
        </section>    
        <section className='order-delivery'>           
            { confirm === 0 && (
                <div className='order-delivery__content center-content'>                    
                    <div className='order__delivery-content--block'>
                        <DeliveryInfoComponent/>
                        <div className='order-delivery-block--container adaptive-container'>
                            <BasketComponent/>
                            <AmountComponent/>                            
                        </div>
                    </div>
                    <div className='order__delivery-block--btns'>
                        <Link to="/basket" className='order__delivery-block--btn' style={styles.headerMessage} onClick={() => window.scrollTo(0,0)}><span>&#10094;</span>   Back</Link>
                        <button className='order__delivery-block--btn' style={styles.blackBtnStyle} onClick={() => {setConfirmPersonalInfo(); window.scrollTo(0,0);}}>  Next  <span> &#10095;</span></button>
                    </div>
                </div>            
            )}
            { confirm === 1 && (                
                <div className='order-delivery__content center-content'> 
                    <p style={styles.headerMessage} className='order__delivery-payment--message'>{infoMessage}</p>                   
                    <div className='order__delivery-content--block'>
                        <PaymentComponent/>
                        <div className='order-delivery-block--container'>
                            <BasketComponent/>
                            <AmountComponent/>                            
                        </div>                        
                    </div>                    
                    <div className='order__delivery-block--btns'>
                        <Link to="/order" className='order__delivery-block--btn' style={styles.headerMessage} onClick={() => {setConfirm(0); window.scrollTo(0,0)}}><span>&#10094;</span>   Back</Link>
                        <button className='order__delivery-block--btn' style={styles.blackBtnStyle} onClick={() =>{confirmOrder(); window.scrollTo(0,0);}}>  Next  <span> &#10095;</span></button>
                    </div>
                </div>
            )}
            {confirm === 2 && (
                <div className='order-delivery__content center-content'>
                    <div className='order__delivery-content--block'>
                        <div className='order-delivery-block--container'>
                            <h3 className='order__delivery-block-title' style={styles.titleStyle}>CosmoBeauty thanks <br/> you for your purchase!</h3>
                            <p className='order__delivery-block-text' style={styles.headerText}>
                                Dear Mr/Mrs <span className='order-delivery__item-span'>{localStorage?.getItem('name')} {localStorage?.getItem('lastname')}</span>, <br/>
                                Thank you for your purchase, your order delivery is in process! <br/>
                                You can see all your orders in your profile in "My Orders" tab.
                            </p>
                            <table name="order-info" className='order__delivery-block-table'>
                                <tbody>
                                    <tr key="number" className='order__delivery-table--tr'>
                                        <td className='order__delivery-table--td' style={styles.headerText}>Order number</td>
                                        <td className='order__delivery-table--td--light' style={styles.headerText}>{localStorage['ordernumber']}</td>
                                    </tr>
                                    <tr key="amount" className='order__delivery-table--tr'>
                                        <td className='order__delivery-table--td' style={styles.headerText}>Order amount</td>
                                        <td className='order__delivery-table--td--light' style={styles.headerText}>${localStorage["totalamount"]}</td>
                                    </tr>
                                    <tr key="status" className='order__delivery-table--tr'>
                                        <td className='order__delivery-table--td' style={styles.headerText}>Order status</td>
                                        <td className='order__delivery-table--td--light' style={styles.headerText}>{paymentStatus()}</td>
                                    </tr>
                                    <tr key="reserved" className='order__delivery-table--tr'>
                                        <td className='order__delivery-table--td' style={styles.headerText}>Reserved for</td>
                                        <td className='order__delivery-table--td--light' style={styles.headerText}>{localStorage['deliverydate']} / {localStorage['deliverymonth']} / {localStorage['deliveryyear']}</td>
                                    </tr>
                                    <tr key="expected" className='order__delivery-table--tr'>
                                    <td className='order__delivery-table--td' style={styles.headerText}>Expected loading day</td>
                                        <td className='order__delivery-table--td--light' style={styles.headerText}>{localStorage['deliverydate']} / {localStorage['deliverymonth']} / {localStorage['deliveryyear']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='order-delivery-block--container full-page-container'>
                            <BasketComponent/>                                                                                
                        </div>
                    </div>                    
                </div>
            )}
        </section>
        <img src="../../../src/assets/shutterstock_pink-blush-PhotoRoom.png-PhotoRoom.png" alt="" className='order-bg2'/>
    </div>
  )
}
