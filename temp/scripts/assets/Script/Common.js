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