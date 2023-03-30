import HomePage from "./pages/home/HomePage";
import HomePageLayout from "./pages/home";
import ProductsPage from "./pages/ProductsPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfileLayout from "./pages/profile";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import Index from "./pages/home";
import Page404 from "./pages/error/Page404";
import ProductDetail from "./pages/ProductDetail";

const routes = [
    {
        path: '/',
        element: <HomePageLayout></HomePageLayout>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: '/categories/:slug',
                element: <ProductsPage></ProductsPage>
            },
            {
                path: '/products/:slug',
                element: <ProductDetail></ProductDetail>
            },
            {
                path: '/profile',
                auth: true,
                element: <ProfileLayout/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element: <LoginPage></LoginPage>
            }
        ]
    },
    {
        path: '*',
        element: <Page404></Page404>
    }
]



//todo for admin admin:true in routes, and create admin route like private route
const authMap = routes => routes.map(route => {
    if (route?.children) {
        route.children = authMap(route.children)
    }
    if (route?.auth) {
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    return route
})


export default authMap(routes)