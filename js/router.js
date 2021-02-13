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
        _this.onRouteChange(e)
    });
    
    _this.loadCurrentRoute();
}

Router.prototype.onRouteChange = function(e){
    this.loadCurrentRoute()
}

Router.prototype.getCurrentRoute = function() {
    const hash = this.hash.replace('#', '')
    return this.routes.find(route => route.path === hash)
}

Router.prototype.loadCurrentRoute = function(){
    const matchedRoute = this.getCurrentRoute()
    this.loadRoute(matchedRoute)
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

    const templateDOM = stringToHtml(Obj.template)
    const placeholder = document.querySelector(target)

    // setup view
    if(empty) {
        placeholder.innerHTML = ''
        placeholder.append(templateDOM)
    }
    else placeholder.append(templateDOM)

    // setup controller
    if(Obj.controller && Obj.controller.init) Obj.controller.init()
    else console.info('.init() is not present', Obj.path)
}

export default Router