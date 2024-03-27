import React from 'react'
import {useAuth} from "../../../../context/AuthContext";
import LoadingScreen from "../../../../components/LoadingScreen";
import {profileGetUser, updateProfileInfo} from "../../../../requests/profile/ProfileRequests";
import CustomButton from "../../../../components/CustomButton";
import {Helmet} from "react-helmet";
import PhoneInput from "react-phone-input-2";
import FormFieldError from "../../../../utils/FormFieldError";
import {isInputInvalid} from "../../../../utils/StyleUtility";

export default function ProfileUserInformation() {
    const [userForm, setUserForm] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)
    const [validationErrors, setValidationErrors] = React.useState({})
    const {secret} = useAuth();

    React.useEffect(() => {
        if (secret) {
            const fetchData = async () => {
                await profileGetUser({setUserForm, setLoaded, secret});
            };

            fetchData().then(r => {
            });
        }
    }, [secret]);


    const handleSubmit = () => {
        setLoaded(false)
        const fetchData = async () => {
            await updateProfileInfo({userForm, setLoaded, secret, setValidationErrors});
        };

        fetchData().then(r => {
        });

    }


    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Profilim</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda profilinizi görüntüleyin, bilgilerinizi düzenleyin ve alışveriş deneyiminizi yönetin. Profilinizdeki bilgileri güncelleyebilir, sipariş geçmişinizi inceleyebilir ve hesap ayarlarınızı düzenleyebilirsiniz."
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            {loaded ? (
                <>
                    <h2>Kullanıcı Bilgilerim</h2>

                    <br></br>

                    <div
                        className="container"
                    >

                        <div className="row ">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Adınız</div>

                            <div className="col-sm-6">
                                <input type="text" className="form-control " id="first_name"
                                       value={userForm.first_name || ''}
                                       onChange={(e) => {
                                           setUserForm({...userForm, first_name: e.target.value})
                                       }}
                                />
                            </div>

                            <FormFieldError errorMessage={validationErrors['first_name']}/>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Soyadınız</div>

                            <div className="col-sm-6">
                                <input type="text" className="form-control " id="last_name" value={userForm.last_name}
                                       onChange={(e) => {
                                           setUserForm({...userForm, last_name: e.target.value})
                                       }}
                                />
                            </div>

                            <FormFieldError errorMessage={validationErrors['last_name']}/>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Telefon Numaranız</div>

                            <div className="col-sm-6">
                                <PhoneInput
                                    country={'tr'}
                                    onlyCountries={['tr']}
                                    placeholder={'+90 512 345 67 89'}
                                    countryCodeEditable={false}
                                    inputStyle={isInputInvalid(!!validationErrors['phone'])}
                                    inputClass={'w-100'}
                                    value={userForm.phone}
                                    onChange={phone => setUserForm({...userForm, phone: phone})}
                                />
                            </div>

                            <FormFieldError errorMessage={validationErrors['phone']}/>
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
            ) : (
                <LoadingScreen></LoadingScreen>
            )}
        </>
    )
}