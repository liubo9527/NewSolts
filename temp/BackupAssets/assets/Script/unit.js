var cubeS = require("cube");
cc.Class({
    extends: cc.Component,

    properties: {
       cube_array:[],
       m_controlSpeed:1000,//控制加速
       m_speed:0,//当前速度
       m_moveDis:0,//移动距离
       m_start:true,
       m_deltaDis:0,
       
       m_totalDis:0,
       m_stopDis:0,
       m_stopFlag:false,
    },

    // use this for initialization
    onLoad: function () {
        this.cube_array = [];
        this.m_controlSpeed = 1000;
        for(var i = 0; i < 6; i++){
            var cubeName = "cube" + ""+(i+1);
            cc.log(cubeName);
            var cube = this.node.getChildByName(cubeName);
            var cubeScript = cube.getComponent(cubeS);
            cubeScript.setCube("FG");
            this.cube_array.push(cube);
        }
        this.m_start = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.m_start){
            this.soltsRound(dt);
        }
        //cc.log(this.m_stopDis+"::::"+this.m_totalDis);
    },
    
    //soltsRound
    soltsRound:function(dt){
        this.m_speed = this.m_speed + (this.m_controlSpeed - this.m_speed) * dt * 2;
        this.m_moveDis = this.m_speed * dt;
        this.m_totalDis += this.m_moveDis;
        for(var i = 5; i >= 0; i--){
            var cube = this.cube_array[i];
            cube.y = cube.y - this.m_moveDis;
            if(cube.y < - 216){//换顺序  
                this.m_deltaDis = -216 - cube.y;
                this.restPosAndArray();
            }
        }
        if((this.m_stopDis + 60 <= this.m_totalDis) && this.m_stopFlag === true){
            this.m_start = false;
            this.m_start = false;
            //回弹
            this.kickAction();
        }
    },
    
    kickAction:function(){
        var outDis = - this.cube_array[0].y;
        for(var i = 0; i < 6; i++){
            var cube = this.cube_array[i];
            var moveBy = cc.moveBy(0.1, cc.p(0,outDis));
            cube.runAction(moveBy); 
        }
    },
    
    //
    restPosAndArray:function(){
        var tempCube = this.cube_array.shift()
        tempCube.y = 216 * 5 - this.m_deltaDis;
        this.cube_array.push(tempCube);
        var nameArray = ["WW","FG","M1","M2","M3","F4","F5","F6","F7","F8"];
        var rand = parseInt(Math.random()*10);
        var nameStr = nameArray[rand];
        cc.log(":::::::::"+nameStr);
        tempCube.getComponent(cubeS).setCube(nameStr);
    },
    
    stopRound:function(){
        this.m_controlSpeed = 500;
        this.m_stopDis = this.cube_array[5].y;
        this.m_stopFlag = true;
        this.m_totalDis = 0;
       
    },
});









