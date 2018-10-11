cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        interactableType:true,
        selectType:0,
        selectFlag: false,//添加选中状态
        //按钮
        buttonBt:{
            type:cc.Node,
            default:null
        },
        //group
        group:{
            type:cc.Node,
            default:null
        },
        //
        line10:{
            type:cc.Node,
            default:null
        },
         line20:{
            type:cc.Node,
            default:null
        },
         line30:{
            type:cc.Node,
            default:null
        },
         line40:{
            type:cc.Node,
            default:null
        },
         line50:{
            type:cc.Node,
            default:null
        },
        jiantou:{
            type:cc.Node,
            default:null
        },
        //是否打开了
        isOpenSelect:false,
        
    },
    /*pax: function(c1, c2)
    {
       return c2 - c1;
    },*/

    lineChange:function(toggle, msg){
        this.isOpenSelect = false;
        this.group.scale = 0;
        this.jiantou.scaleY = 1;
        this.line10.active = false;
        this.line20.active = false;
        this.line30.active = false;
        this.line40.active = false;
        this.line50.active = false;
        if(msg == 10){
            this.line10.active = true;
        }else if(msg == 20){
            this.line20.active = true;
        }else if(msg == 30){
            this.line30.active = true;
        }else if(msg == 40){
            this.line40.active = true;
        }else if(msg == 50){    
            this.line50.active = true;
        }else{
            cc.log("line err"+msg);
        }
    },

    // use this for initialization
    onLoad: function () {
        /*let arrDemo = new Array(1, 3, 2, 5, 6);
        //arrDemo.sort(this.pax);
        //arrDemo.sort(function(a,b){return a>b?1:-1});//从小到大排序
        arrDemo.sort(function(a,b){return a<b?1:-1});//从大到小排序

        for(let i = 0; i < arrDemo.length; i++)
        {
            cc.log("testsort" + arrDemo[i]);
        }*/
        
        //cc.log("testsort bbbbbbbbbbbbbbbbbb" );
        
        

        this.buttonBt.on(cc.Node.EventType.TOUCH_START,function(event){
            
            if(this.interactableType)
        {
             this.buttonBt.scale = 1;
             cc.log("sb");
        }
           
        },this);
        
        this.buttonBt.on(cc.Node.EventType.TOUCH_END,function(event){
            
            this.buttonBt.scale = 1;
            if(this.interactableType)
            {   
                if(this.isOpenSelect == true){
                    this.isOpenSelect = false;
                    this.group.scale = 0;
                    this.jiantou.scaleY = 1;
                }else{
                    this.isOpenSelect =true;
                    this.group.scale = 1;
                    this.jiantou.scaleY = -1;
                }
            }
           
        },this);
        
        this.buttonBt.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            this.buttonBt.scale = 1;
        },this);
            

        
    },
    
    setInteractableType:function(interType)
    {
        //cc.log("setInteractableType " + interType);
        this.interactableType = interType;
        /*
        if(interType)
        {
            this.node.color = new cc.Color(255, 255, 255);
        }
        else
        {
           this.node.color = new cc.Color(124, 124, 124); 
        }
        */
        
         var timeCallback = function (dt)
        {
           if(interType)
        {
            this.buttonBt.color = new cc.Color(255, 255, 255);
        }
        else
        {
           this.buttonBt.color = new cc.Color(124, 124, 124); 
        }
            
        }
        
       this.scheduleOnce(timeCallback, 0.001);
       
        //cc.log("this.node.color " + this.node.color.r);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
