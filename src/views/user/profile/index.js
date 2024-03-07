import {Outlet} from "react-router-dom";
import React from "react";
import "./ProfilePage.css"
import TopNavigationBar from "../../../components/TopNavigationBar";
import LeftSide from "./components/LeftSide";
import Footer from "../home/components/Footer";

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