import Router from '@js/router'

const router = new Router({
    baseEl: 'main',
    historyAPI: true,
    layout: {
        template: require('@router/layout/view.html'),
        controller: require('@router/layout/controller.js')
    },
    routes: [
        {
            path: '/',
            template: require('@router/index/view.html'),
            controller: require('@router/index/controller.js'),
        },
        {
            path: '/collections',
            template: require('@router/all-collections/view.html'),
            controller: require('@router/all-collections/controller.js'),
            routes:[{
                path: '/:handle',
                template: require('@router/collections/view.html'),
                controller: require('@router/collections/controller.js'),
            }]
        },
        {
            path: '/products',
            template: require('@router/product/view.html'),
            controller: require('@router/product/controller.js'),
            routes: [{
                path: '/:handle',
                template: require('@router/product/view.html'),
                controller: require('@router/product/controller.js'),
            }]
        }
    ]
});

// router.on('routeChange', function(e){
//     index.default.afterRoute(e)
// })