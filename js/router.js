define(function (require, exports, module){
    'use strict';
    var controllers = {
        global: require('js/pages/global'),
        home: require('js/pages/home'),
        game: require('js/pages/game')
    };
    var loader = {
        init: function(){
            if(typeof controllers.global.index === 'function'){
                controllers.global.index();
            }
            var controller = this._findController();
            var method = null;
            if(controller !== null){
                if(controllers[controller]){
                    method = (method !== null) ? method : 'index';
                    if(typeof controllers[controller][method] === 'function'){
                        controllers[controller][method]();
                    }
                }
            }
            // if(typeof controllers.callback.index === 'function'){
            //     controllers.callback.index();
            // }
        },
        _find: function(_class, _str){
            if(_class.length>0){
                var _array = null;
                for(var i=0; i<_class.length; i++){
                    var n = _class[i].indexOf(_str);
                    if(n===0){
                        _array = _class[i].replace(_str+"_","");
                        break;
                    }
                }
                return _array;
            }else{
                return null;
            }
        },

        /*Find controller from id*/
        _findController: function () {
            var el = document.querySelectorAll("body[id^='page']");            
            if (el.length) {
                return el[0].id.split('-').length >= 2 ? el[0].id.split('-')[1] : null;
            }
            else {
                return null;
            }
        }
    };
    var deferred = $.Deferred();
    loader.init();
    deferred.resolve();
    return deferred.promise();
});