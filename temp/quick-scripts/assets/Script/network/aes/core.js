(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/aes/core.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f98dc0VdUlJbb3GxDujom2w', 'core', __filename);
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
        //# sourceMappingURL=core.js.map
        