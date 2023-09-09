const api_helper = {
    'api_url': 'http://127.0.0.1:8000/api/',
    "home": "home",
    "admin": {
        "users": {
            "read": "admin/users",
            "create": "admin/users",
            "update": "admin/users/", //:id
        },
        "categories": {
            "read": "admin/categories",
            "create": "admin/categories",
            "mapped": "admin/categories/mapped",
        }
    },
    'auth': {
        'login': "auth/login",
        'register': "auth/register",
    },
    'category': {
        'read': "categories",
        'view': "categories/", // + slug
        'create': "categories",
        'update': "categories/:id",
        'delete': "categories/:id",
        'get_title': "categories/get-title/", // + slug
    },
    'product': {
        'read': "products",
        'view': "products/", // + slug
        'create': "products",
        'update': "products",
        'delete': "products/"
    },
    'carts': {
        'view': "carts",
        'create': "carts",
        'sync': "carts/sync",
        'visitor_products': "carts/visitor-products",
        'update': "carts/:product_id",
        'delete': "carts/delete"
    },
    "user": {
        "view": "user/profile",
        "update": "user/profile",
        "is_admin": "user/is-admin",
        "email": {
            "get_email": "user/profile/get-email",
            "update_email": "user/profile/update-email",
            "update_password": "user/profile/update-password",
        },
        "addresses": {
            "read": "user/addresses",
            "view": "user/addresses/", //id,
            "create": "user/addresses",
            "update": "user/addresses/",
            "delete": "user/addresses/",
        }
    },
    "order": {
        "index": "orders",
        //"view": "orders/", //id
        "create": "orders",
    },
    "coupon": {
        "view": "coupons/", //code
        "index": "coupons",
    }
}

exports.api_helper = api_helper