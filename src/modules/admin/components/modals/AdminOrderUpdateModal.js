import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../user/components/CustomButton";
import {viewAdminOrders} from "../../../../api.requests/admin/AdminOrderRequests";
import {useAuth} from "../../../../context/AuthContext";
import FormFieldError from "../../../global/components/FormFieldError";

export default function AdminOrderUpdateModal({
                                                  showUpdateModal,
                                                  setShowUpdateModal,
                                                  handleUpdateData,
                                                  clickedData,
                                                  title,
                                              }) {
    const [newData, setNewData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [orderStatuses, setOrderStatuses] = useState([])
    const {secret} = useAuth()

    const handleOnClick = async ({event, data}) => {
        event.preventDefault();
        let reqData = {
            ...(data?.status !== clickedData.status ? {status: data.status} : {}),
            ...(data?.shipping?.cargo_company !== clickedData?.shipping?.cargo_company ? {cargo_company: data.shipping.cargo_company} : {}),
            ...(data?.shipping?.tracking_code !== clickedData?.shipping?.tracking_code ? {tracking_code: data.shipping.tracking_code} : {}),
        };
        handleUpdateData({newData: reqData, setValidationErrors});
    }

    useEffect(() => {
        if (showUpdateModal) {
            const f = async () => {
                await viewAdminOrders({
                    order_code: clickedData.order_code,
                    setData: setNewData,
                    setOrderStatuses,
                    secret,
                })
            }

            f().then(r => {
            })
        }
    }, [showUpdateModal])


    useEffect(() => {
        if (Object.keys(newData).length === 0 || newData === clickedData) {
            return;
        }

        if (Object.keys(validationErrors).length === 0) {
            setShowUpdateModal(false);
            setNewData({});
        }
    }, [validationErrors])

    useEffect(() => {
        setNewData(clickedData)
    }, [clickedData]);


    return (
        <>
            <Modal
                show={showUpdateModal}
                onHide={() => {
                    setShowUpdateModal(false);
                    setNewData({});
                    setValidationErrors({})
                }}
                className="modal-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="">Sipariş Kodu</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="order_code"
                                           value={newData?.order_code || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="">Fiyat</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price" value={newData?.price || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="">Ürün Sayısı</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="ordered_items_count" value={newData?.ordered_items_count || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                        </div>

                        <br/>


                        <div className="row">
                            <div className="col">
                                <div className="">Telefon Numarası</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="phone"
                                           value={newData?.address?.phone || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="">Fiyat</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price" value={newData?.price || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="col-sm-3">Durum</div>
                                <select className="form-control"
                                        id="status"
                                        onChange={(e) => {
                                            setNewData({...newData, status: e.target.value})
                                        }}>
                                    {orderStatuses.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}
                                                    selected={item.name === newData?.status}>{item.name}</option>
                                        )
                                    })}
                                </select>
                                <FormFieldError errorMessage={validationErrors?.status?.[0] || ''}/>
                            </div>
                        </div>

                        <br/>

                        <div className="row">
                            <div className="col">
                                <div className="">Sipariş Tarihi</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price" value={newData?.created_at || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                        </div>


                        <br/>

                        <h5>Adres Bilgileri</h5>

                        <div className="row">
                            <div className="">Adres Başlığı</div>
                            <div className="">
                                <input type="text"
                                       className="form-control"
                                       id="price"
                                       value={newData?.address?.title || ''}
                                       readOnly={true}
                                       style={{
                                           cursor: "not-allowed",
                                           backgroundColor: "#f4f4f4",
                                       }}
                                />
                            </div>
                        </div>

                        <br/>

                        <div className="row">
                            <div className="col">
                                <div className="">Ad Soyad</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price"
                                           value={newData?.address?.first_name + " " + newData?.address?.last_name || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="">İl/İlçe</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price"
                                           value={newData?.address?.city + " " + newData?.address?.state || ''}
                                           readOnly={true}
                                           style={{
                                               cursor: "not-allowed",
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div className="row">
                            <div className="">Açıklama</div>
                            <div className="">
                                <textarea
                                    className="form-control"
                                    id="price"
                                    value={newData?.address?.description || ''}
                                    readOnly={true}
                                    style={{
                                        cursor: "not-allowed",
                                        backgroundColor: "#f4f4f4",
                                    }}
                                />
                            </div>
                        </div>

                        <br/>

                        <h5>Kargo Bilgileri</h5>

                        <div className="row">
                            <div className="col">
                                <div className="">Kargo Şirketi</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price"
                                           value={newData?.shipping?.cargo_company || ''}
                                           onChange={(e) => {
                                               setNewData({
                                                   ...newData,
                                                   shipping: {
                                                       ...newData?.shipping,
                                                       cargo_company: e.target.value.toUpperCase()
                                                   }
                                               })
                                           }}
                                    />
                                </div>
                                <FormFieldError errorMessage={validationErrors?.cargo_company?.[0] || ""}/>
                            </div>

                            <div className="col">
                                <div className="">Takip Kodu</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price"
                                           value={newData?.shipping?.tracking_code || ''}
                                           onChange={(e) => {
                                               setNewData({
                                                   ...newData,
                                                   shipping: {...newData?.shipping, tracking_code: e.target.value}
                                               })
                                           }}
                                    />
                                </div>
                                <FormFieldError errorMessage={validationErrors?.tracking_code?.[0] || ''}/>
                            </div>

                            <div className="col">
                                <div className="">Verilme Zamanı</div>
                                <div className="">
                                    <input type="text"
                                           className="form-control"
                                           id="price"
                                           value={newData?.shipping?.created_at || ''}
                                           readOnly={true}
                                           style={{
                                               backgroundColor: "#f4f4f4",
                                           }}
                                    />
                                </div>
                            </div>
                        </div>

                        <br/>

                        <h5>Ürünler</h5>

                        <div className="row">
                            {newData?.ordered_products?.map((item, index) => {
                                return (
                                    <div className="w-25 text-center" key={index} style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                         onClick={(e) => {
                                             //todo url
                                             window.open('http://localhost:3000/products/' + item.slug, '_blank');
                                         }}
                                    >
                                        <img src={item.file_path}
                                             style={{
                                                 width: "50px",
                                                 height: "50px",
                                             }} alt="file_path"/>
                                        <div className="fw-semibold">Ürün Adı</div>
                                        <h6>{item.title}</h6>
                                        <div className="fw-semibold">Ürün Adeti</div>
                                        <h6>{item.quantity}</h6>
                                        <div className="fw-semibold">Ürün Eski Fiyatı</div>
                                        <h6>{item.old_price}</h6>
                                        <div className="fw-semibold">Ürün Yeni Fiyatı</div>
                                        <h6>{item.new_price}</h6>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            //setShowUpdateModal(false);
                            //setNewData({});
                            setValidationErrors({})
                        }}
                    />
                    <CustomButton
                        text="Kaydet"
                        status="success"
                        onClick={async (event) => {
                            await handleOnClick({event, data: newData});
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}
