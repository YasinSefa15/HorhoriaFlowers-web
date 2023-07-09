const api_helper = {
    'api_url': 'http://127.0.0.1:8000/api/',
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
    'cart' : {
        'view': "cart",
        'create': "cart",
        'update': "cart",
        'delete': "cart"
    }
}

exports.api_helper = api_helper