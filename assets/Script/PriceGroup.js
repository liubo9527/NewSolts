var NetData = require("NetData");
cc.Class({
    extends: cc.Component,

    properties: {
        beiArray:{
            default:[],
            type:[cc.Node],
        },
    },

    clickOneToggle:function(templeIndex){
        if(templeIndex == this.index){
            //doNothing
        }else{
            this.index = templeIndex;
            for(let i = 0; i < 5; i++){
                var normal = this.beiArray[i].getChildByName('normal');
                var select = this.beiArray[i].getChildByName('select');
                if(i == this.index){
                    select.active = true;
                    normal.active = false;
                }else{
                    normal.active = true;
                    select.active = false;
                }
            }
        }
        //通知game脚本更新信息
         cc.find('Canvas').getComponent('Game').priceChangeBet(this.index);
    },

    //true 禁用
    betPriceSetEnable:function(flag){
        for(let i = 0; i < 5; i++){
                var normal = this.beiArray[i].getChildByName('normal');
                var select = this.beiArray[i].getChildByName('select');
                var enableNormal = this.beiArray[i].getChildByName('enableNormal');
                var enableSelect = this.beiArray[i].getChildByName('enableSelect');
                normal.active = false;
                select.active = false;
                enableNormal.active = false;
                enableSelect.active = false;
                if(i == this.index){
                    if(flag == true){
                        enableSelect.active = true;
                    }else{
                        select.active = true;
                    }
                }else{
                    if(flag == true){
                        enableNormal.active = true;
                    }else{
                        normal.active = true;
                    }
                }
        }
    },

    setLabelColor:function(){
        //设置Label颜色
        var skin = NetData.NetData.getInst().skin;
        if(skin){
            var labelColorArray = skin.betRgb;
            if(labelColorArray != null){
                for(let i = 0; i < 5; i++){
                    var normalRgb = labelColorArray[0];
                    var selectRGB = labelColorArray[1];
                    var enableNormalRGB = labelColorArray[2];
                    var enableSelectRGB = labelColorArray[3];

                    var normalLabel = this.beiArray[i].getChildByName('normal').getChildByName("label").getComponent("cc.Label");
                    var selectLabel = this.beiArray[i].getChildByName('select').getChildByName("label").getComponent("cc.Label");
                    var enableNormalLabel = this.beiArray[i].getChildByName('enableNormal').getChildByName("label").getComponent("cc.Label");
                    var enableSelectLabel = this.beiArray[i].getChildByName('enableSelect').getChildByName("label").getComponent("cc.Label");
                    normalLabel.node.color = new cc.Color(normalRgb[0],normalRgb[1],normalRgb[2]);
                    selectLabel.node.color = new cc.Color(selectRGB[0],selectRGB[1],selectRGB[2]);
                    enableNormalLabel.node.color = new cc.Color(enableNormalRGB[0],enableNormalRGB[1],enableNormalRGB[2]);
                    enableSelectLabel.node.color = new cc.Color(enableSelectRGB[0],enableSelectRGB[1],enableSelectRGB[2]);
                    //倍
                    var normalBei = this.beiArray[i].getChildByName('normal').getChildByName("bei").getComponent("cc.Label");
                    var selectBei = this.beiArray[i].getChildByName('select').getChildByName("bei").getComponent("cc.Label");
                    var enableNormalBei = this.beiArray[i].getChildByName('enableNormal').getChildByName("bei").getComponent("cc.Label");
                    var enableSelectBei = this.beiArray[i].getChildByName('enableSelect').getChildByName("bei").getComponent("cc.Label");
                    normalBei.node.color = new cc.Color(normalRgb[0],normalRgb[1],normalRgb[2]);
                    selectBei.node.color = new cc.Color(selectRGB[0],selectRGB[1],selectRGB[2]);
                    enableNormalBei.node.color = new cc.Color(enableNormalRGB[0],enableNormalRGB[1],enableNormalRGB[2]);
                    enableSelectBei.node.color = new cc.Color(enableSelectRGB[0],enableSelectRGB[1],enableSelectRGB[2]);
                }
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        //绑定touch事件 
        for(let i = 0; i < 5; i++){
            this.beiArray[i].on(cc.Node.EventType.TOUCH_START, function (){
            }, this);
            this.beiArray[i].on(cc.Node.EventType.TOUCH_END, function (){
                this.clickOneToggle(i);
            }, this);
            this.beiArray[i].on(cc.Node.EventType.TOUCH_CANCEL, function (){
            }, this);
            
        }
    },
});
