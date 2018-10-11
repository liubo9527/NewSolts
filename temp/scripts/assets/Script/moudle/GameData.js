"use strict";
cc._RFpush(module, '899c23LXUhI6rq2cZd32fl3', 'GameData');
// Script/moudle/GameData.js

"use strict";

var NetData = require("NetData");

//中奖线对象
var LineResult = cc.Class({
    properties: {
        amount: 0, //该条线中奖总金额/免费游戏次数
        locations: { //中奖线坐标位置/免费游戏图标位置  [1,2,3,4,5]
            default: [],
            serializable: false
        },
        num: 0, //中奖连线个数/免费图标的个数
        picCode: 0 }
});

//跑马灯对象
var MarqueeInfo = cc.Class({
    properties: {
        uid: "", //用户ID
        type: "", //中奖类型
        msg: "", //跑马灯信息
        date: "" }
});

//恢复数据对象
var RecoverData = cc.Class({
    properties: {
        recoverType: 0, //恢复的游戏类型(0:普通游戏1,特殊游戏，2：奖池 3:免费游戏)
        hasFreeGame: 0, //0：没有，1 有
        freeGameLeftTimes: 0, //免费游戏剩余次数
        freeGameTotalTimes: 0,
        ticketNo: "", //订单(票)号
        //票数据,双层对象数组 
        //[["WW","F6","M5","F10","M1","WW","F6","F8","F6","M1","WW","F8","F8","F7","F9","WW","M3","M4","F6","F6"]]
        //如果为大丰收，数组大小为2，正常为1
        ticketData: [],
        freeResult: { //
            default: [],
            type: [LineResult],
            serializable: false
        },
        step: 0, //免费游戏的步数
        orderResult: [], //投注结果
        specialResultLocation: [], //大丰收 特殊图案位置
        mulriple: "", //投注倍数
        lineNum: "", //投注线数
        bonusAmount: 0 }
});

var JackPotInfo = cc.Class({
    properties: {
        bet: 0, //倍数
        poolMin: 0, //最大值
        poolMax: 0,
        minBouns: 0,
        floatRate: 0,
        maxBouns: 0,
        probability: 0,
        tigerProbability: 0

    }
});

//  游戏列表对象
var GameListData = cc.Class({
    properties: {
        time: "",
        payAmount: 0, //投注总金额
        no: "", //订单号
        bonusAmount: 0, //总奖金
        status: 0 }
});

