"use strict";
cc._RFpush(module, '99d45zrlWpHsIYxTfPW5mPW', 'number');
// Script/number.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        labelArray: {
            default: [],
            type: [cc.Sprite]
        },
        //
        textureArray: {
            default: [],
            type: [cc.SpriteFrame]
        },
        m_speed: 1,
        m_isFirst: true,
        m_distance: 0,
        m_moveCountDis: 0,
        m_delta: 0,
        m_oldData: 0,
        m_newData: 0,
        m_height: 0,
        goNextNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.m_height = 70;
        //cc.game.setFrameRate(1);
        this.initNumber(0);
    },

    initNumber: function initNumber(number) {
        for (var i = 0; i < this.labelArray.length; i++) {
            var label = this.labelArray[i];
            this.setOneNumber(label, number + i);
            label.node.y = i * this.m_height;
        }
    },

    initData: function initData(destCount) {
        if (destCount >= this.m_newData) {
            this.m_distance += (destCount - this.m_newData) * this.m_height;
            this.m_newData = destCount;
        } else {
            this.resetZero();
        }
    },

    //奖池归零
    resetZero: function resetZero() {
        this.initNumber(0);
        this.m_oldData = 0;
        this.m_newData = 0;
        this.m_moveCountDis = 0;
        this.m_distance = 0;
        if (this.goNextNode) {
            var scriptS = this.goNextNode.getComponent("number");
            scriptS.resetZero();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.m_distance > 0) {
            this.round();
        }
    },

    nextPluss: function nextPluss(count) {
        this.m_distance += count * this.m_height;
    },

    //round
    round: function round() {
        this.m_speed = this.m_distance / 15;
        //针对差值太大对速度进行处理 比如奖池变化从0到9000000
        if (this.m_speed < 1) {
            //最小速度限制
            this.m_speed = 1;
        }
        this.m_distance -= this.m_speed;
        this.m_moveCountDis += this.m_speed;
        if (this.m_moveCountDis > this.m_height * 10) {
            //进位判断
            var plusCount = parseInt(this.m_moveCountDis / (this.m_height * 10));
            this.m_moveCountDis -= this.m_height * 10 * plusCount;
            //进位判断
            if (this.goNextNode) {
                var scriptS = this.goNextNode.getComponent("number");
                scriptS.nextPluss(plusCount);
            }
        }
        if (this.m_speed >= 60) {
            //针对速度非常快 比如0变到900000000
            //首先做进位运算
            var count = parseInt(this.m_speed / this.m_height); //进位数
            this.m_oldData += count;
            this.setNum(count);
            var subMoveSpeed = this.m_speed - count * this.m_height; //进位之后的move
            this.movePlus(subMoveSpeed);
        } else {
            //速度很小
            this.movePlus(this.m_speed);
        }
    },

    setNum: function setNum(count) {
        for (var i = 0; i < this.labelArray.length; i++) {
            var label = this.labelArray[i];
            var oldNu = parseInt(label.m_number);
            var newNu = (oldNu + count) % 10;
            this.setOneNumber(label, newNu);
        }
    },

    //move plus
    movePlus: function movePlus(speed) {
        var j = this.labelArray.length;
        for (var i = 0; i < j; i++) {
            var label = this.labelArray[i];
            label.node.y -= speed;
            if (label.node.y <= -(this.m_height * 2)) {
                this.m_delta = -(this.m_height * 2) - label.node.y;
                this.justPos();
                i = -1;
                j--;
            }
        }
    },

    //
    justPos: function justPos() {
        if (this.m_isFirst) {
            this.m_oldData++;
        }
        var label = this.labelArray.shift();
        var number = label.m_number;
        number = (number + 4) % 10;
        this.setOneNumber(label, number);
        label.node.y = this.m_height * 2 - this.m_delta;
        this.labelArray.push(label);
    },
    //设置某一个数字
    setOneNumber: function setOneNumber(label, number) {
        label.m_number = number;
        label.spriteFrame = this.textureArray[number];
    }
});

cc._RFpop();