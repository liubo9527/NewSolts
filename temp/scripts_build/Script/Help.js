"use strict";
cc._RFpush(module, '74f944jT6xFkpNd4jx2VE0V', 'Help');
// Script/Help.js

"use strict";

var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack: cc.Node,
        testNode: cc.Node,
        scrollView: cc.Node,
        content: cc.Node,
        view: cc.Node,
        lock: false,
        gameNode: cc.Node,
        imgArray: [cc.Sprite]
    },

    // use this for initialization
    onLoad: function onLoad() {
        var size = cc.director.getWinSize();
        var ssss = size.width * 1660 / (1080 * size.height);
        this.node.scaleX = ssss;
        this.netData = NetData.NetData.getInst();
        this.lock = true;
        var oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;
        var callFunc_1 = cc.callFunc(function () {
            this.lock = false;
            var se = cc.director.getWinSize();
            this.scrollView.height = se.height * 0.8;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height;
            //console.log("ny=" + this.node.y);
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(0.1), callFunc_1));

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

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height)), call3));
        }
    },

    downHelp: function downHelp() {
        if (NetData.NetData.getInst().GameRule == null) {
            cc.log("GameRule is null ");
            return;
        }
        var self = this;
        var spt = this.gameNode.getComponent(Game);
        var rh = 0;
        var res = this.netData.GameRule.helpRule.rulePics;
        cc.loader.load(res, null, function (errors, results) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    console.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                }
            }
            cc.log("results is %% ", results.getContent.length);
            var len = self.netData.GameRule.helpRule.rulePics.length;

            for (var _i = 0; _i < len; _i++) {

                var aTex = results.getContent(self.netData.GameRule.helpRule.rulePics[_i]);
                console.log(self.netData.GameRule.helpRule.rulePics[_i] + "|" + aTex);
                var sf = new cc.SpriteFrame();
                sf.setTexture(aTex);
                self.imgArray[_i].node.active = true;
                self.imgArray[_i].spriteFrame = sf;
                //
                var width = self.imgArray[_i].node.width;
                var heightT = 1080 / width * self.imgArray[_i].node.height;
                self.imgArray[_i].node.setScale(1080 / width);
                rh += heightT;
                cc.log("height is $$$ ", self.imgArray[_i].node.height);
                //支持多张图排版（2017-03-27 pm：520）
                if (_i > 0) {

                    var index = _i - 1;
                    var ht = self.imgArray[index].node.height;
                    self.imgArray[_i].node.y = self.imgArray[index].node.y - ht + 1;
                    // cc.log("height is $$$ ", ht);
                }
            }

            // if(len == 2){
            //     let ht = self.imgArray[0].node.height;
            //     self.imgArray[1].node.y = -ht;
            // }
            self.content.height = rh;
            spt.hideWait();
            self.initHelp();
        });
    },

    initHelp: function initHelp() {
        if (!this.lock) {
            console.log("initHelp");
            this.netData.helpShowFlag = true;
            this.lock = true;
            this.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.p(0, 0), 0.1);
            var callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.oriY)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    }
});

cc._RFpop();