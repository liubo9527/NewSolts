cc.Class({
    extends: cc.Component,

    properties: {
       labelArray:{
            default:[],
            type:[cc.Node],
       },
       m_speed:1,
       m_isFirst: true,
       m_distance:0,
       m_delta:0,
       m_oldData: 0,
       m_newData: 0,
       m_value: 0,
       m_count:0,//当前显示的数字 
       goNextNode:
       {
           default: null,
           type: cc.Node,
       },
    },

    // use this for initialization
    onLoad: function () {
        //cc.game.setFrameRate(1);
        
    },  

    setTimerData:function(){
        this.m_newData += 60;
        this.m_distance = (this.m_newData - this.m_oldData) * 60 - this.m_speed;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.m_distance > 0){
            this.m_speed = (this.m_distance) / 600;
            this.m_distance -= this.m_speed;
            if(this.m_distance < 0.01){
                this.m_distance = 0;
            }
            this.round();
            cc.log("sp"+this.m_speed+"      dis"+this.m_distance + "    delta" + this.m_delta);
        }
    },
    
    initData:function(destCount){
        this.m_newData = destCount;
        this.m_distance = (this.m_newData - this.m_oldData) * 60 - this.m_speed;
    },
    
    nextRund:function(speed){
        this.m_speed = speed / 10;
        cc.log("speed",this.m_speed); 
        this.round();
    },

    //round
    round:function(){
        if(this.m_speed >= 60){//针对速度非常快 比如一帧10000
            //首先做进位运算
            var count = parseInt(this.m_speed / 60);//进位数
            this.m_oldData += count;
            this.setNum(count);
            //改变数字
            cc.log("count"+count+"      dis"+this.m_distance+ "delta" + this.m_delta);
            var subMoveSpeed = this.m_speed - count * 60;//进位之后的move
            this.movePlus(subMoveSpeed);
        }else{//速度很小
            this.movePlus(this.m_speed);
        }
        if(this.goNextNode){
            var scriptS = this.goNextNode.getComponent("test");
            scriptS.nextRund(this.m_speed);
        }
    },

    setNum:function(count){
        for(let i = 0; i < this.labelArray.length; i++){
            let label = this.labelArray[i];
            var oldNu = parseInt(label.getComponent('cc.Label').string);
            var newNu = (oldNu + count) % 10;
            label.getComponent('cc.Label').string = newNu;
        }
    },

    //move plus
    movePlus:function(speed){
        var j = this.labelArray.length;
        for(let i = 0; i < j; i++){
            let label = this.labelArray[i];
            label.y -= speed;
            if(label.y <= -60){
                this.m_delta = -60.00 - label.y;
                this.justPos();
                i = -1;
                j--;
            }
        }
    },

    //
    justPos:function(){
        if(this.m_isFirst){
            this.m_oldData ++;
        }
        let label = this.labelArray.shift();
        var count = parseInt(label.getComponent('cc.Label').string);
        count = (count + 3) % 10;
        label.getComponent('cc.Label').string = count;
        label.y = 120 - this.m_delta;
        this.labelArray.push(label);
    },
    //
    setNumber:function(){
        
    }
    
    
});
