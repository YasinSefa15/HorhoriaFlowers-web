import TopNavigationBar from "../../components/Home/TopNavigationBar";
import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Home/footer/Footer";
import {useData} from "../../../../context/DataProvider";


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