//初始化对象
var InitData = cc.Class({
    properties: {
        status: 0, //0：启动,1:恢复           
        gameName: "", //游戏名称
        gameIcon: "", //游戏图标url
        currency: "", //币种
        currencyIcon: "", //币种图片链接url
        mulriples: [], //倍数列表,int数组
        lineNums: [], //线数列表
        balance: "", //余额
        playTime: "", //游戏时间,用于判断不同手机登录
        defaultMulriple: 0, //默认倍数,记录用户上次行为
        defaultLineNum: 0, //默认线数
        helpRule: "", //帮助规则链接
        poolVisiable: 1, //奖池是否显示 0不显示 1显示
        marqueeInfos: { //跑马灯信息
            default: [],
            serializable: false
        },
        recoverData: { //恢复数据
            default: null,
            serializable: false
        }
    },

    parseInitData: function parseInitData(data) {
        // data="{ \"status\": 0, \"gameName\": \"老虎机\", \"gameIcon\": \"\", \"currency\": \"\", \"currencyIcon\": \"\", \"mulriples\": [ 1, 2, 3, 4, 5 ], \"lineNums\": [ 10, 20, 30, 40, 50 ], \"balance\": 1000, \"playTime\": 0, \"defaultMulriple\": 0, \"defaultLine\": 0, \"helpRule\": \"\", \"poolVisiable\": 1, \"marqueeInfos\": [ { \"uid\": \"\", \"type\": \"\", \"msg\": \"恭喜你中奖啦\", \"date\": \"\" }, { \"uid\": \"\", \"type\": \"\", \"msg\": \"哈哈哈，你没中奖\", \"date\": \"\" } ], \"recoverData\": { \"gameType\": 0, \"hasFreeGame\": 0, \"freeGameLeftTimes\": 10, \"ticketNo\": 1232156518, \"ticketData\": [ [ \"WW\", \"F6\", \"M2\", \"F7\", \"M1\", \"WW\", \"F6\", \"F8\", \"F6\", \"M1\", \"WW\", \"F8\", \"F8\", \"F7\", \"F4\", \"WW\", \"M3\", \"M1\", \"F6\", \"F6\" ], [ \"WW\", \"F6\", \"M3\", \"F10\", \"M1\", \"WW\", \"F6\", \"F5\", \"F7\", \"M2\", \"WW\", \"F8\", \"F8\", \"F7\", \"F4\", \"WW\", \"M1\", \"M4\", \"F7\", \"F6\" ] ], \"orderResult\": [ { \"amount\": 100, \"line\": [ 0, 6, 7, 8, 14 ], \"num\": 5, \"picCode\": \"F4\" }, { \"amount\": 200, \"line\": [ 5, 1, 2, 3, 9 ], \"num\": 5, \"picCode\": \"F5\" } ] }, \"mulriple\": 1, \"lineNum\": 50, \"bonusAmount\": 0 }";
        cc.log(data);
        var objRoot = JSON.parse(data);
        // var initResult=new InitData();
        this.status = objRoot.status;
        this.gameName = objRoot.gameName;
        this.gameIcon = objRoot.gameIcon;
        this.currency = objRoot.currency;
        this.currencyIcon = objRoot.currencyIcon;
        this.mulriples = objRoot.mulriples;
        this.lineNums = objRoot.lineNums;
        this.balance = objRoot.balance;
        this.playTime = objRoot.playTime;
        this.defaultMulriple = objRoot.defaultMulriple;
        this.defaultLineNum = objRoot.defaultLineNum;
        this.helpRule = objRoot.helpRule;
        // this.skin = objRoot.skin;
        // this.extend = objRoot.extend; 去掉 换肤全部配置都写在前端了
        this.historyPool = objRoot.historyPool;
        this.poolVisiable = objRoot.poolVisiable;
        this.parseMarqueeInfo(objRoot.marqueeInfoList);
        this.parseRecoverData(objRoot.recoverData);
        this.tip = objRoot.tip;
        var netData = NetData.NetData.getInst();
        netData.InitResult = this;

        var poolResult = new PoolUpdate();
        poolResult.poolBouns = objRoot.poolBouns;
        poolResult.poolVisiable = objRoot.poolVisiable;
        netData.PoolResult = poolResult;

        //2017-3-2 新加规则
        netData.poolRules.length = 0;
        netData.poolRules = objRoot.poolRule;
    },

    parseMarqueeInfo: function parseMarqueeInfo(data) {
        if (data == null || data == undefined || data == "") {
            return;
        }
        for (var i = 0; i < data.length; ++i) {
            var marqueeInfo = new MarqueeInfo();
            marqueeInfo.uid = data[i].uid;
            marqueeInfo.type = data[i].type;
            marqueeInfo.msg = data[i].msg;
            marqueeInfo.date = data[i].date;
            this.marqueeInfos.push(marqueeInfo);
            cc.log("marqueeInfos" + data[i].msg);
        }
    },

    parseRecoverData: function parseRecoverData(data) {
        if (data == null || data == undefined || data == "") {
            return;
        }
        var recoverData = new RecoverData();
        var recoverDataObj = data;
        recoverData.recoverType = recoverDataObj.recoverType;
        recoverData.hasFreeGame = recoverDataObj.hasFreeGame;
        recoverData.freeGameLeftTimes = recoverDataObj.freeGameLeftTimes;
        recoverData.ticketNo = recoverDataObj.ticketNo;
        recoverData.ticketData = recoverDataObj.ticketData;
        recoverData.step = recoverDataObj.step;
        recoverData.specialResultLocation = recoverDataObj.specialResultLocation;
        recoverData.orderResult = recoverDataObj.orderResult;
        // recoverData.orderResult=this.parseOrderResult(recoverDataObj.orderResult);
        recoverData.freeResult = recoverDataObj.freeResult;
        recoverData.mulriple = recoverDataObj.mulriple;
        recoverData.lineNum = recoverDataObj.lineNum;
        recoverData.bonusAmount = recoverDataObj.bonusAmount;
        recoverData.freeGameTotalTimes = recoverDataObj.freeGameTotalTimes;
        this.recoverData = recoverData;
    }

});

