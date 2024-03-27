const api_helper = {
    'api_url': 'http://localhost:8000/api/', //local 'http://localhost:8000/api/' https://api.horhoriaflowers.com/api/
    "home": "home",
    "admin": {
        "users": {
            "read": "admin/users",
            "create": "admin/users",
            "update": "admin/users/", //:id
            "delete": "admin/users/:user_id",
        },
        "categories": {
            "read": "admin/categories",
            "create": "admin/categories",
            "mapped": "admin/categories/mapped",
            "delete": "admin/categories/:category_id",
            "update": "admin/categories/:slug",
        },
        "products": {
            "read": "admin/products",
            "sized-mapped": "admin/products/sized-mapped",
            "create": "admin/products",
            "update": "admin/products/:product_id",
            "delete": "admin/products/:product_id",
            "view": "admin/products/:product_id",
        },
        "orders": {
            "read": "admin/orders",
            "view": "admin/orders/:order_code",
            "update": "admin/orders/:order_code",
        },
        "statistics": {
            "read": "admin/statistics",
            "sales": "admin/statistics/sales",
            "users": "admin/statistics/users",
            "orders": "admin/statistics/orders",
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
        },
        "orders": {
            "read": "orders",
            "create": "orders",
        }
    },
    "coupon": {
        "view": "coupons/", //code
        "index": "coupons",
    }
}

exports.api_helper = api_helper