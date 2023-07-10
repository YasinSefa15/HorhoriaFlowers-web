import TopNavigationBar from "../../components/Home/TopNavigationBar";
import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Home/footer/Footer";


export default function HomePageLayout() {
    return (
        <>
            <TopNavigationBar></TopNavigationBar>
            <div style={{display: "flex", marginBottom: "100px"}}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </>
    )
}