
/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *            佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 */

var Unit = require("unit");
var NetData = require("NetData");
var GameData = require("GameData");
var DataOper = require("DataOper");
var SelectLine = require("SelectLine");
var cubeS = require("cube");
var PriceGroup = require("PriceGroup");
var  JiangChiScript = require("JiangChi");

var Init = require("Init");
var init = new Init();
init.init();

cc.Class({
    extends: cc.Component,

    properties: {
        pArray:[],
        unit1:{
            default: null,
            type:cc.Node
        },

        unit2:{
            default: null,
            type:cc.Node
        },

        unit3:{
            default: null,
            type:cc.Node
        },

        unit4:{
            default: null,
            type:cc.Node
        },

        unit5:{
            default: null,
            type:cc.Node
        },

        lineGraphic: {
            default: null,
            type: cc.Graphics
        },

        moreDevDia: {
            default: null,
            type: cc.Node
        },
        moreDevLabel: {
            default: null,
            type: cc.Label
        },
        moreDevBut: {
            default: null,
            type: cc.Node
        },

        waitLayer: {
            default: null,
            type: cc.Node
        },

        lightList: {
            default: [],
            type: [cc.Node]
        },

        rewardCubeList:{
            default: [],
            type: [cc.Node]
        },

        blackLayer: {
            default: null,
            type: cc.Node
        },

        blackLayer2: {
            default: null,
            type: cc.Node
        },

        whiteLayer: {
            default: null,
            type: cc.Node
        },

        toastNode: {
            default: null,
            type: cc.Node
        },

        recoverToastNode:{
            default: null,
            type: cc.Node
        },

        leftLabel: {
            default: null,
            type: cc.Label
        },
        betInfo:{
            default: null,
            type: cc.Label
        },
        poolNode: {
            default: null,
            type: cc.Node
        },

        centerNode:{
            default: null,
            type: cc.Node
        },

        poolRuleBt:{
            default: null,
            type: cc.Node
        },

        //auto confirm
        autoConfirm: {
            default: null,
            type: cc.Node
        },
        autoConLabel: {
            default: null,
            type: cc.Label
        },
        autoOk: {
            default: null,
            type: cc.Node
        },
        autoCancel: {
            default: null,
            type: cc.Node
        },
        autoLabel: {
            default: null,
            type: cc.Label
        },
        lightLayer:{
            default: null,
            type: cc.Node
        },
        freeModelLayer:{
            default: null,
            type: cc.Node
        },
        greatModelLayer:{
            default: null,
            type: cc.Node
        },
        freeModelLabel:{
            default: null,
            type: cc.Label
        },
        leftNotTouch:{
            default: null,
            type: cc.Node
        },

        errLayer: {
            default: null,
            type: cc.Node
        },
        errLabel: {
            default: null,
            type: cc.Label
        },
        buttonRetry: {
            default: null,
            type: cc.Node
        },
        buttonCancel: {
            default: null,
            type: cc.Node
        },

        rightNotTouch:{
            default: null,
            type: cc.Node
        },

        specialRewardNode:{
            default: null,
            type: cc.Node
        },

        specialRewardLabel:{
            default: null,
            type: cc.Label
        },

        rewardNode:{
            default: null,
            type: cc.Node
        },

        spineAniNode:{
            default: null,
            type: cc.Node
        },

        priceGroupNode:{
            default: null,
            type: cc.Node
        },  

        rewardLabel:{
            default: null,
            type: cc.Label
        },

        freeTitle: {
            default: null,
            type: cc.Node
        },
        cover:{
            default: null,
            type: cc.Node
        },
        helpNode:{
            default: null,
            type: cc.Node
        },
        orderNode:{
            default: null,
            type: cc.Node
        },
        marquee:{
            default: null,
            type: cc.Node
        },
        lineGroup:{
            default: [],
            type: [cc.Node]
        },
        selectLineList:{
            default: [],
            type: [cc.Node]
        },
        leftBt:{
            default: null,
            type: cc.Node
        },
        leftGray:{
            default: null,
            type: cc.Node
        },
        rightBt:{
            default: null,
            type: cc.Node
        },
        rightGray:{
            default: null,
            type: cc.Node
        },
        lineBt:{
            default: null,
            type: cc.Node
        },
        autoTimes:{
            default: null,
            type: cc.Label
        },
        lineGray:{
            default: null,
            type: cc.Node
        },
        freeGameTimeLabel:{
            default: null,
            type: cc.Label
        },
        wenhaoDia: {
            default: null,
            type: cc.Node
        },
        wenhaoBut: {
            default: null,
            type: cc.Node
        },
        stopLayer:{
            default: null,
            type: cc.Node
        },
        backLayer: {
            default: null,
            type: cc.Node
        },
        whiteNoTouchLayer: {
            default: null,
            type: cc.Node
        },
        backLabel: {
            default: null,
            type: cc.Label
        },
        backEnsure: {
            default: null,
            type: cc.Node
        },
        backCancel: {
            default: null,
            type: cc.Node
        },

        selectLine: {
            default: null,
            type: cc.Node
        },

        poolIcon: {
            default: null,
            type: cc.Sprite
        },
        //金币版的 toast
        toastLabel: {
            default: null,
            type: cc.Label
        },

        toastErr: {
            default: null,
            type: cc.Node
        },
        
        index:0,
        autoFlag: 0, //1:自动投注 
        autoLimit: 10, //自动要10次限制 
        autoIndex: 10, //自动当前号
        orderFlag:false,//默认可用请求，当true时 不可请求order
        markGetInitFlag:false,//一秒内不能调第二次初始化，为了解决初始化进来后同时走login 和 resume的login
        m_line:50,
        m_price:1,
        m_isQuickStopBt:false,
        m_gameModel:0,//0:普通模式  1:普通模式(快速开奖) 2:免费模式 3:大丰收 4奖池大奖
        state_gameing:false,//是否是游戏中
        frontList:[],
        lineList:[],
        errDialogTag: 0, //不同的错误处理; 0正常 2:恢复 
        lineIndex: 0, //中奖行数组序号
        m_greatGameHasFinishedOnePart:false,//大丰收第一轮是否完成
        m_freeLayerShowOnce:false,
        m_orderResult:null,
        m_freeStep:1,//免费游戏的次数
        dou:0,//累计获得的豆
        rightBet:0,//是否点了自动投注
        sdkUid: null,
        m_waitintCallBack:null,//等待框计时器
        sdkBalance: 0,//废弃
        markInitCnt:0,
        showWait:0,//showLayer次数
        isQuicklyEnd:false,//快速开奖
        markWaitHide:false,
        requestRewardTime:0,//结算请求次数
        ruleHasShowOnce:false,//规则已经展示过了
        isQuickPassFunction:false,//快速跳过开奖动画模式
        scaleValue:1,
        
        version: {
            default: null,
            type: cc.Label
        },
    },
    // use this for initialization
    setRewardCubePos:function(){
        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 5; i++){
                let index = j * 5 + i ;
                let posX = i * 200 - 400;
                let posY = 337.5 - j * 225;
                var cube = this.rewardCubeList[index];
                cube.x = posX;
                cube.y = posY;
                var light = this.lightList[index];
                light.x = posX;
                light.y = posY;
            }
        }
        //计算中奖线的坐标
        this.lineList = [];
        for(var i = 3; i >= 0; i--){
            for(var j = 0; j < 5; j++ ){
               var x = j * 200 - 400;
               var y = i * 225 - 337.5;
               var pos = cc.v2(x, y);
               this.lineList.push(pos);
            }
        }
        this.frontList = this.rewardCubeList;
    },

    onLoad: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }

        this.pArray = [];
        this.pArray.push(this.unit1);
        this.pArray.push(this.unit2);
        this.pArray.push(this.unit3);
        this.pArray.push(this.unit4);
        this.pArray.push(this.unit5);
        this.setRewardCubePos();

        //新适配
        var se = cc.director.getWinSize();
        var per = se.width / se.height;
        var dPer = 1080 / 1660;
        if(per < dPer){
            var sValue = per / dPer;
            var betArea = cc.find("Canvas/betArea");
            var centerArea = cc.find("Canvas/bgAndCenter");
            this.poolNode.scale = sValue;
            betArea.scale = sValue;
            centerArea.scale = sValue;
            this.scaleValue = sValue;
        }
        
        //test
        for(let i = 0; i < 5; i++){
            var dataArr = ["WW","WW","WW","WW"];
            var unitS =  this.pArray[i].getComponent(Unit);;
            unitS.setStopDataArray(dataArr, i+1,false);
        }


        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.moreDevBut.scale = 0.8;
        }, this);        
        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.moreDevBut.scale = 1;
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function(){
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.moreDevDia.runAction(cc.sequence(cc.scaleTo(0.2, 0, 0),call));
            if(this.errDialogTag == 1){//
                this.fresh();
            }
        }, this);

        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.moreDevBut.scale = 1;
        }, this);

        //奖池规则bt
        this.poolRuleBt.on(cc.Node.EventType.TOUCH_START, function (){
            this.poolRuleBt.scale = 0.8;
        }, this);        
        this.poolRuleBt.on(cc.Node.EventType.TOUCH_END, function (){
            this.poolRuleBt.scale = 1;
            // cc.log("单价对应奖池最高可获得金币规则说明");
            var node = cc.find("Canvas/poolRule");
            let s1 = node.getComponent("PoolRule");
            node.active = true;
            s1.downHelp();
        }, this);

        this.poolRuleBt.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.poolRuleBt.scale = 1;
        }, this);

        //auto confirm
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.autoOk.scale = 0.8;
        }, this);
        
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.autoOk.scale = 1;
            this.blackLayer.active = false;
            this.whiteNoTouchLayer.active = true;
            var callFunc_2 = cc.callFunc(function()
            {   
                this.whiteNoTouchLayer.active = false;
                this.autoCallback(null);
            }, this);
            this.autoConfirm.runAction(cc.sequence(cc.scaleTo(0.3, 0, 0), callFunc_2));
            
        }, this);
        
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.autoOk.scale = 1;
        }, this);

        ///
        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.autoCancel.scale = 0.8;
        }, this);
        
        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.blackLayer.active = false;
            this.autoConfirm.runAction(cc.scaleTo(0.3, 0, 0));
            this.autoCancel.scale = 1;
            this.orderFlag = false;
        }, this);
        
        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.autoCancel.scale = 1;
        }, this);
        //end auto 

        //wenhao        
        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.wenhaoBut.scale = 0.8;
        }, this);
        
        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.wenhaoBut.scale = 1;
            //this.wenhaoBut.runAction(cc.scaleTo(0.2, 0, 0));
            if (!CC_JSB){
                window.location.reload();
            }
        }, this);
        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.wenhaoBut.scale = 1;
        }, this);
        //end wenhao

        //错误框 retry
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.buttonRetry.scale = 0.8;
        }, this);
        
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.buttonRetry.scale = 1;
            let scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function(){
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2,call)); 
            
            //初始化不过， 退出或try
            if(this.cunCmd == 100){
                this.getInit();
            }
            else if(this.cunCmd == 101){
                this.getIsLogin();//
            }
            else if(this.cunCmd == 102){
                this.fresh();
            }
            else if(this.cunCmd == 103){
                this.getOrderList();
            }
            else if(this.cunCmd == 105){
                this.getRule();
            }  
        }, this);
        
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.buttonRetry.scale = 1;
        }, this);

        //取消
        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.buttonCancel.scale = 0.8;
        }, this);
        
        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.buttonCancel.scale = 1;
            let scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function(){
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2,call));
            this.blackLayer.active = false;
            //退出           
            this.exitGame();
        }, this);
        
        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.buttonCancel.scale = 1;
        }, this);
        //错误框 end

        //back ensure
        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.backEnsure.scale = 0.8;
        }, this);
        
        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.backEnsure.scale = 1;
            let scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function(){
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2,call));
            this.blackLayer.active = false;
            //退出游戏          
            this.exitGame();
        }, this);
        
        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.backEnsure.scale = 1;
        }, this);

        //取消
        this.backCancel.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.backCancel.scale = 0.8;
        }, this);
        
        this.backCancel.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.backCancel.scale = 1;
            let scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
            this.blackLayer.active = false;
            
        }, this);
        
        this.backCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.backCancel.scale = 1;
        }, this);
        //back end

        //this.scaleView();
        if (!CC_JSB && window.aliLotteryCasinoSDK){
            console.log("走淘宝了");  
            var initResult = NetData.NetData.getInst().InitResult;
            if(initResult != null){
                var status = initResult.status;
                this.initsuccess();
                //启动
                if(status === 0){//doNoting
                }else if(status === 1){//恢复
                    this.recoverGame();
                }else{
                    console.log("unknow status");
                }
            }else{
                console.log("停售了");
                this.blackLayer2.active = true;
                this.stopLayer.active = true;
                this.orderFlag = false;
                this.setSkin();
                this.stopLayer.getChildByName("words").getComponent("cc.Label").string = NetData.NetData.getInst().stopSellingDesc;
            }
            this.setTaobaoSDK();
        }
        else{
            //初始化接口
            if (!CC_JSB && window.__skinConfig){
                NetData.NetData.getInst().skin = window.__skinConfig;
            }
            this.getInit();
            console.log("没有走淘宝SDK");
        }
        
        if (!CC_JSB){
            if (window.aliLotteryCasinoSDK) {//活动
                window.aliLotteryCasinoSDK.throwTimer('initialize');
            }
        }
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS){
           this.version.string = "1.42 canvas";
        }
        else{
            this.version.string = "1.42 webgl";
        }
    },

    //
    rechargeToastJudge:function(){
        // //提示余额不足，跳转到充值 现在提示函谷那边处理 废弃
        // if(NetData.NetData.getInst().InitResult.currency  == "豆"){
        //     //doNoting
        // }else{
        //     this.toastErr.stopAllActions();
        //     let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        //     let scaleTo2 = cc.scaleTo(0.2, 0, 0);
        //     if(NetData.NetData.getInst().InitResult.currency  == "金币"){
        //         this.toastLabel.string = "淘金币不够了";
        //     }else{
        //         this.toastLabel.string = msg;
        //     }
        //     this.toastErr.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
        // }
    },

    setSkin:function(){
        //设置弹框字体颜色和跑马灯位置 by 服务器data
        cc.log("skinssssssss");
        var skin = NetData.NetData.getInst().skin;
        if(skin){  
            var fontColorArray = skin.fontColor;
            //网络提示弹框 配置颜色 根据不同皮肤
            if(fontColorArray != null){
                //网络提示
                this.errLabel.node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
                //自动十次确认弹框
                this.autoConLabel.node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
                this.autoConfirm.getChildByName("tips").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
                //确认离开游戏
                this.backLayer.getChildByName("words").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
                this.priceGroupNode.getComponent(PriceGroup).setLabelColor(); 
                //多设备登陆
                this.moreDevLabel.node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
                //停售
                this.stopLayer.getChildByName("words").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0],fontColorArray[1],fontColorArray[2]);
            }
        }
        //判断是否是有小贴士
        var InitResult = NetData.NetData.getInst().InitResult;
        if(InitResult){
            var tip = InitResult.tip;
            if(tip){
                //大奖tips
                var tipStr = InitResult.tip.content;
                var specialTips = this.specialRewardNode.getChildByName("tips");
                specialTips.active = true;
                specialTips.getChildByName("label").getComponent("cc.Label").string = tipStr;
                //普通将tips
                var normalTips = this.rewardNode.getChildByName("tips");
                normalTips.active = true;
                normalTips.getChildByName("label").getComponent("cc.Label").string = tipStr;
                //绑定小贴士去看看 的触摸事件 大奖button
                var specialTipsBt = specialTips.getChildByName("button");
                specialTipsBt.on(cc.Node.EventType.TOUCH_START, function (){
                    this.autoCancel.scale = 0.8;
                }, this);
                
                specialTipsBt.on(cc.Node.EventType.TOUCH_END, function (){
                    this.tipsJump();
                    this.autoCancel.scale = 1;
                }, this);
                
                specialTipsBt.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
                    this.autoCancel.scale = 1;
                }, this);
                //普通奖button
                var normalTipsBt = normalTips.getChildByName("button");
                normalTipsBt.on(cc.Node.EventType.TOUCH_START, function (){
                    this.autoCancel.scale = 0.8;
                }, this);
                
                normalTipsBt.on(cc.Node.EventType.TOUCH_END, function (){
                    this.tipsJump();
                    this.autoCancel.scale = 1;
                }, this);
                
                normalTipsBt.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
                    this.autoCancel.scale = 1;
                }, this);
            }
        }
    },

    //初始化成功之后
    initsuccess:function(){
        this.updatePoll(true);
        let poolResult = NetData.NetData.getInst().PoolResult;
        let poolVisiable = poolResult.poolVisiable;
        this.setPoolIcon();
        this.setSkin();
        if(poolVisiable == 1)
        {
             this.scheduleOnce(this.getPool, 2);
        }
        //跑马灯working
        this.openMarquee();
        this.setRecoverPriceAndLines();
    },
    //小贴士 跳转
    tipsJump:function(){
        cc.log("jump");
        var link = NetData.NetData.getInst().InitResult.tip.url;
        if (!CC_JSB){
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.pushWindow(link);
            }
        }
    },

    openMarquee:function(){
        //跑马灯位置及区域设置
        var skin = NetData.NetData.getInst().skin;
        if(skin){
            var broadCastPosAndWidth = skin.broadCastPosAndWidth;
            if(broadCastPosAndWidth != null){
                var content = this.marquee.getChildByName("content");
                content.setPosition(broadCastPosAndWidth[0],broadCastPosAndWidth[1]);
                content.width = broadCastPosAndWidth[2]; //width 裁剪区域大小
            }
        }
        var broadcaseCmp = this.marquee.getComponent("BroadCast");
        broadcaseCmp.active = true;
        broadcaseCmp.dataCallback();
    },

    //联网
    netCallback : function(cmd, res, msg, self){
        console.log("netCallback cmd=" + cmd + "\res=" + res + "\msg=" + msg);
        if(cmd != 104 ){
            self.hideWaitLayer();
        }
        if(res == 0)
        {   
            if(cmd != 104 ){
                self.markWaitHide = true;
                self.orderFlag = false;
            }
            switch(cmd)
            {
                case 100:
                {
                    var initResult= NetData.NetData.getInst().InitResult;
                    var status = initResult.status;
                    self.initsuccess();
                    //启动
                    if(status === 0){
                        //doNoting
                    }else if(status === 1){//恢复
                        self.recoverGame();
                    }else{
                        cc.log("unknow status");
                    }
                }
                break;
                case 101:
                {   
                    self.m_greatGameHasFinishedOnePart = false;//大丰收出现免费游戏免费游戏出现免费游戏
                    self.errDialogTag = 0;
                    // //正常游戏
                    self.setGameModelAndUnitData();
                    self.updateUserInfo();
                }
                break;
                case 102:
                {
                     //结算游戏
                    self.rewardGame();
                    self.errDialogTag = 0;
                    self.requestRewardTime = 0;
                    cc.log("结算游戏");
                    self.updateUserInfo();
                }
                break;
                case 103://订单列表
                {
                    var order = cc.find("Canvas/order");
                    var orderJs = order.getComponent("JiluListScript");
                    orderJs.initDingdan();
                }
                break;
                case 104://奖池更新
                {   
                    self.updatePoll();
                    self.unschedule(self.getPool);
                    self.scheduleOnce(self.getPool, 2);
                }
                break;
                case 105://规则
                {   
                    self.ruleHasShowOnce = true;
                    self.waitLayer.active = true;
                    let s1 = self.helpNode.getComponent("Help");
                    s1.downHelp();
                }
                break;
                default:
                break;
            }
        }
        else if(res == 200009){ //余额不足;
            if (!CC_JSB){
                if (window.aliLotteryCasinoSDK) {
                    window.aliLotteryCasinoSDK.recharge(true);
                }
            }
            self.rechargeToastJudge();
        }
        else if(res == 100007 || 200019 == res ){ //停售
            self.blackLayer2.active = true;
            self.stopLayer.active = true;
            self.orderFlag = false;
            self.stopLayer.getChildByName("words").getComponent("cc.Label").string = msg;
        }
        else if(res == 100035){ //账号在其他设备登陆 100014==100035
            self.blackLayer.active = true;
            self.errDialogTag = 1;
            self.moreDevLabel.string = msg;
            self.moreDevDia.runAction(cc.scaleTo(0.3, 1));
        }else{
            if(cmd == 104){//更新奖池不出现弹框提示
                self.unschedule(self.getPool);
                self.scheduleOnce(self.getPool, 2);
            }else if(cmd == 102){//结算2次后重新初始化
                self.cunCmd = cmd;
                self.requestRewardTime++;
                if(self.requestRewardTime == 1){
                    self.requestRewardTime = 0;
                    self.showErrorLayer(msg, true)
                }else{
                    self.getReward();
                }
            }else{
                self.cunCmd = cmd;
                self.showErrorLayer(msg, true);
                if(cmd == 105){
                    let s1 = self.helpNode.getComponent("Help");
                    s1.errorCallBack();
                }
                if(cmd == 103){
                    let s1 = self.orderNode.getComponent("JiluListScript");
                    s1.errorCallBack();
                }
            }
        }
    },

    //设置奖池说明图标
    setPoolIcon:function(){
        var iconUrl = NetData.NetData.getInst().InitResult.currencyIcon;
        var self = this;
        if(iconUrl != ""){
            //下载换图
            cc.loader.load(iconUrl, function (err, tex){
                if (err) {
                    console.log('Error url +'+err);
                }
                console.log("**奖池图片**",iconUrl+"|"+tex);
                if(tex){
                    let sf = new cc.SpriteFrame();
                    sf.setTexture(tex);
                    self.poolIcon.spriteFrame = sf;
                }
            });
        }
    },

    //错误提示 //flag:true:双按钮  false:单按钮,
    showErrorLayer:function(errMsg, flag)
    {   
        this.errLabel.string = errMsg;        
        this.blackLayer.active = true;
        this.errLayer.scale = 0;
        let scaleTo1 = cc.scaleTo(0.2, 1.2 * this.scaleValue);
        let scaleTo2 = cc.scaleTo(0.1, 1.0 * this.scaleValue);
        this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
    },

    //调奖池
    getPool:function(){
        this.unschedule(this.getPool);
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getPool (this.netCallback,this);
    },

    //更新奖池
    updatePoll:function(flag){
        let poolResult = NetData.NetData.getInst().PoolResult;
        let poolBouns = poolResult.poolBouns;
        let poolVisiable = poolResult.poolVisiable;
        if(poolVisiable == 1){
            this.poolNode.active = true;
            var poolScript = this.poolNode.getComponent(JiangChiScript);
            poolScript.initData(poolBouns);
        }else{
            this.poolNode.active = false;
        }        
    },

    getInit:function(){
        this.showWaitLayer();
        this.orderFlag = true;
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit (this.netCallback,this);
    },
    /**
     * 投注
     * @param gameType 游戏类型(0:普通游戏 1:免费游戏) int
     * @param ticketNo 订单(票)号。
     * @param step 当前免费游戏的次数。int
     * @param mulriple 投注倍数。
     * @param lineNum 投注线数。
     * @param playTime 游戏时间。
     */
    getBet:function(){
        this.showWaitLayer();
        this.orderFlag = true;
        var dataOper = DataOper.DataOper.getInst();
        if(this.m_gameModel == 2){//免费游戏
            var step = -1;
            var ticketNo = null;
            if(this.errDialogTag == 2){
                ticketNo = NetData.NetData.getInst().InitResult.recoverData.ticketNo;
            }else{
                ticketNo = NetData.NetData.getInst().BetResult.ticketNo;
            }
            dataOper.getBet (1,ticketNo,this.m_freeStep,this.m_price,this.m_line,NetData.NetData.getInst().InitResult.playTime,this.netCallback,this);
        }else{//其他
            dataOper.getBet (0,"",0,this.m_price,this.m_line,NetData.NetData.getInst().InitResult.playTime,this.netCallback,this);
        }
    },


    getOrderList:function(){
        var initResult = NetData.NetData.getInst().InitResult;
        if(initResult){
            this.orderFlag = true;
            this.showWaitLayer();
            var dataOper = DataOper.DataOper.getInst();
            dataOper.getGameList(this.netCallback, this);
        }
    },
      

    getRule:function(){
        this.orderFlag = true;
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getRule(this.netCallback, this);
    },

    /**
     * 结算
     * @param ticket_no 订单号
     * @param playTime 游戏时间
     */
    getReward:function(){
        this.orderFlag = true;
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        var ticket_no = "";
        if(this.errDialogTag == 2){//恢复数据结算
            ticket_no = NetData.NetData.getInst().InitResult.recoverData.ticketNo;
        }else{
            ticket_no = NetData.NetData.getInst().BetResult.ticketNo;
        }
        dataOper.getReward(ticket_no,NetData.NetData.getInst().InitResult.playTime,this.netCallback,this);
    },

    //游戏恢复
    recoverGame:function() {
        this.errDialogTag = 2;
        //设置回复数据的投注和倍数
        this.setRecoverPriceAndLines();
        //判断恢复游戏的类型
        this.leftSetClick(true);
        this.rightSetClick(true);
        this.betSetClick(true);
        var recoverData = NetData.NetData.getInst().InitResult.recoverData;//recoverType 0:普通游戏1,特殊游戏，2：奖池 3:免费游戏 32免费游戏中有奖池奖
        var recoverType = recoverData.recoverType;
        if(recoverType == 0){
            this.m_gameModel = 0;
        }else if(recoverType == 1){
            this.m_gameModel = 3;
            if((recoverData.step == recoverData.freeGameTotalTimes)&& (recoverData.step > 0 )){
                this.m_gameModel = 0;
            }
        }else if(recoverType == 2){
            this.m_gameModel = 4;
        }else if(recoverType == 3){
            this.m_gameModel = 2;//
            this.m_freeStep = recoverData.step;
            this.m_freeStep++;
            this.freeGameModel();
        }else if(recoverType == 32){
            this.m_freeStep = recoverData.step;
            this.m_freeStep++;
            this.freeGameModel();
            this.m_gameModel = 4;
        }else{
            cc.log("恢复类型出错");
        }
        let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        let scaleTo2 = cc.scaleTo(0.2, 0, 0);
        this.recoverToastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
        this.scheduleOnce(this.recoverNextStep, 1.2);
    },

    recoverNextStep:function(){
        if(this.errDialogTag == 2){ //恢复
            this.setRecoverGameModelAndUnitData()
        }
    },

    //自动游戏
    autoCallback: function(event){
        if(this.autoFlag == 0){
            this.rightBet = true;
            this.getIsLogin();
            //this.getBet();

        }else{
            this.autoFlag = 0;
            this.rightBet = false;
            this.autoIndex = this.autoLimit;
            this.autoLabel.string = "自动";
            this.autoTimes.node.active = false;
            this.rightSetClick(true);
        }

    },
    hideWait:function(){
        this.waitLayer.active = false;
    },

    showWaitBlackLayer:function(){
        this.blackLayer.active = true;
        this.waitLayer.active = true;
    },

    showWaitLayer: function(){
        this.markWaitHide = false;
        this.whiteLayer.active = true;
        var self = this;
        this.m_waitintCallBack = function (dt) {
            if(!self.markWaitHide)
            {
                self.showWaitBlackLayer();
            }
            else
            {
               self.hideWaitLayer();
            }
        }
        this.scheduleOnce(this.m_waitintCallBack, 1);
    },

    hideWaitLayer: function(flag){
        this.waitLayer.active = false;
        this.blackLayer.active = false;
        this.whiteLayer.active = false;
        this.unschedule(this.m_waitintCallBack);
    },

    btnActionCallBack:function(selectType){
        if(selectType == 1){
            if(this.isQuickPassFunction == true){
                this.isQuicklyEnd = true;
                this.leftSetClick(true);
            }else{
                 if(this.m_isQuickStopBt == true){
                    this.leftSetClick(true);
                    this.quickStop();
                }else{
                    this.getIsLogin();
                    //this.getBet();
                }
            }
        }else if(selectType == 2){
            //直接判断是否登录和是否余额够
            //判断是否登录
            var self = this;
            if(!CC_JSB){
                var sdk = window.aliLotteryCasinoSDK;
                if(sdk){
                    //判断是否登录
                    sdk.isLogin(function(isLogin){
                        if(!isLogin)//没登录去登录
                        {
                            console.log("自动 没有登陆");
                            self.goLogin();
                        }
                        else//登录了 判断是否获取豆成功
                        {
                            //在判断是否足额（淘宝相关） 
                            var flag = self.judgeBalance();
                            if(flag == true){
                                self.goAutoBet();
                            }

                        }
                    });
                }else{
                    this.goAutoBet();
                }
            }else{
                this.goAutoBet();
            }
        }
    },

    //goBet
    goAutoBet:function(){
        if(this.autoFlag == 0){
            this.blackLayer.active = true;
            this.orderFlag = true;
            //是否自动开启10次丛林冒险，每局投***豆（可提前结束）？
            this.autoConLabel.string = "每局投" + (this.m_line * this.m_price) +NetData.NetData.getInst().InitResult.currency+"(可提前结束)";
            this.autoConfirm.runAction(cc.scaleTo(0.3, this.scaleValue));
        }else{
            this.autoCallback();
        }
    },

    lineChangeBet:function(toggle, mes){
        this.m_line = mes;
        this.changeSelectLineAction(mes);
        this.updateBeTInfo();
    },

    changeSelectLineAction:function(mes){
        for(let j = 0; j <  NetData.NetData.getInst().InitResult.lineNums.length; j++){
            this.selectLineList[j].stopAllActions();
            this.selectLineList[j].active = false;
            var line = NetData.NetData.getInst().InitResult.lineNums[j];
            if(mes == line){
                this.selectLineList[j].active = true;
                this.selectLineList[j].opacity = 255;
                let action = cc.fadeOut(1.0);
                this.selectLineList[j].runAction(cc.sequence(cc.delayTime(2),action));
            }
        }
    },

    priceChangeBet:function(index){
        this.m_price = NetData.NetData.getInst().InitResult.mulriples[index];
        this.updateBeTInfo();
    },

    updateBeTInfo:function(){
       var total = this.m_line * this.m_price;
       this.betInfo.node.active = true;
       this.betInfo.string = "每局投: " + total+ NetData.NetData.getInst().InitResult.currency;
    },

    //设置中奖层地块
    setRewardCube:function(ticketsArray){
        for(var i = 0; i < ticketsArray.length; i++){ 
            var str = ticketsArray[i];
            var cube = this.rewardCubeList[i];
            var cubeScript = cube.getComponent(cubeS);
            cubeScript.setCube(str);
            cube.active = false;
        }
    },
    //游戏恢复数据设置
    setRecoverGameModelAndUnitData:function(){
        var netData = NetData.NetData.getInst();
        var ticketsArray = netData.InitResult.recoverData.ticketData[0];
        for(var i = 0; i < 5; i++){ 
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for(var j = 3; j>=0; j--){
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            let flag = false;
            if(this.m_gameModel == 3){
                flag = true;
            }
            unitS.setStopDataArray(dataArray, i+1,flag);
        }
        this.setRewardCube(ticketsArray);
        this.scheduleOnce(this.startRound, 0.01);
    },
    //setRecoverPriceAndLines
    setRecoverPriceAndLines:function(){
        this.priceGroupNode.getComponent(PriceGroup).setLabelColor();
        var InitResult = NetData.NetData.getInst().InitResult;
        var mulriple = InitResult.defaultMulriple;
        var lineNum = InitResult.defaultLineNum;
        //免费游戏由于缓存问题 从recoverData里面取值
        if(InitResult.recoverData){
            mulriple = InitResult.recoverData.mulriple;
            lineNum = InitResult.recoverData.lineNum;
        }
        //if(InitResult.)
        this.m_line = lineNum;
        this.m_price = mulriple;
        var mulripleToggleIndex = 0;
        var lineToggleIndex = 0;
        for(let i = 0; i < NetData.NetData.getInst().InitResult.mulriples.length; i++){
            var mu = NetData.NetData.getInst().InitResult.mulriples[i];
            if(mulriple == mu){
                this.priceGroupNode.getComponent(PriceGroup).clickOneToggle(i);
            }
           
        }
        for(let j = 0; j <  NetData.NetData.getInst().InitResult.lineNums.length; j++){
            var line = NetData.NetData.getInst().InitResult.lineNums[j];
            var flag = false;
            if(lineNum == line){
                flag = true;
            }
            this.lineGroup[j].getComponent(cc.Toggle).isChecked = flag;
        }
        var selectLine = this.selectLine.getComponent(SelectLine);;
        selectLine.lineChange("",this.m_line);
        this.updateBeTInfo();
    },

    //投注过来的正常游戏
    setGameModelAndUnitData:function(){
        if(this.rightBet == true){
            this.autoFlag = 1;
            this.autoTimes.node.active = true;
            let leftTimes = this.autoLimit - this.autoIndex + 1;
            this.autoTimes.string = "第"+leftTimes+"次";
            this.autoLabel.string = "取消自动";
        }   
        var netData = NetData.NetData.getInst();
        //判断游戏模式
        if(this.m_gameModel == 2){//免费游戏
            this.m_freeStep++;
            if(netData.BetResult.resultType == 2){
                this.m_gameModel = 4;//奖池大奖
            }
        }else{
            if(netData.BetResult.resultType == 1){
                //大丰收
                this.m_gameModel = 3;
            }else if(netData.BetResult.resultType == 2){
                this.m_gameModel = 4;//奖池大奖
            }else{
                 //普通游戏
                this.m_gameModel = 0;
            }
        }
        var ticketsArray = netData.BetResult.ticketData[0];
        for(var i = 0; i < 5; i++){
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for(var j = 3; j>=0; j--){
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            let flag = false;
            if(this.m_gameModel == 3){
                flag = true;
            }
            unitS.setStopDataArray(dataArray, i+1,flag);
        }
        this.setRewardCube(ticketsArray);
        this.scheduleOnce(this.startRound, 0.01);
    },

     //免费游戏
    freeGameModel:function(){
        this.m_gameModel = 2;
        for(let i = 0; i < this.pArray.length; i++){
           let unit = this.pArray[i];
           unit.active = true;
        }
        this.betSetClick(true);
        if(this.m_freeLayerShowOnce == false){
            this.m_freeLayerShowOnce = true;
            this.freeTitle.setPosition(0,1050);
            this.freeTitle.active = true;
            this.freeTitle.runAction(cc.moveTo(0.6, cc.p(0, 589)));
        }else{
        }
        var freeGameLeftTimes = 0;
        if(this.errDialogTag == 2){
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        }else{
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes
        }
        this.freeGameTimeLabel.string = "" + freeGameLeftTimes + "次";
        this.lineGraphic.clear();
        this.m_isQuickStopBt = false;
        this.leftSetClick(true);
        this.rightSetClick(true);
        // if(this.autoFlag == 1){
        //     this.rightBet = false;
        //     this.autoCallback();
        // }
    },

    //大丰收
    setGreatGameModelAndUnitData:function(){
        //上局游戏的统配图案保留
        var specialArray = null;
        var ticketsArray = null;
        if(this.errDialogTag == 2){//恢复
            specialArray = NetData.NetData.getInst().InitResult.recoverData.specialResultLocation;
            ticketsArray = NetData.NetData.getInst().InitResult.recoverData.ticketData[1];
        }else{
            specialArray = NetData.NetData.getInst().BetResult.specialResultLocation;
            ticketsArray = NetData.NetData.getInst().BetResult.ticketData[1];
        }
        this.setRewardCube(ticketsArray);
        for(let i = 0; i < this.pArray.length; i++){
           let unit = this.pArray[i];
           unit.active = true;
        }
        for(let i = 0; i < specialArray.length; i++){
            let index = specialArray[i];
            this.rewardCubeList[index].active = true;
            this.rewardCubeList[index].getComponent(cubeS).playAni();
        }
        this.m_gameModel = 0;
        for(var i = 0; i < 5; i++){
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for(var j = 3; j>=0; j--){
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            unitS.setStopDataArray(dataArray, i+1);
        }
        this.scheduleOnce(this.startRound, 0.01);
    },

    leftSetCanClick:function(){
        this.leftNotTouch.active = false;
        this.leftBt.active = true;
        this.leftGray.active = false;
    },

    startRound:function(){
        this.isQuicklyEnd = false;
        this.isQuickPassFunction = false;
        this.state_gameing = true;
        this.betSetClick(true);
        var selectLine = this.selectLine.getComponent(SelectLine);;
        selectLine.lineChange("",this.m_line);
        if(this.autoFlag == 1){
            this.rightSetClick(false);
            this.leftSetClick(true);
        }else{
            this.rightSetClick(true);
            this.leftSetClick(true);
            //已经取消快速停止滚动效果
            // this.leftLabel.string = "快速停止";
            // this.m_isQuickStopBt = true;
            // this.scheduleOnce(this.leftSetCanClick,0.7);
        }
        this.initMoney();
        this.index = 0;
        for(var i = 0; i < 5; i++){
             var unitS = this.pArray[i].getComponent(Unit);
             unitS.startRound();
        }
        this.scheduleOnce(this.normalStop, 1.2);
    },

    quickStop:function(){
        this.unschedule(this.normalStop);
        this.unschedule(this.timeCallback);
        if(this.m_gameModel == 0){
            this.m_gameModel = 1;
        }
        this.scheduleOnce(this.quickDelay, 0.01);
    },
    quickDelay:function(){
        for(var i = 0; i < 5; i++){
             var unitS = this.pArray[i].getComponent(Unit);
             unitS.stopRound();
        }
    },

    normalStop:function(){
        this.schedule(this.timeCallback, 0.3);
    },

    timeCallback:function (dt) {
        var unitS = this.pArray[this.index].getComponent(Unit);
        unitS.stopRound();
        this.index++;
        if(this.index == 5){
            this.unschedule(this.timeCallback);               
        }
     },

    //滚动完毕之后中奖画线
    roundEnded:function() {
        //左右都不能点
        this.rightSetClick(true);
        this.leftSetClick(true);
        this.lineIndex = 0;
        if(this.errDialogTag == 2){
            this.m_orderResult = NetData.NetData.getInst().InitResult.recoverData.orderResult[0];
            if(this.m_greatGameHasFinishedOnePart == true){
                this.m_orderResult = NetData.NetData.getInst().InitResult.recoverData.orderResult[1];
            }
        }else{
            this.m_orderResult = NetData.NetData.getInst().BetResult.orderResult[0];
            if(this.m_greatGameHasFinishedOnePart == true){
                this.m_orderResult = NetData.NetData.getInst().BetResult.orderResult[1];
            }
        }
        if(this.m_gameModel == 3){//大丰收延迟2秒
             let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
             let scaleTo2 = cc.scaleTo(0.2, 0, 0);
             this.greatModelLayer.runAction(cc.sequence(scaleTo1,cc.delayTime(2),scaleTo2));
             this.scheduleOnce(this.delayGreatModel, 2.5);
        }else{
             this.updataFrontList();
             if(this.isQuicklyEnd == true){
                 this.setMoney();
                 this.judgeFreeAndGreatGame();
                 this.isQuicklyEnd = false;
             }else{
                 this.showReward();
             }
        }
    },

    delayGreatModel:function(){
        this.updataFrontList();
        if(this.isQuicklyEnd == true){
            this.setMoney();
            this.judgeFreeAndGreatGame();
            this.isQuicklyEnd = false;
            this.betInfo.node.active = false;
        }else{
            this.showReward();
        }
    },

    //变换实际滚动层和中奖层
    updataFrontList:function(){
        for(let i = 0; i < this.pArray.length; i++){
            let unit = this.pArray[i];
            unit.getComponent(Unit).hiddleCube();
            unit.active = false;
        }
        for(let i = 0; i < this.rewardCubeList.length; i++){
            let rewardCube = this.rewardCubeList[i];
            rewardCube.active = true;
            rewardCube.getComponent(cubeS).stopAni();
        }
     },

    //中奖画线
    drawLine:function(){
        var array = this.m_orderResult[this.lineIndex].locations;
        var ctx = this.lineGraphic;
        ctx.clear();
        ctx.moveTo(this.lineList[array[0]].x, this.lineList[array[0]].y);

        for(let i = 1 ; i < array.length; i++){
            ctx.lineTo(this.lineList[array[i]].x, this.lineList[array[i]].y);
        }
        ctx.stroke();
    },

    initMoney:function(){
        var freeGameLeftTimes = 0;
        if(this.errDialogTag == 2){
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        }else{
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes
        }
        if(freeGameLeftTimes > 0 ||(freeGameLeftTimes == 0 && this.m_freeStep > 1)){
            if(this.errDialogTag == 2){//恢复模式
                 this.dou = NetData.NetData.getInst().InitResult.recoverData.bonusAmount;
            }
        }else{
            if(this.m_greatGameHasFinishedOnePart == true){
            }else{
                this.dou = 0;
            }
            if(this.errDialogTag == 2){//恢复数据结算
                if(NetData.NetData.getInst().InitResult.recoverData.recoverType == 32){
                    this.dou = NetData.NetData.getInst().InitResult.recoverData.bonusAmount;
                }
            }
        }
        if(this.dou > 0){
            this.betInfo.node.active = true;
        }else{
            this.betInfo.node.active = false;
        }
        this.betInfo.string = "累计中奖"+ this.dou + NetData.NetData.getInst().InitResult.currency;
    },
    addMoney:function(){
        this.dou += this.m_orderResult[this.lineIndex].amount;
        if(this.dou > 0 ){
            this.betInfo.node.active = true;
            this.betInfo.string = "累计中奖"+ this.dou +  NetData.NetData.getInst().InitResult.currency;
        }
    },

    showReward: function(sender){
        //缺失全屏大奖的判断
        if(this.m_gameModel == 4){
            let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.greatModelLayer.runAction(cc.sequence(scaleTo1,cc.delayTime(2),scaleTo2));
            this.scheduleOnce(this.judgeFreeAndGreatGame, 2.5);
        }else{
            let num = this.m_orderResult.length;
            //中奖
            if(num > 0){
                //打开快速跳过动画功能 非自动游戏
                if(this.autoFlag == 0){
                    this.leftLabel.string = "快速停止";
                    this.isQuickPassFunction = true;
                    this.leftSetClick(false);
                }
                this.cover.active = true;
                this.cover.zIndex = 18;
                this.lightLayer.zIndex = 19;
                this.drawLine();        
                let array = this.m_orderResult[this.lineIndex].locations;
                let len = this.m_orderResult[this.lineIndex].num;//中奖连线动物个数
    
                let span = 0.05;//0.04545;
                let dy1 = span * 6;  
                let sc1 = span * 8;
                let dyT = 0;
                let max = 0;

                for(let i = 0; i < len; i++){
                    let col = array[i] % 5;

                    switch(col){
                        case 0://第一排
                        {                    
                        }
                        break;
                        case 1:{
                            if(max < 1){
                                max = 1;
                                dyT = dy1 + sc1;
                            }                    
                        }
                        break;
                        case 2:{
                            if(max < 2){
                                max = 2;
                                dyT = dy1 * 2 + sc1;
                            }
                        }
                        break;
                        case 3:{
                            if(max < 3){
                                max = 3;
                                dyT = dy1 * 3 + sc1;
                            }
                        }
                        break;
                        case 4:{
                            if(max < 4){
                                max = 4;
                                dyT = dy1 * 4 + sc1;
                            }                    
                        }
                        break;
                        default:
                        break;
                    }
                }            

                for(let i = 0; i < len; i++){
                    let pa = this.frontList[array[i]];
                    pa.zIndex = 20;
                    let lt = this.lightList[array[i]];
                    lt.active = true;
                    let scale1 = cc.sequence(cc.scaleTo(span, 0.875), cc.scaleTo(span * 3, 1.46).easing(cc.easeExponentialOut()), cc.scaleTo(span * 2, 1.24), cc.scaleTo(span, 1.35), cc.scaleTo(span, 1.1));
                    let scale2 = cc.sequence(cc.scaleTo(span, 0.875), cc.scaleTo(span * 3, 1.46).easing(cc.easeExponentialOut()), cc.scaleTo(span * 2, 1.24), cc.scaleTo(span, 1.35), cc.scaleTo(span, 1.1));
                    let col = array[i] % 5;

                    switch(col){
                        case 0://第一排
                        {                    
                            pa.runAction(scale1);
                            lt.runAction(scale2);
                        }
                        break;
                        case 1:{
                            pa.runAction(cc.sequence(cc.delayTime(dy1), scale1));
                            lt.runAction(cc.sequence(cc.delayTime(dy1), scale2));
                        }
                        break;
                        case 2:{
                            pa.runAction(cc.sequence(cc.delayTime(dy1 * 2), scale1));
                            lt.runAction(cc.sequence(cc.delayTime(dy1 * 2), scale2));
                        }
                        break;
                        case 3:{
                            pa.runAction(cc.sequence(cc.delayTime(dy1 * 3), scale1));
                            lt.runAction(cc.sequence(cc.delayTime(dy1 * 3), scale2));
                        }
                        break;
                        case 4:{
                            pa.runAction(cc.sequence(cc.delayTime(dy1 * 4), scale1));
                            lt.runAction(cc.sequence(cc.delayTime(dy1 * 4), scale2));
                        }
                        break;
                        default:
                        break;
                    }
                }

                this.scheduleOnce(this.showlightList, dyT);
            }
            else{
                this.judgeFreeAndGreatGame();
            }
        }
    },

    showlightList: function(){
        //加钱
        this.addMoney();    
        let span = 0.045 * 5;
        this.scheduleOnce(this.reset, span * 6);
    },

    doNextThing: function() {
        this.showReward();
    },

    //结算游戏
    rewardGame:function() {
        let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        let scaleTo2 = cc.scaleTo(0.2, 0, 0);
        var amount =  NetData.NetData.getInst().RewardResult.bonusAmount;
        if(amount == 0){
            //新修改 未中奖不再显示 未中奖提示
            //this.toastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
            this.scheduleOnce(this.resetGame, 2);
        }else{
            if(this.m_gameModel == 4){
                var scale11 = cc.scaleTo(0.2, this.scaleValue);
                this.specialRewardLabel.string = "中"+amount+ NetData.NetData.getInst().InitResult.currency;
                this.specialRewardNode.runAction(cc.sequence(scale11, cc.delayTime(2), scaleTo2));
                this.scheduleOnce(this.resetGame, 2);
            }else{
                this.rewardLabel.string = "中"+amount+ NetData.NetData.getInst().InitResult.currency;
                this.rewardNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
                this.scheduleOnce(this.resetGame, 2);
            }
            
            this.spineAniNode.active = true;
            this.spineAniNode.getComponent('WinAni').aniStart();
            this.scheduleOnce(this.stopSpineAni, 3.5);
        }
        if (!CC_JSB){
            if (window.aliLotteryCasinoSDK) {//活动
                window.aliLotteryCasinoSDK.throwTimer('roundComplete');
            }
        }
    },
    //动画
    stopSpineAni:function(){
         this.spineAniNode.active = false;
    },
     //单个动画之后重置
    reset:function(){
        let array = this.m_orderResult[this.lineIndex].locations;
        let len = array.length;
        for(let i = 0; i < len; i++){
            let lt = this.lightList[array[i]];
            lt.active = false;
            let pa = this.frontList[array[i]];
            pa.setScale(1);
            pa.zIndex = 0;
        }
        this.cover.zIndex = 1;
        this.cover.active = false;
        this.lineGraphic.clear();        
        ++this.lineIndex;
        len = this.m_orderResult.length;
        if(this.isQuicklyEnd == true){
            this.setMoney();//累计中豆加上
            this.lineIndex = len;
            this.isQuicklyEnd = false;
        }
        if(this.lineIndex < len){
            this.doNextThing(); 
        }
        else {//最后判断有没有免费游戏和大丰收
            this.isQuicklyEnd = false;
            this.judgeFreeAndGreatGame();
        }
    },

    setMoney:function(){
        let len = this.m_orderResult.length;
        for(var i = this.lineIndex; i < len; i++){
            this.dou += this.m_orderResult[i].amount;
        }
        if(this.dou > 0 ){
            this.betInfo.node.active = true;
            this.betInfo.string = "累计中奖"+ this.dou + NetData.NetData.getInst().InitResult.currency;
        }
    },

    judgeFreeAndGreatGame:function(){
        //....判断本轮中是否有免费游戏
        var freeGameLeftTimes = 0;
        if(this.errDialogTag == 2){
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        }else{
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes
        }
        //判断大丰收是否结束 变成普通游戏判断 0 1 2
        if(this.m_greatGameHasFinishedOnePart == true){
            this.m_gameModel = 0;
        }
        //首先判断大丰收 大丰收优先级最高
        if(this.m_gameModel == 3){
            this.m_greatGameHasFinishedOnePart = true;
            //大丰收下一轮
            this.setGreatGameModelAndUnitData();
        }else{//普通游戏 0 1 2
            if(freeGameLeftTimes > 0){
                //判断免费游戏中是否有奖池奖
                if(this.m_gameModel == 4){
                    //加钱
                    this.dou += this.m_orderResult[0].amount;
                    this.betInfo.string = "累计中奖"+ this.dou +  NetData.NetData.getInst().InitResult.currency;
                    //提示中多少钱
                    let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
                    let scaleTo2 = cc.scaleTo(0.2, 0, 0);
                    this.specialRewardLabel.string = "中"+this.m_orderResult[0].amount+ NetData.NetData.getInst().InitResult.currency;
                    this.specialRewardNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
                }
                //弹出提示框 免费游戏
                this.showFreeModelLayer();
            }else{
                //如果有大丰收 停止大丰收特殊动画
                for(let i = 0; i < this.rewardCubeList.length; i++){
                    this.rewardCubeList[i].getComponent(cubeS).stopAni();
                }
                //调结算
                this.getReward();
            } 
        }  
    },

    showFreeModelLayer:function(){
        if(this.m_freeLayerShowOnce == false){
            var freeGameLeftTimes = 0;
            if(this.errDialogTag == 2){
                freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
            }else{
                freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes;
            }
            this.freeModelLabel.string = "" + freeGameLeftTimes + "次";
            let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.freeModelLayer.runAction(cc.sequence(scaleTo1,cc.delayTime(2),scaleTo2));
            this.shakeEgg();
            this.scheduleOnce(this.freeGameModelDelay, 2.5);
        }else{
            var eggArray = null;
            if(this.errDialogTag == 2){
                eggArray = NetData.NetData.getInst().InitResult.recoverData.freeResult[0];
            }else{
                eggArray = NetData.NetData.getInst().BetResult.freeResult[0];
            }
            if(eggArray != null){
                this.shakeEgg();
                this.scheduleOnce(this.freeGameModelDelay, 2);   
            }else{
                this.scheduleOnce(this.freeGameModelDelay, 0.01);   
            }
             
        }
    },

    shakeEgg:function(){
        var eggArray = null;
        if(this.errDialogTag == 2){
            eggArray = NetData.NetData.getInst().InitResult.recoverData.freeResult[0];
        }else{
            eggArray = NetData.NetData.getInst().BetResult.freeResult[0];
        }
        if(eggArray != null){
            for(let i = 0; i < eggArray.locations.length; i++){
                let index = eggArray.locations[i];
                var rewardCube = this.frontList[index];
                rewardCube.getComponent(cubeS).shakeEgg();
                this.scheduleOnce(this.freeGameModelDelay, 2);
            }
        }
    },

    freeGameModelDelay:function(){
        this.freeGameModel();
        this.getIsLogin();
    },

    //下轮游戏初始化
    resetGame:function() {
        //中间画线层active false
        for(var i = 0; i < this.rewardCubeList.length; i++){ 
            var cube = this.rewardCubeList[i];
            cube.active = false;
        }
        //滚动cube层显示
        for(let i = 0; i < this.pArray.length; i++){
            let unit = this.pArray[i];
            unit.active = true;
        }
        this.dou = 0;
        this.state_gameing = false;
        this.m_greatGameHasFinishedOnePart = false;
        this.m_freeLayerShowOnce = false;
        this.m_freeStep = 1;
        this.m_gameModel = 0;
        this.rightBet = false;
        this.lineGraphic.clear();
        this.freeTitle.active = false;
        if(this.autoFlag == 1){//自动游戏模式
            this.rightSetClick(false);
            this.autoIndex--;
            this.autoTimes.node.active = true;
            let leftTimes = this.autoLimit - this.autoIndex + 1;
            this.autoTimes.string = "第"+leftTimes+"次";
            if(this.autoIndex == 0){
                this.autoCallback();
                this.isQuickPassFunction = false;
                this.leftLabel.string = "玩1次";     
                this.betSetClick(false);
                this.m_isQuickStopBt = false;
                this.rightSetClick(false);
                this.leftSetClick(false);
                this.updateBeTInfo();
            }else{
                this.getIsLogin();
            }
        }else{
            this.isQuickPassFunction = false;
            this.leftLabel.string = "玩1次";     
            this.betSetClick(false);
            this.m_isQuickStopBt = false;
            this.rightSetClick(false);
            this.leftSetClick(false);
            this.updateBeTInfo();
        }       
    },

    //true 不能点击
    rightSetClick:function(flag){
        this.rightNotTouch.active = flag;
        this.rightBt.active = !flag;
        this.rightGray.active = flag;
    },

    leftSetClick:function(flag){
        this.leftNotTouch.active = flag;
        this.leftBt.active = !flag;
        this.leftGray.active = flag;
    },
    //投注区域不能点
    betSetClick:function(flag){
        var betNotTouch = cc.find("Canvas/betArea/betNotTouch");
        betNotTouch.active = flag;
        this.lineBt.active = !flag;
        this.lineGray.active = flag;
        this.priceGroupNode.getComponent(PriceGroup).betPriceSetEnable(flag);
    },

    //更新用户余额信息
    updateUserInfo:function(){
        if (!CC_JSB){
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.updateUserInfo();
            }
        }
    },

    openControl:function(){ 
        // let s1 = this.orderNode.getComponent("JiluListScript");
        // let s2 = this.helpNode.getComponent("Help");
        // if(s1.hasOpen == true){
        //     s1.close(null, 2);
        // }
        // if(s2.hasOpen == true){
        //     s2.close(null, 2);
        // }//规则出来了点不了奖池奖
        var node = cc.find("Canvas/poolRule");
        let s3 = node.getComponent("PoolRule");
        if(s3.hasOpen == true){
            s3.close();
        }
    },

    /****************淘宝相关****************/
      //余额判断
    judgeBalance: function(){
        let fg = true;

        if(NetData.NetData.getInst().balance == -1){
            // this.blackLayer.active = true;
            // this.wenhaoDia.runAction(cc.scaleTo(0.2, 1.0, 1.0));
            fg = false;
        }
        else if( (this.m_price * this.m_line) > NetData.NetData.getInst().balance){
            if (!CC_JSB){
                this.rechargeToastJudge();
                if (window.aliLotteryCasinoSDK) {
                    if(this.m_gameModel != 2){
                        window.aliLotteryCasinoSDK.recharge(true);
                    }
                }
            }
            fg = false;
            if(this.autoFlag == 1){
                this.autoCallback();
                //自动游戏钱不够了停止自动
                this.resetGame();
            }
        }
        //如果是免费游戏 则不需要判断余额
        if(this.m_gameModel == 2){
            fg = true;
        }
        return fg;
    },

       //
       setTaobaoSDK:function(){
        /*******************淘宝相关************************/
       
       //  /**
       var sdk = window.aliLotteryCasinoSDK;
       
       //user icon
       if (!CC_JSB){
           
           this.sdkUid = -1;
           
           var self = this;            
           // 由于在绑定时可能已经触发过该事件，可以先获取一下
           if (sdk) {
               // this.testBut1.active = false;

               sdk.getUserInfo(function(user) {
                   if (user) {
                       var uid = user.uid;
                       // var nick = user.nick;
                       var fee = user.fee;

                       if (self.sdkUid && self.sdkUid != uid) {
                           self.sdkBalance = fee;
                           self.sdkUid = uid;
                       }
                   }
               });
               //end usericon

               //order
               document.addEventListener('casino:click', function(e) {
                       // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                       console.log("casino:click"+e.data.type);
                       if(e.data.type == 'order'){
                               sdk.isLogin(function(isLogin) {
                                       // isLogin 为 true 为登录 ，false 为未登录
                                       if(isLogin){
                                        //    if(NetData.NetData.getInst().helpShowFlag){//或许没起作用
                                        //            let st = self.helpNode.getComponent("Help");
                                        //            st.close(null, 2);
                                        //    }
                                           let s1 = self.orderNode.getComponent("JiluListScript");
                                           if(e.data.action == 'show')
                                           {    
                                               self.openControl();
                                               if(!NetData.NetData.getInst().orderShowFlag)
                                               {   
                                                   if(!self.orderFlag){
                                                        s1.showCallBack = e.data.callback;   
                                                        self.getOrderList();
                                                   }else{
                                                        e.data.callback(true);
                                                   }  
                                               }
                                               
                                           }
                                           else if(e.data.action == 'hide')
                                           {
                                               if(NetData.NetData.getInst().orderShowFlag)
                                               {
                                                   s1.close(e.data.callback, 1);
                                               }
                                           }
                                       }
                                       else{
                                           self.goLogin();
                                       }
                               });
                       }
                       else if(e.data.type == 'rule'){
                           let s1 = self.helpNode.getComponent("Help");
                           
                        //    if(NetData.NetData.getInst().orderShowFlag){
                        //        let st = self.orderNode.getComponent("JiluListScript");
                        //        st.close(null, 2);
                        //    }

                           if(e.data.action == 'show')
                           {    
                              self.openControl(); 
                              if(!NetData.NetData.getInst().helpShowFlag){
                                    if(self.ruleHasShowOnce == true){
                                        self.waitLayer.active = true;
                                        s1.showCallBack = e.data.callback;
                                        s1.downHelp();
                                    }else{
                                        console.log(" ruleFlag", self.orderFlag);        
                                        if(!self.orderFlag)
                                        {   
                                            s1.showCallBack = e.data.callback;
                                            self.getRule();
                                        }
                                        else
                                        {   
                                            e.data.callback(true);
                                            console.log("can not rule something！");
                                        }
                                    }
                               }
                           }
                           else if(e.data.action == 'hide')
                           {
                               if(NetData.NetData.getInst().helpShowFlag){
                                   s1.close(e.data.callback, 1);
                               }
                           }
                       }                
                   }, false);

                   document.addEventListener('casino:back', function()
                   {   
                       console.log("casino:back");
                       if(self.errDialogTag == 1){
                           self.exitGame();
                       }else{
                           if(self.state_gameing){
                               self.blackLayer.active = true;
                               self.backLayer.scale = 0;
                               let scaleTo1 = cc.scaleTo(0.2, 1.2, 1.2);
                               let scaleTo2 = cc.scaleTo(0.1, 1.0, 1.0);
                               self.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
                           }else{
                               self.exitGame();
                           }
                       }
                       
                   }, false);

                   //窗口激活事件，当 App 从后台切回到前台时会触发
                   document.addEventListener('casino:resume', function(e) {
                       console.log("casino:resume");
                   }, false);
                   
                   //余额有变化而且是未登录状态，监听后去fresh初始化刷新（self.sdkUid != uid）只代表是否登录，不代表是不是同一个用户(2017-03-24 pm:530)
                   document.addEventListener('casino:updateUserBalance', function(e) {
                       // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                       console.log("casino:updateUserBalance");
                       var uid = e.data.uid;
                       // var nick = e.data.nick;
                       var fee = e.data.fee;

                       if (self.sdkUid !== null && self.sdkUid != uid) {
                           // self.showUserIcon(uid, nick);
                           console.log("casino:updateUserBalance first login!! ");
                           self.fresh();
                           self.sdkUid = uid;
                       }
                       NetData.NetData.getInst().balance = fee;
                       self.sdkBalance = fee;                      
                   }, false)
                   //sdk.throwTimer('initialize');//活动
                   
           }
           else{
               this.sdkBalance = 10000;
           }
       }
       else{
           this.sdkBalance = 10000;
       }
   },

    /***********************************淘宝相关*******************************************************/
    //请刷新页面
    fresh:function()
    {   
        var initResult= NetData.NetData.getInst().InitResult;
        if(initResult){
            this.markGetInitFlag = false;
            
            this.hideWaitLayer(true);
            this.unschedule(this.getPool);
            this.orderFlag = true;
            if(this.autoFlag == 1){
                this.autoCallback();
            }
            this.resetGame();
            this.getInit();
            console.log("fresh UI");//
        }else{
            console.log("has not fresh");//
        }
    },
    
    //  /*
     
    //退出游戏
    exitGame: function(){
        // this.stopAllActions();
        this.unschedule(this.getPool);

         console.log("exitGame");
         
        if (!CC_JSB){
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.popWindow();
            }
        }
        else{
            console.log("director.loadScene");
            cc.director.loadScene('game');
        }
    },

    setUnitSpecialModel:function(){
        this.pArray[1].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[2].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[3].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[4].getComponent(Unit).setIsSpecialModel(true);
    },
        
    start: function(){
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }
    },

    goLogin: function(){
        if(!CC_JSB){
            var self = this;
            var sdk = window.aliLotteryCasinoSDK;

            if(sdk){
                console.log("goin sdk!");
                
                sdk.login(function() {//需要调初始化;
                
                console.log("login callback!");
                
                 sdk.updateUserInfo();
                 
                console.log("before fresh!");
                
                //self.fresh();
                    
                console.log("after fresh!");
                });
            }
            else{
                this.fresh();
            }
        }
        else{
            this.fresh();
        }
    },
    
    getIsLogin:function()
     {
        //   console.log("getIsLogin");
        if (!CC_JSB)
        {
            // console.log("CC_JSB");
         var self = this;
         var sdk = window.aliLotteryCasinoSDK;
            if (sdk) 
            {
                console.log("sdk");
                
                sdk.isLogin(function(isLogin) 
                {
                    
                  if(!isLogin)//没登录去登录
                  {
                      console.log("goLogin");
                       self.goLogin();
                  }
                  else//登录了 判断是否获取豆成功
                  {
                     console.log("淘宝:登陆了");
                    //在判断是否足额（淘宝相关） 
                    var flag = self.judgeBalance();
                    if(flag)
                    {   
                        self.getBet();
                    }
                    else
                    {   
                        console.log("获取豆失败或者其他失败");
                    }
                  }
                });
            }
            else
            {
                console.log("没有登陆淘宝 startBet");
                this.getBet(); 
            }
        }
        else
        {
            // console.log("startBet");
           this.getBet(); 
        }
     },


     testOrder:function(){
        this.openControl();
        this.test("order");
     },

     testRule:function(){
        this.openControl();
        this.test("rule");
     },

     //test
     test:function(type){
         var self = this;
         if(type == 'order'){
            if(1){
                if(NetData.NetData.getInst().helpShowFlag){
                    let st = self.helpNode.getComponent("Help");
                    st.close(null,2);
                }
                if(!NetData.NetData.getInst().orderShowFlag){
                    console.log("^^ orderFlag", self.orderFlag);                                
                    if(!self.orderFlag)
                    {   
                        self.getOrderList();
                    }
                    else{
                        console.log("can not order something！");
                    }
                }
                else{
                    let s1 = self.orderNode.getComponent("JiluListScript");
                    s1.close(null, 2);
                }
            }else{
                self.goLogin();
            }
        }

        if(type == 'rule'){
            let s1 = self.helpNode.getComponent("Help");           
            if(NetData.NetData.getInst().orderShowFlag){
                let st = self.orderNode.getComponent("JiluListScript");
                st.close(null, 2);
            }

            if(!NetData.NetData.getInst().helpShowFlag){
                if(self.ruleHasShowOnce == true){
                    self.waitLayer.active = true;
                    s1.downHelp();
                }else{
                    console.log(" ruleFlag", self.orderFlag);            
                    if(!self.orderFlag)
                    {
                        self.getRule();
                    }
                    else
                    {
                        console.log("can not rule something！");
                    }
                }
                //s1.initHelp();
            }
            else{
                s1.close(null, 2);
            }
        }                
     },
});
