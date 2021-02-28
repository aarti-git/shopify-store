const routerEvents = {}

function stringToHtml(htmlstr) {
    const DP = new DOMParser();
    const newDOM = DP.parseFromString(htmlstr, 'text/html');
    return newDOM.body.firstElementChild
}

function Router(config) {
    this.config = config;
    this.init()
}

Object.defineProperty(Router.prototype, 'hash', {
    get: function(){
        const hash = window.location.hash;
        return !hash ? '/' : hash.replace('#', '')
    }
})

Object.assign(Router.prototype, {
    init: function(){
        const _this = this;
        window.addEventListener('hashchange', function(e){
            _this.onRouteChange(e);
            _this.on("routeChange", e);
        });
        
        _this.buildRoutes()
        _this.prepareRoute();
        _this.loadCurrentRoute();
    },
    buildRoutes: function(){
        const makeRoutes = (acc, route, path = '') => {
            const _path = path.concat(route.path)
            const innerRoutes = route.routes;
            const params = []

            route.path = _path;
            route.params = params;
            
            const pattern = _path.replace(/:\w+\/?/g, function(val){
                params.push(val);
                return '(.*\\/)'
            });
            route.pattern = new RegExp(`^${pattern + '\\/?'}$`)
            
            acc[_path] = route
            
            if(innerRoutes) {
                innerRoutes.forEach(_route => makeRoutes(acc, _route, _path))
                delete route.routes;
            }
        };

        this.routes = this.config.routes.reduce((acc, route)=> {
            makeRoutes(acc, route)
            return acc
        }, {})
    },
    on: function(eName, options){
        const isCallback = typeof options === 'function'
    
        if(isCallback) routerEvents[eName] = options
        else if (routerEvents[eName]) routerEvents[eName](options)
    },
    prepareRoute: function(){
        if(this.config.historyAPI) {
            const pathname = location.pathname 
            if(pathname !== '/') history.replaceState(pathname, '', '/#'.concat(pathname))
        }
    },
    onRouteChange: function(e){
        this.loadCurrentRoute()
    },
    getCurrentRoute: function() {
        const hash = this.hash
        return this.getRoute(this.routes, hash)
    },
    getRoute: function(routes, url){
        let route = routes[url]
        if(!route) {
            const _url = url + '/'
            route = Object.values(routes).find(route => route.pattern.test(_url))

            if(route){
                const values = _url.match(route.pattern)
                const params = route.params.reduce((params, param, i) => {
                    params[param.replace(/[:\/]/g, '')] = values[i + 1].replace('/', '');
                    return params
                }, {})
                return { route, params }
            }

            return { route }
        }
        else return { route }
    },
    loadCurrentRoute: function(){
        const mRoute = this.getCurrentRoute()
        if(!mRoute.route) this.loadRoute({ error: true })
        else this.loadRoute(mRoute.route, mRoute.params)
    },
    loadRoute: function(route, params){
        const main = document.querySelector('main')
        if(!main) this.renderLayout();
    
        this.render({renderer: route, params})
    },
    renderLayout: function(){
        const layout = this.config.layout;
        this.render({renderer: layout}, 'body', false)
    },
    
    /**
     *
     * @param { Object } Obj 
     * @param { Object.template } template HTML view
     * @param { Object.controller } controller Controller of the view
     */
    
    render: function(rObj, target = 'main', empty = true){
        if(!rObj) return console.log('rObj is not pass inside .render')

        const renderer = rObj.renderer
        const params = rObj.params
        
        const placeholder = document.querySelector(target)
        if(renderer.error) {
            const errPage = this.config.error || `<div><h1>404 Page not found!</h1></div>`
            placeholder.innerHTML = errPage;
            return;
        }
    
        const templateDOM = stringToHtml(renderer.template)
    
        // setup view
        if(empty) {
            placeholder.innerHTML = ''
            placeholder.append(templateDOM)
        }
        else placeholder.append(templateDOM)
    
        // setup controller
        const context = (renderer.controller && renderer.controller.default) || renderer.controller 
        if(context.init) context.init(templateDOM, params)
        else console.info('.init() is not present', renderer.path)
    },

    createLoader: function() {
        
    }
})

export default Router