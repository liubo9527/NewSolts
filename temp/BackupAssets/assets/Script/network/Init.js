var DataOper = require("DataOper");
var NetData = require("NetData");
var SdkData = require("SdkData");



cc.Class({
    extends: cc.Component,

    /*ctor: function() {
        
    },*/

    init: function() {
        var self = this;
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            document.addEventListener('casino:init', function(e) {
                self.fetch(function(isError) {
                    console.log(isError);
                    if (!isError) {
                          // 合并资源
                          window.aliLotteryCasinoSDK.mergeResources();
                          // 显示 loading
                          window.aliLotteryCasinoSDK.initLoading();
                          // 运行游戏
                          window.aliLotteryCasinoSDK.runGame();
                    } else {
                        window.aliLotteryCasinoSDK.showError();
                    }
                });
              }, false);
        } else {

        }
    },

    fetch: function(callback) {
        cc.log("fetch");
        var self = this;
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(function(cmd, res, msg, self) {
            // 判断是否成功并存储初始化
            var isError = false;

            if(res != 0){
                    isError = true;
            }
            else{
                            
            }

            callback && callback(isError);
        }, this);
    },
});
