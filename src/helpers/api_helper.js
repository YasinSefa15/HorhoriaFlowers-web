const api_helper = {
    'api_url': 'http://127.0.0.1:8080/api/',
    'category': {
        'read': "categories",
        'view': "categories/", // + slug
        'create': "categories",
        'update': "categories/:id",
        'delete': "categories/:id"
    },
    'product': {
        'view': "products/", // + slug
    }
}

exports.api_helper = api_helper