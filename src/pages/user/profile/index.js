import {Outlet} from "react-router-dom";
import TopNavigationBar from "../../../components/user/Home/TopNavigationBar";
import Footer from "../../../components/user/Home/footer/Footer";
import React from "react";
import "../../../styles/pages/user/ProfilePage.css"
import LeftSide from "../../../components/user/profile/LeftSide";

export default function ProfileLayout() {
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    },[])


    return (
        <>
            <TopNavigationBar/>

            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">

                    <LeftSide>
                    </LeftSide>

                    <div
                        className="profile-right-side col col-sm-9 col-10"
                    >
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>

            <Footer></Footer>
        </>
    )
}