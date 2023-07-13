import TopNavigationBar from "../../../components/user/Home/TopNavigationBar";
import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../../../components/user/Home/footer/Footer";


export default function HomePageLayout() {
    return (
        <>
            <TopNavigationBar></TopNavigationBar>
            <div style={{marginBottom: "20px"}}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    )
}