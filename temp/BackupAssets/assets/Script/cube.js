cc.Class({
    extends: cc.Component,

    properties: {
        WW:{
            default:null,
            type:cc.Node,
        },
        FG:{
            default:null,
            type:cc.Node,
        },
        M1:{
            default:null,
            type:cc.Node,
        },
        M2:{
            default:null,
            type:cc.Node,
        },
        M3:{
            default:null,
            type:cc.Node,
        },
        F4:{
            default:null,
            type:cc.Node,
        },
        F5:{
            default:null,
            type:cc.Node,
        },
        F6:{
            default:null,
            type:cc.Node,
        },
        F7:{
            default:null,
            type:cc.Node,
        },
        F8:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {},
    
    setCube:function(name){
        this.WW.active = false;
        this.FG.active = false;
        this.M1.active = false;
        this.M2.active = false;
        this.M3.active = false;
        this.F4.active = false;
        this.F5.active = false;
        this.F6.active = false;
        this.F7.active = false;
        this.F8.active = false;
        if(name == "WW"){
            this.WW.active = true;
        }else if(name == "M1"){
            this.M1.active = true;
        }else if(name == "M2"){
            this.M2.active = true;
        }else if(name == "M3"){
            this.M3.active = true;
        }else if(name == "F4"){
            this.F4.active = true;
        }else if(name == "F5"){
            this.F5.active = true;
        }else if(name == "F6"){
            this.F6.active = true;
        }else if(name == "F7"){
            this.F7.active = true;
        }else if(name == "F8"){
            this.F8.active = true;
        }else if(name == "FG"){
            this.FG.active = true;
        }else{
            cc.log("unknown card type");
        }
    }
    
    
});
