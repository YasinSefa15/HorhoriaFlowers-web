import {Routes, Route, Link, NavLink} from 'react-router-dom'
import Index from "./pages/home";
import React from 'react';
import ProductsPage from "./pages/ProductsPage";
import HomePageLayout from "./pages/home";
import HomePage from "./pages/home/HomePage";
import Page404 from "./pages/error/Page404";
import ProfileLayout from "./pages/profile";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./pages/auth/AuthLayout";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index={true} element={<HomePage/>}></Route>
                    <Route path="/categories/:slug" element={<ProductsPage/>}></Route>
                    <Route path="/products/:slug" element={<Index/>}></Route>
                    <Route path="/profile" element={<PrivateRoute><ProfileLayout/></PrivateRoute>}> </Route>
                </Route>

                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path="login" element={<LoginPage/>}></Route>
                </Route>
                <Route path="*" element={<Page404/>}></Route>
            </Routes>
        </>
    )
        ;
}

export default App;
