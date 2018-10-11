(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/aes/aes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d4bagbY7REOJrUSdmZTt5H', 'aes', __filename);
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
        //# sourceMappingURL=aes.js.map
        