"use strict";
cc._RF.push(module, 'a78f2x52kFKtbygdGmeDrnY', 'Init');
// Script/network/Init.js

"use strict";

var DataOper = require("DataOper");
var NetData = require("NetData");
var SdkData = require("SdkData");

cc.Class({
    extends: cc.Component,

    /*ctor: function() {
        
    },*/

    init: function init() {
        var self = this;
        var sdk = window.aliLotteryCasinoSDK;
        if (!CC_JSB && sdk) {
            document.addEventListener('casino:init', function (e) {
                if (e && e.data && e.data.accessToken) {
                    DataOper.DataOper.getInst().gameToken = e.data.accessToken;
                }
                var f = e; //
                self.fetch(function (isError) {
                    console.log(isError);
                    if (!isError) {
                        //皮肤
                        // var skin = "";
                        // var extend = "";
                        NetData.NetData.getInst().skin = f.data.skinConfig;

                        // if(initResult){
                        //     skin = initResult.skin.skinUrl;
                        //     extend = initResult.extend;
                        // }
                        // 合并资源
                        sdk.mergeResources(sdk.analyseResouce({
                            // skin: skin,
                            // extra: extend
                        }));
                        // 显示 loading
                        sdk.initLoading();
                        // 运行游戏
                        sdk.runGame();
                    } else {
                        sdk.showError();
                    }
                });
            }, false);
        } else {}
    },

    fetch: function fetch(callback) {
        cc.log("fetch");
        this.initData = {};
        var self = this;
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(function (cmd, res, msg, self) {
            // 判断是否成功并存储初始化
            var isError = false;
            if (res == 100007) {
                isError = false;
            } else if (200019 == res) {
                isError = false;
            } else if (res != 0) {
                isError = true;
            }
            cc.log('fetch init data');
            cc.log(cmd, res, msg);
            self.initData.cmd = cmd;
            self.initData.res = res;
            self.initData.msg = msg;
            callback && callback(isError);
        }, this);
    }
});

cc._RF.pop();