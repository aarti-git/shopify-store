import Router from '@js/router'

new Router({
    baseEl: 'main',
    layout: {
        template: require('@temp/layout.html'),
        controller: require('@js/layout'),
    },
    routes: [
        {
            path: '/',
            template: require('@temp/main.html'),
            controller: require('@js/index')
        },
        {
            path: '/collection',
            template: require('@temp/collection.html'),
            controller: require('@js/collection'),
        }
    ]
});