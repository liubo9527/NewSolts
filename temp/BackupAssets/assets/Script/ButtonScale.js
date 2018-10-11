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
        
    },
    /*pax: function(c1, c2)
    {
       return c2 - c1;
    },*/

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
        
        
        
        var timeCallback = function (dt)
        {
           this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            if(this.interactableType)
        {
             this.node.scale = 0.8;
        }
           
        },this);
        
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            this.node.scale = 1;
            if(this.interactableType)
            {
                var onFunction = cc.find('Canvas').getComponent('Game');
                onFunction.btnActionCallBack(this.selectType);
                
            }
           
        },this);
        
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            this.node.scale = 1;
        },this);
            
        }
        
       this.scheduleOnce(timeCallback, 0.001);
        
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
            this.node.color = new cc.Color(255, 255, 255);
        }
        else
        {
           this.node.color = new cc.Color(124, 124, 124); 
        }
            
        }
        
       this.scheduleOnce(timeCallback, 0.001);
       
        //cc.log("this.node.color " + this.node.color.r);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
