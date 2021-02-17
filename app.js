import Router from '@js/router'

const router = new Router({
    baseEl: 'main',
    layout: {
        template: require('@router/layout/view.html'),
        controller: require('@router/layout/controller.js')
    },
    routes: [
        {
            path: '/',
            template: require('@router/index/view.html'),
            controller: require('@router/index/controller.js')
        },
        {
            path: '/collection',
            template: require('@router/collection/view.html'),
            controller: require('@router/collection/controller.js')
        },
        {
            path: '/product',
            template: require('@router/product/view.html'),
            controller: require('@router/product/controller.js')
        }
    ]
});


// router.on('routeChange', function(e){
//     index.default.afterRoute(e)
// })