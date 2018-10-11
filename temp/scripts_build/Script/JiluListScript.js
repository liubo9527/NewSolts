"use strict";
cc._RFpush(module, '10c90r4USJN17MFsR0Fpzmn', 'JiluListScript');
// Script/JiluListScript.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");

cc.Class({
    extends: cc.Component,

    properties: {
        grayPrefab: {
            default: null,
            type: cc.Prefab
        },

        testNode: {
            default: null,
            type: cc.Node
        },
        noOrderNode: {
            default: null,
            type: cc.Node
        },
        goNode: {
            default: null,
            type: cc.Node
        },
        gameNode: cc.Node, //跳到淘宝网页用的
        uiBlack: cc.Node,
        scrollView: cc.Node,
        content: cc.Node,
        moreSprite: cc.Node,
        ziLineSprite: cc.Node,
        view: cc.Node,
        lock: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.netData = NetData.NetData.getInst();
        var size = cc.director.getWinSize();
        var ssss = size.width * 1660 / (1080 * size.height);
        this.node.scaleX = ssss;
        this.lock = true;
        var oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;
        //this.seVar = 0;

        this.purpleH = this.ziLineSprite.height / 2;
        //console.log("oriY=" + this.node.y + "|" + oriP1.y);        

        var callFunc_1 = cc.callFunc(function () {
            this.lock = false;
            var se = cc.director.getWinSize();

            //this.scrollView.height = se.height * 0.8;

            this.scrollH = se.height * 0.8;
            this.scrollView.height = this.scrollH;

            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height - this.purpleH;
            console.log("ny=" + this.node.y);
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(0.1), callFunc_1));
        /*
        var timeCallback = function (dt)
        {
            this.lock = false;
            var se = cc.director.getWinSize();
            //this.scrollView.height = se.height * 0.8;
            
            this.seVar = 0;
            if(se.height < 1660)
            {
                this.seVar = 1660 - se.height;
            }
            
            
            this.scrollH = (se.height + this.seVar) * 0.8;//se.height * 0.8 ;//* (se.width / 1080);
            this.scrollView.height = this.scrollH ;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height - this.purpleH;
            console.log("ny=" + this.node.y);
            console.log("nw=" + se.width);
            console.log("nH=" + se.height);
            
        }
        
        this.scheduleOnce(timeCallback, 0.1);
        */

        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
            this.close();
        }, this);

        //---------go------------
        //liting 2017-1-12
        this.goNode.on(cc.Node.EventType.TOUCH_START, function () {
            this.goNode.scale = 0.8;
        }, this);

        this.goNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.goNode.scale = 1;
            //cc.log("goNode TOUCH_END");
            this.close();
        }, this);

        this.goNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.goNode.scale = 1;
        }, this);

        //liting 2017-1-12 end
    },

    close: function close() {
        if (!this.lock) {

            this.uiBlack.active = false;

            var call3 = cc.callFunc(function () {
                this.netData.orderShowFlag = false;

                this.noOrderNode.active = false;
                this.ziLineSprite.active = false;
                this.scrollView.active = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height - this.purpleH)), call3));
        }
    },

    initDingdan: function initDingdan() {
        if (!this.lock) {
            console.log("initDingdan");
            this.lock = true;

            /*var se = cc.director.getWinSize();
            this.scrollView.height = se.height * 0.8;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height;*/
            cc.log("ny=" + this.node.y);

            this.netData.orderShowFlag = true;
            this.listItemH = 180;
            this.listItemDisY = 10;
            this.offsetChang = 100;
            this.contenCount = 14;
            this.initList();
            var callback = cc.callFunc(this.selectShowCallBack, this);
            cc.log("sy=" + this.scrollView.y);

            //出来动画有问题
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.oriY)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    },

    //中奖 数字 每条间距50 高100 则加高150
    initList: function initList() {
        var oLen = this.netData.GameListResult.length;
        //liting 2017-1-12
        if (oLen == 0) {
            //this.noOrderNode.y = this.scrollView.y;
            this.noOrderNode.active = true;
            this.ziLineSprite.active = false;
            this.scrollView.active = false;
            return;
        }

        this.ziLineSprite.active = true;
        this.scrollView.active = true;

        this.noOrderNode.active = false;
        //liting 2017-1-12 end

        this.moreSprite.parent = this.node;
        this.content.removeAllChildren(true);

        //-----------------------
        //计算scroll总长
        //-----------------------
        var jj_height = 0;

        //for(let j = 0 ; j < this.sceneList.length; j++)

        cc.log("oLen = " + oLen);

        for (var _i = 0; _i < oLen; _i++) {
            jj_height += this.listItemH + this.listItemDisY;
        }

        if (oLen > this.contenCount) {
            cc.log("abcdef");
            jj_height += 67;
            this.moreSprite.parent = this.content;
            this.moreSprite.active = true;
            this.moreSprite.y = -(jj_height - 24);
        } else {
            this.moreSprite.active = false;
        }

        //liting 2017-1-12
        var scrollH_var = this.scrollH;

        if (jj_height < this.scrollH) {
            scrollH_var = jj_height;
        }

        this.scrollView.height = scrollH_var;
        this.view.height = scrollH_var;
        this.content.y = scrollH_var;

        this.ziLineSprite.y = this.scrollView.height;

        //liting 2017-1-12 end

        this.content.height = jj_height;
        //-----------------------
        //排版
        //-----------------------
        var y = 0;

        for (var i = 0; i < oLen; ++i) {
            var item = cc.instantiate(this.grayPrefab);
            item.parent = this.content;

            item.x = 0;
            item.y = y;

            //赋值
            var itemInfo = this.netData.GameListResult[i];
            var turnOrder = item.getComponent('TurntableOrderScript');

            turnOrder.setOrderData(itemInfo.time, itemInfo.no, itemInfo.payAmount, itemInfo.bonusAmount, itemInfo.status, this.netData.currency);

            //计算下一个y值
            this.offsetChang = this.listItemH + this.listItemDisY;
            y -= this.offsetChang;
        }

        this.moreSprite.on(cc.Node.EventType.TOUCH_END, function (event) {
            //调到淘宝网页
            if (!CC_JSB) {
                if (window.aliLotteryCasinoSDK) {
                    var spt = this.gameNode.getComponent("game");

                    // if(!spt.exitJudge()){
                    var arr = DataOper.DataOper.getInst().gameToken.split("-");
                    var instanceId = arr[2];
                    window.aliLotteryCasinoSDK.redirectOrder(instanceId);
                    // }                    
                } else {
                    console.log("more game!");
                }
            }
        }, this);

        this.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.p(0, 0), 0.1);
    }
});

cc._RFpop();