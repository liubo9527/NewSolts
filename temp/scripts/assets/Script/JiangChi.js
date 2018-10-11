"use strict";
cc._RFpush(module, 'e0b95wN85hPEqrPaZ8wReoy', 'JiangChi');
// Script/JiangChi.js

"use strict";

var NetData = require("NetData");
var Common = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        firstNumber: {
            default: null,
            type: cc.Node
        },
        boomScreen: {
            default: null,
            type: cc.Node
        },
        spine: {
            default: null,
            type: cc.Node
        },
        poolOther: {
            default: null,
            type: cc.Node
        },
        detailLabelNode: {
            default: null,
            type: cc.Node
        },
        detailLabelTop: {
            default: null,
            type: cc.Label
        },
        detailLabelDown: {
            default: null,
            type: cc.Label
        },
        detailIndex: 0, //爆屏索引
        detailArray: [], //服务器给的字段
        detailArrayTop: [], //爆屏信息上部分字体
        detailArrayDown: [], //爆屏信息下部分字体

        flag: false, //已经打开奖池爆屏
        allActionHasFinished: false, //爆屏和奖池出现动画都播放完毕
        index: 0 },

    // use this for initialization
    onLoad: function onLoad() {},

    /*******爆屏 */
    startboomScreenAction: function startboomScreenAction() {
        this.boomScreen.active = true;
        this.poolOther.active = false;
        var moveTo = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut(3.0));
        var finish = cc.callFunc(this.playBoomScreen, this);
        var seq = cc.sequence(cc.delayTime(1), moveTo, finish);
        this.boomScreen.runAction(seq);
    },
    playBoomScreen: function playBoomScreen() {
        this.detailIndex++;
        this.spine.getComponent('sp.Skeleton').setAnimation(0, 'animation2', false);
        this.detailLabelTop.string = this.detailArrayTop[this.detailIndex - 1];
        this.detailLabelDown.string = this.detailArrayDown[this.detailIndex - 1];
        this.detailLabelNode.scale = 1;
        var scaleTo = cc.scaleTo(0.4, 1.5);
        var fadeOut = cc.fadeOut(0.4);
        var spawn = cc.spawn(scaleTo, fadeOut);
        var finish = cc.callFunc(this.nextplayBoomScreen, this);
        var actionArray = [];
        actionArray.push(cc.delayTime(0.08));
        actionArray.push(cc.fadeIn(0));
        actionArray.push(cc.delayTime(3));
        actionArray.push(spawn);
        actionArray.push(cc.delayTime(1));
        actionArray.push(finish);
        if (this.detailIndex == this.detailArray.length) {
            var boomFinish = cc.callFunc(this.boomScreenFinished, this);
            actionArray.push(boomFinish);
        }
        var seq = cc.sequence(actionArray);
        this.detailLabelNode.runAction(seq);
    },

    nextplayBoomScreen: function nextplayBoomScreen() {
        if (this.detailIndex < this.detailArray.length) {
            this.playBoomScreen();
        }
    },
    //BoomScreen 播放完毕
    boomScreenFinished: function boomScreenFinished() {
        var moveTo = cc.moveTo(0.5, cc.p(0, 276)).easing(cc.easeBounceIn(3.0));
        var finish = cc.callFunc(this.boomScreenMoveUpFinished, this);
        var seq = cc.sequence(moveTo, finish);
        this.boomScreen.runAction(seq);
    },
    //爆屏收回去了
    boomScreenMoveUpFinished: function boomScreenMoveUpFinished() {
        this.startPoolOtherAction();
    },

    /*******奖池奖 */
    startPoolOtherAction: function startPoolOtherAction() {
        this.boomScreen.active = false;
        this.poolOther.active = true;
        var moveTo = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut(3.0));
        var finish = cc.callFunc(this.poolNodeJumpFinish, this);
        var seq = cc.sequence(cc.delayTime(1), moveTo, finish);
        this.poolOther.runAction(seq);
    },
    //pool
    poolNodeJumpFinish: function poolNodeJumpFinish() {
        this.allActionHasFinished = true;
    },

    initData: function initData(count) {
        if (this.flag == false) {
            //爆屏只开启一次
            this.flag = true;
            var initResult = NetData.NetData.getInst().InitResult;
            this.detailArray = initResult.historyPool;
            if (this.detailArray.length > 0) {
                this.setDetailArrayString();
            } else {
                //直接播放奖池奖动画
                this.startPoolOtherAction();
            }
        }
        if (this.allActionHasFinished == true) {
            var theUnit = this.firstNumber.getComponent("number");
            theUnit.initData(count);
        }
    },
    //取得用户的昵称
    setDetailArrayString: function setDetailArrayString() {
        var self = this;
        this.index = 0;
        this.detailArrayDown = [];
        this.detailArrayTop = [];
        for (var i = 0; i < this.detailArray.length; i++) {
            var j = i;
            var downStrIndex = this.detailArray[j].indexOf("##");
            var downStr = this.detailArray[j].substring(downStrIndex + 2);
            this.detailArrayDown.push(downStr);
            //下部分
            var cutStr = this.detailArray[j].substring(downStrIndex, -downStrIndex);
            this.detailArrayTop.push(cutStr);
            var indexOne = cutStr.indexOf("$");
            var subString = cutStr.substring(indexOne + 1);
            var indexTwo = subString.indexOf("$");
            var uid = subString.substring(indexTwo, -indexTwo);
            Common.Common.getInst().getNick(j, uid, function (jj, nick) {
                //异步的
                var newId = "$" + uid + "$";
                var newstr = self.detailArrayTop[jj].replace(newId, nick);
                self.detailArrayTop[jj] = newstr;
                self.index++;
                if (self.index == self.detailArray.length) {
                    self.startboomScreenAction();
                }
            });
        }
    }

});

cc._RFpop();