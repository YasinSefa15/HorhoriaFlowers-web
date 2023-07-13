import HomePage from "./pages/user/home/HomePage";
import HomePageLayout from "./pages/user/home";
import PrivateRoute from "./components/user/PrivateRoute";
import ProfileLayout from "./pages/user/profile";
import AuthLayout from "./pages/user/auth/AuthLayout";
import LoginPage from "./pages/user/auth/LoginPage";
import Page404 from "./pages/user/error/Page404";
import ProductDetail from "./pages/user/product_detail/ProductDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import ProductAdmin from "./pages/admin/product/ProductAdmin";
import AdminPage from "./pages/admin/AdminPage";
import AdminRoute from "./components/user/AdminRoute";
import CartPage from "./pages/user/cart/CartPage";
import ProductEdit from "./pages/admin/product/ProductEdit";
import RegisterPage from "./pages/user/auth/RegisterPage";
import Products from "./components/user/product_cart/Products";
import ProfileOrders from "./components/user/profile/ProfileOrders";
import ProfileAddresses from "./components/user/profile/ProfileAddresses";
import ProfileShippingStatus from "./components/user/profile/ProfileShippingStatus";
import ProfileUserInformation from "./components/user/profile/ProfileUserInformation";

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
                element: <Products></Products>
            },
            {
                path: '/products/:slug',
                element: <ProductDetail></ProductDetail>
            },
            {
                path: '/products',
                element: <Products></Products>
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
        element: <ProfileLayout></ProfileLayout>,
        children: [
            {
                index: true,
                element: <ProfileUserInformation></ProfileUserInformation>
            },
            {
                path: 'orders',
                element: <ProfileOrders></ProfileOrders>
            },
            {
                path: 'addresses',
                element: <ProfileAddresses></ProfileAddresses>
            },
            {
                path: 'shipping-status',
                element: <ProfileShippingStatus></ProfileShippingStatus>
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
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>
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