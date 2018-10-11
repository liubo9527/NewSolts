"use strict";
cc._RFpush(module, 'b47a5TO5UxMaqP8HQmYbHbt', 'PoolRule');
// Script/PoolRule.js

"use strict";

var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack: cc.Node,
        lock: false,
        gameNode: cc.Node,

        beiArray: {
            default: [],
            type: cc.Label
        },

        minArray: {
            default: [],
            type: cc.Label
        },

        //奖池规则标题
        poolTitleLabel: {
            default: [],
            type: [cc.Label]
        },

        //奖池规则说明 1 ~ 20倍
        poolDetailLabel: {
            default: [],
            type: [cc.Label]
        },

        maxArray: {
            default: [],
            type: cc.Label
        },

        hasOpen: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.netData = NetData.NetData.getInst();
        this.lock = false;
        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
            this.close();
        }, this);
    },

    close: function close() {
        if (!this.lock) {
            this.uiBlack.active = false;

            var call3 = cc.callFunc(function () {
                this.netData.helpShowFlag = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, -1500)), call3));
        }
    },

    downHelp: function downHelp() {
        if (this.hasOpen == false) {
            for (var i = 0; i < 5; i++) {
                this.beiArray[i].string = this.netData.poolRules[i].bet;
                this.minArray[i].string = this.netData.poolRules[i].minBouns;
                this.maxArray[i].string = this.netData.poolRules[i].maxBouns;
            }
            //标题最低** 
            for (var _i = 0; _i < 2; _i++) {
                this.poolTitleLabel[_i].string = this.poolTitleLabel[_i].string + NetData.NetData.getInst().InitResult.currency + "数";
            }
            //倍数说明
            for (var _i2 = 0; _i2 < 5; _i2++) {
                var percent = this.netData.poolRules[_i2].floatRate * 100;
                if (percent == 0) {
                    this.poolDetailLabel[_i2].string = "固定" + this.netData.poolRules[_i2].minBouns;
                } else {
                    this.poolDetailLabel[_i2].string = percent + "%当前奖池" + NetData.NetData.getInst().InitResult.currency + "数";
                }
            }
            this.hasOpen = true;
        }
        this.initHelp();
    },

    initHelp: function initHelp() {
        if (!this.lock) {
            this.netData.helpShowFlag = true;
            this.lock = true;
            var callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, -265)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    }
});

cc._RFpop();