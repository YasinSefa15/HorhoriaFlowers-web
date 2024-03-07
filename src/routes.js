import HomePage from "./views/user/home/HomePage";
import HomePageLayout from "./views/user/home";
import ProfileLayout from "./views/user/profile";
import AuthLayout from "./views/user/auth/AuthLayout";
import LoginPage from "./views/user/auth/LoginPage";
import Page404 from "./views/user/error/Page404";
import ProductDetail from "./views/user/product_detail/ProductDetail";
import AdminLayout from "./views/admin/index/AdminLayout";
import CartPage from "./views/user/cart/CartPage";
import RegisterPage from "./views/user/auth/RegisterPage";
import ProductSearch from "./views/user/product_search/ProductSearch";
import CategoryProducts from "./views/user/category_products/CategoryProducts";
import OrderIndex from "./views/user/order/OrderIndex";
import AdminHomePage from "./views/admin/AdminHomePage";
import AdminProducts from "./views/admin/products/AdminProducts";
import AdminCategories from "./views/admin/categories/AdminCategories";
import AdminOrders from "./views/admin/orders/AdminOrders";
import AdminStatistics from "./views/admin/AdminStatistics";
import AdminUsers from "./views/admin/user/AdminUsers";
import AboutUs from "./views/user/home/AboutUs";
import ProfileUserInformation from "./views/user/profile/components/ProfileUserInformation";
import ProfileOrders from "./views/user/profile/components/ProfileOrders";
import ProfileAddresses from "./views/user/profile/components/ProfileAddresses";
import ProfileUserCoupons from "./views/user/profile/components/ProfileUserCoupons";
import ProfileShippingStatus from "./views/user/profile/components/ProfileShippingStatus";
import ChangePassword from "./views/user/profile/components/ChangePassword";
import EmailChangeOrVerify from "./views/user/profile/components/EmailChangeOrVerify";
import PrivateRoute from "./views/user/configs/PrivateRoute";
import AdminRoute from "./views/user/configs/AdminRoute";

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
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/categories/:slug',
                element: <CategoryProducts></CategoryProducts>
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
        path: '/order',
        element: <OrderIndex></OrderIndex>
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
                path: 'coupons',
                element: <ProfileUserCoupons></ProfileUserCoupons>
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
                element: <AdminHomePage></AdminHomePage>
            },
            {
                path: 'products',
                children: [
                    {
                        index: true,
                        element: <AdminProducts></AdminProducts>
                    },

                ]
            },

            {
                path: 'categories',
                element: <AdminCategories></AdminCategories>
            },
            {
                path: 'orders',
                element: <AdminOrders></AdminOrders>,
            },
            {
                path: 'statistics',
                element: <AdminStatistics></AdminStatistics>
            },
            {
                path: 'users',
                element: <AdminUsers></AdminUsers>
            },
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