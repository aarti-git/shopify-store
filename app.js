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
            template: require('@router/collections/view.html'),
            controller: require('@router/collections/controller.js'),
            routes:[{
                path: '/:handle',
                template: require('@router/collections/view.html'),
                controller: require('@router/collections/controller.js'),
            }]
        },
        {
            path: '/product',
            template: require('@router/product/view.html'),
            controller: require('@router/product/controller.js'),
            routes: [{
                path: '/:productHandle/:name',
                template: require('@router/product/view.html'),
                controller: require('@router/product/controller.js'),
            }]
        }
    ]
});

console.log(router)
// router.on('routeChange', function(e){
//     index.default.afterRoute(e)
// })