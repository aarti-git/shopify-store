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
        return !hash ? '/' : hash
    }
})

Router.prototype.init = function(){
    const _this = this;
    this.routes = this.config.routes

    window.addEventListener('hashchange', function(e){
        _this.onRouteChange(e);
        _this.on("routeChange", e);
    });
    
    _this.loadCurrentRoute();
}

Router.prototype.on = function(eName, options){
    const isCallback = typeof options === 'function'

    if(isCallback) routerEvents[eName] = options
    else if (routerEvents[eName]) routerEvents[eName](options)
};

Router.prototype.onRouteChange = function(e){
    this.loadCurrentRoute()
}

Router.prototype.getCurrentRoute = function() {
    const hash = this.hash.replace('#', '')
    return this.routes.find(route => route.path === hash)
}

Router.prototype.loadCurrentRoute = function(){
    const matchedRoute = this.getCurrentRoute()
    if(!matchedRoute) this.loadRoute({ error: true })
    else this.loadRoute(matchedRoute)
}

Router.prototype.loadRoute = function(route){
    const main = document.querySelector('main')
    if(!main) this.renderLayout();

    this.render(route)
}

Router.prototype.renderLayout = function(a,b){
    const layout = this.config.layout;
    this.render(layout, 'body', false)
}

/**
 *
 * @param { Object } Obj 
 * @param { Object.template } template HTML view
 * @param { Object.controller } controller controller of the view
 */

Router.prototype.render = function(Obj, target = 'main', empty = true){
    if(!Obj) return console.log('obj is not pass inside .render')
    
    const placeholder = document.querySelector(target)
    if(Obj.error) {
        const errPage = this.config.error || `<div><h1>404 Page not found!</h1></div>`
        placeholder.innerHTML = errPage;
        return;
    }

    const templateDOM = stringToHtml(Obj.template)

    // setup view
    if(empty) {
        placeholder.innerHTML = ''
        placeholder.append(templateDOM)
    }
    else placeholder.append(templateDOM)

    // setup controller
    const context = Obj.controller && Obj.controller.default 
    if(context.init) context.init(templateDOM)
    else console.info('.init() is not present', Obj.path)
}

export default Router