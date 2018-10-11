"use strict";
cc._RF.push(module, '3a1a7wCx+pJkYKinF36cMF+', 'nettest');
// Script/nettest.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");
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
    },

    // use this for initialization
    onLoad: function onLoad() {},

    click: function click() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(this.netCallback, this);
    },

    click2: function click2() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getBet(0, "", 0, 1, 10, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
    },
    click3: function click3() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getReward(NetData.NetData.getInst().BetResult.ticketNo, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
    },

    click4: function click4() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getGameList(this.netCallback, this);
    },

    click5: function click5() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getPool(this.netCallback, this);
    },

    netCallback: function netCallback(cmd, res, msg, self) {
        cc.log("netCallback cmd=" + cmd);
        if (res == 0) {
            switch (cmd) {
                case 100:
                    //初始化
                    {
                        var data = NetData.NetData.getInst().InitResult;
                    }
                    break;

                case 101:
                    //投注
                    {

                        var data = NetData.NetData.getInst().BetResult;
                        cc.log("********投注********");
                    }
                    break;

                case 102:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().RewardResult;
                    }
                    break;

                case 103:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().GameListResult;
                    }
                    break;

                case 104:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().PoolResult;
                    }
                    break;

                default:
                    {}
                    break;
            }
        } else {}
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();