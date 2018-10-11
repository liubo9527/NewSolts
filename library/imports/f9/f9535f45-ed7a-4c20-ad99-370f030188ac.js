"use strict";
cc._RF.push(module, 'f95359F7XpMIK2ZNw8DAYis', 'Notouch');
// Script/Notouch.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //不再派发事件
            event.stopPropagation();

            if (this.obj != undefined) {
                this.fun(this.obj);
                this.obj = undefined;
                this.fun = undefined;
            }
        }, this);
    },

    init: function init(obj, fun) {
        this.obj = obj;
        this.fun = fun;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();