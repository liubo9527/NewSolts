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