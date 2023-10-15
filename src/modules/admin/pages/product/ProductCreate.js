import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import 'react-notifications-component/dist/theme.css'
import {Button} from "react-bootstrap";
import './ProductCreate.css'
import CustomButton from "../../../user/components/CustomButton";
import {createAdminProduct, getAdminCategoriesMapped} from "../../../../api.requests/admin/AdminProductRequests";
import {useAuth} from "../../../../context/AuthContext";
import FormFieldError from "../../../global/components/FormFieldError";


export default function ProductCreate() {
    const navigate = useNavigate()
    const [userForm, setUserForm] = React.useState(new FormData())
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [categoriesMapped, setCategoriesMapped] = useState([]);
    const [errors, setErrors] = useState([]);
    const {secret} = useAuth();

    const handleCreateProduct = () => {
        const create = async () => {
            await createAdminProduct({data: userForm, secret, setErrors})
        }

        create().then(r => {
        })
    }


    useEffect(() => {
        getAdminCategoriesMapped({setCategoriesMapped, secret}).then(r => {
        })
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    useEffect(() => {
        const localForm = [];

        selectedFiles.forEach((file, index) => {
            localForm.push(file);
        });

        setUserForm({...userForm, images: localForm});
        //setUserForm({...userForm, images: local})
    }, [selectedFiles]);

    return (

        <>
            <div className="container" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>

                <div className="d-flex align-items-center">
                    <Button
                        variant="light" // Butonun arka plan rengini gri yapıyoruz
                        className="arrow-button"
                        onClick={() => {
                            console.log("hehe")
                            navigate("/admin/products")
                        }}
                    >
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </Button>

                    <div><b>Geri Dön</b></div>
                </div>

                <div className="row mt-3">
                    <h2>Ürün Oluştur</h2>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="col-sm-3">Ürün Adı</div>
                        <div className="">
                            <input type="text" className={"form-control " + (errors.title ? "is-invalid" : "")}
                                   id="name" value={userForm.title || ''}
                                   onChange={(e) => {
                                       setUserForm({...userForm, title: e.target.value})
                                   }}
                            />
                            <FormFieldError errorMessage={errors.title}/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="col-sm-3">Kategori</div>
                        <div className="">
                            <select className={"form-control " + (errors.category_id ? "is-invalid" : "")}
                                    onChange={(e) => {
                                        setUserForm({...userForm, category_id: e.target.value})
                                    }}
                            >
                                <option value={-1}>Kategori Seç</option>
                                {categoriesMapped.map((category, index) => (
                                    <option value={category.id}>{category.title}</option>
                                ))}
                            </select>
                            <FormFieldError errorMessage={errors.category_id}/>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col">
                        <div className="">Eski Fiyat</div>
                        <div className="">
                            <input type="text" className={"form-control " + (errors.old_price ? "is-invalid" : "")}
                                   id="name" value={userForm.old_price || ''}
                                   onChange={(e) => {
                                       setUserForm({...userForm, old_price: e.target.value})
                                   }}
                            />
                            <FormFieldError errorMessage={errors.old_price}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="">Yeni Fiyat</div>
                        <div className="">
                            <input type="text" className={"form-control " + (errors.new_price ? "is-invalid" : "")}
                                   id="name" value={userForm.new_price || ''}
                                   onChange={(e) => {
                                       setUserForm({...userForm, new_price: e.target.value})
                                   }}
                            />
                            <FormFieldError errorMessage={errors.new_price}/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="">İndirim Oranı</div>
                        <div className="">
                            <input type="number" className="form-control" id="name"
                                   value={(((userForm.old_price - userForm.new_price) / userForm.old_price) * 100).toFixed(2) || 0}
                                   onChange={(e) => {
                                       const percent = e.target.value
                                       setUserForm({
                                           ...userForm,
                                           new_price: userForm.old_price - (userForm.old_price * percent / 100)
                                       })
                                   }}
                            />
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col">
                        <div className="col-sm-3">Açıklama</div>
                        <div className="">
                            <textarea className={"form-control " + (errors.description ? "is-invalid" : "")} id="name"
                                      value={userForm.description || ''}
                                      onChange={(e) => {
                                          setUserForm({...userForm, description: e.target.value})
                                      }}
                            />
                            <FormFieldError errorMessage={errors.description}/>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className={"row " + (errors.sizes ? "border p-1 rounded border-danger" : "")}>
                    <div className="col">
                        <div className="d-flex justify-content-between mb-2">
                            Bedenler
                            <CustomButton
                                text={"Beden Ekle"}
                                style={{width: "10%"}}
                                onClick={() => {
                                    let sizesForm = userForm.sizes || []
                                    sizesForm.push({
                                        value: "",
                                        quantity: 0
                                    })
                                    setUserForm({...userForm, sizes: sizesForm})
                                }}
                            />
                        </div>
                        <div className="bg-body-secondary p-3">
                            {userForm.sizes && userForm.sizes.map((size, index) => (
                                <>
                                    <div className="prod-sizes-list d-flex justify-content-between">
                                        <div>
                                            <input type="text" className="form-control w-50" value={size.value}
                                                   onChange={(e) => {
                                                       let sizesForm = userForm.sizes || []
                                                       sizesForm[index].value = e.target.value
                                                       setUserForm({...userForm, sizes: sizesForm})
                                                   }}
                                            />
                                            <FormFieldError errorMessage={errors["sizes." + index + ".value"]}/>
                                        </div>

                                        <div>
                                            <div className="d-flex align-items-center">
                                                <input type="text" className="form-control w-25 me-2"
                                                       value={size.quantity}
                                                       onChange={(e) => {
                                                           let sizesForm = userForm.sizes || []
                                                           sizesForm[index].quantity = e.target.value
                                                           setUserForm({...userForm, sizes: sizesForm})
                                                       }}
                                                />
                                                Adet
                                            </div>
                                            <FormFieldError errorMessage={errors["sizes." + index + ".quantity"]}/>
                                        </div>

                                        <CustomButton
                                            text="Çıkart"
                                            style={{width: "min-content",padding: "0 8px"}}
                                            onClick={() => {
                                                let sizesForm = userForm.sizes || []
                                                sizesForm.splice(index, 1)
                                                setUserForm({...userForm, sizes: sizesForm})
                                            }}></CustomButton>
                                    </div>
                                    {index !== userForm.sizes.length - 1 && (
                                        <hr></hr>
                                    )}
                                </>
                            ))}
                        </div>
                        <FormFieldError errorMessage={errors.sizes}/>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col">
                        <div className="col-sm-3">Ürün Görselleri</div>
                        <div className="">
                            <input className={"form-control " + (errors.images ? "is-invalid" : "")} type="file"
                                   multiple
                                   onChange={handleFileChange}/>
                            <FormFieldError errorMessage={errors.images}/>
                        </div>
                    </div>

                    <div className="row">
                        {selectedFiles.length > 0 && (
                            <div className="row">
                                Seçilen Dosyalar:
                                <div className="row">
                                    {selectedFiles.map((file, index) => (
                                        <img
                                            className="default-img mb-2"
                                            src={URL.createObjectURL(file)} alt={file.name}
                                            style={{
                                                width: "165px",
                                                height: "248px",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="w-100 d-flex justify-content-end mt-2 mb-5">
                    <CustomButton
                        status="success"
                        text="Ürünü Oluştur"
                        onClick={() => {
                            handleCreateProduct()
                        }}
                    />

                </div>
            </div>

        </>
    )
}