import HomePage from "./modules/user/pages/home/HomePage";
import HomePageLayout from "./modules/user/pages/home";
import PrivateRoute from "./modules/user/components/PrivateRoute";
import ProfileLayout from "./modules/user/pages/profile";
import AuthLayout from "./modules/user/pages/auth/AuthLayout";
import LoginPage from "./modules/user/pages/auth/LoginPage";
import Page404 from "./modules/user/pages/error/Page404";
import ProductDetail from "./modules/user/pages/product_detail/ProductDetail";
import AdminLayout from "./modules/admin/pages/AdminLayout";
import ProductAdmin from "./modules/admin/pages/product/ProductAdmin";
import AdminPage from "./modules/admin/pages/AdminPage";
import AdminRoute from "./modules/user/components/AdminRoute";
import CartPage from "./modules/user/pages/cart/CartPage";
import ProductEdit from "./modules/admin/pages/product/ProductEdit";
import RegisterPage from "./modules/user/pages/auth/RegisterPage";
import Products from "./modules/user/components/product_cart/Products";
import ProfileOrders from "./modules/user/components/profile/ProfileOrders";
import ProfileAddresses from "./modules/user/components/profile/ProfileAddresses";
import ProfileShippingStatus from "./modules/user/components/profile/ProfileShippingStatus";
import ProfileUserInformation from "./modules/user/components/profile/ProfileUserInformation";
import ChangePassword from "./modules/user/components/profile/ChangePassword";
import EmailChangeOrVerify from "./modules/user/components/profile/EmailChangeOrVerify";

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
            },
            {
                path: 'change-password',
                element: <ChangePassword></ChangePassword>
            },
            {
                path: 'email-operations',
                element: <EmailChangeOrVerify></EmailChangeOrVerify>
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