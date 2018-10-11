(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/NetData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '455005bpAxP7K4uERaZgcXQ', 'NetData', __filename);
// Script/network/NetData.js

"use strict";

var NetData = cc.Class({
    statics: {
        g_Inst: null,
        s_index: 0,

        getInst: function getInst() {

            if (NetData.g_Inst === null) {
                NetData.g_Inst = new NetData();
                NetData.g_Inst.init();
            }
            return NetData.g_Inst;
        },

        destoryInst: function destoryInst() {

            if (NetData.g_Inst !== null) {
                NetData.g_Inst = null;
            }
        }
    },

    properties: {

        //投注响应对象
        BetResult: {
            default: null,

            serializable: false
        },
        //初始化响应对象 
        InitResult: {
            default: null,

            serializable: false
        },
        //结算响应对象
        RewardResult: {
            default: null,

            serializable: false
        },
        //游戏列表
        GameListResult: {
            default: null,

            serializable: false
        },

        //奖池
        PoolResult: {
            default: null,

            serializable: false
        },

        //奖池规则
        poolRules: {
            default: [],
            serializable: false
        },

        //游戏列表
        GameRule: {
            default: null,
            serializable: false
        },

        balance: -1, //余额
        rulePics: [], //规则图片列表
        orderShowFlag: false, //是否显示订单ing
        helpShowFlag: false, //是否显示规则
        userId: null, //userID
        userNick: null, //用户昵称
        stopSellingDesc: "" //停售说明

    },

    init: function init() {
        if (!CC_JSB) {
            var self = this;
            // 由于在绑定时可能已经触发过该事件，可以先获取一下
            if (window.aliLotteryCasinoSDK) {
                //window.aliLotteryCasinoSDK.log('debug', 'version', '12/28 17:50');
                window.aliLotteryCasinoSDK.getUserInfo(function (info) {
                    if (info) {
                        self.balance = info.fee;
                        self.userNick = info.nick;
                        self.userId = info.uid;
                    }
                });
            } else {
                this.balance = 1000; //my server
            }
            document.addEventListener('casino:updateUserBalance', function (e) {
                // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                self.balance = e.data.fee;
                self.userNick = e.data.nick;
                self.userId = e.data.uid;
            }, false);
        } else {
            this.balance = 1000; //simulator
        }
    },

    getBalance: function getBalance() {
        return this.balance;
    }
});

module.exports = {
    NetData: NetData
};

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
        //# sourceMappingURL=NetData.js.map
        