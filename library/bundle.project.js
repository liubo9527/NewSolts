require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"BroadCast":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b582b4GrxxOj5fS2Qj9bOnr', 'BroadCast');
// Script/BroadCast.js

"use strict";

var NetData = require("NetData");
var Common = require("Common");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        broadcastData: null,
        index: 0,
        labels: {
            default: [],
            type: cc.Label
        },
        firstFlag: true,
        resetFlag: true
    },

    // use this for initialization
    onLoad: function onLoad() {},

    dataCallback: function dataCallback() {
        this.broadcastData = NetData.NetData.getInst().InitResult.marqueeInfos;
        if (this.broadcastData && this.broadcastData.length > 0) {
            this.index = 0;
            if (this.firstFlag) {
                this.freeArray = new Array();
                this.activeArray = new Array();
                for (var i = 0; i < 3; ++i) {
                    this.freeArray.push(this.labels[i]);
                }
                this.firstFlag = false;
                this.show();
            }
        }
    },

    show: function show() {
        this.node.x = 0;
        this.resetLabel();
    },

    resetLabel: function resetLabel() {
        if (this.resetFlag && this.freeArray.length > 0) {
            this.resetFlag = false;
            var label = this.freeArray.shift();
            label.node.x = 420;

            if (this.index >= this.broadcastData.length) {
                this.index = 0;
            }

            var self = this;
            Common.Common.getInst().getNick(0, this.broadcastData[this.index].uid, function (j, nick) {
                var nicknick = nick;
                var str = self.broadcastData[self.index].msg.replace(/#{user}/, nicknick);
                if (self.broadcastData[self.index].msg.indexOf("天降") > 0) {
                    label.node.color = new cc.Color(255, 246, 0);
                } else {
                    label.node.color = new cc.Color(247, 241, 230);
                }
                label.string = str;
                self.index++;
                self.activeArray.push(label);
                self.resetFlag = true;
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (!this.firstFlag) {
            for (var i = 0; i < this.activeArray.length; ++i) {
                this.activeArray[i].node.x -= 200 * dt;
            }

            if (this.activeArray.length > 0) {
                if (this.activeArray[0].node.x + this.activeArray[0].node.width < -600) {
                    this.freeArray.push(this.activeArray.shift());
                }

                if (this.activeArray[this.activeArray.length - 1].node.x + this.activeArray[this.activeArray.length - 1].node.width < 200) {
                    this.resetLabel();
                }
            }
        }
    }
});

cc._RFpop();
},{"Common":"Common","NetData":"NetData"}],"ButtonScale":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f29edUBxBhDk7Z1/e2bRkkk', 'ButtonScale');
// Script/ButtonScale.js

'use strict';

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

        interactableType: true,
        selectType: 0,
        selectFlag: false },
    /*pax: function(c1, c2)
    {
       return c2 - c1;
    },*/

    // use this for initialization
    onLoad: function onLoad() {
        /*let arrDemo = new Array(1, 3, 2, 5, 6);
        //arrDemo.sort(this.pax);
        //arrDemo.sort(function(a,b){return a>b?1:-1});//从小到大排序
        arrDemo.sort(function(a,b){return a<b?1:-1});//从大到小排序
         for(let i = 0; i < arrDemo.length; i++)
        {
            cc.log("testsort" + arrDemo[i]);
        }*/

        //cc.log("testsort bbbbbbbbbbbbbbbbbb" );


        var timeCallback = function timeCallback(dt) {
            this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
                if (this.interactableType) {
                    this.node.scale = 0.8;
                }
            }, this);

            this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                this.node.scale = 1;
                if (this.interactableType) {
                    var onFunction = cc.find('Canvas').getComponent('Game');
                    onFunction.btnActionCallBack(this.selectType);
                }
            }, this);

            this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                this.node.scale = 1;
            }, this);
        };

        this.scheduleOnce(timeCallback, 0.001);
    },

    setInteractableType: function setInteractableType(interType) {
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

        var timeCallback = function timeCallback(dt) {
            if (interType) {
                this.node.color = new cc.Color(255, 255, 255);
            } else {
                this.node.color = new cc.Color(124, 124, 124);
            }
        };

        this.scheduleOnce(timeCallback, 0.001);

        //cc.log("this.node.color " + this.node.color.r);
    }

});

cc._RFpop();
},{}],"Common":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a83ba/o73VALoM9EAYzhjEf', 'Common');
// Script/Common.js

"use strict";

var KeyValue = cc.Class({
    properties: {
        key: "",
        value: ""
    }
});

var CusMap = cc.Class({
    properties: {
        maps: {
            default: [],
            type: [KeyValue],
            serializable: false
        }
    },

    set: function set(key, value) {
        var s_key = key.toString();
        var flag = false;

        for (var i = 0; i < this.maps.length; ++i) {
            if (this.maps[i].key === s_key) {
                flag = true;
                this.maps[i].value = value;
                break;
            }
        }

        if (flag === false) {
            var keyValue = new KeyValue();
            keyValue.key = s_key;
            keyValue.value = value;
            this.maps.push(keyValue);
        }
    },

    get: function get(key) {
        var s_key = key.toString();

        for (var i = 0; i < this.maps.length; ++i) {
            if (this.maps[i].key === s_key) {
                return this.maps[i].value;
            }
        }

        return null;
    }
});

var Common = cc.Class({
    statics: {
        g_CommonInst: null,

        getInst: function getInst() {
            if (Common.g_CommonInst === null) {
                Common.g_CommonInst = new Common();
                Common.g_CommonInst.init();
            }

            return Common.g_CommonInst;
        },

        destoryInst: function destoryInst() {
            if (Common.g_CommonInst !== null) {
                Common.g_CommonInst = null;
            }
        }
    },

    init: function init() {
        this.resMap = new CusMap();
        this.nickMap = new CusMap();
    },

    setNick: function setNick(id, nick) {
        this.nickMap.set(id, nick);
    },

    getNick: function getNick(j, id, callback) {
        var nick = this.nickMap.get(id);
        if (nick != null) {
            callback(j, nick);
        } else {
            if (!CC_JSB && window.aliLotteryCasinoSDK) {
                var self = this;
                window.aliLotteryCasinoSDK.getAvatar(id, function (obj) {
                    if (obj && obj[id]) {
                        self.setNick(id, obj[id].nick);
                        callback(j, obj[id].nick);
                    } else {
                        callback(j, "");
                    }
                });
            } else {
                callback(j, id);
            }
        }
    },

    setTexture: function setTexture(key, texture) {
        this.resMap.set(key, texture);
    },

    getTexture: function getTexture(key) {
        return this.resMap.get(key);
    },

    setNoTouch: function setNoTouch(flag) {
        var noTouchLayer = cc.find("Canvas/noTouchLayer");

        if (flag) {
            noTouchLayer.active = true;
        } else {
            noTouchLayer.active = false;
        }
    },

    showToast: function showToast(content) {
        var toast = cc.find("Canvas/toast").getComponent("Toast");
        toast.show(content);
    },

    showDialog: function showDialog(dialogTag, callNode, callFunc, content, btnL, btnR) {
        var dialog = cc.find("Canvas/dialog").getComponent("Dialog");
        dialog.show(dialogTag, callNode, callFunc, content, btnL, btnR);
    },

    reconnecting: function reconnecting(flag, content) {
        var loading = cc.find("Canvas/loading").getComponent("Loading");
        loading.reconnecting(flag, content);
    },

    log: function log(msg) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            //window.aliLotteryCasinoSDK.log('debug', 'chest', 'info');
            console.log(msg);
        } else {
            console.log(msg);
        }
    },

    debug: function debug(msg) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            window.aliLotteryCasinoSDK.log('debug', 'OpenChest', msg);
        }
    }
});

module.exports = {
    Common: Common,
    KeyValue: KeyValue,
    CusMap: CusMap
};

cc._RFpop();
},{}],"DataOper":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e77b9C3Mn5Gio4yYMRgWZ6G', 'DataOper');
// Script/network/DataOper.js

"use strict";

var CryptoJS = require("core");
require("aes");
var NetData = require("NetData");
var GameData = require("GameData");

var KeyValue = cc.Class({
    properties: {
        key: "",
        value: ""
    }
});

var CusMap = cc.Class({
    properties: {
        maps: {
            default: [],
            type: [KeyValue],
            serializable: false
        }
    },

    set: function set(key, value) {
        var s_key = key.toString();
        var flag = false;

        for (var i = 0; i < this.maps.length; ++i) {
            if (this.maps[i].key === s_key) {
                flag = true;
                this.maps[i].value = value;
                break;
            }
        }

        if (flag === false) {
            var keyValue = new KeyValue();
            keyValue.key = s_key;
            keyValue.value = value;
            this.maps.push(keyValue);
        }
    },

    get: function get(key) {
        var s_key = key.toString();

        for (var i = 0; i < this.maps.length; ++i) {
            if (this.maps[i].key === s_key) {
                return this.maps[i].value;
            }
        }

        return null;
    },

    clear: function clear(key) {
        for (var i = 0; i < this.maps.length; ++i) {
            if (this.maps[i].key == key) {
                this.maps.splice(i, 1);
                break;
            }
        }
    }
});

var NetWork = cc.Class({
    send: function send(requestId, requestHeaders, requestData, callfunc) {
        var xhr = cc.loader.getXMLHttpRequest();

        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                xhr = window.aliLotteryCasinoSDK.getHttpRequestObject();
            }
        }

        //xhr.open("POST", "http://10.0.20.52:8080/gateway/process"); //
        //xhr.open("POST", "https://gateway-dev.uuzz.com:10010/gateway/process"); //山东
        xhr.open("POST", "http://211.151.5.131:14030/gateway/process"); //王雷
        xhr.timeout = 15000; //15s超时

        //设置请求头
        for (var i = 0; i < requestHeaders.length; ++i) {
            xhr.setRequestHeader(requestHeaders[i].key, requestHeaders[i].value);
        }
        // var myDate = new Date();
        // cc.log("****************:"+ myDate.getTime());
        xhr.send(requestData);

        xhr.onload = function () {
            // var myDate = new Date();
            // cc.log("********* onLoad:"+myDate.getTime());
            callfunc(requestId, xhr);
        };

        xhr.onerror = function () {
            // var myDate = new Date();
            // cc.log("******** onerror:"+myDate.getTime());
            callfunc(requestId, xhr);
        };

        xhr.ontimeout = function () {
            // var myDate = new Date();
            // cc.log("****** ontimeout:"+myDate.getTime());
            callfunc(requestId, xhr);
        };
    }
});

var DataOper = cc.Class({

    statics: {
        g_DataOperInst: null,
        s_index: 0,

        getInst: function getInst() {

            if (DataOper.g_DataOperInst === null) {
                DataOper.g_DataOperInst = new DataOper();
                DataOper.g_DataOperInst.init();
            }
            return DataOper.g_DataOperInst;
        },

        destoryInst: function destoryInst() {

            if (DataOper.g_DataOperInst !== null) {
                DataOper.g_DataOperInst = null;
            }
        }
    },

    properties: {
        //请求data
        requestData: "",
        //请求id
        requestId: 0,
        //aes Key
        aesKey: "817fed95f9e16bed", //秘钥，写死

        //****************请求头信息**********
        //请求头数组
        requestHeaders: {
            default: [],
            type: [KeyValue],
            serializable: false
        },
        //命令号
        headerCmd: 0, //初始化-100  投注-101  结算-103
        //sig
        headerSig: "",
        //版本号
        headerVer: "1.0",
        //会话标识
        headerToken: "3709660283", //"3629752610",//"2054683715",//"3709187220",//"3706201779", "3706261041", "2054683715" "yptdaily06/taobao1234 -> 3709177590" "yptdaily09/taobao1234 -> 3709187220"
        //游戏渠道实例标识an
        gameToken: "88c8afd5a29d5e27e4066f1f9eda5102-12-1576-2999"
    },

    init: function init() {
        this.callfuncs = new CusMap();
        this.callnode = new CusMap();
        this.callcmd = new CusMap();
        cc.log("jb=" + CC_JSB);

        if (!CC_JSB) {
            this.gameToken = this.GetQueryString("accessToken");
            this.headerToken = this.GetQueryString("tok");
            if (this.gameToken == null) {
                this.gameToken = "39bfced3c7ad0f9965dc15c59775bcbb-12-1576-1226";
            }
            if (this.headerToken == null) {
                this.headerToken = "0";
            }
        } else {}

        console.log("this.gameToken = " + this.gameToken);
        console.log("this.headerToken = " + this.headerToken);
    },

    GetQueryString: function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);return null;
    },

    setRequestHeader: function setRequestHeader() {
        this.requestHeaders = [];

        var keyValue = new KeyValue();
        keyValue.key = "cmd";
        keyValue.value = this.headerCmd.toString();
        this.requestHeaders.push(keyValue);

        keyValue = new KeyValue();
        keyValue.key = "Content-Type";
        keyValue.value = "text/plain";
        this.requestHeaders.push(keyValue);

        /*keyValue = new KeyValue();
        keyValue.key = "cid";
        keyValue.value = this.headerCid.toString();
        this.requestHeaders.push(keyValue);*/

        keyValue = new KeyValue();
        keyValue.key = "sig";
        keyValue.value = this.headerSig.toString();
        this.requestHeaders.push(keyValue);

        keyValue = new KeyValue();
        keyValue.key = "ver";
        keyValue.value = this.headerVer.toString();
        this.requestHeaders.push(keyValue);

        keyValue = new KeyValue();
        keyValue.key = "tok";
        keyValue.value = this.headerToken.toString();
        this.requestHeaders.push(keyValue);

        keyValue = new KeyValue();
        keyValue.key = "gameToken";
        keyValue.value = this.gameToken.toString();
        this.requestHeaders.push(keyValue);

        /*keyValue = new KeyValue();
        keyValue.key = "gid";
        keyValue.value = this.headerGid.toString();
        this.requestHeaders.push(keyValue);*/
    },

    request: function request(callFunc, self) {
        if (this.headerCmd != 104) {
            console.log("request-----------data = " + this.requestData);
        }

        this.callfuncs.set(DataOper.s_index, callFunc);
        this.callnode.set(DataOper.s_index, self);
        this.callcmd.set(DataOper.s_index, this.headerCmd);
        //aes加密
        this.requestData = this.AESEncryption(this.requestData, this.aesKey);
        //Base64
        //this.requestData = Base64.encode(this.requestData);
        //gzip
        //this.requestData = this.requestData;
        //md5
        this.headerSig = CryptoJS.MD5(this.requestData);
        //请求头
        this.setRequestHeader();
        //send
        var netWork = new NetWork();
        netWork.send(DataOper.s_index, this.requestHeaders, this.requestData, this.onHttpRequestCompleted);
        DataOper.s_index++;
    },

    /**
     * 联网回调
     * @Param requestId 请求id
     * @param status   联网状态
     * @param responeData 响应data
     */
    onHttpRequestCompleted: function onHttpRequestCompleted(requestId, xhr) {
        console.log("onHttpRequestCompleted.xhr.status=" + xhr.status);

        if (xhr.status === 0) {
            console.log("onHttpRequestCompleted.xhr.msg= " + xhr.getResponseHeader("msg"));
        }

        var callFunc = DataOper.getInst().callfuncs.get(requestId);
        var callNode = DataOper.getInst().callnode.get(requestId);
        var callCmd = DataOper.getInst().callcmd.get(requestId);

        DataOper.getInst().callfuncs.clear(requestId);
        DataOper.getInst().callnode.clear(requestId);
        DataOper.getInst().callcmd.clear(requestId);

        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            //取http头
            //命令号
            var cmd = xhr.getResponseHeader("cmd");
            cmd = parseInt(cmd);
            //res
            var res = xhr.getResponseHeader("res");
            //msg
            var msg = xhr.getResponseHeader("msg");
            msg = decodeURIComponent(msg);
            //sig
            var sig = xhr.getResponseHeader("sig");
            if (res == 0) {
                //取body
                var body = xhr.responseText;
                //md5验证
                var t_sig = CryptoJS.MD5(body);
                var t_sig_str = new String(t_sig);
                var sig_str = new String(sig);
                t_sig_str = t_sig_str.trim();
                sig_str = sig_str.trim();

                if (t_sig_str == sig_str) {
                    DataOper.getInst().parserServerData(body, cmd);
                    callFunc(cmd, res, msg, callNode);
                } else {
                    callFunc(cmd, -1, "加密验证错误", callNode);
                }
            } else {
                console.log("报错---res:" + res + "----msg:" + msg);
                //纯业务logic
                if (cmd == 100 && (res == 100007 || res == 200019)) {
                    NetData.NetData.getInst().stopSellingDesc = msg;
                }
                callFunc(cmd, res, msg, callNode);
            }

            //var callFunc = DataOper.getInst().callfuncs.get(requestId);
            //var callNode = DataOper.getInst().callnode.get(requestId);
            //cc.log("abcde");
            //callFunc(cmd, res, msg, callNode);
        } else {
            //联网失败
            console.log("http status:" + xhr.status + "|callCmd=" + callCmd);
            //callFunc(DataOper.getInst().headerCmd, -1, "网络可能不好哦，请重试", callNode);
            callFunc(callCmd, -1, "网络可能不好哦，请重试", callNode); //服务器连续错误发过来的时候 2017-2-15
        }
    },

    /**
     *解析服务器返回数据
     * @param data
     * @param cmd
     */
    parserServerData: function parserServerData(data, cmd) {
        //gzip解压
        //data = data;
        //Base64
        //data = Base64.decode(data);
        //aes解密
        data = this.AESDecrypt(data, this.aesKey);
        var iNum1 = parseInt(cmd);

        if (iNum1 != 104) {
            console.log("data = " + data + ", cmd = " + cmd);
        }

        //console.log("data = " + data + ", cmd = " + cmd);
        var netData = NetData.NetData.getInst();
        switch (iNum1) {
            case 100:
                {
                    //初始化协议
                    var initData = new GameData.InitData();
                    initData.parseInitData(data);
                }
                break;
            case 101:
                {
                    //投注协议
                    netData.BetResult = JSON.parse(data);
                }
                break;
            case 102:
                {
                    //结算协议
                    netData.RewardResult = JSON.parse(data);
                }
                break;

            case 103:
                {
                    //游戏订单列表
                    netData.GameListResult = JSON.parse(data).data;
                }
                break;

            case 104:
                {
                    //奖池
                    netData.PoolResult = JSON.parse(data);
                }
                break;
            case 105:
                {
                    //规则
                    netData.GameRule = JSON.parse(data);
                }
                break;
            default:
                break;
        }
    },

    //AES加密
    AESEncryption: function AESEncryption(data, aesKey) {
        //return CryptoJS.CryptoJS.AES.encrypt(data, aesKey).toString();
        var key = CryptoJS.enc.Utf8.parse(aesKey);
        var iv = CryptoJS.enc.Utf8.parse(aesKey);
        var srcs = CryptoJS.enc.Utf8.parse(data);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB });
        //var encodeStr = encodeURIComponent(encrypted.toString());
        //var md5Str = CryptoJS.MD5(encodeStr);
        return encrypted.toString();
    },

    //AES解密
    AESDecrypt: function AESDecrypt(data, aesKey) {
        //return CryptoJS.CryptoJS.AES.decrypt(data, aesKey).toString(CryptoJS.CryptoJS.enc.Utf8);
        var key = CryptoJS.enc.Utf8.parse(aesKey);
        var iv = CryptoJS.enc.Utf8.parse(aesKey);
        var decrypt = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.ECB });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },

    /**
     * 初始化
     * @param
     * 
     */
    getInit: function getInit(callFunc, self) {
        this.requestData = "{}";
        //设置命令号，每个请求都不一样
        this.headerCmd = 100;
        //请求网络
        this.request(callFunc, self);
    },

    /**
     * 投注
     * @param gameType 游戏类型(0:普通游戏 1:免费游戏) int
     * @param ticketNo 订单(票)号。
     * @param step 当前免费游戏的次数。int
     * @param mulriple 投注倍数。
     * @param lineNum 投注线数。
     * @param playTime 游戏时间。
     */
    getBet: function getBet(gameType, ticketNo, step, mulriple, lineNum, playTime, callFunc, self) {
        this.requestData = "";
        //拼成json串，每个请求都不一样
        var obj = new Object();
        obj.gameType = gameType;
        obj.ticketNo = ticketNo;
        obj.step = step;
        obj.mulriple = mulriple;
        obj.lineNum = lineNum;
        obj.playTime = playTime;

        this.requestData = JSON.stringify(obj);
        obj = null;
        //设置命令号，每个请求都不一样
        this.headerCmd = 101;
        //请求网络
        this.request(callFunc, self);
    },

    /**
     * 结算
     * @param ticket_no 订单号
     * @param playTime 游戏时间
     */
    getReward: function getReward(ticket_no, playTime, callFunc, self) {
        this.requestData = "";
        //拼成json串，每个请求都不一样
        var obj = new Object();
        obj.ticketNo = ticket_no;
        obj.playTime = playTime;
        this.requestData = JSON.stringify(obj);
        obj = null;
        //设置命令号，每个请求都不一样
        this.headerCmd = 102;
        //请求网络
        this.request(callFunc, self);
    },

    /**
     * 获取游戏列表
     */
    getGameList: function getGameList(callFunc, self) {
        this.requestData = "{}";
        //设置命令号，每个请求都不一样
        this.headerCmd = 103;
        //请求网络
        this.request(callFunc, self);
    },

    /**
      * 获取奖池
      */
    getPool: function getPool(callFunc, self) {
        this.requestData = "{}";
        //设置命令号，每个请求都不一样
        this.headerCmd = 104;
        //请求网络
        this.request(callFunc, self);
    },

    /**
    * 获取规则
    */
    getRule: function getRule(callFunc, self) {
        this.requestData = "{}";
        //设置命令号，每个请求都不一样
        this.headerCmd = 105;
        //请求网络
        this.request(callFunc, self);
    }
});

module.exports = {
    DataOper: DataOper
};

cc._RFpop();
},{"GameData":"GameData","NetData":"NetData","aes":"aes","core":"core"}],"GameData":[function(require,module,exports){
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
},{"NetData":"NetData"}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6c82VRx7BHDJ87sOLeh+Ew', 'Game');
// Script/Game.js

"use strict";

var Unit = require("unit");
var NetData = require("NetData");
var GameData = require("GameData");
var DataOper = require("DataOper");
var SelectLine = require("SelectLine");
var cubeS = require("cube");
var PriceGroup = require("PriceGroup");
var JiangChiScript = require("JiangChi");

var Init = require("Init");
var init = new Init();
init.init();

cc.Class({
    extends: cc.Component,

    properties: {
        pArray: [],
        unit1: {
            default: null,
            type: cc.Node
        },

        unit2: {
            default: null,
            type: cc.Node
        },

        unit3: {
            default: null,
            type: cc.Node
        },

        unit4: {
            default: null,
            type: cc.Node
        },

        unit5: {
            default: null,
            type: cc.Node
        },

        lineGraphic: {
            default: null,
            type: cc.Graphics
        },

        moreDevDia: {
            default: null,
            type: cc.Node
        },
        moreDevLabel: {
            default: null,
            type: cc.Label
        },
        moreDevBut: {
            default: null,
            type: cc.Node
        },

        waitLayer: {
            default: null,
            type: cc.Node
        },

        lightList: {
            default: [],
            type: [cc.Node]
        },

        rewardCubeList: {
            default: [],
            type: [cc.Node]
        },

        blackLayer: {
            default: null,
            type: cc.Node
        },

        blackLayer2: {
            default: null,
            type: cc.Node
        },

        whiteLayer: {
            default: null,
            type: cc.Node
        },

        toastNode: {
            default: null,
            type: cc.Node
        },

        recoverToastNode: {
            default: null,
            type: cc.Node
        },

        leftLabel: {
            default: null,
            type: cc.Label
        },
        betInfo: {
            default: null,
            type: cc.Label
        },
        poolNode: {
            default: null,
            type: cc.Node
        },

        centerNode: {
            default: null,
            type: cc.Node
        },

        poolRuleBt: {
            default: null,
            type: cc.Node
        },

        //auto confirm
        autoConfirm: {
            default: null,
            type: cc.Node
        },
        autoConLabel: {
            default: null,
            type: cc.Label
        },
        autoOk: {
            default: null,
            type: cc.Node
        },
        autoCancel: {
            default: null,
            type: cc.Node
        },
        autoLabel: {
            default: null,
            type: cc.Label
        },
        lightLayer: {
            default: null,
            type: cc.Node
        },
        freeModelLayer: {
            default: null,
            type: cc.Node
        },
        greatModelLayer: {
            default: null,
            type: cc.Node
        },
        freeModelLabel: {
            default: null,
            type: cc.Label
        },
        leftNotTouch: {
            default: null,
            type: cc.Node
        },

        errLayer: {
            default: null,
            type: cc.Node
        },
        errLabel: {
            default: null,
            type: cc.Label
        },
        buttonRetry: {
            default: null,
            type: cc.Node
        },
        buttonCancel: {
            default: null,
            type: cc.Node
        },

        rightNotTouch: {
            default: null,
            type: cc.Node
        },

        specialRewardNode: {
            default: null,
            type: cc.Node
        },

        specialRewardLabel: {
            default: null,
            type: cc.Label
        },

        rewardNode: {
            default: null,
            type: cc.Node
        },

        spineAniNode: {
            default: null,
            type: cc.Node
        },

        priceGroupNode: {
            default: null,
            type: cc.Node
        },

        rewardLabel: {
            default: null,
            type: cc.Label
        },

        freeTitle: {
            default: null,
            type: cc.Node
        },
        cover: {
            default: null,
            type: cc.Node
        },
        helpNode: {
            default: null,
            type: cc.Node
        },
        orderNode: {
            default: null,
            type: cc.Node
        },
        marquee: {
            default: null,
            type: cc.Node
        },
        lineGroup: {
            default: [],
            type: [cc.Node]
        },
        selectLineList: {
            default: [],
            type: [cc.Node]
        },
        leftBt: {
            default: null,
            type: cc.Node
        },
        leftGray: {
            default: null,
            type: cc.Node
        },
        rightBt: {
            default: null,
            type: cc.Node
        },
        rightGray: {
            default: null,
            type: cc.Node
        },
        lineBt: {
            default: null,
            type: cc.Node
        },
        autoTimes: {
            default: null,
            type: cc.Label
        },
        lineGray: {
            default: null,
            type: cc.Node
        },
        freeGameTimeLabel: {
            default: null,
            type: cc.Label
        },
        wenhaoDia: {
            default: null,
            type: cc.Node
        },
        wenhaoBut: {
            default: null,
            type: cc.Node
        },
        stopLayer: {
            default: null,
            type: cc.Node
        },
        backLayer: {
            default: null,
            type: cc.Node
        },
        whiteNoTouchLayer: {
            default: null,
            type: cc.Node
        },
        backLabel: {
            default: null,
            type: cc.Label
        },
        backEnsure: {
            default: null,
            type: cc.Node
        },
        backCancel: {
            default: null,
            type: cc.Node
        },

        selectLine: {
            default: null,
            type: cc.Node
        },

        poolIcon: {
            default: null,
            type: cc.Sprite
        },
        //金币版的 toast
        toastLabel: {
            default: null,
            type: cc.Label
        },

        toastErr: {
            default: null,
            type: cc.Node
        },

        index: 0,
        autoFlag: 0, //1:自动投注 
        autoLimit: 10, //自动要10次限制 
        autoIndex: 10, //自动当前号
        orderFlag: false, //默认可用请求，当true时 不可请求order
        markGetInitFlag: false, //一秒内不能调第二次初始化，为了解决初始化进来后同时走login 和 resume的login
        m_line: 50,
        m_price: 1,
        m_isQuickStopBt: false,
        m_gameModel: 0, //0:普通模式  1:普通模式(快速开奖) 2:免费模式 3:大丰收 4奖池大奖
        state_gameing: false, //是否是游戏中
        frontList: [],
        lineList: [],
        errDialogTag: 0, //不同的错误处理; 0正常 2:恢复 
        lineIndex: 0, //中奖行数组序号
        m_greatGameHasFinishedOnePart: false, //大丰收第一轮是否完成
        m_freeLayerShowOnce: false,
        m_orderResult: null,
        m_freeStep: 1, //免费游戏的次数
        dou: 0, //累计获得的豆
        rightBet: 0, //是否点了自动投注
        sdkUid: null,
        m_waitintCallBack: null, //等待框计时器
        sdkBalance: 0, //废弃
        markInitCnt: 0,
        showWait: 0, //showLayer次数
        isQuicklyEnd: false, //快速开奖
        markWaitHide: false,
        requestRewardTime: 0, //结算请求次数
        ruleHasShowOnce: false, //规则已经展示过了
        isQuickPassFunction: false, //快速跳过开奖动画模式
        scaleValue: 1,

        version: {
            default: null,
            type: cc.Label
        }
    },
    // use this for initialization
    setRewardCubePos: function setRewardCubePos() {
        for (var _j = 0; _j < 4; _j++) {
            for (var _i = 0; _i < 5; _i++) {
                var index = _j * 5 + _i;
                var posX = _i * 200 - 400;
                var posY = 337.5 - _j * 225;
                var cube = this.rewardCubeList[index];
                cube.x = posX;
                cube.y = posY;
                var light = this.lightList[index];
                light.x = posX;
                light.y = posY;
            }
        }
        //计算中奖线的坐标
        this.lineList = [];
        for (var i = 3; i >= 0; i--) {
            for (var j = 0; j < 5; j++) {
                var x = j * 200 - 400;
                var y = i * 225 - 337.5;
                var pos = cc.v2(x, y);
                this.lineList.push(pos);
            }
        }
        this.frontList = this.rewardCubeList;
    },

    onLoad: function onLoad() {
        if (cc.director.setClearColor) {
            cc.director.setClearColor(cc.Color.WHITE);
        }

        this.pArray = [];
        this.pArray.push(this.unit1);
        this.pArray.push(this.unit2);
        this.pArray.push(this.unit3);
        this.pArray.push(this.unit4);
        this.pArray.push(this.unit5);
        this.setRewardCubePos();

        //新适配
        var se = cc.director.getWinSize();
        var per = se.width / se.height;
        var dPer = 1080 / 1660;
        if (per < dPer) {
            var sValue = per / dPer;
            var betArea = cc.find("Canvas/betArea");
            var centerArea = cc.find("Canvas/bgAndCenter");
            this.poolNode.scale = sValue;
            betArea.scale = sValue;
            centerArea.scale = sValue;
            this.scaleValue = sValue;
        }

        //test
        for (var i = 0; i < 5; i++) {
            var dataArr = ["WW", "WW", "WW", "WW"];
            var unitS = this.pArray[i].getComponent(Unit);;
            unitS.setStopDataArray(dataArr, i + 1, false);
        }

        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.moreDevBut.scale = 0.8;
        }, this);
        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.moreDevBut.scale = 1;
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function () {
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.moreDevDia.runAction(cc.sequence(cc.scaleTo(0.2, 0, 0), call));
            if (this.errDialogTag == 1) {
                //
                this.fresh();
            }
        }, this);

        this.moreDevBut.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.moreDevBut.scale = 1;
        }, this);

        //奖池规则bt
        this.poolRuleBt.on(cc.Node.EventType.TOUCH_START, function () {
            this.poolRuleBt.scale = 0.8;
        }, this);
        this.poolRuleBt.on(cc.Node.EventType.TOUCH_END, function () {
            this.poolRuleBt.scale = 1;
            // cc.log("单价对应奖池最高可获得金币规则说明");
            var node = cc.find("Canvas/poolRule");
            var s1 = node.getComponent("PoolRule");
            node.active = true;
            s1.downHelp();
        }, this);

        this.poolRuleBt.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.poolRuleBt.scale = 1;
        }, this);

        //auto confirm
        this.autoOk.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.autoOk.scale = 0.8;
        }, this);

        this.autoOk.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.autoOk.scale = 1;
            this.blackLayer.active = false;
            this.whiteNoTouchLayer.active = true;
            var callFunc_2 = cc.callFunc(function () {
                this.whiteNoTouchLayer.active = false;
                this.autoCallback(null);
            }, this);
            this.autoConfirm.runAction(cc.sequence(cc.scaleTo(0.3, 0, 0), callFunc_2));
        }, this);

        this.autoOk.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.autoOk.scale = 1;
        }, this);

        ///
        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.autoCancel.scale = 0.8;
        }, this);

        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.blackLayer.active = false;
            this.autoConfirm.runAction(cc.scaleTo(0.3, 0, 0));
            this.autoCancel.scale = 1;
            this.orderFlag = false;
        }, this);

        this.autoCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.autoCancel.scale = 1;
        }, this);
        //end auto 

        //wenhao        
        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.wenhaoBut.scale = 0.8;
        }, this);

        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.wenhaoBut.scale = 1;
            //this.wenhaoBut.runAction(cc.scaleTo(0.2, 0, 0));
            if (!CC_JSB) {
                window.location.reload();
            }
        }, this);
        this.wenhaoBut.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.wenhaoBut.scale = 1;
        }, this);
        //end wenhao

        //错误框 retry
        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.buttonRetry.scale = 0.8;
        }, this);

        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.buttonRetry.scale = 1;
            var scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function () {
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2, call));

            //初始化不过， 退出或try
            if (this.cunCmd == 100) {
                this.getInit();
            } else if (this.cunCmd == 101) {
                this.getIsLogin(); //
            } else if (this.cunCmd == 102) {
                this.fresh();
            } else if (this.cunCmd == 103) {
                this.getOrderList();
            } else if (this.cunCmd == 105) {
                this.getRule();
            }
        }, this);

        this.buttonRetry.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.buttonRetry.scale = 1;
        }, this);

        //取消
        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.buttonCancel.scale = 0.8;
        }, this);

        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.buttonCancel.scale = 1;
            var scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function () {
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2, call));
            this.blackLayer.active = false;
            //退出           
            this.exitGame();
        }, this);

        this.buttonCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.buttonCancel.scale = 1;
        }, this);
        //错误框 end

        //back ensure
        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.backEnsure.scale = 0.8;
        }, this);

        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.backEnsure.scale = 1;
            var scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.whiteNoTouchLayer.active = true;
            var call = cc.callFunc(function () {
                this.whiteNoTouchLayer.active = false;
            }, this);
            this.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2, call));
            this.blackLayer.active = false;
            //退出游戏          
            this.exitGame();
        }, this);

        this.backEnsure.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.backEnsure.scale = 1;
        }, this);

        //取消
        this.backCancel.parent.on(cc.Node.EventType.TOUCH_START, function () {
            this.backCancel.scale = 0.8;
        }, this);

        this.backCancel.parent.on(cc.Node.EventType.TOUCH_END, function () {
            this.backCancel.scale = 1;
            var scaleTo1 = cc.scaleTo(0.1, 1.2, 1.2);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0).easing(cc.easeIn(1.0));
            this.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
            this.blackLayer.active = false;
        }, this);

        this.backCancel.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.backCancel.scale = 1;
        }, this);
        //back end

        //this.scaleView();
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            console.log("走淘宝了");
            var initResult = NetData.NetData.getInst().InitResult;
            if (initResult != null) {
                var status = initResult.status;
                this.initsuccess();
                //启动
                if (status === 0) {//doNoting
                } else if (status === 1) {
                    //恢复
                    this.recoverGame();
                } else {
                    console.log("unknow status");
                }
            } else {
                console.log("停售了");
                this.blackLayer2.active = true;
                this.stopLayer.active = true;
                this.orderFlag = false;
                this.setSkin();
                this.stopLayer.getChildByName("words").getComponent("cc.Label").string = NetData.NetData.getInst().stopSellingDesc;
            }
            this.setTaobaoSDK();
        } else {
            //初始化接口
            if (!CC_JSB && window.__skinConfig) {
                NetData.NetData.getInst().skin = window.__skinConfig;
            }
            this.getInit();
            console.log("没有走淘宝SDK");
        }

        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                //活动
                window.aliLotteryCasinoSDK.throwTimer('initialize');
            }
        }
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            this.version.string = "1.42 canvas";
        } else {
            this.version.string = "1.42 webgl";
        }
    },

    //
    rechargeToastJudge: function rechargeToastJudge() {
        // //提示余额不足，跳转到充值 现在提示函谷那边处理 废弃
        // if(NetData.NetData.getInst().InitResult.currency  == "豆"){
        //     //doNoting
        // }else{
        //     this.toastErr.stopAllActions();
        //     let scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        //     let scaleTo2 = cc.scaleTo(0.2, 0, 0);
        //     if(NetData.NetData.getInst().InitResult.currency  == "金币"){
        //         this.toastLabel.string = "淘金币不够了";
        //     }else{
        //         this.toastLabel.string = msg;
        //     }
        //     this.toastErr.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
        // }
    },

    setSkin: function setSkin() {
        //设置弹框字体颜色和跑马灯位置 by 服务器data
        cc.log("skinssssssss");
        var skin = NetData.NetData.getInst().skin;
        if (skin) {
            var fontColorArray = skin.fontColor;
            //网络提示弹框 配置颜色 根据不同皮肤
            if (fontColorArray != null) {
                //网络提示
                this.errLabel.node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
                //自动十次确认弹框
                this.autoConLabel.node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
                this.autoConfirm.getChildByName("tips").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
                //确认离开游戏
                this.backLayer.getChildByName("words").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
                this.priceGroupNode.getComponent(PriceGroup).setLabelColor();
                //多设备登陆
                this.moreDevLabel.node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
                //停售
                this.stopLayer.getChildByName("words").getComponent("cc.Label").node.color = new cc.Color(fontColorArray[0], fontColorArray[1], fontColorArray[2]);
            }
        }
        //判断是否是有小贴士
        var InitResult = NetData.NetData.getInst().InitResult;
        if (InitResult) {
            var tip = InitResult.tip;
            if (tip) {
                //大奖tips
                var tipStr = InitResult.tip.content;
                var specialTips = this.specialRewardNode.getChildByName("tips");
                specialTips.active = true;
                specialTips.getChildByName("label").getComponent("cc.Label").string = tipStr;
                //普通将tips
                var normalTips = this.rewardNode.getChildByName("tips");
                normalTips.active = true;
                normalTips.getChildByName("label").getComponent("cc.Label").string = tipStr;
                //绑定小贴士去看看 的触摸事件 大奖button
                var specialTipsBt = specialTips.getChildByName("button");
                specialTipsBt.on(cc.Node.EventType.TOUCH_START, function () {
                    this.autoCancel.scale = 0.8;
                }, this);

                specialTipsBt.on(cc.Node.EventType.TOUCH_END, function () {
                    this.tipsJump();
                    this.autoCancel.scale = 1;
                }, this);

                specialTipsBt.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this.autoCancel.scale = 1;
                }, this);
                //普通奖button
                var normalTipsBt = normalTips.getChildByName("button");
                normalTipsBt.on(cc.Node.EventType.TOUCH_START, function () {
                    this.autoCancel.scale = 0.8;
                }, this);

                normalTipsBt.on(cc.Node.EventType.TOUCH_END, function () {
                    this.tipsJump();
                    this.autoCancel.scale = 1;
                }, this);

                normalTipsBt.parent.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this.autoCancel.scale = 1;
                }, this);
            }
        }
    },

    //初始化成功之后
    initsuccess: function initsuccess() {
        this.updatePoll(true);
        var poolResult = NetData.NetData.getInst().PoolResult;
        var poolVisiable = poolResult.poolVisiable;
        this.setPoolIcon();
        this.setSkin();
        if (poolVisiable == 1) {
            this.scheduleOnce(this.getPool, 2);
        }
        //跑马灯working
        this.openMarquee();
        this.setRecoverPriceAndLines();
    },
    //小贴士 跳转
    tipsJump: function tipsJump() {
        cc.log("jump");
        var link = NetData.NetData.getInst().InitResult.tip.url;
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.pushWindow(link);
            }
        }
    },

    openMarquee: function openMarquee() {
        //跑马灯位置及区域设置
        var skin = NetData.NetData.getInst().skin;
        if (skin) {
            var broadCastPosAndWidth = skin.broadCastPosAndWidth;
            if (broadCastPosAndWidth != null) {
                var content = this.marquee.getChildByName("content");
                content.setPosition(broadCastPosAndWidth[0], broadCastPosAndWidth[1]);
                content.width = broadCastPosAndWidth[2]; //width 裁剪区域大小
            }
        }
        var broadcaseCmp = this.marquee.getComponent("BroadCast");
        broadcaseCmp.active = true;
        broadcaseCmp.dataCallback();
    },

    //联网
    netCallback: function netCallback(cmd, res, msg, self) {
        console.log("netCallback cmd=" + cmd + "\res=" + res + "\msg=" + msg);
        if (cmd != 104) {
            self.hideWaitLayer();
        }
        if (res == 0) {
            if (cmd != 104) {
                self.markWaitHide = true;
                self.orderFlag = false;
            }
            switch (cmd) {
                case 100:
                    {
                        var initResult = NetData.NetData.getInst().InitResult;
                        var status = initResult.status;
                        self.initsuccess();
                        //启动
                        if (status === 0) {
                            //doNoting
                        } else if (status === 1) {
                            //恢复
                            self.recoverGame();
                        } else {
                            cc.log("unknow status");
                        }
                    }
                    break;
                case 101:
                    {
                        self.m_greatGameHasFinishedOnePart = false; //大丰收出现免费游戏免费游戏出现免费游戏
                        self.errDialogTag = 0;
                        // //正常游戏
                        self.setGameModelAndUnitData();
                        self.updateUserInfo();
                    }
                    break;
                case 102:
                    {
                        //结算游戏
                        self.rewardGame();
                        self.errDialogTag = 0;
                        self.requestRewardTime = 0;
                        cc.log("结算游戏");
                        self.updateUserInfo();
                    }
                    break;
                case 103:
                    //订单列表
                    {
                        var order = cc.find("Canvas/order");
                        var orderJs = order.getComponent("JiluListScript");
                        orderJs.initDingdan();
                    }
                    break;
                case 104:
                    //奖池更新
                    {
                        self.updatePoll();
                        self.unschedule(self.getPool);
                        self.scheduleOnce(self.getPool, 2);
                    }
                    break;
                case 105:
                    //规则
                    {
                        self.ruleHasShowOnce = true;
                        self.waitLayer.active = true;
                        var s1 = self.helpNode.getComponent("Help");
                        s1.downHelp();
                    }
                    break;
                default:
                    break;
            }
        } else if (res == 200009) {
            //余额不足;
            if (!CC_JSB) {
                if (window.aliLotteryCasinoSDK) {
                    window.aliLotteryCasinoSDK.recharge(true);
                }
            }
            self.rechargeToastJudge();
        } else if (res == 100007 || 200019 == res) {
            //停售
            self.blackLayer2.active = true;
            self.stopLayer.active = true;
            self.orderFlag = false;
            self.stopLayer.getChildByName("words").getComponent("cc.Label").string = msg;
        } else if (res == 100035) {
            //账号在其他设备登陆 100014==100035
            self.blackLayer.active = true;
            self.errDialogTag = 1;
            self.moreDevLabel.string = msg;
            self.moreDevDia.runAction(cc.scaleTo(0.3, 1));
        } else {
            if (cmd == 104) {
                //更新奖池不出现弹框提示
                self.unschedule(self.getPool);
                self.scheduleOnce(self.getPool, 2);
            } else if (cmd == 102) {
                //结算2次后重新初始化
                self.cunCmd = cmd;
                self.requestRewardTime++;
                if (self.requestRewardTime == 1) {
                    self.requestRewardTime = 0;
                    self.showErrorLayer(msg, true);
                } else {
                    self.getReward();
                }
            } else {
                self.cunCmd = cmd;
                self.showErrorLayer(msg, true);
            }
        }
    },

    //设置奖池说明图标
    setPoolIcon: function setPoolIcon() {
        var iconUrl = NetData.NetData.getInst().InitResult.currencyIcon;
        var self = this;
        if (iconUrl != "") {
            //下载换图
            cc.loader.load(iconUrl, function (err, tex) {
                if (err) {
                    console.log('Error url +' + err);
                }
                console.log("**奖池图片**", iconUrl + "|" + tex);
                if (tex) {
                    var sf = new cc.SpriteFrame();
                    sf.setTexture(tex);
                    self.poolIcon.spriteFrame = sf;
                }
            });
        }
    },

    //错误提示 //flag:true:双按钮  false:单按钮,
    showErrorLayer: function showErrorLayer(errMsg, flag) {
        this.errLabel.string = errMsg;
        this.blackLayer.active = true;
        this.errLayer.scale = 0;
        var scaleTo1 = cc.scaleTo(0.2, 1.2 * this.scaleValue);
        var scaleTo2 = cc.scaleTo(0.1, 1.0 * this.scaleValue);
        this.errLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
    },

    //调奖池
    getPool: function getPool() {
        this.unschedule(this.getPool);
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getPool(this.netCallback, this);
    },

    //更新奖池
    updatePoll: function updatePoll(flag) {
        var poolResult = NetData.NetData.getInst().PoolResult;
        var poolBouns = poolResult.poolBouns;
        var poolVisiable = poolResult.poolVisiable;
        if (poolVisiable == 1) {
            this.poolNode.active = true;
            var poolScript = this.poolNode.getComponent(JiangChiScript);
            poolScript.initData(poolBouns);
        } else {
            this.poolNode.active = false;
        }
    },

    getInit: function getInit() {
        this.showWaitLayer();
        this.orderFlag = true;
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(this.netCallback, this);
    },
    /**
     * 投注
     * @param gameType 游戏类型(0:普通游戏 1:免费游戏) int
     * @param ticketNo 订单(票)号。
     * @param step 当前免费游戏的次数。int
     * @param mulriple 投注倍数。
     * @param lineNum 投注线数。
     * @param playTime 游戏时间。
     */
    getBet: function getBet() {
        this.showWaitLayer();
        this.orderFlag = true;
        var dataOper = DataOper.DataOper.getInst();
        if (this.m_gameModel == 2) {
            //免费游戏
            var step = -1;
            var ticketNo = null;
            if (this.errDialogTag == 2) {
                ticketNo = NetData.NetData.getInst().InitResult.recoverData.ticketNo;
            } else {
                ticketNo = NetData.NetData.getInst().BetResult.ticketNo;
            }
            dataOper.getBet(1, ticketNo, this.m_freeStep, this.m_price, this.m_line, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
        } else {
            //其他
            dataOper.getBet(0, "", 0, this.m_price, this.m_line, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
        }
    },

    getOrderList: function getOrderList() {
        var initResult = NetData.NetData.getInst().InitResult;
        if (initResult) {
            this.orderFlag = true;
            this.showWaitLayer();
            var dataOper = DataOper.DataOper.getInst();
            dataOper.getGameList(this.netCallback, this);
        }
    },

    getRule: function getRule() {
        this.orderFlag = true;
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getRule(this.netCallback, this);
    },

    /**
     * 结算
     * @param ticket_no 订单号
     * @param playTime 游戏时间
     */
    getReward: function getReward() {
        this.orderFlag = true;
        this.showWaitLayer();
        var dataOper = DataOper.DataOper.getInst();
        var ticket_no = "";
        if (this.errDialogTag == 2) {
            //恢复数据结算
            ticket_no = NetData.NetData.getInst().InitResult.recoverData.ticketNo;
        } else {
            ticket_no = NetData.NetData.getInst().BetResult.ticketNo;
        }
        dataOper.getReward(ticket_no, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
    },

    //游戏恢复
    recoverGame: function recoverGame() {
        this.errDialogTag = 2;
        //设置回复数据的投注和倍数
        this.setRecoverPriceAndLines();
        //判断恢复游戏的类型
        this.leftSetClick(true);
        this.rightSetClick(true);
        this.betSetClick(true);
        var recoverData = NetData.NetData.getInst().InitResult.recoverData; //recoverType 0:普通游戏1,特殊游戏，2：奖池 3:免费游戏 32免费游戏中有奖池奖
        var recoverType = recoverData.recoverType;
        if (recoverType == 0) {
            this.m_gameModel = 0;
        } else if (recoverType == 1) {
            this.m_gameModel = 3;
            if (recoverData.step == recoverData.freeGameTotalTimes && recoverData.step > 0) {
                this.m_gameModel = 0;
            }
        } else if (recoverType == 2) {
            this.m_gameModel = 4;
        } else if (recoverType == 3) {
            this.m_gameModel = 2; //
            this.m_freeStep = recoverData.step;
            this.m_freeStep++;
            this.freeGameModel();
        } else if (recoverType == 32) {
            this.m_freeStep = recoverData.step;
            this.m_freeStep++;
            this.freeGameModel();
            this.m_gameModel = 4;
        } else {
            cc.log("恢复类型出错");
        }
        var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        var scaleTo2 = cc.scaleTo(0.2, 0, 0);
        this.recoverToastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
        this.scheduleOnce(this.recoverNextStep, 1.2);
    },

    recoverNextStep: function recoverNextStep() {
        if (this.errDialogTag == 2) {
            //恢复
            this.setRecoverGameModelAndUnitData();
        }
    },

    //自动游戏
    autoCallback: function autoCallback(event) {
        if (this.autoFlag == 0) {
            this.rightBet = true;
            this.getIsLogin();
            //this.getBet();
        } else {
            this.autoFlag = 0;
            this.rightBet = false;
            this.autoIndex = this.autoLimit;
            this.autoLabel.string = "自动";
            this.autoTimes.node.active = false;
            this.rightSetClick(true);
        }
    },
    hideWait: function hideWait() {
        this.waitLayer.active = false;
    },

    showWaitBlackLayer: function showWaitBlackLayer() {
        this.blackLayer.active = true;
        this.waitLayer.active = true;
    },

    showWaitLayer: function showWaitLayer() {
        this.markWaitHide = false;
        this.whiteLayer.active = true;
        var self = this;
        this.m_waitintCallBack = function (dt) {
            if (!self.markWaitHide) {
                self.showWaitBlackLayer();
            } else {
                self.hideWaitLayer();
            }
        };
        this.scheduleOnce(this.m_waitintCallBack, 1);
    },

    hideWaitLayer: function hideWaitLayer(flag) {
        this.waitLayer.active = false;
        this.blackLayer.active = false;
        this.whiteLayer.active = false;
        this.unschedule(this.m_waitintCallBack);
    },

    btnActionCallBack: function btnActionCallBack(selectType) {
        if (selectType == 1) {
            if (this.isQuickPassFunction == true) {
                this.isQuicklyEnd = true;
                this.leftSetClick(true);
            } else {
                if (this.m_isQuickStopBt == true) {
                    this.leftSetClick(true);
                    this.quickStop();
                } else {
                    this.getIsLogin();
                    //this.getBet();
                }
            }
        } else if (selectType == 2) {
            //直接判断是否登录和是否余额够
            //判断是否登录
            var self = this;
            if (!CC_JSB) {
                var sdk = window.aliLotteryCasinoSDK;
                if (sdk) {
                    //判断是否登录
                    sdk.isLogin(function (isLogin) {
                        if (!isLogin) //没登录去登录
                            {
                                console.log("自动 没有登陆");
                                self.goLogin();
                            } else //登录了 判断是否获取豆成功
                            {
                                //在判断是否足额（淘宝相关） 
                                var flag = self.judgeBalance();
                                if (flag == true) {
                                    self.goAutoBet();
                                }
                            }
                    });
                } else {
                    this.goAutoBet();
                }
            } else {
                this.goAutoBet();
            }
        }
    },

    //goBet
    goAutoBet: function goAutoBet() {
        if (this.autoFlag == 0) {
            this.blackLayer.active = true;
            this.orderFlag = true;
            //是否自动开启10次丛林冒险，每局投***豆（可提前结束）？
            this.autoConLabel.string = "每局投" + this.m_line * this.m_price + NetData.NetData.getInst().InitResult.currency + "(可提前结束)";
            this.autoConfirm.runAction(cc.scaleTo(0.3, this.scaleValue));
        } else {
            this.autoCallback();
        }
    },

    lineChangeBet: function lineChangeBet(toggle, mes) {
        this.m_line = mes;
        this.changeSelectLineAction(mes);
        this.updateBeTInfo();
    },

    changeSelectLineAction: function changeSelectLineAction(mes) {
        for (var j = 0; j < NetData.NetData.getInst().InitResult.lineNums.length; j++) {
            this.selectLineList[j].stopAllActions();
            this.selectLineList[j].active = false;
            var line = NetData.NetData.getInst().InitResult.lineNums[j];
            if (mes == line) {
                this.selectLineList[j].active = true;
                this.selectLineList[j].opacity = 255;
                var action = cc.fadeOut(1.0);
                this.selectLineList[j].runAction(cc.sequence(cc.delayTime(2), action));
            }
        }
    },

    priceChangeBet: function priceChangeBet(index) {
        this.m_price = NetData.NetData.getInst().InitResult.mulriples[index];
        this.updateBeTInfo();
    },

    updateBeTInfo: function updateBeTInfo() {
        var total = this.m_line * this.m_price;
        this.betInfo.node.active = true;
        this.betInfo.string = "每局投: " + total + NetData.NetData.getInst().InitResult.currency;
    },

    //设置中奖层地块
    setRewardCube: function setRewardCube(ticketsArray) {
        for (var i = 0; i < ticketsArray.length; i++) {
            var str = ticketsArray[i];
            var cube = this.rewardCubeList[i];
            var cubeScript = cube.getComponent(cubeS);
            cubeScript.setCube(str);
            cube.active = false;
        }
    },
    //游戏恢复数据设置
    setRecoverGameModelAndUnitData: function setRecoverGameModelAndUnitData() {
        var netData = NetData.NetData.getInst();
        var ticketsArray = netData.InitResult.recoverData.ticketData[0];
        for (var i = 0; i < 5; i++) {
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for (var j = 3; j >= 0; j--) {
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            var flag = false;
            if (this.m_gameModel == 3) {
                flag = true;
            }
            unitS.setStopDataArray(dataArray, i + 1, flag);
        }
        this.setRewardCube(ticketsArray);
        this.scheduleOnce(this.startRound, 0.01);
    },
    //setRecoverPriceAndLines
    setRecoverPriceAndLines: function setRecoverPriceAndLines() {
        this.priceGroupNode.getComponent(PriceGroup).setLabelColor();
        var InitResult = NetData.NetData.getInst().InitResult;
        var mulriple = InitResult.defaultMulriple;
        var lineNum = InitResult.defaultLineNum;
        //免费游戏由于缓存问题 从recoverData里面取值
        if (InitResult.recoverData) {
            mulriple = InitResult.recoverData.mulriple;
            lineNum = InitResult.recoverData.lineNum;
        }
        //if(InitResult.)
        this.m_line = lineNum;
        this.m_price = mulriple;
        var mulripleToggleIndex = 0;
        var lineToggleIndex = 0;
        for (var i = 0; i < NetData.NetData.getInst().InitResult.mulriples.length; i++) {
            var mu = NetData.NetData.getInst().InitResult.mulriples[i];
            if (mulriple == mu) {
                this.priceGroupNode.getComponent(PriceGroup).clickOneToggle(i);
            }
        }
        for (var j = 0; j < NetData.NetData.getInst().InitResult.lineNums.length; j++) {
            var line = NetData.NetData.getInst().InitResult.lineNums[j];
            var flag = false;
            if (lineNum == line) {
                flag = true;
            }
            this.lineGroup[j].getComponent(cc.Toggle).isChecked = flag;
        }
        var selectLine = this.selectLine.getComponent(SelectLine);;
        selectLine.lineChange("", this.m_line);
        this.updateBeTInfo();
    },

    //投注过来的正常游戏
    setGameModelAndUnitData: function setGameModelAndUnitData() {
        if (this.rightBet == true) {
            this.autoFlag = 1;
            this.autoTimes.node.active = true;
            var leftTimes = this.autoLimit - this.autoIndex + 1;
            this.autoTimes.string = "第" + leftTimes + "次";
            this.autoLabel.string = "取消自动";
        }
        var netData = NetData.NetData.getInst();
        //判断游戏模式
        if (this.m_gameModel == 2) {
            //免费游戏
            this.m_freeStep++;
            if (netData.BetResult.resultType == 2) {
                this.m_gameModel = 4; //奖池大奖
            }
        } else {
            if (netData.BetResult.resultType == 1) {
                //大丰收
                this.m_gameModel = 3;
            } else if (netData.BetResult.resultType == 2) {
                this.m_gameModel = 4; //奖池大奖
            } else {
                //普通游戏
                this.m_gameModel = 0;
            }
        }
        var ticketsArray = netData.BetResult.ticketData[0];
        for (var i = 0; i < 5; i++) {
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for (var j = 3; j >= 0; j--) {
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            var flag = false;
            if (this.m_gameModel == 3) {
                flag = true;
            }
            unitS.setStopDataArray(dataArray, i + 1, flag);
        }
        this.setRewardCube(ticketsArray);
        this.scheduleOnce(this.startRound, 0.01);
    },

    //免费游戏
    freeGameModel: function freeGameModel() {
        this.m_gameModel = 2;
        for (var i = 0; i < this.pArray.length; i++) {
            var unit = this.pArray[i];
            unit.active = true;
        }
        this.betSetClick(true);
        if (this.m_freeLayerShowOnce == false) {
            this.m_freeLayerShowOnce = true;
            this.freeTitle.setPosition(0, 1050);
            this.freeTitle.active = true;
            this.freeTitle.runAction(cc.moveTo(0.6, cc.p(0, 589)));
        } else {}
        var freeGameLeftTimes = 0;
        if (this.errDialogTag == 2) {
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        } else {
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes;
        }
        this.freeGameTimeLabel.string = "" + freeGameLeftTimes + "次";
        this.lineGraphic.clear();
        this.m_isQuickStopBt = false;
        this.leftSetClick(true);
        this.rightSetClick(true);
        // if(this.autoFlag == 1){
        //     this.rightBet = false;
        //     this.autoCallback();
        // }
    },

    //大丰收
    setGreatGameModelAndUnitData: function setGreatGameModelAndUnitData() {
        //上局游戏的统配图案保留
        var specialArray = null;
        var ticketsArray = null;
        if (this.errDialogTag == 2) {
            //恢复
            specialArray = NetData.NetData.getInst().InitResult.recoverData.specialResultLocation;
            ticketsArray = NetData.NetData.getInst().InitResult.recoverData.ticketData[1];
        } else {
            specialArray = NetData.NetData.getInst().BetResult.specialResultLocation;
            ticketsArray = NetData.NetData.getInst().BetResult.ticketData[1];
        }
        this.setRewardCube(ticketsArray);
        for (var _i2 = 0; _i2 < this.pArray.length; _i2++) {
            var unit = this.pArray[_i2];
            unit.active = true;
        }
        for (var _i3 = 0; _i3 < specialArray.length; _i3++) {
            var index = specialArray[_i3];
            this.rewardCubeList[index].active = true;
            this.rewardCubeList[index].getComponent(cubeS).playAni();
        }
        this.m_gameModel = 0;
        for (var i = 0; i < 5; i++) {
            var dataArray = [];
            var unitS = this.pArray[i].getComponent(Unit);
            for (var j = 3; j >= 0; j--) {
                var str = ticketsArray[5 * j + i];
                dataArray.push(str);
            }
            unitS.setStopDataArray(dataArray, i + 1);
        }
        this.scheduleOnce(this.startRound, 0.01);
    },

    leftSetCanClick: function leftSetCanClick() {
        this.leftNotTouch.active = false;
        this.leftBt.active = true;
        this.leftGray.active = false;
    },

    startRound: function startRound() {
        this.isQuicklyEnd = false;
        this.isQuickPassFunction = false;
        this.state_gameing = true;
        this.betSetClick(true);
        var selectLine = this.selectLine.getComponent(SelectLine);;
        selectLine.lineChange("", this.m_line);
        if (this.autoFlag == 1) {
            this.rightSetClick(false);
            this.leftSetClick(true);
        } else {
            this.rightSetClick(true);
            this.leftLabel.string = "快速停止";
            this.m_isQuickStopBt = true;
            this.leftSetClick(true);
            this.scheduleOnce(this.leftSetCanClick, 0.7);
        }
        this.initMoney();
        this.index = 0;
        for (var i = 0; i < 5; i++) {
            var unitS = this.pArray[i].getComponent(Unit);
            unitS.startRound();
        }
        this.scheduleOnce(this.normalStop, 1.2);
    },

    quickStop: function quickStop() {
        this.unschedule(this.normalStop);
        this.unschedule(this.timeCallback);
        if (this.m_gameModel == 0) {
            this.m_gameModel = 1;
        }
        this.scheduleOnce(this.quickDelay, 0.01);
    },
    quickDelay: function quickDelay() {
        for (var i = 0; i < 5; i++) {
            var unitS = this.pArray[i].getComponent(Unit);
            unitS.stopRound();
        }
    },

    normalStop: function normalStop() {
        this.schedule(this.timeCallback, 0.3);
    },

    timeCallback: function timeCallback(dt) {
        var unitS = this.pArray[this.index].getComponent(Unit);
        unitS.stopRound();
        this.index++;
        if (this.index == 5) {
            this.unschedule(this.timeCallback);
        }
    },

    //滚动完毕之后中奖画线
    roundEnded: function roundEnded() {
        //左右都不能点
        this.rightSetClick(true);
        this.leftSetClick(true);
        this.lineIndex = 0;
        if (this.errDialogTag == 2) {
            this.m_orderResult = NetData.NetData.getInst().InitResult.recoverData.orderResult[0];
            if (this.m_greatGameHasFinishedOnePart == true) {
                this.m_orderResult = NetData.NetData.getInst().InitResult.recoverData.orderResult[1];
            }
        } else {
            this.m_orderResult = NetData.NetData.getInst().BetResult.orderResult[0];
            if (this.m_greatGameHasFinishedOnePart == true) {
                this.m_orderResult = NetData.NetData.getInst().BetResult.orderResult[1];
            }
        }
        if (this.m_gameModel == 3) {
            //大丰收延迟2秒
            var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.greatModelLayer.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
            this.scheduleOnce(this.delayGreatModel, 2.5);
        } else {
            this.updataFrontList();
            if (this.isQuicklyEnd == true) {
                this.setMoney();
                this.judgeFreeAndGreatGame();
                this.isQuicklyEnd = false;
            } else {
                this.showReward();
            }
        }
    },

    delayGreatModel: function delayGreatModel() {
        this.updataFrontList();
        if (this.isQuicklyEnd == true) {
            this.setMoney();
            this.judgeFreeAndGreatGame();
            this.isQuicklyEnd = false;
            this.betInfo.node.active = false;
        } else {
            this.showReward();
        }
    },

    //变换实际滚动层和中奖层
    updataFrontList: function updataFrontList() {
        for (var i = 0; i < this.pArray.length; i++) {
            var unit = this.pArray[i];
            unit.getComponent(Unit).hiddleCube();
            unit.active = false;
        }
        for (var _i4 = 0; _i4 < this.rewardCubeList.length; _i4++) {
            var rewardCube = this.rewardCubeList[_i4];
            rewardCube.active = true;
            rewardCube.getComponent(cubeS).stopAni();
        }
    },

    //中奖画线
    drawLine: function drawLine() {
        var array = this.m_orderResult[this.lineIndex].locations;
        var ctx = this.lineGraphic;
        ctx.clear();
        ctx.moveTo(this.lineList[array[0]].x, this.lineList[array[0]].y);

        for (var i = 1; i < array.length; i++) {
            ctx.lineTo(this.lineList[array[i]].x, this.lineList[array[i]].y);
        }
        ctx.stroke();
    },

    initMoney: function initMoney() {
        var freeGameLeftTimes = 0;
        if (this.errDialogTag == 2) {
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        } else {
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes;
        }
        if (freeGameLeftTimes > 0 || freeGameLeftTimes == 0 && this.m_freeStep > 1) {
            if (this.errDialogTag == 2) {
                //恢复模式
                this.dou = NetData.NetData.getInst().InitResult.recoverData.bonusAmount;
            }
        } else {
            if (this.m_greatGameHasFinishedOnePart == true) {} else {
                this.dou = 0;
            }
            if (this.errDialogTag == 2) {
                //恢复数据结算
                if (NetData.NetData.getInst().InitResult.recoverData.recoverType == 32) {
                    this.dou = NetData.NetData.getInst().InitResult.recoverData.bonusAmount;
                }
            }
        }
        if (this.dou > 0) {
            this.betInfo.node.active = true;
        } else {
            this.betInfo.node.active = false;
        }
        this.betInfo.string = "累计中奖" + this.dou + NetData.NetData.getInst().InitResult.currency;
    },
    addMoney: function addMoney() {
        this.dou += this.m_orderResult[this.lineIndex].amount;
        if (this.dou > 0) {
            this.betInfo.node.active = true;
            this.betInfo.string = "累计中奖" + this.dou + NetData.NetData.getInst().InitResult.currency;
        }
    },

    showReward: function showReward(sender) {
        //缺失全屏大奖的判断
        if (this.m_gameModel == 4) {
            var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.greatModelLayer.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
            this.scheduleOnce(this.judgeFreeAndGreatGame, 2.5);
        } else {
            var num = this.m_orderResult.length;
            //中奖
            if (num > 0) {
                //打开快速跳过动画功能 非自动游戏
                if (this.autoFlag == 0) {
                    this.leftLabel.string = "快速停止";
                    this.isQuickPassFunction = true;
                    this.leftSetClick(false);
                }
                this.cover.active = true;
                this.cover.zIndex = 18;
                this.lightLayer.zIndex = 19;
                this.drawLine();
                var array = this.m_orderResult[this.lineIndex].locations;
                var len = this.m_orderResult[this.lineIndex].num; //中奖连线动物个数

                var span = 0.05; //0.04545;
                var dy1 = span * 6;
                var sc1 = span * 8;
                var dyT = 0;
                var max = 0;

                for (var i = 0; i < len; i++) {
                    var col = array[i] % 5;

                    switch (col) {
                        case 0:
                            //第一排
                            {}
                            break;
                        case 1:
                            {
                                if (max < 1) {
                                    max = 1;
                                    dyT = dy1 + sc1;
                                }
                            }
                            break;
                        case 2:
                            {
                                if (max < 2) {
                                    max = 2;
                                    dyT = dy1 * 2 + sc1;
                                }
                            }
                            break;
                        case 3:
                            {
                                if (max < 3) {
                                    max = 3;
                                    dyT = dy1 * 3 + sc1;
                                }
                            }
                            break;
                        case 4:
                            {
                                if (max < 4) {
                                    max = 4;
                                    dyT = dy1 * 4 + sc1;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }

                for (var _i5 = 0; _i5 < len; _i5++) {
                    var pa = this.frontList[array[_i5]];
                    pa.zIndex = 20;
                    var lt = this.lightList[array[_i5]];
                    lt.active = true;
                    var scale1 = cc.sequence(cc.scaleTo(span, 0.875), cc.scaleTo(span * 3, 1.46).easing(cc.easeExponentialOut()), cc.scaleTo(span * 2, 1.24), cc.scaleTo(span, 1.35), cc.scaleTo(span, 1.1));
                    var scale2 = cc.sequence(cc.scaleTo(span, 0.875), cc.scaleTo(span * 3, 1.46).easing(cc.easeExponentialOut()), cc.scaleTo(span * 2, 1.24), cc.scaleTo(span, 1.35), cc.scaleTo(span, 1.1));
                    var _col = array[_i5] % 5;

                    switch (_col) {
                        case 0:
                            //第一排
                            {
                                pa.runAction(scale1);
                                lt.runAction(scale2);
                            }
                            break;
                        case 1:
                            {
                                pa.runAction(cc.sequence(cc.delayTime(dy1), scale1));
                                lt.runAction(cc.sequence(cc.delayTime(dy1), scale2));
                            }
                            break;
                        case 2:
                            {
                                pa.runAction(cc.sequence(cc.delayTime(dy1 * 2), scale1));
                                lt.runAction(cc.sequence(cc.delayTime(dy1 * 2), scale2));
                            }
                            break;
                        case 3:
                            {
                                pa.runAction(cc.sequence(cc.delayTime(dy1 * 3), scale1));
                                lt.runAction(cc.sequence(cc.delayTime(dy1 * 3), scale2));
                            }
                            break;
                        case 4:
                            {
                                pa.runAction(cc.sequence(cc.delayTime(dy1 * 4), scale1));
                                lt.runAction(cc.sequence(cc.delayTime(dy1 * 4), scale2));
                            }
                            break;
                        default:
                            break;
                    }
                }

                this.scheduleOnce(this.showlightList, dyT);
            } else {
                this.judgeFreeAndGreatGame();
            }
        }
    },

    showlightList: function showlightList() {
        //加钱
        this.addMoney();
        var span = 0.045 * 5;
        this.scheduleOnce(this.reset, span * 6);
    },

    doNextThing: function doNextThing() {
        this.showReward();
    },

    //结算游戏
    rewardGame: function rewardGame() {
        var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
        var scaleTo2 = cc.scaleTo(0.2, 0, 0);
        var amount = NetData.NetData.getInst().RewardResult.bonusAmount;
        if (amount == 0) {
            //新修改 未中奖不再显示 未中奖提示
            //this.toastNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
            this.scheduleOnce(this.resetGame, 2);
        } else {
            if (this.m_gameModel == 4) {
                var scale11 = cc.scaleTo(0.2, this.scaleValue);
                this.specialRewardLabel.string = "中" + amount + NetData.NetData.getInst().InitResult.currency;
                this.specialRewardNode.runAction(cc.sequence(scale11, cc.delayTime(2), scaleTo2));
                this.scheduleOnce(this.resetGame, 2);
            } else {
                this.rewardLabel.string = "中" + amount + NetData.NetData.getInst().InitResult.currency;
                this.rewardNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
                this.scheduleOnce(this.resetGame, 2);
            }

            this.spineAniNode.active = true;
            this.spineAniNode.getComponent('WinAni').aniStart();
            this.scheduleOnce(this.stopSpineAni, 3.5);
        }
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                //活动
                window.aliLotteryCasinoSDK.throwTimer('roundComplete');
            }
        }
    },
    //动画
    stopSpineAni: function stopSpineAni() {
        this.spineAniNode.active = false;
    },
    //单个动画之后重置
    reset: function reset() {
        var array = this.m_orderResult[this.lineIndex].locations;
        var len = array.length;
        for (var i = 0; i < len; i++) {
            var lt = this.lightList[array[i]];
            lt.active = false;
            var pa = this.frontList[array[i]];
            pa.setScale(1);
            pa.zIndex = 0;
        }
        this.cover.zIndex = 1;
        this.cover.active = false;
        this.lineGraphic.clear();
        ++this.lineIndex;
        len = this.m_orderResult.length;
        if (this.isQuicklyEnd == true) {
            this.setMoney(); //累计中豆加上
            this.lineIndex = len;
            this.isQuicklyEnd = false;
        }
        if (this.lineIndex < len) {
            this.doNextThing();
        } else {
            //最后判断有没有免费游戏和大丰收
            this.isQuicklyEnd = false;
            this.judgeFreeAndGreatGame();
        }
    },

    setMoney: function setMoney() {
        var len = this.m_orderResult.length;
        for (var i = this.lineIndex; i < len; i++) {
            this.dou += this.m_orderResult[i].amount;
        }
        if (this.dou > 0) {
            this.betInfo.node.active = true;
            this.betInfo.string = "累计中奖" + this.dou + NetData.NetData.getInst().InitResult.currency;
        }
    },

    judgeFreeAndGreatGame: function judgeFreeAndGreatGame() {
        //....判断本轮中是否有免费游戏
        var freeGameLeftTimes = 0;
        if (this.errDialogTag == 2) {
            freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
        } else {
            freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes;
        }
        //判断大丰收是否结束 变成普通游戏判断 0 1 2
        if (this.m_greatGameHasFinishedOnePart == true) {
            this.m_gameModel = 0;
        }
        //首先判断大丰收 大丰收优先级最高
        if (this.m_gameModel == 3) {
            this.m_greatGameHasFinishedOnePart = true;
            //大丰收下一轮
            this.setGreatGameModelAndUnitData();
        } else {
            //普通游戏 0 1 2
            if (freeGameLeftTimes > 0) {
                //判断免费游戏中是否有奖池奖
                if (this.m_gameModel == 4) {
                    //加钱
                    this.dou += this.m_orderResult[0].amount;
                    this.betInfo.string = "累计中奖" + this.dou + NetData.NetData.getInst().InitResult.currency;
                    //提示中多少钱
                    var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
                    var scaleTo2 = cc.scaleTo(0.2, 0, 0);
                    this.specialRewardLabel.string = "中" + this.m_orderResult[0].amount + NetData.NetData.getInst().InitResult.currency;
                    this.specialRewardNode.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
                }
                //弹出提示框 免费游戏
                this.showFreeModelLayer();
            } else {
                //如果有大丰收 停止大丰收特殊动画
                for (var i = 0; i < this.rewardCubeList.length; i++) {
                    this.rewardCubeList[i].getComponent(cubeS).stopAni();
                }
                //调结算
                this.getReward();
            }
        }
    },

    showFreeModelLayer: function showFreeModelLayer() {
        if (this.m_freeLayerShowOnce == false) {
            var freeGameLeftTimes = 0;
            if (this.errDialogTag == 2) {
                freeGameLeftTimes = NetData.NetData.getInst().InitResult.recoverData.freeGameLeftTimes;
            } else {
                freeGameLeftTimes = NetData.NetData.getInst().BetResult.freeGameLeftTimes;
            }
            this.freeModelLabel.string = "" + freeGameLeftTimes + "次";
            var scaleTo1 = cc.scaleTo(0.2, 1.0, 1.0);
            var scaleTo2 = cc.scaleTo(0.2, 0, 0);
            this.freeModelLayer.runAction(cc.sequence(scaleTo1, cc.delayTime(2), scaleTo2));
            this.shakeEgg();
            this.scheduleOnce(this.freeGameModelDelay, 2.5);
        } else {
            var eggArray = null;
            if (this.errDialogTag == 2) {
                eggArray = NetData.NetData.getInst().InitResult.recoverData.freeResult[0];
            } else {
                eggArray = NetData.NetData.getInst().BetResult.freeResult[0];
            }
            if (eggArray != null) {
                this.shakeEgg();
                this.scheduleOnce(this.freeGameModelDelay, 2);
            } else {
                this.scheduleOnce(this.freeGameModelDelay, 0.01);
            }
        }
    },

    shakeEgg: function shakeEgg() {
        var eggArray = null;
        if (this.errDialogTag == 2) {
            eggArray = NetData.NetData.getInst().InitResult.recoverData.freeResult[0];
        } else {
            eggArray = NetData.NetData.getInst().BetResult.freeResult[0];
        }
        if (eggArray != null) {
            for (var i = 0; i < eggArray.locations.length; i++) {
                var index = eggArray.locations[i];
                var rewardCube = this.frontList[index];
                rewardCube.getComponent(cubeS).shakeEgg();
                this.scheduleOnce(this.freeGameModelDelay, 2);
            }
        }
    },

    freeGameModelDelay: function freeGameModelDelay() {
        this.freeGameModel();
        this.getIsLogin();
    },

    //下轮游戏初始化
    resetGame: function resetGame() {
        //中间画线层active false
        for (var i = 0; i < this.rewardCubeList.length; i++) {
            var cube = this.rewardCubeList[i];
            cube.active = false;
        }
        //滚动cube层显示
        for (var _i6 = 0; _i6 < this.pArray.length; _i6++) {
            var unit = this.pArray[_i6];
            unit.active = true;
        }
        this.dou = 0;
        this.state_gameing = false;
        this.m_greatGameHasFinishedOnePart = false;
        this.m_freeLayerShowOnce = false;
        this.m_freeStep = 1;
        this.m_gameModel = 0;
        this.rightBet = false;
        this.lineGraphic.clear();
        this.freeTitle.active = false;
        if (this.autoFlag == 1) {
            //自动游戏模式
            this.rightSetClick(false);
            this.autoIndex--;
            this.autoTimes.node.active = true;
            var leftTimes = this.autoLimit - this.autoIndex + 1;
            this.autoTimes.string = "第" + leftTimes + "次";
            if (this.autoIndex == 0) {
                this.autoCallback();
                this.isQuickPassFunction = false;
                this.leftLabel.string = "玩1次";
                this.betSetClick(false);
                this.m_isQuickStopBt = false;
                this.rightSetClick(false);
                this.leftSetClick(false);
                this.updateBeTInfo();
            } else {
                this.getIsLogin();
            }
        } else {
            this.isQuickPassFunction = false;
            this.leftLabel.string = "玩1次";
            this.betSetClick(false);
            this.m_isQuickStopBt = false;
            this.rightSetClick(false);
            this.leftSetClick(false);
            this.updateBeTInfo();
        }
    },

    //true 不能点击
    rightSetClick: function rightSetClick(flag) {
        this.rightNotTouch.active = flag;
        this.rightBt.active = !flag;
        this.rightGray.active = flag;
    },

    leftSetClick: function leftSetClick(flag) {
        this.leftNotTouch.active = flag;
        this.leftBt.active = !flag;
        this.leftGray.active = flag;
    },
    //投注区域不能点
    betSetClick: function betSetClick(flag) {
        var betNotTouch = cc.find("Canvas/betArea/betNotTouch");
        betNotTouch.active = flag;
        this.lineBt.active = !flag;
        this.lineGray.active = flag;
        this.priceGroupNode.getComponent(PriceGroup).betPriceSetEnable(flag);
    },

    //更新用户余额信息
    updateUserInfo: function updateUserInfo() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.updateUserInfo();
            }
        }
    },

    /****************淘宝相关****************/
    //余额判断
    judgeBalance: function judgeBalance() {
        var fg = true;

        if (NetData.NetData.getInst().balance == -1) {
            // this.blackLayer.active = true;
            // this.wenhaoDia.runAction(cc.scaleTo(0.2, 1.0, 1.0));
            fg = false;
        } else if (this.m_price * this.m_line > NetData.NetData.getInst().balance) {
            if (!CC_JSB) {
                this.rechargeToastJudge();
                if (window.aliLotteryCasinoSDK) {
                    if (this.m_gameModel != 2) {
                        window.aliLotteryCasinoSDK.recharge(true);
                    }
                }
            }
            fg = false;
            if (this.autoFlag == 1) {
                this.autoCallback();
                //自动游戏钱不够了停止自动
                this.resetGame();
            }
        }
        //如果是免费游戏 则不需要判断余额
        if (this.m_gameModel == 2) {
            fg = true;
        }
        return fg;
    },

    //
    setTaobaoSDK: function setTaobaoSDK() {
        /*******************淘宝相关************************/

        //  /**
        var sdk = window.aliLotteryCasinoSDK;

        //user icon
        if (!CC_JSB) {

            this.sdkUid = -1;

            var self = this;
            // 由于在绑定时可能已经触发过该事件，可以先获取一下
            if (sdk) {
                // this.testBut1.active = false;

                sdk.getUserInfo(function (user) {
                    if (user) {
                        var uid = user.uid;
                        // var nick = user.nick;
                        var fee = user.fee;

                        if (self.sdkUid && self.sdkUid != uid) {
                            self.sdkBalance = fee;
                            self.sdkUid = uid;
                        }
                    }
                });
                //end usericon

                //order
                document.addEventListener('casino:click', function (e) {
                    // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                    console.log("casino:click" + e.data.type);
                    if (e.data.type == 'order') {
                        sdk.isLogin(function (isLogin) {
                            // isLogin 为 true 为登录 ，false 为未登录
                            if (isLogin) {
                                if (NetData.NetData.getInst().helpShowFlag) {
                                    var st = self.helpNode.getComponent("Help");
                                    st.close();
                                }

                                if (!NetData.NetData.getInst().orderShowFlag) {

                                    console.log("orderFlag", self.orderFlag);

                                    if (!self.orderFlag) {
                                        self.getOrderList();
                                    } else {
                                        console.log("can not order something！");
                                    }
                                } else {
                                    var s1 = self.orderNode.getComponent("JiluListScript");
                                    s1.close();
                                }
                            } else {
                                self.goLogin();
                            }
                        });
                    } else if (e.data.type == 'rule') {
                        var s1 = self.helpNode.getComponent("Help");

                        if (NetData.NetData.getInst().orderShowFlag) {
                            var st = self.orderNode.getComponent("JiluListScript");
                            st.close();
                        }

                        if (!NetData.NetData.getInst().helpShowFlag) {
                            if (self.ruleHasShowOnce == true) {
                                self.waitLayer.active = true;
                                s1.downHelp();
                            } else {
                                console.log(" ruleFlag", self.orderFlag);
                                if (!self.orderFlag) {
                                    self.getRule();
                                } else {
                                    console.log("can not rule something！");
                                }
                            }
                            //s1.initHelp();
                        } else {
                            s1.close();
                        }
                    }
                }, false);

                document.addEventListener('casino:back', function () {
                    console.log("casino:back");
                    if (self.errDialogTag == 1) {
                        self.exitGame();
                    } else {
                        if (self.state_gameing) {
                            self.blackLayer.active = true;
                            self.backLayer.scale = 0;
                            var scaleTo1 = cc.scaleTo(0.2, 1.2, 1.2);
                            var scaleTo2 = cc.scaleTo(0.1, 1.0, 1.0);
                            self.backLayer.runAction(cc.sequence(scaleTo1, scaleTo2));
                        } else {
                            self.exitGame();
                        }
                    }
                }, false);

                //窗口激活事件，当 App 从后台切回到前台时会触发
                document.addEventListener('casino:resume', function (e) {
                    console.log("casino:resume");
                }, false);

                //余额有变化而且是未登录状态，监听后去fresh初始化刷新（self.sdkUid != uid）只代表是否登录，不代表是不是同一个用户(2017-03-24 pm:530)
                document.addEventListener('casino:updateUserBalance', function (e) {
                    // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                    console.log("casino:updateUserBalance");
                    var uid = e.data.uid;
                    // var nick = e.data.nick;
                    var fee = e.data.fee;

                    if (self.sdkUid !== null && self.sdkUid != uid) {
                        // self.showUserIcon(uid, nick);
                        console.log("casino:updateUserBalance first login!! ");
                        self.fresh();
                        self.sdkUid = uid;
                    }
                    NetData.NetData.getInst().balance = fee;
                    self.sdkBalance = fee;
                }, false);
                //sdk.throwTimer('initialize');//活动
            } else {
                this.sdkBalance = 10000;
            }
        } else {
            this.sdkBalance = 10000;
        }
    },

    /***********************************淘宝相关*******************************************************/
    //请刷新页面
    fresh: function fresh() {
        var initResult = NetData.NetData.getInst().InitResult;
        if (initResult) {
            this.markGetInitFlag = false;

            this.hideWaitLayer(true);
            this.unschedule(this.getPool);
            this.orderFlag = true;
            if (this.autoFlag == 1) {
                this.autoCallback();
            }
            this.resetGame();
            this.getInit();
            console.log("fresh UI"); //
        } else {
            console.log("has not fresh"); //
        }
    },

    //  /*

    //退出游戏
    exitGame: function exitGame() {
        // this.stopAllActions();
        this.unschedule(this.getPool);

        console.log("exitGame");

        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.popWindow();
            }
        } else {
            console.log("director.loadScene");
            cc.director.loadScene('game');
        }
    },

    setUnitSpecialModel: function setUnitSpecialModel() {
        this.pArray[1].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[2].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[3].getComponent(Unit).setIsSpecialModel(true);
        this.pArray[4].getComponent(Unit).setIsSpecialModel(true);
    },

    start: function start() {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }
    },

    goLogin: function goLogin() {
        if (!CC_JSB) {
            var self = this;
            var sdk = window.aliLotteryCasinoSDK;

            if (sdk) {
                console.log("goin sdk!");

                sdk.login(function () {
                    //需要调初始化;

                    console.log("login callback!");

                    sdk.updateUserInfo();

                    console.log("before fresh!");

                    //self.fresh();

                    console.log("after fresh!");
                });
            } else {
                this.fresh();
            }
        } else {
            this.fresh();
        }
    },

    getIsLogin: function getIsLogin() {
        //   console.log("getIsLogin");
        if (!CC_JSB) {
            // console.log("CC_JSB");
            var self = this;
            var sdk = window.aliLotteryCasinoSDK;
            if (sdk) {
                console.log("sdk");

                sdk.isLogin(function (isLogin) {

                    if (!isLogin) //没登录去登录
                        {
                            console.log("goLogin");
                            self.goLogin();
                        } else //登录了 判断是否获取豆成功
                        {
                            console.log("淘宝:登陆了");
                            //在判断是否足额（淘宝相关） 
                            var flag = self.judgeBalance();
                            if (flag) {
                                self.getBet();
                            } else {
                                console.log("获取豆失败或者其他失败");
                            }
                        }
                });
            } else {
                console.log("没有登陆淘宝 startBet");
                this.getBet();
            }
        } else {
            // console.log("startBet");
            this.getBet();
        }
    },

    testOrder: function testOrder() {
        this.test("order");
    },

    testRule: function testRule() {
        this.test("rule");
    },

    //test
    test: function test(type) {
        var self = this;
        if (type == 'order') {
            if (1) {
                if (NetData.NetData.getInst().helpShowFlag) {
                    var st = self.helpNode.getComponent("Help");
                    st.close();
                }
                if (!NetData.NetData.getInst().orderShowFlag) {
                    console.log("^^ orderFlag", self.orderFlag);
                    if (!self.orderFlag) {
                        self.getOrderList();
                    } else {
                        console.log("can not order something！");
                    }
                } else {
                    var s1 = self.orderNode.getComponent("JiluListScript");
                    s1.close();
                }
            } else {
                self.goLogin();
            }
        }

        if (type == 'rule') {
            var _s = self.helpNode.getComponent("Help");
            if (NetData.NetData.getInst().orderShowFlag) {
                var _st = self.orderNode.getComponent("JiluListScript");
                _st.close();
            }

            if (!NetData.NetData.getInst().helpShowFlag) {
                if (self.ruleHasShowOnce == true) {
                    self.waitLayer.active = true;
                    _s.downHelp();
                } else {
                    console.log(" ruleFlag", self.orderFlag);
                    if (!self.orderFlag) {
                        self.getRule();
                    } else {
                        console.log("can not rule something！");
                    }
                }
                //s1.initHelp();
            } else {
                _s.close();
            }
        }
    }
});

cc._RFpop();
},{"DataOper":"DataOper","GameData":"GameData","Init":"Init","JiangChi":"JiangChi","NetData":"NetData","PriceGroup":"PriceGroup","SelectLine":"SelectLine","cube":"cube","unit":"unit"}],"Help":[function(require,module,exports){
"use strict";
cc._RFpush(module, '74f944jT6xFkpNd4jx2VE0V', 'Help');
// Script/Help.js

"use strict";

var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack: cc.Node,
        testNode: cc.Node,
        scrollView: cc.Node,
        content: cc.Node,
        view: cc.Node,
        lock: false,
        gameNode: cc.Node,
        imgArray: [cc.Sprite],
        scaleValue: 1
    },

    // use this for initialization
    onLoad: function onLoad() {
        var size = cc.director.getWinSize();
        var ssss = size.width * 1660 / (1080 * size.height);
        this.scaleValue = ssss;
        this.netData = NetData.NetData.getInst();
        this.lock = true;
        var oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;
        var callFunc_1 = cc.callFunc(function () {
            this.lock = false;
            var se = cc.director.getWinSize();
            this.scrollView.height = se.height * 0.8;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height;
            //console.log("ny=" + this.node.y);
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(0.1), callFunc_1));

        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
            this.close();
        }, this);
    },

    close: function close() {
        if (!this.lock) {
            this.uiBlack.active = false;
            var call3 = cc.callFunc(function () {
                this.netData.helpShowFlag = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height)), call3));
        }
    },

    downHelp: function downHelp() {
        if (NetData.NetData.getInst().GameRule == null) {
            cc.log("GameRule is null ");
            return;
        }
        var self = this;
        var spt = this.gameNode.getComponent(Game);
        var rh = 0;
        var res = this.netData.GameRule.helpRule.rulePics;
        cc.loader.load(res, null, function (errors, results) {
            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    console.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                }
            }
            cc.log("results is %% ", results.getContent.length);
            var len = self.netData.GameRule.helpRule.rulePics.length;

            for (var _i = 0; _i < len; _i++) {

                var aTex = results.getContent(self.netData.GameRule.helpRule.rulePics[_i]);
                console.log(self.netData.GameRule.helpRule.rulePics[_i] + "|" + aTex);
                var sf = new cc.SpriteFrame();
                sf.setTexture(aTex);
                self.imgArray[_i].node.active = true;
                self.imgArray[_i].spriteFrame = sf;
                //
                var width = self.imgArray[_i].node.width;
                var heightT = 1080 / width * self.imgArray[_i].node.height * self.scaleValue;
                self.imgArray[_i].node.width = 1080 * self.scaleValue;
                self.imgArray[_i].node.height = heightT;
                //self.imgArray[i].node.setScale(1080 / width);
                rh += heightT;
                cc.log("height is $$$ ", self.imgArray[_i].node.height);
                //支持多张图排版（2017-03-27 pm：520）
                if (_i > 0) {

                    var index = _i - 1;
                    var ht = self.imgArray[index].node.height;
                    self.imgArray[_i].node.y = self.imgArray[index].node.y - ht + 1;
                    // cc.log("height is $$$ ", ht);
                }
            }

            // if(len == 2){
            //     let ht = self.imgArray[0].node.height;
            //     self.imgArray[1].node.y = -ht;
            // }
            self.content.height = rh;
            spt.hideWait();
            self.initHelp();
        });
    },

    initHelp: function initHelp() {
        if (!this.lock) {
            console.log("initHelp");
            this.netData.helpShowFlag = true;
            this.lock = true;
            this.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.p(0, 0), 0.1);
            var callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.oriY)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    }
});

cc._RFpop();
},{"Game":"Game","NetData":"NetData"}],"Init":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a78f2x52kFKtbygdGmeDrnY', 'Init');
// Script/network/Init.js

"use strict";

var DataOper = require("DataOper");
var NetData = require("NetData");
var SdkData = require("SdkData");

cc.Class({
    extends: cc.Component,

    /*ctor: function() {
        
    },*/

    init: function init() {
        var self = this;
        var sdk = window.aliLotteryCasinoSDK;
        if (!CC_JSB && sdk) {
            document.addEventListener('casino:init', function (e) {
                if (e && e.data && e.data.accessToken) {
                    DataOper.DataOper.getInst().gameToken = e.data.accessToken;
                }
                var f = e; //
                self.fetch(function (isError) {
                    console.log(isError);
                    if (!isError) {
                        //皮肤
                        // var skin = "";
                        // var extend = "";
                        NetData.NetData.getInst().skin = f.data.skinConfig;

                        // if(initResult){
                        //     skin = initResult.skin.skinUrl;
                        //     extend = initResult.extend;
                        // }
                        // 合并资源
                        sdk.mergeResources(sdk.analyseResouce({
                            // skin: skin,
                            // extra: extend
                        }));
                        // 显示 loading
                        sdk.initLoading();
                        // 运行游戏
                        sdk.runGame();
                    } else {
                        sdk.showError();
                    }
                });
            }, false);
        } else {}
    },

    fetch: function fetch(callback) {
        cc.log("fetch");
        this.initData = {};
        var self = this;
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(function (cmd, res, msg, self) {
            // 判断是否成功并存储初始化
            var isError = false;
            if (res == 100007) {
                isError = false;
            } else if (200019 == res) {
                isError = false;
            } else if (res != 0) {
                isError = true;
            }
            cc.log('fetch init data');
            cc.log(cmd, res, msg);
            self.initData.cmd = cmd;
            self.initData.res = res;
            self.initData.msg = msg;
            callback && callback(isError);
        }, this);
    }
});

cc._RFpop();
},{"DataOper":"DataOper","NetData":"NetData","SdkData":"SdkData"}],"JiangChi":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e0b95wN85hPEqrPaZ8wReoy', 'JiangChi');
// Script/JiangChi.js

"use strict";

var NetData = require("NetData");
var Common = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        firstNumber: {
            default: null,
            type: cc.Node
        },
        boomScreen: {
            default: null,
            type: cc.Node
        },
        spine: {
            default: null,
            type: cc.Node
        },
        poolOther: {
            default: null,
            type: cc.Node
        },
        detailLabelNode: {
            default: null,
            type: cc.Node
        },
        detailLabelTop: {
            default: null,
            type: cc.Label
        },
        detailLabelDown: {
            default: null,
            type: cc.Label
        },
        detailIndex: 0, //爆屏索引
        detailArray: [], //服务器给的字段
        detailArrayTop: [], //爆屏信息上部分字体
        detailArrayDown: [], //爆屏信息下部分字体

        flag: false, //已经打开奖池爆屏
        allActionHasFinished: false, //爆屏和奖池出现动画都播放完毕
        index: 0 },

    // use this for initialization
    onLoad: function onLoad() {},

    /*******爆屏 */
    startboomScreenAction: function startboomScreenAction() {
        this.boomScreen.active = true;
        this.poolOther.active = false;
        var moveTo = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut(3.0));
        var finish = cc.callFunc(this.playBoomScreen, this);
        var seq = cc.sequence(cc.delayTime(1), moveTo, finish);
        this.boomScreen.runAction(seq);
    },
    playBoomScreen: function playBoomScreen() {
        this.detailIndex++;
        this.spine.getComponent('sp.Skeleton').setAnimation(0, 'animation2', false);
        this.detailLabelTop.string = this.detailArrayTop[this.detailIndex - 1];
        this.detailLabelDown.string = this.detailArrayDown[this.detailIndex - 1];
        this.detailLabelNode.scale = 1;
        var scaleTo = cc.scaleTo(0.4, 1.5);
        var fadeOut = cc.fadeOut(0.4);
        var spawn = cc.spawn(scaleTo, fadeOut);
        var finish = cc.callFunc(this.nextplayBoomScreen, this);
        var actionArray = [];
        actionArray.push(cc.delayTime(0.08));
        actionArray.push(cc.fadeIn(0));
        actionArray.push(cc.delayTime(3));
        actionArray.push(spawn);
        actionArray.push(cc.delayTime(1));
        actionArray.push(finish);
        if (this.detailIndex == this.detailArray.length) {
            var boomFinish = cc.callFunc(this.boomScreenFinished, this);
            actionArray.push(boomFinish);
        }
        var seq = cc.sequence(actionArray);
        this.detailLabelNode.runAction(seq);
    },

    nextplayBoomScreen: function nextplayBoomScreen() {
        if (this.detailIndex < this.detailArray.length) {
            this.playBoomScreen();
        }
    },
    //BoomScreen 播放完毕
    boomScreenFinished: function boomScreenFinished() {
        var moveTo = cc.moveTo(0.5, cc.p(0, 276)).easing(cc.easeBounceIn(3.0));
        var finish = cc.callFunc(this.boomScreenMoveUpFinished, this);
        var seq = cc.sequence(moveTo, finish);
        this.boomScreen.runAction(seq);
    },
    //爆屏收回去了
    boomScreenMoveUpFinished: function boomScreenMoveUpFinished() {
        this.startPoolOtherAction();
    },

    /*******奖池奖 */
    startPoolOtherAction: function startPoolOtherAction() {
        this.boomScreen.active = false;
        this.poolOther.active = true;
        var moveTo = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeBounceOut(3.0));
        var finish = cc.callFunc(this.poolNodeJumpFinish, this);
        var seq = cc.sequence(cc.delayTime(1), moveTo, finish);
        this.poolOther.runAction(seq);
    },
    //pool
    poolNodeJumpFinish: function poolNodeJumpFinish() {
        this.allActionHasFinished = true;
    },

    initData: function initData(count) {
        if (this.flag == false) {
            //爆屏只开启一次
            this.flag = true;
            var initResult = NetData.NetData.getInst().InitResult;
            this.detailArray = initResult.historyPool;
            if (this.detailArray.length > 0) {
                this.setDetailArrayString();
            } else {
                //直接播放奖池奖动画
                this.startPoolOtherAction();
            }
        }
        if (this.allActionHasFinished == true) {
            var theUnit = this.firstNumber.getComponent("number");
            theUnit.initData(count);
        }
    },
    //取得用户的昵称
    setDetailArrayString: function setDetailArrayString() {
        var self = this;
        this.index = 0;
        this.detailArrayDown = [];
        this.detailArrayTop = [];
        for (var i = 0; i < this.detailArray.length; i++) {
            var j = i;
            var downStrIndex = this.detailArray[j].indexOf("##");
            var downStr = this.detailArray[j].substring(downStrIndex + 2);
            this.detailArrayDown.push(downStr);
            //下部分
            var cutStr = this.detailArray[j].substring(downStrIndex, -downStrIndex);
            this.detailArrayTop.push(cutStr);
            var indexOne = cutStr.indexOf("$");
            var subString = cutStr.substring(indexOne + 1);
            var indexTwo = subString.indexOf("$");
            var uid = subString.substring(indexTwo, -indexTwo);
            Common.Common.getInst().getNick(j, uid, function (jj, nick) {
                //异步的
                var newId = "$" + uid + "$";
                var newstr = self.detailArrayTop[jj].replace(newId, nick);
                self.detailArrayTop[jj] = newstr;
                self.index++;
                if (self.index == self.detailArray.length) {
                    self.startboomScreenAction();
                }
            });
        }
    }

});

cc._RFpop();
},{"Common":"Common","NetData":"NetData"}],"JiluListScript":[function(require,module,exports){
"use strict";
cc._RFpush(module, '10c90r4USJN17MFsR0Fpzmn', 'JiluListScript');
// Script/JiluListScript.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");

cc.Class({
    extends: cc.Component,

    properties: {
        grayPrefab: {
            default: null,
            type: cc.Prefab
        },

        testNode: {
            default: null,
            type: cc.Node
        },
        noOrderNode: {
            default: null,
            type: cc.Node
        },
        goNode: {
            default: null,
            type: cc.Node
        },
        gameNode: cc.Node, //跳到淘宝网页用的
        uiBlack: cc.Node,
        scrollView: cc.Node,
        content: cc.Node,
        moreSprite: cc.Node,
        ziLineSprite: cc.Node,
        view: cc.Node,
        lock: false,
        scaleValue: 1
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.netData = NetData.NetData.getInst();
        var size = cc.director.getWinSize();
        var ssss = size.width * 1660 / (1080 * size.height);
        this.scaleValue = ssss;
        this.lock = true;
        var oriP1 = this.testNode.convertToWorldSpaceAR(cc.v2(0, 0));
        this.oriY = this.testNode.y - oriP1.y;
        //this.seVar = 0;

        this.purpleH = this.ziLineSprite.height / 2;
        //console.log("oriY=" + this.node.y + "|" + oriP1.y);        

        var callFunc_1 = cc.callFunc(function () {
            this.lock = false;
            var se = cc.director.getWinSize();

            //this.scrollView.height = se.height * 0.8;

            this.scrollH = se.height * 0.8;
            this.scrollView.height = this.scrollH;

            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height - this.purpleH;
            console.log("ny=" + this.node.y);
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(0.1), callFunc_1));
        /*
        var timeCallback = function (dt)
        {
            this.lock = false;
            var se = cc.director.getWinSize();
            //this.scrollView.height = se.height * 0.8;
            
            this.seVar = 0;
            if(se.height < 1660)
            {
                this.seVar = 1660 - se.height;
            }
            
            
            this.scrollH = (se.height + this.seVar) * 0.8;//se.height * 0.8 ;//* (se.width / 1080);
            this.scrollView.height = this.scrollH ;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height - this.purpleH;
            console.log("ny=" + this.node.y);
            console.log("nw=" + se.width);
            console.log("nH=" + se.height);
            
        }
        
        this.scheduleOnce(timeCallback, 0.1);
        */

        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
            this.close();
        }, this);

        //---------go------------
        //liting 2017-1-12
        this.goNode.on(cc.Node.EventType.TOUCH_START, function () {
            this.goNode.scale = 0.8;
        }, this);

        this.goNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.goNode.scale = 1;
            //cc.log("goNode TOUCH_END");
            this.close();
        }, this);

        this.goNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.goNode.scale = 1;
        }, this);

        //liting 2017-1-12 end
    },

    close: function close() {
        if (!this.lock) {

            this.uiBlack.active = false;

            var call3 = cc.callFunc(function () {
                this.netData.orderShowFlag = false;

                this.noOrderNode.active = false;
                this.ziLineSprite.active = false;
                this.scrollView.active = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, this.oriY - this.scrollView.height - this.purpleH)), call3));
        }
    },

    initDingdan: function initDingdan() {
        if (!this.lock) {
            console.log("initDingdan");
            this.lock = true;

            /*var se = cc.director.getWinSize();
            this.scrollView.height = se.height * 0.8;
            this.scrollView.getChildByName("view").height = this.scrollView.height;
            this.node.height = this.scrollView.height;
            this.node.y = this.oriY - this.scrollView.height;*/
            cc.log("ny=" + this.node.y);

            this.netData.orderShowFlag = true;
            this.listItemH = 180;
            this.listItemDisY = 10;
            this.offsetChang = 100;
            this.contenCount = 14;
            this.initList();
            var callback = cc.callFunc(this.selectShowCallBack, this);
            cc.log("sy=" + this.scrollView.y);

            //出来动画有问题
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, this.oriY)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    },

    //中奖 数字 每条间距50 高100 则加高150
    initList: function initList() {
        var oLen = this.netData.GameListResult.length;
        //liting 2017-1-12
        if (oLen == 0) {
            //this.noOrderNode.y = this.scrollView.y;
            this.noOrderNode.active = true;
            this.ziLineSprite.active = false;
            this.scrollView.active = false;
            return;
        }

        this.ziLineSprite.active = true;
        this.scrollView.active = true;

        this.noOrderNode.active = false;
        //liting 2017-1-12 end

        this.moreSprite.parent = this.node;
        this.content.removeAllChildren(true);

        //-----------------------
        //计算scroll总长
        //-----------------------
        var jj_height = 0;

        //for(let j = 0 ; j < this.sceneList.length; j++)

        cc.log("oLen = " + oLen);

        for (var _i = 0; _i < oLen; _i++) {
            jj_height += this.listItemH + this.listItemDisY;
        }

        if (oLen > this.contenCount) {
            cc.log("abcdef");
            jj_height += 67;
            this.moreSprite.parent = this.content;
            this.moreSprite.active = true;
            this.moreSprite.y = -(jj_height - 24) * this.scaleValue;
        } else {
            this.moreSprite.active = false;
        }

        //liting 2017-1-12
        var scrollH_var = this.scrollH;

        if (jj_height < this.scrollH) {
            scrollH_var = jj_height * this.scaleValue;
        }

        this.scrollView.height = scrollH_var;
        this.view.height = scrollH_var;
        this.content.y = scrollH_var;

        this.ziLineSprite.y = this.scrollView.height;

        //liting 2017-1-12 end

        this.content.height = jj_height * this.scaleValue;
        //-----------------------
        //排版
        //-----------------------
        var y = 0;

        for (var i = 0; i < oLen; ++i) {
            var item = cc.instantiate(this.grayPrefab);
            item.parent = this.content;
            item.x = 0;
            item.y = y;
            item.scale = this.scaleValue;

            //赋值
            var itemInfo = this.netData.GameListResult[i];
            var turnOrder = item.getComponent('TurntableOrderScript');

            turnOrder.setOrderData(itemInfo.time, itemInfo.no, itemInfo.payAmount, itemInfo.bonusAmount, itemInfo.status, this.netData.currency);

            //计算下一个y值
            this.offsetChang = this.listItemH + this.listItemDisY;
            y -= this.offsetChang * this.scaleValue;
        }

        this.moreSprite.on(cc.Node.EventType.TOUCH_END, function (event) {
            //调到淘宝网页
            if (!CC_JSB) {
                if (window.aliLotteryCasinoSDK) {
                    var spt = this.gameNode.getComponent("game");

                    // if(!spt.exitJudge()){
                    var arr = DataOper.DataOper.getInst().gameToken.split("-");
                    var instanceId = arr[2];
                    window.aliLotteryCasinoSDK.redirectOrder(instanceId);
                    // }                    
                } else {
                    console.log("more game!");
                }
            }
        }, this);

        this.scrollView.getComponent(cc.ScrollView).scrollToOffset(cc.p(0, 0), 0.1);
    }
});

cc._RFpop();
},{"DataOper":"DataOper","NetData":"NetData"}],"NetData":[function(require,module,exports){
"use strict";
cc._RFpush(module, '455005bpAxP7K4uERaZgcXQ', 'NetData');
// Script/network/NetData.js

"use strict";

var NetData = cc.Class({
    statics: {
        g_Inst: null,
        s_index: 0,

        getInst: function getInst() {

            if (NetData.g_Inst === null) {
                NetData.g_Inst = new NetData();
                NetData.g_Inst.init();
            }
            return NetData.g_Inst;
        },

        destoryInst: function destoryInst() {

            if (NetData.g_Inst !== null) {
                NetData.g_Inst = null;
            }
        }
    },

    properties: {

        //投注响应对象
        BetResult: {
            default: null,

            serializable: false
        },
        //初始化响应对象 
        InitResult: {
            default: null,

            serializable: false
        },
        //结算响应对象
        RewardResult: {
            default: null,

            serializable: false
        },
        //游戏列表
        GameListResult: {
            default: null,

            serializable: false
        },

        //奖池
        PoolResult: {
            default: null,

            serializable: false
        },

        //奖池规则
        poolRules: {
            default: [],
            serializable: false
        },

        //游戏列表
        GameRule: {
            default: null,
            serializable: false
        },

        balance: -1, //余额
        rulePics: [], //规则图片列表
        orderShowFlag: false, //是否显示订单ing
        helpShowFlag: false, //是否显示规则
        userId: null, //userID
        userNick: null, //用户昵称
        stopSellingDesc: "" },

    init: function init() {
        if (!CC_JSB) {
            var self = this;
            // 由于在绑定时可能已经触发过该事件，可以先获取一下
            if (window.aliLotteryCasinoSDK) {
                //window.aliLotteryCasinoSDK.log('debug', 'version', '12/28 17:50');
                window.aliLotteryCasinoSDK.getUserInfo(function (info) {
                    if (info) {
                        self.balance = info.fee;
                        self.userNick = info.nick;
                        self.userId = info.uid;
                    }
                });
            } else {
                this.balance = 1000; //my server
            }
            document.addEventListener('casino:updateUserBalance', function (e) {
                // e.data 中包含了要传递的所有数据，例如用户余额为 e.data.fee
                self.balance = e.data.fee;
                self.userNick = e.data.nick;
                self.userId = e.data.uid;
            }, false);
        } else {
            this.balance = 1000; //simulator
        }
    },

    getBalance: function getBalance() {
        return this.balance;
    }
});

module.exports = {
    NetData: NetData
};

cc._RFpop();
},{}],"Notouch":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f95359F7XpMIK2ZNw8DAYis', 'Notouch');
// Script/Notouch.js

"use strict";

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
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //不再派发事件
            event.stopPropagation();

            if (this.obj != undefined) {
                this.fun(this.obj);
                this.obj = undefined;
                this.fun = undefined;
            }
        }, this);
    },

    init: function init(obj, fun) {
        this.obj = obj;
        this.fun = fun;
    }

});

cc._RFpop();
},{}],"PoolRule":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b47a5TO5UxMaqP8HQmYbHbt', 'PoolRule');
// Script/PoolRule.js

"use strict";

var NetData = require("NetData");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        //游戏帮助
        uiBlack: cc.Node,
        lock: false,
        gameNode: cc.Node,

        beiArray: {
            default: [],
            type: cc.Label
        },

        minArray: {
            default: [],
            type: cc.Label
        },

        //奖池规则标题
        poolTitleLabel: {
            default: [],
            type: [cc.Label]
        },

        //奖池规则说明 1 ~ 20倍
        poolDetailLabel: {
            default: [],
            type: [cc.Label]
        },

        maxArray: {
            default: [],
            type: cc.Label
        },

        hasOpen: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        var size = cc.director.getWinSize();
        var ssss = size.width * 1660 / (1080 * size.height);
        this.node.scale = ssss;
        this.netData = NetData.NetData.getInst();
        this.lock = false;
        this.uiBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
            this.close();
        }, this);
    },

    close: function close() {
        if (!this.lock) {
            this.uiBlack.active = false;

            var call3 = cc.callFunc(function () {
                this.netData.helpShowFlag = false;
            }, this);

            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(0, -2000)), call3));
        }
    },

    downHelp: function downHelp() {
        if (this.hasOpen == false) {
            for (var i = 0; i < 5; i++) {
                this.beiArray[i].string = this.netData.poolRules[i].bet;
                this.minArray[i].string = this.netData.poolRules[i].minBouns;
                this.maxArray[i].string = this.netData.poolRules[i].maxBouns;
            }
            //标题最低** 
            for (var _i = 0; _i < 2; _i++) {
                this.poolTitleLabel[_i].string = this.poolTitleLabel[_i].string + NetData.NetData.getInst().InitResult.currency + "数";
            }
            //倍数说明
            for (var _i2 = 0; _i2 < 5; _i2++) {
                var percent = this.netData.poolRules[_i2].floatRate * 100;
                if (percent == 0) {
                    this.poolDetailLabel[_i2].string = "固定" + this.netData.poolRules[_i2].minBouns;
                } else {
                    this.poolDetailLabel[_i2].string = percent + "%当前奖池" + NetData.NetData.getInst().InitResult.currency + "数";
                }
            }
            this.hasOpen = true;
        }
        this.initHelp();
    },

    initHelp: function initHelp() {
        if (!this.lock) {
            this.netData.helpShowFlag = true;
            this.lock = true;
            var callback = cc.callFunc(this.selectShowCallBack, this);
            this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, -265)), callback));
        }
    },

    selectShowCallBack: function selectShowCallBack() {
        this.uiBlack.active = true;
        this.lock = false;
    }
});

cc._RFpop();
},{"Game":"Game","NetData":"NetData"}],"PriceGroup":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'da3dacJp3JKyrQxcem09d6p', 'PriceGroup');
// Script/PriceGroup.js

'use strict';

var NetData = require("NetData");
cc.Class({
    extends: cc.Component,

    properties: {
        beiArray: {
            default: [],
            type: [cc.Node]
        }
    },

    clickOneToggle: function clickOneToggle(templeIndex) {
        if (templeIndex == this.index) {
            //doNothing
        } else {
            this.index = templeIndex;
            for (var i = 0; i < 5; i++) {
                var normal = this.beiArray[i].getChildByName('normal');
                var select = this.beiArray[i].getChildByName('select');
                if (i == this.index) {
                    select.active = true;
                    normal.active = false;
                } else {
                    normal.active = true;
                    select.active = false;
                }
            }
        }
        //通知game脚本更新信息
        cc.find('Canvas').getComponent('Game').priceChangeBet(this.index);
    },

    //true 禁用
    betPriceSetEnable: function betPriceSetEnable(flag) {
        for (var i = 0; i < 5; i++) {
            var normal = this.beiArray[i].getChildByName('normal');
            var select = this.beiArray[i].getChildByName('select');
            var enableNormal = this.beiArray[i].getChildByName('enableNormal');
            var enableSelect = this.beiArray[i].getChildByName('enableSelect');
            normal.active = false;
            select.active = false;
            enableNormal.active = false;
            enableSelect.active = false;
            if (i == this.index) {
                if (flag == true) {
                    enableSelect.active = true;
                } else {
                    select.active = true;
                }
            } else {
                if (flag == true) {
                    enableNormal.active = true;
                } else {
                    normal.active = true;
                }
            }
        }
    },

    setLabelColor: function setLabelColor() {
        //设置Label颜色
        var skin = NetData.NetData.getInst().skin;
        if (skin) {
            var labelColorArray = skin.betRgb;
            if (labelColorArray != null) {
                for (var i = 0; i < 5; i++) {
                    var normalRgb = labelColorArray[0];
                    var selectRGB = labelColorArray[1];
                    var enableNormalRGB = labelColorArray[2];
                    var enableSelectRGB = labelColorArray[3];

                    var normalLabel = this.beiArray[i].getChildByName('normal').getChildByName("label").getComponent("cc.Label");
                    var selectLabel = this.beiArray[i].getChildByName('select').getChildByName("label").getComponent("cc.Label");
                    var enableNormalLabel = this.beiArray[i].getChildByName('enableNormal').getChildByName("label").getComponent("cc.Label");
                    var enableSelectLabel = this.beiArray[i].getChildByName('enableSelect').getChildByName("label").getComponent("cc.Label");
                    normalLabel.node.color = new cc.Color(normalRgb[0], normalRgb[1], normalRgb[2]);
                    selectLabel.node.color = new cc.Color(selectRGB[0], selectRGB[1], selectRGB[2]);
                    enableNormalLabel.node.color = new cc.Color(enableNormalRGB[0], enableNormalRGB[1], enableNormalRGB[2]);
                    enableSelectLabel.node.color = new cc.Color(enableSelectRGB[0], enableSelectRGB[1], enableSelectRGB[2]);
                    //倍
                    var normalBei = this.beiArray[i].getChildByName('normal').getChildByName("bei").getComponent("cc.Label");
                    var selectBei = this.beiArray[i].getChildByName('select').getChildByName("bei").getComponent("cc.Label");
                    var enableNormalBei = this.beiArray[i].getChildByName('enableNormal').getChildByName("bei").getComponent("cc.Label");
                    var enableSelectBei = this.beiArray[i].getChildByName('enableSelect').getChildByName("bei").getComponent("cc.Label");
                    normalBei.node.color = new cc.Color(normalRgb[0], normalRgb[1], normalRgb[2]);
                    selectBei.node.color = new cc.Color(selectRGB[0], selectRGB[1], selectRGB[2]);
                    enableNormalBei.node.color = new cc.Color(enableNormalRGB[0], enableNormalRGB[1], enableNormalRGB[2]);
                    enableSelectBei.node.color = new cc.Color(enableSelectRGB[0], enableSelectRGB[1], enableSelectRGB[2]);
                }
            }
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var _this = this;

        var _loop = function _loop(i) {
            _this.beiArray[i].on(cc.Node.EventType.TOUCH_START, function () {}, _this);
            _this.beiArray[i].on(cc.Node.EventType.TOUCH_END, function () {
                this.clickOneToggle(i);
            }, _this);
            _this.beiArray[i].on(cc.Node.EventType.TOUCH_CANCEL, function () {}, _this);
        };

        //绑定touch事件 
        for (var i = 0; i < 5; i++) {
            _loop(i);
        }
    }
});

cc._RFpop();
},{"NetData":"NetData"}],"SdkData":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c12406dTnpLcpVL4UPuYYtD', 'SdkData');
// Script/network/SdkData.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");
var Common = require("Common");

var SdkData = cc.Class({
    statics: {
        g_SdkDataInst: null,

        getInst: function getInst() {
            if (SdkData.g_SdkDataInst == null) {
                SdkData.g_SdkDataInst = new SdkData();
                SdkData.g_SdkDataInst.register();
            }

            return SdkData.g_SdkDataInst;
        },

        destoryInst: function destoryInst() {
            if (SdkData.g_SdkDataInst !== null) {
                SdkData.g_SdkDataInst = null;
            }
        }
    },

    //注册监听
    register: function register() {
        if (!CC_JSB) {
            //系统退出事件
            document.addEventListener('casino:back', function () {
                Common.Common.getInst().debug("SdkData_register_casino:back");
            }, false);

            //窗口激活事件，当 App 从后台切回到前台时会触发
            document.addEventListener('casino:resume', function (e) {}, false);

            //余额更新事件
            document.addEventListener('casino:updateUserBalance', function (e) {
                if (e) {
                    NetData.NetData.getInst().balance = e.data.fee;
                }
            }, false);

            //余额更新事件
            document.addEventListener('casino:updateUserBalanceError', function () {
                NetData.NetData.getInst().error = true;
            }, false);

            //
            document.addEventListener('casino:click', function (e) {
                switch (e.data.type) {
                    case 'order':
                        // 我的订单

                        break;
                    case 'rule':
                        // 游戏规则

                        break;
                }
            }, false);
        }
    },

    //更新用户信息
    updateUserInfo: function updateUserInfo() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.updateUserInfo();
            }
        }
    },

    //充值
    //@param flag 是否提示余额不足
    recharge: function recharge(flag) {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.recharge(flag);
            }
        }
    },

    //更多订单
    orderMore: function orderMore() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                var arr = DataOper.DataOper.getInst().gameToken.split("-");
                var instanceId = arr[2];
                window.aliLotteryCasinoSDK.redirectOrder(instanceId);
            }
        }
    },

    //退出游戏
    exitGame: function exitGame() {
        if (!CC_JSB) {
            if (window.aliLotteryCasinoSDK) {
                window.aliLotteryCasinoSDK.popWindow();
            }
        }
    },

    setCache: function setCache(key, value) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            window.aliLotteryCasinoSDK.setCache(key, value);
        } else {
            cc.sys.localStorage.setItem(key, value);
        }
    },

    getCache: function getCache(key, callback) {
        if (!CC_JSB && window.aliLotteryCasinoSDK) {
            window.aliLotteryCasinoSDK.getCache(key, callback);
        } else {
            var result = cc.sys.localStorage.getItem(key);
            callback(result);
        }
    }

});

module.exports = SdkData;

cc._RFpop();
},{"Common":"Common","DataOper":"DataOper","NetData":"NetData"}],"SelectLine":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e1cd6pT7VlPE5TvoVk3o9cN', 'SelectLine');
// Script/SelectLine.js

"use strict";

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

        interactableType: true,
        selectType: 0,
        selectFlag: false, //添加选中状态
        //按钮
        buttonBt: {
            type: cc.Node,
            default: null
        },
        //group
        group: {
            type: cc.Node,
            default: null
        },
        //
        line10: {
            type: cc.Node,
            default: null
        },
        line20: {
            type: cc.Node,
            default: null
        },
        line30: {
            type: cc.Node,
            default: null
        },
        line40: {
            type: cc.Node,
            default: null
        },
        line50: {
            type: cc.Node,
            default: null
        },
        jiantou: {
            type: cc.Node,
            default: null
        },
        //是否打开了
        isOpenSelect: false

    },
    /*pax: function(c1, c2)
    {
       return c2 - c1;
    },*/

    lineChange: function lineChange(toggle, msg) {
        this.isOpenSelect = false;
        this.group.scale = 0;
        this.jiantou.scaleY = 1;
        this.line10.active = false;
        this.line20.active = false;
        this.line30.active = false;
        this.line40.active = false;
        this.line50.active = false;
        if (msg == 10) {
            this.line10.active = true;
        } else if (msg == 20) {
            this.line20.active = true;
        } else if (msg == 30) {
            this.line30.active = true;
        } else if (msg == 40) {
            this.line40.active = true;
        } else if (msg == 50) {
            this.line50.active = true;
        } else {
            cc.log("line err" + msg);
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        /*let arrDemo = new Array(1, 3, 2, 5, 6);
        //arrDemo.sort(this.pax);
        //arrDemo.sort(function(a,b){return a>b?1:-1});//从小到大排序
        arrDemo.sort(function(a,b){return a<b?1:-1});//从大到小排序
         for(let i = 0; i < arrDemo.length; i++)
        {
            cc.log("testsort" + arrDemo[i]);
        }*/

        //cc.log("testsort bbbbbbbbbbbbbbbbbb" );


        this.buttonBt.on(cc.Node.EventType.TOUCH_START, function (event) {

            if (this.interactableType) {
                this.buttonBt.scale = 1;
                cc.log("sb");
            }
        }, this);

        this.buttonBt.on(cc.Node.EventType.TOUCH_END, function (event) {

            this.buttonBt.scale = 1;
            if (this.interactableType) {
                if (this.isOpenSelect == true) {
                    this.isOpenSelect = false;
                    this.group.scale = 0;
                    this.jiantou.scaleY = 1;
                } else {
                    this.isOpenSelect = true;
                    this.group.scale = 1;
                    this.jiantou.scaleY = -1;
                }
            }
        }, this);

        this.buttonBt.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.buttonBt.scale = 1;
        }, this);
    },

    setInteractableType: function setInteractableType(interType) {
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

        var timeCallback = function timeCallback(dt) {
            if (interType) {
                this.buttonBt.color = new cc.Color(255, 255, 255);
            } else {
                this.buttonBt.color = new cc.Color(124, 124, 124);
            }
        };

        this.scheduleOnce(timeCallback, 0.001);

        //cc.log("this.node.color " + this.node.color.r);
    }

});

cc._RFpop();
},{}],"TurntableOrderScript":[function(require,module,exports){
"use strict";
cc._RFpush(module, '07c4cE6DWpBoabUOfzT4ain', 'TurntableOrderScript');
// Script/TurntableOrderScript.js

"use strict";

var NetData = require("NetData");
cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: cc.Label, //2016.06.12
        numberLabel: cc.Label, //订单编号：8654777754432889
        douLabel: cc.Label, //共投 88豆
        stateLabel: cc.Label, //等待开奖 未中奖 中奖：8888.88豆
        payDou: cc.Node,
        satateDou: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {},

    //state_int 状态，0：游戏中（等待开奖），1：中奖，2：未中奖
    setOrderData: function setOrderData(time_label, number_label, dou_label, state_Label, stateInt, dou_currency) {
        this.timeLabel.string = time_label;
        this.numberLabel.string = "订单编号：" + number_label;
        this.douLabel.string = "投: " + dou_label + NetData.NetData.getInst().InitResult.currency;

        this.payDou.x = this.douLabel.node.x - (this.douLabel.node.width - 68);
        this.satateDou.active = false;

        this.stateLabel.string = "";

        if (stateInt == 0) {
            this.stateLabel.node.color = new cc.Color(255, 255, 255);
            this.stateLabel.string = "等待开奖";
        } else if (stateInt == 1) {
            this.stateLabel.node.color = new cc.Color(246, 208, 40);
            this.stateLabel.string = "中: " + state_Label + NetData.NetData.getInst().InitResult.currency;

            this.satateDou.active = false;
            this.satateDou.x = this.stateLabel.node.x - (this.stateLabel.node.width - 68);
        } else if (stateInt == 2) {
            this.stateLabel.node.color = new cc.Color(180, 180, 180);
            this.stateLabel.string = "未中奖";
        } else if (stateInt == 3) {
            this.stateLabel.node.color = new cc.Color(180, 180, 180);
            this.stateLabel.string = "已取消";
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"NetData":"NetData"}],"WaitScript":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3ee3eXYdUxGyp3lPj2plkSQ', 'WaitScript');
// Script/WaitScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.angle = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.angle += dt * 360;

        if (this.angle > 360) {
            this.angle -= 360;
        }

        this.node.rotation = this.angle;
    }
});

cc._RFpop();
},{}],"WinAni":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e347a1ad2ZBZpBfXYCoVe22', 'WinAni');
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

});

cc._RFpop();
},{}],"aes":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6d4bagbY7REOJrUSdmZTt5H', 'aes');
// Script/network/aes/aes.js

"use strict";

var CryptoJS = require("./core");require("../aes/md5");require("../aes/enc-base64");require("../aes/evpkdf");require("../aes/cipher-core");require("../aes/mode-ecb");(function () {
  var C = CryptoJS;var C_lib = C.lib;var BlockCipher = C_lib.BlockCipher;var C_algo = C.algo;var SBOX = [];var INV_SBOX = [];var SUB_MIX_0 = [];var SUB_MIX_1 = [];var SUB_MIX_2 = [];var SUB_MIX_3 = [];var INV_SUB_MIX_0 = [];var INV_SUB_MIX_1 = [];var INV_SUB_MIX_2 = [];var INV_SUB_MIX_3 = [];(function () {
    var d = [];for (var i = 0; i < 256; i++) {
      if (i < 128) {
        d[i] = i << 1;
      } else {
        d[i] = i << 1 ^ 283;
      }
    }var x = 0;var xi = 0;for (var i = 0; i < 256; i++) {
      var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;sx = sx >>> 8 ^ sx & 255 ^ 99;SBOX[x] = sx;INV_SBOX[sx] = x;var x2 = d[x];var x4 = d[x2];var x8 = d[x4];var t = d[sx] * 257 ^ sx * 16843008;SUB_MIX_0[x] = t << 24 | t >>> 8;SUB_MIX_1[x] = t << 16 | t >>> 16;SUB_MIX_2[x] = t << 8 | t >>> 24;SUB_MIX_3[x] = t;var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;INV_SUB_MIX_3[sx] = t;if (!x) {
        x = xi = 1;
      } else {
        x = x2 ^ d[d[d[x8 ^ x2]]];xi ^= d[d[xi]];
      }
    }
  })();var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];var AES = C_algo.AES = BlockCipher.extend({ _doReset: function _doReset() {
      var key = this._key;var keyWords = key.words;var keySize = key.sigBytes / 4;var nRounds = this._nRounds = keySize + 6;var ksRows = (nRounds + 1) * 4;var keySchedule = this._keySchedule = [];for (var ksRow = 0; ksRow < ksRows; ksRow++) {
        if (ksRow < keySize) {
          keySchedule[ksRow] = keyWords[ksRow];
        } else {
          var t = keySchedule[ksRow - 1];if (!(ksRow % keySize)) {
            t = t << 8 | t >>> 24;t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];t ^= RCON[ksRow / keySize | 0] << 24;
          } else {
            if (keySize > 6 && ksRow % keySize == 4) {
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
            }
          }keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
        }
      }var invKeySchedule = this._invKeySchedule = [];for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
        var ksRow = ksRows - invKsRow;if (invKsRow % 4) {
          var t = keySchedule[ksRow];
        } else {
          var t = keySchedule[ksRow - 4];
        }if (invKsRow < 4 || ksRow <= 4) {
          invKeySchedule[invKsRow] = t;
        } else {
          invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
        }
      }
    }, encryptBlock: function encryptBlock(M, offset) {
      this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    }, decryptBlock: function decryptBlock(M, offset) {
      var t = M[offset + 1];M[offset + 1] = M[offset + 3];M[offset + 3] = t;this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);var t = M[offset + 1];M[offset + 1] = M[offset + 3];M[offset + 3] = t;
    }, _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
      var nRounds = this._nRounds;var s0 = M[offset] ^ keySchedule[0];var s1 = M[offset + 1] ^ keySchedule[1];var s2 = M[offset + 2] ^ keySchedule[2];var s3 = M[offset + 3] ^ keySchedule[3];var ksRow = 4;for (var round = 1; round < nRounds; round++) {
        var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow++];var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow++];var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow++];var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow++];s0 = t0;s1 = t1;s2 = t2;s3 = t3;
      }var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow++];var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow++];var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow++];var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow++];M[offset] = t0;M[offset + 1] = t1;M[offset + 2] = t2;M[offset + 3] = t3;
    }, keySize: 256 / 32 });C.AES = BlockCipher._createHelper(AES);
})();

cc._RFpop();
},{"../aes/cipher-core":"cipher-core","../aes/enc-base64":"enc-base64","../aes/evpkdf":"evpkdf","../aes/md5":"md5","../aes/mode-ecb":"mode-ecb","./core":"core"}],"cipher-core":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a5e72BKXLNL9oFhC7IDTdem', 'cipher-core');
// Script/network/aes/cipher-core.js

"use strict";

var CryptoJS = require("./core");CryptoJS.lib.Cipher || function (undefined) {
    var C = CryptoJS;var C_lib = C.lib;var Base = C_lib.Base;var WordArray = C_lib.WordArray;var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;var C_enc = C.enc;var Utf8 = C_enc.Utf8;var Base64 = C_enc.Base64;var C_algo = C.algo;var EvpKDF = C_algo.EvpKDF;var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({ cfg: Base.extend(), createEncryptor: function createEncryptor(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
        }, createDecryptor: function createDecryptor(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
        }, init: function init(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);this._xformMode = xformMode;this._key = key;this.reset();
        }, reset: function reset() {
            BufferedBlockAlgorithm.reset.call(this);this._doReset();
        }, process: function process(dataUpdate) {
            this._append(dataUpdate);return this._process();
        }, finalize: function finalize(dataUpdate) {
            if (dataUpdate) {
                this._append(dataUpdate);
            }var finalProcessedData = this._doFinalize();return finalProcessedData;
        }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () {
            function selectCipherStrategy(key) {
                if (typeof key == "string") {
                    return PasswordBasedCipher;
                } else {
                    return SerializableCipher;
                }
            }return function (cipher) {
                return { encrypt: function encrypt(message, key, cfg) {
                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                    }, decrypt: function decrypt(ciphertext, key, cfg) {
                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                    } };
            };
        }() });var StreamCipher = C_lib.StreamCipher = Cipher.extend({ _doFinalize: function _doFinalize() {
            var finalProcessedBlocks = this._process(!!"flush");return finalProcessedBlocks;
        }, blockSize: 1 });var C_mode = C.mode = {};var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({ createEncryptor: function createEncryptor(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
        }, createDecryptor: function createDecryptor(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
        }, init: function init(cipher, iv) {
            this._cipher = cipher;this._iv = iv;
        } });var CBC = C_mode.CBC = function () {
        var CBC = BlockCipherMode.extend();CBC.Encryptor = CBC.extend({ processBlock: function processBlock(words, offset) {
                var cipher = this._cipher;var blockSize = cipher.blockSize;xorBlock.call(this, words, offset, blockSize);cipher.encryptBlock(words, offset);this._prevBlock = words.slice(offset, offset + blockSize);
            } });CBC.Decryptor = CBC.extend({ processBlock: function processBlock(words, offset) {
                var cipher = this._cipher;var blockSize = cipher.blockSize;var thisBlock = words.slice(offset, offset + blockSize);cipher.decryptBlock(words, offset);xorBlock.call(this, words, offset, blockSize);this._prevBlock = thisBlock;
            } });function xorBlock(words, offset, blockSize) {
            var iv = this._iv;if (iv) {
                var block = iv;this._iv = undefined;
            } else {
                var block = this._prevBlock;
            }for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
            }
        }return CBC;
    }();var C_pad = C.pad = {};var Pkcs7 = C_pad.Pkcs7 = { pad: function pad(data, blockSize) {
            var blockSizeBytes = blockSize * 4;var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;var paddingWords = [];for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
            }var padding = WordArray.create(paddingWords, nPaddingBytes);data.concat(padding);
        }, unpad: function unpad(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;data.sigBytes -= nPaddingBytes;
        } };var BlockCipher = C_lib.BlockCipher = Cipher.extend({ cfg: Cipher.cfg.extend({ mode: CBC, padding: Pkcs7 }), reset: function reset() {
            Cipher.reset.call(this);var cfg = this.cfg;var iv = cfg.iv;var mode = cfg.mode;if (this._xformMode == this._ENC_XFORM_MODE) {
                var modeCreator = mode.createEncryptor;
            } else {
                var modeCreator = mode.createDecryptor;this._minBufferSize = 1;
            }this._mode = modeCreator.call(mode, this, iv && iv.words);
        }, _doProcessBlock: function _doProcessBlock(words, offset) {
            this._mode.processBlock(words, offset);
        }, _doFinalize: function _doFinalize() {
            var padding = this.cfg.padding;if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);var finalProcessedBlocks = this._process(!!"flush");
            } else {
                var finalProcessedBlocks = this._process(!!"flush");padding.unpad(finalProcessedBlocks);
            }return finalProcessedBlocks;
        }, blockSize: 128 / 32 });var CipherParams = C_lib.CipherParams = Base.extend({ init: function init(cipherParams) {
            this.mixIn(cipherParams);
        }, toString: function toString(formatter) {
            return (formatter || this.formatter).stringify(this);
        } });var C_format = C.format = {};var OpenSSLFormatter = C_format.OpenSSL = { stringify: function stringify(cipherParams) {
            var ciphertext = cipherParams.ciphertext;var salt = cipherParams.salt;if (salt) {
                var wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
            } else {
                var wordArray = ciphertext;
            }return wordArray.toString(Base64);
        }, parse: function parse(openSSLStr) {
            var ciphertext = Base64.parse(openSSLStr);var ciphertextWords = ciphertext.words;if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                var salt = WordArray.create(ciphertextWords.slice(2, 4));ciphertextWords.splice(0, 4);ciphertext.sigBytes -= 16;
            }return CipherParams.create({ ciphertext: ciphertext, salt: salt });
        } };var SerializableCipher = C_lib.SerializableCipher = Base.extend({ cfg: Base.extend({ format: OpenSSLFormatter }), encrypt: function encrypt(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);var ciphertext = encryptor.finalize(message);var cipherCfg = encryptor.cfg;return CipherParams.create({ ciphertext: ciphertext, key: key, iv: cipherCfg.iv, algorithm: cipher, mode: cipherCfg.mode, padding: cipherCfg.padding, blockSize: cipher.blockSize, formatter: cfg.format });
        }, decrypt: function decrypt(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);ciphertext = this._parse(ciphertext, cfg.format);var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);return plaintext;
        }, _parse: function _parse(ciphertext, format) {
            if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
            } else {
                return ciphertext;
            }
        } });var C_kdf = C.kdf = {};var OpenSSLKdf = C_kdf.OpenSSL = { execute: function execute(password, keySize, ivSize, salt) {
            if (!salt) {
                salt = WordArray.random(64 / 8);
            }var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);key.sigBytes = keySize * 4;return CipherParams.create({ key: key, iv: iv, salt: salt });
        } };var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({ cfg: SerializableCipher.cfg.extend({ kdf: OpenSSLKdf }), encrypt: function encrypt(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);cfg.iv = derivedParams.iv;var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);ciphertext.mixIn(derivedParams);return ciphertext;
        }, decrypt: function decrypt(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);ciphertext = this._parse(ciphertext, cfg.format);var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);cfg.iv = derivedParams.iv;var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);return plaintext;
        } });
}();

cc._RFpop();
},{"./core":"core"}],"core":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f98dc0VdUlJbb3GxDujom2w', 'core');
// Script/network/aes/core.js

"use strict";

var CryptoJS = CryptoJS || function (Math, undefined) {
    var C = {};var C_lib = C.lib = {};var Base = C_lib.Base = function () {
        function F() {}return { extend: function extend(overrides) {
                F.prototype = this;var subtype = new F();if (overrides) {
                    subtype.mixIn(overrides);
                }if (!subtype.hasOwnProperty("init")) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }subtype.init.prototype = subtype;subtype.$super = this;return subtype;
            }, create: function create() {
                var instance = this.extend();instance.init.apply(instance, arguments);return instance;
            }, init: function init() {}, mixIn: function mixIn(properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }if (properties.hasOwnProperty("toString")) {
                    this.toString = properties.toString;
                }
            }, clone: function clone() {
                return this.init.prototype.extend(this);
            } };
    }();var WordArray = C_lib.WordArray = Base.extend({ init: function init(words, sigBytes) {
            words = this.words = words || [];if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        }, toString: function toString(encoder) {
            return (encoder || Hex).stringify(this);
        }, concat: function concat(wordArray) {
            var thisWords = this.words;var thatWords = wordArray.words;var thisSigBytes = this.sigBytes;var thatSigBytes = wordArray.sigBytes;this.clamp();if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
            } else {
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                }
            }this.sigBytes += thatSigBytes;return this;
        }, clamp: function clamp() {
            var words = this.words;var sigBytes = this.sigBytes;words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;words.length = Math.ceil(sigBytes / 4);
        }, clone: function clone() {
            var clone = Base.clone.call(this);clone.words = this.words.slice(0);return clone;
        }, random: function random(nBytes) {
            var words = [];var r = function r(m_w) {
                var m_w = m_w;var m_z = 987654321;var mask = 4294967295;return function () {
                    m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;m_w = 18000 * (m_w & 65535) + (m_w >> 16) & mask;var result = (m_z << 16) + m_w & mask;result /= 4294967296;result += 0.5;return result * (Math.random() > 0.5 ? 1 : -1);
                };
            };for (var i = 0, rcache; i < nBytes; i += 4) {
                var _r = r((rcache || Math.random()) * 4294967296);rcache = _r() * 987654071;words.push(_r() * 4294967296 | 0);
            }return new WordArray.init(words, nBytes);
        } });var C_enc = C.enc = {};var Hex = C_enc.Hex = { stringify: function stringify(wordArray) {
            var words = wordArray.words;var sigBytes = wordArray.sigBytes;var hexChars = [];for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;hexChars.push((bite >>> 4).toString(16));hexChars.push((bite & 15).toString(16));
            }return hexChars.join("");
        }, parse: function parse(hexStr) {
            var hexStrLength = hexStr.length;var words = [];for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }return new WordArray.init(words, hexStrLength / 2);
        } };var Latin1 = C_enc.Latin1 = { stringify: function stringify(wordArray) {
            var words = wordArray.words;var sigBytes = wordArray.sigBytes;var latin1Chars = [];for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;latin1Chars.push(String.fromCharCode(bite));
            }return latin1Chars.join("");
        }, parse: function parse(latin1Str) {
            var latin1StrLength = latin1Str.length;var words = [];for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }return new WordArray.init(words, latin1StrLength);
        } };var Utf8 = C_enc.Utf8 = { stringify: function stringify(wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error("Malformed UTF-8 data");
            }
        }, parse: function parse(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        } };var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({ reset: function reset() {
            this._data = new WordArray.init();this._nDataBytes = 0;
        }, _append: function _append(data) {
            if (typeof data == "string") {
                data = Utf8.parse(data);
            }this._data.concat(data);this._nDataBytes += data.sigBytes;
        }, _process: function _process(doFlush) {
            var data = this._data;var dataWords = data.words;var dataSigBytes = data.sigBytes;var blockSize = this.blockSize;var blockSizeBytes = blockSize * 4;var nBlocksReady = dataSigBytes / blockSizeBytes;if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }var nWordsReady = nBlocksReady * blockSize;var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                }var processedWords = dataWords.splice(0, nWordsReady);data.sigBytes -= nBytesReady;
            }return new WordArray.init(processedWords, nBytesReady);
        }, clone: function clone() {
            var clone = Base.clone.call(this);clone._data = this._data.clone();return clone;
        }, _minBufferSize: 0 });var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({ cfg: Base.extend(), init: function init(cfg) {
            this.cfg = this.cfg.extend(cfg);this.reset();
        }, reset: function reset() {
            BufferedBlockAlgorithm.reset.call(this);this._doReset();
        }, update: function update(messageUpdate) {
            this._append(messageUpdate);this._process();return this;
        }, finalize: function finalize(messageUpdate) {
            if (messageUpdate) {
                this._append(messageUpdate);
            }var hash = this._doFinalize();
            return hash;
        }, blockSize: 512 / 32, _createHelper: function _createHelper(hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        }, _createHmacHelper: function _createHmacHelper(hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        } });var C_algo = C.algo = {};return C;
}(Math);module.exports = CryptoJS;

cc._RFpop();
},{}],"cube":[function(require,module,exports){
"use strict";
cc._RFpush(module, '19415w7m0BGJ4yQomivTxWU', 'cube');
// Script/cube.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        WW: {
            default: null,
            type: cc.Node
        },
        FG: {
            default: null,
            type: cc.Node
        },
        M1: {
            default: null,
            type: cc.Node
        },
        M2: {
            default: null,
            type: cc.Node
        },
        M3: {
            default: null,
            type: cc.Node
        },
        F4: {
            default: null,
            type: cc.Node
        },
        F5: {
            default: null,
            type: cc.Node
        },
        F6: {
            default: null,
            type: cc.Node
        },
        F7: {
            default: null,
            type: cc.Node
        },
        F8: {
            default: null,
            type: cc.Node
        },
        //
        hasPlay: false },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {},

    playAni: function playAni() {
        this.hasPlay = true;
        var animNode = this.node.getChildByName("ani");
        animNode.active = true;
        var animCtrl = animNode.getComponent(cc.Animation);
        animCtrl.play();
    },

    shakeEgg: function shakeEgg() {
        var action1 = cc.rotateTo(0.1, 15.0);
        var action2 = cc.rotateTo(0.1, -15.0);
        var antion3 = cc.rotateTo(0.05, 0.0);
        var seq = cc.sequence(action1, action2, antion3);
        var repeat = cc.repeat(seq, 3);
        this.FG.runAction(repeat);
    },

    stopAni: function stopAni() {
        if (this.hasPlay == true) {
            var animNode = this.node.getChildByName("ani");
            var animCtrl = animNode.getComponent(cc.Animation);
            animCtrl.stop();
            animNode.active = false;
        }
        this.hasPlay = false;
    },

    setCube: function setCube(name) {
        this.WW.active = false;
        this.FG.active = false;
        this.M1.active = false;
        this.M2.active = false;
        this.M3.active = false;
        this.F4.active = false;
        this.F5.active = false;
        this.F6.active = false;
        this.F7.active = false;
        this.F8.active = false;
        if (name == "WW") {
            this.WW.active = true;
        } else if (name == "M1") {
            this.M1.active = true;
        } else if (name == "M2") {
            this.M2.active = true;
        } else if (name == "M3") {
            this.M3.active = true;
        } else if (name == "F4") {
            this.F4.active = true;
        } else if (name == "F5") {
            this.F5.active = true;
        } else if (name == "F6") {
            this.F6.active = true;
        } else if (name == "F7") {
            this.F7.active = true;
        } else if (name == "F8") {
            this.F8.active = true;
        } else if (name == "FG") {
            this.FG.active = true;
        } else {
            cc.log("unknown card type:" + name);
        }
    }

});

cc._RFpop();
},{}],"enc-base64":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5ae04jnX0tDuK3RLRJCJC/n', 'enc-base64');
// Script/network/aes/enc-base64.js

"use strict";

var CryptoJS = require("./core");(function () {
  var C = CryptoJS;var C_lib = C.lib;var WordArray = C_lib.WordArray;var C_enc = C.enc;var Base64 = C_enc.Base64 = { stringify: function stringify(wordArray) {
      var words = wordArray.words;var sigBytes = wordArray.sigBytes;var map = this._map;wordArray.clamp();var base64Chars = [];for (var i = 0; i < sigBytes; i += 3) {
        var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;var triplet = byte1 << 16 | byte2 << 8 | byte3;for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
          base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
        }
      }var paddingChar = map.charAt(64);if (paddingChar) {
        while (base64Chars.length % 4) {
          base64Chars.push(paddingChar);
        }
      }return base64Chars.join("");
    }, parse: function parse(base64Str) {
      var base64StrLength = base64Str.length;var map = this._map;var paddingChar = map.charAt(64);if (paddingChar) {
        var paddingIndex = base64Str.indexOf(paddingChar);if (paddingIndex != -1) {
          base64StrLength = paddingIndex;
        }
      }var words = [];var nBytes = 0;for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;var bitsCombined = bits1 | bits2;words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;nBytes++;
        }
      }return WordArray.create(words, nBytes);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
})();

cc._RFpop();
},{"./core":"core"}],"evpkdf":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c9e5cs7FwBDMIN615y+wP+V', 'evpkdf');
// Script/network/aes/evpkdf.js

"use strict";

var CryptoJS = require("./core");(function () {
  var C = CryptoJS;var C_lib = C.lib;var Base = C_lib.Base;var WordArray = C_lib.WordArray;var C_algo = C.algo;var MD5 = C_algo.MD5;var EvpKDF = C_algo.EvpKDF = Base.extend({ cfg: Base.extend({ keySize: 128 / 32, hasher: MD5, iterations: 1 }), init: function init(cfg) {
      this.cfg = this.cfg.extend(cfg);
    }, compute: function compute(password, salt) {
      var cfg = this.cfg;var hasher = cfg.hasher.create();var derivedKey = WordArray.create();var derivedKeyWords = derivedKey.words;var keySize = cfg.keySize;var iterations = cfg.iterations;while (derivedKeyWords.length < keySize) {
        if (block) {
          hasher.update(block);
        }var block = hasher.update(password).finalize(salt);hasher.reset();for (var i = 1; i < iterations; i++) {
          block = hasher.finalize(block);hasher.reset();
        }derivedKey.concat(block);
      }derivedKey.sigBytes = keySize * 4;return derivedKey;
    } });C.EvpKDF = function (password, salt, cfg) {
    return EvpKDF.create(cfg).compute(password, salt);
  };
})();

cc._RFpop();
},{"./core":"core"}],"md5":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c29efML8wBL2JqAyA4+fX+g', 'md5');
// Script/network/aes/md5.js

"use strict";

var CryptoJS = require("./core");(function (Math) {
  var C = CryptoJS;var C_lib = C.lib;var WordArray = C_lib.WordArray;var Hasher = C_lib.Hasher;var C_algo = C.algo;var T = [];(function () {
    for (var i = 0; i < 64; i++) {
      T[i] = Math.abs(Math.sin(i + 1)) * 4294967296 | 0;
    }
  })();var MD5 = C_algo.MD5 = Hasher.extend({ _doReset: function _doReset() {
      this._hash = new WordArray.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function _doProcessBlock(M, offset) {
      for (var i = 0; i < 16; i++) {
        var offset_i = offset + i;var M_offset_i = M[offset_i];M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
      }var H = this._hash.words;var M_offset_0 = M[offset + 0];var M_offset_1 = M[offset + 1];var M_offset_2 = M[offset + 2];var M_offset_3 = M[offset + 3];var M_offset_4 = M[offset + 4];var M_offset_5 = M[offset + 5];var M_offset_6 = M[offset + 6];var M_offset_7 = M[offset + 7];var M_offset_8 = M[offset + 8];var M_offset_9 = M[offset + 9];var M_offset_10 = M[offset + 10];var M_offset_11 = M[offset + 11];var M_offset_12 = M[offset + 12];var M_offset_13 = M[offset + 13];var M_offset_14 = M[offset + 14];var M_offset_15 = M[offset + 15];var a = H[0];var b = H[1];var c = H[2];var d = H[3];a = FF(a, b, c, d, M_offset_0, 7, T[0]);d = FF(d, a, b, c, M_offset_1, 12, T[1]);c = FF(c, d, a, b, M_offset_2, 17, T[2]);b = FF(b, c, d, a, M_offset_3, 22, T[3]);a = FF(a, b, c, d, M_offset_4, 7, T[4]);d = FF(d, a, b, c, M_offset_5, 12, T[5]);c = FF(c, d, a, b, M_offset_6, 17, T[6]);b = FF(b, c, d, a, M_offset_7, 22, T[7]);a = FF(a, b, c, d, M_offset_8, 7, T[8]);d = FF(d, a, b, c, M_offset_9, 12, T[9]);c = FF(c, d, a, b, M_offset_10, 17, T[10]);b = FF(b, c, d, a, M_offset_11, 22, T[11]);a = FF(a, b, c, d, M_offset_12, 7, T[12]);d = FF(d, a, b, c, M_offset_13, 12, T[13]);c = FF(c, d, a, b, M_offset_14, 17, T[14]);b = FF(b, c, d, a, M_offset_15, 22, T[15]);a = GG(a, b, c, d, M_offset_1, 5, T[16]);d = GG(d, a, b, c, M_offset_6, 9, T[17]);c = GG(c, d, a, b, M_offset_11, 14, T[18]);b = GG(b, c, d, a, M_offset_0, 20, T[19]);a = GG(a, b, c, d, M_offset_5, 5, T[20]);d = GG(d, a, b, c, M_offset_10, 9, T[21]);c = GG(c, d, a, b, M_offset_15, 14, T[22]);b = GG(b, c, d, a, M_offset_4, 20, T[23]);a = GG(a, b, c, d, M_offset_9, 5, T[24]);d = GG(d, a, b, c, M_offset_14, 9, T[25]);c = GG(c, d, a, b, M_offset_3, 14, T[26]);b = GG(b, c, d, a, M_offset_8, 20, T[27]);a = GG(a, b, c, d, M_offset_13, 5, T[28]);d = GG(d, a, b, c, M_offset_2, 9, T[29]);c = GG(c, d, a, b, M_offset_7, 14, T[30]);b = GG(b, c, d, a, M_offset_12, 20, T[31]);a = HH(a, b, c, d, M_offset_5, 4, T[32]);d = HH(d, a, b, c, M_offset_8, 11, T[33]);c = HH(c, d, a, b, M_offset_11, 16, T[34]);b = HH(b, c, d, a, M_offset_14, 23, T[35]);a = HH(a, b, c, d, M_offset_1, 4, T[36]);d = HH(d, a, b, c, M_offset_4, 11, T[37]);c = HH(c, d, a, b, M_offset_7, 16, T[38]);b = HH(b, c, d, a, M_offset_10, 23, T[39]);a = HH(a, b, c, d, M_offset_13, 4, T[40]);d = HH(d, a, b, c, M_offset_0, 11, T[41]);c = HH(c, d, a, b, M_offset_3, 16, T[42]);b = HH(b, c, d, a, M_offset_6, 23, T[43]);a = HH(a, b, c, d, M_offset_9, 4, T[44]);d = HH(d, a, b, c, M_offset_12, 11, T[45]);c = HH(c, d, a, b, M_offset_15, 16, T[46]);b = HH(b, c, d, a, M_offset_2, 23, T[47]);a = II(a, b, c, d, M_offset_0, 6, T[48]);d = II(d, a, b, c, M_offset_7, 10, T[49]);c = II(c, d, a, b, M_offset_14, 15, T[50]);b = II(b, c, d, a, M_offset_5, 21, T[51]);a = II(a, b, c, d, M_offset_12, 6, T[52]);d = II(d, a, b, c, M_offset_3, 10, T[53]);c = II(c, d, a, b, M_offset_10, 15, T[54]);b = II(b, c, d, a, M_offset_1, 21, T[55]);a = II(a, b, c, d, M_offset_8, 6, T[56]);d = II(d, a, b, c, M_offset_15, 10, T[57]);c = II(c, d, a, b, M_offset_6, 15, T[58]);b = II(b, c, d, a, M_offset_13, 21, T[59]);a = II(a, b, c, d, M_offset_4, 6, T[60]);d = II(d, a, b, c, M_offset_11, 10, T[61]);c = II(c, d, a, b, M_offset_2, 15, T[62]);b = II(b, c, d, a, M_offset_9, 21, T[63]);H[0] = H[0] + a | 0;H[1] = H[1] + b | 0;H[2] = H[2] + c | 0;H[3] = H[3] + d | 0;
    }, _doFinalize: function _doFinalize() {
      var data = this._data;var dataWords = data.words;var nBitsTotal = this._nDataBytes * 8;var nBitsLeft = data.sigBytes * 8;dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);var nBitsTotalL = nBitsTotal;dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;data.sigBytes = (dataWords.length + 1) * 4;this._process();var hash = this._hash;var H = hash.words;for (var i = 0; i < 4; i++) {
        var H_i = H[i];H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
      }return hash;
    }, clone: function clone() {
      var clone = Hasher.clone.call(this);clone._hash = this._hash.clone();return clone;
    } });function FF(a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + x + t;return (n << s | n >>> 32 - s) + b;
  }function GG(a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + x + t;return (n << s | n >>> 32 - s) + b;
  }function HH(a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + x + t;return (n << s | n >>> 32 - s) + b;
  }function II(a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + x + t;return (n << s | n >>> 32 - s) + b;
  }C.MD5 = Hasher._createHelper(MD5);C.HmacMD5 = Hasher._createHmacHelper(MD5);
})(Math);

cc._RFpop();
},{"./core":"core"}],"mode-ecb":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4621cR9uJdMfqdTavrC8axn', 'mode-ecb');
// Script/network/aes/mode-ecb.js

"use strict";

var CryptoJS = require("./core");CryptoJS.mode.ECB = function () {
  var ECB = CryptoJS.lib.BlockCipherMode.extend();ECB.Encryptor = ECB.extend({ processBlock: function processBlock(words, offset) {
      this._cipher.encryptBlock(words, offset);
    } });ECB.Decryptor = ECB.extend({ processBlock: function processBlock(words, offset) {
      this._cipher.decryptBlock(words, offset);
    } });return ECB;
}();

cc._RFpop();
},{"./core":"core"}],"nettest":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3a1a7wCx+pJkYKinF36cMF+', 'nettest');
// Script/nettest.js

"use strict";

var NetData = require("NetData");
var DataOper = require("DataOper");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    click: function click() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getInit(this.netCallback, this);
    },

    click2: function click2() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getBet(0, "", 0, 1, 10, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
    },
    click3: function click3() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getReward(NetData.NetData.getInst().BetResult.ticketNo, NetData.NetData.getInst().InitResult.playTime, this.netCallback, this);
    },

    click4: function click4() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getGameList(this.netCallback, this);
    },

    click5: function click5() {
        var dataOper = DataOper.DataOper.getInst();
        dataOper.getPool(this.netCallback, this);
    },

    netCallback: function netCallback(cmd, res, msg, self) {
        cc.log("netCallback cmd=" + cmd);
        if (res == 0) {
            switch (cmd) {
                case 100:
                    //初始化
                    {
                        var data = NetData.NetData.getInst().InitResult;
                    }
                    break;

                case 101:
                    //投注
                    {

                        var data = NetData.NetData.getInst().BetResult;
                        cc.log("********投注********");
                    }
                    break;

                case 102:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().RewardResult;
                    }
                    break;

                case 103:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().GameListResult;
                    }
                    break;

                case 104:
                    //结算
                    {
                        //结算
                        cc.log("********结算********");
                        var data = NetData.NetData.getInst().PoolResult;
                    }
                    break;

                default:
                    {}
                    break;
            }
        } else {}
    }

});

cc._RFpop();
},{"DataOper":"DataOper","NetData":"NetData"}],"number":[function(require,module,exports){
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
        numberArray: {
            default: [],
            type: [cc.Node]
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
            this.m_newData = destCount;
            this.m_oldData = destCount;
            for (var i = 0; i < this.numberArray.length; i++) {
                var unitNumber = destCount % 10;
                destCount = parseInt(destCount / 10);
                this.numberArray[i].getComponent("number").setArrayNumber(unitNumber);
            }
        }
    },
    //中奖池奖之后直接设置数字
    setArrayNumber: function setArrayNumber(number) {
        this.m_delta = 0;
        this.m_distance = 0;
        this.m_moveCountDis = 0;
        this.initNumber(number);
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
    //滚动时逻辑
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
        number = number % 10;
        label.m_number = number;
        label.spriteFrame = this.textureArray[number];
    }
});

cc._RFpop();
},{}],"unit":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e962fhyGPpGyrQZLactAFrm', 'unit');
// Script/unit.js

"use strict";

var cubeS = require("cube");
var Game = require("Game");
cc.Class({
    extends: cc.Component,

    properties: {
        unitIndex: -1,

        cube_array: [],
        m_controlSpeed: 1000, //控制加速
        m_speed: 0, //当前速度
        m_moveDis: 0, //移动距离
        m_start: false,
        m_deltaDis: 0,

        m_totalDis: 0,
        m_stopDis: 0,
        m_stopFlag: false,
        stopData_array: [],
        dataIndex: 0,
        onceFlag: false,
        isSpecialModel: false, //大丰收模式
        onFunction: null,
        nameArray: null },

    // use this for initialization
    onLoad: function onLoad() {
        this.onFunction = cc.find('Canvas').getComponent('Game');
        this.cube_array = [];
        this.nameArray = ["WW", "FG", "M1", "M2", "M3", "F4", "F5", "F6", "F7", "F8"];
        this.m_controlSpeed = 1000;
        for (var i = 0; i < 6; i++) {
            var cubeName = "cube" + "" + (i + 1);
            var cube = this.node.getChildByName(cubeName);
            var cubeScript = cube.getComponent(cubeS);
            var rand = parseInt(Math.random() * 10);
            var nameStr = this.nameArray[rand];
            cubeScript.setCube(nameStr);
            this.cube_array.push(cube);
        }
        this.m_start = false;
    },

    startRound: function startRound() {
        this.onceFlag = false;
        this.m_speed = 200;
        this.m_controlSpeed = 2000;
        this.dataIndex = 0;
        this.m_start = true;
        this.m_stopFlag = false;
        this.m_stopDis = 0;
    },

    hiddleCube: function hiddleCube() {
        this.isSpecialModel = false;
        for (var i = 5; i >= 0; i--) {
            var cube = this.cube_array[i];
            cube.getComponent(cubeS).stopAni();
        }
    },

    setStopDataArray: function setStopDataArray(stopData_array, index, isSpecialModel) {
        this.nameArray = ["WW", "FG", "M1", "M2", "M3", "F4", "F5", "F6", "F7", "F8"];
        if (index == 1) {
            this.isSpecialModel = isSpecialModel;
        } else {
            this.isSpecialModel = false;
        }
        this.stopData_array = null;
        this.stopData_array = stopData_array.concat();
        //最后放2个随机图
        for (var i = 0; i < 2; i++) {
            var rand = parseInt(Math.random() * 10);
            var nameStr = this.nameArray[rand];
            this.stopData_array.push(nameStr);
        }
        this.unitIndex = index;
    },

    setIsSpecialModel: function setIsSpecialModel(flag) {
        this.isSpecialModel = flag;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.m_start) {
            this.soltsRound(dt);
        }
    },

    getCubeArray: function getCubeArray() {
        return this.cube_array;
    },

    //soltsRound
    soltsRound: function soltsRound(dt) {
        if (dt > 0.032) {
            dt = 0.032;
        }
        this.m_speed = this.m_speed + (this.m_controlSpeed - this.m_speed) * dt * 4;
        this.m_moveDis = this.m_speed * dt;
        this.m_totalDis += this.m_moveDis;
        for (var i = 5; i >= 0; i--) {
            var cube = this.cube_array[i];
            cube.y = cube.y - this.m_moveDis;
            if (cube.y < -112.5) {
                //换顺序  
                this.m_deltaDis = -112.5 - cube.y;
                this.restPosAndArray();
            }
        }
        if (this.m_stopDis + 60 <= this.m_totalDis && this.m_stopFlag === true) {
            this.m_start = false;
            //回弹
            this.kickAction();
        }
    },

    kickAction: function kickAction() {
        var outDis = 112.5 - this.cube_array[0].y;
        this.onceFlag = false;
        for (var i = 0; i < 6; i++) {
            var cube = this.cube_array[i];
            var moveBy = cc.moveBy(0.1, cc.p(0, outDis));
            var callback = cc.callFunc(this.judgeLastRound, this);
            var seq = cc.sequence(moveBy, callback);
            cube.runAction(seq);
        }
    },

    judgeLastRound: function judgeLastRound() {
        if (this.unitIndex == 5 && this.dataIndex == 6) {
            if (this.onceFlag == false) {
                this.onceFlag = true;
                this.scheduleOnce(this.allRoundEnded, 1);
            }
        } else {
            if (this.isSpecialModel == true && this.unitIndex == 1 && this.dataIndex == 6) {
                this.cube_array[3].getComponent(cubeS).playAni();
                this.cube_array[2].getComponent(cubeS).playAni();
                this.cube_array[1].getComponent(cubeS).playAni();
                this.cube_array[0].getComponent(cubeS).playAni();
                this.onFunction.setUnitSpecialModel();
            }
        }
    },

    allRoundEnded: function allRoundEnded() {
        this.onFunction.roundEnded();
    },
    //
    restPosAndArray: function restPosAndArray() {
        var tempCube = this.cube_array.shift();
        tempCube.y = 1237.5 - this.m_deltaDis;
        this.cube_array.push(tempCube);
        var nameStr = "";
        if (this.m_stopFlag == false) {
            var rand = parseInt(Math.random() * 10);
            nameStr = this.nameArray[rand];
        } else {
            var nameStr = this.stopData_array[this.dataIndex];
            if (this.isSpecialModel == true && nameStr == "WW" && this.dataIndex < 4 && this.unitIndex != 1) {
                tempCube.getComponent(cubeS).playAni();
            }
            this.dataIndex++;
        }
        tempCube.getComponent(cubeS).setCube(nameStr);
    },

    stopRound: function stopRound() {
        if (this.m_stopFlag == false) {
            this.m_controlSpeed = 500;
            this.m_stopDis = this.cube_array[5].y - 112.5;
            this.m_stopFlag = true;
            this.m_totalDis = 0;
            //换第一个
            var nameStr = this.stopData_array[this.dataIndex];
            this.cube_array[5].getComponent(cubeS).setCube(nameStr);
            var nameStr = this.stopData_array[this.dataIndex];
            if (this.isSpecialModel == true && nameStr == "WW" && this.dataIndex < 4 && this.unitIndex != 1) {
                this.cube_array[5].getComponent(cubeS).playAni();
            }
            this.dataIndex++;
        }
    }
});

cc._RFpop();
},{"Game":"Game","cube":"cube"}]},{},["BroadCast","ButtonScale","Common","Game","Help","JiangChi","JiluListScript","Notouch","PoolRule","PriceGroup","SelectLine","TurntableOrderScript","WaitScript","WinAni","cube","GameData","nettest","DataOper","Init","NetData","SdkData","aes","cipher-core","core","enc-base64","evpkdf","md5","mode-ecb","number","unit"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQnJvYWRDYXN0LmpzIiwiYXNzZXRzL1NjcmlwdC9CdXR0b25TY2FsZS5qcyIsImFzc2V0cy9TY3JpcHQvQ29tbW9uLmpzIiwiYXNzZXRzL1NjcmlwdC9uZXR3b3JrL0RhdGFPcGVyLmpzIiwiYXNzZXRzL1NjcmlwdC9tb3VkbGUvR2FtZURhdGEuanMiLCJhc3NldHMvU2NyaXB0L0dhbWUuanMiLCJhc3NldHMvU2NyaXB0L0hlbHAuanMiLCJhc3NldHMvU2NyaXB0L25ldHdvcmsvSW5pdC5qcyIsImFzc2V0cy9TY3JpcHQvSmlhbmdDaGkuanMiLCJhc3NldHMvU2NyaXB0L0ppbHVMaXN0U2NyaXB0LmpzIiwiYXNzZXRzL1NjcmlwdC9uZXR3b3JrL05ldERhdGEuanMiLCJhc3NldHMvU2NyaXB0L05vdG91Y2guanMiLCJhc3NldHMvU2NyaXB0L1Bvb2xSdWxlLmpzIiwiYXNzZXRzL1NjcmlwdC9QcmljZUdyb3VwLmpzIiwiYXNzZXRzL1NjcmlwdC9uZXR3b3JrL1Nka0RhdGEuanMiLCJhc3NldHMvU2NyaXB0L1NlbGVjdExpbmUuanMiLCJhc3NldHMvU2NyaXB0L1R1cm50YWJsZU9yZGVyU2NyaXB0LmpzIiwiYXNzZXRzL1NjcmlwdC9XYWl0U2NyaXB0LmpzIiwiYXNzZXRzL1NjcmlwdC9XaW5BbmkuanMiLCJhc3NldHMvU2NyaXB0L25ldHdvcmsvYWVzL2Flcy5qcyIsImFzc2V0cy9TY3JpcHQvbmV0d29yay9hZXMvY2lwaGVyLWNvcmUuanMiLCJhc3NldHMvU2NyaXB0L25ldHdvcmsvYWVzL2NvcmUuanMiLCJhc3NldHMvU2NyaXB0L2N1YmUuanMiLCJhc3NldHMvU2NyaXB0L25ldHdvcmsvYWVzL2VuYy1iYXNlNjQuanMiLCJhc3NldHMvU2NyaXB0L25ldHdvcmsvYWVzL2V2cGtkZi5qcyIsImFzc2V0cy9TY3JpcHQvbmV0d29yay9hZXMvbWQ1LmpzIiwiYXNzZXRzL1NjcmlwdC9uZXR3b3JrL2Flcy9tb2RlLWVjYi5qcyIsImFzc2V0cy9TY3JpcHQvbmV0dGVzdC5qcyIsImFzc2V0cy9TY3JpcHQvbnVtYmVyLmpzIiwiYXNzZXRzL1NjcmlwdC91bml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0E7QUFsQlE7O0FBcUJaO0FBQ0E7O0FBR0E7QUFDSTtBQUNBO0FBQ1E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0g7QUFDUjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDUTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ1A7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUE3Rkk7Ozs7Ozs7Ozs7QUNIVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUdKOzs7OztBQUtBO0FBQ0E7QUFDSTs7Ozs7Ozs7O0FBVUE7OztBQUlBO0FBRUc7QUFDQztBQUVDO0FBQ0o7QUFFQTs7QUFFRDtBQUNJO0FBQ0E7QUFFSTtBQUNBO0FBRUg7QUFFSjs7QUFFRDtBQUNJO0FBQ0g7QUFFQTs7QUFFRjtBQUVGOztBQUVEO0FBRUk7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQVdDO0FBRUU7QUFFQztBQUNIO0FBR0U7QUFDRjtBQUVBOztBQUVGOztBQUVDO0FBQ0g7O0FBdEdJOzs7Ozs7Ozs7O0FDQ1Q7QUFDSTtBQUNJO0FBQ0E7QUFGUTtBQURROztBQU94QjtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFIRztBQURBOztBQVFYO0FBQ0k7QUFDQTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSDtBQXZDaUI7O0FBMkN0QjtBQUNJO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFoQks7O0FBbUJWO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBRUc7QUFDUTtBQUNBO0FBRUk7QUFDSTtBQUNBO0FBQ0g7QUFFRztBQUNIO0FBQ0o7QUFDUjtBQUVHO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0g7QUFFRztBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDSDtBQUVHO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBdEdpQjs7QUF5R3RCO0FBQ0k7QUFDQTtBQUNBO0FBSGE7Ozs7Ozs7Ozs7QUM1SmpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRlE7QUFEUTs7QUFPeEI7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBSEc7QUFEQTs7QUFRWDtBQUNJO0FBQ0E7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDSDtBQUNKOztBQUVEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQWhEaUI7O0FBbUR0QjtBQUNJO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBeENrQjs7QUEyQ3ZCOztBQUVJO0FBQ0k7QUFDQTs7QUFFQTs7QUFFSTtBQUVJO0FBQ0E7QUFDSDtBQUNEO0FBRUg7O0FBRUQ7O0FBRUk7QUFDSTtBQUNIO0FBQ0o7QUFwQks7O0FBdUJWO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUhhO0FBS2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEJTOztBQWdDYjtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNKOztBQUtEO0FBQ0E7QUFDSDs7QUFFRDtBQUVJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BO0FBQ0k7O0FBRUE7QUFFSTtBQUNIOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNIO0FBRUc7QUFDSDtBQUNKO0FBQ0c7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0M7QUFDRDtBQUNDO0FBQ0o7QUFDSjs7QUFFRDs7Ozs7QUFLQztBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDSTtBQUFTO0FBQUM7QUFDUDtBQUNBO0FBQ0Y7QUFDRDtBQUNBO0FBQVM7QUFBQztBQUNQO0FBQ0Y7QUFDRDtBQUNBO0FBQVM7QUFBQztBQUNQO0FBQ0Y7QUFDRDs7QUFFQTtBQUFTO0FBQUM7QUFDUDtBQUNGO0FBQ0Q7O0FBRUE7QUFBUztBQUFDO0FBQ1A7QUFDRjtBQUNEO0FBQ0E7QUFBUztBQUFDO0FBQ1A7QUFDRjtBQUNEO0FBQ0E7QUFDQTtBQTdCSjtBQStCSDs7QUFFRjtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7Ozs7O0FBS0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztBQVNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUdEOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEOzs7QUFHQTtBQUNJO0FBQ0M7QUFDRDtBQUNBO0FBQ0E7QUFDSDs7QUFFRjs7O0FBR0M7QUFDSTtBQUNDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0g7O0FBRUE7OztBQUdEO0FBQ0k7QUFDQztBQUNEO0FBQ0E7QUFDQTtBQUNIO0FBMVltQjs7QUE2WXhCO0FBQ0k7QUFEYTs7Ozs7Ozs7OztBQ3ZmakI7O0FBRUE7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFGTTtBQUlWO0FBQ0E7QUFSZ0I7O0FBWXhCO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBTGlCOztBQVN6QjtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUhPO0FBS1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBckJpQjs7QUF5QnpCO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVJTO0FBRFM7O0FBYzFCO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOa0I7O0FBVTFCO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRlM7QUFJYjtBQUNJO0FBQ0E7QUFGVTtBQWxCTjs7QUF3Qlo7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQztBQUNEO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ1E7QUFDUDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDUTtBQUNQO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQWxHaUI7O0FBcUh0QjtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFITztBQUtYOztBQUdKO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDSDs7QUF4Q2tCO0FBMER2QjtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUo7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDSDtBQXBCbUI7O0FBdUJ2QjtBQUNJO0FBQ0k7QUFDRztBQUNBO0FBQ0E7QUFIRTs7QUFERTs7QUFVWDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBaEJpQjs7QUFzQnRCO0FBQ0k7O0FBR0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQVRrQjs7QUFhdEI7QUFDRztBQUNRO0FBQ0E7QUFGRztBQUlYO0FBQ1E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFWZ0I7O0FBaUJ6QjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUGE7Ozs7Ozs7Ozs7QUN6VWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZTOztBQUtiO0FBQ0k7QUFDQTtBQUZRO0FBSVo7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGUTs7QUFLWjtBQUNJO0FBQ0E7QUFGTzs7QUFLWDtBQUNJO0FBQ0E7QUFGTzs7QUFLWDtBQUNJO0FBQ0E7QUFGVzs7QUFLZjtBQUNJO0FBQ0E7QUFGUTs7QUFLWjtBQUNJO0FBQ0E7QUFGUzs7QUFLYjtBQUNJO0FBQ0E7QUFGUTs7QUFLWjtBQUNJO0FBQ0E7QUFGTzs7QUFLWDtBQUNJO0FBQ0E7QUFGYTs7QUFLakI7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZNOztBQUtWO0FBQ0k7QUFDQTtBQUZPOztBQUtYO0FBQ0k7QUFDQTtBQUZPOztBQUtYO0FBQ0E7QUFDSTtBQUNBO0FBRlM7QUFJYjtBQUNJO0FBQ0E7QUFGVTtBQUlkO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGTztBQUlYO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRlc7QUFJZjtBQUNJO0FBQ0E7QUFGWTtBQUloQjtBQUNJO0FBQ0E7QUFGVztBQUlmO0FBQ0k7QUFDQTtBQUZTOztBQUtiO0FBQ0k7QUFDQTtBQUZNO0FBSVY7QUFDSTtBQUNBO0FBRk07QUFJVjtBQUNJO0FBQ0E7QUFGUztBQUliO0FBQ0k7QUFDQTtBQUZVOztBQUtkO0FBQ0k7QUFDQTtBQUZVOztBQUtkO0FBQ0k7QUFDQTtBQUZjOztBQUtsQjtBQUNJO0FBQ0E7QUFGZTs7QUFLbkI7QUFDSTtBQUNBO0FBRk87O0FBS1g7QUFDSTtBQUNBO0FBRlM7O0FBS2I7QUFDSTtBQUNBO0FBRlc7O0FBS2Y7QUFDSTtBQUNBO0FBRlE7O0FBS1o7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDSTtBQUNBO0FBRk07QUFJVjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZNO0FBSVY7QUFDSTtBQUNBO0FBRlc7QUFJZjtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGTTtBQUlWO0FBQ0k7QUFDQTtBQUZHO0FBSVA7QUFDSTtBQUNBO0FBRk07QUFJVjtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0k7QUFDQTtBQUZjO0FBSWxCO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGTTtBQUlWO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRmU7QUFJbkI7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGUTtBQUlaO0FBQ0k7QUFDQTtBQUZROztBQUtaO0FBQ0k7QUFDQTtBQUZROztBQUtaO0FBQ0k7QUFDQTtBQUZNO0FBSVY7QUFDQTtBQUNJO0FBQ0E7QUFGUTs7QUFLWjtBQUNJO0FBQ0E7QUFGTTs7QUFLVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUZLO0FBNVZEO0FBaVdaO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDQTtBQUNJO0FBQ0c7QUFDQTtBQUNBO0FBQ0E7QUFDRjtBQUNKO0FBQ0Q7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBR0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUEyQjtBQUN2QjtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUVJO0FBQ0E7QUFDSDtBQUNEO0FBRUg7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDRDs7QUFFQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBQ0k7QUFDSDtBQUNEOztBQUVBO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRDs7QUFFQTtBQUNBO0FBQ0k7QUFDSDtBQUVHO0FBQ0g7QUFFRztBQUNIO0FBRUc7QUFDSDtBQUVHO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIO0FBQ0Q7O0FBRUE7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVIOztBQUVEO0FBQ0k7QUFDSDtBQUNEOztBQUVBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNDO0FBQXNCO0FBQ25CO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7QUFFRztBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQWlDO0FBQzdCO0FBQ0g7QUFDSjtBQUNEO0FBQ0c7QUFDRjtBQUVHO0FBQ0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVLO0FBQ0o7QUFDRDtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDRDtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUVJO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFFSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFBc0I7QUFDbkI7QUFDSDtBQUNHO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNLO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUFTO0FBQ1Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFBUztBQUNUO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQVM7QUFDVDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUEzREo7QUE2REg7QUFDdUI7QUFDcEI7QUFDSTtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBQ0g7QUFDeUM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUN1QjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0c7QUFBZTtBQUNYO0FBQ0E7QUFDSDtBQUFvQjtBQUNqQjtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDRztBQUNBO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFFSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7Ozs7Ozs7OztBQVNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFBMEI7QUFDdEI7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNIO0FBQUs7QUFDRjtBQUNIO0FBQ0o7O0FBR0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUdEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDs7Ozs7QUFLQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBMkI7QUFDdkI7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNBO0FBQ0k7QUFDSDtBQUNKO0FBQ0c7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUE0QjtBQUN4QjtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBRUg7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVKO0FBQ0Q7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUVJO0FBQ0g7QUFHRTtBQUNGO0FBQ0o7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDSTtBQUNHO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUVKO0FBQ0o7QUFDSjtBQUNHO0FBQ0g7QUFDSjtBQUNHO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0c7QUFDQTtBQUNBO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBRUo7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQTBCO0FBQ3RCO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFDRztBQUNJO0FBQ0E7QUFDSDtBQUNHO0FBQ0g7QUFDSTtBQUNEO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNBO0FBQ0g7O0FBRUE7QUFDRDtBQUNJO0FBQ0E7QUFDRztBQUNBO0FBQ0Y7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVEO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUEyQjtBQUN2QjtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0c7QUFDQTtBQUNGO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSztBQUNBO0FBQ0o7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNJO0FBQ0s7QUFDQTtBQUNKO0FBQ0o7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0g7O0FBRUY7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSDtBQUNKO0FBQ0c7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBQTBCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNIO0FBQ0w7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0c7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNIOztBQUVGO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDSTtBQUEyQjtBQUN0QjtBQUNKO0FBQ0o7QUFDRztBQUVJO0FBQ0g7QUFDRDtBQUEyQjtBQUN2QjtBQUNJO0FBQ0g7QUFDSjtBQUNKO0FBQ0Q7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTs7QUFFQTtBQUNJO0FBQU87QUFDUDtBQUVBO0FBQ0E7QUFBTztBQUNIO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7QUFDRDtBQUNBO0FBQU87QUFDSDtBQUNJO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUFPO0FBQ0g7QUFDSTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFBTztBQUNIO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7QUFDRDtBQUNBO0FBQ0E7QUFsQ0o7QUFvQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQU87QUFDUDtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFBTztBQUNIO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFBTztBQUNIO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFBTztBQUNIO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFBTztBQUNIO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQTVCSjtBQThCSDs7QUFFRDtBQUNIO0FBRUc7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUFpQztBQUM3QjtBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0E7QUFDSztBQUNKO0FBQ0E7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0s7QUFDRjtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFBSztBQUNGO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQUNHO0FBQ0g7QUFFSjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXVCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0g7QUFDSjtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNFO0FBQ0Y7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBRUc7QUFDSTtBQUNBO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNIOztBQUVFO0FBQ0E7QUFDQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDRDs7QUFFQTtBQUNBO0FBQ1E7QUFDQTtBQUNBO0FBQ1E7QUFDUTtBQUNBO0FBQ0k7QUFDUTtBQUNBO0FBQ1A7O0FBRUQ7O0FBRUk7O0FBRUE7QUFFSTtBQUNIO0FBR0c7QUFDSDtBQUVKO0FBRUc7QUFDQTtBQUNIO0FBQ0o7QUFFRztBQUNIO0FBQ1I7QUFDUjtBQUVHOztBQUVBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBRUk7QUFDSDtBQUdHO0FBQ0g7QUFDSjtBQUNEO0FBQ0g7QUFFRztBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUVJO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFFSjs7QUFFRDtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0g7QUFDRDtBQUVQO0FBRUc7QUFDSDtBQUNKO0FBRUc7QUFDSDtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUVJO0FBQ0E7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0g7QUFDSjs7QUFFRDs7QUFFQTtBQUNBO0FBQ0k7QUFDQTs7QUFFQzs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBRUc7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7QUFDSTs7QUFFQTtBQUFzQjs7QUFFdEI7O0FBRUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQztBQUNKO0FBRUc7QUFDSDtBQUNKO0FBRUc7QUFDSDtBQUNKOztBQUVEO0FBRUk7QUFDQTtBQUVJO0FBQ0g7QUFDQTtBQUNHO0FBRUk7O0FBRUE7O0FBR0U7QUFDQTtBQUNJO0FBQ0M7QUFDSjtBQUVEO0FBQ0c7QUFDRDtBQUNBO0FBQ0E7QUFFSTtBQUNIO0FBR0c7QUFDSDtBQUNGO0FBQ0Y7QUFDSjtBQUdHO0FBQ0E7QUFDSDtBQUNKO0FBR0c7QUFDRDtBQUNGO0FBQ0g7O0FBR0Q7QUFDRztBQUNGOztBQUVEO0FBQ0c7QUFDRjs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNHO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFFSTtBQUNIO0FBRUc7QUFDSDtBQUNKO0FBRUc7QUFDQTtBQUNIO0FBQ0o7QUFDRztBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBRUk7QUFDSDtBQUdHO0FBQ0g7QUFDSjtBQUNEO0FBQ0g7QUFFRztBQUNIO0FBQ0o7QUFDSDtBQXB4RUc7Ozs7Ozs7Ozs7QUNiVDtBQUNBOztBQUVBO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZROztBQWFaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDs7QUFFQTtBQUNJO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBRUk7QUFDSDs7QUFFRDtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBQ0Q7QUFDQTs7QUFFQTs7QUFFSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBRUk7QUFDQTtBQUNIO0FBN0hJOzs7Ozs7Ozs7O0FDSFQ7QUFDQTtBQUNBOztBQUlBO0FBQ0k7O0FBRUE7Ozs7QUFJQTtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDTTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0Y7QUFDSTtBQUNBO0FBRmtDO0FBSXBDO0FBQ0Y7QUFDRTtBQUNGO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDRjtBQUNOO0FBR0o7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0s7QUFDRDtBQUNBO0FBQ0k7QUFDSDtBQUVHO0FBQ0g7QUFFRztBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQXZFSTs7Ozs7Ozs7OztBQ05UO0FBQ0E7QUFDQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGTztBQUlYO0FBQ0k7QUFDQTtBQUZFO0FBSU47QUFDSTtBQUNBO0FBRk07QUFJVjtBQUNJO0FBQ0E7QUFGWTtBQUloQjtBQUNJO0FBQ0E7QUFGVztBQUlmO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFHSjtBQUNBOztBQUlBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBQ0E7QUFDQTtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUVJO0FBQXVCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXlEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQTlKSTs7Ozs7Ozs7OztBQ0ZUO0FBQ0E7O0FBRUE7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZROztBQUtaO0FBQ0k7QUFDQTtBQUZNO0FBSVY7QUFDSTtBQUNBO0FBRlM7QUFJYjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFCUTs7QUE2Qlo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUVJO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNDO0FBQ0k7QUFDQTs7QUFFTDtBQUNJO0FBQ0E7QUFDQTtBQUNDOztBQUVMO0FBQ0k7QUFDQzs7QUFFRjtBQUVOOztBQUVEO0FBQ0k7O0FBRUk7O0FBRUE7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7Ozs7O0FBS0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUVJO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBRUk7QUFDQTtBQUNBO0FBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBRUk7QUFDSDs7QUFFRDtBQUVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUdHO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQUVJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFRDtBQUNDO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0o7QUFDSDtBQUVHO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0g7QUFwUkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJO0FBQ0k7QUFDQTs7QUFFQTs7QUFFSTtBQUVJO0FBQ0E7QUFDSDtBQUNEO0FBRUg7O0FBRUQ7O0FBRUk7QUFDSTtBQUNIO0FBQ0o7QUFwQks7O0FBdUJWOztBQUVJO0FBQ0E7QUFDSTs7QUFFQTtBQUhRO0FBS1o7QUFDQTtBQUNJOztBQUVBO0FBSFM7QUFLYjtBQUNBO0FBQ0k7O0FBRUE7QUFIVztBQUtmO0FBQ0E7QUFDSTs7QUFFQTtBQUhXOztBQU1kO0FBQ0Q7QUFDSTs7QUFFQTtBQUhPOztBQU1YO0FBQ0E7QUFDSTtBQUNBO0FBRk87O0FBS1g7QUFDQTtBQUNJO0FBQ0E7QUFGSzs7QUFLVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJSjtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0c7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBRUc7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDSDtBQTlHa0I7O0FBaUh2QjtBQUNJO0FBRGE7Ozs7Ozs7Ozs7QUNwSGpCO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUUTs7QUFZWjtBQUNBO0FBQ0c7QUFDSztBQUNBOztBQUVBO0FBRUk7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQWpDSTs7Ozs7Ozs7OztBQ0FUO0FBQ0E7O0FBRUE7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUZLOztBQUtUO0FBQ0k7QUFDQTtBQUZLOztBQUtUO0FBQ0E7QUFDSTtBQUNBO0FBRlc7O0FBS2Y7QUFDQTtBQUNJO0FBQ0E7QUFGYTs7QUFLakI7QUFDSTtBQUNBO0FBRks7O0FBS1Q7QUFqQ1E7O0FBb0NaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7QUFHRDtBQUNJO0FBQ0k7O0FBRUE7QUFFSTtBQUNIOztBQUVEO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUVKO0FBQ0Q7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUVJO0FBQ0E7QUFDSDtBQXpHSTs7Ozs7Ozs7OztBQ0hUO0FBQ0E7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZLO0FBREQ7O0FBT1o7QUFDSTtBQUNJO0FBQ0g7QUFDRztBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0M7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDUTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDRztBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDUjtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFBb0I7O0FBQUE7QUFHWjtBQUVBO0FBQ0k7QUFDSDtBQUNEO0FBUlk7O0FBQ2hCO0FBQ0E7QUFBMEI7QUFTekI7QUFDSjtBQXpHSTs7Ozs7Ozs7OztBQ0RUO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFoQks7O0FBbUJOO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDSTtBQUVIOztBQUVEO0FBQ0E7O0FBSUE7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBUko7QUFVQztBQUNSO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUVHO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUVHO0FBQ0E7QUFDSDtBQUNKOztBQXRIYzs7QUEySHZCOzs7Ozs7Ozs7O0FDL0hBO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0E7QUFDSTtBQUNBO0FBRkU7QUFJTjtBQUNBO0FBQ0k7QUFDQTtBQUZHO0FBSU47QUFDRztBQUNBO0FBRkk7QUFJUDtBQUNHO0FBQ0E7QUFGSTtBQUlQO0FBQ0c7QUFDQTtBQUZJO0FBSVA7QUFDRztBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0E7O0FBbERRO0FBcURaOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDRztBQUNIO0FBQ0c7QUFDSDtBQUNHO0FBQ0g7QUFDRztBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJOzs7Ozs7Ozs7QUFVQTs7O0FBSUE7O0FBRUk7QUFFQztBQUNBO0FBQ0o7QUFFQTs7QUFFRDs7QUFFSTtBQUNBO0FBRUk7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFFSjs7QUFFRDtBQUNJO0FBQ0g7QUFJSjs7QUFFRDtBQUVJO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFXQztBQUVFO0FBRUM7QUFDSDtBQUdFO0FBQ0Y7QUFFQTs7QUFFRjs7QUFFQztBQUNIOztBQXhLSTs7Ozs7Ozs7OztBQ0FUO0FBQ0E7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5ROztBQVNaO0FBQ0E7O0FBSUE7QUFDQTtBQUVJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBRUk7QUFDQTtBQUNIO0FBR0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0g7QUFHRztBQUNBO0FBQ0g7QUFHRztBQUNBO0FBQ0g7QUFFSjs7QUFFRDtBQUNBOztBQUVBO0FBMURLOzs7Ozs7Ozs7O0FDRFQ7QUFDSTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNDO0FBQ0k7O0FBRUE7QUFFSTtBQUNIOztBQUVEO0FBQ0g7QUFyQkc7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZHO0FBSVA7QUFDSTtBQUNBO0FBRkc7QUFJTjtBQUNHO0FBQ0E7QUFGSTtBQUlQO0FBQ0c7QUFDQTtBQUZJO0FBSVA7QUFDRztBQUNBO0FBRkk7QUFJUDtBQUNHO0FBQ0E7QUFGSTtBQUlQO0FBQ0c7QUFDQTtBQUZJOztBQUtSO0FBQ0k7QUFDQTtBQUZJOztBQUtSO0FBQ0k7QUFDQTtBQUZJOztBQUtSO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUDtBQUNHO0FBQ0E7QUFGSztBQUlSO0FBQ0c7QUFDQTtBQUZLO0FBSVI7QUFDRztBQUNBO0FBRks7QUFJUjtBQUNHO0FBQ0E7QUFGSztBQUlSO0FBQ0c7QUFDQTtBQUZLOztBQUtUO0FBQ0k7QUFDQTtBQUZLOztBQUtUO0FBQ0k7QUFDQTtBQUZLOztBQUtUO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDSTtBQUNBO0FBRks7QUFJVDtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDSTtBQUNBO0FBRks7QUFJVDtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0k7QUFDQTtBQUZLOztBQW5KRDs7QUEwSlo7QUFDQTtBQUNJOztBQUVBO0FBQ0E7Ozs7Ozs7O0FBU0g7O0FBRUQ7QUFFSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUg7O0FBaFhJOzs7Ozs7Ozs7O0FDQVQ7QUFBZ0w7QUFBbVI7QUFBZ0M7QUFBVTtBQUFVO0FBQUs7QUFBZ0I7QUFBQztBQUF3QztBQUFnYztBQUFPO0FBQUs7QUFBaUM7QUFBQztBQUFDO0FBQXVHO0FBQTRNO0FBQWtCO0FBQW1DO0FBQUs7QUFBZ0Q7QUFBa0k7QUFBSztBQUFnQztBQUFpRjtBQUFDO0FBQWdEO0FBQUM7QUFBMEY7QUFBeUM7QUFBeUI7QUFBSztBQUEyQjtBQUF5QjtBQUEyQjtBQUFLO0FBQW1KO0FBQUM7QUFBQztBQUFpQztBQUE0RjtBQUFpQztBQUFtTztBQUEyRjtBQUFtTjtBQUFnZTtBQUE4ZjtBQUF1RDs7Ozs7Ozs7OztBQ0F6ekg7QUFBeUU7QUFBMlY7QUFBaUQ7QUFBbUM7QUFBaUQ7QUFBa0M7QUFBbUY7QUFBa0I7QUFBd0Q7QUFBOEI7QUFBZ0Q7QUFBK0I7QUFBZTtBQUF5QjtBQUFvRTtBQUE0RjtBQUFtQztBQUF5QjtBQUEyQjtBQUFLO0FBQTBCO0FBQUM7QUFBd0I7QUFBeUM7QUFBaUU7QUFBc0M7QUFBb0U7QUFBRTtBQUFDO0FBQWdGO0FBQThFO0FBQStIO0FBQXdDO0FBQXFDO0FBQXdDO0FBQTBCO0FBQWdDO0FBQWtDO0FBQStGO0FBQXlMO0FBQWlFO0FBQWlOO0FBQTZDO0FBQXVCO0FBQWdDO0FBQUs7QUFBMEI7QUFBNkI7QUFBMEI7QUFBQztBQUFXO0FBQTJFO0FBQTRPO0FBQStCO0FBQThFO0FBQXNCO0FBQXFGO0FBQW9IO0FBQW1IO0FBQXFDO0FBQUs7QUFBMkQ7QUFBb0Q7QUFBd0M7QUFBc0M7QUFBd0I7QUFBdUU7QUFBeUY7QUFBSztBQUFzRjtBQUE0QjtBQUFpRztBQUF5QjtBQUE4QjtBQUFrRDtBQUFvRztBQUEyRTtBQUF3RjtBQUFLO0FBQXlCO0FBQWtDO0FBQTRCO0FBQWdKO0FBQTBHO0FBQThEO0FBQW1KO0FBQ2oySjtBQUFnVDtBQUE2QztBQUFzSztBQUFvQztBQUFnQztBQUFxQztBQUFLO0FBQWtCO0FBQUM7QUFBbUc7QUFBVTtBQUE0QjtBQUErTTtBQUFpTDtBQUFzUTtBQUFrRDtBQUFxUztBQUFHOzs7Ozs7Ozs7O0FDRGp2RDtBQUFpRDtBQUE0RDtBQUFnRDtBQUFtRDtBQUF5QjtBQUFvQztBQUF3QjtBQUEwQztBQUFDO0FBQWtFO0FBQW1CO0FBQW1GO0FBQThDO0FBQW9DO0FBQTRDO0FBQTRDO0FBQUM7QUFBMEM7QUFBa0M7QUFBQztBQUFrQjtBQUF3QztBQUFFO0FBQTZFO0FBQW1EO0FBQXVCO0FBQUs7QUFBNkI7QUFBQztBQUE0QjtBQUFxQztBQUE0QjtBQUEwSjtBQUFnQztBQUEwSDtBQUFDO0FBQUs7QUFBaUM7QUFBaUQ7QUFBQztBQUF3QztBQUFrQjtBQUF3STtBQUFrQjtBQUE2RTtBQUF5QjtBQUFrQztBQUFvRTtBQUFvTDtBQUFDO0FBQW9DO0FBQW1HO0FBQXdDO0FBQXVFO0FBQXNHO0FBQXdIO0FBQXlCO0FBQXdCO0FBQTZFO0FBQTREO0FBQWdEO0FBQXlEO0FBQXlHO0FBQXVGO0FBQTRCO0FBQTJCO0FBQXFGO0FBQTBEO0FBQWlEO0FBQXFEO0FBQUk7QUFBK0Q7QUFBUztBQUF3QztBQUFDO0FBQXlCO0FBQTJEO0FBQXdGO0FBQW1EO0FBQXdCO0FBQTBCO0FBQXNCO0FBQXdEO0FBQTRCO0FBQWlNO0FBQXFDO0FBQUs7QUFBOEQ7QUFBNEc7QUFBdUQ7QUFBdUM7QUFBOEU7QUFBc0Q7QUFBa0I7QUFBNEU7QUFBZ0g7QUFBMkM7QUFBa0I7QUFBd0Q7QUFBZ0M7QUFBd0Q7QUFBa0M7QUFBa0I7QUFBNEI7QUFDdDFKO0FBQVk7QUFBaUQ7QUFBNkI7QUFBOEM7QUFBQztBQUFvQztBQUE2QjtBQUEwRDtBQUFDO0FBQWlDOzs7Ozs7Ozs7O0FDRDFTO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGRDtBQUlIO0FBQ0k7QUFDQTtBQUZEO0FBSUg7QUFDSTtBQUNBO0FBRkQ7QUFJSDtBQUNJO0FBQ0E7QUFGRDtBQUlIO0FBQ0k7QUFDQTtBQUZEO0FBSUg7QUFDSTtBQUNBO0FBRkQ7QUFJSDtBQUNJO0FBQ0E7QUFGRDtBQUlIO0FBQ0k7QUFDQTtBQUZEO0FBSUg7QUFDSTtBQUNBO0FBRkQ7QUFJSDtBQUNJO0FBQ0E7QUFGRDtBQUlIO0FBQ0E7O0FBR0o7QUFDQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0c7QUFDSDtBQUNHO0FBQ0g7QUFDRztBQUNIO0FBQ0c7QUFDSDtBQUNHO0FBQ0g7QUFDRztBQUNIO0FBQ0c7QUFDSDtBQUNHO0FBQ0g7QUFDRztBQUNIO0FBQ0o7O0FBckhJOzs7Ozs7Ozs7O0FDQVQ7QUFBMkM7QUFBb0k7QUFBOEk7QUFBeU87QUFBdUQ7QUFBQztBQUErQztBQUE0QjtBQUE4QjtBQUFDO0FBQTRCO0FBQTJCO0FBQXNHO0FBQXFFO0FBQTZCO0FBQUM7QUFBNkQ7QUFBUTtBQUE0TTtBQUFDO0FBQXNDO0FBQTJFOzs7Ozs7Ozs7O0FDQTMwQztBQUEyQztBQUF5TztBQUE4QjtBQUFpQztBQUFtTjtBQUFVO0FBQXFCO0FBQThGO0FBQTRDO0FBQXlCO0FBQWdEO0FBQXdDO0FBQWlEO0FBQUM7Ozs7Ozs7Ozs7QUNBbDNCO0FBQStDO0FBQTRIO0FBQXNCO0FBQTRDO0FBQUM7QUFBMEQ7QUFBNEU7QUFBb0M7QUFBc0I7QUFBK0o7QUFBeXJGO0FBQXdCO0FBQXNuQjtBQUFzRjtBQUFZO0FBQWtCO0FBQThFO0FBQThCO0FBQXlEO0FBQTJCO0FBQXlEO0FBQTJCO0FBQWtEO0FBQTJCO0FBQXFEO0FBQXdFOzs7Ozs7Ozs7O0FDQXQrSTtBQUE2RDtBQUE0RztBQUF3QztBQUFpRTtBQUF3QztBQUFjOzs7Ozs7Ozs7O0FDQXhVO0FBQ0E7QUFDQTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWUTs7QUFhWjtBQUNBOztBQUlBO0FBQ0k7QUFDQTtBQUVIOztBQUVEO0FBQ0k7QUFDQTtBQUVIO0FBQ0c7QUFDQTtBQUNBO0FBRUg7O0FBRUc7QUFDQTtBQUNBO0FBRUg7O0FBR0c7QUFDQTtBQUNBO0FBRUg7O0FBRUc7QUFDQTtBQUNBO0FBRUk7QUFFSTtBQUFTO0FBQ1Q7QUFDSTtBQUVIO0FBQ0Q7O0FBRUE7QUFBUztBQUNUOztBQUVJO0FBQ0E7QUFFSDtBQUNEOztBQUVBO0FBQVM7QUFDVDtBQUNFO0FBQ0E7QUFDQTtBQUVEO0FBQ0Q7O0FBRWdCO0FBQVM7QUFDekI7QUFDRTtBQUNBO0FBQ0E7QUFFRDtBQUNEOztBQUVnQjtBQUFTO0FBQ3pCO0FBQ0U7QUFDQTtBQUNBO0FBRUQ7QUFDRDs7QUFFQTtBQUNBO0FBR0E7QUFqREo7QUFtREg7QUFJSjs7QUE5R0k7Ozs7Ozs7Ozs7QUNGVDtBQUNJOztBQUVBO0FBQ0c7QUFDSztBQUNBO0FBRk07QUFJWDtBQUNBO0FBQ0s7QUFDQTtBQUZRO0FBSWI7QUFDSztBQUNBO0FBRk87QUFJWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFSTtBQUNBO0FBRko7QUF2QlM7O0FBNkJaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUVKO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUFxQjtBQUNqQjtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQTZDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7QUFDRDtBQUF1QjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUFLO0FBQ0Y7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBcktJOzs7Ozs7Ozs7O0FDQVQ7QUFDQTtBQUNBO0FBQ0k7O0FBRUE7QUFDSTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdIO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVGO0FBQ0s7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQXFCO0FBQ2pCO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUlEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7QUFDRztBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVKO0FBQ0o7O0FBRUQ7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSDtBQUNKO0FBekxJIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbnZhciBDb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBicm9hZGNhc3REYXRhIDogbnVsbCxcbiAgICAgICAgaW5kZXggOiAwLFxuICAgICAgICBsYWJlbHMgOiB7XG4gICAgICAgICAgICBkZWZhdWx0IDogW10sXG4gICAgICAgICAgICB0eXBlIDogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgZmlyc3RGbGFnIDogdHJ1ZSxcbiAgICAgICAgcmVzZXRGbGFnIDogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHsgIFxuICAgIH0sXG5cbiAgICBkYXRhQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmJyb2FkY2FzdERhdGEgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQubWFycXVlZUluZm9zO1xuICAgICAgICBpZih0aGlzLmJyb2FkY2FzdERhdGEgJiYgdGhpcy5icm9hZGNhc3REYXRhLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RGbGFnKXsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7ICsraSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVBcnJheS5wdXNoKHRoaXMubGFiZWxzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMubm9kZS54ID0gMDtcbiAgICAgICAgdGhpcy5yZXNldExhYmVsKCk7XG4gICAgfSxcblxuICAgIHJlc2V0TGFiZWwgOiBmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLnJlc2V0RmxhZyAmJiB0aGlzLmZyZWVBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmZyZWVBcnJheS5zaGlmdCgpO1xuICAgICAgICAgICAgbGFiZWwubm9kZS54ID0gNDIwO1xuXG4gICAgICAgICAgICBpZih0aGlzLmluZGV4ID49IHRoaXMuYnJvYWRjYXN0RGF0YS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBDb21tb24uQ29tbW9uLmdldEluc3QoKS5nZXROaWNrKDAsdGhpcy5icm9hZGNhc3REYXRhW3RoaXMuaW5kZXhdLnVpZCwgZnVuY3Rpb24oaixuaWNrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5pY2tuaWNrID0gbmljaztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IHNlbGYuYnJvYWRjYXN0RGF0YVtzZWxmLmluZGV4XS5tc2cucmVwbGFjZSgvI3t1c2VyfS8sIG5pY2tuaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5icm9hZGNhc3REYXRhW3NlbGYuaW5kZXhdLm1zZy5pbmRleE9mKFwi5aSp6ZmNXCIpID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjQ2LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI0NywgMjQxLCAyMzApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZUFycmF5LnB1c2gobGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc2V0RmxhZyA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0RmxhZyl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVBcnJheS5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVBcnJheVtpXS5ub2RlLnggLT0gMjAwICogZHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFjdGl2ZUFycmF5WzBdLm5vZGUueCArIHRoaXMuYWN0aXZlQXJyYXlbMF0ubm9kZS53aWR0aCA8IC02MDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVBcnJheS5wdXNoKHRoaXMuYWN0aXZlQXJyYXkuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVBcnJheVt0aGlzLmFjdGl2ZUFycmF5Lmxlbmd0aCAtIDFdLm5vZGUueCArIHRoaXMuYWN0aXZlQXJyYXlbdGhpcy5hY3RpdmVBcnJheS5sZW5ndGggLSAxXS5ub2RlLndpZHRoIDwgMjAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldExhYmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIFxuICAgICAgICBpbnRlcmFjdGFibGVUeXBlOnRydWUsXG4gICAgICAgIHNlbGVjdFR5cGU6MCxcbiAgICAgICAgc2VsZWN0RmxhZzogZmFsc2UsLy/mt7vliqDpgInkuK3nirbmgIFcbiAgICAgICAgXG4gICAgfSxcbiAgICAvKnBheDogZnVuY3Rpb24oYzEsIGMyKVxuICAgIHtcbiAgICAgICByZXR1cm4gYzIgLSBjMTtcbiAgICB9LCovXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLypsZXQgYXJyRGVtbyA9IG5ldyBBcnJheSgxLCAzLCAyLCA1LCA2KTtcbiAgICAgICAgLy9hcnJEZW1vLnNvcnQodGhpcy5wYXgpO1xuICAgICAgICAvL2FyckRlbW8uc29ydChmdW5jdGlvbihhLGIpe3JldHVybiBhPmI/MTotMX0pOy8v5LuO5bCP5Yiw5aSn5o6S5bqPXG4gICAgICAgIGFyckRlbW8uc29ydChmdW5jdGlvbihhLGIpe3JldHVybiBhPGI/MTotMX0pOy8v5LuO5aSn5Yiw5bCP5o6S5bqPXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyckRlbW8ubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInRlc3Rzb3J0XCIgKyBhcnJEZW1vW2ldKTtcbiAgICAgICAgfSovXG4gICAgICAgIFxuICAgICAgICAvL2NjLmxvZyhcInRlc3Rzb3J0IGJiYmJiYmJiYmJiYmJiYmJiYlwiICk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciB0aW1lQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJhY3RhYmxlVHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDAuODtcbiAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJhY3RhYmxlVHlwZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgb25GdW5jdGlvbiA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZScpO1xuICAgICAgICAgICAgICAgIG9uRnVuY3Rpb24uYnRuQWN0aW9uQ2FsbEJhY2sodGhpcy5zZWxlY3RUeXBlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aW1lQ2FsbGJhY2ssIDAuMDAxKTtcbiAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBzZXRJbnRlcmFjdGFibGVUeXBlOmZ1bmN0aW9uKGludGVyVHlwZSlcbiAgICB7XG4gICAgICAgIC8vY2MubG9nKFwic2V0SW50ZXJhY3RhYmxlVHlwZSBcIiArIGludGVyVHlwZSk7XG4gICAgICAgIHRoaXMuaW50ZXJhY3RhYmxlVHlwZSA9IGludGVyVHlwZTtcbiAgICAgICAgLypcbiAgICAgICAgaWYoaW50ZXJUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgIHRoaXMubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMjQsIDEyNCwgMTI0KTsgXG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgXG4gICAgICAgICB2YXIgdGltZUNhbGxiYWNrID0gZnVuY3Rpb24gKGR0KVxuICAgICAgICB7XG4gICAgICAgICAgIGlmKGludGVyVHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTI0LCAxMjQsIDEyNCk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aW1lQ2FsbGJhY2ssIDAuMDAxKTtcbiAgICAgICBcbiAgICAgICAgLy9jYy5sb2coXCJ0aGlzLm5vZGUuY29sb3IgXCIgKyB0aGlzLm5vZGUuY29sb3Iucik7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsIlxudmFyIEtleVZhbHVlID0gY2MuQ2xhc3Moe1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAga2V5IDogXCJcIixcbiAgICAgICAgdmFsdWUgOiBcIlwiXG4gICAgfVxufSk7XG5cbnZhciBDdXNNYXAgPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczp7XG4gICAgICAgIG1hcHMgOiB7XG4gICAgICAgICAgICBkZWZhdWx0IDogW10sXG4gICAgICAgICAgICB0eXBlIDogW0tleVZhbHVlXSxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgc2V0IDogZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgIHZhciBzX2tleSA9IGtleS50b1N0cmluZygpO1xuICAgICAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubWFwcy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICBpZih0aGlzLm1hcHNbaV0ua2V5ID09PSBzX2tleSl7XG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2ldLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGZsYWcgPT09IGZhbHNlKXtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IG5ldyBLZXlWYWx1ZSgpO1xuICAgICAgICAgICAga2V5VmFsdWUua2V5ID0gc19rZXk7XG4gICAgICAgICAgICBrZXlWYWx1ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5tYXBzLnB1c2goa2V5VmFsdWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBnZXQgOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgc19rZXkgPSBrZXkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcHMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgaWYodGhpcy5tYXBzW2ldLmtleSA9PT0gc19rZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaV0udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0pO1xuXG5cbnZhciBDb21tb24gPSBjYy5DbGFzcyh7XG4gICAgc3RhdGljcyA6IHtcbiAgICAgICAgZ19Db21tb25JbnN0IDogbnVsbCxcblxuICAgICAgICBnZXRJbnN0IDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKENvbW1vbi5nX0NvbW1vbkluc3QgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIENvbW1vbi5nX0NvbW1vbkluc3QgPSBuZXcgQ29tbW9uKCk7XG4gICAgICAgICAgICAgICAgQ29tbW9uLmdfQ29tbW9uSW5zdC5pbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBDb21tb24uZ19Db21tb25JbnN0O1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3RvcnlJbnN0ICA6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKENvbW1vbi5nX0NvbW1vbkluc3QgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIENvbW1vbi5nX0NvbW1vbkluc3QgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJlc01hcCA9IG5ldyBDdXNNYXAoKTtcbiAgICAgICAgdGhpcy5uaWNrTWFwID0gbmV3IEN1c01hcCgpO1xuICAgIH0sXG5cbiAgICBzZXROaWNrIDogZnVuY3Rpb24oaWQsIG5pY2spe1xuICAgICAgICB0aGlzLm5pY2tNYXAuc2V0KGlkLCBuaWNrKTtcbiAgICB9LFxuXG4gICAgZ2V0TmljayA6IGZ1bmN0aW9uKGosaWQsIGNhbGxiYWNrKXtcbiAgICAgICAgdmFyIG5pY2sgPSAgdGhpcy5uaWNrTWFwLmdldChpZCk7XG4gICAgICAgIGlmKG5pY2sgIT0gbnVsbCl7XG4gICAgICAgICAgICBjYWxsYmFjayhqLG5pY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZiAoIUNDX0pTQiAmJiB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsuZ2V0QXZhdGFyKGlkLCBmdW5jdGlvbihvYmopXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9iaiAmJiBvYmpbaWRdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5pY2soaWQsIG9ialtpZF0ubmljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaixvYmpbaWRdLm5pY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhqLFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaixpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0VGV4dHVyZSA6IGZ1bmN0aW9uKGtleSwgdGV4dHVyZSl7XG4gICAgICAgIHRoaXMucmVzTWFwLnNldChrZXksIHRleHR1cmUpO1xuICAgIH0sXG5cbiAgICBnZXRUZXh0dXJlIDogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzTWFwLmdldChrZXkpO1xuICAgIH0sXG5cbiAgICBzZXROb1RvdWNoIDogZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIHZhciBub1RvdWNoTGF5ZXIgPSBjYy5maW5kKFwiQ2FudmFzL25vVG91Y2hMYXllclwiKTtcblxuICAgICAgICBpZihmbGFnKXtcbiAgICAgICAgICAgIG5vVG91Y2hMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBub1RvdWNoTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIHNob3dUb2FzdCA6IGZ1bmN0aW9uKGNvbnRlbnQpe1xuICAgICAgICB2YXIgdG9hc3QgPSBjYy5maW5kKFwiQ2FudmFzL3RvYXN0XCIpLmdldENvbXBvbmVudChcIlRvYXN0XCIpO1xuICAgICAgICB0b2FzdC5zaG93KGNvbnRlbnQpO1xuICAgIH0sXG4gICAgXG4gICAgc2hvd0RpYWxvZyA6IGZ1bmN0aW9uKGRpYWxvZ1RhZywgY2FsbE5vZGUsIGNhbGxGdW5jLCBjb250ZW50LCBidG5MLCBidG5SKXtcbiAgICAgICAgdmFyIGRpYWxvZyA9IGNjLmZpbmQoXCJDYW52YXMvZGlhbG9nXCIpLmdldENvbXBvbmVudChcIkRpYWxvZ1wiKTtcbiAgICAgICAgZGlhbG9nLnNob3coZGlhbG9nVGFnLCBjYWxsTm9kZSwgY2FsbEZ1bmMsIGNvbnRlbnQsIGJ0bkwsIGJ0blIpO1xuICAgIH0sXG5cbiAgICByZWNvbm5lY3RpbmcgOiBmdW5jdGlvbihmbGFnLCBjb250ZW50KXtcbiAgICAgICAgdmFyIGxvYWRpbmcgPSBjYy5maW5kKFwiQ2FudmFzL2xvYWRpbmdcIikuZ2V0Q29tcG9uZW50KFwiTG9hZGluZ1wiKTtcbiAgICAgICAgbG9hZGluZy5yZWNvbm5lY3RpbmcoZmxhZywgY29udGVudCk7XG4gICAgfSxcbiAgICBcbiAgICBsb2cgOiBmdW5jdGlvbihtc2cpe1xuICAgICAgICBpZiAoIUNDX0pTQiAmJiB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgLy93aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESy5sb2coJ2RlYnVnJywgJ2NoZXN0JywgJ2luZm8nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVidWcgOiBmdW5jdGlvbihtc2cpe1xuICAgICAgICBpZiAoIUNDX0pTQiAmJiB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsubG9nKCdkZWJ1ZycsICdPcGVuQ2hlc3QnLCBtc2cpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIENvbW1vbiA6IENvbW1vbixcbiAgICBLZXlWYWx1ZSA6IEtleVZhbHVlLFxuICAgIEN1c01hcCA6IEN1c01hcFxufTsiLCJ2YXIgQ3J5cHRvSlMgPSByZXF1aXJlKFwiY29yZVwiKTtcbnJlcXVpcmUoXCJhZXNcIik7XG52YXIgTmV0RGF0YSA9IHJlcXVpcmUoXCJOZXREYXRhXCIpO1xudmFyIEdhbWVEYXRhID0gcmVxdWlyZShcIkdhbWVEYXRhXCIpO1xuXG52YXIgS2V5VmFsdWUgPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBrZXkgOiBcIlwiLFxuICAgICAgICB2YWx1ZSA6IFwiXCJcbiAgICB9XG59KTtcblxudmFyIEN1c01hcCA9IGNjLkNsYXNzKHtcbiAgICBwcm9wZXJ0aWVzOntcbiAgICAgICAgbWFwcyA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQgOiBbXSxcbiAgICAgICAgICAgIHR5cGUgOiBbS2V5VmFsdWVdLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzZXQgOiBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgdmFyIHNfa2V5ID0ga2V5LnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBmbGFnID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXBzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgIGlmKHRoaXMubWFwc1tpXS5rZXkgPT09IHNfa2V5KXtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZmxhZyA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gbmV3IEtleVZhbHVlKCk7XG4gICAgICAgICAgICBrZXlWYWx1ZS5rZXkgPSBzX2tleTtcbiAgICAgICAgICAgIGtleVZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm1hcHMucHVzaChrZXlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGdldCA6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHZhciBzX2tleSA9IGtleS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubWFwcy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICBpZih0aGlzLm1hcHNbaV0ua2V5ID09PSBzX2tleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBjbGVhciA6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcHMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgaWYodGhpcy5tYXBzW2ldLmtleSA9PSBrZXkpe1xuICAgICAgICAgICAgICAgIHRoaXMubWFwcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIE5ldFdvcmsgPSBjYy5DbGFzcyh7XG4gICAgc2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3RJZCwgcmVxdWVzdEhlYWRlcnMsIHJlcXVlc3REYXRhLCBjYWxsZnVuYyl7XG4gICAgICAgIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHtcbiAgICAgICAgICAgICAgICB4aHIgPSB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESy5nZXRIdHRwUmVxdWVzdE9iamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3hoci5vcGVuKFwiUE9TVFwiLCBcImh0dHA6Ly8xMC4wLjIwLjUyOjgwODAvZ2F0ZXdheS9wcm9jZXNzXCIpOyAvL1xuICAgICAgICAvL3hoci5vcGVuKFwiUE9TVFwiLCBcImh0dHBzOi8vZ2F0ZXdheS1kZXYudXV6ei5jb206MTAwMTAvZ2F0ZXdheS9wcm9jZXNzXCIpOyAvL+WxseS4nFxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCJodHRwOi8vMjExLjE1MS41LjEzMToxNDAzMC9nYXRld2F5L3Byb2Nlc3NcIik7IC8v546L6Zu3XG4gICAgICAgIHhoci50aW1lb3V0ID0gMTUwMDA7Ly8xNXPotoXml7ZcbiAgICAgICAgXG4gICAgICAgIC8v6K6+572u6K+35rGC5aS0XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXF1ZXN0SGVhZGVycy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihyZXF1ZXN0SGVhZGVyc1tpXS5rZXksIHJlcXVlc3RIZWFkZXJzW2ldLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB2YXIgbXlEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY2MubG9nKFwiKioqKioqKioqKioqKioqKjpcIisgbXlEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIHhoci5zZW5kKHJlcXVlc3REYXRhKTtcbiAgICBcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHZhciBteURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgLy8gY2MubG9nKFwiKioqKioqKioqIG9uTG9hZDpcIitteURhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGNhbGxmdW5jKHJlcXVlc3RJZCwgeGhyKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyB2YXIgbXlEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIioqKioqKioqIG9uZXJyb3I6XCIrbXlEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBjYWxsZnVuYyhyZXF1ZXN0SWQsIHhocik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIHZhciBteURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgLy8gY2MubG9nKFwiKioqKioqIG9udGltZW91dDpcIitteURhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGNhbGxmdW5jKHJlcXVlc3RJZCwgeGhyKTtcbiAgICAgICAgfTtcbiAgICB9XG59KTtcblxudmFyIERhdGFPcGVyID0gY2MuQ2xhc3Moe1xuICAgIFxuICAgIHN0YXRpY3MgOiB7XG4gICAgICAgIGdfRGF0YU9wZXJJbnN0IDogbnVsbCxcbiAgICAgICAgc19pbmRleCA6IDAsXG4gICAgICAgIFxuICAgICAgICBnZXRJbnN0OmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKERhdGFPcGVyLmdfRGF0YU9wZXJJbnN0ID09PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIERhdGFPcGVyLmdfRGF0YU9wZXJJbnN0ID0gbmV3IERhdGFPcGVyKCk7XG4gICAgICAgICAgICAgICAgRGF0YU9wZXIuZ19EYXRhT3Blckluc3QuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIERhdGFPcGVyLmdfRGF0YU9wZXJJbnN0O1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdG9yeUluc3Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoRGF0YU9wZXIuZ19EYXRhT3Blckluc3QgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIERhdGFPcGVyLmdfRGF0YU9wZXJJbnN0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzIDoge1xuICAgICAgICAvL+ivt+axgmRhdGFcbiAgICAgICAgcmVxdWVzdERhdGEgOiBcIlwiLFxuICAgICAgICAvL+ivt+axgmlkXG4gICAgICAgIHJlcXVlc3RJZCA6IDAsXG4gICAgICAgIC8vYWVzIEtleVxuICAgICAgICBhZXNLZXkgOiBcIjgxN2ZlZDk1ZjllMTZiZWRcIiwvL+enmOmSpe+8jOWGmeatu1xuICAgICAgICBcbiAgICAgICAgLy8qKioqKioqKioqKioqKioq6K+35rGC5aS05L+h5oGvKioqKioqKioqKlxuICAgICAgICAvL+ivt+axguWktOaVsOe7hFxuICAgICAgICByZXF1ZXN0SGVhZGVycyA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQgOiBbXSxcbiAgICAgICAgICAgIHR5cGUgOiBbS2V5VmFsdWVdLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvL+WRveS7pOWPt1xuICAgICAgICBoZWFkZXJDbWQgOiAwLCAvL+WIneWni+WMli0xMDAgIOaKleazqC0xMDEgIOe7k+euly0xMDNcbiAgICAgICAgLy9zaWdcbiAgICAgICAgaGVhZGVyU2lnIDogXCJcIixcbiAgICAgICAgLy/niYjmnKzlj7dcbiAgICAgICAgaGVhZGVyVmVyIDogXCIxLjBcIixcbiAgICAgICAgLy/kvJror53moIfor4ZcbiAgICAgICAgaGVhZGVyVG9rZW4gOiBcIjM3MDk2NjAyODNcIiwvL1wiMzYyOTc1MjYxMFwiLC8vXCIyMDU0NjgzNzE1XCIsLy9cIjM3MDkxODcyMjBcIiwvL1wiMzcwNjIwMTc3OVwiLCBcIjM3MDYyNjEwNDFcIiwgXCIyMDU0NjgzNzE1XCIgXCJ5cHRkYWlseTA2L3Rhb2JhbzEyMzQgLT4gMzcwOTE3NzU5MFwiIFwieXB0ZGFpbHkwOS90YW9iYW8xMjM0IC0+IDM3MDkxODcyMjBcIlxuICAgICAgICAvL+a4uOaIj+a4oOmBk+WunuS+i+agh+ivhmFuXG4gICAgICAgIGdhbWVUb2tlbiA6IFwiODhjOGFmZDVhMjlkNWUyN2U0MDY2ZjFmOWVkYTUxMDItMTItMTU3Ni0yOTk5XCIsXG4gICAgICAgIC8v5Y6f5aeLIDM5YmZjZWQzYzdhZDBmOTk2NWRjMTVjNTk3NzViY2JiLTEyLTE1NzYtMTIyNlxuICAgICAgICAvL+WkluWNliA4OGM4YWZkNWEyOWQ1ZTI3ZTQwNjZmMWY5ZWRhNTEwMi0xMi0xNTc2LTI5OTlcbiAgICAgICAgLy/ph5HluIEgOTRhOTU3ODU0ODA5YmM1NjYxNGMyODI4NDllZWZhNjAtMTItMTU3Ni0yNzc2XG4gICAgICAgIC8v5ri45oiP5qCH6K+GXG4gICAgICAgIC8vaGVhZGVyR2lkIDogXCIxMDAxMFwiICAvL+avj+S4qua4uOaIj+WcqOi/memHjOWGmeatuyAg5ZCM6Iqx6aG6LTEwMDAwICDlsI/mgKrogZTnm58tMTAwMDEgIOaXl+W8gOW+l+iDnC0xMDAwMiDlpYflubvlrp3nn7MtMTAwMDMg6ICB6JmO5py6LTEwMDA0IOWcsOS6p+Wkp+S6qC0xMDAwNSDln4Plj4rmjqLlrp0tMTAwMDlcbiAgICB9LFxuICAgIFxuICAgIGluaXQgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmNhbGxmdW5jcyA9IG5ldyBDdXNNYXAoKTtcbiAgICAgICAgdGhpcy5jYWxsbm9kZSA9IG5ldyBDdXNNYXAoKTtcbiAgICAgICAgdGhpcy5jYWxsY21kID0gbmV3IEN1c01hcCgpO1xuICAgICAgICBjYy5sb2coXCJqYj1cIiArIENDX0pTQik7XG4gICAgICAgIFxuICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICB0aGlzLmdhbWVUb2tlbiA9IHRoaXMuR2V0UXVlcnlTdHJpbmcoXCJhY2Nlc3NUb2tlblwiKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyVG9rZW4gPSB0aGlzLkdldFF1ZXJ5U3RyaW5nKFwidG9rXCIpO1xuICAgICAgICAgICAgaWYodGhpcy5nYW1lVG9rZW4gPT0gbnVsbCl7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVRva2VuID0gXCIzOWJmY2VkM2M3YWQwZjk5NjVkYzE1YzU5Nzc1YmNiYi0xMi0xNTc2LTEyMjZcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuaGVhZGVyVG9rZW4gPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUb2tlbiA9IFwiMFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG5cbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmdhbWVUb2tlbiA9IFwiICsgdGhpcy5nYW1lVG9rZW4pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuaGVhZGVyVG9rZW4gPSBcIiArIHRoaXMuaGVhZGVyVG9rZW4pO1xuICAgIH0sXG5cbiAgICBHZXRRdWVyeVN0cmluZyA6IGZ1bmN0aW9uKG5hbWUpXG4gICAge1xuICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIrIG5hbWUgK1wiPShbXiZdKikoJnwkKVwiKTtcbiAgICAgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xuICAgICAgICBpZihyIT09bnVsbClyZXR1cm4gIHVuZXNjYXBlKHJbMl0pOyByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIHNldFJlcXVlc3RIZWFkZXIgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0gW107XG5cbiAgICAgICAgdmFyIGtleVZhbHVlID0gbmV3IEtleVZhbHVlKCk7XG4gICAgICAgIGtleVZhbHVlLmtleSA9IFwiY21kXCI7XG4gICAgICAgIGtleVZhbHVlLnZhbHVlID0gdGhpcy5oZWFkZXJDbWQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycy5wdXNoKGtleVZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIGtleVZhbHVlID0gbmV3IEtleVZhbHVlKCk7XG4gICAgICAgIGtleVZhbHVlLmtleSA9IFwiQ29udGVudC1UeXBlXCI7XG4gICAgICAgIGtleVZhbHVlLnZhbHVlID0gXCJ0ZXh0L3BsYWluXCI7XG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMucHVzaChrZXlWYWx1ZSk7XG4gICAgICAgIFxuICAgICAgICAvKmtleVZhbHVlID0gbmV3IEtleVZhbHVlKCk7XG4gICAgICAgIGtleVZhbHVlLmtleSA9IFwiY2lkXCI7XG4gICAgICAgIGtleVZhbHVlLnZhbHVlID0gdGhpcy5oZWFkZXJDaWQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycy5wdXNoKGtleVZhbHVlKTsqL1xuICAgICAgICBcbiAgICAgICAga2V5VmFsdWUgPSBuZXcgS2V5VmFsdWUoKTtcbiAgICAgICAga2V5VmFsdWUua2V5ID0gXCJzaWdcIjtcbiAgICAgICAga2V5VmFsdWUudmFsdWUgPSB0aGlzLmhlYWRlclNpZy50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzLnB1c2goa2V5VmFsdWUpO1xuICAgICAgICBcbiAgICAgICAga2V5VmFsdWUgPSBuZXcgS2V5VmFsdWUoKTtcbiAgICAgICAga2V5VmFsdWUua2V5ID0gXCJ2ZXJcIjtcbiAgICAgICAga2V5VmFsdWUudmFsdWUgPSB0aGlzLmhlYWRlclZlci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzLnB1c2goa2V5VmFsdWUpO1xuICAgICAgICBcbiAgICAgICAga2V5VmFsdWUgPSBuZXcgS2V5VmFsdWUoKTtcbiAgICAgICAga2V5VmFsdWUua2V5ID0gXCJ0b2tcIjtcbiAgICAgICAga2V5VmFsdWUudmFsdWUgPSB0aGlzLmhlYWRlclRva2VuLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMucHVzaChrZXlWYWx1ZSk7XG5cbiAgICAgICAga2V5VmFsdWUgPSBuZXcgS2V5VmFsdWUoKTtcbiAgICAgICAga2V5VmFsdWUua2V5ID0gXCJnYW1lVG9rZW5cIjtcbiAgICAgICAga2V5VmFsdWUudmFsdWUgPSB0aGlzLmdhbWVUb2tlbi50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzLnB1c2goa2V5VmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgLyprZXlWYWx1ZSA9IG5ldyBLZXlWYWx1ZSgpO1xuICAgICAgICBrZXlWYWx1ZS5rZXkgPSBcImdpZFwiO1xuICAgICAgICBrZXlWYWx1ZS52YWx1ZSA9IHRoaXMuaGVhZGVyR2lkLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnMucHVzaChrZXlWYWx1ZSk7Ki9cbiAgICB9LFxuICAgIFxuICAgIHJlcXVlc3QgOiBmdW5jdGlvbihjYWxsRnVuYywgc2VsZil7XG4gICAgICAgIGlmKHRoaXMuaGVhZGVyQ21kICE9IDEwNCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QtLS0tLS0tLS0tLWRhdGEgPSBcIiArIHRoaXMucmVxdWVzdERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbGxmdW5jcy5zZXQoRGF0YU9wZXIuc19pbmRleCwgY2FsbEZ1bmMpO1xuICAgICAgICB0aGlzLmNhbGxub2RlLnNldChEYXRhT3Blci5zX2luZGV4LCBzZWxmKTtcbiAgICAgICAgdGhpcy5jYWxsY21kLnNldChEYXRhT3Blci5zX2luZGV4LCB0aGlzLmhlYWRlckNtZCk7XG4gICAgICAgIC8vYWVz5Yqg5a+GXG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEgPSB0aGlzLkFFU0VuY3J5cHRpb24odGhpcy5yZXF1ZXN0RGF0YSwgdGhpcy5hZXNLZXkpO1xuICAgICAgICAvL0Jhc2U2NFxuICAgICAgICAvL3RoaXMucmVxdWVzdERhdGEgPSBCYXNlNjQuZW5jb2RlKHRoaXMucmVxdWVzdERhdGEpO1xuICAgICAgICAvL2d6aXBcbiAgICAgICAgLy90aGlzLnJlcXVlc3REYXRhID0gdGhpcy5yZXF1ZXN0RGF0YTtcbiAgICAgICAgLy9tZDVcbiAgICAgICAgdGhpcy5oZWFkZXJTaWcgPSBDcnlwdG9KUy5NRDUodGhpcy5yZXF1ZXN0RGF0YSk7XG4gICAgICAgIC8v6K+35rGC5aS0XG4gICAgICAgIHRoaXMuc2V0UmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvL3NlbmRcbiAgICAgICAgdmFyIG5ldFdvcmsgPSBuZXcgTmV0V29yaygpO1xuICAgICAgICBuZXRXb3JrLnNlbmQoRGF0YU9wZXIuc19pbmRleCwgdGhpcy5yZXF1ZXN0SGVhZGVycywgdGhpcy5yZXF1ZXN0RGF0YSwgdGhpcy5vbkh0dHBSZXF1ZXN0Q29tcGxldGVkKTtcbiAgICAgICAgRGF0YU9wZXIuc19pbmRleCsrO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICog6IGU572R5Zue6LCDXG4gICAgICogQFBhcmFtIHJlcXVlc3RJZCDor7fmsYJpZFxuICAgICAqIEBwYXJhbSBzdGF0dXMgICDogZTnvZHnirbmgIFcbiAgICAgKiBAcGFyYW0gcmVzcG9uZURhdGEg5ZON5bqUZGF0YVxuICAgICAqL1xuICAgIG9uSHR0cFJlcXVlc3RDb21wbGV0ZWQgOiBmdW5jdGlvbihyZXF1ZXN0SWQsIHhocil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25IdHRwUmVxdWVzdENvbXBsZXRlZC54aHIuc3RhdHVzPVwiICsgeGhyLnN0YXR1cyk7XG5cbiAgICAgICAgaWYoeGhyLnN0YXR1cyA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkh0dHBSZXF1ZXN0Q29tcGxldGVkLnhoci5tc2c9IFwiICsgeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwibXNnXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGNhbGxGdW5jID0gRGF0YU9wZXIuZ2V0SW5zdCgpLmNhbGxmdW5jcy5nZXQocmVxdWVzdElkKTtcbiAgICAgICAgdmFyIGNhbGxOb2RlID0gRGF0YU9wZXIuZ2V0SW5zdCgpLmNhbGxub2RlLmdldChyZXF1ZXN0SWQpO1xuICAgICAgICB2YXIgY2FsbENtZCA9IERhdGFPcGVyLmdldEluc3QoKS5jYWxsY21kLmdldChyZXF1ZXN0SWQpO1xuICAgICAgICBcbiAgICAgICAgRGF0YU9wZXIuZ2V0SW5zdCgpLmNhbGxmdW5jcy5jbGVhcihyZXF1ZXN0SWQpO1xuICAgICAgICBEYXRhT3Blci5nZXRJbnN0KCkuY2FsbG5vZGUuY2xlYXIocmVxdWVzdElkKTtcbiAgICAgICAgRGF0YU9wZXIuZ2V0SW5zdCgpLmNhbGxjbWQuY2xlYXIocmVxdWVzdElkKTtcblxuICAgICAgICBpZigoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkgfHwgeGhyLnN0YXR1cyA9PT0gMzA0KXtcbiAgICAgICAgICAgIC8v5Y+WaHR0cOWktFxuICAgICAgICAgICAgLy/lkb3ku6Tlj7dcbiAgICAgICAgICAgIHZhciBjbWQgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjbWRcIik7XG4gICAgICAgICAgICBjbWQgPSBwYXJzZUludChjbWQpO1xuICAgICAgICAgICAgLy9yZXNcbiAgICAgICAgICAgIHZhciByZXMgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJyZXNcIik7XG4gICAgICAgICAgICAvL21zZ1xuICAgICAgICAgICAgdmFyIG1zZyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcihcIm1zZ1wiKTtcbiAgICAgICAgICAgIG1zZyA9IGRlY29kZVVSSUNvbXBvbmVudChtc2cpO1xuICAgICAgICAgICAgLy9zaWdcbiAgICAgICAgICAgIHZhciBzaWcgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJzaWdcIik7XG4gICAgICAgICAgICBpZihyZXMgPT0gMCl7XG4gICAgICAgICAgICAgICAgLy/lj5Zib2R5XG4gICAgICAgICAgICAgICAgdmFyIGJvZHkgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIC8vbWQ16aqM6K+BXG4gICAgICAgICAgICAgICAgdmFyIHRfc2lnID0gQ3J5cHRvSlMuTUQ1KGJvZHkpO1xuICAgICAgICAgICAgICAgIGxldCB0X3NpZ19zdHIgPSBuZXcgU3RyaW5nKHRfc2lnKTtcbiAgICAgICAgICAgICAgICBsZXQgc2lnX3N0ciA9IG5ldyBTdHJpbmcoc2lnKTtcbiAgICAgICAgICAgICAgICB0X3NpZ19zdHIgPSB0X3NpZ19zdHIudHJpbSgpO1xuICAgICAgICAgICAgICAgIHNpZ19zdHIgPSBzaWdfc3RyLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmKHRfc2lnX3N0ciA9PSBzaWdfc3RyKXtcbiAgICAgICAgICAgICAgICAgICAgRGF0YU9wZXIuZ2V0SW5zdCgpLnBhcnNlclNlcnZlckRhdGEoYm9keSwgY21kKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbEZ1bmMoY21kLCByZXMsIG1zZywgY2FsbE5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjYWxsRnVuYyhjbWQsIC0xLCBcIuWKoOWvhumqjOivgemUmeivr1wiLCBjYWxsTm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiqXplJktLS1yZXM6XCIgKyByZXMgKyBcIi0tLS1tc2c6XCIgKyBtc2cpO1xuICAgICAgICAgICAgICAgIC8v57qv5Lia5YqhbG9naWNcbiAgICAgICAgICAgICAgICBpZigoY21kID09IDEwMCkgJiYgKHJlcyA9PSAxMDAwMDcgfHwgcmVzID09IDIwMDAxOSkpe1xuICAgICAgICAgICAgICAgICAgICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLnN0b3BTZWxsaW5nRGVzYyA9IG1zZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbEZ1bmMoY21kLCByZXMsIG1zZywgY2FsbE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3ZhciBjYWxsRnVuYyA9IERhdGFPcGVyLmdldEluc3QoKS5jYWxsZnVuY3MuZ2V0KHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAvL3ZhciBjYWxsTm9kZSA9IERhdGFPcGVyLmdldEluc3QoKS5jYWxsbm9kZS5nZXQocmVxdWVzdElkKTtcbiAgICAgICAgICAgIC8vY2MubG9nKFwiYWJjZGVcIik7XG4gICAgICAgICAgICAvL2NhbGxGdW5jKGNtZCwgcmVzLCBtc2csIGNhbGxOb2RlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL+iBlOe9keWksei0pVxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaHR0cCBzdGF0dXM6XCIgKyB4aHIuc3RhdHVzICsgXCJ8Y2FsbENtZD1cIiArIGNhbGxDbWQpO1xuICAgICAgICAgICAgLy9jYWxsRnVuYyhEYXRhT3Blci5nZXRJbnN0KCkuaGVhZGVyQ21kLCAtMSwgXCLnvZHnu5zlj6/og73kuI3lpb3lk6bvvIzor7fph43or5VcIiwgY2FsbE5vZGUpO1xuICAgICAgICAgICAgIGNhbGxGdW5jKGNhbGxDbWQsIC0xLCBcIue9kee7nOWPr+iDveS4jeWlveWTpu+8jOivt+mHjeivlVwiLCBjYWxsTm9kZSk7Ly/mnI3liqHlmajov57nu63plJnor6/lj5Hov4fmnaXnmoTml7blgJkgMjAxNy0yLTE1XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAq6Kej5p6Q5pyN5Yqh5Zmo6L+U5Zue5pWw5o2uXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gY21kXG4gICAgICovXG4gICAgIHBhcnNlclNlcnZlckRhdGEgOiBmdW5jdGlvbihkYXRhLCBjbWQpe1xuICAgICAgICAgLy9nemlw6Kej5Y6LXG4gICAgICAgICAvL2RhdGEgPSBkYXRhO1xuICAgICAgICAgLy9CYXNlNjRcbiAgICAgICAgIC8vZGF0YSA9IEJhc2U2NC5kZWNvZGUoZGF0YSk7XG4gICAgICAgICAvL2Flc+ino+WvhlxuICAgICAgICAgZGF0YSA9IHRoaXMuQUVTRGVjcnlwdChkYXRhLCB0aGlzLmFlc0tleSk7XG4gICAgICAgICB2YXIgaU51bTEgPSBwYXJzZUludChjbWQpO1xuXG4gICAgICAgICBpZihpTnVtMSAhPSAxMDQpe1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSA9IFwiICsgZGF0YSArIFwiLCBjbWQgPSBcIiArIGNtZCk7XG4gICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJkYXRhID0gXCIgKyBkYXRhICsgXCIsIGNtZCA9IFwiICsgY21kKTtcbiAgICAgICAgIHZhciBuZXREYXRhID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKTtcbiAgICAgICAgIHN3aXRjaChpTnVtMSl7XG4gICAgICAgICAgICAgY2FzZSAxMDA6ey8v5Yid5aeL5YyW5Y2P6K6uXG4gICAgICAgICAgICAgICAgdmFyIGluaXREYXRhPW5ldyBHYW1lRGF0YS5Jbml0RGF0YSgpO1xuICAgICAgICAgICAgICAgIGluaXREYXRhLnBhcnNlSW5pdERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgIGNhc2UgMTAxOnsvL+aKleazqOWNj+iurlxuICAgICAgICAgICAgICAgIG5ldERhdGEuQmV0UmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTsgXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgIGNhc2UgMTAyOnsvL+e7k+eul+WNj+iurlxuICAgICAgICAgICAgICAgIG5ldERhdGEuUmV3YXJkUmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICBjYXNlIDEwMzp7Ly/muLjmiI/orqLljZXliJfooahcbiAgICAgICAgICAgICAgICBuZXREYXRhLkdhbWVMaXN0UmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKS5kYXRhO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgIGNhc2UgMTA0OnsvL+WlluaxoFxuICAgICAgICAgICAgICAgIG5ldERhdGEuUG9vbFJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgIGNhc2UgMTA1OnsvL+inhOWImVxuICAgICAgICAgICAgICAgIG5ldERhdGEuR2FtZVJ1bGUgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgfVxuICAgICB9LFxuICAgICBcbiAgICAvL0FFU+WKoOWvhlxuICAgIEFFU0VuY3J5cHRpb24gOiBmdW5jdGlvbiAoZGF0YSwgYWVzS2V5KSB7XG4gICAgICAgIC8vcmV0dXJuIENyeXB0b0pTLkNyeXB0b0pTLkFFUy5lbmNyeXB0KGRhdGEsIGFlc0tleSkudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKGFlc0tleSk7XG4gICAgICAgIHZhciBpdiAgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZShhZXNLZXkpO1xuICAgICAgICB2YXIgc3JjcyA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKGRhdGEpO1xuICAgICAgICB2YXIgZW5jcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoc3Jjcywga2V5LCB7IGl2OiBpdixtb2RlOkNyeXB0b0pTLm1vZGUuRUNCfSk7XG4gICAgICAgIC8vdmFyIGVuY29kZVN0ciA9IGVuY29kZVVSSUNvbXBvbmVudChlbmNyeXB0ZWQudG9TdHJpbmcoKSk7XG4gICAgICAgIC8vdmFyIG1kNVN0ciA9IENyeXB0b0pTLk1ENShlbmNvZGVTdHIpO1xuICAgICAgICByZXR1cm4gZW5jcnlwdGVkLnRvU3RyaW5nKCk7XG4gICAgfSxcbiAgICBcbiAgICAvL0FFU+ino+WvhlxuICAgIEFFU0RlY3J5cHQgOiBmdW5jdGlvbiAoZGF0YSwgYWVzS2V5KSB7XG4gICAgICAgIC8vcmV0dXJuIENyeXB0b0pTLkNyeXB0b0pTLkFFUy5kZWNyeXB0KGRhdGEsIGFlc0tleSkudG9TdHJpbmcoQ3J5cHRvSlMuQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuICAgICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UoYWVzS2V5KTtcbiAgICAgICAgdmFyIGl2ICA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKGFlc0tleSk7XG4gICAgICAgIHZhciBkZWNyeXB0ID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoZGF0YSwga2V5LCB7IGl2OiBpdixtb2RlOkNyeXB0b0pTLm1vZGUuRUNCfSk7XG4gICAgICAgIHJldHVybiBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkoZGVjcnlwdCkudG9TdHJpbmcoKTtcbiAgICB9LFxuIFxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqIEBwYXJhbVxuICAgICAqIFxuICAgICAqL1xuICAgIGdldEluaXQgOiBmdW5jdGlvbihjYWxsRnVuYywgc2VsZil7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEgPSBcInt9XCI7XG4gICAgICAgIC8v6K6+572u5ZG95Luk5Y+377yM5q+P5Liq6K+35rGC6YO95LiN5LiA5qC3XG4gICAgICAgIHRoaXMuaGVhZGVyQ21kID0gMTAwO1xuICAgICAgICAvL+ivt+axgue9kee7nFxuICAgICAgICB0aGlzLnJlcXVlc3QoY2FsbEZ1bmMsIHNlbGYpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICog5oqV5rOoXG4gICAgICogQHBhcmFtIGdhbWVUeXBlIOa4uOaIj+exu+WeiygwOuaZrumAmua4uOaIjyAxOuWFjei0uea4uOaIjykgaW50XG4gICAgICogQHBhcmFtIHRpY2tldE5vIOiuouWNlSjnpagp5Y+344CCXG4gICAgICogQHBhcmFtIHN0ZXAg5b2T5YmN5YWN6LS55ri45oiP55qE5qyh5pWw44CCaW50XG4gICAgICogQHBhcmFtIG11bHJpcGxlIOaKleazqOWAjeaVsOOAglxuICAgICAqIEBwYXJhbSBsaW5lTnVtIOaKleazqOe6v+aVsOOAglxuICAgICAqIEBwYXJhbSBwbGF5VGltZSDmuLjmiI/ml7bpl7TjgIJcbiAgICAgKi9cbiAgICBnZXRCZXQgOiBmdW5jdGlvbihnYW1lVHlwZSx0aWNrZXRObyxzdGVwLG11bHJpcGxlLGxpbmVOdW0scGxheVRpbWUsY2FsbEZ1bmMsIHNlbGYpe1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhID0gXCJcIjtcbiAgICAgICAgLy/mi7zmiJBqc29u5Liy77yM5q+P5Liq6K+35rGC6YO95LiN5LiA5qC3XG4gICAgICAgIHZhciBvYmogPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIG9iai5nYW1lVHlwZSA9IGdhbWVUeXBlO1xuICAgICAgICBvYmoudGlja2V0Tm8gPSB0aWNrZXRObztcbiAgICAgICAgb2JqLnN0ZXAgPSBzdGVwO1xuICAgICAgICBvYmoubXVscmlwbGUgPSBtdWxyaXBsZTtcbiAgICAgICAgb2JqLmxpbmVOdW0gPSBsaW5lTnVtO1xuICAgICAgICBvYmoucGxheVRpbWUgPSBwbGF5VGltZTtcblxuICAgICAgICB0aGlzLnJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkob2JqKTsgXG4gICAgICAgIG9iaiA9IG51bGw7XG4gICAgICAgIC8v6K6+572u5ZG95Luk5Y+377yM5q+P5Liq6K+35rGC6YO95LiN5LiA5qC3XG4gICAgICAgIHRoaXMuaGVhZGVyQ21kID0gMTAxO1xuICAgICAgICAvL+ivt+axgue9kee7nFxuICAgICAgICB0aGlzLnJlcXVlc3QoY2FsbEZ1bmMsIHNlbGYpO1xuICAgIH0sXG5cbiAgICAgXG4gICAgLyoqXG4gICAgICog57uT566XXG4gICAgICogQHBhcmFtIHRpY2tldF9ubyDorqLljZXlj7dcbiAgICAgKiBAcGFyYW0gcGxheVRpbWUg5ri45oiP5pe26Ze0XG4gICAgICovXG4gICAgZ2V0UmV3YXJkIDogZnVuY3Rpb24odGlja2V0X25vLCBwbGF5VGltZSxjYWxsRnVuYywgc2VsZil7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEgPSBcIlwiO1xuICAgICAgICAvL+aLvOaIkGpzb27kuLLvvIzmr4/kuKror7fmsYLpg73kuI3kuIDmoLdcbiAgICAgICAgdmFyIG9iaiA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgb2JqLnRpY2tldE5vID0gdGlja2V0X25vO1xuICAgICAgICBvYmoucGxheVRpbWUgPSBwbGF5VGltZTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KG9iaik7IFxuICAgICAgICBvYmogPSBudWxsO1xuICAgICAgICAvL+iuvue9ruWRveS7pOWPt++8jOavj+S4quivt+axgumDveS4jeS4gOagt1xuICAgICAgICB0aGlzLmhlYWRlckNtZCA9IDEwMjtcbiAgICAgICAgLy/or7fmsYLnvZHnu5xcbiAgICAgICAgdGhpcy5yZXF1ZXN0KGNhbGxGdW5jLCBzZWxmKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5ri45oiP5YiX6KGoXG4gICAgICovXG4gICAgZ2V0R2FtZUxpc3Q6ZnVuY3Rpb24gKGNhbGxGdW5jLCBzZWxmKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEgPSBcInt9XCI7XG4gICAgICAgICAvL+iuvue9ruWRveS7pOWPt++8jOavj+S4quivt+axgumDveS4jeS4gOagt1xuICAgICAgICB0aGlzLmhlYWRlckNtZCA9IDEwMztcbiAgICAgICAgLy/or7fmsYLnvZHnu5xcbiAgICAgICAgdGhpcy5yZXF1ZXN0KGNhbGxGdW5jLCBzZWxmKTtcbiAgICB9LFxuXG4gICAvKipcbiAgICAgKiDojrflj5blpZbmsaBcbiAgICAgKi9cbiAgICBnZXRQb29sOmZ1bmN0aW9uIChjYWxsRnVuYywgc2VsZikge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhID0gXCJ7fVwiO1xuICAgICAgICAgLy/orr7nva7lkb3ku6Tlj7fvvIzmr4/kuKror7fmsYLpg73kuI3kuIDmoLdcbiAgICAgICAgdGhpcy5oZWFkZXJDbWQgPSAxMDQ7XG4gICAgICAgIC8v6K+35rGC572R57ucXG4gICAgICAgIHRoaXMucmVxdWVzdChjYWxsRnVuYywgc2VsZik7XG4gICAgfSxcblxuICAgICAvKipcbiAgICAgKiDojrflj5bop4TliJlcbiAgICAgKi9cbiAgICBnZXRSdWxlOmZ1bmN0aW9uIChjYWxsRnVuYywgc2VsZikge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhID0gXCJ7fVwiO1xuICAgICAgICAgLy/orr7nva7lkb3ku6Tlj7fvvIzmr4/kuKror7fmsYLpg73kuI3kuIDmoLdcbiAgICAgICAgdGhpcy5oZWFkZXJDbWQgPSAxMDU7XG4gICAgICAgIC8v6K+35rGC572R57ucXG4gICAgICAgIHRoaXMucmVxdWVzdChjYWxsRnVuYywgc2VsZik7XG4gICAgfVxufSk7ICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBEYXRhT3BlciA6IERhdGFPcGVyXG59OyIsInZhciBOZXREYXRhID0gcmVxdWlyZShcIk5ldERhdGFcIik7XHJcblxyXG4vL+S4reWllue6v+WvueixoVxyXG52YXIgTGluZVJlc3VsdD1jYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOntcclxuICAgICAgICBhbW91bnQ6MCwvL+ivpeadoee6v+S4reWlluaAu+mHkeminS/lhY3otLnmuLjmiI/mrKHmlbBcclxuICAgICAgICBsb2NhdGlvbnM6ey8v5Lit5aWW57q/5Z2Q5qCH5L2N572uL+WFjei0uea4uOaIj+Wbvuagh+S9jee9riAgWzEsMiwzLDQsNV1cclxuICAgICAgICAgICAgZGVmYXVsdCA6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBudW06MCwvL+S4reWllui/nue6v+S4quaVsC/lhY3otLnlm77moIfnmoTkuKrmlbBcclxuICAgICAgICBwaWNDb2RlOjAsLy/ov57nur/lhYPntKDnsbvlnosv5YWN6LS55ri45oiP5Zu+5qCHIOS4vuS+i0YxICAgICAgXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/ot5Hpqaznga/lr7nosaFcclxudmFyIE1hcnF1ZWVJbmZvPWNjLkNsYXNzKHtcclxuICAgIHByb3BlcnRpZXM6e1xyXG4gICAgICAgIHVpZDpcIlwiLC8v55So5oi3SURcclxuICAgICAgICB0eXBlOlwiXCIsLy/kuK3lpZbnsbvlnotcclxuICAgICAgICBtc2c6XCJcIiwvL+i3kemprOeBr+S/oeaBr1xyXG4gICAgICAgIGRhdGU6XCJcIiwvL+iOt+WlluaXpeacnyhTKSAgICAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5oGi5aSN5pWw5o2u5a+56LGhXHJcbnZhciBSZWNvdmVyRGF0YT1jYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOntcclxuICAgICAgICByZWNvdmVyVHlwZTowLC8v5oGi5aSN55qE5ri45oiP57G75Z6LKDA65pmu6YCa5ri45oiPMSznibnmrormuLjmiI/vvIwy77ya5aWW5rGgIDM65YWN6LS55ri45oiPKVxyXG4gICAgICAgIGhhc0ZyZWVHYW1lOjAsLy8w77ya5rKh5pyJ77yMMSDmnIlcclxuICAgICAgICBmcmVlR2FtZUxlZnRUaW1lczowLC8v5YWN6LS55ri45oiP5Ymp5L2Z5qyh5pWwXHJcbiAgICAgICAgZnJlZUdhbWVUb3RhbFRpbWVzOjAsXHJcbiAgICAgICAgdGlja2V0Tm86XCJcIiwvL+iuouWNlSjnpagp5Y+3XHJcbiAgICAgICAgLy/npajmlbDmja4s5Y+M5bGC5a+56LGh5pWw57uEIFxyXG4gICAgICAgIC8vW1tcIldXXCIsXCJGNlwiLFwiTTVcIixcIkYxMFwiLFwiTTFcIixcIldXXCIsXCJGNlwiLFwiRjhcIixcIkY2XCIsXCJNMVwiLFwiV1dcIixcIkY4XCIsXCJGOFwiLFwiRjdcIixcIkY5XCIsXCJXV1wiLFwiTTNcIixcIk00XCIsXCJGNlwiLFwiRjZcIl1dXHJcbiAgICAgICAgLy/lpoLmnpzkuLrlpKfkuLDmlLbvvIzmlbDnu4TlpKflsI/kuLoy77yM5q2j5bi45Li6MVxyXG4gICAgICAgIHRpY2tldERhdGE6W10sXHJcbiAgICAgICAgZnJlZVJlc3VsdDp7Ly9cclxuICAgICAgICAgICAgZGVmYXVsdCA6IFtdLFxyXG4gICAgICAgICAgICB0eXBlIDogW0xpbmVSZXN1bHRdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RlcDowLC8v5YWN6LS55ri45oiP55qE5q2l5pWwXHJcbiAgICAgICAgb3JkZXJSZXN1bHQgOltdLC8v5oqV5rOo57uT5p6cXHJcbiAgICAgICAgc3BlY2lhbFJlc3VsdExvY2F0aW9uOltdLC8v5aSn5Liw5pS2IOeJueauiuWbvuahiOS9jee9rlxyXG4gICAgICAgIG11bHJpcGxlOlwiXCIsLy/mipXms6jlgI3mlbBcclxuICAgICAgICBsaW5lTnVtOlwiXCIsLy/mipXms6jnur/mlbBcclxuICAgICAgICBib251c0Ftb3VudDowLC8v5Lit5aWW6YeR6aKdKFwi6LWi5b6XXCIpXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbnZhciBKYWNrUG90SW5mbz0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllcyA6IHtcclxuICAgICAgICBiZXQgOiAwLCAgLy/lgI3mlbBcclxuICAgICAgICBwb29sTWluIDogMCwgLy/mnIDlpKflgLxcclxuICAgICAgICBwb29sTWF4OjAsXHJcbiAgICAgICAgbWluQm91bnM6MCxcclxuICAgICAgICBmbG9hdFJhdGU6MCxcclxuICAgICAgICBtYXhCb3VuczowLFxyXG4gICAgICAgIHByb2JhYmlsaXR5OjAsXHJcbiAgICAgICAgdGlnZXJQcm9iYWJpbGl0eTowLFxyXG5cclxuICAgIH1cclxufSk7XHJcblxyXG4vLyAg5ri45oiP5YiX6KGo5a+56LGhXHJcbnZhciBHYW1lTGlzdERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczp7XHJcbiAgICAgICAgdGltZTpcIlwiLFxyXG4gICAgICAgIHBheUFtb3VudDowLC8v5oqV5rOo5oC76YeR6aKdXHJcbiAgICAgICAgbm86XCJcIiwvL+iuouWNleWPt1xyXG4gICAgICAgIGJvbnVzQW1vdW50OjAsLy/mgLvlpZbph5FcclxuICAgICAgICBzdGF0dXM6MCwvL+eKtuaAge+8jDDvvJrmuLjmiI/kuK3vvIjnrYnlvoXlvIDlpZbvvInvvIwx77ya5Lit5aWW77yMMu+8muacquS4reWlliAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5Yid5aeL5YyW5a+56LGhXHJcbnZhciBJbml0RGF0YT1jYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhdHVzOjAsLy8w77ya5ZCv5YqoLDE65oGi5aSNICAgICAgICAgICBcclxuICAgICAgICBnYW1lTmFtZTpcIlwiLC8v5ri45oiP5ZCN56ewXHJcbiAgICAgICAgZ2FtZUljb246XCJcIiwvL+a4uOaIj+Wbvuagh3VybFxyXG4gICAgICAgIGN1cnJlbmN5OlwiXCIsLy/luIHnp41cclxuICAgICAgICBjdXJyZW5jeUljb246XCJcIiwvL+W4geenjeWbvueJh+mTvuaOpXVybFxyXG4gICAgICAgIG11bHJpcGxlczpbXSwvL+WAjeaVsOWIl+ihqCxpbnTmlbDnu4RcclxuICAgICAgICBsaW5lTnVtczpbXSwvL+e6v+aVsOWIl+ihqFxyXG4gICAgICAgIGJhbGFuY2U6XCJcIiwvL+S9meminVxyXG4gICAgICAgIHBsYXlUaW1lOlwiXCIsLy/muLjmiI/ml7bpl7Qs55So5LqO5Yik5pat5LiN5ZCM5omL5py655m75b2VXHJcbiAgICAgICAgZGVmYXVsdE11bHJpcGxlOjAsLy/pu5jorqTlgI3mlbAs6K6w5b2V55So5oi35LiK5qyh6KGM5Li6XHJcbiAgICAgICAgZGVmYXVsdExpbmVOdW06MCwvL+m7mOiupOe6v+aVsFxyXG4gICAgICAgIGhlbHBSdWxlOlwiXCIsLy/luK7liqnop4TliJnpk77mjqVcclxuICAgICAgICBwb29sVmlzaWFibGU6MSwvL+WlluaxoOaYr+WQpuaYvuekuiAw5LiN5pi+56S6IDHmmL7npLpcclxuICAgICAgICBtYXJxdWVlSW5mb3M6ey8v6LeR6ams54Gv5L+h5oGvXHJcbiAgICAgICAgICAgIGRlZmF1bHQgOiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjb3ZlckRhdGEgOiB7Ly/mgaLlpI3mlbDmja5cclxuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBwYXJzZUluaXREYXRhOmZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gZGF0YT1cInsgXFxcInN0YXR1c1xcXCI6IDAsIFxcXCJnYW1lTmFtZVxcXCI6IFxcXCLogIHomY7mnLpcXFwiLCBcXFwiZ2FtZUljb25cXFwiOiBcXFwiXFxcIiwgXFxcImN1cnJlbmN5XFxcIjogXFxcIlxcXCIsIFxcXCJjdXJyZW5jeUljb25cXFwiOiBcXFwiXFxcIiwgXFxcIm11bHJpcGxlc1xcXCI6IFsgMSwgMiwgMywgNCwgNSBdLCBcXFwibGluZU51bXNcXFwiOiBbIDEwLCAyMCwgMzAsIDQwLCA1MCBdLCBcXFwiYmFsYW5jZVxcXCI6IDEwMDAsIFxcXCJwbGF5VGltZVxcXCI6IDAsIFxcXCJkZWZhdWx0TXVscmlwbGVcXFwiOiAwLCBcXFwiZGVmYXVsdExpbmVcXFwiOiAwLCBcXFwiaGVscFJ1bGVcXFwiOiBcXFwiXFxcIiwgXFxcInBvb2xWaXNpYWJsZVxcXCI6IDEsIFxcXCJtYXJxdWVlSW5mb3NcXFwiOiBbIHsgXFxcInVpZFxcXCI6IFxcXCJcXFwiLCBcXFwidHlwZVxcXCI6IFxcXCJcXFwiLCBcXFwibXNnXFxcIjogXFxcIuaBreWWnOS9oOS4reWlluWVplxcXCIsIFxcXCJkYXRlXFxcIjogXFxcIlxcXCIgfSwgeyBcXFwidWlkXFxcIjogXFxcIlxcXCIsIFxcXCJ0eXBlXFxcIjogXFxcIlxcXCIsIFxcXCJtc2dcXFwiOiBcXFwi5ZOI5ZOI5ZOI77yM5L2g5rKh5Lit5aWWXFxcIiwgXFxcImRhdGVcXFwiOiBcXFwiXFxcIiB9IF0sIFxcXCJyZWNvdmVyRGF0YVxcXCI6IHsgXFxcImdhbWVUeXBlXFxcIjogMCwgXFxcImhhc0ZyZWVHYW1lXFxcIjogMCwgXFxcImZyZWVHYW1lTGVmdFRpbWVzXFxcIjogMTAsIFxcXCJ0aWNrZXROb1xcXCI6IDEyMzIxNTY1MTgsIFxcXCJ0aWNrZXREYXRhXFxcIjogWyBbIFxcXCJXV1xcXCIsIFxcXCJGNlxcXCIsIFxcXCJNMlxcXCIsIFxcXCJGN1xcXCIsIFxcXCJNMVxcXCIsIFxcXCJXV1xcXCIsIFxcXCJGNlxcXCIsIFxcXCJGOFxcXCIsIFxcXCJGNlxcXCIsIFxcXCJNMVxcXCIsIFxcXCJXV1xcXCIsIFxcXCJGOFxcXCIsIFxcXCJGOFxcXCIsIFxcXCJGN1xcXCIsIFxcXCJGNFxcXCIsIFxcXCJXV1xcXCIsIFxcXCJNM1xcXCIsIFxcXCJNMVxcXCIsIFxcXCJGNlxcXCIsIFxcXCJGNlxcXCIgXSwgWyBcXFwiV1dcXFwiLCBcXFwiRjZcXFwiLCBcXFwiTTNcXFwiLCBcXFwiRjEwXFxcIiwgXFxcIk0xXFxcIiwgXFxcIldXXFxcIiwgXFxcIkY2XFxcIiwgXFxcIkY1XFxcIiwgXFxcIkY3XFxcIiwgXFxcIk0yXFxcIiwgXFxcIldXXFxcIiwgXFxcIkY4XFxcIiwgXFxcIkY4XFxcIiwgXFxcIkY3XFxcIiwgXFxcIkY0XFxcIiwgXFxcIldXXFxcIiwgXFxcIk0xXFxcIiwgXFxcIk00XFxcIiwgXFxcIkY3XFxcIiwgXFxcIkY2XFxcIiBdIF0sIFxcXCJvcmRlclJlc3VsdFxcXCI6IFsgeyBcXFwiYW1vdW50XFxcIjogMTAwLCBcXFwibGluZVxcXCI6IFsgMCwgNiwgNywgOCwgMTQgXSwgXFxcIm51bVxcXCI6IDUsIFxcXCJwaWNDb2RlXFxcIjogXFxcIkY0XFxcIiB9LCB7IFxcXCJhbW91bnRcXFwiOiAyMDAsIFxcXCJsaW5lXFxcIjogWyA1LCAxLCAyLCAzLCA5IF0sIFxcXCJudW1cXFwiOiA1LCBcXFwicGljQ29kZVxcXCI6IFxcXCJGNVxcXCIgfSBdIH0sIFxcXCJtdWxyaXBsZVxcXCI6IDEsIFxcXCJsaW5lTnVtXFxcIjogNTAsIFxcXCJib251c0Ftb3VudFxcXCI6IDAgfVwiO1xyXG4gICAgICAgIGNjLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgb2JqUm9vdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgLy8gdmFyIGluaXRSZXN1bHQ9bmV3IEluaXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXM9b2JqUm9vdC5zdGF0dXM7XHJcbiAgICAgICAgdGhpcy5nYW1lTmFtZT1vYmpSb290LmdhbWVOYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZUljb249b2JqUm9vdC5nYW1lSWNvbjtcclxuICAgICAgICB0aGlzLmN1cnJlbmN5PW9ialJvb3QuY3VycmVuY3k7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeUljb249b2JqUm9vdC5jdXJyZW5jeUljb247XHJcbiAgICAgICAgdGhpcy5tdWxyaXBsZXM9b2JqUm9vdC5tdWxyaXBsZXM7XHJcbiAgICAgICAgdGhpcy5saW5lTnVtcz1vYmpSb290LmxpbmVOdW1zO1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZT1vYmpSb290LmJhbGFuY2U7XHJcbiAgICAgICAgdGhpcy5wbGF5VGltZT1vYmpSb290LnBsYXlUaW1lO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdE11bHJpcGxlPW9ialJvb3QuZGVmYXVsdE11bHJpcGxlOyAgXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TGluZU51bT1vYmpSb290LmRlZmF1bHRMaW5lTnVtO1xyXG4gICAgICAgIHRoaXMuaGVscFJ1bGU9b2JqUm9vdC5oZWxwUnVsZTtcclxuICAgICAgICAvLyB0aGlzLnNraW4gPSBvYmpSb290LnNraW47XHJcbiAgICAgICAgLy8gdGhpcy5leHRlbmQgPSBvYmpSb290LmV4dGVuZDsg5Y675o6JIOaNouiCpOWFqOmDqOmFjee9rumDveWGmeWcqOWJjeerr+S6hlxyXG4gICAgICAgIHRoaXMuaGlzdG9yeVBvb2wgPSBvYmpSb290Lmhpc3RvcnlQb29sO1xyXG4gICAgICAgIHRoaXMucG9vbFZpc2lhYmxlPW9ialJvb3QucG9vbFZpc2lhYmxlO1xyXG4gICAgICAgIHRoaXMucGFyc2VNYXJxdWVlSW5mbyhvYmpSb290Lm1hcnF1ZWVJbmZvTGlzdCk7XHJcbiAgICAgICAgdGhpcy5wYXJzZVJlY292ZXJEYXRhKG9ialJvb3QucmVjb3ZlckRhdGEpO1xyXG4gICAgICAgIHRoaXMudGlwID0gb2JqUm9vdC50aXA7XHJcbiAgICAgICAgdmFyIG5ldERhdGEgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpO1xyXG4gICAgICAgIG5ldERhdGEuSW5pdFJlc3VsdD10aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwb29sUmVzdWx0PW5ldyBQb29sVXBkYXRlKCk7IFxyXG4gICAgICAgIHBvb2xSZXN1bHQucG9vbEJvdW5zID0gb2JqUm9vdC5wb29sQm91bnM7XHJcbiAgICAgICAgcG9vbFJlc3VsdC5wb29sVmlzaWFibGUgPSBvYmpSb290LnBvb2xWaXNpYWJsZTtcclxuICAgICAgICBuZXREYXRhLlBvb2xSZXN1bHQ9cG9vbFJlc3VsdDtcclxuICAgICAgICBcclxuICAgICAgICAgLy8yMDE3LTMtMiDmlrDliqDop4TliJlcclxuICAgICAgICBuZXREYXRhLnBvb2xSdWxlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIG5ldERhdGEucG9vbFJ1bGVzID0gb2JqUm9vdC5wb29sUnVsZTtcclxuICAgIH0sXHJcblxyXG4gICAgcGFyc2VNYXJxdWVlSW5mbzpmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwgfHwgZGF0YSA9PSB1bmRlZmluZWQgIHx8IGRhdGEgPT0gXCJcIikgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLmxlbmd0aDsrK2kpe1xyXG4gICAgICAgICAgICB2YXIgbWFycXVlZUluZm89bmV3IE1hcnF1ZWVJbmZvKCk7XHJcbiAgICAgICAgICAgIG1hcnF1ZWVJbmZvLnVpZD1kYXRhW2ldLnVpZDtcclxuICAgICAgICAgICAgbWFycXVlZUluZm8udHlwZT1kYXRhW2ldLnR5cGU7XHJcbiAgICAgICAgICAgIG1hcnF1ZWVJbmZvLm1zZz1kYXRhW2ldLm1zZztcclxuICAgICAgICAgICAgbWFycXVlZUluZm8uZGF0ZT1kYXRhW2ldLmRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMubWFycXVlZUluZm9zLnB1c2gobWFycXVlZUluZm8pO1xyXG4gICAgICAgICAgICBjYy5sb2coXCJtYXJxdWVlSW5mb3NcIitkYXRhW2ldLm1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwYXJzZVJlY292ZXJEYXRhOmZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhID09IHVuZGVmaW5lZCAgfHwgZGF0YSA9PSBcIlwiKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVjb3ZlckRhdGE9bmV3IFJlY292ZXJEYXRhKCk7XHJcbiAgICAgICAgdmFyIHJlY292ZXJEYXRhT2JqID0gZGF0YTtcclxuICAgICAgICByZWNvdmVyRGF0YS5yZWNvdmVyVHlwZT1yZWNvdmVyRGF0YU9iai5yZWNvdmVyVHlwZTtcclxuICAgICAgICByZWNvdmVyRGF0YS5oYXNGcmVlR2FtZT1yZWNvdmVyRGF0YU9iai5oYXNGcmVlR2FtZTtcclxuICAgICAgICByZWNvdmVyRGF0YS5mcmVlR2FtZUxlZnRUaW1lcz1yZWNvdmVyRGF0YU9iai5mcmVlR2FtZUxlZnRUaW1lcztcclxuICAgICAgICByZWNvdmVyRGF0YS50aWNrZXRObz1yZWNvdmVyRGF0YU9iai50aWNrZXRObztcclxuICAgICAgICByZWNvdmVyRGF0YS50aWNrZXREYXRhPXJlY292ZXJEYXRhT2JqLnRpY2tldERhdGE7XHJcbiAgICAgICAgcmVjb3ZlckRhdGEuc3RlcCA9IHJlY292ZXJEYXRhT2JqLnN0ZXA7XHJcbiAgICAgICAgcmVjb3ZlckRhdGEuc3BlY2lhbFJlc3VsdExvY2F0aW9uID0gcmVjb3ZlckRhdGFPYmouc3BlY2lhbFJlc3VsdExvY2F0aW9uO1xyXG4gICAgICAgIHJlY292ZXJEYXRhLm9yZGVyUmVzdWx0PXJlY292ZXJEYXRhT2JqLm9yZGVyUmVzdWx0O1xyXG4gICAgICAgIC8vIHJlY292ZXJEYXRhLm9yZGVyUmVzdWx0PXRoaXMucGFyc2VPcmRlclJlc3VsdChyZWNvdmVyRGF0YU9iai5vcmRlclJlc3VsdCk7XHJcbiAgICAgICAgcmVjb3ZlckRhdGEuZnJlZVJlc3VsdCA9IHJlY292ZXJEYXRhT2JqLmZyZWVSZXN1bHQ7XHJcbiAgICAgICAgcmVjb3ZlckRhdGEubXVscmlwbGU9cmVjb3ZlckRhdGFPYmoubXVscmlwbGU7XHJcbiAgICAgICAgcmVjb3ZlckRhdGEubGluZU51bT1yZWNvdmVyRGF0YU9iai5saW5lTnVtO1xyXG4gICAgICAgIHJlY292ZXJEYXRhLmJvbnVzQW1vdW50PXJlY292ZXJEYXRhT2JqLmJvbnVzQW1vdW50O1xyXG4gICAgICAgIHJlY292ZXJEYXRhLmZyZWVHYW1lVG90YWxUaW1lcyA9IHJlY292ZXJEYXRhT2JqLmZyZWVHYW1lVG90YWxUaW1lcztcclxuICAgICAgICB0aGlzLnJlY292ZXJEYXRhPXJlY292ZXJEYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBwYXJzZU9yZGVyUmVzdWx0OmZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIC8vICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IGRhdGEgPT0gdW5kZWZpbmVkICB8fCBkYXRhID09IFwiXCIpIHsgXHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHZhciBvcmRlclJlc3VsdExpc3Q9W107XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7aTxkYXRhLmxlbmd0aDsrK2kpe1xyXG4gICAgLy8gICAgICAgICB2YXIgbGluZVJlc3VsdD1uZXcgTGluZVJlc3VsdCgpO1xyXG4gICAgLy8gICAgICAgICBsaW5lUmVzdWx0LmFtb3VudD1kYXRhW2ldLmFtb3VudDtcclxuICAgIC8vICAgICAgICAgbGluZVJlc3VsdC5sb2NhdGlvbnM9ZGF0YVtpXS5sb2NhdGlvbnM7XHJcbiAgICAvLyAgICAgICAgIGxpbmVSZXN1bHQubnVtPWRhdGFbaV0ubnVtO1xyXG4gICAgLy8gICAgICAgICBsaW5lUmVzdWx0LnBpY0NvZGU9ZGF0YVtpXS5waWNDb2RlO1xyXG4gICAgLy8gICAgICAgICBvcmRlclJlc3VsdExpc3QucHVzaChsaW5lUmVzdWx0KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIG9yZGVyUmVzdWx0TGlzdDtcclxuICAgIC8vIH1cclxufSk7XHJcblxyXG4vL+aKleazqOWTjeW6lOWvueixoVxyXG52YXIgQmV0UmVzdWx0PWNjLkNsYXNzKHtcclxuICAgIHByb3BlcnRpZXM6e1xyXG4gICAgICAgIHJlc3VsdFR5cGU6MCwvLzA65pmu6YCaICwx5Liw5pS2XHJcbiAgICAgICAgZnJlZUdhbWVMZWZ0VGltZXM6MCwvL+WFjei0uea4uOaIj+WJqeS9measoeaVsFxyXG4gICAgICAgIGhhc0ZyZWVHYW1lOjAsLy8w77ya5rKh5pyJ77yMMeaciVxyXG4gICAgICAgIHRpY2tldE5vOlwiXCIsLy/orqLljZUo56WoKeWPt1xyXG4gICAgICAgIHBvb2xWaXNpYWJsZToxLC8v5aWW5rGg5piv5ZCm5pi+56S6ICAx5pi+56S6ICAw5LiN5pi+56S6ICDpu5jorqTmmK8xXHJcbiAgICAgICAgLy/npajmlbDmja4s5Y+M5bGC5a+56LGh5pWw57uEIFxyXG4gICAgICAgIC8vW1tcIldXXCIsXCJGNlwiLFwiTTVcIixcIkYxMFwiLFwiTTFcIixcIldXXCIsXCJGNlwiLFwiRjhcIixcIkY2XCIsXCJNMVwiLFwiV1dcIixcIkY4XCIsXCJGOFwiLFwiRjdcIixcIkY5XCIsXCJXV1wiLFwiTTNcIixcIk00XCIsXCJGNlwiLFwiRjZcIl1dXHJcbiAgICAgICAgLy/lpoLmnpzkuLrlpKfkuLDmlLbvvIzmlbDnu4TlpKflsI/kuLoy77yM5q2j5bi45Li6MVxyXG4gICAgICAgIHRpY2tldERhdGE6W10sXHJcbiAgICAgICAgc3BlY2lhbFJlc3VsdExvY2F0aW9uOltdLC8v5aSn5Liw5pS2IOeJueauiuWbvuahiOS9jee9rlxyXG4gICAgICAgIG9yZGVyUmVzdWx0OltdLC8v5oqV5rOo57uT5p6cXHJcbiAgICAgICAgZnJlZVJlc3VsdDp7Ly9cclxuICAgICAgICAgICAgZGVmYXVsdCA6IFtdLFxyXG4gICAgICAgICAgICB0eXBlIDogW0xpbmVSZXN1bHRdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG90YWxCb3VuczowLC8v5b2T5YmN5aWW6YeR57Sv6K6hXHJcbiAgICB9LFxyXG5cclxuICAgIHBhcnNlQmV0UmVzdWx0OmZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gZGF0YT1cInsgXFxcInJlc3VsdFR5cGVcXFwiOiAxLCBcXFwiZnJlZUdhbWVMZWZ0VGltZXNcXFwiOiAwLCBcXFwiaGFzRnJlZUdhbWVcXFwiOiAwLCBcXFwidGlja2V0Tm9cXFwiOiAxMjEzMTUxMSwgXFxcInBvb2xWaXNpYWJsZVxcXCI6IDEsIFxcXCJ0aWNrZXREYXRhXFxcIjogWyBbIFxcXCJXV1xcXCIsIFxcXCJGNlxcXCIsIFxcXCJNMlxcXCIsIFxcXCJGN1xcXCIsIFxcXCJNMVxcXCIsIFxcXCJXV1xcXCIsIFxcXCJGNlxcXCIsIFxcXCJGOFxcXCIsIFxcXCJGNlxcXCIsIFxcXCJNMVxcXCIsIFxcXCJXV1xcXCIsIFxcXCJGOFxcXCIsIFxcXCJGOFxcXCIsIFxcXCJGN1xcXCIsIFxcXCJGNFxcXCIsIFxcXCJXV1xcXCIsIFxcXCJNM1xcXCIsIFxcXCJNMVxcXCIsIFxcXCJGNlxcXCIsIFxcXCJGNlxcXCIgXSwgWyBcXFwiV1dcXFwiLCBcXFwiRjZcXFwiLCBcXFwiTTNcXFwiLCBcXFwiRjEwXFxcIiwgXFxcIk0xXFxcIiwgXFxcIldXXFxcIiwgXFxcIkY2XFxcIiwgXFxcIkY1XFxcIiwgXFxcIkY3XFxcIiwgXFxcIk0yXFxcIiwgXFxcIldXXFxcIiwgXFxcIkY4XFxcIiwgXFxcIkY4XFxcIiwgXFxcIkY3XFxcIiwgXFxcIkY0XFxcIiwgXFxcIldXXFxcIiwgXFxcIk0xXFxcIiwgXFxcIk00XFxcIiwgXFxcIkY3XFxcIiwgXFxcIkY2XFxcIiBdIF0sIFxcXCJvcmRlclJlc3VsdFxcXCI6IFsgeyBcXFwiYW1vdW50XFxcIjogMTAwLCBcXFwibGluZVxcXCI6IFsgMCwgNiwgNywgOCwgMTQgXSwgXFxcIm51bVxcXCI6IDUsIFxcXCJwaWNDb2RlXFxcIjogXFxcIkY0XFxcIiB9LCB7IFxcXCJhbW91bnRcXFwiOiAyMDAsIFxcXCJsaW5lXFxcIjogWyA1LCAxLCAyLCAzLCA5IF0sIFxcXCJudW1cXFwiOiA1LCBcXFwicGljQ29kZVxcXCI6IFxcXCJGNVxcXCIgfSBdLCBcXFwidG90YWxCb3Vuc1xcXCI6IDEwMDAwIH1cIjtcclxuICAgICAgICBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIG9ialJvb3QgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0VHlwZT1vYmpSb290LnJlc3VsdFR5cGU7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUxlZnRUaW1lcz1vYmpSb290LmZyZWVHYW1lTGVmdFRpbWVzO1xyXG4gICAgICAgIHRoaXMuaGFzRnJlZUdhbWU9b2JqUm9vdC5oYXNGcmVlR2FtZTtcclxuICAgICAgICB0aGlzLnRpY2tldE5vPW9ialJvb3QudGlja2V0Tm87XHJcbiAgICAgICAgdGhpcy5wb29sVmlzaWFibGU9b2JqUm9vdC5wb29sVmlzaWFibGU7XHJcbiAgICAgICAgdGhpcy50aWNrZXREYXRhPW9ialJvb3QudGlja2V0RGF0YTtcclxuICAgICAgICAvLyB0aGlzLm9yZGVyUmVzdWx0PXRoaXMucGFyc2VPcmRlclJlc3VsdChvYmpSb290Lm9yZGVyUmVzdWx0KTtcclxuICAgICAgICAvLyB0aGlzLmZyZWVSZXN1bHQ9dGhpcy5wYXJzZU9yZGVyUmVzdWx0KG9ialJvb3QuZnJlZVJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5zcGVjaWFsUmVzdWx0TG9jYXRpb24gPSBvYmpSb290LnNwZWNpYWxSZXN1bHRMb2NhdGlvbjtcclxuICAgICAgICB0aGlzLm9yZGVyUmVzdWx0PW9ialJvb3Qub3JkZXJSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5mcmVlUmVzdWx0PW9ialJvb3QuZnJlZVJlc3VsdDtcclxuICAgICAgICB0aGlzLnRvdGFsQm91bnM9b2JqUm9vdC50b3RhbEJvdW5zO1xyXG5cclxuICAgICAgICB2YXIgbmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XHJcbiAgICAgICAgbmV0RGF0YS5CZXRSZXN1bHQ9dGhpczsgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gcGFyc2VPcmRlclJlc3VsdDpmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAvLyAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhID09IHVuZGVmaW5lZCAgfHwgZGF0YSA9PSBcIlwiKSB7IFxyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB2YXIgb3JkZXJSZXN1bHRMaXN0PVtdO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0wO2k8ZGF0YS5sZW5ndGg7KytpKXtcclxuICAgIC8vICAgICAgICAgdmFyIGxpbmVSZXN1bHQ9bmV3IExpbmVSZXN1bHQoKTtcclxuICAgIC8vICAgICAgICAgbGluZVJlc3VsdC5hbW91bnQ9ZGF0YVtpXS5hbW91bnQ7XHJcbiAgICAvLyAgICAgICAgIGxpbmVSZXN1bHQubGluZT1kYXRhW2ldLmxpbmU7XHJcbiAgICAvLyAgICAgICAgIGxpbmVSZXN1bHQubnVtPWRhdGFbaV0ubnVtO1xyXG4gICAgLy8gICAgICAgICBsaW5lUmVzdWx0LnBpY0NvZGU9ZGF0YVtpXS5waWNDb2RlO1xyXG4gICAgLy8gICAgICAgICBvcmRlclJlc3VsdExpc3QucHVzaChsaW5lUmVzdWx0KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIG9yZGVyUmVzdWx0TGlzdDtcclxuICAgIC8vIH1cclxufSk7XHJcbi8v57uT566X5ZON5bqU5a+56LGhXHJcbnZhciBTZXR0bGVEYXRhPWNjLkNsYXNzKHtcclxuICAgIHByb3BlcnRpZXM6e1xyXG4gICAgICAgIGJvbnVzU3RhdHVzOlwiXCIsLy/kuK3lpZbnirbmgIFcclxuICAgICAgICBib251c0Rlc2M6XCJcIiwvL+S4reWlluaPj+i/sFxyXG4gICAgICAgIGJvbnVzQW1vdW50OlwiXCIsLy/kuK3lpZbpop3luqZcclxuICAgICAgICBwb29sVmlzaWFibGU6MSwvL+WlluaxoOaYr+WQpuaYvuekuiAgMOS4jeaYvuekuiAgMeaYvuekuiAgXHJcbiAgICAgICAgYm9udXNEYXRhOlwiXCIsLy/lvIDlpZbkv6Hmga9cclxuICAgIH0sXHJcbiAgICBwYXJzZVNldHRsZURhdGE6ZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIC8vIGRhdGE9XCJ7IFxcXCJib251c1N0YXR1c1xcXCI6IDEsIFxcXCJib251c0Rlc2NcXFwiOiBcXFwieW91IHdpblxcXCIsIFxcXCJib251c0Ftb3VudFxcXCI6IDExMDAwLCBcXFwicG9vbFZpc2lhYmxlXFxcIjogMSwgXFxcImJvbnVzRGF0YVxcXCI6IFxcXCJcXFwiIH1cIjtcclxuICAgICAgICBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIG9ialJvb3QgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuYm9udXNTdGF0dXM9b2JqUm9vdC5ib251c1N0YXR1cztcclxuICAgICAgICB0aGlzLmJvbnVzRGVzYz1vYmpSb290LmJvbnVzRGVzYztcclxuICAgICAgICB0aGlzLmJvbnVzQW1vdW50PW9ialJvb3QuYm9udXNBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5wb29sVmlzaWFibGU9b2JqUm9vdC5wb29sVmlzaWFibGU7XHJcbiAgICAgICAgdGhpcy5ib251c0RhdGE9b2JqUm9vdC5ib251c0RhdGE7XHJcblxyXG4gICAgICAgIHZhciBuZXREYXRhID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKTtcclxuICAgICAgICBuZXREYXRhLlJld2FyZFJlc3VsdD10aGlzOyAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcbiB2YXIgR2FtZUxpc3Q9Y2MuQ2xhc3Moe1xyXG4gICAgIHByb3BlcnRpZXM6e1xyXG4gICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgZGVmYXVsdCA6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOltHYW1lTGlzdERhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICAgXHJcbiAgICAgfSxcclxuICAgICBcclxuICAgICBwYXJzZUdhbWVMaXN0RGF0YTpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgY2MubG9nKGRhdGEpO1xyXG4gICAgICAgICB2YXIgb2JqUm9vdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgIHZhciBuZXREYXRhID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKTtcclxuICAgICAgICAgbmV0RGF0YS5HYW1lTGlzdFJlc3VsdD1vYmpSb290LmRhdGE7XHJcbiAgICAgfSxcclxuICAgICBcclxuICAgICBcclxuICAgICBcclxuIH0pO1xyXG5cclxuIHZhciBHYW1lUnVsZT1jYy5DbGFzcyh7XHJcbiAgICAgcHJvcGVydGllczp7XHJcbiAgICAgfSxcclxuICAgICBcclxuICAgIHBhcnNlR2FtZVJ1bGU6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY2MubG9nKGRhdGEpO1xyXG4gICAgICAgIHZhciBvYmpSb290ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB2YXIgbmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XHJcbiAgICAgICAgbmV0RGF0YS5HYW1lUnVsZT1vYmpSb290O1xyXG4gICAgfSxcclxuXHJcbiB9KTtcclxuXHJcbiB2YXIgUG9vbFVwZGF0ZT1jYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOntcclxuICAgICAgICAgICAgcG9vbEJvdW5zOjAsXHJcbiAgICAgICAgICAgIHBvb2xWaXNpYWJsZToxLCAgICAgXHJcbiAgICAgICAgfSxcclxuICAgIHBhcnNlUG9vbERhdGE6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgdmFyIG9ialJvb3QgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XHJcbiAgICAgICAgICAgIG5ldERhdGEuUG9vbFJlc3VsdD1vYmpSb290O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIFxyXG4gfSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBCZXREYXRhIDogQmV0UmVzdWx0LFxyXG4gICAgSW5pdERhdGEgOiBJbml0RGF0YSxcclxuICAgIFJld2FyZERhdGE6U2V0dGxlRGF0YSxcclxuICAgIEdhbWVMaXN0OkdhbWVMaXN0LFxyXG4gICAgR2FtZVJ1bGU6R2FtZVJ1bGUsXHJcbiAgICBQb29sVXBkYXRlOlBvb2xVcGRhdGUsXHJcbiAgICBKYWNrUG90SW5mbzpKYWNrUG90SW5mbyxcclxufTtcclxuXHJcblxyXG4iLCJ2YXIgVW5pdCA9IHJlcXVpcmUoXCJ1bml0XCIpO1xudmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbnZhciBHYW1lRGF0YSA9IHJlcXVpcmUoXCJHYW1lRGF0YVwiKTtcbnZhciBEYXRhT3BlciA9IHJlcXVpcmUoXCJEYXRhT3BlclwiKTtcbnZhciBTZWxlY3RMaW5lID0gcmVxdWlyZShcIlNlbGVjdExpbmVcIik7XG52YXIgY3ViZVMgPSByZXF1aXJlKFwiY3ViZVwiKTtcbnZhciBQcmljZUdyb3VwID0gcmVxdWlyZShcIlByaWNlR3JvdXBcIik7XG52YXIgIEppYW5nQ2hpU2NyaXB0ID0gcmVxdWlyZShcIkppYW5nQ2hpXCIpO1xuXG52YXIgSW5pdCA9IHJlcXVpcmUoXCJJbml0XCIpO1xudmFyIGluaXQgPSBuZXcgSW5pdCgpO1xuaW5pdC5pbml0KCk7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBBcnJheTpbXSxcbiAgICAgICAgdW5pdDE6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHVuaXQyOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICB1bml0Mzp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5pdDQ6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHVuaXQ1OntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBsaW5lR3JhcGhpYzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkdyYXBoaWNzXG4gICAgICAgIH0sXG5cbiAgICAgICAgbW9yZURldkRpYToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbW9yZURldkxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbW9yZURldkJ1dDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICB3YWl0TGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGlnaHRMaXN0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXVxuICAgICAgICB9LFxuXG4gICAgICAgIHJld2FyZEN1YmVMaXN0OntcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmxhY2tMYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBibGFja0xheWVyMjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICB3aGl0ZUxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvYXN0Tm9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICByZWNvdmVyVG9hc3ROb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGVmdExhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgYmV0SW5mbzp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgcG9vbE5vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2VudGVyTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHBvb2xSdWxlQnQ6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICAvL2F1dG8gY29uZmlybVxuICAgICAgICBhdXRvQ29uZmlybToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXV0b0NvbkxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgYXV0b09rOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBhdXRvQ2FuY2VsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBhdXRvTGFiZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsaWdodExheWVyOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGZyZWVNb2RlbExheWVyOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGdyZWF0TW9kZWxMYXllcjp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBmcmVlTW9kZWxMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdE5vdFRvdWNoOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXJyTGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGVyckxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgYnV0dG9uUmV0cnk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbkNhbmNlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICByaWdodE5vdFRvdWNoOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BlY2lhbFJld2FyZE5vZGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBzcGVjaWFsUmV3YXJkTGFiZWw6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmV3YXJkTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwaW5lQW5pTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHByaWNlR3JvdXBOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sICBcblxuICAgICAgICByZXdhcmRMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBmcmVlVGl0bGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGNvdmVyOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGhlbHBOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBtYXJxdWVlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVHcm91cDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXVxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RMaW5lTGlzdDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXVxuICAgICAgICB9LFxuICAgICAgICBsZWZ0QnQ6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdEdyYXk6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcmlnaHRCdDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICByaWdodEdyYXk6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbGluZUJ0OntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGF1dG9UaW1lczp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbGluZUdyYXk6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZnJlZUdhbWVUaW1lTGFiZWw6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHdlbmhhb0RpYToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgd2VuaGFvQnV0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzdG9wTGF5ZXI6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmFja0xheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICB3aGl0ZU5vVG91Y2hMYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmFja0xhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgYmFja0Vuc3VyZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmFja0NhbmNlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBzZWxlY3RMaW5lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIHBvb2xJY29uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIC8v6YeR5biB54mI55qEIHRvYXN0XG4gICAgICAgIHRvYXN0TGFiZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIHRvYXN0RXJyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgaW5kZXg6MCxcbiAgICAgICAgYXV0b0ZsYWc6IDAsIC8vMTroh6rliqjmipXms6ggXG4gICAgICAgIGF1dG9MaW1pdDogMTAsIC8v6Ieq5Yqo6KaBMTDmrKHpmZDliLYgXG4gICAgICAgIGF1dG9JbmRleDogMTAsIC8v6Ieq5Yqo5b2T5YmN5Y+3XG4gICAgICAgIG9yZGVyRmxhZzpmYWxzZSwvL+m7mOiupOWPr+eUqOivt+axgu+8jOW9k3RydWXml7Yg5LiN5Y+v6K+35rGCb3JkZXJcbiAgICAgICAgbWFya0dldEluaXRGbGFnOmZhbHNlLC8v5LiA56eS5YaF5LiN6IO96LCD56ys5LqM5qyh5Yid5aeL5YyW77yM5Li65LqG6Kej5Yaz5Yid5aeL5YyW6L+b5p2l5ZCO5ZCM5pe26LWwbG9naW4g5ZKMIHJlc3VtZeeahGxvZ2luXG4gICAgICAgIG1fbGluZTo1MCxcbiAgICAgICAgbV9wcmljZToxLFxuICAgICAgICBtX2lzUXVpY2tTdG9wQnQ6ZmFsc2UsXG4gICAgICAgIG1fZ2FtZU1vZGVsOjAsLy8wOuaZrumAmuaooeW8jyAgMTrmma7pgJrmqKHlvI8o5b+r6YCf5byA5aWWKSAyOuWFjei0ueaooeW8jyAzOuWkp+S4sOaUtiA05aWW5rGg5aSn5aWWXG4gICAgICAgIHN0YXRlX2dhbWVpbmc6ZmFsc2UsLy/mmK/lkKbmmK/muLjmiI/kuK1cbiAgICAgICAgZnJvbnRMaXN0OltdLFxuICAgICAgICBsaW5lTGlzdDpbXSxcbiAgICAgICAgZXJyRGlhbG9nVGFnOiAwLCAvL+S4jeWQjOeahOmUmeivr+WkhOeQhjsgMOato+W4uCAyOuaBouWkjSBcbiAgICAgICAgbGluZUluZGV4OiAwLCAvL+S4reWlluihjOaVsOe7hOW6j+WPt1xuICAgICAgICBtX2dyZWF0R2FtZUhhc0ZpbmlzaGVkT25lUGFydDpmYWxzZSwvL+Wkp+S4sOaUtuesrOS4gOi9ruaYr+WQpuWujOaIkFxuICAgICAgICBtX2ZyZWVMYXllclNob3dPbmNlOmZhbHNlLFxuICAgICAgICBtX29yZGVyUmVzdWx0Om51bGwsXG4gICAgICAgIG1fZnJlZVN0ZXA6MSwvL+WFjei0uea4uOaIj+eahOasoeaVsFxuICAgICAgICBkb3U6MCwvL+e0r+iuoeiOt+W+l+eahOixhlxuICAgICAgICByaWdodEJldDowLC8v5piv5ZCm54K55LqG6Ieq5Yqo5oqV5rOoXG4gICAgICAgIHNka1VpZDogbnVsbCxcbiAgICAgICAgbV93YWl0aW50Q2FsbEJhY2s6bnVsbCwvL+etieW+heahhuiuoeaXtuWZqFxuICAgICAgICBzZGtCYWxhbmNlOiAwLC8v5bqf5byDXG4gICAgICAgIG1hcmtJbml0Q250OjAsXG4gICAgICAgIHNob3dXYWl0OjAsLy9zaG93TGF5ZXLmrKHmlbBcbiAgICAgICAgaXNRdWlja2x5RW5kOmZhbHNlLC8v5b+r6YCf5byA5aWWXG4gICAgICAgIG1hcmtXYWl0SGlkZTpmYWxzZSxcbiAgICAgICAgcmVxdWVzdFJld2FyZFRpbWU6MCwvL+e7k+eul+ivt+axguasoeaVsFxuICAgICAgICBydWxlSGFzU2hvd09uY2U6ZmFsc2UsLy/op4TliJnlt7Lnu4/lsZXnpLrov4fkuoZcbiAgICAgICAgaXNRdWlja1Bhc3NGdW5jdGlvbjpmYWxzZSwvL+W/q+mAn+i3s+i/h+W8gOWlluWKqOeUu+aooeW8j1xuICAgICAgICBzY2FsZVZhbHVlOjEsXG4gICAgICAgIFxuICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIHNldFJld2FyZEN1YmVQb3M6ZnVuY3Rpb24oKXtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBqICogNSArIGkgO1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gaSAqIDIwMCAtIDQwMDtcbiAgICAgICAgICAgICAgICBsZXQgcG9zWSA9IDMzNy41IC0gaiAqIDIyNTtcbiAgICAgICAgICAgICAgICB2YXIgY3ViZSA9IHRoaXMucmV3YXJkQ3ViZUxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGN1YmUueCA9IHBvc1g7XG4gICAgICAgICAgICAgICAgY3ViZS55ID0gcG9zWTtcbiAgICAgICAgICAgICAgICB2YXIgbGlnaHQgPSB0aGlzLmxpZ2h0TGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgbGlnaHQueCA9IHBvc1g7XG4gICAgICAgICAgICAgICAgbGlnaHQueSA9IHBvc1k7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/orqHnrpfkuK3lpZbnur/nmoTlnZDmoIdcbiAgICAgICAgdGhpcy5saW5lTGlzdCA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAzOyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgNTsgaisrICl7XG4gICAgICAgICAgICAgICB2YXIgeCA9IGogKiAyMDAgLSA0MDA7XG4gICAgICAgICAgICAgICB2YXIgeSA9IGkgKiAyMjUgLSAzMzcuNTtcbiAgICAgICAgICAgICAgIHZhciBwb3MgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgICAgIHRoaXMubGluZUxpc3QucHVzaChwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJvbnRMaXN0ID0gdGhpcy5yZXdhcmRDdWJlTGlzdDtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjYy5kaXJlY3Rvci5zZXRDbGVhckNvbG9yKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5zZXRDbGVhckNvbG9yKCBjYy5Db2xvci5XSElURSApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5wQXJyYXkucHVzaCh0aGlzLnVuaXQxKTtcbiAgICAgICAgdGhpcy5wQXJyYXkucHVzaCh0aGlzLnVuaXQyKTtcbiAgICAgICAgdGhpcy5wQXJyYXkucHVzaCh0aGlzLnVuaXQzKTtcbiAgICAgICAgdGhpcy5wQXJyYXkucHVzaCh0aGlzLnVuaXQ0KTtcbiAgICAgICAgdGhpcy5wQXJyYXkucHVzaCh0aGlzLnVuaXQ1KTtcbiAgICAgICAgdGhpcy5zZXRSZXdhcmRDdWJlUG9zKCk7XG5cbiAgICAgICAgLy/mlrDpgILphY1cbiAgICAgICAgdmFyIHNlID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpO1xuICAgICAgICB2YXIgcGVyID0gc2Uud2lkdGggLyBzZS5oZWlnaHQ7XG4gICAgICAgIHZhciBkUGVyID0gMTA4MCAvIDE2NjA7XG4gICAgICAgIGlmKHBlciA8IGRQZXIpe1xuICAgICAgICAgICAgdmFyIHNWYWx1ZSA9IHBlciAvIGRQZXI7XG4gICAgICAgICAgICB2YXIgYmV0QXJlYSA9IGNjLmZpbmQoXCJDYW52YXMvYmV0QXJlYVwiKTtcbiAgICAgICAgICAgIHZhciBjZW50ZXJBcmVhID0gY2MuZmluZChcIkNhbnZhcy9iZ0FuZENlbnRlclwiKTtcbiAgICAgICAgICAgIHRoaXMucG9vbE5vZGUuc2NhbGUgPSBzVmFsdWU7XG4gICAgICAgICAgICBiZXRBcmVhLnNjYWxlID0gc1ZhbHVlO1xuICAgICAgICAgICAgY2VudGVyQXJlYS5zY2FsZSA9IHNWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IHNWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy90ZXN0XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgdmFyIGRhdGFBcnIgPSBbXCJXV1wiLFwiV1dcIixcIldXXCIsXCJXV1wiXTtcbiAgICAgICAgICAgIHZhciB1bml0UyA9ICB0aGlzLnBBcnJheVtpXS5nZXRDb21wb25lbnQoVW5pdCk7O1xuICAgICAgICAgICAgdW5pdFMuc2V0U3RvcERhdGFBcnJheShkYXRhQXJyLCBpKzEsZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLm1vcmVEZXZCdXQucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMubW9yZURldkJ1dC5zY2FsZSA9IDAuODtcbiAgICAgICAgfSwgdGhpcyk7ICAgICAgICBcbiAgICAgICAgdGhpcy5tb3JlRGV2QnV0LnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5tb3JlRGV2QnV0LnNjYWxlID0gMTtcbiAgICAgICAgICAgIHRoaXMud2hpdGVOb1RvdWNoTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBjYWxsID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLndoaXRlTm9Ub3VjaExheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm1vcmVEZXZEaWEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAwLCAwKSxjYWxsKSk7XG4gICAgICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAxKXsvL1xuICAgICAgICAgICAgICAgIHRoaXMuZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb3JlRGV2QnV0LnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5tb3JlRGV2QnV0LnNjYWxlID0gMTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/lpZbmsaDop4TliJlidFxuICAgICAgICB0aGlzLnBvb2xSdWxlQnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5wb29sUnVsZUJ0LnNjYWxlID0gMC44O1xuICAgICAgICB9LCB0aGlzKTsgICAgICAgIFxuICAgICAgICB0aGlzLnBvb2xSdWxlQnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMucG9vbFJ1bGVCdC5zY2FsZSA9IDE7XG4gICAgICAgICAgICAvLyBjYy5sb2coXCLljZXku7flr7nlupTlpZbmsaDmnIDpq5jlj6/ojrflvpfph5HluIHop4TliJnor7TmmI5cIik7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvcG9vbFJ1bGVcIik7XG4gICAgICAgICAgICBsZXQgczEgPSBub2RlLmdldENvbXBvbmVudChcIlBvb2xSdWxlXCIpO1xuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgczEuZG93bkhlbHAoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wb29sUnVsZUJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLnBvb2xSdWxlQnQuc2NhbGUgPSAxO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL2F1dG8gY29uZmlybVxuICAgICAgICB0aGlzLmF1dG9Pay5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5hdXRvT2suc2NhbGUgPSAwLjg7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hdXRvT2sucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmF1dG9Pay5zY2FsZSA9IDE7XG4gICAgICAgICAgICB0aGlzLmJsYWNrTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLndoaXRlTm9Ub3VjaExheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2FsbEZ1bmNfMiA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKClcbiAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICB0aGlzLndoaXRlTm9Ub3VjaExheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmF1dG9Db25maXJtLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMCwgMCksIGNhbGxGdW5jXzIpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXV0b09rLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5hdXRvT2suc2NhbGUgPSAxO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvLy9cbiAgICAgICAgdGhpcy5hdXRvQ2FuY2VsLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmF1dG9DYW5jZWwuc2NhbGUgPSAwLjg7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hdXRvQ2FuY2VsLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5ibGFja0xheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hdXRvQ29uZmlybS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIDAsIDApKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NhbmNlbC5zY2FsZSA9IDE7XG4gICAgICAgICAgICB0aGlzLm9yZGVyRmxhZyA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXV0b0NhbmNlbC5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NhbmNlbC5zY2FsZSA9IDE7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAvL2VuZCBhdXRvIFxuXG4gICAgICAgIC8vd2VuaGFvICAgICAgICBcbiAgICAgICAgdGhpcy53ZW5oYW9CdXQucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMud2VuaGFvQnV0LnNjYWxlID0gMC44O1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2VuaGFvQnV0LnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy53ZW5oYW9CdXQuc2NhbGUgPSAxO1xuICAgICAgICAgICAgLy90aGlzLndlbmhhb0J1dC5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjIsIDAsIDApKTtcbiAgICAgICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLndlbmhhb0J1dC5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMud2VuaGFvQnV0LnNjYWxlID0gMTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIC8vZW5kIHdlbmhhb1xuXG4gICAgICAgIC8v6ZSZ6K+v5qGGIHJldHJ5XG4gICAgICAgIHRoaXMuYnV0dG9uUmV0cnkucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uUmV0cnkuc2NhbGUgPSAwLjg7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25SZXRyeS5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uUmV0cnkuc2NhbGUgPSAxO1xuICAgICAgICAgICAgbGV0IHNjYWxlVG8xID0gY2Muc2NhbGVUbygwLjEsIDEuMiwgMS4yKTtcbiAgICAgICAgICAgIGxldCBzY2FsZVRvMiA9IGNjLnNjYWxlVG8oMC4yLCAwLCAwKS5lYXNpbmcoY2MuZWFzZUluKDEuMCkpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZU5vVG91Y2hMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNhbGwgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMud2hpdGVOb1RvdWNoTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZXJyTGF5ZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBzY2FsZVRvMixjYWxsKSk7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL+WIneWni+WMluS4jei/h++8jCDpgIDlh7rmiJZ0cnlcbiAgICAgICAgICAgIGlmKHRoaXMuY3VuQ21kID09IDEwMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY3VuQ21kID09IDEwMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJc0xvZ2luKCk7Ly9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jdW5DbWQgPT0gMTAyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY3VuQ21kID09IDEwMyl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPcmRlckxpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jdW5DbWQgPT0gMTA1KXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJ1bGUoKTtcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uUmV0cnkucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblJldHJ5LnNjYWxlID0gMTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/lj5bmtohcbiAgICAgICAgdGhpcy5idXR0b25DYW5jZWwucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2FuY2VsLnNjYWxlID0gMC44O1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9uQ2FuY2VsLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5idXR0b25DYW5jZWwuc2NhbGUgPSAxO1xuICAgICAgICAgICAgbGV0IHNjYWxlVG8xID0gY2Muc2NhbGVUbygwLjEsIDEuMiwgMS4yKTtcbiAgICAgICAgICAgIGxldCBzY2FsZVRvMiA9IGNjLnNjYWxlVG8oMC4yLCAwLCAwKS5lYXNpbmcoY2MuZWFzZUluKDEuMCkpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZU5vVG91Y2hMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGNhbGwgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMud2hpdGVOb1RvdWNoTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZXJyTGF5ZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBzY2FsZVRvMixjYWxsKSk7XG4gICAgICAgICAgICB0aGlzLmJsYWNrTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvL+mAgOWHuiAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmV4aXRHYW1lKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idXR0b25DYW5jZWwucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkNhbmNlbC5zY2FsZSA9IDE7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAvL+mUmeivr+ahhiBlbmRcblxuICAgICAgICAvL2JhY2sgZW5zdXJlXG4gICAgICAgIHRoaXMuYmFja0Vuc3VyZS5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5iYWNrRW5zdXJlLnNjYWxlID0gMC44O1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFja0Vuc3VyZS5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYmFja0Vuc3VyZS5zY2FsZSA9IDE7XG4gICAgICAgICAgICBsZXQgc2NhbGVUbzEgPSBjYy5zY2FsZVRvKDAuMSwgMS4yLCAxLjIpO1xuICAgICAgICAgICAgbGV0IHNjYWxlVG8yID0gY2Muc2NhbGVUbygwLjIsIDAsIDApLmVhc2luZyhjYy5lYXNlSW4oMS4wKSk7XG4gICAgICAgICAgICB0aGlzLndoaXRlTm9Ub3VjaExheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2FsbCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy53aGl0ZU5vVG91Y2hMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5iYWNrTGF5ZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBzY2FsZVRvMixjYWxsKSk7XG4gICAgICAgICAgICB0aGlzLmJsYWNrTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvL+mAgOWHuua4uOaIjyAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZXhpdEdhbWUoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhY2tFbnN1cmUucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmJhY2tFbnN1cmUuc2NhbGUgPSAxO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+WPlua2iFxuICAgICAgICB0aGlzLmJhY2tDYW5jZWwucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuYmFja0NhbmNlbC5zY2FsZSA9IDAuODtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhY2tDYW5jZWwucGFyZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmJhY2tDYW5jZWwuc2NhbGUgPSAxO1xuICAgICAgICAgICAgbGV0IHNjYWxlVG8xID0gY2Muc2NhbGVUbygwLjEsIDEuMiwgMS4yKTtcbiAgICAgICAgICAgIGxldCBzY2FsZVRvMiA9IGNjLnNjYWxlVG8oMC4yLCAwLCAwKS5lYXNpbmcoY2MuZWFzZUluKDEuMCkpO1xuICAgICAgICAgICAgdGhpcy5iYWNrTGF5ZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBzY2FsZVRvMikpO1xuICAgICAgICAgICAgdGhpcy5ibGFja0xheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYWNrQ2FuY2VsLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5iYWNrQ2FuY2VsLnNjYWxlID0gMTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIC8vYmFjayBlbmRcblxuICAgICAgICAvL3RoaXMuc2NhbGVWaWV3KCk7XG4gICAgICAgIGlmICghQ0NfSlNCICYmIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6LWw5reY5a6d5LqGXCIpOyAgXG4gICAgICAgICAgICB2YXIgaW5pdFJlc3VsdCA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdDtcbiAgICAgICAgICAgIGlmKGluaXRSZXN1bHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGluaXRSZXN1bHQuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAvL+WQr+WKqFxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cyA9PT0gMCl7Ly9kb05vdGluZ1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHN0YXR1cyA9PT0gMSl7Ly/mgaLlpI1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvdmVyR2FtZSgpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVua25vdyBzdGF0dXNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlgZzllK7kuoZcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5ibGFja0xheWVyMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcExheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNraW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BMYXllci5nZXRDaGlsZEJ5TmFtZShcIndvcmRzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuc3RvcFNlbGxpbmdEZXNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRUYW9iYW9TREsoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy/liJ3lp4vljJbmjqXlj6NcbiAgICAgICAgICAgIGlmICghQ0NfSlNCICYmIHdpbmRvdy5fX3NraW5Db25maWcpe1xuICAgICAgICAgICAgICAgIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuc2tpbiA9IHdpbmRvdy5fX3NraW5Db25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdldEluaXQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5pyJ6LWw5reY5a6dU0RLXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHsvL+a0u+WKqFxuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnRocm93VGltZXIoJ2luaXRpYWxpemUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihjYy5fcmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpe1xuICAgICAgICAgICB0aGlzLnZlcnNpb24uc3RyaW5nID0gXCIxLjQyIGNhbnZhc1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb24uc3RyaW5nID0gXCIxLjQyIHdlYmdsXCI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9cbiAgICByZWNoYXJnZVRvYXN0SnVkZ2U6ZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gLy/mj5DnpLrkvZnpop3kuI3otrPvvIzot7PovazliLDlhYXlgLwg546w5Zyo5o+Q56S65Ye96LC36YKj6L655aSE55CGIOW6n+W8g1xuICAgICAgICAvLyBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3kgID09IFwi6LGGXCIpe1xuICAgICAgICAvLyAgICAgLy9kb05vdGluZ1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMudG9hc3RFcnIuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgLy8gICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjAsIDEuMCk7XG4gICAgICAgIC8vICAgICBsZXQgc2NhbGVUbzIgPSBjYy5zY2FsZVRvKDAuMiwgMCwgMCk7XG4gICAgICAgIC8vICAgICBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3kgID09IFwi6YeR5biBXCIpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMudG9hc3RMYWJlbC5zdHJpbmcgPSBcIua3mOmHkeW4geS4jeWkn+S6hlwiO1xuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy50b2FzdExhYmVsLnN0cmluZyA9IG1zZztcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHRoaXMudG9hc3RFcnIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBjYy5kZWxheVRpbWUoMiksIHNjYWxlVG8yKSk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgc2V0U2tpbjpmdW5jdGlvbigpe1xuICAgICAgICAvL+iuvue9ruW8ueahhuWtl+S9k+minOiJsuWSjOi3kemprOeBr+S9jee9riBieSDmnI3liqHlmahkYXRhXG4gICAgICAgIGNjLmxvZyhcInNraW5zc3Nzc3Nzc1wiKTtcbiAgICAgICAgdmFyIHNraW4gPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLnNraW47XG4gICAgICAgIGlmKHNraW4peyAgXG4gICAgICAgICAgICB2YXIgZm9udENvbG9yQXJyYXkgPSBza2luLmZvbnRDb2xvcjtcbiAgICAgICAgICAgIC8v572R57uc5o+Q56S65by55qGGIOmFjee9ruminOiJsiDmoLnmja7kuI3lkIznmq7ogqRcbiAgICAgICAgICAgIGlmKGZvbnRDb2xvckFycmF5ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIC8v572R57uc5o+Q56S6XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJMYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKGZvbnRDb2xvckFycmF5WzBdLGZvbnRDb2xvckFycmF5WzFdLGZvbnRDb2xvckFycmF5WzJdKTtcbiAgICAgICAgICAgICAgICAvL+iHquWKqOWNgeasoeehruiupOW8ueahhlxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbkxhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoZm9udENvbG9yQXJyYXlbMF0sZm9udENvbG9yQXJyYXlbMV0sZm9udENvbG9yQXJyYXlbMl0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbmZpcm0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoZm9udENvbG9yQXJyYXlbMF0sZm9udENvbG9yQXJyYXlbMV0sZm9udENvbG9yQXJyYXlbMl0pO1xuICAgICAgICAgICAgICAgIC8v56Gu6K6k56a75byA5ri45oiPXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3b3Jkc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKGZvbnRDb2xvckFycmF5WzBdLGZvbnRDb2xvckFycmF5WzFdLGZvbnRDb2xvckFycmF5WzJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlR3JvdXBOb2RlLmdldENvbXBvbmVudChQcmljZUdyb3VwKS5zZXRMYWJlbENvbG9yKCk7IFxuICAgICAgICAgICAgICAgIC8v5aSa6K6+5aSH55m76ZmGXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlRGV2TGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcihmb250Q29sb3JBcnJheVswXSxmb250Q29sb3JBcnJheVsxXSxmb250Q29sb3JBcnJheVsyXSk7XG4gICAgICAgICAgICAgICAgLy/lgZzllK5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BMYXllci5nZXRDaGlsZEJ5TmFtZShcIndvcmRzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoZm9udENvbG9yQXJyYXlbMF0sZm9udENvbG9yQXJyYXlbMV0sZm9udENvbG9yQXJyYXlbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5Yik5pat5piv5ZCm5piv5pyJ5bCP6LS05aOrXG4gICAgICAgIHZhciBJbml0UmVzdWx0ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0O1xuICAgICAgICBpZihJbml0UmVzdWx0KXtcbiAgICAgICAgICAgIHZhciB0aXAgPSBJbml0UmVzdWx0LnRpcDtcbiAgICAgICAgICAgIGlmKHRpcCl7XG4gICAgICAgICAgICAgICAgLy/lpKflpZZ0aXBzXG4gICAgICAgICAgICAgICAgdmFyIHRpcFN0ciA9IEluaXRSZXN1bHQudGlwLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHNwZWNpYWxUaXBzID0gdGhpcy5zcGVjaWFsUmV3YXJkTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcHNcIik7XG4gICAgICAgICAgICAgICAgc3BlY2lhbFRpcHMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzcGVjaWFsVGlwcy5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRpcFN0cjtcbiAgICAgICAgICAgICAgICAvL+aZrumAmuWwhnRpcHNcbiAgICAgICAgICAgICAgICB2YXIgbm9ybWFsVGlwcyA9IHRoaXMucmV3YXJkTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcHNcIik7XG4gICAgICAgICAgICAgICAgbm9ybWFsVGlwcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5vcm1hbFRpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aXBTdHI7XG4gICAgICAgICAgICAgICAgLy/nu5HlrprlsI/otLTlo6vljrvnnIvnnIsg55qE6Kem5pG45LqL5Lu2IOWkp+WllmJ1dHRvblxuICAgICAgICAgICAgICAgIHZhciBzcGVjaWFsVGlwc0J0ID0gc3BlY2lhbFRpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgc3BlY2lhbFRpcHNCdC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NhbmNlbC5zY2FsZSA9IDAuODtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzcGVjaWFsVGlwc0J0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc0p1bXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvQ2FuY2VsLnNjYWxlID0gMTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzcGVjaWFsVGlwc0J0LnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9DYW5jZWwuc2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIC8v5pmu6YCa5aWWYnV0dG9uXG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbFRpcHNCdCA9IG5vcm1hbFRpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgbm9ybWFsVGlwc0J0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvQ2FuY2VsLnNjYWxlID0gMC44O1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG5vcm1hbFRpcHNCdC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNKdW1wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NhbmNlbC5zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbm9ybWFsVGlwc0J0LnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9DYW5jZWwuc2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5Yid5aeL5YyW5oiQ5Yqf5LmL5ZCOXG4gICAgaW5pdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy51cGRhdGVQb2xsKHRydWUpO1xuICAgICAgICBsZXQgcG9vbFJlc3VsdCA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuUG9vbFJlc3VsdDtcbiAgICAgICAgbGV0IHBvb2xWaXNpYWJsZSA9IHBvb2xSZXN1bHQucG9vbFZpc2lhYmxlO1xuICAgICAgICB0aGlzLnNldFBvb2xJY29uKCk7XG4gICAgICAgIHRoaXMuc2V0U2tpbigpO1xuICAgICAgICBpZihwb29sVmlzaWFibGUgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuZ2V0UG9vbCwgMik7XG4gICAgICAgIH1cbiAgICAgICAgLy/ot5Hpqaznga93b3JraW5nXG4gICAgICAgIHRoaXMub3Blbk1hcnF1ZWUoKTtcbiAgICAgICAgdGhpcy5zZXRSZWNvdmVyUHJpY2VBbmRMaW5lcygpO1xuICAgIH0sXG4gICAgLy/lsI/otLTlo6sg6Lez6L2sXG4gICAgdGlwc0p1bXA6ZnVuY3Rpb24oKXtcbiAgICAgICAgY2MubG9nKFwianVtcFwiKTtcbiAgICAgICAgdmFyIGxpbmsgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQudGlwLnVybDtcbiAgICAgICAgaWYgKCFDQ19KU0Ipe1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsucHVzaFdpbmRvdyhsaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvcGVuTWFycXVlZTpmdW5jdGlvbigpe1xuICAgICAgICAvL+i3kemprOeBr+S9jee9ruWPiuWMuuWfn+iuvue9rlxuICAgICAgICB2YXIgc2tpbiA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuc2tpbjtcbiAgICAgICAgaWYoc2tpbil7XG4gICAgICAgICAgICB2YXIgYnJvYWRDYXN0UG9zQW5kV2lkdGggPSBza2luLmJyb2FkQ2FzdFBvc0FuZFdpZHRoO1xuICAgICAgICAgICAgaWYoYnJvYWRDYXN0UG9zQW5kV2lkdGggIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLm1hcnF1ZWUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0UG9zaXRpb24oYnJvYWRDYXN0UG9zQW5kV2lkdGhbMF0sYnJvYWRDYXN0UG9zQW5kV2lkdGhbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQud2lkdGggPSBicm9hZENhc3RQb3NBbmRXaWR0aFsyXTsgLy93aWR0aCDoo4HliarljLrln5/lpKflsI9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYnJvYWRjYXNlQ21wID0gdGhpcy5tYXJxdWVlLmdldENvbXBvbmVudChcIkJyb2FkQ2FzdFwiKTtcbiAgICAgICAgYnJvYWRjYXNlQ21wLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGJyb2FkY2FzZUNtcC5kYXRhQ2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgLy/ogZTnvZFcbiAgICBuZXRDYWxsYmFjayA6IGZ1bmN0aW9uKGNtZCwgcmVzLCBtc2csIHNlbGYpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldENhbGxiYWNrIGNtZD1cIiArIGNtZCArIFwiXFxyZXM9XCIgKyByZXMgKyBcIlxcbXNnPVwiICsgbXNnKTtcbiAgICAgICAgaWYoY21kICE9IDEwNCApe1xuICAgICAgICAgICAgc2VsZi5oaWRlV2FpdExheWVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocmVzID09IDApXG4gICAgICAgIHsgICBcbiAgICAgICAgICAgIGlmKGNtZCAhPSAxMDQgKXtcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmtXYWl0SGlkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlckZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaChjbWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdFJlc3VsdD0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gaW5pdFJlc3VsdC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5pdHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgLy/lkK/liqhcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhdHVzID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZG9Ob3RpbmdcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoc3RhdHVzID09PSAxKXsvL+aBouWkjVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvdmVyR2FtZSgpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInVua25vdyBzdGF0dXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDE6XG4gICAgICAgICAgICAgICAgeyAgIFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1fZ3JlYXRHYW1lSGFzRmluaXNoZWRPbmVQYXJ0ID0gZmFsc2U7Ly/lpKfkuLDmlLblh7rnjrDlhY3otLnmuLjmiI/lhY3otLnmuLjmiI/lh7rnjrDlhY3otLnmuLjmiI9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJEaWFsb2dUYWcgPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyAvL+ato+W4uOa4uOaIj1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdhbWVNb2RlbEFuZFVuaXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlVXNlckluZm8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgLy/nu5PnrpfmuLjmiI9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXdhcmRHYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyRGlhbG9nVGFnID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXF1ZXN0UmV3YXJkVGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIue7k+eul+a4uOaIj1wiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVVc2VySW5mbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMzovL+iuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyID0gY2MuZmluZChcIkNhbnZhcy9vcmRlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVySnMgPSBvcmRlci5nZXRDb21wb25lbnQoXCJKaWx1TGlzdFNjcmlwdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJKcy5pbml0RGluZ2RhbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwNDovL+WlluaxoOabtOaWsFxuICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQb2xsKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudW5zY2hlZHVsZShzZWxmLmdldFBvb2wpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjaGVkdWxlT25jZShzZWxmLmdldFBvb2wsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwNTovL+inhOWImVxuICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ydWxlSGFzU2hvd09uY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLndhaXRMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgczEgPSBzZWxmLmhlbHBOb2RlLmdldENvbXBvbmVudChcIkhlbHBcIik7XG4gICAgICAgICAgICAgICAgICAgIHMxLmRvd25IZWxwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyZXMgPT0gMjAwMDA5KXsgLy/kvZnpop3kuI3otrM7XG4gICAgICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnJlY2hhcmdlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucmVjaGFyZ2VUb2FzdEp1ZGdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyZXMgPT0gMTAwMDA3IHx8IDIwMDAxOSA9PSByZXMgKXsgLy/lgZzllK5cbiAgICAgICAgICAgIHNlbGYuYmxhY2tMYXllcjIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuc3RvcExheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLm9yZGVyRmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5zdG9wTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3b3Jkc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBtc2c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyZXMgPT0gMTAwMDM1KXsgLy/otKblj7flnKjlhbbku5borr7lpIfnmbvpmYYgMTAwMDE0PT0xMDAwMzVcbiAgICAgICAgICAgIHNlbGYuYmxhY2tMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5lcnJEaWFsb2dUYWcgPSAxO1xuICAgICAgICAgICAgc2VsZi5tb3JlRGV2TGFiZWwuc3RyaW5nID0gbXNnO1xuICAgICAgICAgICAgc2VsZi5tb3JlRGV2RGlhLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGNtZCA9PSAxMDQpey8v5pu05paw5aWW5rGg5LiN5Ye6546w5by55qGG5o+Q56S6XG4gICAgICAgICAgICAgICAgc2VsZi51bnNjaGVkdWxlKHNlbGYuZ2V0UG9vbCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zY2hlZHVsZU9uY2Uoc2VsZi5nZXRQb29sLCAyKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGNtZCA9PSAxMDIpey8v57uT566XMuasoeWQjumHjeaWsOWIneWni+WMllxuICAgICAgICAgICAgICAgIHNlbGYuY3VuQ21kID0gY21kO1xuICAgICAgICAgICAgICAgIHNlbGYucmVxdWVzdFJld2FyZFRpbWUrKztcbiAgICAgICAgICAgICAgICBpZihzZWxmLnJlcXVlc3RSZXdhcmRUaW1lID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcXVlc3RSZXdhcmRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93RXJyb3JMYXllcihtc2csIHRydWUpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0UmV3YXJkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jdW5DbWQgPSBjbWQ7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93RXJyb3JMYXllcihtc2csIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v6K6+572u5aWW5rGg6K+05piO5Zu+5qCHXG4gICAgc2V0UG9vbEljb246ZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGljb25VcmwgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3lJY29uO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGljb25VcmwgIT0gXCJcIil7XG4gICAgICAgICAgICAvL+S4i+i9veaNouWbvlxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoaWNvblVybCwgZnVuY3Rpb24gKGVyciwgdGV4KXtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB1cmwgKycrZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIqKuWlluaxoOWbvueJhyoqXCIsaWNvblVybCtcInxcIit0ZXgpO1xuICAgICAgICAgICAgICAgIGlmKHRleCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZiA9IG5ldyBjYy5TcHJpdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZi5zZXRUZXh0dXJlKHRleCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9vbEljb24uc3ByaXRlRnJhbWUgPSBzZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+mUmeivr+aPkOekuiAvL2ZsYWc6dHJ1ZTrlj4zmjInpkq4gIGZhbHNlOuWNleaMiemSrixcbiAgICBzaG93RXJyb3JMYXllcjpmdW5jdGlvbihlcnJNc2csIGZsYWcpXG4gICAgeyAgIFxuICAgICAgICB0aGlzLmVyckxhYmVsLnN0cmluZyA9IGVyck1zZzsgICAgICAgIFxuICAgICAgICB0aGlzLmJsYWNrTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lcnJMYXllci5zY2FsZSA9IDA7XG4gICAgICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjIgKiB0aGlzLnNjYWxlVmFsdWUpO1xuICAgICAgICBsZXQgc2NhbGVUbzIgPSBjYy5zY2FsZVRvKDAuMSwgMS4wICogdGhpcy5zY2FsZVZhbHVlKTtcbiAgICAgICAgdGhpcy5lcnJMYXllci5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGVUbzEsIHNjYWxlVG8yKSk7XG4gICAgfSxcblxuICAgIC8v6LCD5aWW5rGgXG4gICAgZ2V0UG9vbDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5nZXRQb29sKTtcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICBkYXRhT3Blci5nZXRQb29sICh0aGlzLm5ldENhbGxiYWNrLHRoaXMpO1xuICAgIH0sXG5cbiAgICAvL+abtOaWsOWlluaxoFxuICAgIHVwZGF0ZVBvbGw6ZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIGxldCBwb29sUmVzdWx0ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Qb29sUmVzdWx0O1xuICAgICAgICBsZXQgcG9vbEJvdW5zID0gcG9vbFJlc3VsdC5wb29sQm91bnM7XG4gICAgICAgIGxldCBwb29sVmlzaWFibGUgPSBwb29sUmVzdWx0LnBvb2xWaXNpYWJsZTtcbiAgICAgICAgaWYocG9vbFZpc2lhYmxlID09IDEpe1xuICAgICAgICAgICAgdGhpcy5wb29sTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHBvb2xTY3JpcHQgPSB0aGlzLnBvb2xOb2RlLmdldENvbXBvbmVudChKaWFuZ0NoaVNjcmlwdCk7XG4gICAgICAgICAgICBwb29sU2NyaXB0LmluaXREYXRhKHBvb2xCb3Vucyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wb29sTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfSxcblxuICAgIGdldEluaXQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zaG93V2FpdExheWVyKCk7XG4gICAgICAgIHRoaXMub3JkZXJGbGFnID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICBkYXRhT3Blci5nZXRJbml0ICh0aGlzLm5ldENhbGxiYWNrLHRoaXMpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5oqV5rOoXG4gICAgICogQHBhcmFtIGdhbWVUeXBlIOa4uOaIj+exu+WeiygwOuaZrumAmua4uOaIjyAxOuWFjei0uea4uOaIjykgaW50XG4gICAgICogQHBhcmFtIHRpY2tldE5vIOiuouWNlSjnpagp5Y+344CCXG4gICAgICogQHBhcmFtIHN0ZXAg5b2T5YmN5YWN6LS55ri45oiP55qE5qyh5pWw44CCaW50XG4gICAgICogQHBhcmFtIG11bHJpcGxlIOaKleazqOWAjeaVsOOAglxuICAgICAqIEBwYXJhbSBsaW5lTnVtIOaKleazqOe6v+aVsOOAglxuICAgICAqIEBwYXJhbSBwbGF5VGltZSDmuLjmiI/ml7bpl7TjgIJcbiAgICAgKi9cbiAgICBnZXRCZXQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zaG93V2FpdExheWVyKCk7XG4gICAgICAgIHRoaXMub3JkZXJGbGFnID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICBpZih0aGlzLm1fZ2FtZU1vZGVsID09IDIpey8v5YWN6LS55ri45oiPXG4gICAgICAgICAgICB2YXIgc3RlcCA9IC0xO1xuICAgICAgICAgICAgdmFyIHRpY2tldE5vID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHRoaXMuZXJyRGlhbG9nVGFnID09IDIpe1xuICAgICAgICAgICAgICAgIHRpY2tldE5vID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnJlY292ZXJEYXRhLnRpY2tldE5vO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGlja2V0Tm8gPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkJldFJlc3VsdC50aWNrZXRObztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFPcGVyLmdldEJldCAoMSx0aWNrZXRObyx0aGlzLm1fZnJlZVN0ZXAsdGhpcy5tX3ByaWNlLHRoaXMubV9saW5lLE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5wbGF5VGltZSx0aGlzLm5ldENhbGxiYWNrLHRoaXMpO1xuICAgICAgICB9ZWxzZXsvL+WFtuS7llxuICAgICAgICAgICAgZGF0YU9wZXIuZ2V0QmV0ICgwLFwiXCIsMCx0aGlzLm1fcHJpY2UsdGhpcy5tX2xpbmUsTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnBsYXlUaW1lLHRoaXMubmV0Q2FsbGJhY2ssdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBnZXRPcmRlckxpc3Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGluaXRSZXN1bHQgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQ7XG4gICAgICAgIGlmKGluaXRSZXN1bHQpe1xuICAgICAgICAgICAgdGhpcy5vcmRlckZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93V2FpdExheWVyKCk7XG4gICAgICAgICAgICB2YXIgZGF0YU9wZXIgPSBEYXRhT3Blci5EYXRhT3Blci5nZXRJbnN0KCk7XG4gICAgICAgICAgICBkYXRhT3Blci5nZXRHYW1lTGlzdCh0aGlzLm5ldENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgICBcblxuICAgIGdldFJ1bGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5vcmRlckZsYWcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXYWl0TGF5ZXIoKTtcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICBkYXRhT3Blci5nZXRSdWxlKHRoaXMubmV0Q2FsbGJhY2ssIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDnu5PnrpdcbiAgICAgKiBAcGFyYW0gdGlja2V0X25vIOiuouWNleWPt1xuICAgICAqIEBwYXJhbSBwbGF5VGltZSDmuLjmiI/ml7bpl7RcbiAgICAgKi9cbiAgICBnZXRSZXdhcmQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5vcmRlckZsYWcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXYWl0TGF5ZXIoKTtcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICB2YXIgdGlja2V0X25vID0gXCJcIjtcbiAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7Ly/mgaLlpI3mlbDmja7nu5PnrpdcbiAgICAgICAgICAgIHRpY2tldF9ubyA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS50aWNrZXRObztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aWNrZXRfbm8gPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkJldFJlc3VsdC50aWNrZXRObztcbiAgICAgICAgfVxuICAgICAgICBkYXRhT3Blci5nZXRSZXdhcmQodGlja2V0X25vLE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5wbGF5VGltZSx0aGlzLm5ldENhbGxiYWNrLHRoaXMpO1xuICAgIH0sXG5cbiAgICAvL+a4uOaIj+aBouWkjVxuICAgIHJlY292ZXJHYW1lOmZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVyckRpYWxvZ1RhZyA9IDI7XG4gICAgICAgIC8v6K6+572u5Zue5aSN5pWw5o2u55qE5oqV5rOo5ZKM5YCN5pWwXG4gICAgICAgIHRoaXMuc2V0UmVjb3ZlclByaWNlQW5kTGluZXMoKTtcbiAgICAgICAgLy/liKTmlq3mgaLlpI3muLjmiI/nmoTnsbvlnotcbiAgICAgICAgdGhpcy5sZWZ0U2V0Q2xpY2sodHJ1ZSk7XG4gICAgICAgIHRoaXMucmlnaHRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgdGhpcy5iZXRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgdmFyIHJlY292ZXJEYXRhID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnJlY292ZXJEYXRhOy8vcmVjb3ZlclR5cGUgMDrmma7pgJrmuLjmiI8xLOeJueauiua4uOaIj++8jDLvvJrlpZbmsaAgMzrlhY3otLnmuLjmiI8gMzLlhY3otLnmuLjmiI/kuK3mnInlpZbmsaDlpZZcbiAgICAgICAgdmFyIHJlY292ZXJUeXBlID0gcmVjb3ZlckRhdGEucmVjb3ZlclR5cGU7XG4gICAgICAgIGlmKHJlY292ZXJUeXBlID09IDApe1xuICAgICAgICAgICAgdGhpcy5tX2dhbWVNb2RlbCA9IDA7XG4gICAgICAgIH1lbHNlIGlmKHJlY292ZXJUeXBlID09IDEpe1xuICAgICAgICAgICAgdGhpcy5tX2dhbWVNb2RlbCA9IDM7XG4gICAgICAgICAgICBpZigocmVjb3ZlckRhdGEuc3RlcCA9PSByZWNvdmVyRGF0YS5mcmVlR2FtZVRvdGFsVGltZXMpJiYgKHJlY292ZXJEYXRhLnN0ZXAgPiAwICkpe1xuICAgICAgICAgICAgICAgIHRoaXMubV9nYW1lTW9kZWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSBpZihyZWNvdmVyVHlwZSA9PSAyKXtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lTW9kZWwgPSA0O1xuICAgICAgICB9ZWxzZSBpZihyZWNvdmVyVHlwZSA9PSAzKXtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lTW9kZWwgPSAyOy8vXG4gICAgICAgICAgICB0aGlzLm1fZnJlZVN0ZXAgPSByZWNvdmVyRGF0YS5zdGVwO1xuICAgICAgICAgICAgdGhpcy5tX2ZyZWVTdGVwKys7XG4gICAgICAgICAgICB0aGlzLmZyZWVHYW1lTW9kZWwoKTtcbiAgICAgICAgfWVsc2UgaWYocmVjb3ZlclR5cGUgPT0gMzIpe1xuICAgICAgICAgICAgdGhpcy5tX2ZyZWVTdGVwID0gcmVjb3ZlckRhdGEuc3RlcDtcbiAgICAgICAgICAgIHRoaXMubV9mcmVlU3RlcCsrO1xuICAgICAgICAgICAgdGhpcy5mcmVlR2FtZU1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gNDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYy5sb2coXCLmgaLlpI3nsbvlnovlh7rplJlcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjYWxlVG8xID0gY2Muc2NhbGVUbygwLjIsIDEuMCwgMS4wKTtcbiAgICAgICAgbGV0IHNjYWxlVG8yID0gY2Muc2NhbGVUbygwLjIsIDAsIDApO1xuICAgICAgICB0aGlzLnJlY292ZXJUb2FzdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBjYy5kZWxheVRpbWUoMiksIHNjYWxlVG8yKSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucmVjb3Zlck5leHRTdGVwLCAxLjIpO1xuICAgIH0sXG5cbiAgICByZWNvdmVyTmV4dFN0ZXA6ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7IC8v5oGi5aSNXG4gICAgICAgICAgICB0aGlzLnNldFJlY292ZXJHYW1lTW9kZWxBbmRVbml0RGF0YSgpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/oh6rliqjmuLjmiI9cbiAgICBhdXRvQ2FsbGJhY2s6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgaWYodGhpcy5hdXRvRmxhZyA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nZXRJc0xvZ2luKCk7XG4gICAgICAgICAgICAvL3RoaXMuZ2V0QmV0KCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmF1dG9GbGFnID0gMDtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYXV0b0luZGV4ID0gdGhpcy5hdXRvTGltaXQ7XG4gICAgICAgICAgICB0aGlzLmF1dG9MYWJlbC5zdHJpbmcgPSBcIuiHquWKqFwiO1xuICAgICAgICAgICAgdGhpcy5hdXRvVGltZXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmlnaHRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBoaWRlV2FpdDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLndhaXRMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd1dhaXRCbGFja0xheWVyOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYmxhY2tMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndhaXRMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBzaG93V2FpdExheWVyOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLm1hcmtXYWl0SGlkZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLndoaXRlTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm1fd2FpdGludENhbGxCYWNrID0gZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICBpZighc2VsZi5tYXJrV2FpdEhpZGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93V2FpdEJsYWNrTGF5ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHNlbGYuaGlkZVdhaXRMYXllcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubV93YWl0aW50Q2FsbEJhY2ssIDEpO1xuICAgIH0sXG5cbiAgICBoaWRlV2FpdExheWVyOiBmdW5jdGlvbihmbGFnKXtcbiAgICAgICAgdGhpcy53YWl0TGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmxhY2tMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aGl0ZUxheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5tX3dhaXRpbnRDYWxsQmFjayk7XG4gICAgfSxcblxuICAgIGJ0bkFjdGlvbkNhbGxCYWNrOmZ1bmN0aW9uKHNlbGVjdFR5cGUpe1xuICAgICAgICBpZihzZWxlY3RUeXBlID09IDEpe1xuICAgICAgICAgICAgaWYodGhpcy5pc1F1aWNrUGFzc0Z1bmN0aW9uID09IHRydWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXNRdWlja2x5RW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICBpZih0aGlzLm1faXNRdWlja1N0b3BCdCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0U2V0Q2xpY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpY2tTdG9wKCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXNMb2dpbigpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZ2V0QmV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSBpZihzZWxlY3RUeXBlID09IDIpe1xuICAgICAgICAgICAgLy/nm7TmjqXliKTmlq3mmK/lkKbnmbvlvZXlkozmmK/lkKbkvZnpop3lpJ9cbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm55m75b2VXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBpZighQ0NfSlNCKXtcbiAgICAgICAgICAgICAgICB2YXIgc2RrID0gd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREs7XG4gICAgICAgICAgICAgICAgaWYoc2RrKXtcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbnmbvlvZVcbiAgICAgICAgICAgICAgICAgICAgc2RrLmlzTG9naW4oZnVuY3Rpb24oaXNMb2dpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXNMb2dpbikvL+ayoeeZu+W9leWOu+eZu+W9lVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Ieq5YqoIOayoeacieeZu+mZhlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdvTG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UvL+eZu+W9leS6hiDliKTmlq3mmK/lkKbojrflj5bosYbmiJDlip9cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcqOWIpOaWreaYr+WQpui2s+mine+8iOa3mOWuneebuOWFs++8iSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZyA9IHNlbGYuanVkZ2VCYWxhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmxhZyA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nb0F1dG9CZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29BdXRvQmV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5nb0F1dG9CZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL2dvQmV0XG4gICAgZ29BdXRvQmV0OmZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuYXV0b0ZsYWcgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLmJsYWNrTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3JkZXJGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIC8v5piv5ZCm6Ieq5Yqo5byA5ZCvMTDmrKHkuJvmnpflhpLpmanvvIzmr4/lsYDmipUqKirosYbvvIjlj6/mj5DliY3nu5PmnZ/vvInvvJ9cbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbkxhYmVsLnN0cmluZyA9IFwi5q+P5bGA5oqVXCIgKyAodGhpcy5tX2xpbmUgKiB0aGlzLm1fcHJpY2UpICtOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3krXCIo5Y+v5o+Q5YmN57uT5p2fKVwiO1xuICAgICAgICAgICAgdGhpcy5hdXRvQ29uZmlybS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIHRoaXMuc2NhbGVWYWx1ZSkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGluZUNoYW5nZUJldDpmdW5jdGlvbih0b2dnbGUsIG1lcyl7XG4gICAgICAgIHRoaXMubV9saW5lID0gbWVzO1xuICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdExpbmVBY3Rpb24obWVzKTtcbiAgICAgICAgdGhpcy51cGRhdGVCZVRJbmZvKCk7XG4gICAgfSxcblxuICAgIGNoYW5nZVNlbGVjdExpbmVBY3Rpb246ZnVuY3Rpb24obWVzKXtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8ICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQubGluZU51bXMubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RMaW5lTGlzdFtqXS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RMaW5lTGlzdFtqXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmxpbmVOdW1zW2pdO1xuICAgICAgICAgICAgaWYobWVzID09IGxpbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TGluZUxpc3Rbal0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdExpbmVMaXN0W2pdLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLmZhZGVPdXQoMS4wKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdExpbmVMaXN0W2pdLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMiksYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJpY2VDaGFuZ2VCZXQ6ZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB0aGlzLm1fcHJpY2UgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQubXVscmlwbGVzW2luZGV4XTtcbiAgICAgICAgdGhpcy51cGRhdGVCZVRJbmZvKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUJlVEluZm86ZnVuY3Rpb24oKXtcbiAgICAgICB2YXIgdG90YWwgPSB0aGlzLm1fbGluZSAqIHRoaXMubV9wcmljZTtcbiAgICAgICB0aGlzLmJldEluZm8ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgIHRoaXMuYmV0SW5mby5zdHJpbmcgPSBcIuavj+WxgOaKlTogXCIgKyB0b3RhbCsgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmN1cnJlbmN5O1xuICAgIH0sXG5cbiAgICAvL+iuvue9ruS4reWlluWxguWcsOWdl1xuICAgIHNldFJld2FyZEN1YmU6ZnVuY3Rpb24odGlja2V0c0FycmF5KXtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRpY2tldHNBcnJheS5sZW5ndGg7IGkrKyl7IFxuICAgICAgICAgICAgdmFyIHN0ciA9IHRpY2tldHNBcnJheVtpXTtcbiAgICAgICAgICAgIHZhciBjdWJlID0gdGhpcy5yZXdhcmRDdWJlTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBjdWJlU2NyaXB0ID0gY3ViZS5nZXRDb21wb25lbnQoY3ViZVMpO1xuICAgICAgICAgICAgY3ViZVNjcmlwdC5zZXRDdWJlKHN0cik7XG4gICAgICAgICAgICBjdWJlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+a4uOaIj+aBouWkjeaVsOaNruiuvue9rlxuICAgIHNldFJlY292ZXJHYW1lTW9kZWxBbmRVbml0RGF0YTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XG4gICAgICAgIHZhciB0aWNrZXRzQXJyYXkgPSBuZXREYXRhLkluaXRSZXN1bHQucmVjb3ZlckRhdGEudGlja2V0RGF0YVswXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDU7IGkrKyl7IFxuICAgICAgICAgICAgdmFyIGRhdGFBcnJheSA9IFtdO1xuICAgICAgICAgICAgdmFyIHVuaXRTID0gdGhpcy5wQXJyYXlbaV0uZ2V0Q29tcG9uZW50KFVuaXQpO1xuICAgICAgICAgICAgZm9yKHZhciBqID0gMzsgaj49MDsgai0tKXtcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gdGlja2V0c0FycmF5WzUgKiBqICsgaV07XG4gICAgICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goc3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBpZih0aGlzLm1fZ2FtZU1vZGVsID09IDMpe1xuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5pdFMuc2V0U3RvcERhdGFBcnJheShkYXRhQXJyYXksIGkrMSxmbGFnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFJld2FyZEN1YmUodGlja2V0c0FycmF5KTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zdGFydFJvdW5kLCAwLjAxKTtcbiAgICB9LFxuICAgIC8vc2V0UmVjb3ZlclByaWNlQW5kTGluZXNcbiAgICBzZXRSZWNvdmVyUHJpY2VBbmRMaW5lczpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnByaWNlR3JvdXBOb2RlLmdldENvbXBvbmVudChQcmljZUdyb3VwKS5zZXRMYWJlbENvbG9yKCk7XG4gICAgICAgIHZhciBJbml0UmVzdWx0ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0O1xuICAgICAgICB2YXIgbXVscmlwbGUgPSBJbml0UmVzdWx0LmRlZmF1bHRNdWxyaXBsZTtcbiAgICAgICAgdmFyIGxpbmVOdW0gPSBJbml0UmVzdWx0LmRlZmF1bHRMaW5lTnVtO1xuICAgICAgICAvL+WFjei0uea4uOaIj+eUseS6jue8k+WtmOmXrumimCDku45yZWNvdmVyRGF0YemHjOmdouWPluWAvFxuICAgICAgICBpZihJbml0UmVzdWx0LnJlY292ZXJEYXRhKXtcbiAgICAgICAgICAgIG11bHJpcGxlID0gSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5tdWxyaXBsZTtcbiAgICAgICAgICAgIGxpbmVOdW0gPSBJbml0UmVzdWx0LnJlY292ZXJEYXRhLmxpbmVOdW07XG4gICAgICAgIH1cbiAgICAgICAgLy9pZihJbml0UmVzdWx0LilcbiAgICAgICAgdGhpcy5tX2xpbmUgPSBsaW5lTnVtO1xuICAgICAgICB0aGlzLm1fcHJpY2UgPSBtdWxyaXBsZTtcbiAgICAgICAgdmFyIG11bHJpcGxlVG9nZ2xlSW5kZXggPSAwO1xuICAgICAgICB2YXIgbGluZVRvZ2dsZUluZGV4ID0gMDtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5tdWxyaXBsZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdmFyIG11ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0Lm11bHJpcGxlc1tpXTtcbiAgICAgICAgICAgIGlmKG11bHJpcGxlID09IG11KXtcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlR3JvdXBOb2RlLmdldENvbXBvbmVudChQcmljZUdyb3VwKS5jbGlja09uZVRvZ2dsZShpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8ICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQubGluZU51bXMubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQubGluZU51bXNbal07XG4gICAgICAgICAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYobGluZU51bSA9PSBsaW5lKXtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGluZUdyb3VwW2pdLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IGZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGVjdExpbmUgPSB0aGlzLnNlbGVjdExpbmUuZ2V0Q29tcG9uZW50KFNlbGVjdExpbmUpOztcbiAgICAgICAgc2VsZWN0TGluZS5saW5lQ2hhbmdlKFwiXCIsdGhpcy5tX2xpbmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJlVEluZm8oKTtcbiAgICB9LFxuXG4gICAgLy/mipXms6jov4fmnaXnmoTmraPluLjmuLjmiI9cbiAgICBzZXRHYW1lTW9kZWxBbmRVbml0RGF0YTpmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLnJpZ2h0QmV0ID09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5hdXRvRmxhZyA9IDE7XG4gICAgICAgICAgICB0aGlzLmF1dG9UaW1lcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbGVmdFRpbWVzID0gdGhpcy5hdXRvTGltaXQgLSB0aGlzLmF1dG9JbmRleCArIDE7XG4gICAgICAgICAgICB0aGlzLmF1dG9UaW1lcy5zdHJpbmcgPSBcIuesrFwiK2xlZnRUaW1lcytcIuasoVwiO1xuICAgICAgICAgICAgdGhpcy5hdXRvTGFiZWwuc3RyaW5nID0gXCLlj5bmtojoh6rliqhcIjtcbiAgICAgICAgfSAgIFxuICAgICAgICB2YXIgbmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XG4gICAgICAgIC8v5Yik5pat5ri45oiP5qih5byPXG4gICAgICAgIGlmKHRoaXMubV9nYW1lTW9kZWwgPT0gMil7Ly/lhY3otLnmuLjmiI9cbiAgICAgICAgICAgIHRoaXMubV9mcmVlU3RlcCsrO1xuICAgICAgICAgICAgaWYobmV0RGF0YS5CZXRSZXN1bHQucmVzdWx0VHlwZSA9PSAyKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gNDsvL+WlluaxoOWkp+WlllxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKG5ldERhdGEuQmV0UmVzdWx0LnJlc3VsdFR5cGUgPT0gMSl7XG4gICAgICAgICAgICAgICAgLy/lpKfkuLDmlLZcbiAgICAgICAgICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gMztcbiAgICAgICAgICAgIH1lbHNlIGlmKG5ldERhdGEuQmV0UmVzdWx0LnJlc3VsdFR5cGUgPT0gMil7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2dhbWVNb2RlbCA9IDQ7Ly/lpZbmsaDlpKflpZZcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAvL+aZrumAmua4uOaIj1xuICAgICAgICAgICAgICAgIHRoaXMubV9nYW1lTW9kZWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0aWNrZXRzQXJyYXkgPSBuZXREYXRhLkJldFJlc3VsdC50aWNrZXREYXRhWzBdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgICAgICAgICAgIHZhciBkYXRhQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHZhciB1bml0UyA9IHRoaXMucEFycmF5W2ldLmdldENvbXBvbmVudChVbml0KTtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDM7IGo+PTA7IGotLSl7XG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IHRpY2tldHNBcnJheVs1ICogaiArIGldO1xuICAgICAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKHN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYodGhpcy5tX2dhbWVNb2RlbCA9PSAzKXtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVuaXRTLnNldFN0b3BEYXRhQXJyYXkoZGF0YUFycmF5LCBpKzEsZmxhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRSZXdhcmRDdWJlKHRpY2tldHNBcnJheSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc3RhcnRSb3VuZCwgMC4wMSk7XG4gICAgfSxcblxuICAgICAvL+WFjei0uea4uOaIj1xuICAgIGZyZWVHYW1lTW9kZWw6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5tX2dhbWVNb2RlbCA9IDI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgIGxldCB1bml0ID0gdGhpcy5wQXJyYXlbaV07XG4gICAgICAgICAgIHVuaXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJldFNldENsaWNrKHRydWUpO1xuICAgICAgICBpZih0aGlzLm1fZnJlZUxheWVyU2hvd09uY2UgPT0gZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5tX2ZyZWVMYXllclNob3dPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZnJlZVRpdGxlLnNldFBvc2l0aW9uKDAsMTA1MCk7XG4gICAgICAgICAgICB0aGlzLmZyZWVUaXRsZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5mcmVlVGl0bGUucnVuQWN0aW9uKGNjLm1vdmVUbygwLjYsIGNjLnAoMCwgNTg5KSkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZnJlZUdhbWVMZWZ0VGltZXMgPSAwO1xuICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAyKXtcbiAgICAgICAgICAgIGZyZWVHYW1lTGVmdFRpbWVzID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnJlY292ZXJEYXRhLmZyZWVHYW1lTGVmdFRpbWVzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZyZWVHYW1lTGVmdFRpbWVzID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5CZXRSZXN1bHQuZnJlZUdhbWVMZWZ0VGltZXNcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZyZWVHYW1lVGltZUxhYmVsLnN0cmluZyA9IFwiXCIgKyBmcmVlR2FtZUxlZnRUaW1lcyArIFwi5qyhXCI7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tX2lzUXVpY2tTdG9wQnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZWZ0U2V0Q2xpY2sodHJ1ZSk7XG4gICAgICAgIHRoaXMucmlnaHRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgLy8gaWYodGhpcy5hdXRvRmxhZyA9PSAxKXtcbiAgICAgICAgLy8gICAgIHRoaXMucmlnaHRCZXQgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIHRoaXMuYXV0b0NhbGxiYWNrKCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLy/lpKfkuLDmlLZcbiAgICBzZXRHcmVhdEdhbWVNb2RlbEFuZFVuaXREYXRhOmZ1bmN0aW9uKCl7XG4gICAgICAgIC8v5LiK5bGA5ri45oiP55qE57uf6YWN5Zu+5qGI5L+d55WZXG4gICAgICAgIHZhciBzcGVjaWFsQXJyYXkgPSBudWxsO1xuICAgICAgICB2YXIgdGlja2V0c0FycmF5ID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7Ly/mgaLlpI1cbiAgICAgICAgICAgIHNwZWNpYWxBcnJheSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5zcGVjaWFsUmVzdWx0TG9jYXRpb247XG4gICAgICAgICAgICB0aWNrZXRzQXJyYXkgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQucmVjb3ZlckRhdGEudGlja2V0RGF0YVsxXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzcGVjaWFsQXJyYXkgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkJldFJlc3VsdC5zcGVjaWFsUmVzdWx0TG9jYXRpb247XG4gICAgICAgICAgICB0aWNrZXRzQXJyYXkgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkJldFJlc3VsdC50aWNrZXREYXRhWzFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UmV3YXJkQ3ViZSh0aWNrZXRzQXJyYXkpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICBsZXQgdW5pdCA9IHRoaXMucEFycmF5W2ldO1xuICAgICAgICAgICB1bml0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNwZWNpYWxBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzcGVjaWFsQXJyYXlbaV07XG4gICAgICAgICAgICB0aGlzLnJld2FyZEN1YmVMaXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRDdWJlTGlzdFtpbmRleF0uZ2V0Q29tcG9uZW50KGN1YmVTKS5wbGF5QW5pKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2dhbWVNb2RlbCA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgdmFyIGRhdGFBcnJheSA9IFtdO1xuICAgICAgICAgICAgdmFyIHVuaXRTID0gdGhpcy5wQXJyYXlbaV0uZ2V0Q29tcG9uZW50KFVuaXQpO1xuICAgICAgICAgICAgZm9yKHZhciBqID0gMzsgaj49MDsgai0tKXtcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gdGlja2V0c0FycmF5WzUgKiBqICsgaV07XG4gICAgICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goc3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVuaXRTLnNldFN0b3BEYXRhQXJyYXkoZGF0YUFycmF5LCBpKzEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc3RhcnRSb3VuZCwgMC4wMSk7XG4gICAgfSxcblxuICAgIGxlZnRTZXRDYW5DbGljazpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmxlZnROb3RUb3VjaC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZWZ0QnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0R3JheS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc3RhcnRSb3VuZDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmlzUXVpY2tseUVuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUXVpY2tQYXNzRnVuY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZV9nYW1laW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iZXRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgdmFyIHNlbGVjdExpbmUgPSB0aGlzLnNlbGVjdExpbmUuZ2V0Q29tcG9uZW50KFNlbGVjdExpbmUpOztcbiAgICAgICAgc2VsZWN0TGluZS5saW5lQ2hhbmdlKFwiXCIsdGhpcy5tX2xpbmUpO1xuICAgICAgICBpZih0aGlzLmF1dG9GbGFnID09IDEpe1xuICAgICAgICAgICAgdGhpcy5yaWdodFNldENsaWNrKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMubGVmdFNldENsaWNrKHRydWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucmlnaHRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubGVmdExhYmVsLnN0cmluZyA9IFwi5b+r6YCf5YGc5q2iXCI7XG4gICAgICAgICAgICB0aGlzLm1faXNRdWlja1N0b3BCdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxlZnRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubGVmdFNldENhbkNsaWNrLDAuNyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0TW9uZXkoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgIHZhciB1bml0UyA9IHRoaXMucEFycmF5W2ldLmdldENvbXBvbmVudChVbml0KTtcbiAgICAgICAgICAgICB1bml0Uy5zdGFydFJvdW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5ub3JtYWxTdG9wLCAxLjIpO1xuICAgIH0sXG5cbiAgICBxdWlja1N0b3A6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMubm9ybWFsU3RvcCk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVDYWxsYmFjayk7XG4gICAgICAgIGlmKHRoaXMubV9nYW1lTW9kZWwgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnF1aWNrRGVsYXksIDAuMDEpO1xuICAgIH0sXG4gICAgcXVpY2tEZWxheTpmdW5jdGlvbigpe1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgICAgICAgICAgICB2YXIgdW5pdFMgPSB0aGlzLnBBcnJheVtpXS5nZXRDb21wb25lbnQoVW5pdCk7XG4gICAgICAgICAgICAgdW5pdFMuc3RvcFJvdW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbm9ybWFsU3RvcDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudGltZUNhbGxiYWNrLCAwLjMpO1xuICAgIH0sXG5cbiAgICB0aW1lQ2FsbGJhY2s6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciB1bml0UyA9IHRoaXMucEFycmF5W3RoaXMuaW5kZXhdLmdldENvbXBvbmVudChVbml0KTtcbiAgICAgICAgdW5pdFMuc3RvcFJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgaWYodGhpcy5pbmRleCA9PSA1KXtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVDYWxsYmFjayk7ICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgfSxcblxuICAgIC8v5rua5Yqo5a6M5q+V5LmL5ZCO5Lit5aWW55S757q/XG4gICAgcm91bmRFbmRlZDpmdW5jdGlvbigpIHtcbiAgICAgICAgLy/lt6blj7Ppg73kuI3og73ngrlcbiAgICAgICAgdGhpcy5yaWdodFNldENsaWNrKHRydWUpO1xuICAgICAgICB0aGlzLmxlZnRTZXRDbGljayh0cnVlKTtcbiAgICAgICAgdGhpcy5saW5lSW5kZXggPSAwO1xuICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAyKXtcbiAgICAgICAgICAgIHRoaXMubV9vcmRlclJlc3VsdCA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5vcmRlclJlc3VsdFswXTtcbiAgICAgICAgICAgIGlmKHRoaXMubV9ncmVhdEdhbWVIYXNGaW5pc2hlZE9uZVBhcnQgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5tX29yZGVyUmVzdWx0ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnJlY292ZXJEYXRhLm9yZGVyUmVzdWx0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubV9vcmRlclJlc3VsdCA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuQmV0UmVzdWx0Lm9yZGVyUmVzdWx0WzBdO1xuICAgICAgICAgICAgaWYodGhpcy5tX2dyZWF0R2FtZUhhc0ZpbmlzaGVkT25lUGFydCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1fb3JkZXJSZXN1bHQgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkJldFJlc3VsdC5vcmRlclJlc3VsdFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1fZ2FtZU1vZGVsID09IDMpey8v5aSn5Liw5pS25bu26L+fMuenklxuICAgICAgICAgICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjAsIDEuMCk7XG4gICAgICAgICAgICAgbGV0IHNjYWxlVG8yID0gY2Muc2NhbGVUbygwLjIsIDAsIDApO1xuICAgICAgICAgICAgIHRoaXMuZ3JlYXRNb2RlbExheWVyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShzY2FsZVRvMSxjYy5kZWxheVRpbWUoMiksc2NhbGVUbzIpKTtcbiAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmRlbGF5R3JlYXRNb2RlbCwgMi41KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgdGhpcy51cGRhdGFGcm9udExpc3QoKTtcbiAgICAgICAgICAgICBpZih0aGlzLmlzUXVpY2tseUVuZCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb25leSgpO1xuICAgICAgICAgICAgICAgICB0aGlzLmp1ZGdlRnJlZUFuZEdyZWF0R2FtZSgpO1xuICAgICAgICAgICAgICAgICB0aGlzLmlzUXVpY2tseUVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXdhcmQoKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsYXlHcmVhdE1vZGVsOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudXBkYXRhRnJvbnRMaXN0KCk7XG4gICAgICAgIGlmKHRoaXMuaXNRdWlja2x5RW5kID09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5zZXRNb25leSgpO1xuICAgICAgICAgICAgdGhpcy5qdWRnZUZyZWVBbmRHcmVhdEdhbWUoKTtcbiAgICAgICAgICAgIHRoaXMuaXNRdWlja2x5RW5kID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJldEluZm8ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnNob3dSZXdhcmQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+WPmOaNouWunumZhea7muWKqOWxguWSjOS4reWlluWxglxuICAgIHVwZGF0YUZyb250TGlzdDpmdW5jdGlvbigpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHVuaXQgPSB0aGlzLnBBcnJheVtpXTtcbiAgICAgICAgICAgIHVuaXQuZ2V0Q29tcG9uZW50KFVuaXQpLmhpZGRsZUN1YmUoKTtcbiAgICAgICAgICAgIHVuaXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmV3YXJkQ3ViZUxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHJld2FyZEN1YmUgPSB0aGlzLnJld2FyZEN1YmVMaXN0W2ldO1xuICAgICAgICAgICAgcmV3YXJkQ3ViZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV3YXJkQ3ViZS5nZXRDb21wb25lbnQoY3ViZVMpLnN0b3BBbmkoKTtcbiAgICAgICAgfVxuICAgICB9LFxuXG4gICAgLy/kuK3lpZbnlLvnur9cbiAgICBkcmF3TGluZTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYXJyYXkgPSB0aGlzLm1fb3JkZXJSZXN1bHRbdGhpcy5saW5lSW5kZXhdLmxvY2F0aW9ucztcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMubGluZUdyYXBoaWM7XG4gICAgICAgIGN0eC5jbGVhcigpO1xuICAgICAgICBjdHgubW92ZVRvKHRoaXMubGluZUxpc3RbYXJyYXlbMF1dLngsIHRoaXMubGluZUxpc3RbYXJyYXlbMF1dLnkpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDEgOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLmxpbmVMaXN0W2FycmF5W2ldXS54LCB0aGlzLmxpbmVMaXN0W2FycmF5W2ldXS55KTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSxcblxuICAgIGluaXRNb25leTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZnJlZUdhbWVMZWZ0VGltZXMgPSAwO1xuICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAyKXtcbiAgICAgICAgICAgIGZyZWVHYW1lTGVmdFRpbWVzID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnJlY292ZXJEYXRhLmZyZWVHYW1lTGVmdFRpbWVzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZyZWVHYW1lTGVmdFRpbWVzID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5CZXRSZXN1bHQuZnJlZUdhbWVMZWZ0VGltZXNcbiAgICAgICAgfVxuICAgICAgICBpZihmcmVlR2FtZUxlZnRUaW1lcyA+IDAgfHwoZnJlZUdhbWVMZWZ0VGltZXMgPT0gMCAmJiB0aGlzLm1fZnJlZVN0ZXAgPiAxKSl7XG4gICAgICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAyKXsvL+aBouWkjeaooeW8j1xuICAgICAgICAgICAgICAgICB0aGlzLmRvdSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5ib251c0Ftb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLm1fZ3JlYXRHYW1lSGFzRmluaXNoZWRPbmVQYXJ0ID09IHRydWUpe1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3UgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7Ly/mgaLlpI3mlbDmja7nu5PnrpdcbiAgICAgICAgICAgICAgICBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQucmVjb3ZlckRhdGEucmVjb3ZlclR5cGUgPT0gMzIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5ib251c0Ftb3VudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kb3UgPiAwKXtcbiAgICAgICAgICAgIHRoaXMuYmV0SW5mby5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5iZXRJbmZvLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iZXRJbmZvLnN0cmluZyA9IFwi57Sv6K6h5Lit5aWWXCIrIHRoaXMuZG91ICsgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmN1cnJlbmN5O1xuICAgIH0sXG4gICAgYWRkTW9uZXk6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5kb3UgKz0gdGhpcy5tX29yZGVyUmVzdWx0W3RoaXMubGluZUluZGV4XS5hbW91bnQ7XG4gICAgICAgIGlmKHRoaXMuZG91ID4gMCApe1xuICAgICAgICAgICAgdGhpcy5iZXRJbmZvLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYmV0SW5mby5zdHJpbmcgPSBcIue0r+iuoeS4reWlllwiKyB0aGlzLmRvdSArICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3k7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1Jld2FyZDogZnVuY3Rpb24oc2VuZGVyKXtcbiAgICAgICAgLy/nvLrlpLHlhajlsY/lpKflpZbnmoTliKTmlq1cbiAgICAgICAgaWYodGhpcy5tX2dhbWVNb2RlbCA9PSA0KXtcbiAgICAgICAgICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjAsIDEuMCk7XG4gICAgICAgICAgICBsZXQgc2NhbGVUbzIgPSBjYy5zY2FsZVRvKDAuMiwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmdyZWF0TW9kZWxMYXllci5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGVUbzEsY2MuZGVsYXlUaW1lKDIpLHNjYWxlVG8yKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmp1ZGdlRnJlZUFuZEdyZWF0R2FtZSwgMi41KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgbnVtID0gdGhpcy5tX29yZGVyUmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgICAgIC8v5Lit5aWWXG4gICAgICAgICAgICBpZihudW0gPiAwKXtcbiAgICAgICAgICAgICAgICAvL+aJk+W8gOW/q+mAn+i3s+i/h+WKqOeUu+WKn+iDvSDpnZ7oh6rliqjmuLjmiI9cbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9GbGFnID09IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRMYWJlbC5zdHJpbmcgPSBcIuW/q+mAn+WBnOatolwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUXVpY2tQYXNzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRTZXRDbGljayhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY292ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdmVyLnpJbmRleCA9IDE4O1xuICAgICAgICAgICAgICAgIHRoaXMubGlnaHRMYXllci56SW5kZXggPSAxOTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdMaW5lKCk7ICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm1fb3JkZXJSZXN1bHRbdGhpcy5saW5lSW5kZXhdLmxvY2F0aW9ucztcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gdGhpcy5tX29yZGVyUmVzdWx0W3RoaXMubGluZUluZGV4XS5udW07Ly/kuK3lpZbov57nur/liqjniankuKrmlbBcbiAgICBcbiAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IDAuMDU7Ly8wLjA0NTQ1O1xuICAgICAgICAgICAgICAgIGxldCBkeTEgPSBzcGFuICogNjsgIFxuICAgICAgICAgICAgICAgIGxldCBzYzEgPSBzcGFuICogODtcbiAgICAgICAgICAgICAgICBsZXQgZHlUID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgbWF4ID0gMDtcblxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2wgPSBhcnJheVtpXSAlIDU7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGNvbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6Ly/nrKzkuIDmjpJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1heCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXggPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeVQgPSBkeTEgKyBzYzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobWF4IDwgMil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5VCA9IGR5MSAqIDIgKyBzYzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1heCA8IDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXggPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeVQgPSBkeTEgKiAzICsgc2MxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtYXggPCA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHlUID0gZHkxICogNCArIHNjMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhID0gdGhpcy5mcm9udExpc3RbYXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICBwYS56SW5kZXggPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGx0ID0gdGhpcy5saWdodExpc3RbYXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICBsdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUxID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbyhzcGFuLCAwLjg3NSksIGNjLnNjYWxlVG8oc3BhbiAqIDMsIDEuNDYpLmVhc2luZyhjYy5lYXNlRXhwb25lbnRpYWxPdXQoKSksIGNjLnNjYWxlVG8oc3BhbiAqIDIsIDEuMjQpLCBjYy5zY2FsZVRvKHNwYW4sIDEuMzUpLCBjYy5zY2FsZVRvKHNwYW4sIDEuMSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUyID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbyhzcGFuLCAwLjg3NSksIGNjLnNjYWxlVG8oc3BhbiAqIDMsIDEuNDYpLmVhc2luZyhjYy5lYXNlRXhwb25lbnRpYWxPdXQoKSksIGNjLnNjYWxlVG8oc3BhbiAqIDIsIDEuMjQpLCBjYy5zY2FsZVRvKHNwYW4sIDEuMzUpLCBjYy5zY2FsZVRvKHNwYW4sIDEuMSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gYXJyYXlbaV0gJSA1O1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChjb2wpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOi8v56ys5LiA5o6SXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYS5ydW5BY3Rpb24oc2NhbGUxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdC5ydW5BY3Rpb24oc2NhbGUyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKGR5MSksIHNjYWxlMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGx0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoZHkxKSwgc2NhbGUyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiAyKSwgc2NhbGUxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiAyKSwgc2NhbGUyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiAzKSwgc2NhbGUxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiAzKSwgc2NhbGUyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiA0KSwgc2NhbGUxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkeTEgKiA0KSwgc2NhbGUyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc2hvd2xpZ2h0TGlzdCwgZHlUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5qdWRnZUZyZWVBbmRHcmVhdEdhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93bGlnaHRMaXN0OiBmdW5jdGlvbigpe1xuICAgICAgICAvL+WKoOmSsVxuICAgICAgICB0aGlzLmFkZE1vbmV5KCk7ICAgIFxuICAgICAgICBsZXQgc3BhbiA9IDAuMDQ1ICogNTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5yZXNldCwgc3BhbiAqIDYpO1xuICAgIH0sXG5cbiAgICBkb05leHRUaGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2hvd1Jld2FyZCgpO1xuICAgIH0sXG5cbiAgICAvL+e7k+eul+a4uOaIj1xuICAgIHJld2FyZEdhbWU6ZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjAsIDEuMCk7XG4gICAgICAgIGxldCBzY2FsZVRvMiA9IGNjLnNjYWxlVG8oMC4yLCAwLCAwKTtcbiAgICAgICAgdmFyIGFtb3VudCA9ICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLlJld2FyZFJlc3VsdC5ib251c0Ftb3VudDtcbiAgICAgICAgaWYoYW1vdW50ID09IDApe1xuICAgICAgICAgICAgLy/mlrDkv67mlLkg5pyq5Lit5aWW5LiN5YaN5pi+56S6IOacquS4reWlluaPkOekulxuICAgICAgICAgICAgLy90aGlzLnRvYXN0Tm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGVUbzEsIGNjLmRlbGF5VGltZSgyKSwgc2NhbGVUbzIpKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucmVzZXRHYW1lLCAyKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLm1fZ2FtZU1vZGVsID09IDQpe1xuICAgICAgICAgICAgICAgIHZhciBzY2FsZTExID0gY2Muc2NhbGVUbygwLjIsIHRoaXMuc2NhbGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsUmV3YXJkTGFiZWwuc3RyaW5nID0gXCLkuK1cIithbW91bnQrIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5jdXJyZW5jeTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxSZXdhcmROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShzY2FsZTExLCBjYy5kZWxheVRpbWUoMiksIHNjYWxlVG8yKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5yZXNldEdhbWUsIDIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBcIuS4rVwiK2Ftb3VudCsgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmN1cnJlbmN5O1xuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGVUbzEsIGNjLmRlbGF5VGltZSgyKSwgc2NhbGVUbzIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnJlc2V0R2FtZSwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3BpbmVBbmlOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNwaW5lQW5pTm9kZS5nZXRDb21wb25lbnQoJ1dpbkFuaScpLmFuaVN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnN0b3BTcGluZUFuaSwgMy41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHsvL+a0u+WKqFxuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnRocm93VGltZXIoJ3JvdW5kQ29tcGxldGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/liqjnlLtcbiAgICBzdG9wU3BpbmVBbmk6ZnVuY3Rpb24oKXtcbiAgICAgICAgIHRoaXMuc3BpbmVBbmlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgIC8v5Y2V5Liq5Yqo55S75LmL5ZCO6YeN572uXG4gICAgcmVzZXQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX29yZGVyUmVzdWx0W3RoaXMubGluZUluZGV4XS5sb2NhdGlvbnM7XG4gICAgICAgIGxldCBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICBsZXQgbHQgPSB0aGlzLmxpZ2h0TGlzdFthcnJheVtpXV07XG4gICAgICAgICAgICBsdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBwYSA9IHRoaXMuZnJvbnRMaXN0W2FycmF5W2ldXTtcbiAgICAgICAgICAgIHBhLnNldFNjYWxlKDEpO1xuICAgICAgICAgICAgcGEuekluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdmVyLnpJbmRleCA9IDE7XG4gICAgICAgIHRoaXMuY292ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWMuY2xlYXIoKTsgICAgICAgIFxuICAgICAgICArK3RoaXMubGluZUluZGV4O1xuICAgICAgICBsZW4gPSB0aGlzLm1fb3JkZXJSZXN1bHQubGVuZ3RoO1xuICAgICAgICBpZih0aGlzLmlzUXVpY2tseUVuZCA9PSB0cnVlKXtcbiAgICAgICAgICAgIHRoaXMuc2V0TW9uZXkoKTsvL+e0r+iuoeS4reixhuWKoOS4ilxuICAgICAgICAgICAgdGhpcy5saW5lSW5kZXggPSBsZW47XG4gICAgICAgICAgICB0aGlzLmlzUXVpY2tseUVuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubGluZUluZGV4IDwgbGVuKXtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0VGhpbmcoKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Ly/mnIDlkI7liKTmlq3mnInmsqHmnInlhY3otLnmuLjmiI/lkozlpKfkuLDmlLZcbiAgICAgICAgICAgIHRoaXMuaXNRdWlja2x5RW5kID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmp1ZGdlRnJlZUFuZEdyZWF0R2FtZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldE1vbmV5OmZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1fb3JkZXJSZXN1bHQubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSB0aGlzLmxpbmVJbmRleDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuZG91ICs9IHRoaXMubV9vcmRlclJlc3VsdFtpXS5hbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kb3UgPiAwICl7XG4gICAgICAgICAgICB0aGlzLmJldEluZm8ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iZXRJbmZvLnN0cmluZyA9IFwi57Sv6K6h5Lit5aWWXCIrIHRoaXMuZG91ICsgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmN1cnJlbmN5O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGp1ZGdlRnJlZUFuZEdyZWF0R2FtZTpmdW5jdGlvbigpe1xuICAgICAgICAvLy4uLi7liKTmlq3mnKzova7kuK3mmK/lkKbmnInlhY3otLnmuLjmiI9cbiAgICAgICAgdmFyIGZyZWVHYW1lTGVmdFRpbWVzID0gMDtcbiAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7XG4gICAgICAgICAgICBmcmVlR2FtZUxlZnRUaW1lcyA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5mcmVlR2FtZUxlZnRUaW1lcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmcmVlR2FtZUxlZnRUaW1lcyA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuQmV0UmVzdWx0LmZyZWVHYW1lTGVmdFRpbWVzXG4gICAgICAgIH1cbiAgICAgICAgLy/liKTmlq3lpKfkuLDmlLbmmK/lkKbnu5PmnZ8g5Y+Y5oiQ5pmu6YCa5ri45oiP5Yik5patIDAgMSAyXG4gICAgICAgIGlmKHRoaXMubV9ncmVhdEdhbWVIYXNGaW5pc2hlZE9uZVBhcnQgPT0gdHJ1ZSl7XG4gICAgICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvL+mmluWFiOWIpOaWreWkp+S4sOaUtiDlpKfkuLDmlLbkvJjlhYjnuqfmnIDpq5hcbiAgICAgICAgaWYodGhpcy5tX2dhbWVNb2RlbCA9PSAzKXtcbiAgICAgICAgICAgIHRoaXMubV9ncmVhdEdhbWVIYXNGaW5pc2hlZE9uZVBhcnQgPSB0cnVlO1xuICAgICAgICAgICAgLy/lpKfkuLDmlLbkuIvkuIDova5cbiAgICAgICAgICAgIHRoaXMuc2V0R3JlYXRHYW1lTW9kZWxBbmRVbml0RGF0YSgpO1xuICAgICAgICB9ZWxzZXsvL+aZrumAmua4uOaIjyAwIDEgMlxuICAgICAgICAgICAgaWYoZnJlZUdhbWVMZWZ0VGltZXMgPiAwKXtcbiAgICAgICAgICAgICAgICAvL+WIpOaWreWFjei0uea4uOaIj+S4reaYr+WQpuacieWlluaxoOWlllxuICAgICAgICAgICAgICAgIGlmKHRoaXMubV9nYW1lTW9kZWwgPT0gNCl7XG4gICAgICAgICAgICAgICAgICAgIC8v5Yqg6ZKxXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG91ICs9IHRoaXMubV9vcmRlclJlc3VsdFswXS5hbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmV0SW5mby5zdHJpbmcgPSBcIue0r+iuoeS4reWlllwiKyB0aGlzLmRvdSArICBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3k7XG4gICAgICAgICAgICAgICAgICAgIC8v5o+Q56S65Lit5aSa5bCR6ZKxXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZVRvMSA9IGNjLnNjYWxlVG8oMC4yLCAxLjAsIDEuMCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZVRvMiA9IGNjLnNjYWxlVG8oMC4yLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsUmV3YXJkTGFiZWwuc3RyaW5nID0gXCLkuK1cIit0aGlzLm1fb3JkZXJSZXN1bHRbMF0uYW1vdW50KyBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3k7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbFJld2FyZE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlVG8xLCBjYy5kZWxheVRpbWUoMiksIHNjYWxlVG8yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5by55Ye65o+Q56S65qGGIOWFjei0uea4uOaIj1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZyZWVNb2RlbExheWVyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL+WmguaenOacieWkp+S4sOaUtiDlgZzmraLlpKfkuLDmlLbnibnmrorliqjnlLtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXdhcmRDdWJlTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkQ3ViZUxpc3RbaV0uZ2V0Q29tcG9uZW50KGN1YmVTKS5zdG9wQW5pKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v6LCD57uT566XXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZXdhcmQoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gIFxuICAgIH0sXG5cbiAgICBzaG93RnJlZU1vZGVsTGF5ZXI6ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5tX2ZyZWVMYXllclNob3dPbmNlID09IGZhbHNlKXtcbiAgICAgICAgICAgIHZhciBmcmVlR2FtZUxlZnRUaW1lcyA9IDA7XG4gICAgICAgICAgICBpZih0aGlzLmVyckRpYWxvZ1RhZyA9PSAyKXtcbiAgICAgICAgICAgICAgICBmcmVlR2FtZUxlZnRUaW1lcyA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5mcmVlR2FtZUxlZnRUaW1lcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGZyZWVHYW1lTGVmdFRpbWVzID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5CZXRSZXN1bHQuZnJlZUdhbWVMZWZ0VGltZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyZWVNb2RlbExhYmVsLnN0cmluZyA9IFwiXCIgKyBmcmVlR2FtZUxlZnRUaW1lcyArIFwi5qyhXCI7XG4gICAgICAgICAgICBsZXQgc2NhbGVUbzEgPSBjYy5zY2FsZVRvKDAuMiwgMS4wLCAxLjApO1xuICAgICAgICAgICAgbGV0IHNjYWxlVG8yID0gY2Muc2NhbGVUbygwLjIsIDAsIDApO1xuICAgICAgICAgICAgdGhpcy5mcmVlTW9kZWxMYXllci5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGVUbzEsY2MuZGVsYXlUaW1lKDIpLHNjYWxlVG8yKSk7XG4gICAgICAgICAgICB0aGlzLnNoYWtlRWdnKCk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmZyZWVHYW1lTW9kZWxEZWxheSwgMi41KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZWdnQXJyYXkgPSBudWxsO1xuICAgICAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7XG4gICAgICAgICAgICAgICAgZWdnQXJyYXkgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQucmVjb3ZlckRhdGEuZnJlZVJlc3VsdFswXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVnZ0FycmF5ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5CZXRSZXN1bHQuZnJlZVJlc3VsdFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVnZ0FycmF5ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hha2VFZ2coKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmZyZWVHYW1lTW9kZWxEZWxheSwgMik7ICAgXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmZyZWVHYW1lTW9kZWxEZWxheSwgMC4wMSk7ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hha2VFZ2c6ZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVnZ0FycmF5ID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5lcnJEaWFsb2dUYWcgPT0gMil7XG4gICAgICAgICAgICBlZ2dBcnJheSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5yZWNvdmVyRGF0YS5mcmVlUmVzdWx0WzBdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGVnZ0FycmF5ID0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5CZXRSZXN1bHQuZnJlZVJlc3VsdFswXTtcbiAgICAgICAgfVxuICAgICAgICBpZihlZ2dBcnJheSAhPSBudWxsKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlZ2dBcnJheS5sb2NhdGlvbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGVnZ0FycmF5LmxvY2F0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcmV3YXJkQ3ViZSA9IHRoaXMuZnJvbnRMaXN0W2luZGV4XTtcbiAgICAgICAgICAgICAgICByZXdhcmRDdWJlLmdldENvbXBvbmVudChjdWJlUykuc2hha2VFZ2coKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmZyZWVHYW1lTW9kZWxEZWxheSwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZnJlZUdhbWVNb2RlbERlbGF5OmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuZnJlZUdhbWVNb2RlbCgpO1xuICAgICAgICB0aGlzLmdldElzTG9naW4oKTtcbiAgICB9LFxuXG4gICAgLy/kuIvova7muLjmiI/liJ3lp4vljJZcbiAgICByZXNldEdhbWU6ZnVuY3Rpb24oKSB7XG4gICAgICAgIC8v5Lit6Ze055S757q/5bGCYWN0aXZlIGZhbHNlXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnJld2FyZEN1YmVMaXN0Lmxlbmd0aDsgaSsrKXsgXG4gICAgICAgICAgICB2YXIgY3ViZSA9IHRoaXMucmV3YXJkQ3ViZUxpc3RbaV07XG4gICAgICAgICAgICBjdWJlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8v5rua5YqoY3ViZeWxguaYvuekulxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHVuaXQgPSB0aGlzLnBBcnJheVtpXTtcbiAgICAgICAgICAgIHVuaXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvdSA9IDA7XG4gICAgICAgIHRoaXMuc3RhdGVfZ2FtZWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fZ3JlYXRHYW1lSGFzRmluaXNoZWRPbmVQYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9mcmVlTGF5ZXJTaG93T25jZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fZnJlZVN0ZXAgPSAxO1xuICAgICAgICB0aGlzLm1fZ2FtZU1vZGVsID0gMDtcbiAgICAgICAgdGhpcy5yaWdodEJldCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZnJlZVRpdGxlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZih0aGlzLmF1dG9GbGFnID09IDEpey8v6Ieq5Yqo5ri45oiP5qih5byPXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2V0Q2xpY2soZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5hdXRvSW5kZXgtLTtcbiAgICAgICAgICAgIHRoaXMuYXV0b1RpbWVzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBsZWZ0VGltZXMgPSB0aGlzLmF1dG9MaW1pdCAtIHRoaXMuYXV0b0luZGV4ICsgMTtcbiAgICAgICAgICAgIHRoaXMuYXV0b1RpbWVzLnN0cmluZyA9IFwi56ysXCIrbGVmdFRpbWVzK1wi5qyhXCI7XG4gICAgICAgICAgICBpZih0aGlzLmF1dG9JbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9DYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNRdWlja1Bhc3NGdW5jdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdExhYmVsLnN0cmluZyA9IFwi546pMeasoVwiOyAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5iZXRTZXRDbGljayhmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2lzUXVpY2tTdG9wQnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0U2V0Q2xpY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdFNldENsaWNrKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJlVEluZm8oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXNMb2dpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNRdWlja1Bhc3NGdW5jdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZWZ0TGFiZWwuc3RyaW5nID0gXCLnjqkx5qyhXCI7ICAgICBcbiAgICAgICAgICAgIHRoaXMuYmV0U2V0Q2xpY2soZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tX2lzUXVpY2tTdG9wQnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmlnaHRTZXRDbGljayhmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmxlZnRTZXRDbGljayhmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJlVEluZm8oKTtcbiAgICAgICAgfSAgICAgICBcbiAgICB9LFxuXG4gICAgLy90cnVlIOS4jeiDveeCueWHu1xuICAgIHJpZ2h0U2V0Q2xpY2s6ZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIHRoaXMucmlnaHROb3RUb3VjaC5hY3RpdmUgPSBmbGFnO1xuICAgICAgICB0aGlzLnJpZ2h0QnQuYWN0aXZlID0gIWZsYWc7XG4gICAgICAgIHRoaXMucmlnaHRHcmF5LmFjdGl2ZSA9IGZsYWc7XG4gICAgfSxcblxuICAgIGxlZnRTZXRDbGljazpmdW5jdGlvbihmbGFnKXtcbiAgICAgICAgdGhpcy5sZWZ0Tm90VG91Y2guYWN0aXZlID0gZmxhZztcbiAgICAgICAgdGhpcy5sZWZ0QnQuYWN0aXZlID0gIWZsYWc7XG4gICAgICAgIHRoaXMubGVmdEdyYXkuYWN0aXZlID0gZmxhZztcbiAgICB9LFxuICAgIC8v5oqV5rOo5Yy65Z+f5LiN6IO954K5XG4gICAgYmV0U2V0Q2xpY2s6ZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIHZhciBiZXROb3RUb3VjaCA9IGNjLmZpbmQoXCJDYW52YXMvYmV0QXJlYS9iZXROb3RUb3VjaFwiKTtcbiAgICAgICAgYmV0Tm90VG91Y2guYWN0aXZlID0gZmxhZztcbiAgICAgICAgdGhpcy5saW5lQnQuYWN0aXZlID0gIWZsYWc7XG4gICAgICAgIHRoaXMubGluZUdyYXkuYWN0aXZlID0gZmxhZztcbiAgICAgICAgdGhpcy5wcmljZUdyb3VwTm9kZS5nZXRDb21wb25lbnQoUHJpY2VHcm91cCkuYmV0UHJpY2VTZXRFbmFibGUoZmxhZyk7XG4gICAgfSxcblxuICAgIC8v5pu05paw55So5oi35L2Z6aKd5L+h5oGvXG4gICAgdXBkYXRlVXNlckluZm86ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCFDQ19KU0Ipe1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsudXBkYXRlVXNlckluZm8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKioqKioqKioqKioqKioqKua3mOWuneebuOWFsyoqKioqKioqKioqKioqKiovXG4gICAgICAvL+S9memineWIpOaWrVxuICAgIGp1ZGdlQmFsYW5jZTogZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGZnID0gdHJ1ZTtcblxuICAgICAgICBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLmJhbGFuY2UgPT0gLTEpe1xuICAgICAgICAgICAgLy8gdGhpcy5ibGFja0xheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvLyB0aGlzLndlbmhhb0RpYS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjIsIDEuMCwgMS4wKSk7XG4gICAgICAgICAgICBmZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoICh0aGlzLm1fcHJpY2UgKiB0aGlzLm1fbGluZSkgPiBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLmJhbGFuY2Upe1xuICAgICAgICAgICAgaWYgKCFDQ19KU0Ipe1xuICAgICAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VUb2FzdEp1ZGdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubV9nYW1lTW9kZWwgIT0gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESy5yZWNoYXJnZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZnID0gZmFsc2U7XG4gICAgICAgICAgICBpZih0aGlzLmF1dG9GbGFnID09IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgLy/oh6rliqjmuLjmiI/pkrHkuI3lpJ/kuoblgZzmraLoh6rliqhcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c5piv5YWN6LS55ri45oiPIOWImeS4jemcgOimgeWIpOaWreS9meminVxuICAgICAgICBpZih0aGlzLm1fZ2FtZU1vZGVsID09IDIpe1xuICAgICAgICAgICAgZmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZztcbiAgICB9LFxuXG4gICAgICAgLy9cbiAgICAgICBzZXRUYW9iYW9TREs6ZnVuY3Rpb24oKXtcbiAgICAgICAgLyoqKioqKioqKioqKioqKioqKirmt5jlrp3nm7jlhbMqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgXG4gICAgICAgLy8gIC8qKlxuICAgICAgIHZhciBzZGsgPSB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESztcbiAgICAgICBcbiAgICAgICAvL3VzZXIgaWNvblxuICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgXG4gICAgICAgICAgIHRoaXMuc2RrVWlkID0gLTE7XG4gICAgICAgICAgIFxuICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7ICAgICAgICAgICAgXG4gICAgICAgICAgIC8vIOeUseS6juWcqOe7keWumuaXtuWPr+iDveW3sue7j+inpuWPkei/h+ivpeS6i+S7tu+8jOWPr+S7peWFiOiOt+WPluS4gOS4i1xuICAgICAgICAgICBpZiAoc2RrKSB7XG4gICAgICAgICAgICAgICAvLyB0aGlzLnRlc3RCdXQxLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICBzZGsuZ2V0VXNlckluZm8oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIHZhciB1aWQgPSB1c2VyLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIG5pY2sgPSB1c2VyLm5pY2s7XG4gICAgICAgICAgICAgICAgICAgICAgIHZhciBmZWUgPSB1c2VyLmZlZTtcblxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZGtVaWQgJiYgc2VsZi5zZGtVaWQgIT0gdWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNka0JhbGFuY2UgPSBmZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNka1VpZCA9IHVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgLy9lbmQgdXNlcmljb25cblxuICAgICAgICAgICAgICAgLy9vcmRlclxuICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FzaW5vOmNsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAvLyBlLmRhdGEg5Lit5YyF5ZCr5LqG6KaB5Lyg6YCS55qE5omA5pyJ5pWw5o2u77yM5L6L5aaC55So5oi35L2Z6aKd5Li6IGUuZGF0YS5mZWVcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXNpbm86Y2xpY2tcIitlLmRhdGEudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmKGUuZGF0YS50eXBlID09ICdvcmRlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkay5pc0xvZ2luKGZ1bmN0aW9uKGlzTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzTG9naW4g5Li6IHRydWUg5Li655m75b2VIO+8jGZhbHNlIOS4uuacqueZu+W9lVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNMb2dpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5oZWxwU2hvd0ZsYWcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ID0gc2VsZi5oZWxwTm9kZS5nZXRDb21wb25lbnQoXCJIZWxwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3QuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5vcmRlclNob3dGbGFnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JkZXJGbGFnXCIsIHNlbGYub3JkZXJGbGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9yZGVyRmxhZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRPcmRlckxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuIG5vdCBvcmRlciBzb21ldGhpbmfvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgczEgPSBzZWxmLm9yZGVyTm9kZS5nZXRDb21wb25lbnQoXCJKaWx1TGlzdFNjcmlwdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ29Mb2dpbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoZS5kYXRhLnR5cGUgPT0gJ3J1bGUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzMSA9IHNlbGYuaGVscE5vZGUuZ2V0Q29tcG9uZW50KFwiSGVscFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5vcmRlclNob3dGbGFnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3QgPSBzZWxmLm9yZGVyTm9kZS5nZXRDb21wb25lbnQoXCJKaWx1TGlzdFNjcmlwdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZighTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5oZWxwU2hvd0ZsYWcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYucnVsZUhhc1Nob3dPbmNlID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndhaXRMYXllci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzMS5kb3duSGVscCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBydWxlRmxhZ1wiLCBzZWxmLm9yZGVyRmxhZyk7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9yZGVyRmxhZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRSdWxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbiBub3QgcnVsZSBzb21ldGhpbmfvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zMS5pbml0SGVscCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzMS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzpiYWNrJywgZnVuY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXNpbm86YmFja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5lcnJEaWFsb2dUYWcgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV4aXRHYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zdGF0ZV9nYW1laW5nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJsYWNrTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJhY2tMYXllci5zY2FsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlVG8xID0gY2Muc2NhbGVUbygwLjIsIDEuMiwgMS4yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVUbzIgPSBjYy5zY2FsZVRvKDAuMSwgMS4wLCAxLjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmFja0xheWVyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShzY2FsZVRvMSwgc2NhbGVUbzIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhpdEdhbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAvL+eql+WPo+a/gOa0u+S6i+S7tu+8jOW9kyBBcHAg5LuO5ZCO5Y+w5YiH5Zue5Yiw5YmN5Y+w5pe25Lya6Kem5Y+RXG4gICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FzaW5vOnJlc3VtZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXNpbm86cmVzdW1lXCIpO1xuICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAvL+S9memineacieWPmOWMluiAjOS4lOaYr+acqueZu+W9leeKtuaAge+8jOebkeWQrOWQjuWOu2ZyZXNo5Yid5aeL5YyW5Yi35paw77yIc2VsZi5zZGtVaWQgIT0gdWlk77yJ5Y+q5Luj6KGo5piv5ZCm55m75b2V77yM5LiN5Luj6KGo5piv5LiN5piv5ZCM5LiA5Liq55So5oi3KDIwMTctMDMtMjQgcG06NTMwKVxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzp1cGRhdGVVc2VyQmFsYW5jZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZS5kYXRhIOS4reWMheWQq+S6huimgeS8oOmAkueahOaJgOacieaVsOaNru+8jOS+i+WmgueUqOaIt+S9memineS4uiBlLmRhdGEuZmVlXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FzaW5vOnVwZGF0ZVVzZXJCYWxhbmNlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICB2YXIgdWlkID0gZS5kYXRhLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIG5pY2sgPSBlLmRhdGEubmljaztcbiAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZlZSA9IGUuZGF0YS5mZWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2RrVWlkICE9PSBudWxsICYmIHNlbGYuc2RrVWlkICE9IHVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi5zaG93VXNlckljb24odWlkLCBuaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FzaW5vOnVwZGF0ZVVzZXJCYWxhbmNlIGZpcnN0IGxvZ2luISEgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZGtVaWQgPSB1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5iYWxhbmNlID0gZmVlO1xuICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNka0JhbGFuY2UgPSBmZWU7ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgIC8vc2RrLnRocm93VGltZXIoJ2luaXRpYWxpemUnKTsvL+a0u+WKqFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICB9XG4gICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICB0aGlzLnNka0JhbGFuY2UgPSAxMDAwMDtcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgICBlbHNle1xuICAgICAgICAgICB0aGlzLnNka0JhbGFuY2UgPSAxMDAwMDtcbiAgICAgICB9XG4gICB9LFxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5reY5a6d55u45YWzKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvL+ivt+WIt+aWsOmhtemdolxuICAgIGZyZXNoOmZ1bmN0aW9uKClcbiAgICB7ICAgXG4gICAgICAgIHZhciBpbml0UmVzdWx0PSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQ7XG4gICAgICAgIGlmKGluaXRSZXN1bHQpe1xuICAgICAgICAgICAgdGhpcy5tYXJrR2V0SW5pdEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5oaWRlV2FpdExheWVyKHRydWUpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuZ2V0UG9vbCk7XG4gICAgICAgICAgICB0aGlzLm9yZGVyRmxhZyA9IHRydWU7XG4gICAgICAgICAgICBpZih0aGlzLmF1dG9GbGFnID09IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xuICAgICAgICAgICAgdGhpcy5nZXRJbml0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZyZXNoIFVJXCIpOy8vXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoYXMgbm90IGZyZXNoXCIpOy8vXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8vICAvKlxuICAgICBcbiAgICAvL+mAgOWHuua4uOaIj1xuICAgIGV4aXRHYW1lOiBmdW5jdGlvbigpe1xuICAgICAgICAvLyB0aGlzLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmdldFBvb2wpO1xuXG4gICAgICAgICBjb25zb2xlLmxvZyhcImV4aXRHYW1lXCIpO1xuICAgICAgICAgXG4gICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnBvcFdpbmRvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpcmVjdG9yLmxvYWRTY2VuZVwiKTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFVuaXRTcGVjaWFsTW9kZWw6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5wQXJyYXlbMV0uZ2V0Q29tcG9uZW50KFVuaXQpLnNldElzU3BlY2lhbE1vZGVsKHRydWUpO1xuICAgICAgICB0aGlzLnBBcnJheVsyXS5nZXRDb21wb25lbnQoVW5pdCkuc2V0SXNTcGVjaWFsTW9kZWwodHJ1ZSk7XG4gICAgICAgIHRoaXMucEFycmF5WzNdLmdldENvbXBvbmVudChVbml0KS5zZXRJc1NwZWNpYWxNb2RlbCh0cnVlKTtcbiAgICAgICAgdGhpcy5wQXJyYXlbNF0uZ2V0Q29tcG9uZW50KFVuaXQpLnNldElzU3BlY2lhbE1vZGVsKHRydWUpO1xuICAgIH0sXG4gICAgICAgIFxuICAgIHN0YXJ0OiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoY2MuX3JlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICBjYy5yZW5kZXJlci5lbmFibGVEaXJ0eVJlZ2lvbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ29Mb2dpbjogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIUNDX0pTQil7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgc2RrID0gd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREs7XG5cbiAgICAgICAgICAgIGlmKHNkayl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb2luIHNkayFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2RrLmxvZ2luKGZ1bmN0aW9uKCkgey8v6ZyA6KaB6LCD5Yid5aeL5YyWO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gY2FsbGJhY2shXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICBzZGsudXBkYXRlVXNlckluZm8oKTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiZWZvcmUgZnJlc2ghXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vc2VsZi5mcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyIGZyZXNoIVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGdldElzTG9naW46ZnVuY3Rpb24oKVxuICAgICB7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJnZXRJc0xvZ2luXCIpO1xuICAgICAgICBpZiAoIUNDX0pTQilcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDQ19KU0JcIik7XG4gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICB2YXIgc2RrID0gd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREs7XG4gICAgICAgICAgICBpZiAoc2RrKSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNka1wiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZGsuaXNMb2dpbihmdW5jdGlvbihpc0xvZ2luKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgaWYoIWlzTG9naW4pLy/msqHnmbvlvZXljrvnmbvlvZVcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvTG9naW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ29Mb2dpbigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZWxzZS8v55m75b2V5LqGIOWIpOaWreaYr+WQpuiOt+WPluixhuaIkOWKn1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmt5jlrp0655m76ZmG5LqGXCIpO1xuICAgICAgICAgICAgICAgICAgICAvL+WcqOWIpOaWreaYr+WQpui2s+mine+8iOa3mOWuneebuOWFs++8iSBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWcgPSBzZWxmLmp1ZGdlQmFsYW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihmbGFnKVxuICAgICAgICAgICAgICAgICAgICB7ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldEJldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgeyAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bosYblpLHotKXmiJbogIXlhbbku5blpLHotKVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeacieeZu+mZhua3mOWunSBzdGFydEJldFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJldCgpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RhcnRCZXRcIik7XG4gICAgICAgICAgIHRoaXMuZ2V0QmV0KCk7IFxuICAgICAgICB9XG4gICAgIH0sXG5cblxuICAgICB0ZXN0T3JkZXI6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy50ZXN0KFwib3JkZXJcIik7XG4gICAgIH0sXG5cbiAgICAgdGVzdFJ1bGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy50ZXN0KFwicnVsZVwiKTtcbiAgICAgfSxcblxuICAgICAvL3Rlc3RcbiAgICAgdGVzdDpmdW5jdGlvbih0eXBlKXtcbiAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgIGlmKHR5cGUgPT0gJ29yZGVyJyl7XG4gICAgICAgICAgICBpZigxKXtcbiAgICAgICAgICAgICAgICBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLmhlbHBTaG93RmxhZyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdCA9IHNlbGYuaGVscE5vZGUuZ2V0Q29tcG9uZW50KFwiSGVscFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc3QuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIU5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkub3JkZXJTaG93RmxhZyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXl4gb3JkZXJGbGFnXCIsIHNlbGYub3JkZXJGbGFnKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5vcmRlckZsYWcpXG4gICAgICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0T3JkZXJMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuIG5vdCBvcmRlciBzb21ldGhpbmfvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHMxID0gc2VsZi5vcmRlck5vZGUuZ2V0Q29tcG9uZW50KFwiSmlsdUxpc3RTY3JpcHRcIik7XG4gICAgICAgICAgICAgICAgICAgIHMxLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0xvZ2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlID09ICdydWxlJyl7XG4gICAgICAgICAgICBsZXQgczEgPSBzZWxmLmhlbHBOb2RlLmdldENvbXBvbmVudChcIkhlbHBcIik7ICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkub3JkZXJTaG93RmxhZyl7XG4gICAgICAgICAgICAgICAgbGV0IHN0ID0gc2VsZi5vcmRlck5vZGUuZ2V0Q29tcG9uZW50KFwiSmlsdUxpc3RTY3JpcHRcIik7XG4gICAgICAgICAgICAgICAgc3QuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIU5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuaGVscFNob3dGbGFnKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmLnJ1bGVIYXNTaG93T25jZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53YWl0TGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgczEuZG93bkhlbHAoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgcnVsZUZsYWdcIiwgc2VsZi5vcmRlckZsYWcpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5vcmRlckZsYWcpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0UnVsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW4gbm90IHJ1bGUgc29tZXRoaW5n77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vczEuaW5pdEhlbHAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgczEuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgfSxcbn0pO1xuIiwidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbnZhciBHYW1lID0gcmVxdWlyZShcIkdhbWVcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8v5ri45oiP5biu5YqpXG4gICAgICAgIHVpQmxhY2sgOiBjYy5Ob2RlLFxuICAgICAgICB0ZXN0Tm9kZSA6IGNjLk5vZGUsXG4gICAgICAgIHNjcm9sbFZpZXc6IGNjLk5vZGUsXG4gICAgICAgIGNvbnRlbnQ6IGNjLk5vZGUsXG4gICAgICAgIHZpZXc6IGNjLk5vZGUsXG4gICAgICAgIGxvY2sgOiBmYWxzZSxcbiAgICAgICAgZ2FtZU5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGltZ0FycmF5IDogW2NjLlNwcml0ZV0sXG4gICAgICAgIHNjYWxlVmFsdWU6MSxcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzaXplID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpO1xuICAgICAgICBsZXQgc3NzcyA9ICAoc2l6ZS53aWR0aCAqIDE2NjApICAvKDEwODAgKiBzaXplLmhlaWdodCk7XG4gICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IHNzc3M7XG4gICAgICAgIHRoaXMubmV0RGF0YSA9IE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCk7XG4gICAgICAgIHRoaXMubG9jayA9IHRydWU7XG4gICAgICAgIGxldCBvcmlQMSA9IHRoaXMudGVzdE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgdGhpcy5vcmlZID0gdGhpcy50ZXN0Tm9kZS55IC0gb3JpUDEueTsgICAgIFxuICAgICAgICB2YXIgY2FsbEZ1bmNfMSA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc2UgPSBjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuaGVpZ2h0ID0gc2UuaGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5oZWlnaHQgPSB0aGlzLnNjcm9sbFZpZXcuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMub3JpWSAtIHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQ7ICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm55PVwiICsgdGhpcy5ub2RlLnkpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjEpLCBjYWxsRnVuY18xKSk7XG5cbiAgICAgICAgdGhpcy51aUJsYWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIXRoaXMubG9jayl7XG4gICAgICAgICAgICB0aGlzLnVpQmxhY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgY2FsbDMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpXG4gICAgICAgICAgICB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXREYXRhLmhlbHBTaG93RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMywgY2MudjIoMCwgdGhpcy5vcmlZIC0gdGhpcy5zY3JvbGxWaWV3LmhlaWdodCkpLCBjYWxsMykpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRvd25IZWxwOiBmdW5jdGlvbigpe1xuICAgICAgICBpZihOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkdhbWVSdWxlID09IG51bGwpe1xuICAgICAgICAgICAgY2MubG9nKFwiR2FtZVJ1bGUgaXMgbnVsbCBcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc3B0ID0gdGhpcy5nYW1lTm9kZS5nZXRDb21wb25lbnQoR2FtZSk7XG4gICAgICAgIGxldCByaCA9IDA7XG4gICAgICAgIHZhciByZXMgPSB0aGlzLm5ldERhdGEuR2FtZVJ1bGUuaGVscFJ1bGUucnVsZVBpY3M7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkKHJlcywgbnVsbCwgZnVuY3Rpb24gKGVycm9ycywgcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB1cmwgWycgKyBlcnJvcnNbaV0gKyAnXTogJyArIHJlc3VsdHMuZ2V0RXJyb3IoZXJyb3JzW2ldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MubG9nKFwicmVzdWx0cyBpcyAlJSBcIiwgcmVzdWx0cy5nZXRDb250ZW50Lmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgbGVuID0gc2VsZi5uZXREYXRhLkdhbWVSdWxlLmhlbHBSdWxlLnJ1bGVQaWNzLmxlbmd0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKXsgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgYVRleCA9IHJlc3VsdHMuZ2V0Q29udGVudChzZWxmLm5ldERhdGEuR2FtZVJ1bGUuaGVscFJ1bGUucnVsZVBpY3NbaV0pOyBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLm5ldERhdGEuR2FtZVJ1bGUuaGVscFJ1bGUucnVsZVBpY3NbaV0gKyBcInxcIiArIGFUZXgpO1xuICAgICAgICAgICAgICAgIGxldCBzZiA9IG5ldyBjYy5TcHJpdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgIHNmLnNldFRleHR1cmUoYVRleCk7XG4gICAgICAgICAgICAgICAgc2VsZi5pbWdBcnJheVtpXS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5pbWdBcnJheVtpXS5zcHJpdGVGcmFtZSA9IHNmO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gc2VsZi5pbWdBcnJheVtpXS5ub2RlLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHRUID0gKDEwODAgLyB3aWR0aCkgKiBzZWxmLmltZ0FycmF5W2ldLm5vZGUuaGVpZ2h0ICogc2VsZi5zY2FsZVZhbHVlO1xuICAgICAgICAgICAgICAgIHNlbGYuaW1nQXJyYXlbaV0ubm9kZS53aWR0aCA9IDEwODAgKiBzZWxmLnNjYWxlVmFsdWU7XG4gICAgICAgICAgICAgICAgc2VsZi5pbWdBcnJheVtpXS5ub2RlLmhlaWdodCA9IGhlaWdodFQ7XG4gICAgICAgICAgICAgICAgLy9zZWxmLmltZ0FycmF5W2ldLm5vZGUuc2V0U2NhbGUoMTA4MCAvIHdpZHRoKTtcbiAgICAgICAgICAgICAgICByaCArPSBoZWlnaHRUO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcImhlaWdodCBpcyAkJCQgXCIsIHNlbGYuaW1nQXJyYXlbaV0ubm9kZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIC8v5pSv5oyB5aSa5byg5Zu+5o6S54mI77yIMjAxNy0wMy0yNyBwbe+8mjUyMO+8iVxuICAgICAgICAgICAgICAgIGlmKGkgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHQgPSBzZWxmLmltZ0FycmF5W2luZGV4XS5ub2RlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdBcnJheVtpXS5ub2RlLnkgID0gc2VsZi5pbWdBcnJheVtpbmRleF0ubm9kZS55IC0gaHQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJoZWlnaHQgaXMgJCQkIFwiLCBodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZihsZW4gPT0gMil7XG4gICAgICAgICAgICAvLyAgICAgbGV0IGh0ID0gc2VsZi5pbWdBcnJheVswXS5ub2RlLmhlaWdodDtcbiAgICAgICAgICAgIC8vICAgICBzZWxmLmltZ0FycmF5WzFdLm5vZGUueSA9IC1odDtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHNlbGYuY29udGVudC5oZWlnaHQgPSByaDtcbiAgICAgICAgICAgIHNwdC5oaWRlV2FpdCgpO1xuICAgICAgICAgICAgc2VsZi5pbml0SGVscCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5pdEhlbHA6ZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLmxvY2spe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbml0SGVscFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV0RGF0YS5oZWxwU2hvd0ZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9PZmZzZXQoY2MucCgwLDApLCAwLjEpO1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5zZWxlY3RTaG93Q2FsbEJhY2ssIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4zLCBjYy5wKDAsIHRoaXMub3JpWSkpLCBjYWxsYmFjaykpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9LFxuXG4gICAgc2VsZWN0U2hvd0NhbGxCYWNrOmZ1bmN0aW9uKClcbiAgICB7XG4gICAgICAgIHRoaXMudWlCbGFjay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICB9LFxufSk7XG4iLCJ2YXIgRGF0YU9wZXIgPSByZXF1aXJlKFwiRGF0YU9wZXJcIik7XG52YXIgTmV0RGF0YSA9IHJlcXVpcmUoXCJOZXREYXRhXCIpO1xudmFyIFNka0RhdGEgPSByZXF1aXJlKFwiU2RrRGF0YVwiKTtcblxuXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICAvKmN0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICBcbiAgICB9LCovXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc2RrICA9IHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLO1xuICAgICAgICBpZiAoIUNDX0pTQiAmJiBzZGspIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzppbml0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmKGUgJiYgZS5kYXRhICYmIGUuZGF0YS5hY2Nlc3NUb2tlbil7XG4gICAgICAgICAgICAgICAgICAgIERhdGFPcGVyLkRhdGFPcGVyLmdldEluc3QoKS5nYW1lVG9rZW4gPSBlLmRhdGEuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBmID0gZTsvL1xuICAgICAgICAgICAgICAgIHNlbGYuZmV0Y2goZnVuY3Rpb24oaXNFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpc0Vycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8v55qu6IKkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgc2tpbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZXh0ZW5kID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuc2tpbiA9IGYuZGF0YS5za2luQ29uZmlnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZihpbml0UmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBza2luID0gaW5pdFJlc3VsdC5za2luLnNraW5Vcmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXh0ZW5kID0gaW5pdFJlc3VsdC5leHRlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWQiOW5tui1hOa6kFxuICAgICAgICAgICAgICAgICAgICAgICAgc2RrLm1lcmdlUmVzb3VyY2VzKHNkay5hbmFseXNlUmVzb3VjZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2tpbjogc2tpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleHRyYTogZXh0ZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S6IGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNkay5pbml0TG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDov5DooYzmuLjmiI9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNkay5ydW5HYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZGsuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmV0Y2g6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGNjLmxvZyhcImZldGNoXCIpO1xuICAgICAgICB0aGlzLmluaXREYXRhID0ge307XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xuICAgICAgICBkYXRhT3Blci5nZXRJbml0KGZ1bmN0aW9uKGNtZCwgcmVzLCBtc2csIHNlbGYpIHtcbiAgICAgICAgICAgICAvLyDliKTmlq3mmK/lkKbmiJDlip/lubblrZjlgqjliJ3lp4vljJZcbiAgICAgICAgICAgIHZhciBpc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBpZihyZXMgPT0gMTAwMDA3KXtcbiAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKDIwMDAxOSA9PSByZXMpe1xuICAgICAgICAgICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocmVzICE9IDApe1xuICAgICAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MubG9nKCdmZXRjaCBpbml0IGRhdGEnKTtcbiAgICAgICAgICAgIGNjLmxvZyhjbWQsIHJlcywgbXNnKTtcbiAgICAgICAgICAgIHNlbGYuaW5pdERhdGEuY21kID0gY21kO1xuICAgICAgICAgICAgc2VsZi5pbml0RGF0YS5yZXMgPSByZXM7XG4gICAgICAgICAgICBzZWxmLmluaXREYXRhLm1zZyA9IG1zZztcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGlzRXJyb3IpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxufSk7XG4iLCJ2YXIgTmV0RGF0YSA9IHJlcXVpcmUoXCJOZXREYXRhXCIpO1xudmFyIENvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBmaXJzdE51bWJlcjp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIGJvb21TY3JlZW46e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBzcGluZTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIHBvb2xPdGhlcjp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbExhYmVsTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbExhYmVsVG9wOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbExhYmVsRG93bjp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICBkZXRhaWxJbmRleDowLC8v54iG5bGP57Si5byVXG4gICAgICAgIGRldGFpbEFycmF5OltdLC8v5pyN5Yqh5Zmo57uZ55qE5a2X5q61XG4gICAgICAgIGRldGFpbEFycmF5VG9wOltdLC8v54iG5bGP5L+h5oGv5LiK6YOo5YiG5a2X5L2TXG4gICAgICAgIGRldGFpbEFycmF5RG93bjpbXSwvL+eIhuWxj+S/oeaBr+S4i+mDqOWIhuWtl+S9k1xuXG4gICAgICAgIGZsYWc6ZmFsc2UsLy/lt7Lnu4/miZPlvIDlpZbmsaDniIblsY9cbiAgICAgICAgYWxsQWN0aW9uSGFzRmluaXNoZWQ6ZmFsc2UsLy/niIblsY/lkozlpZbmsaDlh7rnjrDliqjnlLvpg73mkq3mlL7lrozmr5VcbiAgICAgICAgaW5kZXg6MCwvL1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIH0sXG5cbiAgICAvKioqKioqKueIhuWxjyAqL1xuICAgIHN0YXJ0Ym9vbVNjcmVlbkFjdGlvbjpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmJvb21TY3JlZW4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wb29sT3RoZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy5tb3ZlVG8oMSwgY2MucCgwLDApKS5lYXNpbmcoY2MuZWFzZUJvdW5jZU91dCgzLjApKTtcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMucGxheUJvb21TY3JlZW4sIHRoaXMpO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDEpLG1vdmVUbyxmaW5pc2gpO1xuICAgICAgICB0aGlzLmJvb21TY3JlZW4ucnVuQWN0aW9uKHNlcSk7XG4gICAgfSxcbiAgICBwbGF5Qm9vbVNjcmVlbjpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmRldGFpbEluZGV4Kys7XG4gICAgICAgIHRoaXMuc3BpbmUuZ2V0Q29tcG9uZW50KCdzcC5Ta2VsZXRvbicpLnNldEFuaW1hdGlvbigwLCAnYW5pbWF0aW9uMicsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5kZXRhaWxMYWJlbFRvcC5zdHJpbmcgPSB0aGlzLmRldGFpbEFycmF5VG9wW3RoaXMuZGV0YWlsSW5kZXggLSAxXTtcbiAgICAgICAgdGhpcy5kZXRhaWxMYWJlbERvd24uc3RyaW5nID0gdGhpcy5kZXRhaWxBcnJheURvd25bdGhpcy5kZXRhaWxJbmRleCAtIDFdO1xuICAgICAgICB0aGlzLmRldGFpbExhYmVsTm9kZS5zY2FsZSA9IDE7XG4gICAgICAgIHZhciBzY2FsZVRvID0gY2Muc2NhbGVUbygwLjQsMS41KTtcbiAgICAgICAgdmFyIGZhZGVPdXQgPSBjYy5mYWRlT3V0KDAuNCk7XG4gICAgICAgIHZhciBzcGF3biA9IGNjLnNwYXduKHNjYWxlVG8sZmFkZU91dCk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLm5leHRwbGF5Qm9vbVNjcmVlbiwgdGhpcyk7XG4gICAgICAgIHZhciBhY3Rpb25BcnJheSA9IFtdO1xuICAgICAgICBhY3Rpb25BcnJheS5wdXNoKGNjLmRlbGF5VGltZSgwLjA4KSk7XG4gICAgICAgIGFjdGlvbkFycmF5LnB1c2goY2MuZmFkZUluKDApKTtcbiAgICAgICAgYWN0aW9uQXJyYXkucHVzaChjYy5kZWxheVRpbWUoMykpO1xuICAgICAgICBhY3Rpb25BcnJheS5wdXNoKHNwYXduKTtcbiAgICAgICAgYWN0aW9uQXJyYXkucHVzaChjYy5kZWxheVRpbWUoMSkpO1xuICAgICAgICBhY3Rpb25BcnJheS5wdXNoKGZpbmlzaCk7XG4gICAgICAgIGlmKHRoaXMuZGV0YWlsSW5kZXggPT0gdGhpcy5kZXRhaWxBcnJheS5sZW5ndGgpe1xuICAgICAgICAgICAgdmFyIGJvb21GaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmJvb21TY3JlZW5GaW5pc2hlZCwgdGhpcyk7XG4gICAgICAgICAgICBhY3Rpb25BcnJheS5wdXNoKGJvb21GaW5pc2gpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShhY3Rpb25BcnJheSk7XG4gICAgICAgIHRoaXMuZGV0YWlsTGFiZWxOb2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICBcbiAgICBuZXh0cGxheUJvb21TY3JlZW46ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5kZXRhaWxJbmRleCA8IHRoaXMuZGV0YWlsQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMucGxheUJvb21TY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgIC8vQm9vbVNjcmVlbiDmkq3mlL7lrozmr5VcbiAgICAgYm9vbVNjcmVlbkZpbmlzaGVkOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy5tb3ZlVG8oMC41LCBjYy5wKDAsMjc2KSkuZWFzaW5nKGNjLmVhc2VCb3VuY2VJbigzLjApKTtcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuYm9vbVNjcmVlbk1vdmVVcEZpbmlzaGVkLCB0aGlzKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKG1vdmVUbyxmaW5pc2gpO1xuICAgICAgICB0aGlzLmJvb21TY3JlZW4ucnVuQWN0aW9uKHNlcSk7XG4gICAgfSxcbiAgICAvL+eIhuWxj+aUtuWbnuWOu+S6hlxuICAgIGJvb21TY3JlZW5Nb3ZlVXBGaW5pc2hlZDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnN0YXJ0UG9vbE90aGVyQWN0aW9uKCk7XG4gICAgfSxcblxuICAgIC8qKioqKioq5aWW5rGg5aWWICovXG4gICAgc3RhcnRQb29sT3RoZXJBY3Rpb246ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5ib29tU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBvb2xPdGhlci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgbW92ZVRvID0gY2MubW92ZVRvKDEsIGNjLnAoMCwwKSkuZWFzaW5nKGNjLmVhc2VCb3VuY2VPdXQoMy4wKSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLnBvb2xOb2RlSnVtcEZpbmlzaCwgdGhpcyk7XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMSksbW92ZVRvLGZpbmlzaCk7XG4gICAgICAgIHRoaXMucG9vbE90aGVyLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgLy9wb29sXG4gICAgcG9vbE5vZGVKdW1wRmluaXNoOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWxsQWN0aW9uSGFzRmluaXNoZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBpbml0RGF0YTpmdW5jdGlvbihjb3VudClcbiAgICB7ICAgXG4gICAgICAgIGlmKHRoaXMuZmxhZyA9PSBmYWxzZSl7Ly/niIblsY/lj6rlvIDlkK/kuIDmrKFcbiAgICAgICAgICAgIHRoaXMuZmxhZyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgaW5pdFJlc3VsdD0gTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0O1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxBcnJheSA9IGluaXRSZXN1bHQuaGlzdG9yeVBvb2w7XG4gICAgICAgICAgICBpZih0aGlzLmRldGFpbEFycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGV0YWlsQXJyYXlTdHJpbmcoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8v55u05o6l5pKt5pS+5aWW5rGg5aWW5Yqo55S7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvb2xPdGhlckFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgXG4gICAgICAgIGlmKHRoaXMuYWxsQWN0aW9uSGFzRmluaXNoZWQgPT0gdHJ1ZSl7XG4gICAgICAgICAgICB2YXIgdGhlVW5pdCA9IHRoaXMuZmlyc3ROdW1iZXIuZ2V0Q29tcG9uZW50KFwibnVtYmVyXCIpO1xuICAgICAgICAgICAgdGhlVW5pdC5pbml0RGF0YShjb3VudCk7XG4gICAgICAgIH0gXG4gICAgfSxcbiAgICAvL+WPluW+l+eUqOaIt+eahOaYteensFxuICAgIHNldERldGFpbEFycmF5U3RyaW5nOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuZGV0YWlsQXJyYXlEb3duID0gW107XG4gICAgICAgIHRoaXMuZGV0YWlsQXJyYXlUb3AgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGV0YWlsQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdmFyIGogPSBpO1xuICAgICAgICAgICAgdmFyIGRvd25TdHJJbmRleCA9ICB0aGlzLmRldGFpbEFycmF5W2pdLmluZGV4T2YoXCIjI1wiKTtcbiAgICAgICAgICAgIHZhciBkb3duU3RyID0gdGhpcy5kZXRhaWxBcnJheVtqXS5zdWJzdHJpbmcoZG93blN0ckluZGV4ICsgMik7XG4gICAgICAgICAgICB0aGlzLmRldGFpbEFycmF5RG93bi5wdXNoKGRvd25TdHIpO1xuICAgICAgICAgICAgLy/kuIvpg6jliIZcbiAgICAgICAgICAgIHZhciBjdXRTdHIgPSB0aGlzLmRldGFpbEFycmF5W2pdLnN1YnN0cmluZyhkb3duU3RySW5kZXgsIC1kb3duU3RySW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxBcnJheVRvcC5wdXNoKGN1dFN0cik7XG4gICAgICAgICAgICB2YXIgaW5kZXhPbmUgPSBjdXRTdHIuaW5kZXhPZihcIiRcIik7XG4gICAgICAgICAgICB2YXIgc3ViU3RyaW5nID0gIGN1dFN0ci5zdWJzdHJpbmcoaW5kZXhPbmUgKyAxKTtcbiAgICAgICAgICAgIHZhciBpbmRleFR3byA9IHN1YlN0cmluZy5pbmRleE9mKFwiJFwiKTtcbiAgICAgICAgICAgIHZhciB1aWQgPSBzdWJTdHJpbmcuc3Vic3RyaW5nKGluZGV4VHdvLCAtaW5kZXhUd28pO1xuICAgICAgICAgICAgQ29tbW9uLkNvbW1vbi5nZXRJbnN0KCkuZ2V0TmljayhqLHVpZCwgZnVuY3Rpb24oamosbmljayl7Ly/lvILmraXnmoRcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBcIiRcIiArIHVpZCArIFwiJFwiO1xuICAgICAgICAgICAgICAgIHZhciBuZXdzdHIgPSBzZWxmLmRldGFpbEFycmF5VG9wW2pqXS5yZXBsYWNlKG5ld0lkLCBuaWNrKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRldGFpbEFycmF5VG9wW2pqXSA9IG5ld3N0cjtcbiAgICAgICAgICAgICAgICBzZWxmLmluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5pbmRleCA9PSBzZWxmLmRldGFpbEFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRib29tU2NyZWVuQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBcbiAgICBcbn0pO1xuIiwidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbnZhciBEYXRhT3BlciA9IHJlcXVpcmUoXCJEYXRhT3BlclwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZ3JheVByZWZhYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LCAgICAgICAgXG4gICAgICAgXG4gICAgICAgIHRlc3ROb2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBub09yZGVyTm9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ29Ob2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBnYW1lTm9kZTogY2MuTm9kZSwvL+i3s+WIsOa3mOWunee9kemhteeUqOeahFxuICAgICAgICB1aUJsYWNrOiBjYy5Ob2RlLFxuICAgICAgICBzY3JvbGxWaWV3OiBjYy5Ob2RlLFxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxuICAgICAgICBtb3JlU3ByaXRlOiBjYy5Ob2RlLFxuICAgICAgICB6aUxpbmVTcHJpdGU6IGNjLk5vZGUsXG4gICAgICAgIHZpZXc6IGNjLk5vZGUsXG4gICAgICAgIGxvY2s6IGZhbHNlLFxuICAgICAgICBzY2FsZVZhbHVlOjEsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ldERhdGEgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpO1xuICAgICAgICBsZXQgc2l6ZSA9IGNjLmRpcmVjdG9yLmdldFdpblNpemUoKTtcbiAgICAgICAgbGV0IHNzc3MgPSAgKHNpemUud2lkdGggKiAxNjYwKSAgLygxMDgwICogc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLnNjYWxlVmFsdWUgPSBzc3NzO1xuICAgICAgICB0aGlzLmxvY2sgPSB0cnVlO1xuICAgICAgICBsZXQgb3JpUDEgPSB0aGlzLnRlc3ROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgIHRoaXMub3JpWSA9IHRoaXMudGVzdE5vZGUueSAtIG9yaVAxLnk7XG4gICAgICAgIC8vdGhpcy5zZVZhciA9IDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnB1cnBsZUggPSB0aGlzLnppTGluZVNwcml0ZS5oZWlnaHQgLyAyO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwib3JpWT1cIiArIHRoaXMubm9kZS55ICsgXCJ8XCIgKyBvcmlQMS55KTsgICAgICAgIFxuXG4gICAgICAgIHZhciBjYWxsRnVuY18xID0gIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc2UgPSBjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHNlLmhlaWdodCAqIDAuODtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zY3JvbGxIID0gc2UuaGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHRoaXMuc2Nyb2xsSDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5oZWlnaHQgPSB0aGlzLnNjcm9sbFZpZXcuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMub3JpWSAtIHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQgLSB0aGlzLnB1cnBsZUggO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJueT1cIiArIHRoaXMubm9kZS55KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4xKSwgY2FsbEZ1bmNfMSkpO1xuICAgICAgICAvKlxuICAgICAgICB2YXIgdGltZUNhbGxiYWNrID0gZnVuY3Rpb24gKGR0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzZSA9IGNjLmRpcmVjdG9yLmdldFdpblNpemUoKTtcbiAgICAgICAgICAgIC8vdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHNlLmhlaWdodCAqIDAuODtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zZVZhciA9IDA7XG4gICAgICAgICAgICBpZihzZS5oZWlnaHQgPCAxNjYwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VWYXIgPSAxNjYwIC0gc2UuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSCA9IChzZS5oZWlnaHQgKyB0aGlzLnNlVmFyKSAqIDAuODsvL3NlLmhlaWdodCAqIDAuOCA7Ly8qIChzZS53aWR0aCAvIDEwODApO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHRoaXMuc2Nyb2xsSCA7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmhlaWdodCA9IHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy5zY3JvbGxWaWV3LmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5vcmlZIC0gdGhpcy5zY3JvbGxWaWV3LmhlaWdodCAtIHRoaXMucHVycGxlSDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibnk9XCIgKyB0aGlzLm5vZGUueSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm53PVwiICsgc2Uud2lkdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuSD1cIiArIHNlLmhlaWdodCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGltZUNhbGxiYWNrLCAwLjEpO1xuICAgICAgICAqL1xuICAgICAgICBcbiAgICAgICAgdGhpcy51aUJsYWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0sIHRoaXMpOyAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy0tLS0tLS0tLWdvLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vbGl0aW5nIDIwMTctMS0xMlxuICAgICAgICAgdGhpcy5nb05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgIHRoaXMuZ29Ob2RlLnNjYWxlID0gMC44O1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZ29Ob2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmdvTm9kZS5zY2FsZSA9IDE7XG4gICAgICAgICAgICAvL2NjLmxvZyhcImdvTm9kZSBUT1VDSF9FTkRcIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5nb05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuZ29Ob2RlLnNjYWxlID0gMTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgIC8vbGl0aW5nIDIwMTctMS0xMiBlbmRcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpe1xuICAgICAgICBpZighdGhpcy5sb2NrKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy51aUJsYWNrLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2FsbDMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpXG4gICAgICAgICAgICB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXREYXRhLm9yZGVyU2hvd0ZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLm5vT3JkZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuemlMaW5lU3ByaXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjMsIGNjLnYyKDAsIHRoaXMub3JpWSAtIHRoaXMuc2Nyb2xsVmlldy5oZWlnaHQgLSB0aGlzLnB1cnBsZUgpKSwgY2FsbDMpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgaW5pdERpbmdkYW46ZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLmxvY2spe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbml0RGluZ2RhblwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9jayA9IHRydWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qdmFyIHNlID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHNlLmhlaWdodCAqIDAuODtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuaGVpZ2h0ID0gdGhpcy5zY3JvbGxWaWV3LmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLnNjcm9sbFZpZXcuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm9yaVkgLSB0aGlzLnNjcm9sbFZpZXcuaGVpZ2h0OyovXG4gICAgICAgICAgICBjYy5sb2coXCJueT1cIiArIHRoaXMubm9kZS55KTtcblxuICAgICAgICAgICAgdGhpcy5uZXREYXRhLm9yZGVyU2hvd0ZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbUggPSAxODA7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtRGlzWSA9IDEwO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRDaGFuZz0gMTAwO1xuICAgICAgICAgICAgdGhpcy5jb250ZW5Db3VudCA9IDE0O1xuICAgICAgICAgICAgdGhpcy5pbml0TGlzdCgpOyAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLnNlbGVjdFNob3dDYWxsQmFjaywgdGhpcyk7XG4gICAgICAgICAgICBjYy5sb2coXCJzeT1cIiArIHRoaXMuc2Nyb2xsVmlldy55KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/lh7rmnaXliqjnlLvmnInpl67pophcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMywgY2MucCgwLCB0aGlzLm9yaVkgKSksIGNhbGxiYWNrKSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgc2VsZWN0U2hvd0NhbGxCYWNrOmZ1bmN0aW9uKClcbiAgICB7XG4gICAgICAgIHRoaXMudWlCbGFjay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICB9LFxuICAgIFxuICAgIC8v5Lit5aWWIOaVsOWtlyDmr4/mnaHpl7Tot501MCDpq5gxMDAg5YiZ5Yqg6auYMTUwXG4gICAgaW5pdExpc3Q6ZnVuY3Rpb24oKVxuICAgIHtcbiAgICAgICAgbGV0IG9MZW4gPSB0aGlzLm5ldERhdGEuR2FtZUxpc3RSZXN1bHQubGVuZ3RoO1xuICAgICAgICAvL2xpdGluZyAyMDE3LTEtMTJcbiAgICAgICAgaWYob0xlbiA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL3RoaXMubm9PcmRlck5vZGUueSA9IHRoaXMuc2Nyb2xsVmlldy55O1xuICAgICAgICAgICAgdGhpcy5ub09yZGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy56aUxpbmVTcHJpdGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuemlMaW5lU3ByaXRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ub09yZGVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy9saXRpbmcgMjAxNy0xLTEyIGVuZFxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb3JlU3ByaXRlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKHRydWUpO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy/orqHnrpdzY3JvbGzmgLvplb9cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB2YXIgampfaGVpZ2h0ID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vZm9yKGxldCBqID0gMCA7IGogPCB0aGlzLnNjZW5lTGlzdC5sZW5ndGg7IGorKylcbiAgICAgICAgXG4gICAgICAgIGNjLmxvZyhcIm9MZW4gPSBcIiArIG9MZW4pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBvTGVuOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGpqX2hlaWdodCArPXRoaXMubGlzdEl0ZW1IICsgdGhpcy5saXN0SXRlbURpc1k7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKG9MZW4gPiB0aGlzLmNvbnRlbkNvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBjYy5sb2coXCJhYmNkZWZcIik7XG4gICAgICAgICAgICBqal9oZWlnaHQgKz0gNjc7XG4gICAgICAgICAgICB0aGlzLm1vcmVTcHJpdGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgdGhpcy5tb3JlU3ByaXRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vcmVTcHJpdGUueSA9IC0oampfaGVpZ2h0IC0gMjQpICogdGhpcy5zY2FsZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tb3JlU3ByaXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL2xpdGluZyAyMDE3LTEtMTJcbiAgICAgICAgdmFyIHNjcm9sbEhfdmFyID0gdGhpcy5zY3JvbGxIO1xuICAgICAgICBcbiAgICAgICAgaWYoampfaGVpZ2h0IDwgdGhpcy5zY3JvbGxIKVxuICAgICAgICB7XG4gICAgICAgICAgICBzY3JvbGxIX3ZhciA9IGpqX2hlaWdodCAqIHRoaXMuc2NhbGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmhlaWdodCA9IHNjcm9sbEhfdmFyO1xuICAgICAgICB0aGlzLnZpZXcuaGVpZ2h0ID0gc2Nyb2xsSF92YXI7XG4gICAgICAgIHRoaXMuY29udGVudC55ID0gc2Nyb2xsSF92YXI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnppTGluZVNwcml0ZS55ID0gdGhpcy5zY3JvbGxWaWV3LmhlaWdodDtcbiAgICAgICAgXG4gICAgICAgICAvL2xpdGluZyAyMDE3LTEtMTIgZW5kXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gampfaGVpZ2h0ICogdGhpcy5zY2FsZVZhbHVlO1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8v5o6S54mIXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgdmFyIHkgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvTGVuOyArK2kpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5ncmF5UHJlZmFiKTtcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5jb250ZW50OyBcbiAgICAgICAgICAgIGl0ZW0ueCA9IDA7XG4gICAgICAgICAgICBpdGVtLnkgPSB5O1xuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IHRoaXMuc2NhbGVWYWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/otYvlgLxcbiAgICAgICAgICAgIHZhciBpdGVtSW5mbyA9IHRoaXMubmV0RGF0YS5HYW1lTGlzdFJlc3VsdFtpXTtcbiAgICAgICAgICAgIHZhciB0dXJuT3JkZXIgPSBpdGVtLmdldENvbXBvbmVudCgnVHVybnRhYmxlT3JkZXJTY3JpcHQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHVybk9yZGVyLnNldE9yZGVyRGF0YShpdGVtSW5mby50aW1lLCBpdGVtSW5mby5ubywgaXRlbUluZm8ucGF5QW1vdW50LCBpdGVtSW5mby5ib251c0Ftb3VudCwgaXRlbUluZm8uc3RhdHVzLCB0aGlzLm5ldERhdGEuY3VycmVuY3kpO1xuICAgIFxuICAgICAgICAgICAvL+iuoeeul+S4i+S4gOS4qnnlgLxcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0Q2hhbmcgPSB0aGlzLmxpc3RJdGVtSCArIHRoaXMubGlzdEl0ZW1EaXNZO1xuICAgICAgICAgICAgeSAtPSB0aGlzLm9mZnNldENoYW5nICogdGhpcy5zY2FsZVZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3JlU3ByaXRlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAvL+iwg+WIsOa3mOWunee9kemhtVxuICAgICAgICAgICAgaWYgKCFDQ19KU0Ipe1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3B0ID0gdGhpcy5nYW1lTm9kZS5nZXRDb21wb25lbnQoXCJnYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoIXNwdC5leGl0SnVkZ2UoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpLmdhbWVUb2tlbi5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VJZCA9IGFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnJlZGlyZWN0T3JkZXIoaW5zdGFuY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vcmUgZ2FtZSFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9PZmZzZXQoY2MucCgwLDApLCAwLjEpO1xuICAgIH0sXG59KTtcbiIsIlxuXG5cbnZhciBOZXREYXRhID0gY2MuQ2xhc3Moe1xuICAgIHN0YXRpY3MgOiB7XG4gICAgICAgIGdfSW5zdCA6IG51bGwsXG4gICAgICAgIHNfaW5kZXggOiAwLFxuICAgICAgICBcbiAgICAgICAgZ2V0SW5zdDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihOZXREYXRhLmdfSW5zdCA9PT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBOZXREYXRhLmdfSW5zdCA9IG5ldyBOZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgTmV0RGF0YS5nX0luc3QuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE5ldERhdGEuZ19JbnN0O1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdG9yeUluc3Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoTmV0RGF0YS5nX0luc3QgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIE5ldERhdGEuZ19JbnN0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIC8v5oqV5rOo5ZON5bqU5a+56LGhXG4gICAgICAgIEJldFJlc3VsdCA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgLy/liJ3lp4vljJblk43lupTlr7nosaEgXG4gICAgICAgIEluaXRSZXN1bHQgOiB7XG4gICAgICAgICAgICBkZWZhdWx0IDogbnVsbCxcbiAgICAgICAgICAgXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICAgICAgfSwgXG4gICAgICAgIC8v57uT566X5ZON5bqU5a+56LGhXG4gICAgICAgIFJld2FyZFJlc3VsdCA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICAgICAgfSwgXG4gICAgICAgIC8v5ri45oiP5YiX6KGoXG4gICAgICAgIEdhbWVMaXN0UmVzdWx0OntcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgICAvL+WlluaxoFxuICAgICAgICBQb29sUmVzdWx0OntcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5aWW5rGg6KeE5YiZXG4gICAgICAgIHBvb2xSdWxlczoge1xuICAgICAgICAgICAgZGVmYXVsdCA6IFtdLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlIDogZmFsc2UsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/muLjmiI/liJfooahcbiAgICAgICAgR2FtZVJ1bGU6e1xuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGwsXG4gICAgICAgICAgICBzZXJpYWxpemFibGUgOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGJhbGFuY2U6LTEsLy/kvZnpop1cbiAgICAgICAgcnVsZVBpY3M6IFtdLCAvL+inhOWImeWbvueJh+WIl+ihqFxuICAgICAgICBvcmRlclNob3dGbGFnOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrorqLljZVpbmdcbiAgICAgICAgaGVscFNob3dGbGFnOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrop4TliJlcbiAgICAgICAgdXNlcklkOm51bGwsLy91c2VySURcbiAgICAgICAgdXNlck5pY2s6bnVsbCwvL+eUqOaIt+aYteensFxuICAgICAgICBzdG9wU2VsbGluZ0Rlc2M6IFwiXCIsIC8v5YGc5ZSu6K+05piOXG5cbiAgICB9LFxuICAgIFxuICAgIGluaXQgOiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyDnlLHkuo7lnKjnu5Hlrprml7blj6/og73lt7Lnu4/op6blj5Hov4for6Xkuovku7bvvIzlj6/ku6XlhYjojrflj5bkuIDkuItcbiAgICAgICAgICAgIGlmICh3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgICAgIC8vd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsubG9nKCdkZWJ1ZycsICd2ZXJzaW9uJywgJzEyLzI4IDE3OjUwJyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsuZ2V0VXNlckluZm8oZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5iYWxhbmNlID0gaW5mby5mZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJOaWNrID0gaW5mby5uaWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VySWQgPSBpbmZvLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gMTAwMDsgLy9teSBzZXJ2ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzp1cGRhdGVVc2VyQmFsYW5jZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBlLmRhdGEg5Lit5YyF5ZCr5LqG6KaB5Lyg6YCS55qE5omA5pyJ5pWw5o2u77yM5L6L5aaC55So5oi35L2Z6aKd5Li6IGUuZGF0YS5mZWVcbiAgICAgICAgICAgICAgICBzZWxmLmJhbGFuY2UgPSBlLmRhdGEuZmVlO1xuICAgICAgICAgICAgICAgIHNlbGYudXNlck5pY2sgPSBlLmRhdGEubmljaztcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJJZCA9IGUuZGF0YS51aWQ7XG4gICAgICAgICAgICB9LCBmYWxzZSk7ICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSA9IDEwMDA7IC8vc2ltdWxhdG9yXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0QmFsYW5jZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbGFuY2U7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE5ldERhdGEgOiBOZXREYXRhLFxufTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgLy/kuI3lho3mtL7lj5Hkuovku7ZcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZih0aGlzLm9iaiAhPSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5mdW4odGhpcy5vYmopO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZnVuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LHRoaXMpO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbihvYmosIGZ1bil7XG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB9LFxuICAgIFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsInZhciBOZXREYXRhID0gcmVxdWlyZShcIk5ldERhdGFcIik7XG52YXIgR2FtZSA9IHJlcXVpcmUoXCJHYW1lXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL+a4uOaIj+W4ruWKqVxuICAgICAgICB1aUJsYWNrIDogY2MuTm9kZSxcbiAgICAgICAgbG9jayA6IGZhbHNlLFxuICAgICAgICBnYW1lTm9kZTogY2MuTm9kZSwgXG5cbiAgICAgICAgYmVpQXJyYXk6e1xuICAgICAgICAgICAgZGVmYXVsdDpbXSxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWluQXJyYXk6e1xuICAgICAgICAgICAgZGVmYXVsdDpbXSxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lpZbmsaDop4TliJnmoIfpophcbiAgICAgICAgcG9vbFRpdGxlTGFiZWw6e1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuTGFiZWxdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lpZbmsaDop4TliJnor7TmmI4gMSB+IDIw5YCNXG4gICAgICAgIHBvb2xEZXRhaWxMYWJlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuTGFiZWxdXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBtYXhBcnJheTp7XG4gICAgICAgICAgICBkZWZhdWx0OltdLFxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGhhc09wZW46ZmFsc2UsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc2l6ZSA9IGNjLmRpcmVjdG9yLmdldFdpblNpemUoKTtcbiAgICAgICAgbGV0IHNzc3MgPSAgKHNpemUud2lkdGggKiAxNjYwKSAgLygxMDgwICogc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSBzc3NzO1xuICAgICAgICB0aGlzLm5ldERhdGEgPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpO1xuICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51aUJsYWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG4gICAgXG4gICAgXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCF0aGlzLmxvY2spe1xuICAgICAgICAgICAgdGhpcy51aUJsYWNrLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsZXQgY2FsbDMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpXG4gICAgICAgICAgICB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXREYXRhLmhlbHBTaG93RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMywgY2MudjIoMCwgLTIwMDApKSwgY2FsbDMpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICBcbiAgICBkb3duSGVscDogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5oYXNPcGVuID09IGZhbHNlKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1O2krKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5iZWlBcnJheVtpXS5zdHJpbmcgPSAgdGhpcy5uZXREYXRhLnBvb2xSdWxlc1tpXS5iZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5taW5BcnJheVtpXS5zdHJpbmcgPSAgdGhpcy5uZXREYXRhLnBvb2xSdWxlc1tpXS5taW5Cb3VucztcbiAgICAgICAgICAgICAgICB0aGlzLm1heEFycmF5W2ldLnN0cmluZyA9ICB0aGlzLm5ldERhdGEucG9vbFJ1bGVzW2ldLm1heEJvdW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/moIfpopjmnIDkvY4qKiBcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAyOyBpKyspeyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucG9vbFRpdGxlTGFiZWxbaV0uc3RyaW5nID0gdGhpcy5wb29sVGl0bGVMYWJlbFtpXS5zdHJpbmcgKyBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQuY3VycmVuY3krXCLmlbBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5YCN5pWw6K+05piOXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNSA7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0aGlzLm5ldERhdGEucG9vbFJ1bGVzW2ldLmZsb2F0UmF0ZSAqIDEwMDtcbiAgICAgICAgICAgICAgICBpZihwZXJjZW50ID09IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvb2xEZXRhaWxMYWJlbFtpXS5zdHJpbmcgPSBcIuWbuuWumlwiICsgdGhpcy5uZXREYXRhLnBvb2xSdWxlc1tpXS5taW5Cb3VucztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb29sRGV0YWlsTGFiZWxbaV0uc3RyaW5nID0gcGVyY2VudCArIFwiJeW9k+WJjeWlluaxoFwiICsgTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LmN1cnJlbmN5K1wi5pWwXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdEhlbHAoKTtcbiAgICB9LFxuXG4gICAgaW5pdEhlbHA6ZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLmxvY2spe1xuICAgICAgICAgICAgdGhpcy5uZXREYXRhLmhlbHBTaG93RmxhZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5zZWxlY3RTaG93Q2FsbEJhY2ssIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4zLCBjYy5wKDAsIC0yNjUpKSwgY2FsbGJhY2spKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfSxcblxuICAgIHNlbGVjdFNob3dDYWxsQmFjazpmdW5jdGlvbigpXG4gICAge1xuICAgICAgICB0aGlzLnVpQmxhY2suYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2NrID0gZmFsc2U7XG4gICAgfSxcbn0pO1xuIiwidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJlaUFycmF5OntcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXG4gICAgICAgICAgICB0eXBlOltjYy5Ob2RlXSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgY2xpY2tPbmVUb2dnbGU6ZnVuY3Rpb24odGVtcGxlSW5kZXgpe1xuICAgICAgICBpZih0ZW1wbGVJbmRleCA9PSB0aGlzLmluZGV4KXtcbiAgICAgICAgICAgIC8vZG9Ob3RoaW5nXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRlbXBsZUluZGV4O1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ25vcm1hbCcpO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSB0aGlzLmJlaUFycmF5W2ldLmdldENoaWxkQnlOYW1lKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBpZihpID09IHRoaXMuaW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBub3JtYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+mAmuefpWdhbWXohJrmnKzmm7TmlrDkv6Hmga9cbiAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZScpLnByaWNlQ2hhbmdlQmV0KHRoaXMuaW5kZXgpO1xuICAgIH0sXG5cbiAgICAvL3RydWUg56aB55SoXG4gICAgYmV0UHJpY2VTZXRFbmFibGU6ZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgICAgIHZhciBub3JtYWwgPSB0aGlzLmJlaUFycmF5W2ldLmdldENoaWxkQnlOYW1lKCdub3JtYWwnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gdGhpcy5iZWlBcnJheVtpXS5nZXRDaGlsZEJ5TmFtZSgnc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGVuYWJsZU5vcm1hbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2VuYWJsZU5vcm1hbCcpO1xuICAgICAgICAgICAgICAgIHZhciBlbmFibGVTZWxlY3QgPSB0aGlzLmJlaUFycmF5W2ldLmdldENoaWxkQnlOYW1lKCdlbmFibGVTZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBub3JtYWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVuYWJsZU5vcm1hbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbmFibGVTZWxlY3QuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSB0aGlzLmluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZmxhZyA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZsYWcgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVOb3JtYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRMYWJlbENvbG9yOmZ1bmN0aW9uKCl7XG4gICAgICAgIC8v6K6+572uTGFiZWzpopzoibJcbiAgICAgICAgdmFyIHNraW4gPSBOZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLnNraW47XG4gICAgICAgIGlmKHNraW4pe1xuICAgICAgICAgICAgdmFyIGxhYmVsQ29sb3JBcnJheSA9IHNraW4uYmV0UmdiO1xuICAgICAgICAgICAgaWYobGFiZWxDb2xvckFycmF5ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9ybWFsUmdiID0gbGFiZWxDb2xvckFycmF5WzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0UkdCID0gbGFiZWxDb2xvckFycmF5WzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlTm9ybWFsUkdCID0gbGFiZWxDb2xvckFycmF5WzJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlU2VsZWN0UkdCID0gbGFiZWxDb2xvckFycmF5WzNdO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3JtYWxMYWJlbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ25vcm1hbCcpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RMYWJlbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3NlbGVjdCcpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVOb3JtYWxMYWJlbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2VuYWJsZU5vcm1hbCcpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVTZWxlY3RMYWJlbCA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2VuYWJsZVNlbGVjdCcpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3Iobm9ybWFsUmdiWzBdLG5vcm1hbFJnYlsxXSxub3JtYWxSZ2JbMl0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKHNlbGVjdFJHQlswXSxzZWxlY3RSR0JbMV0sc2VsZWN0UkdCWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlTm9ybWFsTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcihlbmFibGVOb3JtYWxSR0JbMF0sZW5hYmxlTm9ybWFsUkdCWzFdLGVuYWJsZU5vcm1hbFJHQlsyXSk7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdExhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoZW5hYmxlU2VsZWN0UkdCWzBdLGVuYWJsZVNlbGVjdFJHQlsxXSxlbmFibGVTZWxlY3RSR0JbMl0pO1xuICAgICAgICAgICAgICAgICAgICAvL+WAjVxuICAgICAgICAgICAgICAgICAgICB2YXIgbm9ybWFsQmVpID0gdGhpcy5iZWlBcnJheVtpXS5nZXRDaGlsZEJ5TmFtZSgnbm9ybWFsJykuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RCZWkgPSB0aGlzLmJlaUFycmF5W2ldLmdldENoaWxkQnlOYW1lKCdzZWxlY3QnKS5nZXRDaGlsZEJ5TmFtZShcImJlaVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuYWJsZU5vcm1hbEJlaSA9IHRoaXMuYmVpQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2VuYWJsZU5vcm1hbCcpLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlU2VsZWN0QmVpID0gdGhpcy5iZWlBcnJheVtpXS5nZXRDaGlsZEJ5TmFtZSgnZW5hYmxlU2VsZWN0JykuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbEJlaS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKG5vcm1hbFJnYlswXSxub3JtYWxSZ2JbMV0sbm9ybWFsUmdiWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0QmVpLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3Ioc2VsZWN0UkdCWzBdLHNlbGVjdFJHQlsxXSxzZWxlY3RSR0JbMl0pO1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVOb3JtYWxCZWkubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcihlbmFibGVOb3JtYWxSR0JbMF0sZW5hYmxlTm9ybWFsUkdCWzFdLGVuYWJsZU5vcm1hbFJHQlsyXSk7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZVNlbGVjdEJlaS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKGVuYWJsZVNlbGVjdFJHQlswXSxlbmFibGVTZWxlY3RSR0JbMV0sZW5hYmxlU2VsZWN0UkdCWzJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v57uR5a6adG91Y2jkuovku7YgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspe1xuICAgICAgICAgICAgdGhpcy5iZWlBcnJheVtpXS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYmVpQXJyYXlbaV0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrT25lVG9nZ2xlKGkpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmJlaUFycmF5W2ldLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIiwidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcbnZhciBEYXRhT3BlciA9IHJlcXVpcmUoXCJEYXRhT3BlclwiKTtcbnZhciBDb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xuXG52YXIgU2RrRGF0YSA9IGNjLkNsYXNzKHtcbiAgICBzdGF0aWNzIDoge1xuICAgICAgICBnX1Nka0RhdGFJbnN0IDogbnVsbCxcblxuICAgICAgICBnZXRJbnN0IDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKFNka0RhdGEuZ19TZGtEYXRhSW5zdCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBTZGtEYXRhLmdfU2RrRGF0YUluc3QgPSBuZXcgU2RrRGF0YSgpO1xuICAgICAgICAgICAgICAgIFNka0RhdGEuZ19TZGtEYXRhSW5zdC5yZWdpc3RlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gU2RrRGF0YS5nX1Nka0RhdGFJbnN0O1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3RvcnlJbnN0ICA6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKFNka0RhdGEuZ19TZGtEYXRhSW5zdCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgU2RrRGF0YS5nX1Nka0RhdGFJbnN0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAgICAgLy/ms6jlhoznm5HlkKxcbiAgICAgICAgcmVnaXN0ZXIgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKCFDQ19KU0Ipe1xuICAgICAgICAgICAgICAgIC8v57O757uf6YCA5Ye65LqL5Lu2XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FzaW5vOmJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkNvbW1vbi5nZXRJbnN0KCkuZGVidWcoXCJTZGtEYXRhX3JlZ2lzdGVyX2Nhc2lubzpiYWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy/nqpflj6Pmv4DmtLvkuovku7bvvIzlvZMgQXBwIOS7juWQjuWPsOWIh+WbnuWIsOWJjeWPsOaXtuS8muinpuWPkVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzpyZXN1bWUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIC8v5L2Z6aKd5pu05paw5LqL5Lu2XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FzaW5vOnVwZGF0ZVVzZXJCYWxhbmNlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuYmFsYW5jZSA9IGUuZGF0YS5mZWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAvL+S9memineabtOaWsOS6i+S7tlxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nhc2lubzp1cGRhdGVVc2VyQmFsYW5jZUVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FzaW5vOmNsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmiJHnmoTorqLljZVcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdydWxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4uOaIj+inhOWImVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5pu05paw55So5oi35L+h5oGvXG4gICAgICAgIHVwZGF0ZVVzZXJJbmZvIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsudXBkYXRlVXNlckluZm8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lhYXlgLxcbiAgICAgICAgLy9AcGFyYW0gZmxhZyDmmK/lkKbmj5DnpLrkvZnpop3kuI3otrNcbiAgICAgICAgcmVjaGFyZ2UgOiBmdW5jdGlvbihmbGFnKXtcbiAgICAgICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsucmVjaGFyZ2UoZmxhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5pu05aSa6K6i5Y2VXG4gICAgICAgIG9yZGVyTW9yZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoIUNDX0pTQil7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBEYXRhT3Blci5EYXRhT3Blci5nZXRJbnN0KCkuZ2FtZVRva2VuLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlSWQgPSBhcnJbMl07XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLnJlZGlyZWN0T3JkZXIoaW5zdGFuY2VJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v6YCA5Ye65ri45oiPXG4gICAgICAgIGV4aXRHYW1lIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghQ0NfSlNCKXtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREsucG9wV2luZG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldENhY2hlICA6IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgaWYgKCFDQ19KU0IgJiYgd2luZG93LmFsaUxvdHRlcnlDYXNpbm9TREspIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESy5zZXRDYWNoZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldENhY2hlIDogZnVuY3Rpb24oa2V5LCBjYWxsYmFjayl7XG4gICAgICAgICAgICBpZiAoIUNDX0pTQiAmJiB3aW5kb3cuYWxpTG90dGVyeUNhc2lub1NESykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGlMb3R0ZXJ5Q2FzaW5vU0RLLmdldENhY2hlKGtleSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNka0RhdGE7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgXG4gICAgICAgIGludGVyYWN0YWJsZVR5cGU6dHJ1ZSxcbiAgICAgICAgc2VsZWN0VHlwZTowLFxuICAgICAgICBzZWxlY3RGbGFnOiBmYWxzZSwvL+a3u+WKoOmAieS4reeKtuaAgVxuICAgICAgICAvL+aMiemSrlxuICAgICAgICBidXR0b25CdDp7XG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgLy9ncm91cFxuICAgICAgICBncm91cDp7XG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgLy9cbiAgICAgICAgbGluZTEwOntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICAgbGluZTIwOntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICAgbGluZTMwOntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICAgbGluZTQwOntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICAgbGluZTUwOntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBqaWFudG91OntcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICAvL+aYr+WQpuaJk+W8gOS6hlxuICAgICAgICBpc09wZW5TZWxlY3Q6ZmFsc2UsXG4gICAgICAgIFxuICAgIH0sXG4gICAgLypwYXg6IGZ1bmN0aW9uKGMxLCBjMilcbiAgICB7XG4gICAgICAgcmV0dXJuIGMyIC0gYzE7XG4gICAgfSwqL1xuXG4gICAgbGluZUNoYW5nZTpmdW5jdGlvbih0b2dnbGUsIG1zZyl7XG4gICAgICAgIHRoaXMuaXNPcGVuU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JvdXAuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmppYW50b3Uuc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5saW5lMTAuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGluZTIwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbmUzMC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saW5lNDAuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGluZTUwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZihtc2cgPT0gMTApe1xuICAgICAgICAgICAgdGhpcy5saW5lMTAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYobXNnID09IDIwKXtcbiAgICAgICAgICAgIHRoaXMubGluZTIwLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmKG1zZyA9PSAzMCl7XG4gICAgICAgICAgICB0aGlzLmxpbmUzMC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZSBpZihtc2cgPT0gNDApe1xuICAgICAgICAgICAgdGhpcy5saW5lNDAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYobXNnID09IDUwKXsgICAgXG4gICAgICAgICAgICB0aGlzLmxpbmU1MC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmxvZyhcImxpbmUgZXJyXCIrbXNnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLypsZXQgYXJyRGVtbyA9IG5ldyBBcnJheSgxLCAzLCAyLCA1LCA2KTtcbiAgICAgICAgLy9hcnJEZW1vLnNvcnQodGhpcy5wYXgpO1xuICAgICAgICAvL2FyckRlbW8uc29ydChmdW5jdGlvbihhLGIpe3JldHVybiBhPmI/MTotMX0pOy8v5LuO5bCP5Yiw5aSn5o6S5bqPXG4gICAgICAgIGFyckRlbW8uc29ydChmdW5jdGlvbihhLGIpe3JldHVybiBhPGI/MTotMX0pOy8v5LuO5aSn5Yiw5bCP5o6S5bqPXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyckRlbW8ubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInRlc3Rzb3J0XCIgKyBhcnJEZW1vW2ldKTtcbiAgICAgICAgfSovXG4gICAgICAgIFxuICAgICAgICAvL2NjLmxvZyhcInRlc3Rzb3J0IGJiYmJiYmJiYmJiYmJiYmJiYlwiICk7XG4gICAgICAgIFxuICAgICAgICBcblxuICAgICAgICB0aGlzLmJ1dHRvbkJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5pbnRlcmFjdGFibGVUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICAgdGhpcy5idXR0b25CdC5zY2FsZSA9IDE7XG4gICAgICAgICAgICAgY2MubG9nKFwic2JcIik7XG4gICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvbkJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQnQuc2NhbGUgPSAxO1xuICAgICAgICAgICAgaWYodGhpcy5pbnRlcmFjdGFibGVUeXBlKVxuICAgICAgICAgICAgeyAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNPcGVuU2VsZWN0ID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlblNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFudG91LnNjYWxlWSA9IDE7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuU2VsZWN0ID10cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnNjYWxlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFudG91LnNjYWxlWSA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1dHRvbkJ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkJ0LnNjYWxlID0gMTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgc2V0SW50ZXJhY3RhYmxlVHlwZTpmdW5jdGlvbihpbnRlclR5cGUpXG4gICAge1xuICAgICAgICAvL2NjLmxvZyhcInNldEludGVyYWN0YWJsZVR5cGUgXCIgKyBpbnRlclR5cGUpO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZVR5cGUgPSBpbnRlclR5cGU7XG4gICAgICAgIC8qXG4gICAgICAgIGlmKGludGVyVHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTI0LCAxMjQsIDEyNCk7IFxuICAgICAgICB9XG4gICAgICAgICovXG4gICAgICAgIFxuICAgICAgICAgdmFyIHRpbWVDYWxsYmFjayA9IGZ1bmN0aW9uIChkdClcbiAgICAgICAge1xuICAgICAgICAgICBpZihpbnRlclR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQnQuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgIHRoaXMuYnV0dG9uQnQuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTI0LCAxMjQsIDEyNCk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aW1lQ2FsbGJhY2ssIDAuMDAxKTtcbiAgICAgICBcbiAgICAgICAgLy9jYy5sb2coXCJ0aGlzLm5vZGUuY29sb3IgXCIgKyB0aGlzLm5vZGUuY29sb3Iucik7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsInZhciBOZXREYXRhID0gcmVxdWlyZShcIk5ldERhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0aW1lTGFiZWw6Y2MuTGFiZWwsICAgICAgLy8yMDE2LjA2LjEyXG4gICAgICAgIG51bWJlckxhYmVsOmNjLkxhYmVsLCAgICAvL+iuouWNlee8luWPt++8mjg2NTQ3Nzc3NTQ0MzI4ODlcbiAgICAgICAgZG91TGFiZWw6Y2MuTGFiZWwsICAgICAgIC8v5YWx5oqVIDg46LGGXG4gICAgICAgIHN0YXRlTGFiZWw6Y2MuTGFiZWwsICAgICAvL+etieW+heW8gOWlliDmnKrkuK3lpZYg5Lit5aWW77yaODg4OC44OOixhlxuICAgICAgICBwYXlEb3U6Y2MuTm9kZSxcbiAgICAgICAgc2F0YXRlRG91OmNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcbiAgICBcbiAgICAvL3N0YXRlX2ludCDnirbmgIHvvIww77ya5ri45oiP5Lit77yI562J5b6F5byA5aWW77yJ77yMMe+8muS4reWllu+8jDLvvJrmnKrkuK3lpZZcbiAgICBzZXRPcmRlckRhdGE6ZnVuY3Rpb24odGltZV9sYWJlbCwgbnVtYmVyX2xhYmVsLCBkb3VfbGFiZWwsc3RhdGVfTGFiZWwsIHN0YXRlSW50LCAgZG91X2N1cnJlbmN5KVxuICAgIHtcbiAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gdGltZV9sYWJlbDtcbiAgICAgICAgdGhpcy5udW1iZXJMYWJlbC5zdHJpbmcgPSBcIuiuouWNlee8luWPt++8mlwiICsgbnVtYmVyX2xhYmVsO1xuICAgICAgICB0aGlzLmRvdUxhYmVsLnN0cmluZyA9IFwi5oqVOiBcIiArIGRvdV9sYWJlbCArIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5jdXJyZW5jeTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGF5RG91LnggPSB0aGlzLmRvdUxhYmVsLm5vZGUueCAtICh0aGlzLmRvdUxhYmVsLm5vZGUud2lkdGggLSA2OCk7XG4gICAgICAgIHRoaXMuc2F0YXRlRG91LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICBpZihzdGF0ZUludCA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5zdHJpbmcgPSBcIuetieW+heW8gOWlllwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc3RhdGVJbnQgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjQ2LCAyMDgsIDQwKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5zdHJpbmcgPSBcIuS4rTogXCIgKyBzdGF0ZV9MYWJlbCArIE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5jdXJyZW5jeTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zYXRhdGVEb3UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNhdGF0ZURvdS54ID0gdGhpcy5zdGF0ZUxhYmVsLm5vZGUueCAtICh0aGlzLnN0YXRlTGFiZWwubm9kZS53aWR0aCAtIDY4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHN0YXRlSW50ID09IDIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDE4MCwgMTgwLCAxODApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IFwi5pyq5Lit5aWWXCI7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYoc3RhdGVJbnQgPT0gMylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTgwLCAxODAsIDE4MCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwuc3RyaW5nID0gXCLlt7Llj5bmtohcIjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICB0aGlzLmFuZ2xlICs9IGR0ICogMzYwO1xuICAgICAgICAgXG4gICAgICAgICBpZih0aGlzLmFuZ2xlID4gMzYwKVxuICAgICAgICAge1xuICAgICAgICAgICAgIHRoaXMuYW5nbGUgLT0gMzYwO1xuICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSAgdGhpcy5hbmdsZTtcbiAgICAgfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtX3h4MTogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtX3h4Mjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1feHgzOiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1feHg0OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgICBtX3h4NTogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgbV94eDY6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgIG1feHg3OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgICBtX3h4ODogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgbV94eDk6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgbV94eDEwOiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIG1feHgxMTogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBtX3h4MTI6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV94eDEzOiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1feHgxNDogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtX3h4MTU6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV94eDE2OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1feHgxNzogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtX3h4MTg6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV8xeHgxOiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fMXh4Mjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fMXh4MzogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtXzF4eDQ6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgIG1fMXh4NTogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgbV8xeHg2OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgICBtXzF4eDc6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgIG1fMXh4ODogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgbV8xeHg5OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIG1fMXh4MTA6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgbV8xeHgxMTogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBtXzF4eDEyOiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fMXh4MTM6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV8xeHgxNDogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtXzF4eDE1OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fMXh4MTY6IHsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV8xeHgxNzogeyBcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtXzF4eDE4OiB7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxODtcclxuICAgICAgICBcclxuICAgICAgICAvL+a1i+ivlVxyXG4gICAgICAgIC8qdmFyIHRpbWVDYWxsYmFjayA9IGZ1bmN0aW9uIChkdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5hbmlTdGFydCgpO1xyXG4gICAgICAgICAgIHRoaXMuYW5pU3RhcnRUd28oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGltZUNhbGxiYWNrLCAyKTsqL1xyXG4gICAgICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBoaWRlQWxsOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX3h4MS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHgzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX3h4NC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHg2Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX3h4Ny5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDgubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHg5Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX3h4MTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHgxMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDEyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX3h4MTMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHgxNC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDE1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX3h4MTYubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1feHgxNy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV94eDE4Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fMXh4Mi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV8xeHgzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fMXh4NS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV8xeHg2Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fMXh4OC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV8xeHg5Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDExLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE2Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE3Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE4Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGFuaVN0YXJ0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5L2N572u5ZKM6YCP5piO5bqmXHJcbiAgICAgICAgLy90aGlzLm1feHg0Lm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAvL3RoaXMubV94eDMubm9kZS5yb3RhdGlvbiA9IDI1NTtcclxuICAgICAgICB0aGlzLm1feHgxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHgyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHgzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHg0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHg1Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHg3Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHg4Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHg5Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHgxMC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX3h4MTEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV94eDEyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHgxMy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX3h4MTQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV94eDE1Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1feHgxNi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX3h4MTcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV94eDE4Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4MS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV8xeHgzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4NC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV8xeHg3Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4OC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV8xeHgxMC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDExLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4MTIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV8xeHgxMy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4MTUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV8xeHgxNi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE3Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fMXh4MTgubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubV94eDEubm9kZS54ID0gMjcwOyAgICAgdGhpcy5tX3h4MS5ub2RlLnkgPSA5MjA7ICBcclxuICAgICAgICB0aGlzLm1feHgyLm5vZGUueCA9IC0zODc7ICAgICB0aGlzLm1feHgyLm5vZGUueSA9IDg4OTsgIFxyXG4gICAgICAgIHRoaXMubV94eDMubm9kZS54ID0gMjM2OyAgICB0aGlzLm1feHgzLm5vZGUueSA9IDk3NzsgIFxyXG4gICAgICAgIHRoaXMubV94eDQubm9kZS54ID0gLTEyMDsgICAgIHRoaXMubV94eDQubm9kZS55ID0gODcwIDsgIFxyXG4gICAgICAgIHRoaXMubV94eDUubm9kZS54ID0gLTM2MDsgICAgdGhpcy5tX3h4NS5ub2RlLnkgPSA5NTAgOyAgXHJcbiAgICAgICAgdGhpcy5tX3h4Ni5ub2RlLnggPSAwOyAgICAgICB0aGlzLm1feHg2Lm5vZGUueSA9IDk3MDsgIFxyXG4gICAgICAgIHRoaXMubV94eDcubm9kZS54ID0gMDsgICAgIHRoaXMubV94eDcubm9kZS55ID0gODcwOyAgXHJcbiAgICAgICAgdGhpcy5tX3h4OC5ub2RlLnggPSA3MDsgICAgIHRoaXMubV94eDgubm9kZS55ID0gOTcwOyAgXHJcbiAgICAgICAgdGhpcy5tX3h4OS5ub2RlLnggPSAxODA7ICAgIHRoaXMubV94eDkubm9kZS55ID0gODgwO1xyXG4gICAgICAgIHRoaXMubV94eDEwLm5vZGUueCA9IDA7ICAgIHRoaXMubV94eDEwLm5vZGUueSA9IDEwMDA7ICBcclxuICAgICAgICB0aGlzLm1feHgxMS5ub2RlLnggPSAyNTA7ICAgIHRoaXMubV94eDExLm5vZGUueSA9IDkxMDsgIFxyXG4gICAgICAgIHRoaXMubV94eDEyLm5vZGUueCA9IDIwMDsgICB0aGlzLm1feHgxMi5ub2RlLnkgPSA5OTA7ICBcclxuICAgICAgICB0aGlzLm1feHgxMy5ub2RlLnggPSAzNjA7ICAgIHRoaXMubV94eDEzLm5vZGUueSA9IDg2MDsgIFxyXG4gICAgICAgIHRoaXMubV94eDE0Lm5vZGUueCA9IDM0MDsgICB0aGlzLm1feHgxNC5ub2RlLnkgPSA5ODA7ICBcclxuICAgICAgICB0aGlzLm1feHgxNS5ub2RlLnggPSA0NzA7dGhpcy5tX3h4MTUubm9kZS55ID0gOTMwOyAgXHJcbiAgICAgICAgdGhpcy5tX3h4MTYubm9kZS54ID0gLTI2MDsgICAgdGhpcy5tX3h4MTYubm9kZS55ID0gMTAzMDsgIFxyXG4gICAgICAgIHRoaXMubV94eDE3Lm5vZGUueCA9IC0yODc7ICAgIHRoaXMubV94eDE3Lm5vZGUueSA9IDg2NjsgIFxyXG4gICAgICAgIHRoaXMubV94eDE4Lm5vZGUueCA9IC00NjA7ICAgdGhpcy5tX3h4MTgubm9kZS55ID0gOTMyO1xyXG5cclxuICAgICAgICB0aGlzLm1fMXh4MS5ub2RlLnggPSAtNDQzOyAgICAgdGhpcy5tXzF4eDEubm9kZS55ID0gMTM5ODsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgyLm5vZGUueCA9IC00OTQ7ICAgICB0aGlzLm1fMXh4Mi5ub2RlLnkgPSAxMzAwOyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDMubm9kZS54ID0gLTM5MTsgICAgdGhpcy5tXzF4eDMubm9kZS55ID0gMTcwMjsgIFxyXG4gICAgICAgIHRoaXMubV8xeHg0Lm5vZGUueCA9IC0xNDg7ICAgICB0aGlzLm1fMXh4NC5ub2RlLnkgPTEyMDc7ICBcclxuICAgICAgICB0aGlzLm1fMXh4NS5ub2RlLnggPSAtMzA2OyAgICB0aGlzLm1fMXh4NS5ub2RlLnkgPSAxMjg3OyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDYubm9kZS54ID0gMjA4OyAgICAgICB0aGlzLm1fMXh4Ni5ub2RlLnkgPSAxODI1OyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDcubm9kZS54ID0gMjcyOyAgICAgdGhpcy5tXzF4eDcubm9kZS55ID0gMTIwNzsgIFxyXG4gICAgICAgIHRoaXMubV8xeHg4Lm5vZGUueCA9IDg4OyAgICAgdGhpcy5tXzF4eDgubm9kZS55ID0gMTQxNzsgIFxyXG4gICAgICAgIHRoaXMubV8xeHg5Lm5vZGUueCA9IDQ1MjsgICAgdGhpcy5tXzF4eDkubm9kZS55ID0gMTMyMDtcclxuICAgICAgICB0aGlzLm1fMXh4MTAubm9kZS54ID0gMzIyOyAgICB0aGlzLm1fMXh4MTAubm9kZS55ID0gMTY1MzsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgxMS5ub2RlLnggPSA1MjI7ICAgIHRoaXMubV8xeHgxMS5ub2RlLnkgPSAxMzc4OyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDEyLm5vZGUueCA9IC04MTsgICB0aGlzLm1fMXh4MTIubm9kZS55ID0gMTcwMjsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgxMy5ub2RlLnggPSAzNTE7ICAgIHRoaXMubV8xeHgxMy5ub2RlLnkgPSAxMzIwOyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDE0Lm5vZGUueCA9IDMzODsgICB0aGlzLm1fMXh4MTQubm9kZS55ID0gMTUwMTsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgxNS5ub2RlLnggPSAtNDAxO3RoaXMubV8xeHgxNS5ub2RlLnkgPSAxNDc3OyAgXHJcbiAgICAgICAgdGhpcy5tXzF4eDE2Lm5vZGUueCA9IDEyOyAgICB0aGlzLm1fMXh4MTYubm9kZS55ID0gMTMyMTsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgxNy5ub2RlLnggPSAtMTU3OyAgICB0aGlzLm1fMXh4MTcubm9kZS55ID0gMTU3MzsgIFxyXG4gICAgICAgIHRoaXMubV8xeHgxOC5ub2RlLnggPSAtMTkwOyAgIHRoaXMubV8xeHgxOC5ub2RlLnkgPSAxNDE1OyAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBtb3ZlRGVzID0gLTMzMDA7XHJcbiAgICAgICAgLy94MSDliqjnlLsgY2MuZWFzZUJvdW5jZU91dCgpIGNjLmVhc2VFbGFzdGljT3V0KDAuOClcclxuICAgICAgICBsZXQgYWN0aW9uXzEgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7ICAgICAgICBcclxuICAgICAgICBsZXQgYWN0aW9uXzIgPSBjYy5tb3ZlQnkoMy4xLCBjYy5wKDAsIG1vdmVEZXMpKTsvL2NjLmVhc2VFbGFzdGljT3V0KDMuMClcclxuICAgICAgICBsZXQgYWN0aW9uXzMgPSBjYy5tb3ZlQnkoMy4yNSwgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbl80ID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb25fNSA9IGNjLm1vdmVCeSgzLjI1LCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uXzYgPSBjYy5tb3ZlQnkoMy4yNSwgY2MucCgwLG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uXzcgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbl84ID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb25fOSA9IGNjLm1vdmVCeSgzLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uXzEwID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb25fMTIgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7Ly9jYy5lYXNlRWxhc3RpY091dCgzLjBcclxuICAgICAgICBsZXQgYWN0aW9uXzEzID0gY2MubW92ZUJ5KDMuMSwgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbl8xNCA9IGNjLm1vdmVCeSgzLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uXzE1ID0gY2MubW92ZUJ5KDMuMSwgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbl8xNiA9IGNjLm1vdmVCeSgzLjEsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb25fMTcgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7ICAgXHJcbiAgICAgICAgbGV0IGFjdGlvbl8xOCA9IGNjLm1vdmVCeSgzLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uXzE5ID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzEgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7ICAgICAgICBcclxuICAgICAgICBsZXQgYWN0aW9uMV8yID0gY2MubW92ZUJ5KDMuMSwgY2MucCgwLCBtb3ZlRGVzKSk7Ly9jYy5lYXNlRWxhc3RpY091dCgzLjApXHJcbiAgICAgICAgbGV0IGFjdGlvbjFfMyA9IGNjLm1vdmVCeSgzLjEsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzQgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbjFfNSA9IGNjLm1vdmVCeSgzLjEsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzYgPSBjYy5tb3ZlQnkoMy4xLCBjYy5wKDAsbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzcgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbjFfOCA9IGNjLm1vdmVCeSgzLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uMV85ID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzEwID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzEyID0gY2MubW92ZUJ5KDMsIGNjLnAoMCwgbW92ZURlcykpOy8vY2MuZWFzZUVsYXN0aWNPdXQoMy4wXHJcbiAgICAgICAgbGV0IGFjdGlvbjFfMTMgPSBjYy5tb3ZlQnkoMy4xLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uMV8xNCA9IGNjLm1vdmVCeSgzLCBjYy5wKDAsIG1vdmVEZXMpKTtcclxuICAgICAgICBsZXQgYWN0aW9uMV8xNSA9IGNjLm1vdmVCeSgzLjEsIGNjLnAoMCwgbW92ZURlcykpO1xyXG4gICAgICAgIGxldCBhY3Rpb24xXzE2ID0gY2MubW92ZUJ5KDMuMSwgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbjFfMTcgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7ICAgXHJcbiAgICAgICAgbGV0IGFjdGlvbjFfMTggPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbjFfMTkgPSBjYy5tb3ZlQnkoMywgY2MucCgwLCBtb3ZlRGVzKSk7ICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1feHgxLm5vZGUucnVuQWN0aW9uKGFjdGlvbl8xKTtcclxuICAgICAgICB0aGlzLm1feHgyLm5vZGUucnVuQWN0aW9uKGFjdGlvbl8yKTtcclxuICAgICAgICB0aGlzLm1feHgzLm5vZGUucnVuQWN0aW9uKGFjdGlvbl8zKTtcclxuICAgICAgICB0aGlzLm1feHg0Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl80KTtcclxuICAgICAgICB0aGlzLm1feHg1Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl81KTtcclxuICAgICAgICB0aGlzLm1feHg2Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl82KTtcclxuICAgICAgICB0aGlzLm1feHg3Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl83KTtcclxuICAgICAgICB0aGlzLm1feHg4Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl84KTtcclxuICAgICAgICB0aGlzLm1feHg5Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl85KTtcclxuICAgICAgICB0aGlzLm1feHgxMC5ub2RlLnJ1bkFjdGlvbihhY3Rpb25fMTApO1xyXG4gICAgICAgIHRoaXMubV94eDExLm5vZGUucnVuQWN0aW9uKGFjdGlvbl8xMik7XHJcbiAgICAgICAgdGhpcy5tX3h4MTIubm9kZS5ydW5BY3Rpb24oYWN0aW9uXzEzKTtcclxuICAgICAgICB0aGlzLm1feHgxMy5ub2RlLnJ1bkFjdGlvbihhY3Rpb25fMTQpO1xyXG4gICAgICAgIHRoaXMubV94eDE0Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl8xNSk7XHJcbiAgICAgICAgdGhpcy5tX3h4MTUubm9kZS5ydW5BY3Rpb24oYWN0aW9uXzE2KTtcclxuICAgICAgICB0aGlzLm1feHgxNi5ub2RlLnJ1bkFjdGlvbihhY3Rpb25fMTcpO1xyXG4gICAgICAgIHRoaXMubV94eDE3Lm5vZGUucnVuQWN0aW9uKGFjdGlvbl8xOCk7XHJcbiAgICAgICAgdGhpcy5tX3h4MTgubm9kZS5ydW5BY3Rpb24oYWN0aW9uXzE5KTtcclxuXHJcbiAgICAgICAgdGhpcy5tXzF4eDEubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV8xKTtcclxuICAgICAgICB0aGlzLm1fMXh4Mi5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzIpO1xyXG4gICAgICAgIHRoaXMubV8xeHgzLm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfMyk7XHJcbiAgICAgICAgdGhpcy5tXzF4eDQubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV80KTtcclxuICAgICAgICB0aGlzLm1fMXh4NS5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzUpO1xyXG4gICAgICAgIHRoaXMubV8xeHg2Lm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfNik7XHJcbiAgICAgICAgdGhpcy5tXzF4eDcubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV83KTtcclxuICAgICAgICB0aGlzLm1fMXh4OC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzgpO1xyXG4gICAgICAgIHRoaXMubV8xeHg5Lm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfOSk7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEwLm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfMTApO1xyXG4gICAgICAgIHRoaXMubV8xeHgxMS5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzEyKTtcclxuICAgICAgICB0aGlzLm1fMXh4MTIubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV8xMyk7XHJcbiAgICAgICAgdGhpcy5tXzF4eDEzLm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfMTQpO1xyXG4gICAgICAgIHRoaXMubV8xeHgxNC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzE1KTtcclxuICAgICAgICB0aGlzLm1fMXh4MTUubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV8xNik7XHJcbiAgICAgICAgdGhpcy5tXzF4eDE2Lm5vZGUucnVuQWN0aW9uKGFjdGlvbjFfMTcpO1xyXG4gICAgICAgIHRoaXMubV8xeHgxNy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24xXzE4KTtcclxuICAgICAgICB0aGlzLm1fMXh4MTgubm9kZS5ydW5BY3Rpb24oYWN0aW9uMV8xOSk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJ2YXIgQ3J5cHRvSlM9cmVxdWlyZShcIi4vY29yZVwiKTtyZXF1aXJlKFwiLi4vYWVzL21kNVwiKTtyZXF1aXJlKFwiLi4vYWVzL2VuYy1iYXNlNjRcIik7cmVxdWlyZShcIi4uL2Flcy9ldnBrZGZcIik7cmVxdWlyZShcIi4uL2Flcy9jaXBoZXItY29yZVwiKTtyZXF1aXJlKFwiLi4vYWVzL21vZGUtZWNiXCIpOyhmdW5jdGlvbigpe3ZhciBDPUNyeXB0b0pTO3ZhciBDX2xpYj1DLmxpYjt2YXIgQmxvY2tDaXBoZXI9Q19saWIuQmxvY2tDaXBoZXI7dmFyIENfYWxnbz1DLmFsZ287dmFyIFNCT1g9W107dmFyIElOVl9TQk9YPVtdO3ZhciBTVUJfTUlYXzA9W107dmFyIFNVQl9NSVhfMT1bXTt2YXIgU1VCX01JWF8yPVtdO3ZhciBTVUJfTUlYXzM9W107dmFyIElOVl9TVUJfTUlYXzA9W107dmFyIElOVl9TVUJfTUlYXzE9W107dmFyIElOVl9TVUJfTUlYXzI9W107dmFyIElOVl9TVUJfTUlYXzM9W107KGZ1bmN0aW9uKCl7dmFyIGQ9W107Zm9yKHZhciBpPTA7aTwyNTY7aSsrKXtpZihpPDEyOCl7ZFtpXT1pPDwxfWVsc2V7ZFtpXT0oaTw8MSleMjgzfX12YXIgeD0wO3ZhciB4aT0wO2Zvcih2YXIgaT0wO2k8MjU2O2krKyl7dmFyIHN4PXhpXih4aTw8MSleKHhpPDwyKV4oeGk8PDMpXih4aTw8NCk7c3g9KHN4Pj4+OCleKHN4JjI1NSleOTk7U0JPWFt4XT1zeDtJTlZfU0JPWFtzeF09eDt2YXIgeDI9ZFt4XTt2YXIgeDQ9ZFt4Ml07dmFyIHg4PWRbeDRdO3ZhciB0PShkW3N4XSoyNTcpXihzeCoxNjg0MzAwOCk7U1VCX01JWF8wW3hdPSh0PDwyNCl8KHQ+Pj44KTtTVUJfTUlYXzFbeF09KHQ8PDE2KXwodD4+PjE2KTtTVUJfTUlYXzJbeF09KHQ8PDgpfCh0Pj4+MjQpO1NVQl9NSVhfM1t4XT10O3ZhciB0PSh4OCoxNjg0MzAwOSleKHg0KjY1NTM3KV4oeDIqMjU3KV4oeCoxNjg0MzAwOCk7SU5WX1NVQl9NSVhfMFtzeF09KHQ8PDI0KXwodD4+PjgpO0lOVl9TVUJfTUlYXzFbc3hdPSh0PDwxNil8KHQ+Pj4xNik7SU5WX1NVQl9NSVhfMltzeF09KHQ8PDgpfCh0Pj4+MjQpO0lOVl9TVUJfTUlYXzNbc3hdPXQ7aWYoIXgpe3g9eGk9MX1lbHNle3g9eDJeZFtkW2RbeDheeDJdXV07eGlePWRbZFt4aV1dfX19KCkpO3ZhciBSQ09OPVswLDEsMiw0LDgsMTYsMzIsNjQsMTI4LDI3LDU0XTt2YXIgQUVTPUNfYWxnby5BRVM9QmxvY2tDaXBoZXIuZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe3ZhciBrZXk9dGhpcy5fa2V5O3ZhciBrZXlXb3Jkcz1rZXkud29yZHM7dmFyIGtleVNpemU9a2V5LnNpZ0J5dGVzLzQ7dmFyIG5Sb3VuZHM9dGhpcy5fblJvdW5kcz1rZXlTaXplKzY7dmFyIGtzUm93cz0oblJvdW5kcysxKSo0O3ZhciBrZXlTY2hlZHVsZT10aGlzLl9rZXlTY2hlZHVsZT1bXTtmb3IodmFyIGtzUm93PTA7a3NSb3c8a3NSb3dzO2tzUm93Kyspe2lmKGtzUm93PGtleVNpemUpe2tleVNjaGVkdWxlW2tzUm93XT1rZXlXb3Jkc1trc1Jvd119ZWxzZXt2YXIgdD1rZXlTY2hlZHVsZVtrc1Jvdy0xXTtpZighKGtzUm93JWtleVNpemUpKXt0PSh0PDw4KXwodD4+PjI0KTt0PShTQk9YW3Q+Pj4yNF08PDI0KXwoU0JPWFsodD4+PjE2KSYyNTVdPDwxNil8KFNCT1hbKHQ+Pj44KSYyNTVdPDw4KXxTQk9YW3QmMjU1XTt0Xj1SQ09OWyhrc1Jvdy9rZXlTaXplKXwwXTw8MjR9ZWxzZXtpZihrZXlTaXplPjYmJmtzUm93JWtleVNpemU9PTQpe3Q9KFNCT1hbdD4+PjI0XTw8MjQpfChTQk9YWyh0Pj4+MTYpJjI1NV08PDE2KXwoU0JPWFsodD4+PjgpJjI1NV08PDgpfFNCT1hbdCYyNTVdfX1rZXlTY2hlZHVsZVtrc1Jvd109a2V5U2NoZWR1bGVba3NSb3cta2V5U2l6ZV1edH19dmFyIGludktleVNjaGVkdWxlPXRoaXMuX2ludktleVNjaGVkdWxlPVtdO2Zvcih2YXIgaW52S3NSb3c9MDtpbnZLc1Jvdzxrc1Jvd3M7aW52S3NSb3crKyl7dmFyIGtzUm93PWtzUm93cy1pbnZLc1JvdztpZihpbnZLc1JvdyU0KXt2YXIgdD1rZXlTY2hlZHVsZVtrc1Jvd119ZWxzZXt2YXIgdD1rZXlTY2hlZHVsZVtrc1Jvdy00XX1pZihpbnZLc1Jvdzw0fHxrc1Jvdzw9NCl7aW52S2V5U2NoZWR1bGVbaW52S3NSb3ddPXR9ZWxzZXtpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd109SU5WX1NVQl9NSVhfMFtTQk9YW3Q+Pj4yNF1dXklOVl9TVUJfTUlYXzFbU0JPWFsodD4+PjE2KSYyNTVdXV5JTlZfU1VCX01JWF8yW1NCT1hbKHQ+Pj44KSYyNTVdXV5JTlZfU1VCX01JWF8zW1NCT1hbdCYyNTVdXX19fSxlbmNyeXB0QmxvY2s6ZnVuY3Rpb24oTSxvZmZzZXQpe3RoaXMuX2RvQ3J5cHRCbG9jayhNLG9mZnNldCx0aGlzLl9rZXlTY2hlZHVsZSxTVUJfTUlYXzAsU1VCX01JWF8xLFNVQl9NSVhfMixTVUJfTUlYXzMsU0JPWCl9LGRlY3J5cHRCbG9jazpmdW5jdGlvbihNLG9mZnNldCl7dmFyIHQ9TVtvZmZzZXQrMV07TVtvZmZzZXQrMV09TVtvZmZzZXQrM107TVtvZmZzZXQrM109dDt0aGlzLl9kb0NyeXB0QmxvY2soTSxvZmZzZXQsdGhpcy5faW52S2V5U2NoZWR1bGUsSU5WX1NVQl9NSVhfMCxJTlZfU1VCX01JWF8xLElOVl9TVUJfTUlYXzIsSU5WX1NVQl9NSVhfMyxJTlZfU0JPWCk7dmFyIHQ9TVtvZmZzZXQrMV07TVtvZmZzZXQrMV09TVtvZmZzZXQrM107TVtvZmZzZXQrM109dH0sX2RvQ3J5cHRCbG9jazpmdW5jdGlvbihNLG9mZnNldCxrZXlTY2hlZHVsZSxTVUJfTUlYXzAsU1VCX01JWF8xLFNVQl9NSVhfMixTVUJfTUlYXzMsU0JPWCl7dmFyIG5Sb3VuZHM9dGhpcy5fblJvdW5kczt2YXIgczA9TVtvZmZzZXRdXmtleVNjaGVkdWxlWzBdO3ZhciBzMT1NW29mZnNldCsxXV5rZXlTY2hlZHVsZVsxXTt2YXIgczI9TVtvZmZzZXQrMl1ea2V5U2NoZWR1bGVbMl07dmFyIHMzPU1bb2Zmc2V0KzNdXmtleVNjaGVkdWxlWzNdO3ZhciBrc1Jvdz00O2Zvcih2YXIgcm91bmQ9MTtyb3VuZDxuUm91bmRzO3JvdW5kKyspe3ZhciB0MD1TVUJfTUlYXzBbczA+Pj4yNF1eU1VCX01JWF8xWyhzMT4+PjE2KSYyNTVdXlNVQl9NSVhfMlsoczI+Pj44KSYyNTVdXlNVQl9NSVhfM1tzMyYyNTVdXmtleVNjaGVkdWxlW2tzUm93KytdO3ZhciB0MT1TVUJfTUlYXzBbczE+Pj4yNF1eU1VCX01JWF8xWyhzMj4+PjE2KSYyNTVdXlNVQl9NSVhfMlsoczM+Pj44KSYyNTVdXlNVQl9NSVhfM1tzMCYyNTVdXmtleVNjaGVkdWxlW2tzUm93KytdO3ZhciB0Mj1TVUJfTUlYXzBbczI+Pj4yNF1eU1VCX01JWF8xWyhzMz4+PjE2KSYyNTVdXlNVQl9NSVhfMlsoczA+Pj44KSYyNTVdXlNVQl9NSVhfM1tzMSYyNTVdXmtleVNjaGVkdWxlW2tzUm93KytdO3ZhciB0Mz1TVUJfTUlYXzBbczM+Pj4yNF1eU1VCX01JWF8xWyhzMD4+PjE2KSYyNTVdXlNVQl9NSVhfMlsoczE+Pj44KSYyNTVdXlNVQl9NSVhfM1tzMiYyNTVdXmtleVNjaGVkdWxlW2tzUm93KytdO3MwPXQwO3MxPXQxO3MyPXQyO3MzPXQzfXZhciB0MD0oKFNCT1hbczA+Pj4yNF08PDI0KXwoU0JPWFsoczE+Pj4xNikmMjU1XTw8MTYpfChTQk9YWyhzMj4+PjgpJjI1NV08PDgpfFNCT1hbczMmMjU1XSlea2V5U2NoZWR1bGVba3NSb3crK107dmFyIHQxPSgoU0JPWFtzMT4+PjI0XTw8MjQpfChTQk9YWyhzMj4+PjE2KSYyNTVdPDwxNil8KFNCT1hbKHMzPj4+OCkmMjU1XTw8OCl8U0JPWFtzMCYyNTVdKV5rZXlTY2hlZHVsZVtrc1JvdysrXTt2YXIgdDI9KChTQk9YW3MyPj4+MjRdPDwyNCl8KFNCT1hbKHMzPj4+MTYpJjI1NV08PDE2KXwoU0JPWFsoczA+Pj44KSYyNTVdPDw4KXxTQk9YW3MxJjI1NV0pXmtleVNjaGVkdWxlW2tzUm93KytdO3ZhciB0Mz0oKFNCT1hbczM+Pj4yNF08PDI0KXwoU0JPWFsoczA+Pj4xNikmMjU1XTw8MTYpfChTQk9YWyhzMT4+PjgpJjI1NV08PDgpfFNCT1hbczImMjU1XSlea2V5U2NoZWR1bGVba3NSb3crK107TVtvZmZzZXRdPXQwO01bb2Zmc2V0KzFdPXQxO01bb2Zmc2V0KzJdPXQyO01bb2Zmc2V0KzNdPXQzfSxrZXlTaXplOjI1Ni8zMn0pO0MuQUVTPUJsb2NrQ2lwaGVyLl9jcmVhdGVIZWxwZXIoQUVTKX0oKSkiLCJ2YXIgQ3J5cHRvSlM9cmVxdWlyZShcIi4vY29yZVwiKTtDcnlwdG9KUy5saWIuQ2lwaGVyfHwoZnVuY3Rpb24odW5kZWZpbmVkKXt2YXIgQz1DcnlwdG9KUzt2YXIgQ19saWI9Qy5saWI7dmFyIEJhc2U9Q19saWIuQmFzZTt2YXIgV29yZEFycmF5PUNfbGliLldvcmRBcnJheTt2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobT1DX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtO3ZhciBDX2VuYz1DLmVuYzt2YXIgVXRmOD1DX2VuYy5VdGY4O3ZhciBCYXNlNjQ9Q19lbmMuQmFzZTY0O3ZhciBDX2FsZ289Qy5hbGdvO3ZhciBFdnBLREY9Q19hbGdvLkV2cEtERjt2YXIgQ2lwaGVyPUNfbGliLkNpcGhlcj1CdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7Y2ZnOkJhc2UuZXh0ZW5kKCksY3JlYXRlRW5jcnlwdG9yOmZ1bmN0aW9uKGtleSxjZmcpe3JldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9FTkNfWEZPUk1fTU9ERSxrZXksY2ZnKX0sY3JlYXRlRGVjcnlwdG9yOmZ1bmN0aW9uKGtleSxjZmcpe3JldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9ERUNfWEZPUk1fTU9ERSxrZXksY2ZnKX0saW5pdDpmdW5jdGlvbih4Zm9ybU1vZGUsa2V5LGNmZyl7dGhpcy5jZmc9dGhpcy5jZmcuZXh0ZW5kKGNmZyk7dGhpcy5feGZvcm1Nb2RlPXhmb3JtTW9kZTt0aGlzLl9rZXk9a2V5O3RoaXMucmVzZXQoKX0scmVzZXQ6ZnVuY3Rpb24oKXtCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7dGhpcy5fZG9SZXNldCgpfSxwcm9jZXNzOmZ1bmN0aW9uKGRhdGFVcGRhdGUpe3RoaXMuX2FwcGVuZChkYXRhVXBkYXRlKTtyZXR1cm4gdGhpcy5fcHJvY2VzcygpfSxmaW5hbGl6ZTpmdW5jdGlvbihkYXRhVXBkYXRlKXtpZihkYXRhVXBkYXRlKXt0aGlzLl9hcHBlbmQoZGF0YVVwZGF0ZSl9dmFyIGZpbmFsUHJvY2Vzc2VkRGF0YT10aGlzLl9kb0ZpbmFsaXplKCk7cmV0dXJuIGZpbmFsUHJvY2Vzc2VkRGF0YX0sa2V5U2l6ZToxMjgvMzIsaXZTaXplOjEyOC8zMixfRU5DX1hGT1JNX01PREU6MSxfREVDX1hGT1JNX01PREU6MixfY3JlYXRlSGVscGVyOihmdW5jdGlvbigpe2Z1bmN0aW9uIHNlbGVjdENpcGhlclN0cmF0ZWd5KGtleSl7aWYodHlwZW9mIGtleT09XCJzdHJpbmdcIil7cmV0dXJuIFBhc3N3b3JkQmFzZWRDaXBoZXJ9ZWxzZXtyZXR1cm4gU2VyaWFsaXphYmxlQ2lwaGVyfX1yZXR1cm4gZnVuY3Rpb24oY2lwaGVyKXtyZXR1cm57ZW5jcnlwdDpmdW5jdGlvbihtZXNzYWdlLGtleSxjZmcpe3JldHVybiBzZWxlY3RDaXBoZXJTdHJhdGVneShrZXkpLmVuY3J5cHQoY2lwaGVyLG1lc3NhZ2Usa2V5LGNmZyl9LGRlY3J5cHQ6ZnVuY3Rpb24oY2lwaGVydGV4dCxrZXksY2ZnKXtyZXR1cm4gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KS5kZWNyeXB0KGNpcGhlcixjaXBoZXJ0ZXh0LGtleSxjZmcpfX19fSgpKX0pO3ZhciBTdHJlYW1DaXBoZXI9Q19saWIuU3RyZWFtQ2lwaGVyPUNpcGhlci5leHRlbmQoe19kb0ZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGZpbmFsUHJvY2Vzc2VkQmxvY2tzPXRoaXMuX3Byb2Nlc3MoISFcImZsdXNoXCIpO3JldHVybiBmaW5hbFByb2Nlc3NlZEJsb2Nrc30sYmxvY2tTaXplOjF9KTt2YXIgQ19tb2RlPUMubW9kZT17fTt2YXIgQmxvY2tDaXBoZXJNb2RlPUNfbGliLkJsb2NrQ2lwaGVyTW9kZT1CYXNlLmV4dGVuZCh7Y3JlYXRlRW5jcnlwdG9yOmZ1bmN0aW9uKGNpcGhlcixpdil7cmV0dXJuIHRoaXMuRW5jcnlwdG9yLmNyZWF0ZShjaXBoZXIsaXYpfSxjcmVhdGVEZWNyeXB0b3I6ZnVuY3Rpb24oY2lwaGVyLGl2KXtyZXR1cm4gdGhpcy5EZWNyeXB0b3IuY3JlYXRlKGNpcGhlcixpdil9LGluaXQ6ZnVuY3Rpb24oY2lwaGVyLGl2KXt0aGlzLl9jaXBoZXI9Y2lwaGVyO3RoaXMuX2l2PWl2fX0pO3ZhciBDQkM9Q19tb2RlLkNCQz0oZnVuY3Rpb24oKXt2YXIgQ0JDPUJsb2NrQ2lwaGVyTW9kZS5leHRlbmQoKTtDQkMuRW5jcnlwdG9yPUNCQy5leHRlbmQoe3Byb2Nlc3NCbG9jazpmdW5jdGlvbih3b3JkcyxvZmZzZXQpe3ZhciBjaXBoZXI9dGhpcy5fY2lwaGVyO3ZhciBibG9ja1NpemU9Y2lwaGVyLmJsb2NrU2l6ZTt4b3JCbG9jay5jYWxsKHRoaXMsd29yZHMsb2Zmc2V0LGJsb2NrU2l6ZSk7Y2lwaGVyLmVuY3J5cHRCbG9jayh3b3JkcyxvZmZzZXQpO3RoaXMuX3ByZXZCbG9jaz13b3Jkcy5zbGljZShvZmZzZXQsb2Zmc2V0K2Jsb2NrU2l6ZSl9fSk7Q0JDLkRlY3J5cHRvcj1DQkMuZXh0ZW5kKHtwcm9jZXNzQmxvY2s6ZnVuY3Rpb24od29yZHMsb2Zmc2V0KXt2YXIgY2lwaGVyPXRoaXMuX2NpcGhlcjt2YXIgYmxvY2tTaXplPWNpcGhlci5ibG9ja1NpemU7dmFyIHRoaXNCbG9jaz13b3Jkcy5zbGljZShvZmZzZXQsb2Zmc2V0K2Jsb2NrU2l6ZSk7Y2lwaGVyLmRlY3J5cHRCbG9jayh3b3JkcyxvZmZzZXQpO3hvckJsb2NrLmNhbGwodGhpcyx3b3JkcyxvZmZzZXQsYmxvY2tTaXplKTt0aGlzLl9wcmV2QmxvY2s9dGhpc0Jsb2NrfX0pO2Z1bmN0aW9uIHhvckJsb2NrKHdvcmRzLG9mZnNldCxibG9ja1NpemUpe3ZhciBpdj10aGlzLl9pdjtpZihpdil7dmFyIGJsb2NrPWl2O3RoaXMuX2l2PXVuZGVmaW5lZH1lbHNle3ZhciBibG9jaz10aGlzLl9wcmV2QmxvY2t9Zm9yKHZhciBpPTA7aTxibG9ja1NpemU7aSsrKXt3b3Jkc1tvZmZzZXQraV1ePWJsb2NrW2ldfX1yZXR1cm4gQ0JDfSgpKTt2YXIgQ19wYWQ9Qy5wYWQ9e307dmFyIFBrY3M3PUNfcGFkLlBrY3M3PXtwYWQ6ZnVuY3Rpb24oZGF0YSxibG9ja1NpemUpe3ZhciBibG9ja1NpemVCeXRlcz1ibG9ja1NpemUqNDt2YXIgblBhZGRpbmdCeXRlcz1ibG9ja1NpemVCeXRlcy1kYXRhLnNpZ0J5dGVzJWJsb2NrU2l6ZUJ5dGVzO3ZhciBwYWRkaW5nV29yZD0oblBhZGRpbmdCeXRlczw8MjQpfChuUGFkZGluZ0J5dGVzPDwxNil8KG5QYWRkaW5nQnl0ZXM8PDgpfG5QYWRkaW5nQnl0ZXM7dmFyIHBhZGRpbmdXb3Jkcz1bXTtmb3IodmFyIGk9MDtpPG5QYWRkaW5nQnl0ZXM7aSs9NCl7cGFkZGluZ1dvcmRzLnB1c2gocGFkZGluZ1dvcmQpfXZhciBwYWRkaW5nPVdvcmRBcnJheS5jcmVhdGUocGFkZGluZ1dvcmRzLG5QYWRkaW5nQnl0ZXMpO2RhdGEuY29uY2F0KHBhZGRpbmcpfSx1bnBhZDpmdW5jdGlvbihkYXRhKXt2YXIgblBhZGRpbmdCeXRlcz1kYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzLTEpPj4+Ml0mMjU1O2RhdGEuc2lnQnl0ZXMtPW5QYWRkaW5nQnl0ZXN9fTt2YXIgQmxvY2tDaXBoZXI9Q19saWIuQmxvY2tDaXBoZXI9Q2lwaGVyLmV4dGVuZCh7Y2ZnOkNpcGhlci5jZmcuZXh0ZW5kKHttb2RlOkNCQyxwYWRkaW5nOlBrY3M3fSkscmVzZXQ6ZnVuY3Rpb24oKXtDaXBoZXIucmVzZXQuY2FsbCh0aGlzKTt2YXIgY2ZnPXRoaXMuY2ZnO3ZhciBpdj1jZmcuaXY7dmFyIG1vZGU9Y2ZnLm1vZGU7aWYodGhpcy5feGZvcm1Nb2RlPT10aGlzLl9FTkNfWEZPUk1fTU9ERSl7dmFyIG1vZGVDcmVhdG9yPW1vZGUuY3JlYXRlRW5jcnlwdG9yfWVsc2V7dmFyIG1vZGVDcmVhdG9yPW1vZGUuY3JlYXRlRGVjcnlwdG9yO3RoaXMuX21pbkJ1ZmZlclNpemU9MX10aGlzLl9tb2RlPW1vZGVDcmVhdG9yLmNhbGwobW9kZSx0aGlzLGl2JiZpdi53b3Jkcyl9LF9kb1Byb2Nlc3NCbG9jazpmdW5jdGlvbih3b3JkcyxvZmZzZXQpe3RoaXMuX21vZGUucHJvY2Vzc0Jsb2NrKHdvcmRzLG9mZnNldCl9LF9kb0ZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIHBhZGRpbmc9dGhpcy5jZmcucGFkZGluZztpZih0aGlzLl94Zm9ybU1vZGU9PXRoaXMuX0VOQ19YRk9STV9NT0RFKXtwYWRkaW5nLnBhZCh0aGlzLl9kYXRhLHRoaXMuYmxvY2tTaXplKTt2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3M9dGhpcy5fcHJvY2VzcyghIVwiZmx1c2hcIil9ZWxzZXt2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3M9dGhpcy5fcHJvY2VzcyghIVwiZmx1c2hcIik7cGFkZGluZy51bnBhZChmaW5hbFByb2Nlc3NlZEJsb2Nrcyl9cmV0dXJuIGZpbmFsUHJvY2Vzc2VkQmxvY2tzfSxibG9ja1NpemU6MTI4LzMyfSk7dmFyIENpcGhlclBhcmFtcz1DX2xpYi5DaXBoZXJQYXJhbXM9QmFzZS5leHRlbmQoe2luaXQ6ZnVuY3Rpb24oY2lwaGVyUGFyYW1zKXt0aGlzLm1peEluKGNpcGhlclBhcmFtcyl9LHRvU3RyaW5nOmZ1bmN0aW9uKGZvcm1hdHRlcil7cmV0dXJuKGZvcm1hdHRlcnx8dGhpcy5mb3JtYXR0ZXIpLnN0cmluZ2lmeSh0aGlzKX19KTt2YXIgQ19mb3JtYXQ9Qy5mb3JtYXQ9e307dmFyIE9wZW5TU0xGb3JtYXR0ZXI9Q19mb3JtYXQuT3BlblNTTD17c3RyaW5naWZ5OmZ1bmN0aW9uKGNpcGhlclBhcmFtcyl7dmFyIGNpcGhlcnRleHQ9Y2lwaGVyUGFyYW1zLmNpcGhlcnRleHQ7dmFyIHNhbHQ9Y2lwaGVyUGFyYW1zLnNhbHQ7aWYoc2FsdCl7dmFyIHdvcmRBcnJheT1Xb3JkQXJyYXkuY3JlYXRlKFsxMzk4ODkzNjg0LDE3MDEwNzY4MzFdKS5jb25jYXQoc2FsdCkuY29uY2F0KGNpcGhlcnRleHQpfWVsc2V7dmFyIHdvcmRBcnJheT1jaXBoZXJ0ZXh0fXJldHVybiB3b3JkQXJyYXkudG9TdHJpbmcoQmFzZTY0KX0scGFyc2U6ZnVuY3Rpb24ob3BlblNTTFN0cil7dmFyIGNpcGhlcnRleHQ9QmFzZTY0LnBhcnNlKG9wZW5TU0xTdHIpO3ZhciBjaXBoZXJ0ZXh0V29yZHM9Y2lwaGVydGV4dC53b3JkcztpZihjaXBoZXJ0ZXh0V29yZHNbMF09PTEzOTg4OTM2ODQmJmNpcGhlcnRleHRXb3Jkc1sxXT09MTcwMTA3NjgzMSl7dmFyIHNhbHQ9V29yZEFycmF5LmNyZWF0ZShjaXBoZXJ0ZXh0V29yZHMuc2xpY2UoMiw0KSk7Y2lwaGVydGV4dFdvcmRzLnNwbGljZSgwLDQpO2NpcGhlcnRleHQuc2lnQnl0ZXMtPTE2fXJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHtjaXBoZXJ0ZXh0OmNpcGhlcnRleHQsc2FsdDpzYWx0fSl9fTt2YXIgU2VyaWFsaXphYmxlQ2lwaGVyPUNfbGliLlNlcmlhbGl6YWJsZUNpcGhlcj1CYXNlLmV4dGVuZCh7Y2ZnOkJhc2UuZXh0ZW5kKHtmb3JtYXQ6T3BlblNTTEZvcm1hdHRlcn0pLGVuY3J5cHQ6ZnVuY3Rpb24oY2lwaGVyLG1lc3NhZ2Usa2V5LGNmZyl7Y2ZnPXRoaXMuY2ZnLmV4dGVuZChjZmcpO1xyXG4gICAgdmFyIGVuY3J5cHRvcj1jaXBoZXIuY3JlYXRlRW5jcnlwdG9yKGtleSxjZmcpO3ZhciBjaXBoZXJ0ZXh0PWVuY3J5cHRvci5maW5hbGl6ZShtZXNzYWdlKTt2YXIgY2lwaGVyQ2ZnPWVuY3J5cHRvci5jZmc7cmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoe2NpcGhlcnRleHQ6Y2lwaGVydGV4dCxrZXk6a2V5LGl2OmNpcGhlckNmZy5pdixhbGdvcml0aG06Y2lwaGVyLG1vZGU6Y2lwaGVyQ2ZnLm1vZGUscGFkZGluZzpjaXBoZXJDZmcucGFkZGluZyxibG9ja1NpemU6Y2lwaGVyLmJsb2NrU2l6ZSxmb3JtYXR0ZXI6Y2ZnLmZvcm1hdH0pfSxkZWNyeXB0OmZ1bmN0aW9uKGNpcGhlcixjaXBoZXJ0ZXh0LGtleSxjZmcpe2NmZz10aGlzLmNmZy5leHRlbmQoY2ZnKTtjaXBoZXJ0ZXh0PXRoaXMuX3BhcnNlKGNpcGhlcnRleHQsY2ZnLmZvcm1hdCk7dmFyIHBsYWludGV4dD1jaXBoZXIuY3JlYXRlRGVjcnlwdG9yKGtleSxjZmcpLmZpbmFsaXplKGNpcGhlcnRleHQuY2lwaGVydGV4dCk7cmV0dXJuIHBsYWludGV4dH0sX3BhcnNlOmZ1bmN0aW9uKGNpcGhlcnRleHQsZm9ybWF0KXtpZih0eXBlb2YgY2lwaGVydGV4dD09XCJzdHJpbmdcIil7cmV0dXJuIGZvcm1hdC5wYXJzZShjaXBoZXJ0ZXh0LHRoaXMpfWVsc2V7cmV0dXJuIGNpcGhlcnRleHR9fX0pO3ZhciBDX2tkZj1DLmtkZj17fTt2YXIgT3BlblNTTEtkZj1DX2tkZi5PcGVuU1NMPXtleGVjdXRlOmZ1bmN0aW9uKHBhc3N3b3JkLGtleVNpemUsaXZTaXplLHNhbHQpe2lmKCFzYWx0KXtzYWx0PVdvcmRBcnJheS5yYW5kb20oNjQvOCl9dmFyIGtleT1FdnBLREYuY3JlYXRlKHtrZXlTaXplOmtleVNpemUraXZTaXplfSkuY29tcHV0ZShwYXNzd29yZCxzYWx0KTt2YXIgaXY9V29yZEFycmF5LmNyZWF0ZShrZXkud29yZHMuc2xpY2Uoa2V5U2l6ZSksaXZTaXplKjQpO2tleS5zaWdCeXRlcz1rZXlTaXplKjQ7cmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoe2tleTprZXksaXY6aXYsc2FsdDpzYWx0fSl9fTt2YXIgUGFzc3dvcmRCYXNlZENpcGhlcj1DX2xpYi5QYXNzd29yZEJhc2VkQ2lwaGVyPVNlcmlhbGl6YWJsZUNpcGhlci5leHRlbmQoe2NmZzpTZXJpYWxpemFibGVDaXBoZXIuY2ZnLmV4dGVuZCh7a2RmOk9wZW5TU0xLZGZ9KSxlbmNyeXB0OmZ1bmN0aW9uKGNpcGhlcixtZXNzYWdlLHBhc3N3b3JkLGNmZyl7Y2ZnPXRoaXMuY2ZnLmV4dGVuZChjZmcpO3ZhciBkZXJpdmVkUGFyYW1zPWNmZy5rZGYuZXhlY3V0ZShwYXNzd29yZCxjaXBoZXIua2V5U2l6ZSxjaXBoZXIuaXZTaXplKTtjZmcuaXY9ZGVyaXZlZFBhcmFtcy5pdjt2YXIgY2lwaGVydGV4dD1TZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdC5jYWxsKHRoaXMsY2lwaGVyLG1lc3NhZ2UsZGVyaXZlZFBhcmFtcy5rZXksY2ZnKTtjaXBoZXJ0ZXh0Lm1peEluKGRlcml2ZWRQYXJhbXMpO3JldHVybiBjaXBoZXJ0ZXh0fSxkZWNyeXB0OmZ1bmN0aW9uKGNpcGhlcixjaXBoZXJ0ZXh0LHBhc3N3b3JkLGNmZyl7Y2ZnPXRoaXMuY2ZnLmV4dGVuZChjZmcpO2NpcGhlcnRleHQ9dGhpcy5fcGFyc2UoY2lwaGVydGV4dCxjZmcuZm9ybWF0KTt2YXIgZGVyaXZlZFBhcmFtcz1jZmcua2RmLmV4ZWN1dGUocGFzc3dvcmQsY2lwaGVyLmtleVNpemUsY2lwaGVyLml2U2l6ZSxjaXBoZXJ0ZXh0LnNhbHQpO2NmZy5pdj1kZXJpdmVkUGFyYW1zLml2O3ZhciBwbGFpbnRleHQ9U2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQuY2FsbCh0aGlzLGNpcGhlcixjaXBoZXJ0ZXh0LGRlcml2ZWRQYXJhbXMua2V5LGNmZyk7cmV0dXJuIHBsYWludGV4dH19KX0oKSkiLCJ2YXIgQ3J5cHRvSlM9Q3J5cHRvSlN8fChmdW5jdGlvbihNYXRoLHVuZGVmaW5lZCl7dmFyIEM9e307dmFyIENfbGliPUMubGliPXt9O3ZhciBCYXNlPUNfbGliLkJhc2U9KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gRigpe31yZXR1cm57ZXh0ZW5kOmZ1bmN0aW9uKG92ZXJyaWRlcyl7Ri5wcm90b3R5cGU9dGhpczt2YXIgc3VidHlwZT1uZXcgRigpO2lmKG92ZXJyaWRlcyl7c3VidHlwZS5taXhJbihvdmVycmlkZXMpfWlmKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KFwiaW5pdFwiKSl7c3VidHlwZS5pbml0PWZ1bmN0aW9uKCl7c3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fXN1YnR5cGUuaW5pdC5wcm90b3R5cGU9c3VidHlwZTtzdWJ0eXBlLiRzdXBlcj10aGlzO3JldHVybiBzdWJ0eXBlfSxjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2U9dGhpcy5leHRlbmQoKTtpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLGFyZ3VtZW50cyk7cmV0dXJuIGluc3RhbmNlfSxpbml0OmZ1bmN0aW9uKCl7fSxtaXhJbjpmdW5jdGlvbihwcm9wZXJ0aWVzKXtmb3IodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKXtpZihwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpe3RoaXNbcHJvcGVydHlOYW1lXT1wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV19fWlmKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCJ0b1N0cmluZ1wiKSl7dGhpcy50b1N0cmluZz1wcm9wZXJ0aWVzLnRvU3RyaW5nfX0sY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyl9fX0oKSk7dmFyIFdvcmRBcnJheT1DX2xpYi5Xb3JkQXJyYXk9QmFzZS5leHRlbmQoe2luaXQ6ZnVuY3Rpb24od29yZHMsc2lnQnl0ZXMpe3dvcmRzPXRoaXMud29yZHM9d29yZHN8fFtdO2lmKHNpZ0J5dGVzIT11bmRlZmluZWQpe3RoaXMuc2lnQnl0ZXM9c2lnQnl0ZXN9ZWxzZXt0aGlzLnNpZ0J5dGVzPXdvcmRzLmxlbmd0aCo0fX0sdG9TdHJpbmc6ZnVuY3Rpb24oZW5jb2Rlcil7cmV0dXJuKGVuY29kZXJ8fEhleCkuc3RyaW5naWZ5KHRoaXMpfSxjb25jYXQ6ZnVuY3Rpb24od29yZEFycmF5KXt2YXIgdGhpc1dvcmRzPXRoaXMud29yZHM7dmFyIHRoYXRXb3Jkcz13b3JkQXJyYXkud29yZHM7dmFyIHRoaXNTaWdCeXRlcz10aGlzLnNpZ0J5dGVzO3ZhciB0aGF0U2lnQnl0ZXM9d29yZEFycmF5LnNpZ0J5dGVzO3RoaXMuY2xhbXAoKTtpZih0aGlzU2lnQnl0ZXMlNCl7Zm9yKHZhciBpPTA7aTx0aGF0U2lnQnl0ZXM7aSsrKXt2YXIgdGhhdEJ5dGU9KHRoYXRXb3Jkc1tpPj4+Ml0+Pj4oMjQtKGklNCkqOCkpJjI1NTt0aGlzV29yZHNbKHRoaXNTaWdCeXRlcytpKT4+PjJdfD10aGF0Qnl0ZTw8KDI0LSgodGhpc1NpZ0J5dGVzK2kpJTQpKjgpfX1lbHNle2Zvcih2YXIgaT0wO2k8dGhhdFNpZ0J5dGVzO2krPTQpe3RoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzK2kpPj4+Ml09dGhhdFdvcmRzW2k+Pj4yXX19dGhpcy5zaWdCeXRlcys9dGhhdFNpZ0J5dGVzO3JldHVybiB0aGlzfSxjbGFtcDpmdW5jdGlvbigpe3ZhciB3b3Jkcz10aGlzLndvcmRzO3ZhciBzaWdCeXRlcz10aGlzLnNpZ0J5dGVzO3dvcmRzW3NpZ0J5dGVzPj4+Ml0mPTQyOTQ5NjcyOTU8PCgzMi0oc2lnQnl0ZXMlNCkqOCk7d29yZHMubGVuZ3RoPU1hdGguY2VpbChzaWdCeXRlcy80KX0sY2xvbmU6ZnVuY3Rpb24oKXt2YXIgY2xvbmU9QmFzZS5jbG9uZS5jYWxsKHRoaXMpO2Nsb25lLndvcmRzPXRoaXMud29yZHMuc2xpY2UoMCk7cmV0dXJuIGNsb25lfSxyYW5kb206ZnVuY3Rpb24obkJ5dGVzKXt2YXIgd29yZHM9W107dmFyIHI9KGZ1bmN0aW9uKG1fdyl7dmFyIG1fdz1tX3c7dmFyIG1fej05ODc2NTQzMjE7dmFyIG1hc2s9NDI5NDk2NzI5NTtyZXR1cm4gZnVuY3Rpb24oKXttX3o9KDM2OTY5KihtX3omNjU1MzUpKyhtX3o+PjE2KSkmbWFzazttX3c9KDE4MDAwKihtX3cmNjU1MzUpKyhtX3c+PjE2KSkmbWFzazt2YXIgcmVzdWx0PSgobV96PDwxNikrbV93KSZtYXNrO3Jlc3VsdC89NDI5NDk2NzI5NjtyZXN1bHQrPTAuNTtyZXR1cm4gcmVzdWx0KihNYXRoLnJhbmRvbSgpPjAuNT8xOi0xKX19KTtmb3IodmFyIGk9MCxyY2FjaGU7aTxuQnl0ZXM7aSs9NCl7dmFyIF9yPXIoKHJjYWNoZXx8TWF0aC5yYW5kb20oKSkqNDI5NDk2NzI5Nik7cmNhY2hlPV9yKCkqOTg3NjU0MDcxO3dvcmRzLnB1c2goKF9yKCkqNDI5NDk2NzI5Nil8MCl9cmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcyxuQnl0ZXMpfX0pO3ZhciBDX2VuYz1DLmVuYz17fTt2YXIgSGV4PUNfZW5jLkhleD17c3RyaW5naWZ5OmZ1bmN0aW9uKHdvcmRBcnJheSl7dmFyIHdvcmRzPXdvcmRBcnJheS53b3Jkczt2YXIgc2lnQnl0ZXM9d29yZEFycmF5LnNpZ0J5dGVzO3ZhciBoZXhDaGFycz1bXTtmb3IodmFyIGk9MDtpPHNpZ0J5dGVzO2krKyl7dmFyIGJpdGU9KHdvcmRzW2k+Pj4yXT4+PigyNC0oaSU0KSo4KSkmMjU1O2hleENoYXJzLnB1c2goKGJpdGU+Pj40KS50b1N0cmluZygxNikpO2hleENoYXJzLnB1c2goKGJpdGUmMTUpLnRvU3RyaW5nKDE2KSl9cmV0dXJuIGhleENoYXJzLmpvaW4oXCJcIil9LHBhcnNlOmZ1bmN0aW9uKGhleFN0cil7dmFyIGhleFN0ckxlbmd0aD1oZXhTdHIubGVuZ3RoO3ZhciB3b3Jkcz1bXTtmb3IodmFyIGk9MDtpPGhleFN0ckxlbmd0aDtpKz0yKXt3b3Jkc1tpPj4+M118PXBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwyKSwxNik8PCgyNC0oaSU4KSo0KX1yZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLGhleFN0ckxlbmd0aC8yKX19O3ZhciBMYXRpbjE9Q19lbmMuTGF0aW4xPXtzdHJpbmdpZnk6ZnVuY3Rpb24od29yZEFycmF5KXt2YXIgd29yZHM9d29yZEFycmF5LndvcmRzO3ZhciBzaWdCeXRlcz13b3JkQXJyYXkuc2lnQnl0ZXM7dmFyIGxhdGluMUNoYXJzPVtdO2Zvcih2YXIgaT0wO2k8c2lnQnl0ZXM7aSsrKXt2YXIgYml0ZT0od29yZHNbaT4+PjJdPj4+KDI0LShpJTQpKjgpKSYyNTU7bGF0aW4xQ2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdGUpKX1yZXR1cm4gbGF0aW4xQ2hhcnMuam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24obGF0aW4xU3RyKXt2YXIgbGF0aW4xU3RyTGVuZ3RoPWxhdGluMVN0ci5sZW5ndGg7dmFyIHdvcmRzPVtdO2Zvcih2YXIgaT0wO2k8bGF0aW4xU3RyTGVuZ3RoO2krKyl7d29yZHNbaT4+PjJdfD0obGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkmMjU1KTw8KDI0LShpJTQpKjgpfXJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsbGF0aW4xU3RyTGVuZ3RoKX19O3ZhciBVdGY4PUNfZW5jLlV0Zjg9e3N0cmluZ2lmeTpmdW5jdGlvbih3b3JkQXJyYXkpe3RyeXtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShMYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSkpKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgVVRGLTggZGF0YVwiKX19LHBhcnNlOmZ1bmN0aW9uKHV0ZjhTdHIpe3JldHVybiBMYXRpbjEucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHV0ZjhTdHIpKSl9fTt2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobT1DX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtPUJhc2UuZXh0ZW5kKHtyZXNldDpmdW5jdGlvbigpe3RoaXMuX2RhdGE9bmV3IFdvcmRBcnJheS5pbml0KCk7dGhpcy5fbkRhdGFCeXRlcz0wfSxfYXBwZW5kOmZ1bmN0aW9uKGRhdGEpe2lmKHR5cGVvZiBkYXRhPT1cInN0cmluZ1wiKXtkYXRhPVV0ZjgucGFyc2UoZGF0YSl9dGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7dGhpcy5fbkRhdGFCeXRlcys9ZGF0YS5zaWdCeXRlc30sX3Byb2Nlc3M6ZnVuY3Rpb24oZG9GbHVzaCl7dmFyIGRhdGE9dGhpcy5fZGF0YTt2YXIgZGF0YVdvcmRzPWRhdGEud29yZHM7dmFyIGRhdGFTaWdCeXRlcz1kYXRhLnNpZ0J5dGVzO3ZhciBibG9ja1NpemU9dGhpcy5ibG9ja1NpemU7dmFyIGJsb2NrU2l6ZUJ5dGVzPWJsb2NrU2l6ZSo0O3ZhciBuQmxvY2tzUmVhZHk9ZGF0YVNpZ0J5dGVzL2Jsb2NrU2l6ZUJ5dGVzO2lmKGRvRmx1c2gpe25CbG9ja3NSZWFkeT1NYXRoLmNlaWwobkJsb2Nrc1JlYWR5KX1lbHNle25CbG9ja3NSZWFkeT1NYXRoLm1heCgobkJsb2Nrc1JlYWR5fDApLXRoaXMuX21pbkJ1ZmZlclNpemUsMCl9dmFyIG5Xb3Jkc1JlYWR5PW5CbG9ja3NSZWFkeSpibG9ja1NpemU7dmFyIG5CeXRlc1JlYWR5PU1hdGgubWluKG5Xb3Jkc1JlYWR5KjQsZGF0YVNpZ0J5dGVzKTtpZihuV29yZHNSZWFkeSl7Zm9yKHZhciBvZmZzZXQ9MDtvZmZzZXQ8bldvcmRzUmVhZHk7b2Zmc2V0Kz1ibG9ja1NpemUpe3RoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3JkcyxvZmZzZXQpfXZhciBwcm9jZXNzZWRXb3Jkcz1kYXRhV29yZHMuc3BsaWNlKDAsbldvcmRzUmVhZHkpO2RhdGEuc2lnQnl0ZXMtPW5CeXRlc1JlYWR5fXJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsbkJ5dGVzUmVhZHkpfSxjbG9uZTpmdW5jdGlvbigpe3ZhciBjbG9uZT1CYXNlLmNsb25lLmNhbGwodGhpcyk7Y2xvbmUuX2RhdGE9dGhpcy5fZGF0YS5jbG9uZSgpO3JldHVybiBjbG9uZX0sX21pbkJ1ZmZlclNpemU6MH0pO3ZhciBIYXNoZXI9Q19saWIuSGFzaGVyPUJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtjZmc6QmFzZS5leHRlbmQoKSxpbml0OmZ1bmN0aW9uKGNmZyl7dGhpcy5jZmc9dGhpcy5jZmcuZXh0ZW5kKGNmZyk7dGhpcy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe0J1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTt0aGlzLl9kb1Jlc2V0KCl9LHVwZGF0ZTpmdW5jdGlvbihtZXNzYWdlVXBkYXRlKXt0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7dGhpcy5fcHJvY2VzcygpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbihtZXNzYWdlVXBkYXRlKXtpZihtZXNzYWdlVXBkYXRlKXt0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSl9dmFyIGhhc2g9dGhpcy5fZG9GaW5hbGl6ZSgpO1xyXG4gICAgcmV0dXJuIGhhc2h9LGJsb2NrU2l6ZTo1MTIvMzIsX2NyZWF0ZUhlbHBlcjpmdW5jdGlvbihoYXNoZXIpe3JldHVybiBmdW5jdGlvbihtZXNzYWdlLGNmZyl7cmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpfX0sX2NyZWF0ZUhtYWNIZWxwZXI6ZnVuY3Rpb24oaGFzaGVyKXtyZXR1cm4gZnVuY3Rpb24obWVzc2FnZSxrZXkpe3JldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsa2V5KS5maW5hbGl6ZShtZXNzYWdlKX19fSk7dmFyIENfYWxnbz1DLmFsZ289e307cmV0dXJuIEN9KE1hdGgpKTttb2R1bGUuZXhwb3J0cz1DcnlwdG9KUyIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFdXOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgRkc6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBNMTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIE0yOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgTTM6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBGNDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIEY1OntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgRjY6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBGNzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIEY4OntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgLy9cbiAgICAgICAgaGFzUGxheTpmYWxzZSwvL+aYr+WQpuaSreaUvuS6huWKqOeUu1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvL3VwZGF0ZTogZnVuY3Rpb24gKGR0KSB7fSxcblxuICAgIHBsYXlBbmk6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5oYXNQbGF5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFuaW1Ob2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYW5pXCIpO1xuICAgICAgICBhbmltTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgYW5pbUN0cmwgPSBhbmltTm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgYW5pbUN0cmwucGxheSgpO1xuICAgIH0sXG5cbiAgICBzaGFrZUVnZzpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLnJvdGF0ZVRvKDAuMSwgMTUuMCk7XG4gICAgICAgIHZhciBhY3Rpb24yID0gY2Mucm90YXRlVG8oMC4xLCAtMTUuMCk7XG4gICAgICAgIHZhciBhbnRpb24zID0gY2Mucm90YXRlVG8oMC4wNSwgMC4wKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMixhbnRpb24zKTtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGNjLnJlcGVhdChzZXEsIDMpO1xuICAgICAgICB0aGlzLkZHLnJ1bkFjdGlvbihyZXBlYXQpO1xuICAgIH0sXG5cbiAgICBzdG9wQW5pOmZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuaGFzUGxheSA9PSB0cnVlKXtcbiAgICAgICAgICAgIHZhciBhbmltTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaVwiKTtcbiAgICAgICAgICAgIHZhciBhbmltQ3RybCA9IGFuaW1Ob2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICAgICAgYW5pbUN0cmwuc3RvcCgpO1xuICAgICAgICAgICAgYW5pbU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYXNQbGF5ID0gZmFsc2U7XG4gICAgfSxcbiAgICBcbiAgICBzZXRDdWJlOmZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICB0aGlzLldXLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkZHLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLk0xLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLk0yLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLk0zLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkY0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkY1LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkY2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkY3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkY4LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZihuYW1lID09IFwiV1dcIil7XG4gICAgICAgICAgICB0aGlzLldXLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmKG5hbWUgPT0gXCJNMVwiKXtcbiAgICAgICAgICAgIHRoaXMuTTEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYobmFtZSA9PSBcIk0yXCIpe1xuICAgICAgICAgICAgdGhpcy5NMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZSBpZihuYW1lID09IFwiTTNcIil7XG4gICAgICAgICAgICB0aGlzLk0zLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmKG5hbWUgPT0gXCJGNFwiKXtcbiAgICAgICAgICAgIHRoaXMuRjQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYobmFtZSA9PSBcIkY1XCIpe1xuICAgICAgICAgICAgdGhpcy5GNS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZSBpZihuYW1lID09IFwiRjZcIil7XG4gICAgICAgICAgICB0aGlzLkY2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmKG5hbWUgPT0gXCJGN1wiKXtcbiAgICAgICAgICAgIHRoaXMuRjcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2UgaWYobmFtZSA9PSBcIkY4XCIpe1xuICAgICAgICAgICAgdGhpcy5GOC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZSBpZihuYW1lID09IFwiRkdcIil7XG4gICAgICAgICAgICB0aGlzLkZHLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2MubG9nKFwidW5rbm93biBjYXJkIHR5cGU6XCIrbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgXG59KTtcbiIsInZhciBDcnlwdG9KUz1yZXF1aXJlKFwiLi9jb3JlXCIpOyhmdW5jdGlvbigpe3ZhciBDPUNyeXB0b0pTO3ZhciBDX2xpYj1DLmxpYjt2YXIgV29yZEFycmF5PUNfbGliLldvcmRBcnJheTt2YXIgQ19lbmM9Qy5lbmM7dmFyIEJhc2U2ND1DX2VuYy5CYXNlNjQ9e3N0cmluZ2lmeTpmdW5jdGlvbih3b3JkQXJyYXkpe3ZhciB3b3Jkcz13b3JkQXJyYXkud29yZHM7dmFyIHNpZ0J5dGVzPXdvcmRBcnJheS5zaWdCeXRlczt2YXIgbWFwPXRoaXMuX21hcDt3b3JkQXJyYXkuY2xhbXAoKTt2YXIgYmFzZTY0Q2hhcnM9W107Zm9yKHZhciBpPTA7aTxzaWdCeXRlcztpKz0zKXt2YXIgYnl0ZTE9KHdvcmRzW2k+Pj4yXT4+PigyNC0oaSU0KSo4KSkmMjU1O3ZhciBieXRlMj0od29yZHNbKGkrMSk+Pj4yXT4+PigyNC0oKGkrMSklNCkqOCkpJjI1NTt2YXIgYnl0ZTM9KHdvcmRzWyhpKzIpPj4+Ml0+Pj4oMjQtKChpKzIpJTQpKjgpKSYyNTU7dmFyIHRyaXBsZXQ9KGJ5dGUxPDwxNil8KGJ5dGUyPDw4KXxieXRlMztmb3IodmFyIGo9MDsoajw0KSYmKGkraiowLjc1PHNpZ0J5dGVzKTtqKyspe2Jhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldD4+Pig2KigzLWopKSkmNjMpKX19dmFyIHBhZGRpbmdDaGFyPW1hcC5jaGFyQXQoNjQpO2lmKHBhZGRpbmdDaGFyKXt3aGlsZShiYXNlNjRDaGFycy5sZW5ndGglNCl7YmFzZTY0Q2hhcnMucHVzaChwYWRkaW5nQ2hhcil9fXJldHVybiBiYXNlNjRDaGFycy5qb2luKFwiXCIpfSxwYXJzZTpmdW5jdGlvbihiYXNlNjRTdHIpe3ZhciBiYXNlNjRTdHJMZW5ndGg9YmFzZTY0U3RyLmxlbmd0aDt2YXIgbWFwPXRoaXMuX21hcDt2YXIgcGFkZGluZ0NoYXI9bWFwLmNoYXJBdCg2NCk7aWYocGFkZGluZ0NoYXIpe3ZhciBwYWRkaW5nSW5kZXg9YmFzZTY0U3RyLmluZGV4T2YocGFkZGluZ0NoYXIpO2lmKHBhZGRpbmdJbmRleCE9LTEpe2Jhc2U2NFN0ckxlbmd0aD1wYWRkaW5nSW5kZXh9fXZhciB3b3Jkcz1bXTt2YXIgbkJ5dGVzPTA7Zm9yKHZhciBpPTA7aTxiYXNlNjRTdHJMZW5ndGg7aSsrKXtpZihpJTQpe3ZhciBiaXRzMT1tYXAuaW5kZXhPZihiYXNlNjRTdHIuY2hhckF0KGktMSkpPDwoKGklNCkqMik7dmFyIGJpdHMyPW1hcC5pbmRleE9mKGJhc2U2NFN0ci5jaGFyQXQoaSkpPj4+KDYtKGklNCkqMik7dmFyIGJpdHNDb21iaW5lZD1iaXRzMXxiaXRzMjt3b3Jkc1tuQnl0ZXM+Pj4yXXw9KGJpdHNDb21iaW5lZCk8PCgyNC0obkJ5dGVzJTQpKjgpO25CeXRlcysrfX1yZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcyxuQnl0ZXMpfSxfbWFwOlwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIn19KCkpIiwidmFyIENyeXB0b0pTPXJlcXVpcmUoXCIuL2NvcmVcIik7KGZ1bmN0aW9uKCl7dmFyIEM9Q3J5cHRvSlM7dmFyIENfbGliPUMubGliO3ZhciBCYXNlPUNfbGliLkJhc2U7dmFyIFdvcmRBcnJheT1DX2xpYi5Xb3JkQXJyYXk7dmFyIENfYWxnbz1DLmFsZ287dmFyIE1ENT1DX2FsZ28uTUQ1O3ZhciBFdnBLREY9Q19hbGdvLkV2cEtERj1CYXNlLmV4dGVuZCh7Y2ZnOkJhc2UuZXh0ZW5kKHtrZXlTaXplOjEyOC8zMixoYXNoZXI6TUQ1LGl0ZXJhdGlvbnM6MX0pLGluaXQ6ZnVuY3Rpb24oY2ZnKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoY2ZnKX0sY29tcHV0ZTpmdW5jdGlvbihwYXNzd29yZCxzYWx0KXt2YXIgY2ZnPXRoaXMuY2ZnO3ZhciBoYXNoZXI9Y2ZnLmhhc2hlci5jcmVhdGUoKTt2YXIgZGVyaXZlZEtleT1Xb3JkQXJyYXkuY3JlYXRlKCk7dmFyIGRlcml2ZWRLZXlXb3Jkcz1kZXJpdmVkS2V5LndvcmRzO3ZhciBrZXlTaXplPWNmZy5rZXlTaXplO3ZhciBpdGVyYXRpb25zPWNmZy5pdGVyYXRpb25zO3doaWxlKGRlcml2ZWRLZXlXb3Jkcy5sZW5ndGg8a2V5U2l6ZSl7aWYoYmxvY2spe2hhc2hlci51cGRhdGUoYmxvY2spfXZhciBibG9jaz1oYXNoZXIudXBkYXRlKHBhc3N3b3JkKS5maW5hbGl6ZShzYWx0KTtoYXNoZXIucmVzZXQoKTtmb3IodmFyIGk9MTtpPGl0ZXJhdGlvbnM7aSsrKXtibG9jaz1oYXNoZXIuZmluYWxpemUoYmxvY2spO2hhc2hlci5yZXNldCgpfWRlcml2ZWRLZXkuY29uY2F0KGJsb2NrKX1kZXJpdmVkS2V5LnNpZ0J5dGVzPWtleVNpemUqNDtyZXR1cm4gZGVyaXZlZEtleX19KTtDLkV2cEtERj1mdW5jdGlvbihwYXNzd29yZCxzYWx0LGNmZyl7cmV0dXJuIEV2cEtERi5jcmVhdGUoY2ZnKS5jb21wdXRlKHBhc3N3b3JkLHNhbHQpfX0oKSkiLCJ2YXIgQ3J5cHRvSlM9cmVxdWlyZShcIi4vY29yZVwiKTsoZnVuY3Rpb24oTWF0aCl7dmFyIEM9Q3J5cHRvSlM7dmFyIENfbGliPUMubGliO3ZhciBXb3JkQXJyYXk9Q19saWIuV29yZEFycmF5O3ZhciBIYXNoZXI9Q19saWIuSGFzaGVyO3ZhciBDX2FsZ289Qy5hbGdvO3ZhciBUPVtdOyhmdW5jdGlvbigpe2Zvcih2YXIgaT0wO2k8NjQ7aSsrKXtUW2ldPShNYXRoLmFicyhNYXRoLnNpbihpKzEpKSo0Mjk0OTY3Mjk2KXwwfX0oKSk7dmFyIE1ENT1DX2FsZ28uTUQ1PUhhc2hlci5leHRlbmQoe19kb1Jlc2V0OmZ1bmN0aW9uKCl7dGhpcy5faGFzaD1uZXcgV29yZEFycmF5LmluaXQoWzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OF0pfSxfZG9Qcm9jZXNzQmxvY2s6ZnVuY3Rpb24oTSxvZmZzZXQpe2Zvcih2YXIgaT0wO2k8MTY7aSsrKXt2YXIgb2Zmc2V0X2k9b2Zmc2V0K2k7dmFyIE1fb2Zmc2V0X2k9TVtvZmZzZXRfaV07TVtvZmZzZXRfaV09KCgoKE1fb2Zmc2V0X2k8PDgpfChNX29mZnNldF9pPj4+MjQpKSYxNjcxMTkzNSl8KCgoTV9vZmZzZXRfaTw8MjQpfChNX29mZnNldF9pPj4+OCkpJjQyNzgyNTUzNjApKX12YXIgSD10aGlzLl9oYXNoLndvcmRzO3ZhciBNX29mZnNldF8wPU1bb2Zmc2V0KzBdO3ZhciBNX29mZnNldF8xPU1bb2Zmc2V0KzFdO3ZhciBNX29mZnNldF8yPU1bb2Zmc2V0KzJdO3ZhciBNX29mZnNldF8zPU1bb2Zmc2V0KzNdO3ZhciBNX29mZnNldF80PU1bb2Zmc2V0KzRdO3ZhciBNX29mZnNldF81PU1bb2Zmc2V0KzVdO3ZhciBNX29mZnNldF82PU1bb2Zmc2V0KzZdO3ZhciBNX29mZnNldF83PU1bb2Zmc2V0KzddO3ZhciBNX29mZnNldF84PU1bb2Zmc2V0KzhdO3ZhciBNX29mZnNldF85PU1bb2Zmc2V0KzldO3ZhciBNX29mZnNldF8xMD1NW29mZnNldCsxMF07dmFyIE1fb2Zmc2V0XzExPU1bb2Zmc2V0KzExXTt2YXIgTV9vZmZzZXRfMTI9TVtvZmZzZXQrMTJdO3ZhciBNX29mZnNldF8xMz1NW29mZnNldCsxM107dmFyIE1fb2Zmc2V0XzE0PU1bb2Zmc2V0KzE0XTt2YXIgTV9vZmZzZXRfMTU9TVtvZmZzZXQrMTVdO3ZhciBhPUhbMF07dmFyIGI9SFsxXTt2YXIgYz1IWzJdO3ZhciBkPUhbM107YT1GRihhLGIsYyxkLE1fb2Zmc2V0XzAsNyxUWzBdKTtkPUZGKGQsYSxiLGMsTV9vZmZzZXRfMSwxMixUWzFdKTtjPUZGKGMsZCxhLGIsTV9vZmZzZXRfMiwxNyxUWzJdKTtiPUZGKGIsYyxkLGEsTV9vZmZzZXRfMywyMixUWzNdKTthPUZGKGEsYixjLGQsTV9vZmZzZXRfNCw3LFRbNF0pO2Q9RkYoZCxhLGIsYyxNX29mZnNldF81LDEyLFRbNV0pO2M9RkYoYyxkLGEsYixNX29mZnNldF82LDE3LFRbNl0pO2I9RkYoYixjLGQsYSxNX29mZnNldF83LDIyLFRbN10pO2E9RkYoYSxiLGMsZCxNX29mZnNldF84LDcsVFs4XSk7ZD1GRihkLGEsYixjLE1fb2Zmc2V0XzksMTIsVFs5XSk7Yz1GRihjLGQsYSxiLE1fb2Zmc2V0XzEwLDE3LFRbMTBdKTtiPUZGKGIsYyxkLGEsTV9vZmZzZXRfMTEsMjIsVFsxMV0pO2E9RkYoYSxiLGMsZCxNX29mZnNldF8xMiw3LFRbMTJdKTtkPUZGKGQsYSxiLGMsTV9vZmZzZXRfMTMsMTIsVFsxM10pO2M9RkYoYyxkLGEsYixNX29mZnNldF8xNCwxNyxUWzE0XSk7Yj1GRihiLGMsZCxhLE1fb2Zmc2V0XzE1LDIyLFRbMTVdKTthPUdHKGEsYixjLGQsTV9vZmZzZXRfMSw1LFRbMTZdKTtkPUdHKGQsYSxiLGMsTV9vZmZzZXRfNiw5LFRbMTddKTtjPUdHKGMsZCxhLGIsTV9vZmZzZXRfMTEsMTQsVFsxOF0pO2I9R0coYixjLGQsYSxNX29mZnNldF8wLDIwLFRbMTldKTthPUdHKGEsYixjLGQsTV9vZmZzZXRfNSw1LFRbMjBdKTtkPUdHKGQsYSxiLGMsTV9vZmZzZXRfMTAsOSxUWzIxXSk7Yz1HRyhjLGQsYSxiLE1fb2Zmc2V0XzE1LDE0LFRbMjJdKTtiPUdHKGIsYyxkLGEsTV9vZmZzZXRfNCwyMCxUWzIzXSk7YT1HRyhhLGIsYyxkLE1fb2Zmc2V0XzksNSxUWzI0XSk7ZD1HRyhkLGEsYixjLE1fb2Zmc2V0XzE0LDksVFsyNV0pO2M9R0coYyxkLGEsYixNX29mZnNldF8zLDE0LFRbMjZdKTtiPUdHKGIsYyxkLGEsTV9vZmZzZXRfOCwyMCxUWzI3XSk7YT1HRyhhLGIsYyxkLE1fb2Zmc2V0XzEzLDUsVFsyOF0pO2Q9R0coZCxhLGIsYyxNX29mZnNldF8yLDksVFsyOV0pO2M9R0coYyxkLGEsYixNX29mZnNldF83LDE0LFRbMzBdKTtiPUdHKGIsYyxkLGEsTV9vZmZzZXRfMTIsMjAsVFszMV0pO2E9SEgoYSxiLGMsZCxNX29mZnNldF81LDQsVFszMl0pO2Q9SEgoZCxhLGIsYyxNX29mZnNldF84LDExLFRbMzNdKTtjPUhIKGMsZCxhLGIsTV9vZmZzZXRfMTEsMTYsVFszNF0pO2I9SEgoYixjLGQsYSxNX29mZnNldF8xNCwyMyxUWzM1XSk7YT1ISChhLGIsYyxkLE1fb2Zmc2V0XzEsNCxUWzM2XSk7ZD1ISChkLGEsYixjLE1fb2Zmc2V0XzQsMTEsVFszN10pO2M9SEgoYyxkLGEsYixNX29mZnNldF83LDE2LFRbMzhdKTtiPUhIKGIsYyxkLGEsTV9vZmZzZXRfMTAsMjMsVFszOV0pO2E9SEgoYSxiLGMsZCxNX29mZnNldF8xMyw0LFRbNDBdKTtkPUhIKGQsYSxiLGMsTV9vZmZzZXRfMCwxMSxUWzQxXSk7Yz1ISChjLGQsYSxiLE1fb2Zmc2V0XzMsMTYsVFs0Ml0pO2I9SEgoYixjLGQsYSxNX29mZnNldF82LDIzLFRbNDNdKTthPUhIKGEsYixjLGQsTV9vZmZzZXRfOSw0LFRbNDRdKTtkPUhIKGQsYSxiLGMsTV9vZmZzZXRfMTIsMTEsVFs0NV0pO2M9SEgoYyxkLGEsYixNX29mZnNldF8xNSwxNixUWzQ2XSk7Yj1ISChiLGMsZCxhLE1fb2Zmc2V0XzIsMjMsVFs0N10pO2E9SUkoYSxiLGMsZCxNX29mZnNldF8wLDYsVFs0OF0pO2Q9SUkoZCxhLGIsYyxNX29mZnNldF83LDEwLFRbNDldKTtjPUlJKGMsZCxhLGIsTV9vZmZzZXRfMTQsMTUsVFs1MF0pO2I9SUkoYixjLGQsYSxNX29mZnNldF81LDIxLFRbNTFdKTthPUlJKGEsYixjLGQsTV9vZmZzZXRfMTIsNixUWzUyXSk7ZD1JSShkLGEsYixjLE1fb2Zmc2V0XzMsMTAsVFs1M10pO2M9SUkoYyxkLGEsYixNX29mZnNldF8xMCwxNSxUWzU0XSk7Yj1JSShiLGMsZCxhLE1fb2Zmc2V0XzEsMjEsVFs1NV0pO2E9SUkoYSxiLGMsZCxNX29mZnNldF84LDYsVFs1Nl0pO2Q9SUkoZCxhLGIsYyxNX29mZnNldF8xNSwxMCxUWzU3XSk7Yz1JSShjLGQsYSxiLE1fb2Zmc2V0XzYsMTUsVFs1OF0pO2I9SUkoYixjLGQsYSxNX29mZnNldF8xMywyMSxUWzU5XSk7YT1JSShhLGIsYyxkLE1fb2Zmc2V0XzQsNixUWzYwXSk7ZD1JSShkLGEsYixjLE1fb2Zmc2V0XzExLDEwLFRbNjFdKTtjPUlJKGMsZCxhLGIsTV9vZmZzZXRfMiwxNSxUWzYyXSk7Yj1JSShiLGMsZCxhLE1fb2Zmc2V0XzksMjEsVFs2M10pO0hbMF09KEhbMF0rYSl8MDtIWzFdPShIWzFdK2IpfDA7SFsyXT0oSFsyXStjKXwwO0hbM109KEhbM10rZCl8MH0sX2RvRmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgZGF0YT10aGlzLl9kYXRhO3ZhciBkYXRhV29yZHM9ZGF0YS53b3Jkczt2YXIgbkJpdHNUb3RhbD10aGlzLl9uRGF0YUJ5dGVzKjg7dmFyIG5CaXRzTGVmdD1kYXRhLnNpZ0J5dGVzKjg7ZGF0YVdvcmRzW25CaXRzTGVmdD4+PjVdfD0xMjg8PCgyNC1uQml0c0xlZnQlMzIpO3ZhciBuQml0c1RvdGFsSD1NYXRoLmZsb29yKG5CaXRzVG90YWwvNDI5NDk2NzI5Nik7dmFyIG5CaXRzVG90YWxMPW5CaXRzVG90YWw7ZGF0YVdvcmRzWygoKG5CaXRzTGVmdCs2NCk+Pj45KTw8NCkrMTVdPSgoKChuQml0c1RvdGFsSDw8OCl8KG5CaXRzVG90YWxIPj4+MjQpKSYxNjcxMTkzNSl8KCgobkJpdHNUb3RhbEg8PDI0KXwobkJpdHNUb3RhbEg+Pj44KSkmNDI3ODI1NTM2MCkpO2RhdGFXb3Jkc1soKChuQml0c0xlZnQrNjQpPj4+OSk8PDQpKzE0XT0oKCgobkJpdHNUb3RhbEw8PDgpfChuQml0c1RvdGFsTD4+PjI0KSkmMTY3MTE5MzUpfCgoKG5CaXRzVG90YWxMPDwyNCl8KG5CaXRzVG90YWxMPj4+OCkpJjQyNzgyNTUzNjApKTtkYXRhLnNpZ0J5dGVzPShkYXRhV29yZHMubGVuZ3RoKzEpKjQ7dGhpcy5fcHJvY2VzcygpO3ZhciBoYXNoPXRoaXMuX2hhc2g7dmFyIEg9aGFzaC53b3Jkcztmb3IodmFyIGk9MDtpPDQ7aSsrKXt2YXIgSF9pPUhbaV07SFtpXT0oKChIX2k8PDgpfChIX2k+Pj4yNCkpJjE2NzExOTM1KXwoKChIX2k8PDI0KXwoSF9pPj4+OCkpJjQyNzgyNTUzNjApfXJldHVybiBoYXNofSxjbG9uZTpmdW5jdGlvbigpe3ZhciBjbG9uZT1IYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtjbG9uZS5faGFzaD10aGlzLl9oYXNoLmNsb25lKCk7cmV0dXJuIGNsb25lfX0pO2Z1bmN0aW9uIEZGKGEsYixjLGQseCxzLHQpe3ZhciBuPWErKChiJmMpfCh+YiZkKSkreCt0O3JldHVybigobjw8cyl8KG4+Pj4oMzItcykpKStifWZ1bmN0aW9uIEdHKGEsYixjLGQseCxzLHQpe3ZhciBuPWErKChiJmQpfChjJn5kKSkreCt0O3JldHVybigobjw8cyl8KG4+Pj4oMzItcykpKStifWZ1bmN0aW9uIEhIKGEsYixjLGQseCxzLHQpe3ZhciBuPWErKGJeY15kKSt4K3Q7cmV0dXJuKChuPDxzKXwobj4+PigzMi1zKSkpK2J9ZnVuY3Rpb24gSUkoYSxiLGMsZCx4LHMsdCl7dmFyIG49YSsoY14oYnx+ZCkpK3grdDtyZXR1cm4oKG48PHMpfChuPj4+KDMyLXMpKSkrYn1DLk1ENT1IYXNoZXIuX2NyZWF0ZUhlbHBlcihNRDUpO0MuSG1hY01ENT1IYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoTUQ1KX0oTWF0aCkpIiwidmFyIENyeXB0b0pTPXJlcXVpcmUoXCIuL2NvcmVcIik7Q3J5cHRvSlMubW9kZS5FQ0I9KGZ1bmN0aW9uKCl7dmFyIEVDQj1DcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO0VDQi5FbmNyeXB0b3I9RUNCLmV4dGVuZCh7cHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKHdvcmRzLG9mZnNldCl7dGhpcy5fY2lwaGVyLmVuY3J5cHRCbG9jayh3b3JkcyxvZmZzZXQpfX0pO0VDQi5EZWNyeXB0b3I9RUNCLmV4dGVuZCh7cHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKHdvcmRzLG9mZnNldCl7dGhpcy5fY2lwaGVyLmRlY3J5cHRCbG9jayh3b3JkcyxvZmZzZXQpfX0pO3JldHVybiBFQ0J9KCkpIiwidmFyIE5ldERhdGEgPSByZXF1aXJlKFwiTmV0RGF0YVwiKTtcclxudmFyIERhdGFPcGVyID0gcmVxdWlyZShcIkRhdGFPcGVyXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY2xpY2s6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZGF0YU9wZXIgPSBEYXRhT3Blci5EYXRhT3Blci5nZXRJbnN0KCk7XHJcbiAgICAgICAgZGF0YU9wZXIuZ2V0SW5pdCAodGhpcy5uZXRDYWxsYmFjayx0aGlzKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNsaWNrMjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhT3BlciA9IERhdGFPcGVyLkRhdGFPcGVyLmdldEluc3QoKTtcclxuICAgICAgICBkYXRhT3Blci5nZXRCZXQgKDAsXCJcIiwwLDEsMTAsTmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5Jbml0UmVzdWx0LnBsYXlUaW1lLHRoaXMubmV0Q2FsbGJhY2ssdGhpcyk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuICAgICAgICBjbGljazM6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZGF0YU9wZXIgPSBEYXRhT3Blci5EYXRhT3Blci5nZXRJbnN0KCk7XHJcbiAgICAgICAgZGF0YU9wZXIuZ2V0UmV3YXJkKE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuQmV0UmVzdWx0LnRpY2tldE5vLE5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuSW5pdFJlc3VsdC5wbGF5VGltZSx0aGlzLm5ldENhbGxiYWNrLHRoaXMpO1xyXG4gICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrNDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhT3BlciA9IERhdGFPcGVyLkRhdGFPcGVyLmdldEluc3QoKTtcclxuICAgICAgICBkYXRhT3Blci5nZXRHYW1lTGlzdCAodGhpcy5uZXRDYWxsYmFjayx0aGlzKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgXHJcbiAgICAgICAgY2xpY2s1OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGFPcGVyID0gRGF0YU9wZXIuRGF0YU9wZXIuZ2V0SW5zdCgpO1xyXG4gICAgICAgIGRhdGFPcGVyLmdldFBvb2wgKHRoaXMubmV0Q2FsbGJhY2ssdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgbmV0Q2FsbGJhY2sgOiBmdW5jdGlvbihjbWQsIHJlcywgbXNnLCBzZWxmKXtcclxuICAgICAgICBjYy5sb2coXCJuZXRDYWxsYmFjayBjbWQ9XCIgKyBjbWQpO1xyXG4gICAgICAgIGlmKHJlcyA9PSAwKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgc3dpdGNoKGNtZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDA6Ly/liJ3lp4vljJZcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YT1OZXREYXRhLk5ldERhdGEuZ2V0SW5zdCgpLkluaXRSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDE6Ly/mipXms6hcclxuICAgICAgICAgICAgICAgIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPU5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuQmV0UmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIioqKioqKioq5oqV5rOoKioqKioqKipcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDI6Ly/nu5PnrpdcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgLy/nu5PnrpdcclxuICAgICAgICAgICAgICAgICAgY2MubG9nKFwiKioqKioqKirnu5PnrpcqKioqKioqKlwiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9TmV0RGF0YS5OZXREYXRhLmdldEluc3QoKS5SZXdhcmRSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAzOi8v57uT566XXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIC8v57uT566XXHJcbiAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIioqKioqKioq57uT566XKioqKioqKipcIik7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhPU5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuR2FtZUxpc3RSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA0Oi8v57uT566XXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIC8v57uT566XXHJcbiAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIioqKioqKioq57uT566XKioqKioqKipcIik7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhPU5ldERhdGEuTmV0RGF0YS5nZXRJbnN0KCkuUG9vbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgbGFiZWxBcnJheTp7XG4gICAgICAgICAgICBkZWZhdWx0OltdLFxuICAgICAgICAgICAgdHlwZTpbY2MuU3ByaXRlXSxcbiAgICAgICB9LFxuICAgICAgIC8vXG4gICAgICAgdGV4dHVyZUFycmF5OntcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXG4gICAgICAgICAgICB0eXBlOltjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgfSxcbiAgICAgICBudW1iZXJBcnJheTp7XG4gICAgICAgICAgICBkZWZhdWx0OltdLFxuICAgICAgICAgICAgdHlwZTpbY2MuTm9kZV0sXG4gICAgICAgIH0sXG4gICAgICAgbV9zcGVlZDoxLFxuICAgICAgIG1faXNGaXJzdDogdHJ1ZSxcbiAgICAgICBtX2Rpc3RhbmNlOjAsXG4gICAgICAgbV9tb3ZlQ291bnREaXM6MCxcbiAgICAgICBtX2RlbHRhOjAsXG4gICAgICAgbV9vbGREYXRhOiAwLFxuICAgICAgIG1fbmV3RGF0YTogMCxcbiAgICAgICBtX2hlaWdodDowLFxuICAgICAgIGdvTmV4dE5vZGU6XG4gICAgICAge1xuICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1faGVpZ2h0ID0gNzA7XG4gICAgICAgIC8vY2MuZ2FtZS5zZXRGcmFtZVJhdGUoMSk7XG4gICAgICAgIHRoaXMuaW5pdE51bWJlcigwKTtcbiAgICB9LFxuICAgIFxuICAgIGluaXROdW1iZXI6ZnVuY3Rpb24obnVtYmVyKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGFiZWxBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxhYmVsQXJyYXlbaV1cbiAgICAgICAgICAgIHRoaXMuc2V0T25lTnVtYmVyKGxhYmVsLChudW1iZXIgKyBpKSk7XG4gICAgICAgICAgICBsYWJlbC5ub2RlLnkgPSBpICogdGhpcy5tX2hlaWdodDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0RGF0YTpmdW5jdGlvbihkZXN0Q291bnQpe1xuICAgICAgICBpZihkZXN0Q291bnQgPj0gdGhpcy5tX25ld0RhdGEpe1xuICAgICAgICAgICAgdGhpcy5tX2Rpc3RhbmNlICs9IChkZXN0Q291bnQgLSB0aGlzLm1fbmV3RGF0YSkgKiB0aGlzLm1faGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5tX25ld0RhdGEgPSBkZXN0Q291bnQ7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5tX25ld0RhdGEgPSBkZXN0Q291bnQ7XG4gICAgICAgICAgICB0aGlzLm1fb2xkRGF0YSA9IGRlc3RDb3VudDtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bWJlckFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB2YXIgdW5pdE51bWJlciA9IGRlc3RDb3VudCAlIDEwO1xuICAgICAgICAgICAgICAgIGRlc3RDb3VudCA9IHBhcnNlSW50KGRlc3RDb3VudCAvIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlckFycmF5W2ldLmdldENvbXBvbmVudChcIm51bWJlclwiKS5zZXRBcnJheU51bWJlcih1bml0TnVtYmVyKTtcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9LFxuICAgIC8v5Lit5aWW5rGg5aWW5LmL5ZCO55u05o6l6K6+572u5pWw5a2XXG4gICAgc2V0QXJyYXlOdW1iZXI6ZnVuY3Rpb24obnVtYmVyKXtcbiAgICAgICAgdGhpcy5tX2RlbHRhID0gMDtcbiAgICAgICAgdGhpcy5tX2Rpc3RhbmNlID0gMDtcbiAgICAgICAgdGhpcy5tX21vdmVDb3VudERpcyA9IDA7XG4gICAgICAgIHRoaXMuaW5pdE51bWJlcihudW1iZXIpO1xuICAgIH0sXG5cbiAgICAvL+WlluaxoOW9kumbtlxuICAgIHJlc2V0WmVybzpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmluaXROdW1iZXIoMCk7XG4gICAgICAgIHRoaXMubV9vbGREYXRhID0gMDtcbiAgICAgICAgdGhpcy5tX25ld0RhdGEgPSAwO1xuICAgICAgICB0aGlzLm1fbW92ZUNvdW50RGlzID0gMDtcbiAgICAgICAgdGhpcy5tX2Rpc3RhbmNlID0gMDtcbiAgICAgICAgaWYodGhpcy5nb05leHROb2RlKXtcbiAgICAgICAgICAgIHZhciBzY3JpcHRTID0gdGhpcy5nb05leHROb2RlLmdldENvbXBvbmVudChcIm51bWJlclwiKTtcbiAgICAgICAgICAgIHNjcmlwdFMucmVzZXRaZXJvKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICBpZih0aGlzLm1fZGlzdGFuY2UgPiAwKXtcbiAgICAgICAgICAgIHRoaXMucm91bmQoKTtcbiAgICAgICAgfSAgIFxuICAgIH0sXG4gICAgXG4gICAgbmV4dFBsdXNzOmZ1bmN0aW9uKGNvdW50KXtcbiAgICAgICAgdGhpcy5tX2Rpc3RhbmNlICs9IGNvdW50ICogdGhpcy5tX2hlaWdodDsgXG4gICAgfSxcblxuICAgIC8vcm91bmRcbiAgICByb3VuZDpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLm1fc3BlZWQgPSB0aGlzLm1fZGlzdGFuY2UgLyAxNTtcbiAgICAgICAgLy/pkojlr7nlt67lgLzlpKrlpKflr7npgJ/luqbov5vooYzlpITnkIYg5q+U5aaC5aWW5rGg5Y+Y5YyW5LuOMOWIsDkwMDAwMDBcbiAgICAgICAgaWYodGhpcy5tX3NwZWVkIDwgMSl7Ly/mnIDlsI/pgJ/luqbpmZDliLZcbiAgICAgICAgICAgIHRoaXMubV9zcGVlZCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2Rpc3RhbmNlIC09IHRoaXMubV9zcGVlZDtcbiAgICAgICAgdGhpcy5tX21vdmVDb3VudERpcys9IHRoaXMubV9zcGVlZDtcbiAgICAgICAgaWYodGhpcy5tX21vdmVDb3VudERpcyA+IHRoaXMubV9oZWlnaHQgKiAxMCl7Ly/ov5vkvY3liKTmlq1cbiAgICAgICAgICAgIGxldCBwbHVzQ291bnQgPSBwYXJzZUludCh0aGlzLm1fbW92ZUNvdW50RGlzIC8gKHRoaXMubV9oZWlnaHQgKiAxMCkpO1xuICAgICAgICAgICAgdGhpcy5tX21vdmVDb3VudERpcyAtPSAodGhpcy5tX2hlaWdodCAqIDEwKSpwbHVzQ291bnQ7XG4gICAgICAgICAgICAvL+i/m+S9jeWIpOaWrVxuICAgICAgICAgICAgaWYodGhpcy5nb05leHROb2RlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0UyA9IHRoaXMuZ29OZXh0Tm9kZS5nZXRDb21wb25lbnQoXCJudW1iZXJcIik7XG4gICAgICAgICAgICAgICAgc2NyaXB0Uy5uZXh0UGx1c3MocGx1c0NvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgaWYodGhpcy5tX3NwZWVkID49IDYwKXsvL+mSiOWvuemAn+W6pumdnuW4uOW/qyDmr5TlpoIw5Y+Y5YiwOTAwMDAwMDAwXG4gICAgICAgICAgICAvL+mmluWFiOWBmui/m+S9jei/kOeul1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQodGhpcy5tX3NwZWVkIC8gdGhpcy5tX2hlaWdodCk7Ly/ov5vkvY3mlbBcbiAgICAgICAgICAgIHRoaXMubV9vbGREYXRhICs9IGNvdW50O1xuICAgICAgICAgICAgdGhpcy5zZXROdW0oY291bnQpO1xuICAgICAgICAgICAgdmFyIHN1Yk1vdmVTcGVlZCA9IHRoaXMubV9zcGVlZCAtIGNvdW50ICogdGhpcy5tX2hlaWdodDsvL+i/m+S9jeS5i+WQjueahG1vdmVcbiAgICAgICAgICAgIHRoaXMubW92ZVBsdXMoc3ViTW92ZVNwZWVkKTtcbiAgICAgICAgfWVsc2V7Ly/pgJ/luqblvojlsI9cbiAgICAgICAgICAgIHRoaXMubW92ZVBsdXModGhpcy5tX3NwZWVkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/mu5rliqjml7bpgLvovpFcbiAgICBzZXROdW06ZnVuY3Rpb24oY291bnQpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sYWJlbEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWxBcnJheVtpXTtcbiAgICAgICAgICAgIHZhciBvbGROdSA9IHBhcnNlSW50KGxhYmVsLm1fbnVtYmVyKTtcbiAgICAgICAgICAgIHZhciBuZXdOdSA9IChvbGROdSArIGNvdW50KSAlIDEwO1xuICAgICAgICAgICAgdGhpcy5zZXRPbmVOdW1iZXIobGFiZWwsbmV3TnUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vbW92ZSBwbHVzXG4gICAgbW92ZVBsdXM6ZnVuY3Rpb24oc3BlZWQpe1xuICAgICAgICB2YXIgaiA9IHRoaXMubGFiZWxBcnJheS5sZW5ndGg7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBqOyBpKyspe1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5sYWJlbEFycmF5W2ldO1xuICAgICAgICAgICAgbGFiZWwubm9kZS55IC09IHNwZWVkO1xuICAgICAgICAgICAgaWYobGFiZWwubm9kZS55IDw9IC0odGhpcy5tX2hlaWdodCAqIDIpKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1fZGVsdGEgPSAtKHRoaXMubV9oZWlnaHQqMikgLSBsYWJlbC5ub2RlLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5qdXN0UG9zKCk7XG4gICAgICAgICAgICAgICAgaSA9IC0xO1xuICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL1xuICAgIGp1c3RQb3M6ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5tX2lzRmlyc3Qpe1xuICAgICAgICAgICAgdGhpcy5tX29sZERhdGEgKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5sYWJlbEFycmF5LnNoaWZ0KCk7XG4gICAgICAgIGxldCBudW1iZXIgPSBsYWJlbC5tX251bWJlcjtcbiAgICAgICAgbnVtYmVyID0gKG51bWJlciArIDQpICUgMTA7XG4gICAgICAgIHRoaXMuc2V0T25lTnVtYmVyKGxhYmVsLG51bWJlcik7XG4gICAgICAgIGxhYmVsLm5vZGUueSA9ICh0aGlzLm1faGVpZ2h0ICogMikgLSB0aGlzLm1fZGVsdGE7XG4gICAgICAgIHRoaXMubGFiZWxBcnJheS5wdXNoKGxhYmVsKTtcbiAgICB9LFxuICAgIC8v6K6+572u5p+Q5LiA5Liq5pWw5a2XXG4gICAgc2V0T25lTnVtYmVyOmZ1bmN0aW9uKGxhYmVsLG51bWJlcil7XG4gICAgICAgIG51bWJlciA9IG51bWJlciUxMDtcbiAgICAgICAgbGFiZWwubV9udW1iZXIgPSBudW1iZXI7XG4gICAgICAgIGxhYmVsLnNwcml0ZUZyYW1lID0gdGhpcy50ZXh0dXJlQXJyYXlbbnVtYmVyXTtcbiAgICB9XG59KTtcbiIsInZhciBjdWJlUyA9IHJlcXVpcmUoXCJjdWJlXCIpO1xudmFyIEdhbWUgPSByZXF1aXJlKFwiR2FtZVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVuaXRJbmRleDotMSxcblxuICAgICAgIGN1YmVfYXJyYXk6W10sXG4gICAgICAgbV9jb250cm9sU3BlZWQ6MTAwMCwvL+aOp+WItuWKoOmAn1xuICAgICAgIG1fc3BlZWQ6MCwvL+W9k+WJjemAn+W6plxuICAgICAgIG1fbW92ZURpczowLC8v56e75Yqo6Led56a7XG4gICAgICAgbV9zdGFydDpmYWxzZSxcbiAgICAgICBtX2RlbHRhRGlzOjAsXG4gICAgICAgXG4gICAgICAgbV90b3RhbERpczowLFxuICAgICAgIG1fc3RvcERpczowLFxuICAgICAgIG1fc3RvcEZsYWc6ZmFsc2UsXG4gICAgICAgc3RvcERhdGFfYXJyYXk6W10sXG4gICAgICAgZGF0YUluZGV4OjAsXG4gICAgICAgb25jZUZsYWc6ZmFsc2UsXG4gICAgICAgaXNTcGVjaWFsTW9kZWw6ZmFsc2UsLy/lpKfkuLDmlLbmqKHlvI9cbiAgICAgICBvbkZ1bmN0aW9uOm51bGwsXG4gICAgICAgbmFtZUFycmF5Om51bGwsLy9cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMub25GdW5jdGlvbiA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZScpO1xuICAgICAgICB0aGlzLmN1YmVfYXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lQXJyYXkgPSBbXCJXV1wiLFwiRkdcIixcIk0xXCIsXCJNMlwiLFwiTTNcIixcIkY0XCIsXCJGNVwiLFwiRjZcIixcIkY3XCIsXCJGOFwiXTtcbiAgICAgICAgdGhpcy5tX2NvbnRyb2xTcGVlZCA9IDEwMDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA2OyBpKyspe1xuICAgICAgICAgICAgdmFyIGN1YmVOYW1lID0gXCJjdWJlXCIgKyBcIlwiKyhpKzEpO1xuICAgICAgICAgICAgdmFyIGN1YmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoY3ViZU5hbWUpO1xuICAgICAgICAgICAgdmFyIGN1YmVTY3JpcHQgPSBjdWJlLmdldENvbXBvbmVudChjdWJlUyk7XG4gICAgICAgICAgICB2YXIgcmFuZCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICAgICAgdmFyIG5hbWVTdHIgPSB0aGlzLm5hbWVBcnJheVtyYW5kXTtcbiAgICAgICAgICAgIGN1YmVTY3JpcHQuc2V0Q3ViZShuYW1lU3RyKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZV9hcnJheS5wdXNoKGN1YmUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9zdGFydCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzdGFydFJvdW5kOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMub25jZUZsYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX3NwZWVkID0gMjAwO1xuICAgICAgICB0aGlzLm1fY29udHJvbFNwZWVkID0gMjAwMDtcbiAgICAgICAgdGhpcy5kYXRhSW5kZXggPSAwO1xuICAgICAgICB0aGlzLm1fc3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLm1fc3RvcEZsYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX3N0b3BEaXMgPSAwO1xuICAgIH0sXG5cbiAgIGhpZGRsZUN1YmU6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pc1NwZWNpYWxNb2RlbCA9IGZhbHNlO1xuICAgICAgICBmb3IodmFyIGkgPSA1OyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICB2YXIgY3ViZSA9IHRoaXMuY3ViZV9hcnJheVtpXTtcbiAgICAgICAgICAgIGN1YmUuZ2V0Q29tcG9uZW50KGN1YmVTKS5zdG9wQW5pKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3RvcERhdGFBcnJheTpmdW5jdGlvbihzdG9wRGF0YV9hcnJheSwgaW5kZXgsaXNTcGVjaWFsTW9kZWwpe1xuICAgICAgICB0aGlzLm5hbWVBcnJheSA9IFtcIldXXCIsXCJGR1wiLFwiTTFcIixcIk0yXCIsXCJNM1wiLFwiRjRcIixcIkY1XCIsXCJGNlwiLFwiRjdcIixcIkY4XCJdO1xuICAgICAgICBpZihpbmRleCA9PSAxKXtcbiAgICAgICAgICAgIHRoaXMuaXNTcGVjaWFsTW9kZWwgPSBpc1NwZWNpYWxNb2RlbDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzU3BlY2lhbE1vZGVsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wRGF0YV9hcnJheSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RvcERhdGFfYXJyYXkgPSBzdG9wRGF0YV9hcnJheS5jb25jYXQoKTtcbiAgICAgICAgLy/mnIDlkI7mlL4y5Liq6ZqP5py65Zu+XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICAgICAgdmFyIHJhbmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgICAgIHZhciBuYW1lU3RyID0gdGhpcy5uYW1lQXJyYXlbcmFuZF07XG4gICAgICAgICAgICB0aGlzLnN0b3BEYXRhX2FycmF5LnB1c2gobmFtZVN0cik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bml0SW5kZXggPSBpbmRleDtcbiAgICB9LFxuXG4gICAgc2V0SXNTcGVjaWFsTW9kZWw6ZnVuY3Rpb24oZmxhZyl7XG4gICAgICAgIHRoaXMuaXNTcGVjaWFsTW9kZWwgPSBmbGFnO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmKHRoaXMubV9zdGFydCl7XG4gICAgICAgICAgICB0aGlzLnNvbHRzUm91bmQoZHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEN1YmVBcnJheTpmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gIHRoaXMuY3ViZV9hcnJheTtcbiAgICB9LFxuICAgIFxuICAgIC8vc29sdHNSb3VuZFxuICAgIHNvbHRzUm91bmQ6ZnVuY3Rpb24oZHQpe1xuICAgICAgICBpZihkdCA+IDAuMDMyKXtcbiAgICAgICAgICAgIGR0ID0gMC4wMzI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX3NwZWVkID0gdGhpcy5tX3NwZWVkICsgKHRoaXMubV9jb250cm9sU3BlZWQgLSB0aGlzLm1fc3BlZWQpICogZHQgKiA0O1xuICAgICAgICB0aGlzLm1fbW92ZURpcyA9IHRoaXMubV9zcGVlZCAqIGR0O1xuICAgICAgICB0aGlzLm1fdG90YWxEaXMgKz0gdGhpcy5tX21vdmVEaXM7XG4gICAgICAgIGZvcih2YXIgaSA9IDU7IGkgPj0gMDsgaS0tKXtcbiAgICAgICAgICAgIHZhciBjdWJlID0gdGhpcy5jdWJlX2FycmF5W2ldO1xuICAgICAgICAgICAgY3ViZS55ID0gY3ViZS55IC0gdGhpcy5tX21vdmVEaXM7XG4gICAgICAgICAgICBpZihjdWJlLnkgPCAtIDExMi41KXsvL+aNoumhuuW6jyAgXG4gICAgICAgICAgICAgICAgdGhpcy5tX2RlbHRhRGlzID0gLTExMi41IC0gY3ViZS55O1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdFBvc0FuZEFycmF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoKHRoaXMubV9zdG9wRGlzICsgNjAgPD0gdGhpcy5tX3RvdGFsRGlzKSAmJiB0aGlzLm1fc3RvcEZsYWcgPT09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5tX3N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAvL+WbnuW8uVxuICAgICAgICAgICAgdGhpcy5raWNrQWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBcbiAgICBraWNrQWN0aW9uOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBvdXREaXMgPSAxMTIuNS0gdGhpcy5jdWJlX2FycmF5WzBdLnk7XG4gICAgICAgIHRoaXMub25jZUZsYWcgPSBmYWxzZTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDY7IGkrKyl7XG4gICAgICAgICAgICB2YXIgY3ViZSA9IHRoaXMuY3ViZV9hcnJheVtpXTtcbiAgICAgICAgICAgIHZhciBtb3ZlQnkgPSBjYy5tb3ZlQnkoMC4xLCBjYy5wKDAsb3V0RGlzKSk7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLmp1ZGdlTGFzdFJvdW5kLCB0aGlzKTtcbiAgICAgICAgICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShtb3ZlQnksY2FsbGJhY2spXG4gICAgICAgICAgICBjdWJlLnJ1bkFjdGlvbihzZXEpOyBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBqdWRnZUxhc3RSb3VuZDpmdW5jdGlvbigpe1xuICAgICAgICBpZigodGhpcy51bml0SW5kZXggPT0gNSkgJiYodGhpcy5kYXRhSW5kZXggPT0gNikpe1xuICAgICAgICAgICAgaWYodGhpcy5vbmNlRmxhZyA9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlRmxhZyA9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmFsbFJvdW5kRW5kZWQsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKCh0aGlzLmlzU3BlY2lhbE1vZGVsID09IHRydWUpICYmICh0aGlzLnVuaXRJbmRleCA9PSAxKSAmJiAodGhpcy5kYXRhSW5kZXggPT0gNikgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmVfYXJyYXlbM10uZ2V0Q29tcG9uZW50KGN1YmVTKS5wbGF5QW5pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdWJlX2FycmF5WzJdLmdldENvbXBvbmVudChjdWJlUykucGxheUFuaSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3ViZV9hcnJheVsxXS5nZXRDb21wb25lbnQoY3ViZVMpLnBsYXlBbmkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmVfYXJyYXlbMF0uZ2V0Q29tcG9uZW50KGN1YmVTKS5wbGF5QW5pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkZ1bmN0aW9uLnNldFVuaXRTcGVjaWFsTW9kZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGFsbFJvdW5kRW5kZWQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5vbkZ1bmN0aW9uLnJvdW5kRW5kZWQoKTtcbiAgICB9LFxuICAgIC8vXG4gICAgcmVzdFBvc0FuZEFycmF5OmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0ZW1wQ3ViZSA9IHRoaXMuY3ViZV9hcnJheS5zaGlmdCgpXG4gICAgICAgIHRlbXBDdWJlLnkgPSAxMjM3LjUgLSB0aGlzLm1fZGVsdGFEaXM7XG4gICAgICAgIHRoaXMuY3ViZV9hcnJheS5wdXNoKHRlbXBDdWJlKTtcbiAgICAgICAgdmFyIG5hbWVTdHIgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLm1fc3RvcEZsYWcgPT0gZmFsc2Upe1xuICAgICAgICAgICAgdmFyIHJhbmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgICAgIG5hbWVTdHIgPSB0aGlzLm5hbWVBcnJheVtyYW5kXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgbmFtZVN0ciA9IHRoaXMuc3RvcERhdGFfYXJyYXlbdGhpcy5kYXRhSW5kZXhdO1xuICAgICAgICAgICAgaWYoKHRoaXMuaXNTcGVjaWFsTW9kZWwgPT0gdHJ1ZSkgJiYgKG5hbWVTdHIgPT0gXCJXV1wiKSAmJiAodGhpcy5kYXRhSW5kZXggPCA0KSAmJiAodGhpcy51bml0SW5kZXghPSAxKSl7XG4gICAgICAgICAgICAgICAgdGVtcEN1YmUuZ2V0Q29tcG9uZW50KGN1YmVTKS5wbGF5QW5pKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFJbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBDdWJlLmdldENvbXBvbmVudChjdWJlUykuc2V0Q3ViZShuYW1lU3RyKTtcbiAgICB9LFxuICAgIFxuICAgIHN0b3BSb3VuZDpmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLm1fc3RvcEZsYWcgPT0gZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5tX2NvbnRyb2xTcGVlZCA9IDUwMDtcbiAgICAgICAgICAgIHRoaXMubV9zdG9wRGlzID0gdGhpcy5jdWJlX2FycmF5WzVdLnkgLSAxMTIuNTtcbiAgICAgICAgICAgIHRoaXMubV9zdG9wRmxhZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fdG90YWxEaXMgPSAwO1xuICAgICAgICAgICAgLy/mjaLnrKzkuIDkuKpcbiAgICAgICAgICAgIHZhciBuYW1lU3RyID0gdGhpcy5zdG9wRGF0YV9hcnJheVt0aGlzLmRhdGFJbmRleF07XG4gICAgICAgICAgICB0aGlzLmN1YmVfYXJyYXlbNV0uZ2V0Q29tcG9uZW50KGN1YmVTKS5zZXRDdWJlKG5hbWVTdHIpO1xuICAgICAgICAgICAgdmFyIG5hbWVTdHIgPSB0aGlzLnN0b3BEYXRhX2FycmF5W3RoaXMuZGF0YUluZGV4XTtcbiAgICAgICAgICAgIGlmKCh0aGlzLmlzU3BlY2lhbE1vZGVsID09IHRydWUpICYmIChuYW1lU3RyID09IFwiV1dcIikgJiYgKHRoaXMuZGF0YUluZGV4IDwgNCkgJiYgKHRoaXMudW5pdEluZGV4IT0gMSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3ViZV9hcnJheVs1XS5nZXRDb21wb25lbnQoY3ViZVMpLnBsYXlBbmkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YUluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5cblxuXG5cblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9