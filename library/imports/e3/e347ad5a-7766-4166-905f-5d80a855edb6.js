"use strict";
cc._RF.push(module, 'e347a1ad2ZBZpBfXYCoVe22', 'WinAni');
// Script/WinAni.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_xx1: {
            default: null,
            type: cc.Sprite
        },
        m_xx2: {
            default: null,
            type: cc.Sprite
        },
        m_xx3: {
            default: null,
            type: cc.Sprite
        },
        m_xx4: {
            default: null,
            type: cc.Sprite
        },
        m_xx5: {
            default: null,
            type: cc.Sprite
        },
        m_xx6: {
            default: null,
            type: cc.Sprite
        },
        m_xx7: {
            default: null,
            type: cc.Sprite
        },
        m_xx8: {
            default: null,
            type: cc.Sprite
        },
        m_xx9: {
            default: null,
            type: cc.Sprite
        },

        m_xx10: {
            default: null,
            type: cc.Sprite
        },

        m_xx11: {
            default: null,
            type: cc.Sprite
        },

        m_xx12: {
            default: null,
            type: cc.Sprite
        },
        m_xx13: {
            default: null,
            type: cc.Sprite
        },
        m_xx14: {
            default: null,
            type: cc.Sprite
        },
        m_xx15: {
            default: null,
            type: cc.Sprite
        },
        m_xx16: {
            default: null,
            type: cc.Sprite
        },
        m_xx17: {
            default: null,
            type: cc.Sprite
        },
        m_xx18: {
            default: null,
            type: cc.Sprite
        },
        m_1xx1: {
            default: null,
            type: cc.Sprite
        },
        m_1xx2: {
            default: null,
            type: cc.Sprite
        },
        m_1xx3: {
            default: null,
            type: cc.Sprite
        },
        m_1xx4: {
            default: null,
            type: cc.Sprite
        },
        m_1xx5: {
            default: null,
            type: cc.Sprite
        },
        m_1xx6: {
            default: null,
            type: cc.Sprite
        },
        m_1xx7: {
            default: null,
            type: cc.Sprite
        },
        m_1xx8: {
            default: null,
            type: cc.Sprite
        },
        m_1xx9: {
            default: null,
            type: cc.Sprite
        },

        m_1xx10: {
            default: null,
            type: cc.Sprite
        },

        m_1xx11: {
            default: null,
            type: cc.Sprite
        },

        m_1xx12: {
            default: null,
            type: cc.Sprite
        },
        m_1xx13: {
            default: null,
            type: cc.Sprite
        },
        m_1xx14: {
            default: null,
            type: cc.Sprite
        },
        m_1xx15: {
            default: null,
            type: cc.Sprite
        },
        m_1xx16: {
            default: null,
            type: cc.Sprite
        },
        m_1xx17: {
            default: null,
            type: cc.Sprite
        },
        m_1xx18: {
            default: null,
            type: cc.Sprite
        }

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.zIndex = 18;

        //测试
        /*var timeCallback = function (dt)
        {
           this.aniStart();
           this.aniStartTwo();
            
        }
        
        this.scheduleOnce(timeCallback, 2);*/
    },

    hideAll: function hideAll() {
        this.m_xx1.node.active = false;
        this.m_xx2.node.active = false;
        this.m_xx3.node.active = false;
        this.m_xx4.node.active = false;
        this.m_xx5.node.active = false;
        this.m_xx6.node.active = false;
        this.m_xx7.node.active = false;
        this.m_xx8.node.active = false;
        this.m_xx9.node.active = false;
        this.m_xx10.node.active = false;
        this.m_xx11.node.active = false;
        this.m_xx12.node.active = false;
        this.m_xx13.node.active = false;
        this.m_xx14.node.active = false;
        this.m_xx15.node.active = false;
        this.m_xx16.node.active = false;
        this.m_xx17.node.active = false;
        this.m_xx18.node.active = false;
        this.m_1xx1.node.active = false;
        this.m_1xx2.node.active = false;
        this.m_1xx3.node.active = false;
        this.m_1xx4.node.active = false;
        this.m_1xx5.node.active = false;
        this.m_1xx6.node.active = false;
        this.m_1xx7.node.active = false;
        this.m_1xx8.node.active = false;
        this.m_1xx9.node.active = false;
        this.m_1xx10.node.active = false;
        this.m_1xx11.node.active = false;
        this.m_1xx12.node.active = false;
        this.m_1xx13.node.active = false;
        this.m_1xx14.node.active = false;
        this.m_1xx15.node.active = false;
        this.m_1xx16.node.active = false;
        this.m_1xx17.node.active = false;
        this.m_1xx18.node.active = false;
    },

    aniStart: function aniStart() {
        //初始化位置和透明度
        //this.m_xx4.node.opacity = 255;
        //this.m_xx3.node.rotation = 255;
        this.m_xx1.node.active = true;
        this.m_xx2.node.active = true;
        this.m_xx3.node.active = true;
        this.m_xx4.node.active = true;
        this.m_xx5.node.active = true;
        this.m_xx7.node.active = true;
        this.m_xx8.node.active = true;
        this.m_xx9.node.active = true;
        this.m_xx10.node.active = true;
        this.m_xx11.node.active = true;
        this.m_xx12.node.active = true;
        this.m_xx13.node.active = true;
        this.m_xx14.node.active = true;
        this.m_xx15.node.active = true;
        this.m_xx16.node.active = true;
        this.m_xx17.node.active = true;
        this.m_xx18.node.active = true;
        this.m_1xx1.node.active = true;
        this.m_1xx2.node.active = true;
        this.m_1xx3.node.active = true;
        this.m_1xx4.node.active = true;
        this.m_1xx5.node.active = true;
        this.m_1xx7.node.active = true;
        this.m_1xx8.node.active = true;
        this.m_1xx9.node.active = true;
        this.m_1xx10.node.active = true;
        this.m_1xx11.node.active = true;
        this.m_1xx12.node.active = true;
        this.m_1xx13.node.active = true;
        this.m_1xx14.node.active = true;
        this.m_1xx15.node.active = true;
        this.m_1xx16.node.active = true;
        this.m_1xx17.node.active = true;
        this.m_1xx18.node.active = true;

        this.m_xx1.node.x = 270;this.m_xx1.node.y = 920;
        this.m_xx2.node.x = -387;this.m_xx2.node.y = 889;
        this.m_xx3.node.x = 236;this.m_xx3.node.y = 977;
        this.m_xx4.node.x = -120;this.m_xx4.node.y = 870;
        this.m_xx5.node.x = -360;this.m_xx5.node.y = 950;
        this.m_xx6.node.x = 0;this.m_xx6.node.y = 970;
        this.m_xx7.node.x = 0;this.m_xx7.node.y = 870;
        this.m_xx8.node.x = 70;this.m_xx8.node.y = 970;
        this.m_xx9.node.x = 180;this.m_xx9.node.y = 880;
        this.m_xx10.node.x = 0;this.m_xx10.node.y = 1000;
        this.m_xx11.node.x = 250;this.m_xx11.node.y = 910;
        this.m_xx12.node.x = 200;this.m_xx12.node.y = 990;
        this.m_xx13.node.x = 360;this.m_xx13.node.y = 860;
        this.m_xx14.node.x = 340;this.m_xx14.node.y = 980;
        this.m_xx15.node.x = 470;this.m_xx15.node.y = 930;
        this.m_xx16.node.x = -260;this.m_xx16.node.y = 1030;
        this.m_xx17.node.x = -287;this.m_xx17.node.y = 866;
        this.m_xx18.node.x = -460;this.m_xx18.node.y = 932;

        this.m_1xx1.node.x = -443;this.m_1xx1.node.y = 1398;
        this.m_1xx2.node.x = -494;this.m_1xx2.node.y = 1300;
        this.m_1xx3.node.x = -391;this.m_1xx3.node.y = 1702;
        this.m_1xx4.node.x = -148;this.m_1xx4.node.y = 1207;
        this.m_1xx5.node.x = -306;this.m_1xx5.node.y = 1287;
        this.m_1xx6.node.x = 208;this.m_1xx6.node.y = 1825;
        this.m_1xx7.node.x = 272;this.m_1xx7.node.y = 1207;
        this.m_1xx8.node.x = 88;this.m_1xx8.node.y = 1417;
        this.m_1xx9.node.x = 452;this.m_1xx9.node.y = 1320;
        this.m_1xx10.node.x = 322;this.m_1xx10.node.y = 1653;
        this.m_1xx11.node.x = 522;this.m_1xx11.node.y = 1378;
        this.m_1xx12.node.x = -81;this.m_1xx12.node.y = 1702;
        this.m_1xx13.node.x = 351;this.m_1xx13.node.y = 1320;
        this.m_1xx14.node.x = 338;this.m_1xx14.node.y = 1501;
        this.m_1xx15.node.x = -401;this.m_1xx15.node.y = 1477;
        this.m_1xx16.node.x = 12;this.m_1xx16.node.y = 1321;
        this.m_1xx17.node.x = -157;this.m_1xx17.node.y = 1573;
        this.m_1xx18.node.x = -190;this.m_1xx18.node.y = 1415;

        var moveDes = -3300;
        //x1 动画 cc.easeBounceOut() cc.easeElasticOut(0.8)
        var action_1 = cc.moveBy(3, cc.p(0, moveDes));
        var action_2 = cc.moveBy(3.1, cc.p(0, moveDes)); //cc.easeElasticOut(3.0)
        var action_3 = cc.moveBy(3.25, cc.p(0, moveDes));
        var action_4 = cc.moveBy(3, cc.p(0, moveDes));
        var action_5 = cc.moveBy(3.25, cc.p(0, moveDes));
        var action_6 = cc.moveBy(3.25, cc.p(0, moveDes));
        var action_7 = cc.moveBy(3, cc.p(0, moveDes));
        var action_8 = cc.moveBy(3, cc.p(0, moveDes));
        var action_9 = cc.moveBy(3, cc.p(0, moveDes));
        var action_10 = cc.moveBy(3, cc.p(0, moveDes));
        var action_12 = cc.moveBy(3, cc.p(0, moveDes)); //cc.easeElasticOut(3.0
        var action_13 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action_14 = cc.moveBy(3, cc.p(0, moveDes));
        var action_15 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action_16 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action_17 = cc.moveBy(3, cc.p(0, moveDes));
        var action_18 = cc.moveBy(3, cc.p(0, moveDes));
        var action_19 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_1 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_2 = cc.moveBy(3.1, cc.p(0, moveDes)); //cc.easeElasticOut(3.0)
        var action1_3 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_4 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_5 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_6 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_7 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_8 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_9 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_10 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_12 = cc.moveBy(3, cc.p(0, moveDes)); //cc.easeElasticOut(3.0
        var action1_13 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_14 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_15 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_16 = cc.moveBy(3.1, cc.p(0, moveDes));
        var action1_17 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_18 = cc.moveBy(3, cc.p(0, moveDes));
        var action1_19 = cc.moveBy(3, cc.p(0, moveDes));

        this.m_xx1.node.runAction(action_1);
        this.m_xx2.node.runAction(action_2);
        this.m_xx3.node.runAction(action_3);
        this.m_xx4.node.runAction(action_4);
        this.m_xx5.node.runAction(action_5);
        this.m_xx6.node.runAction(action_6);
        this.m_xx7.node.runAction(action_7);
        this.m_xx8.node.runAction(action_8);
        this.m_xx9.node.runAction(action_9);
        this.m_xx10.node.runAction(action_10);
        this.m_xx11.node.runAction(action_12);
        this.m_xx12.node.runAction(action_13);
        this.m_xx13.node.runAction(action_14);
        this.m_xx14.node.runAction(action_15);
        this.m_xx15.node.runAction(action_16);
        this.m_xx16.node.runAction(action_17);
        this.m_xx17.node.runAction(action_18);
        this.m_xx18.node.runAction(action_19);

        this.m_1xx1.node.runAction(action1_1);
        this.m_1xx2.node.runAction(action1_2);
        this.m_1xx3.node.runAction(action1_3);
        this.m_1xx4.node.runAction(action1_4);
        this.m_1xx5.node.runAction(action1_5);
        this.m_1xx6.node.runAction(action1_6);
        this.m_1xx7.node.runAction(action1_7);
        this.m_1xx8.node.runAction(action1_8);
        this.m_1xx9.node.runAction(action1_9);
        this.m_1xx10.node.runAction(action1_10);
        this.m_1xx11.node.runAction(action1_12);
        this.m_1xx12.node.runAction(action1_13);
        this.m_1xx13.node.runAction(action1_14);
        this.m_1xx14.node.runAction(action1_15);
        this.m_1xx15.node.runAction(action1_16);
        this.m_1xx16.node.runAction(action1_17);
        this.m_1xx17.node.runAction(action1_18);
        this.m_1xx18.node.runAction(action1_19);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();