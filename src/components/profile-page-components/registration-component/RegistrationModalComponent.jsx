import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setRegisterAction } from "../../../store/authReducer.js";
import { setPageAction } from '../../../store/pageReducer.js';
import { styles } from "../../../styles/styles.js";
import "./registration.scss";

import "../../../assets/icons/ok-remember.svg";

export default function RegistrationModalComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [remember, setRemember] = useState(false);

  const userTest = localStorage.getItem('user');
  const userItem = JSON.parse(userTest);  

  function completeRegistration() {
    if (
      name.length &&
      lastName.length &&
      phone.length &&
      email.length &&
      password.length &&
      checkPassword.length
    ) {
      if (name.length >= 1 && lastName.length >= 1) {
        const phoneRegExp = /^\+?[1-9][0-9]{7,14}$/g;
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        if (phone.match(phoneRegExp) && email.match(emailRegExp)) {
          if (password === checkPassword) {
            const userObject = {
              id: Date.now() + `${lastName || localStorage.getItem('lastname')}`,
              name: name || localStorage.getItem('name'),
              lastName: lastName || localStorage.getItem('lastname'),
              phone: phone || localStorage.getItem('phone'),
              email: email || localStorage.getItem('email'), 
              password: password || localStorage.getItem('password')             
            };
            if (remember === true) {
              if(userItem?.email !== userObject.email){
                setRegisterDone();                             
                localStorage.setItem('user', JSON.stringify(userObject));
                localStorage.setItem("isRegister", true);                          
                localStorage.setItem("name", name);
                localStorage.setItem("lastname", lastName);
                localStorage.setItem("phone", phone);
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                
    
                localStorage.removeItem("country");
                localStorage.removeItem("region");
                localStorage.removeItem("city");
                localStorage.removeItem("address");
                localStorage.removeItem("gender");
                localStorage.removeItem("image");
                localStorage.removeItem("subscription");
                localStorage.removeItem('promocode');
                localStorage.removeItem('viewed');
                localStorage.removeItem('basket');    
                localStorage.removeItem("wishes");
                localStorage.removeItem("deliverydate");
                localStorage.removeItem("deliverymonth");
                localStorage.removeItem("deliveryyear");
                localStorage.removeItem("note");
                localStorage.removeItem("ordernumber");
                localStorage.removeItem("orders");
                localStorage.removeItem("paymentinfo");
                localStorage.removeItem("totalamount");
                setName("");
                setLastName("");
                setPhone("");
                setEmail("");
                setPassword("");
                setCheckPassword("");                                             
              }else {setFormMessage("User with the same email already exists"); setTimeout(() => {setFormMessage("");}, 3000);}
            } else {
              if(userItem?.email !== userObject.email){
              setRegisterDone();                     
              localStorage.setItem('user', JSON.stringify(userObject));
              localStorage.setItem("isRegister", true);

              
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              localStorage.removeItem("name");
              localStorage.removeItem("lastame");
              localStorage.removeItem("phone");
              localStorage.removeItem("country");
              localStorage.removeItem("region");
              localStorage.removeItem("city");
              localStorage.removeItem("address");
              localStorage.removeItem("gender");
              localStorage.removeItem("image");
              localStorage.removeItem("subscription");
              localStorage.removeItem('promocode');
              localStorage.removeItem('viewed');
              localStorage.removeItem('basket');    
              localStorage.removeItem("wishes");
              localStorage.removeItem("deliverydate");
              localStorage.removeItem("deliverymonth");
              localStorage.removeItem("deliveryyear");
              localStorage.removeItem("note");
              localStorage.removeItem("ordernumber");
              localStorage.removeItem("orders");
              localStorage.removeItem("paymentinfo");
              localStorage.removeItem("totalamount");
              setName("");
              setLastName("");
              setPhone("");
              setEmail("");
              setPassword("");
              setCheckPassword("");                                           
              }else {setFormMessage("User with the same email already exists"); setTimeout(() => {setFormMessage("");}, 3000);}
            }
          } else {
            setPasswordMessage("Your passwords do not match");
            setTimeout(() => {
              setPasswordMessage("");
            }, 3000);
          }
        } else {
          setContactMessage("Enter correct phone and email");
          setTimeout(() => {
            setContactMessage("");
          }, 3000);
        }
      } else {
        setNameMessage("Enter correct name and lastname");
        setTimeout(() => {
          setNameMessage("");
        }, 3000);
      }
    } else {
      setFormMessage("Enter empty fields");
      setTimeout(() => {
        setFormMessage("");
      }, 3000);
    }
  }

  function setRegisterDone() {
    dispatch(setRegisterAction(true));
    localStorage.setItem("isRegister", true);  
    navigate('/login');
    setPageInfo('login page');
  } 
  
  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }


  return (
    <form className="registration_form">
      <img  src="../../../src/assets/icons/registration-decor.svg"  alt=""  className="registration__form-decor" />
      <h2 className="registration__form-title" style={styles.titleStyle}>register now </h2>
      <div className="registration__form-message">{formMessage}</div>
      <div className="registration__form-block">
        <input type="text" className="registration__block-input" style={styles.headerText} placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" className="registration__block-input"  style={styles.headerText}  placeholder="Enter your last name" value={lastName}  onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <div className="registration__form-message">{nameMessage}</div>
      <div className="registration__form-block">
        <input type="tel" className="registration__block-input" style={styles.headerText} placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" className="registration__block-input" style={styles.headerText} placeholder="Enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="registration__form-message">{contactMessage}</div>
      <h4 className="registration__form-subtitle" style={styles.titleStyle}>Password</h4>
      <div className="registration__form-block">
        <input type="password" name='password' autoComplete='on' className="registration__block-input" style={styles.headerText} placeholder="Enter your password" value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" name='confirm_password' autoComplete='on' className="registration__block-input" style={styles.headerText} placeholder="Confirm password" value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}/>
      </div>
      <div className="registration__form-message">{passwordMessage}</div>
      <div className="registration__form-remember">
        <button type="button" className="registration__remeber-status"  onClick={() => setRemember(!remember)}>
          {remember === true && (
            <img src="../../../../src/assets/icons/ok-remember.svg" alt="" className="registration__remember-icon"/>
          )}
        </button>
        <p className="registratiom__remember-title" style={styles.headerText}>Remember me</p>
      </div>
      <button type="button" className="registration__form-btn" style={styles.headerMessage} onClick={completeRegistration}>REGISTRATION</button>
      <div className="registration__form-login" style={styles.headerText}>
        Already have an account?
        <span className="login__link-red" onClick={setRegisterDone}>
          Log in
        </span>
      </div>
    </form>
  );
}
