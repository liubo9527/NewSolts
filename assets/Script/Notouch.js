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
    },

    // use this for initialization
    onLoad: function () {
       this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            //不再派发事件
            event.stopPropagation();

            if(this.obj != undefined)
            {
                this.fun(this.obj);
                this.obj = undefined;
                this.fun = undefined;
            }
        },this);
    },

    init: function(obj, fun){
        this.obj = obj;
        this.fun = fun;
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
