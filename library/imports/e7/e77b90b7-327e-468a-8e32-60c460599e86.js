"use strict";
cc._RF.push(module, 'e77b9C3Mn5Gio4yYMRgWZ6G', 'DataOper');
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
        //原始 39bfced3c7ad0f9965dc15c59775bcbb-12-1576-1226
        //外卖 88c8afd5a29d5e27e4066f1f9eda5102-12-1576-2999
        //金币 94a957854809bc56614c282849eefa60-12-1576-2776
        //游戏标识
        //headerGid : "10010"  //每个游戏在这里写死  同花顺-10000  小怪联盟-10001  旗开得胜-10002 奇幻宝石-10003 老虎机-10004 地产大亨-10005 埃及探宝-10009
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

cc._RF.pop();