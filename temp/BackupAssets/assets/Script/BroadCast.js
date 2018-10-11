var NetData = require("NetData");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        broadcastData : null,
        index : 0,
        labels : {
            default : [],
            type : cc.Label
        },
        firstFlag : true,
        resetFlag : true
    },

    // use this for initialization
    onLoad: function () {
        this.freeArray = new Array();
        this.activeArray = new Array();

        for(let i = 0; i < 3; ++i){
            this.freeArray.push(this.labels[i]);
        }
    },

    dataCallback : function(){
        this.broadcastData = NetData.NetData.getInst().broadcastData;
        if(this.broadcastData && this.broadcastData.list.length > 0){
                this.index = 0;

                if(this.firstFlag){
                    this.firstFlag = false;
                    this.show();
                }
        }
    },

    show : function(){
        this.node.x = 0;
        this.resetLabel();
    },

    resetLabel : function(){
        if(this.resetFlag && this.freeArray.length > 0){
            this.resetFlag = false;
            let label = this.freeArray.shift();
            label.node.x = 600;

            if(this.index >= this.broadcastData.list.length){
                this.index = 0;
            }

            var self = this;
            Common.Common.getInst().getNick(this.broadcastData.list[this.index].userId, function(nick){
                    label.string = nick + "在" + self.broadcastData.list[self.index].content;
                    self.index++;
                    self.activeArray.push(label);
                    self.resetFlag = true;
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        for(let i = 0; i < this.activeArray.length; ++i){
            this.activeArray[i].node.x -= 200 * dt;
        }
        
        if(this.activeArray.length > 0){
            if(this.activeArray[0].node.x + this.activeArray[0].node.width < -600){
                this.freeArray.push(this.activeArray.shift());
            }

            if(this.activeArray[this.activeArray.length - 1].node.x + this.activeArray[this.activeArray.length - 1].node.width < 200){
                this.resetLabel();
            }
        }
    },
});
