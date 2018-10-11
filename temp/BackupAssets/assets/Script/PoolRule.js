var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack : cc.Node,
        testNode : cc.Node,
        scrollView: cc.Node,
        content: cc.Node,
        content2: cc.Node,
        lock : false,
        gameNode: cc.Node,
        ruleContent:cc.Prefab,
        
        lineContent:[],//收藏每行规则
    },

    // use this for initialization
    onLoad: function () {
        
        this.netData = NetData.NetData.getInst();
        // cc.log("rule onload");
        this.lock = true;
        let oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;
        //console.log("oriY=" + this.node.y + "|" + oriP1.y);        

        var callFunc_1 = cc.callFunc(function()
        {
            this.lock = false;
            var se = cc.director.getWinSize();
            this.scrollView.height = se.height * 0.8;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height;    
            //console.log("ny=" + this.node.y);
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(0.1), callFunc_1));

        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event){
            event.stopPropagation();
            this.close();
        }, this);
        
    },
    
    //在提前初始化里去调用此函数
    initPre:function()
    {
        console.log("poolrule initPre");
        
        this.netData = NetData.NetData.getInst();
        
        
        return;// test
        
        //bet : 0,  //倍数
        //poolMin : 0, //最大值
       // poolMax:0,
        //minBouns:0,
        //floatRate:0,
        //maxBouns:0,
        //probability:0,
        //tigerProbability:0,
        
        //  cc.log("poolrulesInfo len is =  ", this.netData.poolRules.length);
         
        for(let i = 0; i < this.netData.poolRules.length; i ++)
        {
            var text = "";
            var text0 = "";
            var textlast = "";
            var lowMoney = "";
            var heighMoney = "";
            var flag = false;
            
            // var price = "10";
            // var getMoney = "2000000";
            
            // cc.log("poolrulesInfo:bet ", this.netData.poolRules[i].bet);
            // cc.log("poolrulesInfo:poolMin ", this.netData.poolRules[i].poolMin);
            // cc.log("poolrulesInfo:poolMax ", this.netData.poolRules[i].poolMax);
            cc.log("poolrulesInfo:minBouns ", this.netData.poolRules[i].minBouns);
            // console.log("poolrulesInfo:floatRate ", this.netData.poolRules[i].floatRate);
            console.log("poolrulesInfo:maxBouns ", this.netData.poolRules[i].maxBouns);
            // cc.log("poolrulesInfo:probability ", this.netData.poolRules[i].probability);
            // cc.log("poolrulesInfo:tigerProbability ", this.netData.poolRules[i].tigerProbability);
            
            var price = this.netData.poolRules[i].bet*this.netData.betAmount;

            var getMoney;
            textlast = "";
            
           if(i === 0)
           {
               
               flag = false;
               text = "";
               text0 = "，奖励";
               
              getMoney = this.netData.poolRules[i].maxBouns;
           }
           else
           {
               textlast = "；";
               flag = true;
               text = "的";
               text0 = "，奖励累计奖金";
               var float = this.netData.poolRules[i].floatRate;
               
               var money;
               money = Number(float)*100;
               money = "" + money + "%";
            //   cc.log("poolrulesInfo:floatRate is ", money);
              getMoney = money; 
              lowMoney = this.netData.poolRules[i].minBouns/10000;
              heighMoney = this.netData.poolRules[i].maxBouns/10000;
              
           }

           
            var contentPre = cc.instantiate(this.ruleContent);
            this.content2.addChild(contentPre);
            var contentjs = contentPre.getComponent("PoolRulePre"); 
            contentjs.setContent(price, getMoney, text0,text, textlast, lowMoney, heighMoney);
            contentjs.setPosition(flag);
            
            contentPre.anchorY = 1;
             contentPre.anchorX = 0.5;
            contentPre.y = - 30 - (50*i);
            
            this.lineContent.push(contentPre);
        }
    },
    
    close: function(){
        if(!this.lock){
            this.uiBlack.active = false;

            let call3 = cc.callFunc(function()
            {            
                this.netData.helpShowFlag = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height)), call3));
        }
    },

    downHelp: function(){
        var self = this;
        let spt = this.gameNode.getComponent(Game);
        // spt.showWaitLayer();
        let rh = 0;
        self.content.height = 600;
        // spt.hideWaitLayer();
        self.initHelp();
        
    },

    initHelp:function() {
        if(!this.lock){
            // console.log("initHelp");
            this.netData.helpShowFlag = true;
            this.lock = true;
            this.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.p(0,0), 0.1);
            let callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.oriY)), callback));
        }        
    },

    selectShowCallBack:function()
    {
        this.uiBlack.active = true;
        this.lock = false;
    },
});
