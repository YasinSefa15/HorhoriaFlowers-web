import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import {
    getProfileEmail,
    updateProfileEmail,
} from "../../../../api.requests/profile/ProfileRequests";
import LoadingScreen from "../LoadingScreen";
import CustomButton from "../CustomButton";

export default function EmailChangeOrVerify() {
    const [emailForm, setEmail] = useState(null)
    const [loaded, setLoaded] = React.useState(false)
    const {secret} = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            await getProfileEmail({setEmail, setLoaded, secret});
        };

        fetchData().then(r => {
        });
    }, [])


    const handleSubmit = () => {
        setLoaded(false)
        console.log(emailForm)
        const fetchData = async () => {
            await updateProfileEmail({emailForm, setLoaded, secret});
        };

        fetchData().then(r => {
        });
    }

    return (
        <>
            {loaded ? (
                <>
                    <div className="container">
                        <div className="alert alert-warning" role="alert">
                            <b><h4>E-posta Onayı Gerekli!</h4></b>

                            Hesabınızın tam olarak kullanılabilmesi için e-posta adresinizi onaylamanız gerekmektedir.
                            Lütfen e-posta adresinize gönderilen onay bağlantısını tıklayarak hesabınızı onaylayın.
                            E-posta
                            adresinizi onaylamadan bazı işlevler kısıtlanabilir.
                            <br></br>
                            Eğer onay bağlantısı almadıysanız, lütfen spam/junk klasörünü kontrol edin veya yeniden
                            göndermek için aşağıdaki bağlantıyı kullanın:<b>[Onay Bağlantısını Yeniden Gönder]</b>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1"></div>

                        <div className="col-sm-3">E-Posta Adresiniz</div>

                        <div className="col-sm-6">
                            <input type="text" className="form-control " id="name" value={emailForm.email || ''}
                                   onChange={(e) => {
                                       setEmail({...emailForm, email: e.target.value})
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

                </>
            ) : (
                <>
                    <LoadingScreen></LoadingScreen>
                </>
            )
            }
        </>
    )
}