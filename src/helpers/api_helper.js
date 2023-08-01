const api_helper = {
    'api_url': 'http://127.0.0.1:8000/api/',
    "home": "home",
    'auth': {
        'login': "auth/login",
        'register': "auth/register",
    },
    'category': {
        'read': "categories",
        'list': "categories/list",
        'view': "categories/", // + slug
        'create': "categories",
        'update': "categories/:id",
        'delete': "categories/:id"
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
        'update': "carts/:product_id",
        'delete': "carts/:product_id"
    },
    "user": {
        "view": "user/profile",
        "update": "user/profile",
        "email" : {
            "get_email" : "user/profile/get-email",
            "update_email" : "user/profile/update-email",
        },
        "addresses": {
            "view": "user/addresses",
            "create": "user/addresses",
        }
    }
}

exports.api_helper = api_helper