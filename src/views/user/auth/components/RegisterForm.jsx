import PhoneInput from "react-phone-input-2";
import {NavLink} from "react-router-dom";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import 'react-phone-input-2/lib/style.css'
import FormFieldError from "../../../../utils/FormFieldError";

export default function RegisterForm({
                                         newData,
                                         setNewData,
                                         validationErrors,
                                         handleSubmit
                                     }) {

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container">
            <div className="row align-items-center"><h1 className="text-center">Kayıt Ol</h1></div>

            <div className="row">
                <div className="col">
                    <label>Ad</label>
                    <input
                        type="text"
                        required name="first_name"
                        placeholder="Adınızı giriniz"
                        className={'form-control ' + (validationErrors['first_name'] ? 'is-invalid' : '')}
                        value={newData.first_name}
                        onChange={handleChange}
                    />
                    <FormFieldError errorMessage={validationErrors['first_name']}/>
                </div>
                <div className="col">
                    <label htmlFor={'last_name'}>Soyad</label>
                    <input
                        id={'last_name'}
                        type="text"
                        required name="last_name"
                        placeholder="Soyadınızı giriniz"
                        className={'form-control ' + (validationErrors['last_name'] ? 'is-invalid' : '')}
                        value={newData.last_name}
                        onChange={handleChange}
                    />
                    <FormFieldError errorMessage={validationErrors['last_name']}/>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col">
                    <label>Telefon Numarası</label>

                    <PhoneInput
                        country={'tr'}
                        onlyCountries={['tr']}
                        placeholder={'123 456 78 90'}
                        disableCountryCode={true}
                        //inputStyle={isInvalidStyle(!!validationErrors['phone'])}
                        inputClass={'w-100'}
                        value={newData.phone}
                        onChange={phone => setNewData({...newData, phone: phone})}
                    />
                    <FormFieldError errorMessage={validationErrors['phone']}/>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col">
                    <label>E-posta</label>
                    <input
                        type="email"
                        required name="email"
                        placeholder="E-posta adresinizi giriniz"
                        className={'form-control ' + (validationErrors['email'] ? 'is-invalid' : '')}
                        value={newData.email}
                        onChange={handleChange}
                    />
                    <FormFieldError errorMessage={validationErrors['email']}/>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col">
                    <label>Şifre</label>
                    <input
                        type="password"
                        required name="password"
                        placeholder="Şifrenizi giriniz"
                        className={'form-control ' + (validationErrors['password'] ? 'is-invalid' : '')}
                        value={newData.password}
                        onChange={handleChange}
                    />
                    <FormFieldError errorMessage={validationErrors['password']}/>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col">
                    <label>Şifrenizi tekrar giriniz</label>
                    <input
                        type="password"
                        required name="password_confirmation"
                        placeholder="Şifrenizi tekrar giriniz"
                        className={'form-control ' + (validationErrors['password_confirmation'] ? 'is-invalid' : '')}
                        value={newData.password_confirmation}
                        onChange={handleChange}
                    />
                    <FormFieldError errorMessage={validationErrors['password_confirmation']}/>
                </div>
            </div>

            <br/>

            <CustomButton
                text="Kayıt Ol"
                style={{
                    width: '100%',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                }}
                status={'success'}
                onClick={() => {
                    handleSubmit()
                }}
            />


            <div className="signup_link">
                Hesabınız var mı?
                <NavLink to="/auth/login">Giriş Yap</NavLink>
            </div>
        </div>
    )
}