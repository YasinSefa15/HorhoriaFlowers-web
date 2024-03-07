import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import {
    getProfileEmail,
    updateProfileEmail,
} from "../../../../requests/profile/ProfileRequests";
import LoadingScreen from "../../../../components/LoadingScreen";
import CustomButton from "../../../../components/CustomButton";
import {Helmet} from "react-helmet";
import FormFieldError from "../../../../utils/FormFieldError";

export default function EmailChangeOrVerify() {
    const [emailForm, setEmailForm] = useState(null)
    const [loaded, setLoaded] = React.useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const {secret} = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            await getProfileEmail({setEmailForm, setLoaded, secret});
        };

        fetchData().then(r => {
        });
    }, [])


    const handleSubmit = () => {
        if (emailForm.email === emailForm.old_email) {
            return;
        }
        setLoaded(false)

        const fetchData = async () => {
            await updateProfileEmail({
                emailForm,
                setEmailForm,
                setLoaded,
                secret,
                setValidationErrors
            });
        };

        fetchData().then(r => {
        });
    }

    return (
        <>
            <Helmet>
                <title>Hooria E-Ticaret - Email Değiştir/Onayla</title>
                <meta name="description"
                      content="Hooria e-ticaret platformunda email adresinizi değiştirin ve yeni email adresinizi onaylayın. Hesabınızın güvenliğini ve iletişim bilgilerinizi güncelleyin."/>
            </Helmet>

            {loaded ? (
                <>
                    <div className="container">
                        {emailForm.email_verified_at ? (<></>) : (<>
                            <div className="alert alert-warning" role="alert">
                                <b><h4>E-posta Onayı Gerekli!</h4></b>
                                Hesabınızın tam olarak kullanılabilmesi için e-posta adresinizi onaylamanız
                                gerekmektedir.
                                Lütfen e-posta adresinize gönderilen onay bağlantısını tıklayarak hesabınızı
                                onaylayın.
                                E-posta
                                adresinizi onaylamadan bazı işlevler kısıtlanabilir.
                                <br></br>
                                Eğer onay bağlantısı almadıysanız, lütfen spam/junk klasörünü kontrol edin veya
                                yeniden
                                göndermek için aşağıdaki bağlantıyı kullanın:<b>[Onay Bağlantısını Yeniden
                                Gönder]</b>
                            </div>
                        </>)}
                    </div>

                    <div className="row mt-4">
                        <div className="col-sm-1"></div>

                        <div className="col-sm-3">E-Posta Adresiniz</div>

                        <div className="col-sm-6">
                            <input type="text"
                                   className={"form-control " + (validationErrors.email ? "border-danger" : "")}
                                   id="email"
                                   value={emailForm.email || ''}
                                   onChange={(e) => {
                                       setEmailForm({...emailForm, email: e.target.value})
                                   }}/>
                            <FormFieldError errorMessage={validationErrors['new_email']}/>
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