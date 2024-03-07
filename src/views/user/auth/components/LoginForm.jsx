import {NavLink} from "react-router-dom";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import FormFieldError from "../../../../utils/FormFieldError";

export default function LoginForm({
                                      handleSubmit,
                                      validationErrors,
                                      newData,
                                      setNewData
                                  }) {
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container">
            <div className="row align-items-center"><h1 className="text-center">Giriş Yap</h1></div>

            <br/>

            <div className="row">
                <label htmlFor={'email'}>E-posta</label>
                <input
                    id={'email'}
                    type="email"
                    required name="email"
                    placeholder="E-posta adresinizi giriniz"
                    className={'form-control ' + (validationErrors['email'] ? 'is-invalid' : '')}
                    onChange={handleChange}
                />
                <FormFieldError errorMessage={validationErrors['email']}/>

            </div>

            <br/>

            <div className="row">
                <label htmlFor={'password'}>Şifre</label>
                <input
                    id={'password'}
                    type="password"
                    required name="password"
                    placeholder="Şifrenizi giriniz"
                    className={'form-control ' + (validationErrors['password'] ? 'is-invalid' : '')}
                    onChange={handleChange}
                />
                <FormFieldError errorMessage={validationErrors['password']}/>
            </div>


            <br/>

            <div className="row">
                <CustomButton
                    status="success"
                    text="Giriş Yap"
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        borderRadius: '5px',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                    }}
                />
            </div>

            <br/>

            <div className="row">
                <NavLink to="/auth/forgot-password" className="pass text-center m-0">Şifremi Unuttum</NavLink>
            </div>

            <div className="signup_link">
                Hesabınız yok mu?
                <NavLink to="/auth/register">Kayıt Ol</NavLink>
            </div>
            <div className="signup_link">
                <NavLink to="/">Ana sayfaya dönmek için tıklayınız</NavLink>
            </div>
        </div>
    )
}