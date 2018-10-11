(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/aes/mode-ecb.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4621cR9uJdMfqdTavrC8axn', 'mode-ecb', __filename);
// Script/network/aes/mode-ecb.js

"use strict";

var CryptoJS = require("./core");CryptoJS.mode.ECB = function () {
  var ECB = CryptoJS.lib.BlockCipherMode.extend();ECB.Encryptor = ECB.extend({ processBlock: function processBlock(words, offset) {
      this._cipher.encryptBlock(words, offset);
    } });ECB.Decryptor = ECB.extend({ processBlock: function processBlock(words, offset) {
      this._cipher.decryptBlock(words, offset);
    } });return ECB;
}();

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mode-ecb.js.map
        