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
import AdminLayout from "./pages/admin/AdminLayout";
import ProductAdmin from "./pages/admin/product/ProductAdmin";
import AdminPage from "./pages/admin/AdminPage";
import AdminRoute from "./components/AdminRoute";
import ProductSearch from "./pages/product/ProductSearch";
import CartPage from "./pages/cart/CartPage";
import ProductEdit from "./pages/admin/product/ProductEdit";

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
                path: '/products',
                element: <ProductSearch></ProductSearch>
            }
        ]
    },
    {
        path: '/cart',
        element: <CartPage></CartPage>

    },
    {
        path: '/profile',
        auth: true,
        element: <ProfileLayout/>
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
        path: '/admin',
        admin: true,
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                index: true,
                admin: true,
                element: <AdminPage></AdminPage>
            },
            {
                path: 'products',
                admin: true,
                element: <ProductAdmin></ProductAdmin>,
            },
            {
                path: 'products/:slug',
                admin: true,
                element: <ProductEdit></ProductEdit>
            },
            {
                path: 'categories',
                admin: true,
                element: <ProductAdmin></ProductAdmin>
            }
        ]
    },
    {
        path: '*',
        element: <Page404></Page404>
    }
]


const authMap = routes => routes.map(route => {
    if (route?.children) {
        route.children = authMap(route.children)
    }
    if (route?.auth) {
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    if (route?.admin) {
        route.element = <AdminRoute>{route.element}</AdminRoute>
    }
    return route
})


export default authMap(routes)