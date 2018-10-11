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