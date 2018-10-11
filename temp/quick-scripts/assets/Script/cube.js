(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/cube.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '19415w7m0BGJ4yQomivTxWU', 'cube', __filename);
// Script/cube.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        WW: {
            default: null,
            type: cc.Node
        },
        FG: {
            default: null,
            type: cc.Node
        },
        M1: {
            default: null,
            type: cc.Node
        },
        M2: {
            default: null,
            type: cc.Node
        },
        M3: {
            default: null,
            type: cc.Node
        },
        F4: {
            default: null,
            type: cc.Node
        },
        F5: {
            default: null,
            type: cc.Node
        },
        F6: {
            default: null,
            type: cc.Node
        },
        F7: {
            default: null,
            type: cc.Node
        },
        F8: {
            default: null,
            type: cc.Node
        },
        //
        hasPlay: false //是否播放了动画
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {},

    playAni: function playAni() {
        this.hasPlay = true;
        var animNode = this.node.getChildByName("ani");
        animNode.active = true;
        var animCtrl = animNode.getComponent(cc.Animation);
        animCtrl.play();
    },

    shakeEgg: function shakeEgg() {
        var action1 = cc.rotateTo(0.1, 15.0);
        var action2 = cc.rotateTo(0.1, -15.0);
        var antion3 = cc.rotateTo(0.05, 0.0);
        var seq = cc.sequence(action1, action2, antion3);
        var repeat = cc.repeat(seq, 3);
        this.FG.runAction(repeat);
    },

    stopAni: function stopAni() {
        if (this.hasPlay == true) {
            var animNode = this.node.getChildByName("ani");
            var animCtrl = animNode.getComponent(cc.Animation);
            animCtrl.stop();
            animNode.active = false;
        }
        this.hasPlay = false;
    },

    setCube: function setCube(name) {
        this.WW.active = false;
        this.FG.active = false;
        this.M1.active = false;
        this.M2.active = false;
        this.M3.active = false;
        this.F4.active = false;
        this.F5.active = false;
        this.F6.active = false;
        this.F7.active = false;
        this.F8.active = false;
        if (name == "WW") {
            this.WW.active = true;
        } else if (name == "M1") {
            this.M1.active = true;
        } else if (name == "M2") {
            this.M2.active = true;
        } else if (name == "M3") {
            this.M3.active = true;
        } else if (name == "F4") {
            this.F4.active = true;
        } else if (name == "F5") {
            this.F5.active = true;
        } else if (name == "F6") {
            this.F6.active = true;
        } else if (name == "F7") {
            this.F7.active = true;
        } else if (name == "F8") {
            this.F8.active = true;
        } else if (name == "FG") {
            this.FG.active = true;
        } else {
            cc.log("unknown card type:" + name);
        }
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
        //# sourceMappingURL=cube.js.map
        