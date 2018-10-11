"use strict";
cc._RFpush(module, '07c4cE6DWpBoabUOfzT4ain', 'TurntableOrderScript');
// Script/TurntableOrderScript.js

"use strict";

var NetData = require("NetData");
cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: cc.Label, //2016.06.12
        numberLabel: cc.Label, //订单编号：8654777754432889
        douLabel: cc.Label, //共投 88豆
        stateLabel: cc.Label, //等待开奖 未中奖 中奖：8888.88豆
        payDou: cc.Node,
        satateDou: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {},

    //state_int 状态，0：游戏中（等待开奖），1：中奖，2：未中奖
    setOrderData: function setOrderData(time_label, number_label, dou_label, state_Label, stateInt, dou_currency) {
        this.timeLabel.string = time_label;
        this.numberLabel.string = "订单编号：" + number_label;
        this.douLabel.string = "投: " + dou_label + NetData.NetData.getInst().InitResult.currency;

        this.payDou.x = this.douLabel.node.x - (this.douLabel.node.width - 68);
        this.satateDou.active = false;

        this.stateLabel.string = "";

        if (stateInt == 0) {
            this.stateLabel.node.color = new cc.Color(255, 255, 255);
            this.stateLabel.string = "等待开奖";
        } else if (stateInt == 1) {
            this.stateLabel.node.color = new cc.Color(246, 208, 40);
            this.stateLabel.string = "中: " + state_Label + NetData.NetData.getInst().InitResult.currency;

            this.satateDou.active = false;
            this.satateDou.x = this.stateLabel.node.x - (this.stateLabel.node.width - 68);
        } else if (stateInt == 2) {
            this.stateLabel.node.color = new cc.Color(180, 180, 180);
            this.stateLabel.string = "未中奖";
        } else if (stateInt == 3) {
            this.stateLabel.node.color = new cc.Color(180, 180, 180);
            this.stateLabel.string = "已取消";
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();