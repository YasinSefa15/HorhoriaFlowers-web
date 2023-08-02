import CustomButton from "../CustomButton";
import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import NotificationHelper from "../../../../helpers/NotificationHelper";
import {updateProfilePassword} from "../../../../api.requests/profile/ProfileRequests";
import {useNavigate} from "react-router-dom";

export default function ChangePassword() {
    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    })
    const {secret,setSecret} = useAuth();


    const handleSubmit = () => {
        if (passwordForm.old_password === passwordForm.new_password) {
            NotificationHelper({
                type: "danger",
                title: "Yeni şifreniz eskisi ile aynı olamaz"
            });
            return;
        }else if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
            NotificationHelper({
                type: "warning",
                title: "Girdiğiniz şifreler birbiri ile uyuşmuyor"
            });
            return;
        }
        const fetchData = async () => {
            await updateProfilePassword({passwordForm, secret});
            await setSecret(null)

            //console.log("a")

        };

        fetchData().then(r => {
        });
    }

    return (
        <>
            <h3>Şifre Değiştir</h3>

            <div className="container">
                <div className="alert alert-warning" role="alert">
                    <b><h4>Önemli Bilgilendirme!</h4></b>
                    Şifrenizi değiştirdiğinizde tüm cihazlardan güvenlik amacıyla çıkış yapılacaktır.
                </div>

                <div className="row mt-4">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Eski Şifrenizi Giriniz</div>

                    <div className="col-sm-6">
                        <input type="password" className="form-control " id="name" value={passwordForm.old_password}
                               onChange={(e) => {
                                   setPasswordForm({...passwordForm, old_password: e.target.value})
                               }}/>
                    </div>
                </div>

                <br></br>

                <div className="row mt-4">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Yeni Şifrenizi Giriniz</div>

                    <div className="col-sm-6">
                        <input type="password" className="form-control " id="name" value={passwordForm.new_password}
                               onChange={(e) => {
                                   setPasswordForm({...passwordForm, new_password: e.target.value})
                               }}/>
                    </div>
                </div>

                <br></br>

                <div className="row mt-4">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Yeni Şifrenizi Tekrar Giriniz</div>

                    <div className="col-sm-6">
                        <input type="password" className="form-control " id="name" value={passwordForm.new_password_confirmation}
                               onChange={(e) => {
                                   setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})
                               }}/>
                    </div>
                </div>

                <br></br>

                <div className="row justify-content-center">
                    <div className="">
                        <CustomButton
                            text="Güncelle"
                            onClick={() => {
                                handleSubmit()
                            }}
                        ></CustomButton>
                    </div>
                </div>
            </div>
        </>
    )
}