import React from "react";
import {Outlet} from "react-router-dom";
import TopNavigationBar from "../../../components/TopNavigationBar";
import Footer from "./components/Footer";


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