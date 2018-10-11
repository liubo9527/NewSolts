var cubeS = require("cube");
var Game = require("Game");
cc.Class({
    extends: cc.Component,

    properties: {
        unitIndex:-1,

       cube_array:[],
       m_controlSpeed:1000,//控制加速
       m_speed:0,//当前速度
       m_moveDis:0,//移动距离
       m_start:false,
       m_deltaDis:0,
       
       m_totalDis:0,
       m_stopDis:0,
       m_stopFlag:false,
       stopData_array:[],
       dataIndex:0,
       onceFlag:false,
       isSpecialModel:false,//大丰收模式
       onFunction:null,
       nameArray:null,//
    },

    // use this for initialization
    onLoad: function () {
        this.onFunction = cc.find('Canvas').getComponent('Game');
        this.cube_array = [];
        this.nameArray = ["WW","FG","M1","M2","M3","F4","F5","F6","F7","F8"];
        this.m_controlSpeed = 1000;
        for(var i = 0; i < 6; i++){
            var cubeName = "cube" + ""+(i+1);
            var cube = this.node.getChildByName(cubeName);
            var cubeScript = cube.getComponent(cubeS);
            var rand = parseInt(Math.random()*10);
            var nameStr = this.nameArray[rand];
            cubeScript.setCube(nameStr);
            this.cube_array.push(cube);
        }
        this.m_start = false;
    },

    startRound:function(){
        this.onceFlag = false;
        this.m_speed = 200;
        this.m_controlSpeed = 2000;
        this.dataIndex = 0;
        this.m_start = true;
        this.m_stopFlag = false;
        this.m_stopDis = 0;
    },

   hiddleCube:function(){
        this.isSpecialModel = false;
        for(var i = 5; i >= 0; i--){
            var cube = this.cube_array[i];
            cube.getComponent(cubeS).stopAni();
        }
    },

    setStopDataArray:function(stopData_array, index,isSpecialModel){
        this.nameArray = ["WW","FG","M1","M2","M3","F4","F5","F6","F7","F8"];
        if(index == 1){
            this.isSpecialModel = isSpecialModel;
        }else{
            this.isSpecialModel = false;
        }
        this.stopData_array = null;
        this.stopData_array = stopData_array.concat();
        //最后放2个随机图
        for(var i = 0; i < 2; i++){
            var rand = parseInt(Math.random()*10);
            var nameStr = this.nameArray[rand];
            this.stopData_array.push(nameStr);
        }
        this.unitIndex = index;
    },

    setIsSpecialModel:function(flag){
        this.isSpecialModel = flag;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.m_start){
            this.soltsRound(dt);
        }
    },

    getCubeArray:function(){
        return  this.cube_array;
    },
    
    //soltsRound
    soltsRound:function(dt){
        if(dt > 0.032){
            dt = 0.032;
        }
        this.m_speed = this.m_speed + (this.m_controlSpeed - this.m_speed) * dt * 4;
        this.m_moveDis = this.m_speed * dt;
        this.m_totalDis += this.m_moveDis;
        for(var i = 5; i >= 0; i--){
            var cube = this.cube_array[i];
            cube.y = cube.y - this.m_moveDis;
            if(cube.y < - 112.5){//换顺序  
                this.m_deltaDis = -112.5 - cube.y;
                this.restPosAndArray();
            }
        }
        if((this.m_stopDis + 60 <= this.m_totalDis) && this.m_stopFlag === true){
            this.m_start = false;
            //回弹
            this.kickAction();
        }
    },


    
    kickAction:function(){
        var outDis = 112.5- this.cube_array[0].y;
        this.onceFlag = false;
        for(var i = 0; i < 6; i++){
            var cube = this.cube_array[i];
            var moveBy = cc.moveBy(0.1, cc.p(0,outDis));
            let callback = cc.callFunc(this.judgeLastRound, this);
            let seq = cc.sequence(moveBy,callback)
            cube.runAction(seq); 
        }
    },

    judgeLastRound:function(){
        if((this.unitIndex == 5) &&(this.dataIndex == 6)){
            if(this.onceFlag == false){
                this.onceFlag =true;
                this.scheduleOnce(this.allRoundEnded, 1);
            }
        }else{
            if((this.isSpecialModel == true) && (this.unitIndex == 1) && (this.dataIndex == 6) ){
                this.cube_array[3].getComponent(cubeS).playAni();
                this.cube_array[2].getComponent(cubeS).playAni();
                this.cube_array[1].getComponent(cubeS).playAni();
                this.cube_array[0].getComponent(cubeS).playAni();
                this.onFunction.setUnitSpecialModel();
            }
           
        }
    },
    
    allRoundEnded:function(){
        this.onFunction.roundEnded();
    },
    //
    restPosAndArray:function(){
        var tempCube = this.cube_array.shift()
        tempCube.y = 1237.5 - this.m_deltaDis;
        this.cube_array.push(tempCube);
        var nameStr = "";
        if(this.m_stopFlag == false){
            var rand = parseInt(Math.random()*10);
            nameStr = this.nameArray[rand];
        }else{
            var nameStr = this.stopData_array[this.dataIndex];
            if((this.isSpecialModel == true) && (nameStr == "WW") && (this.dataIndex < 4) && (this.unitIndex!= 1)){
                tempCube.getComponent(cubeS).playAni();
            }
            this.dataIndex++;
        }
        tempCube.getComponent(cubeS).setCube(nameStr);
    },
    
    stopRound:function(){
        if(this.m_stopFlag == false){
            this.m_controlSpeed = 500;
            this.m_stopDis = this.cube_array[5].y - 112.5;
            this.m_stopFlag = true;
            this.m_totalDis = 0;
            //换第一个
            var nameStr = this.stopData_array[this.dataIndex];
            this.cube_array[5].getComponent(cubeS).setCube(nameStr);
            var nameStr = this.stopData_array[this.dataIndex];
            if((this.isSpecialModel == true) && (nameStr == "WW") && (this.dataIndex < 4) && (this.unitIndex!= 1)){
                this.cube_array[5].getComponent(cubeS).playAni();
            }
            this.dataIndex++;
        }
    },
});









