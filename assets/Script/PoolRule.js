var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack : cc.Node,
        lock : false,
        gameNode: cc.Node, 

        beiArray:{
            default:[],
            type:cc.Label,
        },

        minArray:{
            default:[],
            type:cc.Label,
        },

        //奖池规则标题
        poolTitleLabel:{
            default: [],
            type: [cc.Label]
        },

        //奖池规则说明 1 ~ 20倍
        poolDetailLabel: {
            default: [],
            type: [cc.Label]
        },
        content:cc.Node,
        maxArray:{
            default:[],
            type:cc.Label,
        },
        
        hasOpen:false,
    },

    // use this for initialization
    onLoad: function () {
        var se = cc.director.getWinSize();
        var per = se.width / se.height;
        var dPer = 1080 / 1660;
        this.sValue = per / dPer;
        if(per < dPer){
            this.content.scale = this.sValue;
            this.MovePos = -830 - 1124 * (1 - this.sValue);
        }else{
            this.MovePos = -830;
        }

        this.netData = NetData.NetData.getInst();
        this.lock = false;
        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event){
            event.stopPropagation();
            this.close();
        }, this);
    },
    
    
    close: function(){
        if(!this.lock){
            this.uiBlack.active = false;

            let call3 = cc.callFunc(function()
            {            
                //this.netData. = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, -2830)), call3));
        }
    },
   
    downHelp: function(){
        if(this.hasOpen == false){
            for(let i = 0; i < 5;i++){
                this.beiArray[i].string =  this.netData.poolRules[i].bet;
                this.minArray[i].string =  this.netData.poolRules[i].minBouns;
                this.maxArray[i].string =  this.netData.poolRules[i].maxBouns;
            }
            //标题最低** 
            for(let i = 0; i < 2; i++){            
                this.poolTitleLabel[i].string = this.poolTitleLabel[i].string + NetData.NetData.getInst().InitResult.currency+"数";
            }
            //倍数说明
            for(let i = 0; i < 5 ; i++){
                let percent = this.netData.poolRules[i].floatRate * 100;
                if(percent == 0){
                    this.poolDetailLabel[i].string = "固定" + this.netData.poolRules[i].minBouns;
                }else{
                    this.poolDetailLabel[i].string = percent + "%当前奖池" + NetData.NetData.getInst().InitResult.currency+"数";
                }

            }
            this.hasOpen = true;
        }
        this.initHelp();
    },

    initHelp:function() {
        if(!this.lock){
            //this.netData.helpShowFlag = true;
            this.lock = true;
            let callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.MovePos)), callback));
        }        
    },

    selectShowCallBack:function()
    {
        this.uiBlack.active = true;
        this.lock = false;
    },
});
