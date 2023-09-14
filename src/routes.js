import HomePage from "./modules/user/pages/home/HomePage";
import HomePageLayout from "./modules/user/pages/home";
import PrivateRoute from "./modules/user/configs/PrivateRoute";
import ProfileLayout from "./modules/user/pages/profile";
import AuthLayout from "./modules/user/pages/auth/AuthLayout";
import LoginPage from "./modules/user/pages/auth/LoginPage";
import Page404 from "./modules/user/pages/error/Page404";
import ProductDetail from "./modules/user/pages/product_detail/ProductDetail";
import AdminLayout from "./modules/admin/pages/AdminLayout";
import ProductAdmin from "./modules/admin/pages/product/ProductAdmin";
import AdminRoute from "./modules/user/configs/AdminRoute";
import CartPage from "./modules/user/pages/cart/CartPage";
import ProductEdit from "./modules/admin/pages/product/ProductEdit";
import RegisterPage from "./modules/user/pages/auth/RegisterPage";
import ProfileOrders from "./modules/user/components/profile/ProfileOrders";
import ProfileAddresses from "./modules/user/components/profile/ProfileAddresses";
import ProfileShippingStatus from "./modules/user/components/profile/ProfileShippingStatus";
import ProfileUserInformation from "./modules/user/components/profile/ProfileUserInformation";
import ChangePassword from "./modules/user/components/profile/ChangePassword";
import EmailChangeOrVerify from "./modules/user/components/profile/EmailChangeOrVerify";
import ProfileUserCoupons from "./modules/user/components/profile/ProfileUserCoupons";
import ProductSearch from "./modules/user/pages/product_search/ProductSearch";
import CategoryProducts from "./modules/user/pages/category_products/CategoryProducts";
import OrderIndex from "./modules/user/pages/order/OrderIndex";
import AdminHomePage from "./modules/admin/pages/AdminHomePage";
import AdminProducts from "./modules/admin/pages/AdminProducts";
import AdminCategories from "./modules/admin/pages/AdminCategories";
import AdminOrders from "./modules/admin/pages/AdminOrders";
import AdminStatistics from "./modules/admin/pages/AdminStatistics";
import AdminUsers from "./modules/admin/pages/AdminUsers";
import ProductCreate from "./modules/admin/pages/product/ProductCreate";

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
                    {
                        path: 'edit/:id',
                        element: <ProductEdit></ProductEdit>
                    },
                    {
                        path: 'create',
                        element: <ProductCreate></ProductCreate>
                    }
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
        path: 'admin1/products',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                index: true,
                element: <AdminProducts></AdminProducts>
            },
            {
                path: 'edit/:id',
                element: <ProductEdit></ProductEdit>
            },
            {
                path: 'create',
                element: <ProductCreate></ProductCreate>
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