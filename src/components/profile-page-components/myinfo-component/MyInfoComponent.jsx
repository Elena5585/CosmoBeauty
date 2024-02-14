import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUserItemAction } from '../../../store/personalReducer.js';
import { styles } from '../../../styles/styles.js';
import './myinfo.scss';

import '../../../assets/profile/avatar.webp';
import "../../../assets/icons/edit-icon.png";

export default function MyInfoComponent() {   

    const dispatch = useDispatch();
    const [user, setUser] = useState ({name: "", lastName: "", phone: "", email: "", address: "", city: "", region: "", country: "", gender: ""}); 
    const avatar = '../../../../src/assets/profile/avatar.webp';    
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileMessage, setProfileMessage] = useState("");
    const [cityMessage, setCityMessage] = useState("");
    const usaStates = ['Maryland', 'Massachusetts', 'New Jersey', 'Hawaii', 'California', 'Connecticut', 'Washington', 'New Hampshire', 'Colorado', 'Virginia'];
    const canadaStates = [
        {province: 'British Columbia', capital: 'Victoria'},
        {province: 'Alberta', capital: 'Edmonton'},
        {province: 'Saskatchewan', capital: 'Regina'},
        {province: 'Manitoba', capital: 'Winnipeg'},
        {province: 'Ontario', capital: 'Toronto'},
        {province: 'Quebec', capital: 'Quebec City'},
        {province: 'New Brunswick', capital: 'Fredericton'},
        {province: 'Nova Scotia', capital: 'Halifax and Prince Edward Island'}        
    ];
    const deliveryCities = ['Victoria', 'Edmonton', 'Regina', 'Winnipeg', 'Toronto', 'Quebec City', 'Fredericton' , 'Halifax and Prince Edward Island',
    'Sacramento', 'Annapolis', 'Boston', 'Trenton', 'Honolulu', 'Hartford', 'Olympia', 'Washington', 'New York', 'Concord', 'Denver', 'Richmond', 'Victoria', 'Edmonton', 'Regina',
    'Winnipeg', 'Toronto', 'Quebec City', 'Fredericton', 'Halifax and Prince Edward Island'];

    

    function changeName(e){
        e.preventDefault();
        if(user.name.length > 0){
            localStorage.setItem('name', user.name);
            setUser({...user, name: ""});
        }
    }
    function changeLastName(e){
        e.preventDefault();
        if(user.lastName.length > 0){
            localStorage.setItem('lastname', user.lastName);
            setUser({...user, lastName: ""});
        }
    }
    function changePhone(e){
        e.preventDefault();
        const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if(user.phone.match(phoneRegExp)){            
            localStorage.setItem('phone', user.phone);
            setUser({...user, phone: ""});
        }else {
           alert('Phone number can not be less than 10 digitals');
        }
    }
    function changeEmail(e){
        e.preventDefault();
        const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        if(user.email.match(emailRegExp)){
            localStorage.setItem('email', user.email);
            setUser({...user, email: ""});
        }
    }    
    function changeCountry(e){
        e.preventDefault();
        localStorage.setItem('country', user.country);
        setUser({...user, country: ""});
    }
    function changeRegion(e){
        e.preventDefault();
        localStorage.setItem('region', user.region);
        setUser({...user, region: ""});
    }
    function changeCity(e){
        e.preventDefault();
        if(deliveryCities.find((city) => city.toLowerCase() === user.city.toLowerCase())){                    
            localStorage.setItem('city', user.city);
            setUser({...user, city: ""});
            }else {setCityMessage('Your city is out of our coverage area'); setTimeout(() => {setCityMessage('')}, 4000);}       
    }
    function changeAddress(e){
        e.preventDefault();
        localStorage.setItem('address', user.address);
        setUser({...user, address: ""});
    }
    function changeGender(e){
        e.preventDefault();
        if(user.gender.toLowerCase() === 'male' || user.gender.toLowerCase() === 'female'){
            localStorage.setItem('gender', user.gender);
            setUser({...user, gender: ""});
        }
    }

    function createNewUser(e){
        e.preventDefault();
        const userObject = {
            id: Date.now() + `${user.lastName || localStorage.getItem('lastname')}`,
            name: user.name || localStorage.getItem('name'),
            lastName: user.lastName || localStorage.getItem('lastname'),
            phone: user.phone || localStorage.getItem('phone'),
            email: user.email || localStorage.getItem('email'),
            // image: localStorage["image"],
            country: user.country || localStorage.getItem('country'),
            city: user.city || localStorage.getItem('city'),
            region: user.region || localStorage.getItem('region'),
            address: user.address || localStorage.getItem('address'),
            gender: user.gender || localStorage.getItem('gender')
        }
        if((userObject?.name?.length > 0 || localStorage.getItem('name')) && 
           (userObject?.lastName?.length > 0 || localStorage.getItem('lastName')) && 
           (userObject?.phone?.length > 0 || localStorage.getItem('phone')) && 
           (userObject?.email?.length > 0 || localStorage.getItem('email')) && 
           (userObject?.country?.length > 0 || localStorage.getItem('country')) && 
           (userObject?.region?.length > 0 || localStorage.getItem('region')) && 
           (userObject?.city?.length > 0 || localStorage.getItem('city')) && 
           (userObject?.address?.length > 0 || localStorage.getItem('address')) && 
           (userObject?.gender?.length > 0 || localStorage.getItem('gender'))){
                if(userObject.name.match(/\w+/)){
                    if(userObject.lastName.match(/[a-zA-Z]/)){
                        if(userObject.phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)){
                            if(userObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)){                               
                                if(deliveryCities.find((city) => userObject.city.toLowerCase())){
                                    if(userObject.gender.toLowerCase() === 'male' || userObject.gender.toLowerCase() === 'female'){                                        
                                        dispatch(setUserItemAction(JSON.stringify(userObject)));                                                                            
                                        localStorage.setItem('user', JSON.stringify(userObject));
                                        setProfileMessage('You have successfully saved your personal information'); 
                                        setTimeout(() => {setProfileMessage('')}, 4000);
                                        // window.location.reload();
                                    }else {setProfileMessage('Your email is not valid'); setTimeout(() => {setProfileMessage('')}, 4000);}
                                }else {setProfileMessage('Your city is out of our coverage area'); setTimeout(() => {setProfileMessage('')}, 4000);}                                
                            }else{setProfileMessage('Your email is not valid'); setTimeout(() => {setProfileMessage('')}, 4000);}
                        }else{setProfileMessage('Your phone is not valid'); setTimeout(() => {setProfileMessage('')}, 4000);}
                    }else{setProfileMessage('Your last name is not valid'); setTimeout(() => {setProfileMessage('')}, 4000);}
                }else {setProfileMessage('Your name is not valid'); setTimeout(() => {setProfileMessage('')}, 4000);}
        }else{ setProfileMessage('Fill all empty fields!'); setTimeout(() => {setProfileMessage('')}, 4000);}       
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }      

    const imageUpload = (e) => {
        const file = e.target.files[0];        
        getBase64(file).then(base64 => {
          localStorage["image"] = base64;
          console.debug("file stored",base64);
        });
    }; 

   
  return (
        <div className='profile-component__myinfo'>
            <form className='profile-component__body' name="personal-info">
                <div className='profile-component__body-save--information'>
                    <h3 className='profile-component__body-title' style={styles.titleStyle}>Fill your personal information</h3>
                    <button className='profile-component__body-button--save' style={styles.headerText} onClick={(e) => createNewUser(e)}
                    >Please, save your personal information!</button>
                </div >
                {profileMessage.length > 0 &&(
                    <p className='profile-component__body-message' style={styles.headerText}>{profileMessage}</p>
                )}
                <div className='profile-component__body-item profile-image'>                
                    <div className='profile-component__item-avatar--block'> 
                        <label className='profile-component__item-label'>                            
                            <input type="file" name="myImage" className='profile-component__item-inputFile' 
                                onChange={(e) => {setSelectedImage(e.target.files[0]); imageUpload(e)}} />
                            <span className="input-file-btn"  style={styles.titleStyle}>1. Choose file:</span>   	                
                        </label>                   
                        {selectedImage  ? (
                            <div className='profile-component__item-image--block'>
                                <img src={URL.createObjectURL(selectedImage)} alt="not found" width={"100px"} className='profile-component__item-image'/>                                                         
                                <button className='profile-component__item-button' onClick={() => setSelectedImage(null)}>&#9587;</button>
                            </div>
                        ): (
                            <div className='profile-component__item-image--block'>
                                <img src={selectedImage || localStorage["image"]|| avatar} alt="" width={"100px"} height={"50px"} className='profile-component__item-image'/>                                                         
                                <button className='profile-component__item-button' onClick={() => {setSelectedImage(null); localStorage.removeItem("image")}}>&#9587;</button>
                            </div> 
                        )}                                            
                    </div>

                </div>
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        2. Your name:  <span className='profile-component__title-name'>{localStorage?.getItem('name')}</span>
                    </p>
                    <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} 
                    className="profile-component__item-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeName(e)}>Edit name</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeName(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>            
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        3. Your lastname:  <span className='profile-component__title-name'>{localStorage?.getItem('lastname')}</span>
                    </p>
                    <input type="text" value={user.lastName} onChange={(e) => setUser({...user, lastName:e.target.value})} 
                        className="profile-component__item-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeLastName(e)}>Edit lastname</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeLastName(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        4. Your gender:  <span className='profile-component__title-name'>{localStorage?.getItem('gender')}</span>
                    </p>
                    <select type="text" defaultValue="Choose gender" onChange={(e) => setUser({...user, gender:e.target.value})} 
                    className="profile-component__item-input long-input"  style={styles.headerText}>
                        <option disabled="disabled" className='profile__component-option' style={styles.headerText}>Choose gender</option>
                        <option value="Male" className='profile__component-option' style={styles.headerText}>Male</option>
                        <option value="Female" className='profile__component-option' style={styles.headerText}>Female</option>
                    </select>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeGender(e)}>Edit gender</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeGender(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>  
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        5.Your phone number:  <a href="tel:{localStorage?.getItem('phone')}" className='profile-component__title-name'>{localStorage?.getItem('phone')}</a>
                    </p>
                    <input type="text" value={user.phone} onChange={(e) => setUser({...user, phone:e.target.value})} 
                        className="profile-component__item-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changePhone(e)}>Edit phone</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changePhone(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        6. Your email:  <span className='profile-component__title-name title-email'>{localStorage?.getItem('email')}</span>
                    </p>
                    <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} 
                        className="profile-component__item-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeEmail(e)}>Edit email</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeEmail(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        7. Your country:  <span className='profile-component__title-name'>{localStorage?.getItem('country')?.toLowerCase()}</span>
                    </p>                    
                    <select defaultValue="Choose country" onChange={(e) => {setUser({...user, country:e.target.value});}} 
                    className="profile-component__item-input long-input"  style={styles.headerText}> 
                        <option disabled="disabled" className='profile__component-option'  style={styles.headerText}>Choose country</option>                       
                        <option value="USA" className='profile__component-option'  style={styles.headerText}>USA</option>
                        <option value="CANADA" className='profile__component-option'  style={styles.headerText}>CANADA</option>                        
                    </select>                                   
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeCountry(e)}>Edit country</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeCountry(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>           
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        8. Your region/state/province:  <span className='profile-component__title-name'>{localStorage?.getItem('region')}</span>
                    </p>
                    {(localStorage.getItem("country") || user.country) === "USA" && (
                    <select  defaultValue="Choose region" onChange={(e) => setUser({...user, region:e.target.value})} 
                    className="profile-component__item-input long-input"  style={styles.headerText}> 
                        <option disabled="disabled" className='profile__component-option' style={styles.headerText}>Choose region</option>                          
                        {usaStates.map((state, index) => (
                            <option key={index + 1} value={state} className='profile__component-option'  style={styles.headerText}>{state}</option>
                        ))}   
                    </select>
                    )}                    
                    {(localStorage.getItem("country") || user.country) === "CANADA" && (
                    <select defaultValue="Choose region" onChange={(e) => setUser({...user, region:e.target.value})} 
                    className="profile-component__item-input long-input"  style={styles.headerText}> 
                        <option disabled="disabled" className='profile__component-option' style={styles.headerText}>Choose region</option>                           
                        {canadaStates.map((state, index) => (
                            <option key={index + 1} value={state.province} className='profile__component-option' style={styles.headerText}>{state.province}</option>
                        ))}   
                    </select>
                    )}                    
                    { ( user?.country === '' && localStorage['country'] === '')  && (
                    <select defaultValue="Choose region" onChange={(e) => setUser({...user, region:e.target.value})} 
                        className="profile-component__item-input long-input"  style={styles.headerText}> 
                            <option disabled="disabled" className='profile__component-option' style={styles.headerText}>Choose region</option>                         
                    </select>
                    )}                    
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => {changeRegion(e);}}>Edit region</button>
                    <button className='profile-adaptive-btn' onClick={(e) => {changeRegion(e);}}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>           
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        9. Your city:  <span className='profile-component__title-name'>{localStorage?.getItem('city')}</span>
                    </p>
                    <input type="text" value={user.city} onChange={(e) => setUser({...user, city:e.target.value})} 
                    className="profile-component__item-input long-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeCity(e)}>Edit city</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeCity(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>   
                { cityMessage?.length > 0 && (
                    <p className='profile-component__body-message' style={styles.headerText}>{cityMessage}</p>   
                )}   
                <div className='profile-component__body-item'>
                    <p className='profile-component__item-title' style={styles.titleStyle}>
                        10. Your delivery address:  <span className='profile-component__title-name'>{localStorage?.getItem('address')}</span>
                    </p>
                    <input type="text" value={user.address} onChange={(e) => setUser({...user, address:e.target.value})} 
                        className="profile-component__item-input long-input"  style={styles.titleStyle}/>
                    <button className='profile-component__item-btn' style={styles.headerMessage} onClick={(e) => changeAddress(e)}>Edit address</button>
                    <button className='profile-adaptive-btn' onClick={(e) => changeAddress(e)}>
                        <img src="../../../../src/assets/icons/edit-icon.png" alt="" className='profile-adaptive-btn--img'/>
                    </button>
                </div>                         
            </form>            
        </div>
  )
}
