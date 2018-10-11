(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/WaitScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ee3eXYdUxGyp3lPj2plkSQ', 'WaitScript', __filename);
// Script/WaitScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.angle = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.angle += dt * 360;

        if (this.angle > 360) {
            this.angle -= 360;
        }

        this.node.rotation = this.angle;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=WaitScript.js.map
        