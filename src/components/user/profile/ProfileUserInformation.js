export default function ProfileUserInformation() {
    return (
        <>
            <h2>Kullanıcı Bilgilerim</h2>

            <div
                className="container"
            >

                <div className="row ">
                    <div className="col-sm-1"></div>

                    <div
                        className="col-sm-3"
                    >
                        Adınız
                    </div>

                    <div
                        className="col-sm-6"
                    >
                        <input type="text" className="form-control " id="name" placeholder="Adınız"/>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div
                        className="col-sm-3"
                    >
                        Soyadınız
                    </div>

                    <div
                        className="col-sm-6"
                    >
                        <input type="text" className="form-control " id="name" placeholder="Soyadınız"/>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div
                        className="col-sm-3"
                    >
                        Telefon Numaranız
                    </div>

                    <div
                        className="col-sm-6"
                    >
                        <input type="text" className="form-control " id="name" placeholder="Telefon Numaranız"/>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-sm-1"></div>

                    <div
                        className="col-sm-3"
                    >
                        Kayıtlı E-Posta Adresiniz
                    </div>

                    <div
                        className="col-sm-6"
                    >
                        <input type="text" className="form-control " id="name" placeholder="Telefon Numaranız"/>
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

                    <div
                        className="col-sm-6"
                    >
                        <button type="button" className="btn btn-primary">Primary</button>
                    </div>
                </div>


            </div>
        </>
    )
}