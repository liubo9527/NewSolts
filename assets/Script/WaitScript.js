cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this.angle = 0;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         this.angle += dt * 360;
         
         if(this.angle > 360)
         {
             this.angle -= 360;
         }
         
         this.node.rotation =  this.angle;
     },
});
