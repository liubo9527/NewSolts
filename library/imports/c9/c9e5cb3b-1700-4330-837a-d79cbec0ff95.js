"use strict";
cc._RF.push(module, 'c9e5cs7FwBDMIN615y+wP+V', 'evpkdf');
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

cc._RF.pop();