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
        view: cc.Node,
        lock : false,
        gameNode: cc.Node,
        imgArray : [cc.Sprite],
        scaleValue:1,
        showCallBack:null,
    },

    // use this for initialization
    onLoad: function () {
        let size = cc.director.getWinSize();
        let ssss =  (size.width * 1660)  /(1080 * size.height);
        this.scaleValue = ssss;
        this.netData = NetData.NetData.getInst();
        this.lock = true;
        let oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;     
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
            this.close(null, 2);
        }, this);
    },

    errorCallBack:function(){
        if(this.showCallBack)
        {
            (this.showCallBack) && (this.showCallBack)(true);
            this.showCallBack = null;
        }
    },

    close: function(closeCallback, closeType){
        if(!this.lock){
            this.uiBlack.active = false;
            let call3 = cc.callFunc(function()
            {            
                this.netData.helpShowFlag = false;
                if(closeType == 2)
                {
                    if(window.aliLotteryCasinoSDK)
                    {
                        window.aliLotteryCasinoSDK.throwTimer('hideSheet', 'rule');
                    }
                    
                }
                else if(closeType ==1)
                {
                    closeCallback && closeCallback();
                }
            }, this);
            
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height)), call3));
        }
    },

    downHelp: function(){
        if(NetData.NetData.getInst().GameRule == null){
            cc.log("GameRule is null ");
            return;
        }
        var self = this;
        let spt = this.gameNode.getComponent(Game);
        let rh = 0;
        var res = this.netData.GameRule.helpRule.rulePics;
        cc.loader.load(res, null, function (errors, results) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    console.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                }
            }
            cc.log("results is %% ", results.getContent.length);
            let len = self.netData.GameRule.helpRule.rulePics.length;
            
            for(let i = 0; i < len; i++){   
                
                var aTex = results.getContent(self.netData.GameRule.helpRule.rulePics[i]); 
                console.log(self.netData.GameRule.helpRule.rulePics[i] + "|" + aTex);
                let sf = new cc.SpriteFrame();
                sf.setTexture(aTex);
                self.imgArray[i].node.active = true;
                self.imgArray[i].spriteFrame = sf;
                //
                let width = self.imgArray[i].node.width;
                let heightT = (1080 / width) * self.imgArray[i].node.height * self.scaleValue;
                self.imgArray[i].node.width = 1080 * self.scaleValue;
                self.imgArray[i].node.height = heightT;
                //self.imgArray[i].node.setScale(1080 / width);
                rh += heightT;
                cc.log("height is $$$ ", self.imgArray[i].node.height);
                //支持多张图排版（2017-03-27 pm：520）
                if(i > 0){
                    
                    var index = i - 1;
                    let ht = self.imgArray[index].node.height;
                    self.imgArray[i].node.y  = self.imgArray[index].node.y - ht + 1;
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

    initHelp:function() {
        if(!this.lock){
            console.log("initHelp");
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

        if(this.showCallBack)
        {
            (this.showCallBack) && (this.showCallBack)();

            this.showCallBack = null;
        }
    },

});
