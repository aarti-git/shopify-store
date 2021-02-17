const path = require("path");
const fs = require('fs');

function importView(source) {
    const rx = /<import-view\s+src=((["'])(?:\\.|[^\\])*?\1)\/>/g
    if(rx.test(source)){
        source = source.replace(/<import-view\s+src=((["'])(?:\\.|[^\\])*?\1)\/>/g, function(a, b){
            if(b) {
                const filepath = path.resolve(b.replace(/["']/g, ''))
                const content = fs.readFileSync(filepath)
                return importView(content)
            }
            return a
        })
    }

    return source
}

module.exports = function(source) {
    return importView(source)
}