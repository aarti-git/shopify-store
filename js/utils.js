export const setupLink = function($view){
    const allAnchorTags = $view.querySelectorAll("a");
    allAnchorTags.forEach(function(a){
        a.addEventListener("click", function (e) {
            e.preventDefault();
            const href = '#' + this.getAttribute('href')
            location.hash = href;
        });
    })
}