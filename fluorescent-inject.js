var xhr = window.XMLHttpRequest;

var _open = xhr.prototype.open

xhr.prototype.open = function () {
    console.log(arguments)
    return _open.apply(this, arguments);
}



var _parse = JSON.parse;
JSON.parse = function () {
    console.log(arguments)

    var real = _parse.apply(this, arguments);

    let handler = {
        get: function (target, name) {
            // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            // console.log(arguments.callee.caller)
            console.log('read ', name, ' from ', target)
            return target[name]
        },

        set: function (obj, prop, value) {

            // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
            // console.log(arguments.callee.caller)
            console.log('write ',value, ' to ', obj,' proprety ',prop)
            // The default behavior to store the value
            obj[prop] = value;

            // Indicate success
            return true;
        }

    };

    let proxy = new Proxy(real, handler);


    return proxy;
}