import {Outlet} from "react-router-dom";
import TopNavigationBar from "../../components/Home/TopNavigationBar";
import Footer from "../../components/Home/footer/Footer";
import React from "react";

export default function ProfileLayout() {

    return (
        <>
            <TopNavigationBar/>
            <div style={{display: "flex"}}>
                <h1>Profile Page</h1>
            </div>

            <Outlet></Outlet>

            <Footer></Footer>
        </>
    )
}