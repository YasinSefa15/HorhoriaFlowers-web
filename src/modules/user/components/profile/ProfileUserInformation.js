import React from 'react'
import axios from "axios";
import {useAuth} from "../../../../context/AuthContext";
import NotificationHelper from "../../../../helpers/NotificationHelper";
import {api_helper} from "../../../../helpers/api_helper";
import ProfileUserUpdate from "../../../../api.requests/profile/ProfileRequests";
import ProfileGetUser from "../../../../api.requests/profile/ProfileRequests";
import ReactLoading from "react-loading";

export default function ProfileUserInformation() {
    const [user, setUser] = React.useState({})
    const [userForm, setUserForm] = React.useState({})


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await ProfileGetUser();
            } catch (error) {
                console.log(error);
            }
        };

        fetchData().then((response) => {
        });
    }, []);


    const handleSubmit = () => {
        try {
            axios.put(api_helper.api_url + api_helper.user.update,
                {
                    first_name: "asd",
                },
                {
                    headers: {
                        "Authorization": "Bearer " + "",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then((response) => {
                    NotificationHelper({
                        httpStatus: response.status,
                        title: response.data.message,
                    })
                })
                .catch((error) => {
                    console.log("asd")
                    console.log(error.response)
                    NotificationHelper({
                        httpStatus: error.response.status,
                        title: error.response.data.message,
                    })
                })
        } catch (error) {
            console.log(error)
        }

    }




    return (
        <>
            <h2>Kullanıcı Bilgilerim</h2>

            <div
                className="container"
            >

                <div className="row ">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Adınız</div>

                    <div className="col-sm-6">
                        <input type="text" className="form-control " id="name" value={userForm.first_name || ''}
                               onChange={(e) => {
                                   setUserForm({...userForm, first_name: e.target.value})
                               }}
                        />
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Soyadınız</div>

                    <div className="col-sm-6">
                        <input type="text" className="form-control " id="name" value={userForm.last_name}
                               onChange={(e) => {
                                   setUserForm({...userForm, last_name: e.target.value})
                               }}
                        />
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">Telefon Numaranız</div>

                    <div className="col-sm-6">
                        <input type="text" className="form-control " id="name" value={user.phone || ''}
                               onChange={(e) => {
                                   setUserForm({...userForm, phone: e.target.value})
                               }}
                        />
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div className="col-sm-3">E-Posta Adresiniz</div>

                    <div className="col-sm-6">
                        <input type="text" className="form-control " id="name" value={user.email || ''}
                               onChange={(e) => {
                                   setUserForm({...userForm, email: e.target.value})
                               }}/>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div
                        className="col-sm-3"
                    >
                        Öncelikli Adresiniz
                    </div>

                    <div
                        className="col-sm-6"
                    >
                        <select className="form-select">
                            <option>Mia</option>
                            <option>köpük</option>
                            <option>iş</option>
                        </select>
                    </div>
                </div>

                <br></br>


                <div className="row">
                    <div className="col-sm-4"></div>

                    <div className="col-sm-6">
                        <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    handleSubmit()
                                }}
                        >
                            Güncelle
                        </button>
                    </div>
                </div>


            </div>
        </>
    )
}