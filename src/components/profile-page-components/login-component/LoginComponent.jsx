import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { users } from "../../users/Users.js";
import { setAuthAction, setRegisterAction } from "../../../store/authReducer.js";
import { setPageAction } from '../../../store/pageReducer.js';
import { styles } from '../../../styles/styles.js';
import "./login.scss";

import "../../../assets/icons/registration-decor.svg";

export default function LoginComponent() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const userTest = localStorage.getItem('user');
  const userItem = JSON.parse(userTest);

  function setPageInfo(pageName){
    dispatch(setPageAction(pageName));
    localStorage.setItem('pageName', pageName);
  }

  function setRegisterOn() {
    dispatch(setRegisterAction(false));
    localStorage.setItem("isRegister", false); 
    navigate('/register'); 
    setPageInfo('registration form');
  }
  
  function loginAccount() {    
    if ((userItem?.email === email) || (users?.email === email)) {      
      if ((userItem?.password === password) || (users?.password === password) || (localStorage.getItem("password") === password)) {
        if (remember === true) {
            localStorage.setItem("email", (email || userItem.email)); 
            localStorage.setItem("password", (password || userItem.password));
            dispatch(setAuthAction(true));
            localStorage.setItem("isAuth", true);
            setEmail("");
            setPassword("");  
            setPageInfo('shop');
            navigate('/shop');                          
        } else {
          dispatch(setAuthAction(true));
          localStorage.setItem("isAuth", true);
          setPageInfo('shop');
          setEmail("");
          setPassword("");               
          navigate('/shop');                        
        }
      } else {
        setLoginMessage("Enter valid password");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      }
    } else {
      setLoginMessage("Enter correct email");
      setTimeout(() => {
        setLoginMessage("");
      }, 3000);
    }
  }

  function setLocalStorageToValue(){
    if(localStorage["email"]){setEmail(localStorage["email"])}
    if(localStorage["password"]){setPassword(localStorage["password"])}
  };

  useEffect(() => {setLocalStorageToValue(); }, []);

  return (
    <form className="login_form" onSubmit={loginAccount}>
      <img src="../../../src/assets/icons/registration-decor.svg" alt=""className="login__form-decor" />
      <h2 className="login__form-title" style={styles.titleStyle}>log in</h2>
      <input type="email" className="login__input" style={styles.headerText} placeholder={localStorage["email"]?.length === 0 ? "Enter your email..." : ""}
        value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" name='password' autoComplete='on' className="login__input" style={styles.headerText} placeholder={localStorage["password"]?.length === 0 ? "Enter your password..." : ""}
        value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      <div className="login__form-message">{loginMessage}</div>
      <div className="login__form-remember">
        <button type="button" className="login__remeber-status" onClick={() => setRemember(!remember)}>
          {remember === true && (
            <img src="../../../../src/assets/icons/ok-remember.svg" alt="" className="login__remember-icon" />
          )}
        </button>
        <p className="login__remember-title" style={styles.headerText} onClick={() => setRemember(!remember)}>Remember me</p>
      </div>
      <button type="submit" className="login__form-btn" style={styles.headerMessage} >LOG IN
      </button>
      <div className="login__form-register" style={styles.headerText}>
        No account?
        <span className="register__link-red" onClick={setRegisterOn}>
          Register now?
        </span>
      </div>
    </form>
  );
}