//投注响应对象
var BetResult = cc.Class({
    properties: {
        resultType: 0, //0:普通 ,1丰收
        freeGameLeftTimes: 0, //免费游戏剩余次数
        hasFreeGame: 0, //0：没有，1有
        ticketNo: "", //订单(票)号
        poolVisiable: 1, //奖池是否显示  1显示  0不显示  默认是1
        //票数据,双层对象数组 
        //[["WW","F6","M5","F10","M1","WW","F6","F8","F6","M1","WW","F8","F8","F7","F9","WW","M3","M4","F6","F6"]]
        //如果为大丰收，数组大小为2，正常为1
        ticketData: [],
        specialResultLocation: [], //大丰收 特殊图案位置
        orderResult: [], //投注结果
        freeResult: { //
            default: [],
            type: [LineResult],
            serializable: false
        },
        totalBouns: 0 },

    parseBetResult: function parseBetResult(data) {
        // data="{ \"resultType\": 1, \"freeGameLeftTimes\": 0, \"hasFreeGame\": 0, \"ticketNo\": 12131511, \"poolVisiable\": 1, \"ticketData\": [ [ \"WW\", \"F6\", \"M2\", \"F7\", \"M1\", \"WW\", \"F6\", \"F8\", \"F6\", \"M1\", \"WW\", \"F8\", \"F8\", \"F7\", \"F4\", \"WW\", \"M3\", \"M1\", \"F6\", \"F6\" ], [ \"WW\", \"F6\", \"M3\", \"F10\", \"M1\", \"WW\", \"F6\", \"F5\", \"F7\", \"M2\", \"WW\", \"F8\", \"F8\", \"F7\", \"F4\", \"WW\", \"M1\", \"M4\", \"F7\", \"F6\" ] ], \"orderResult\": [ { \"amount\": 100, \"line\": [ 0, 6, 7, 8, 14 ], \"num\": 5, \"picCode\": \"F4\" }, { \"amount\": 200, \"line\": [ 5, 1, 2, 3, 9 ], \"num\": 5, \"picCode\": \"F5\" } ], \"totalBouns\": 10000 }";
        cc.log(data);
        var objRoot = JSON.parse(data);
        this.resultType = objRoot.resultType;
        this.freeGameLeftTimes = objRoot.freeGameLeftTimes;
        this.hasFreeGame = objRoot.hasFreeGame;
        this.ticketNo = objRoot.ticketNo;
        this.poolVisiable = objRoot.poolVisiable;
        this.ticketData = objRoot.ticketData;
        // this.orderResult=this.parseOrderResult(objRoot.orderResult);
        // this.freeResult=this.parseOrderResult(objRoot.freeResult);
        this.specialResultLocation = objRoot.specialResultLocation;
        this.orderResult = objRoot.orderResult;
        this.freeResult = objRoot.freeResult;
        this.totalBouns = objRoot.totalBouns;

        var netData = NetData.NetData.getInst();
        netData.BetResult = this;
    }

});
//结算响应对象
var SettleData = cc.Class({
    properties: {
        bonusStatus: "", //中奖状态
        bonusDesc: "", //中奖描述
        bonusAmount: "", //中奖额度
        poolVisiable: 1, //奖池是否显示  0不显示  1显示  
        bonusData: "" },
    parseSettleData: function parseSettleData(data) {
        // data="{ \"bonusStatus\": 1, \"bonusDesc\": \"you win\", \"bonusAmount\": 11000, \"poolVisiable\": 1, \"bonusData\": \"\" }";
        cc.log(data);
        var objRoot = JSON.parse(data);
        this.bonusStatus = objRoot.bonusStatus;
        this.bonusDesc = objRoot.bonusDesc;
        this.bonusAmount = objRoot.bonusAmount;
        this.poolVisiable = objRoot.poolVisiable;
        this.bonusData = objRoot.bonusData;

        var netData = NetData.NetData.getInst();
        netData.RewardResult = this;
    }
});

var GameList = cc.Class({
    properties: {
        data: {
            default: [],
            type: [GameListData],
            serializable: false
        }

    },

    parseGameListData: function parseGameListData(data) {
        cc.log(data);
        var objRoot = JSON.parse(data);
        var netData = NetData.NetData.getInst();
        netData.GameListResult = objRoot.data;
    }

});

var GameRule = cc.Class({
    properties: {},

    parseGameRule: function parseGameRule(data) {
        cc.log(data);
        var objRoot = JSON.parse(data);
        var netData = NetData.NetData.getInst();
        netData.GameRule = objRoot;
    }

});

var PoolUpdate = cc.Class({
    properties: {
        poolBouns: 0,
        poolVisiable: 1
    },
    parsePoolData: function parsePoolData(data) {
        cc.log(data);
        var objRoot = JSON.parse(data);
        var netData = NetData.NetData.getInst();
        netData.PoolResult = objRoot;
    }

});

module.exports = {
    BetData: BetResult,
    InitData: InitData,
    RewardData: SettleData,
    GameList: GameList,
    GameRule: GameRule,
    PoolUpdate: PoolUpdate,
    JackPotInfo: JackPotInfo
};

cc._RFpop();