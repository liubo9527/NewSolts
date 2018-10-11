"use strict";
cc._RF.push(module, 'c12406dTnpLcpVL4UPuYYtD', 'SdkData');
// Script/network/SdkData.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");
var Common = require("Common");

var SdkData = cc.Class({
    statics: {
        g_SdkDataInst: null,

        getInst: function getInst() {
            if (SdkData.g_SdkDataInst == null) {
                SdkData.g_SdkDataInst = new SdkData();
                SdkData.g_SdkDataInst.register();
            }

            return SdkData.g_SdkDataInst;
        },

        destoryInst: function destoryInst() {
            if (SdkData.g_SdkDataInst !== null) {
                SdkData.g_SdkDataInst = null;
            }
        }
    },

    //注册监听
    register: function register() {
        if (!CC_JSB) {
            //系统退出事件
            document.addEventListener('casino:back', function () {
                Common.Common.getInst().debug("SdkData_register_casino:back");
            }, false);

            //窗口激活事件，当 App 从后台切回到前台时会触发
            document.addEventListener('casino:resume', function (e) {}, false);

            //余额更新事件
            document.addEventListener('casino:updateUserBalance', function (e) {
                if (e) {
                    NetData.NetData.getInst().balance = e.data.fee;
                }
            }, false);

            //余额更新事件
            document.addEventListener('casino:updateUserBalanceError', function () {
                NetData.NetData.getInst().error = true;
            }, false);

            //
            document.addEventListener('casino:click', function (e) {
                switch (e.data.type) {
                    case 'order':
                        // 我的订单

                        break;
                    case 'rule':
                        // 游戏规则

                        break;
                }
            }, false);
        }
    },

    //更新用户信息
    updateUserInfo: function updateUserInfo() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.updateUserInfo();
            }
        }
    },

    //充值
    //@param flag 是否提示余额不足
    recharge: function recharge(flag) {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.recharge(flag);
            }
        }
    },

    //更多订单
    orderMore: function orderMore() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                var arr = DataOper.DataOper.getInst().gameToken.split("-");
                var instanceId = arr[2];
                window.aliLotteryCasinoSDK.redirectOrder(instanceId);
            }
        }
    },

    //退出游戏
    exitGame: function exitGame() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.popWindow();
            }
        }
    },

    setCache: function setCache(key, value) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            window.aliLotteryCasinoSDK.setCache(key, value);
        } else {
            cc.sys.localStorage.setItem(key, value);
        }
    },

    getCache: function getCache(key, callback) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            window.aliLotteryCasinoSDK.getCache(key, callback);
        } else {
            var result = cc.sys.localStorage.getItem(key);
            callback(result);
        }
    }

});

module.exports = SdkData;

cc._RF.pop();