import {Outlet} from "react-router-dom";
import TopNavigationBar from "../../components/Home/TopNavigationBar";
import Footer from "../../components/Home/footer/Footer";
import React from "react";
import "../../configs/ProfilePage.css"
import LeftSide from "../../components/profile/LeftSide";
import {Helmet} from "react-helmet";

export default function ProfileLayout() {

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