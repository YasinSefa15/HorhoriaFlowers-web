export default function AdminStatistics() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>
                <h1>İstatistikler</h1>
            </div>

            <div className="container">
                <div className="alert alert-warning" role="alert">
                    Yakında!!!
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Neler Bekliyor?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>en çok sepete eklenen ürünler</p>
                                <p>sepette en çok adet olarak yer alan ürünler</p>
                                <p>en çok tercih edilen ürünler</p>
                                <p>en çok adet olarak tercih edilen ürünler</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}