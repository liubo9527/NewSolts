
var Unit = require("unit");
var NetData = require("NetData");
var GameData = require("GameData");
var DataOper = require("DataOper");
var DrawLine = require("drawLine");
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

        blackLayer: {
            default: null,
            type: cc.Node
        },

        toastNode: {
            default: null,
            type: cc.Node
        },

        toastLabel: {
            default: null,
            type: cc.Label
        },

        leftLabel: {
            default: null,
            type: cc.Label
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

        unitCubeArray:[],

        index:0,

        autoFlag: 0, //自动投注
        autoLimit: 10, //自动要10次限制 
        autoIndex: 10, //自动当前号

        m_line:50,
        m_price:1,
        m_isQuickStopBt:false,
        m_isNormalModel:true,

        frontList:[],
        errDialogTag: 0, //不同的错误处理; 1:多设备同事登陆 2:恢复 3:游戏正在运行中，确认离开么？
        lineIndex: 0, //中奖行数组序号 
    },
    //联网
    netCallback : function(cmd, res, msg, self){
        console.log("netCallback cmd=" + cmd + "\res=" + res + "\msg=" + msg);
        self.hideWaitLayer();
        if(res == 0)
        {
            switch(cmd)
            {
                case 100:
                {
                    var initResult= NetData.NetData.getInst().InitResult;
                    var status = initResult.status;
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
                    //正常游戏
                    self.setGameModelAndUnitData();
                }
                break;
                case 102:
                {
                     //结算游戏
                    self.rewardGame();
                    self.errDialogTag = 0;
                    //
                    cc.log("结算游戏");
                }
                break;
                default:
                break;
            }
        }
        else if(res == 200009){ //余额不足;
            /*let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.toastLabel.string = msg;
            this.toastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));*/
            //提示余额不足，跳转到充值
            if (!CC_JSB){
                if (window.aliLotteryCasinoSDK) {
                    window.aliLotteryCasinoSDK.recharge(true);
                }
            }
        }
        else if(res == 100007){ //停售
            self.blackLayer.active = true;
            self.stopLabel.node.active = true;
            self.stopLabel.string = msg;
        }
        else if(res == 200019){ // 停售
            self.blackLayer.active = true;
            self.stopLabel.node.active = true;
            self.stopLabel.string = msg;
        }
        else if(res == 200022){ //停售
            self.blackLayer.active = true;
            self.stopLabel.node.active = true;
            self.stopLabel.string = msg;
        }
        else if(res == 100014){ //账号在其他设备登陆 100014==100035
            self.blackLayer.active = true;
            self.errDialogTag = 1;
            self.moreDevLabel.string = msg;
            self.moreDevDia.runAction(cc.scaleTo(0.3, 1));
        } 
        else if(res == 100035){ //账号在其他设备登陆
            self.blackLayer.active = true;
            self.errDialogTag = 1;
            self.moreDevLabel.string = msg;
            self.moreDevDia.runAction(cc.scaleTo(0.3, 1));
        } 
        else{
            self.cunCmd = cmd;
            self.showErrorLayer(msg, true);
        }
    },

    //错误提示 //flag:true:双按钮  false:单按钮,
    showErrorLayer:function(errMsg, flag)
    {
        this.errLabel.string = errMsg;        
        this.blackLayer.active = true;
        this.errLayer.scale = 0;
        let scaleTo1 = cc.scaleTo(0.2, 1.2, 1.2);
        let scaleTo2 = cc.scaleTo(0.1, 1.0, 1.0);
        this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
    },

    getInit:function(){
        this.showWaitLayer();
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
    getNormalBet:function(){
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getBet (0,"",0,this.m_price,this.m_line,NetData.NetData.getInst().InitResult.playTime,this.netCallback,this);
    },

    getFreeBet:function(){
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        var step = NetData.NetData.getInst().BetResult.freeGameLeftTimes;//当前次数
        var ticketNo = NetData.NetData.getInst().BetResult.ticketNo;
        dataOper.getBet (1,ticketNo,step,this.m_price,this.m_line,NetData.NetData.getInst().InitResult.playTime,this.netCallback,this);
    },

      
    /**
     * 结算
     * @param ticket_no 订单号
     * @param playTime 游戏时间
     */
    getReward:function(){
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
        this.blackLayer.active = true;
        this.moreDevLabel.string = "上次活动被中断，您将继续上次活动";
        this.moreDevDia.runAction(cc.scaleTo(0.3, 1));
    },

    // use this for initialization
    onLoad: function () {
        this.pArray = [];
        this.unitCubeArray = [];
        this.pArray.push(this.unit1);
        this.pArray.push(this.unit2);
        this.pArray.push(this.unit3);
        this.pArray.push(this.unit4);
        this.pArray.push(this.unit5);

        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.moreDevBut.scale = 0.8;
        }, this);        
        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.moreDevBut.scale = 1;
            this.moreDevDia.runAction(cc.scaleTo(0.2, 0, 0));
            if(this.errDialogTag == 1){//
                this.exitGame();
            }
            else if(this.errDialogTag == 2){ //恢复
                this.blackLayer.active = false;
                this.setRecoverGameModelAndUnitData();
            }
        }, this);

        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.moreDevBut.scale = 1;
        }, this);

        //auto confirm
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.autoOk.scale = 0.8;
        }, this);
        
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.autoOk.scale = 1;
            this.blackLayer.active = false;
            var callFunc_2 = cc.callFunc(function()
            {
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
        }, this);
        
        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.autoCancel.scale = 1;
        }, this);
        //end auto 

        //错误框 retry
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_START, function (){
            this.buttonRetry.scale = 0.8;
        }, this);
        
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_END, function (){
            this.buttonRetry.scale = 1;
            let scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            let scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2));

            if(this.errDialogTag == 3){
                //按返回按钮等等再走; do nothing.
            }
            //初始化不过， 退出或try
            else if(this.cunCmd == 100){
                this.showWaitLayer();
                this.getInit();
            }
            else if(this.cunCmd == 101){
                this.showWaitLayer();
                this.getNormalBet();
            }
            else if(this.cunCmd == 102){
                this.showWaitLayer();
                this.getReward();
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
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
            //初始化不过， 退出或try            
            this.exitGame();
        }, this);
        
        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function (){
            this.buttonCancel.scale = 1;
        }, this);
        //错误框 end

        //初始化接口
        this.getInit();

        //this.recoverGame();
    },

    //自动游戏
    autoCallback: function(event){
        if(this.autoFlag == 0){
            this.autoFlag = 1;
            this.autoLabel.string = "取消";
            this.getNormalBet();
        }else{
            this.autoFlag = 0;
            this.autoIndex = this.autoLimit;
            this.autoLabel.string = "自动";
            this.rightNotTouch.active = true;
        }

    },

    showWaitLayer: function(){
        this.blackLayer.active = true;
        this.waitLayer.active = true;
    },

    hideWaitLayer: function(){
        this.blackLayer.active = false;
        this.waitLayer.active = false;
    },

    btnActionCallBack:function(selectType){
        if(selectType == 1){
            if(this.m_isQuickStopBt == true){
                this.quickStop();
            }else{
                this.getNormalBet();
            }
        }else if(selectType == 2){
            if(this.autoFlag == 0){
                this.blackLayer.active = true;
                this.autoConLabel.string = "是否自动执行" + this.autoLimit + "次活动，每次花费" + (this.m_line * this.m_price) +"（可提前结束）？";
                this.autoConfirm.runAction(cc.scaleTo(0.3, 1, 1));
            }else{
                this.autoCallback();
            }
             
        }
    },

    lineChangeBet:function(toggle, mes){
        this.m_line = mes;
        this.changeSelectLineAction(mes);
        this.updateBeTInfo();
    },

    changeSelectLineAction:function(mes){
       var drawLine =  cc.find("Canvas/GameNode").getComponent(DrawLine);
       drawLine.show(mes);
    },

    priceChangeBet:function(toggle, mes){
        this.m_price = mes;
        this.updateBeTInfo();
    },

    updateBeTInfo:function(){
       var label= cc.find("Canvas/bt_Info").getComponent(cc.Label);
       var total = this.m_line * this.m_price;
       label.string = "共花费" + total+"豆";
    },

    //游戏恢复数据设置
    setRecoverGameModelAndUnitData:function(){
        var netData = NetData.NetData.getInst();
        var ticketsArray = netData.InitResult.recoverData.ticketData[0];
        for(var i = 0; i < 5; i++){ 
            var dataArray = [] 
            var unitS = this.pArray[i].getComponent(Unit);
            for(var j = 3; j>=0; j--){
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            unitS.setStopDataArray(dataArray, i+1);
        }
        this.startRound();
    },

    //正常游戏
    setGameModelAndUnitData:function(){
        var netData = NetData.NetData.getInst();
        var ticketsArray = netData.BetResult.ticketData[0];
        for(var i = 0; i < 5; i++){
            var dataArray = [] 
            var unitS = this.pArray[i].getComponent(Unit);
            for(var j = 3; j>=0; j--){
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            unitS.setStopDataArray(dataArray, i+1);
        }
        this.startRound();
    },

    startRound:function(){
        var betNotTouch = cc.find("Canvas/betNotTouch");
        betNotTouch.active = true;
        if(this.autoFlag == 1){
            this.rightNotTouch.active = false;
            this.leftNotTouch.active = true;
        }else{
            this.rightNotTouch.active = true;
            this.leftNotTouch.active = false;
            this.leftLabel.string = "快速停止";
            this.m_isQuickStopBt = true;
        }
        this.index = 0;
        for(var i = 0; i < 5; i++){
             var unitS = this.pArray[i].getComponent(Unit);
             unitS.startRound();
        }
        this.scheduleOnce(this.normalStop, 2);
    },

    quickStop:function(){
        this.unschedule(this.normalStop);
        this.unschedule(this.timeCallback);
        this.m_isNormalModel == false;
        for(var i = 0; i < 5; i++){
             var unitS = this.pArray[i].getComponent(Unit);
             unitS.stopRound();
        }
    },

    normalStop:function(){
        this.schedule(this.timeCallback, 0.7);
    },

    timeCallback:function (dt) {
        if(this.m_isNormalModel == true){
            var unitS = this.pArray[this.index].getComponent(Unit);
            unitS.stopRound();
        }
        this.index++;
        if(this.index == 5){
            this.unschedule(this.timeCallback);               
        }
     },

    //滚动完毕之后中奖画线
    roundEnded:function() {
        this.updataFrontList();
        this.lineIndex = 0;
        var orderResultLength = 0;
        if(this.errDialogTag == 2){
            orderResultLength = NetData.NetData.getInst().InitResult.recoverData.orderResult[0].length;
        }else{
            orderResultLength = NetData.NetData.getInst().BetResult.orderResult[0].length;
        }
        if(orderResultLength > 0){
            this.schedule(this.drawLine, 1);//画线
        }else{
            this.judgeFreeGame();
        }        
    },

    updataFrontList:function(){
        this.frontList = [];
        for(var i = 3; i >= 0; i--){
            for(var j = 0; j < 5; j++ ){
               var unitS = this.pArray[j].getComponent(Unit);
               var cubeArray = unitS.getCubeArray();
               var cube = cubeArray[i];
               var x = cube.x + 100 + j * 200 - 500;
               var y = cube.y + 112.5 - 450;
               var pos = cc.v2(x, y);
               this.frontList.push(pos);
            }
        }
     },

    //中奖画线
    drawLine:function(){
        var array = [];
        var lines = 0;
        if(this.errDialogTag == 2){
            lines = NetData.NetData.getInst().InitResult.recoverData.orderResult.length;
            array = NetData.NetData.getInst().InitResult.recoverData.orderResult[this.lineIndex].locations;
        }else{
            var orderResult = NetData.NetData.getInst().BetResult.orderResult[0];
            array = orderResult[this.lineIndex].locations;
            lines = NetData.NetData.getInst().BetResult.orderResult.length;
        }

        var ctx = this.lineGraphic;
        //this.lineGraphic.zIndex = 2;
        ctx.clear();
        ctx.moveTo(this.frontList[array[0]].x, this.frontList[array[0]].y);

        for(let i = 1 ; i < array.length; i++){
            ctx.lineTo(this.frontList[array[i]].x, this.frontList[array[i]].y);
        }
        ctx.stroke();
        this.lineIndex++;
        if(lines == this.lineIndex){//画线完毕
            this.judgeFreeGame();
            this.unschedule(this.drawLine);
        }
    },

    judgeFreeGame:function(){
        //判断有没有免费游戏
        var hasFreeGame = false;
        if(this.errDialogTag == 2){
            hasFreeGame = NetData.NetData.getInst().InitResult.recoverData.hasFreeGame;
        }else{
           hasFreeGame = NetData.NetData.getInst().BetResult.hasFreeGame;
        }
        if(hasFreeGame == true){
            this.freeGameModel();
        }else{
            //调结算
            this.getReward();
        }   
    },

    //免费游戏
    freeGameModel:function(){
        var betNotTouch = cc.find("Canvas/betNotTouch");
        betNotTouch.active = true;
        this.m_isQuickStopBt = false;
        this.m_isNormalMode = true;
        this.rightNotTouch.active = true;
        this.leftNotTouch.active = true;
        this.getFreeBet();
    },

    //结算游戏
    rewardGame:function() {
        let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        let scaleTo2 = cc.scaleTo(0.2, 0, 0);
        var amount =  NetData.NetData.getInst().RewardResult.bonusAmount;
        this.toastLabel.string = "中了"+amount+"豆";
        this.toastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
        this.scheduleOnce(this.resetGame, 2);
    },

    //下轮游戏初始化
    resetGame:function() {
        this.lineGraphic.clear();
        if(this.autoFlag == 1){
            this.rightNotTouch.active = false;
            this.autoIndex--;
            cc.log(":::"+this.autoIndex);
            if(this.autoIndex == 0){
                this.autoCallback();
                this.leftLabel.string = "只玩一次";     
                var betNotTouch = cc.find("Canvas/betNotTouch");
                betNotTouch.active = false;
                this.m_isQuickStopBt = false;
                this.m_isNormalMode = true;
                this.rightNotTouch.active = false;
                this.leftNotTouch.active = false;
            }else{
                this.getNormalBet();
            }
        }else{
            
            this.leftLabel.string = "只玩一次";     
            var betNotTouch = cc.find("Canvas/betNotTouch");
            betNotTouch.active = false;
            this.m_isQuickStopBt = false;
            this.m_isNormalMode = true;
            this.rightNotTouch.active = false;
            this.leftNotTouch.active = false;
        }

        
    }

});
