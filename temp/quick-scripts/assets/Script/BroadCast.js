(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BroadCast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b582b4GrxxOj5fS2Qj9bOnr', 'BroadCast', __filename);
// Script/BroadCast.js

"use strict";

var NetData = require("NetData");
var Common = require("Common");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        broadcastData: null,
        index: 0,
        labels: {
            default: [],
            type: cc.Label
        },
        firstFlag: true,
        resetFlag: true
    },

    // use this for initialization
    onLoad: function onLoad() {},

    dataCallback: function dataCallback() {
        this.broadcastData = NetData.NetData.getInst().InitResult.marqueeInfos;
        if (this.broadcastData && this.broadcastData.length > 0) {
            this.index = 0;
            if (this.firstFlag) {
                this.freeArray = new Array();
                this.activeArray = new Array();
                for (var i = 0; i < 3; ++i) {
                    this.freeArray.push(this.labels[i]);
                }
                this.firstFlag = false;
                this.show();
            }
        }
    },

    show: function show() {
        this.node.x = 0;
        this.resetLabel();
    },

    resetLabel: function resetLabel() {
        if (this.resetFlag && this.freeArray.length > 0) {
            this.resetFlag = false;
            var label = this.freeArray.shift();
            label.node.x = 420;

            if (this.index >= this.broadcastData.length) {
                this.index = 0;
            }

            var self = this;
            Common.Common.getInst().getNick(0, this.broadcastData[this.index].uid, function (j, nick, uid) {
                var nicknick = nick;
                var str = self.broadcastData[self.index].msg.replace(/#{user}/, nicknick);
                if (self.broadcastData[self.index].msg.indexOf("天降") > 0) {
                    label.node.color = new cc.Color(255, 246, 0);
                } else {
                    label.node.color = new cc.Color(247, 241, 230);
                }
                label.string = str;
                self.index++;
                self.activeArray.push(label);
                self.resetFlag = true;
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (!this.firstFlag) {
            for (var i = 0; i < this.activeArray.length; ++i) {
                this.activeArray[i].node.x -= 200 * dt;
            }

            if (this.activeArray.length > 0) {
                if (this.activeArray[0].node.x + this.activeArray[0].node.width < -600) {
                    this.freeArray.push(this.activeArray.shift());
                }

                if (this.activeArray[this.activeArray.length - 1].node.x + this.activeArray[this.activeArray.length - 1].node.width < 200) {
                    this.resetLabel();
                }
            }
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
        //# sourceMappingURL=BroadCast.js.map
        