"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/tetris-fumen/lib/defines.js
  var require_defines = __commonJS({
    "node_modules/tetris-fumen/lib/defines.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseRotation = exports.parseRotationName = exports.Rotation = exports.parsePiece = exports.parsePieceName = exports.isMinoPiece = exports.Piece = void 0;
      var Piece;
      (function(Piece2) {
        Piece2[Piece2["Empty"] = 0] = "Empty";
        Piece2[Piece2["I"] = 1] = "I";
        Piece2[Piece2["L"] = 2] = "L";
        Piece2[Piece2["O"] = 3] = "O";
        Piece2[Piece2["Z"] = 4] = "Z";
        Piece2[Piece2["T"] = 5] = "T";
        Piece2[Piece2["J"] = 6] = "J";
        Piece2[Piece2["S"] = 7] = "S";
        Piece2[Piece2["Gray"] = 8] = "Gray";
      })(Piece = exports.Piece || (exports.Piece = {}));
      function isMinoPiece(piece) {
        return piece !== Piece.Empty && piece !== Piece.Gray;
      }
      exports.isMinoPiece = isMinoPiece;
      function parsePieceName(piece) {
        switch (piece) {
          case Piece.I:
            return "I";
          case Piece.L:
            return "L";
          case Piece.O:
            return "O";
          case Piece.Z:
            return "Z";
          case Piece.T:
            return "T";
          case Piece.J:
            return "J";
          case Piece.S:
            return "S";
          case Piece.Gray:
            return "X";
          case Piece.Empty:
            return "_";
        }
        throw new Error("Unknown piece: ".concat(piece));
      }
      exports.parsePieceName = parsePieceName;
      function parsePiece(piece) {
        switch (piece.toUpperCase()) {
          case "I":
            return Piece.I;
          case "L":
            return Piece.L;
          case "O":
            return Piece.O;
          case "Z":
            return Piece.Z;
          case "T":
            return Piece.T;
          case "J":
            return Piece.J;
          case "S":
            return Piece.S;
          case "X":
          case "GRAY":
            return Piece.Gray;
          case " ":
          case "_":
          case "EMPTY":
            return Piece.Empty;
        }
        throw new Error("Unknown piece: ".concat(piece));
      }
      exports.parsePiece = parsePiece;
      var Rotation3;
      (function(Rotation4) {
        Rotation4[Rotation4["Spawn"] = 0] = "Spawn";
        Rotation4[Rotation4["Right"] = 1] = "Right";
        Rotation4[Rotation4["Reverse"] = 2] = "Reverse";
        Rotation4[Rotation4["Left"] = 3] = "Left";
      })(Rotation3 = exports.Rotation || (exports.Rotation = {}));
      function parseRotationName(rotation) {
        switch (rotation) {
          case Rotation3.Spawn:
            return "spawn";
          case Rotation3.Left:
            return "left";
          case Rotation3.Right:
            return "right";
          case Rotation3.Reverse:
            return "reverse";
        }
        throw new Error("Unknown rotation: ".concat(rotation));
      }
      exports.parseRotationName = parseRotationName;
      function parseRotation(rotation) {
        switch (rotation.toLowerCase()) {
          case "spawn":
            return Rotation3.Spawn;
          case "left":
            return Rotation3.Left;
          case "right":
            return Rotation3.Right;
          case "reverse":
            return Rotation3.Reverse;
        }
        throw new Error("Unknown rotation: ".concat(rotation));
      }
      exports.parseRotation = parseRotation;
    }
  });

  // node_modules/tetris-fumen/lib/inner_field.js
  var require_inner_field = __commonJS({
    "node_modules/tetris-fumen/lib/inner_field.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getPieces = exports.getBlocks = exports.getBlockXYs = exports.getBlockPositions = exports.PlayField = exports.InnerField = exports.createInnerField = exports.createNewInnerField = void 0;
      var defines_1 = require_defines();
      var FieldConstants = {
        Width: 10,
        Height: 23,
        PlayBlocks: 23 * 10
        // Height * Width
      };
      function createNewInnerField() {
        return new InnerField({});
      }
      exports.createNewInnerField = createNewInnerField;
      function createInnerField(field) {
        var innerField = new InnerField({});
        for (var y = -1; y < FieldConstants.Height; y += 1) {
          for (var x = 0; x < FieldConstants.Width; x += 1) {
            var at = field.at(x, y);
            innerField.setNumberAt(x, y, (0, defines_1.parsePiece)(at));
          }
        }
        return innerField;
      }
      exports.createInnerField = createInnerField;
      var InnerField = (
        /** @class */
        (function() {
          function InnerField2(_a2) {
            var _b = _a2.field, field = _b === void 0 ? InnerField2.create(FieldConstants.PlayBlocks) : _b, _c = _a2.garbage, garbage = _c === void 0 ? InnerField2.create(FieldConstants.Width) : _c;
            this.field = field;
            this.garbage = garbage;
          }
          InnerField2.create = function(length) {
            return new PlayField({ length });
          };
          InnerField2.prototype.fill = function(operation) {
            this.field.fill(operation);
          };
          InnerField2.prototype.fillAll = function(positions, type) {
            this.field.fillAll(positions, type);
          };
          InnerField2.prototype.canFill = function(piece, rotation, x, y) {
            var _this = this;
            var positions = getBlockPositions(piece, rotation, x, y);
            return positions.every(function(_a2) {
              var px = _a2[0], py = _a2[1];
              return 0 <= px && px < 10 && 0 <= py && py < FieldConstants.Height && _this.getNumberAt(px, py) === defines_1.Piece.Empty;
            });
          };
          InnerField2.prototype.canFillAll = function(positions) {
            var _this = this;
            return positions.every(function(_a2) {
              var x = _a2.x, y = _a2.y;
              return 0 <= x && x < 10 && 0 <= y && y < FieldConstants.Height && _this.getNumberAt(x, y) === defines_1.Piece.Empty;
            });
          };
          InnerField2.prototype.isOnGround = function(piece, rotation, x, y) {
            return !this.canFill(piece, rotation, x, y - 1);
          };
          InnerField2.prototype.clearLine = function() {
            this.field.clearLine();
          };
          InnerField2.prototype.riseGarbage = function() {
            this.field.up(this.garbage);
            this.garbage.clearAll();
          };
          InnerField2.prototype.mirror = function() {
            this.field.mirror();
          };
          InnerField2.prototype.shiftToLeft = function() {
            this.field.shiftToLeft();
          };
          InnerField2.prototype.shiftToRight = function() {
            this.field.shiftToRight();
          };
          InnerField2.prototype.shiftToUp = function() {
            this.field.shiftToUp();
          };
          InnerField2.prototype.shiftToBottom = function() {
            this.field.shiftToBottom();
          };
          InnerField2.prototype.copy = function() {
            return new InnerField2({ field: this.field.copy(), garbage: this.garbage.copy() });
          };
          InnerField2.prototype.equals = function(other) {
            return this.field.equals(other.field) && this.garbage.equals(other.garbage);
          };
          InnerField2.prototype.addNumber = function(x, y, value) {
            if (0 <= y) {
              this.field.addOffset(x, y, value);
            } else {
              this.garbage.addOffset(x, -(y + 1), value);
            }
          };
          InnerField2.prototype.setNumberFieldAt = function(index, value) {
            this.field.setAt(index, value);
          };
          InnerField2.prototype.setNumberGarbageAt = function(index, value) {
            this.garbage.setAt(index, value);
          };
          InnerField2.prototype.setNumberAt = function(x, y, value) {
            return 0 <= y ? this.field.set(x, y, value) : this.garbage.set(x, -(y + 1), value);
          };
          InnerField2.prototype.getNumberAt = function(x, y) {
            return 0 <= y ? this.field.get(x, y) : this.garbage.get(x, -(y + 1));
          };
          InnerField2.prototype.getNumberAtIndex = function(index, isField) {
            if (isField) {
              return this.getNumberAt(index % 10, Math.floor(index / 10));
            }
            return this.getNumberAt(index % 10, -(Math.floor(index / 10) + 1));
          };
          InnerField2.prototype.toFieldNumberArray = function() {
            return this.field.toArray();
          };
          InnerField2.prototype.toGarbageNumberArray = function() {
            return this.garbage.toArray();
          };
          return InnerField2;
        })()
      );
      exports.InnerField = InnerField;
      var PlayField = (
        /** @class */
        (function() {
          function PlayField2(_a2) {
            var pieces = _a2.pieces, _b = _a2.length, length = _b === void 0 ? FieldConstants.PlayBlocks : _b;
            if (pieces !== void 0) {
              this.pieces = pieces;
            } else {
              this.pieces = Array.from({ length }).map(function() {
                return defines_1.Piece.Empty;
              });
            }
            this.length = length;
          }
          PlayField2.load = function() {
            var lines = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              lines[_i] = arguments[_i];
            }
            var blocks = lines.join("").trim();
            return PlayField2.loadInner(blocks);
          };
          PlayField2.loadMinify = function() {
            var lines = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              lines[_i] = arguments[_i];
            }
            var blocks = lines.join("").trim();
            return PlayField2.loadInner(blocks, blocks.length);
          };
          PlayField2.loadInner = function(blocks, length) {
            var len = length !== void 0 ? length : blocks.length;
            if (len % 10 !== 0) {
              throw new Error("Num of blocks in field should be mod 10");
            }
            var field = length !== void 0 ? new PlayField2({ length }) : new PlayField2({});
            for (var index = 0; index < len; index += 1) {
              var block = blocks[index];
              field.set(index % 10, Math.floor((len - index - 1) / 10), (0, defines_1.parsePiece)(block));
            }
            return field;
          };
          PlayField2.prototype.get = function(x, y) {
            return this.pieces[x + y * FieldConstants.Width];
          };
          PlayField2.prototype.addOffset = function(x, y, value) {
            this.pieces[x + y * FieldConstants.Width] += value;
          };
          PlayField2.prototype.set = function(x, y, piece) {
            this.setAt(x + y * FieldConstants.Width, piece);
          };
          PlayField2.prototype.setAt = function(index, piece) {
            this.pieces[index] = piece;
          };
          PlayField2.prototype.fill = function(_a2) {
            var type = _a2.type, rotation = _a2.rotation, x = _a2.x, y = _a2.y;
            var blocks = getBlocks(type, rotation);
            for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
              var block = blocks_1[_i];
              var _b = [x + block[0], y + block[1]], nx = _b[0], ny = _b[1];
              this.set(nx, ny, type);
            }
          };
          PlayField2.prototype.fillAll = function(positions, type) {
            for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
              var _a2 = positions_1[_i], x = _a2.x, y = _a2.y;
              this.set(x, y, type);
            }
          };
          PlayField2.prototype.clearLine = function() {
            var newField = this.pieces.concat();
            var top = this.pieces.length / FieldConstants.Width - 1;
            for (var y = top; 0 <= y; y -= 1) {
              var line = this.pieces.slice(y * FieldConstants.Width, (y + 1) * FieldConstants.Width);
              var isFilled = line.every(function(value) {
                return value !== defines_1.Piece.Empty;
              });
              if (isFilled) {
                var bottom = newField.slice(0, y * FieldConstants.Width);
                var over = newField.slice((y + 1) * FieldConstants.Width);
                newField = bottom.concat(over, Array.from({ length: FieldConstants.Width }).map(function() {
                  return defines_1.Piece.Empty;
                }));
              }
            }
            this.pieces = newField;
          };
          PlayField2.prototype.up = function(blockUp) {
            this.pieces = blockUp.pieces.concat(this.pieces).slice(0, this.length);
          };
          PlayField2.prototype.mirror = function() {
            var newField = [];
            for (var y = 0; y < this.pieces.length; y += 1) {
              var line = this.pieces.slice(y * FieldConstants.Width, (y + 1) * FieldConstants.Width);
              line.reverse();
              for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                var obj = line_1[_i];
                newField.push(obj);
              }
            }
            this.pieces = newField;
          };
          PlayField2.prototype.shiftToLeft = function() {
            var height = this.pieces.length / 10;
            for (var y = 0; y < height; y += 1) {
              for (var x = 0; x < FieldConstants.Width - 1; x += 1) {
                this.pieces[x + y * FieldConstants.Width] = this.pieces[x + 1 + y * FieldConstants.Width];
              }
              this.pieces[9 + y * FieldConstants.Width] = defines_1.Piece.Empty;
            }
          };
          PlayField2.prototype.shiftToRight = function() {
            var height = this.pieces.length / 10;
            for (var y = 0; y < height; y += 1) {
              for (var x = FieldConstants.Width - 1; 1 <= x; x -= 1) {
                this.pieces[x + y * FieldConstants.Width] = this.pieces[x - 1 + y * FieldConstants.Width];
              }
              this.pieces[y * FieldConstants.Width] = defines_1.Piece.Empty;
            }
          };
          PlayField2.prototype.shiftToUp = function() {
            var blanks = Array.from({ length: 10 }).map(function() {
              return defines_1.Piece.Empty;
            });
            this.pieces = blanks.concat(this.pieces).slice(0, this.length);
          };
          PlayField2.prototype.shiftToBottom = function() {
            var blanks = Array.from({ length: 10 }).map(function() {
              return defines_1.Piece.Empty;
            });
            this.pieces = this.pieces.slice(10, this.length).concat(blanks);
          };
          PlayField2.prototype.toArray = function() {
            return this.pieces.concat();
          };
          Object.defineProperty(PlayField2.prototype, "numOfBlocks", {
            get: function() {
              return this.pieces.length;
            },
            enumerable: false,
            configurable: true
          });
          PlayField2.prototype.copy = function() {
            return new PlayField2({ pieces: this.pieces.concat(), length: this.length });
          };
          PlayField2.prototype.toShallowArray = function() {
            return this.pieces;
          };
          PlayField2.prototype.clearAll = function() {
            this.pieces = this.pieces.map(function() {
              return defines_1.Piece.Empty;
            });
          };
          PlayField2.prototype.equals = function(other) {
            if (this.pieces.length !== other.pieces.length) {
              return false;
            }
            for (var index = 0; index < this.pieces.length; index += 1) {
              if (this.pieces[index] !== other.pieces[index]) {
                return false;
              }
            }
            return true;
          };
          return PlayField2;
        })()
      );
      exports.PlayField = PlayField;
      function getBlockPositions(piece, rotation, x, y) {
        return getBlocks(piece, rotation).map(function(position) {
          position[0] += x;
          position[1] += y;
          return position;
        });
      }
      exports.getBlockPositions = getBlockPositions;
      function getBlockXYs(piece, rotation, x, y) {
        return getBlocks(piece, rotation).map(function(position) {
          return { x: position[0] + x, y: position[1] + y };
        });
      }
      exports.getBlockXYs = getBlockXYs;
      function getBlocks(piece, rotation) {
        var blocks = getPieces(piece);
        switch (rotation) {
          case defines_1.Rotation.Spawn:
            return blocks;
          case defines_1.Rotation.Left:
            return rotateLeft(blocks);
          case defines_1.Rotation.Reverse:
            return rotateReverse(blocks);
          case defines_1.Rotation.Right:
            return rotateRight(blocks);
        }
        throw new Error("Unsupported block");
      }
      exports.getBlocks = getBlocks;
      function getPieces(piece) {
        switch (piece) {
          case defines_1.Piece.I:
            return [[0, 0], [-1, 0], [1, 0], [2, 0]];
          case defines_1.Piece.T:
            return [[0, 0], [-1, 0], [1, 0], [0, 1]];
          case defines_1.Piece.O:
            return [[0, 0], [1, 0], [0, 1], [1, 1]];
          case defines_1.Piece.L:
            return [[0, 0], [-1, 0], [1, 0], [1, 1]];
          case defines_1.Piece.J:
            return [[0, 0], [-1, 0], [1, 0], [-1, 1]];
          case defines_1.Piece.S:
            return [[0, 0], [-1, 0], [0, 1], [1, 1]];
          case defines_1.Piece.Z:
            return [[0, 0], [1, 0], [0, 1], [-1, 1]];
        }
        throw new Error("Unsupported rotation");
      }
      exports.getPieces = getPieces;
      function rotateRight(positions) {
        return positions.map(function(current) {
          return [current[1], -current[0]];
        });
      }
      function rotateLeft(positions) {
        return positions.map(function(current) {
          return [-current[1], current[0]];
        });
      }
      function rotateReverse(positions) {
        return positions.map(function(current) {
          return [-current[0], -current[1]];
        });
      }
    }
  });

  // node_modules/tetris-fumen/lib/buffer.js
  var require_buffer = __commonJS({
    "node_modules/tetris-fumen/lib/buffer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Buffer = void 0;
      var ENCODE_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var Buffer2 = (
        /** @class */
        (function() {
          function Buffer3(data) {
            if (data === void 0) {
              data = "";
            }
            this.values = data.split("").map(decodeToValue);
          }
          Buffer3.prototype.poll = function(max) {
            var value = 0;
            for (var count = 0; count < max; count += 1) {
              var v2 = this.values.shift();
              if (v2 === void 0) {
                throw new Error("Unexpected fumen");
              }
              value += v2 * Math.pow(Buffer3.tableLength, count);
            }
            return value;
          };
          Buffer3.prototype.push = function(value, splitCount) {
            if (splitCount === void 0) {
              splitCount = 1;
            }
            var current = value;
            for (var count = 0; count < splitCount; count += 1) {
              this.values.push(current % Buffer3.tableLength);
              current = Math.floor(current / Buffer3.tableLength);
            }
          };
          Buffer3.prototype.merge = function(postBuffer) {
            for (var _i = 0, _a2 = postBuffer.values; _i < _a2.length; _i++) {
              var value = _a2[_i];
              this.values.push(value);
            }
          };
          Buffer3.prototype.isEmpty = function() {
            return this.values.length === 0;
          };
          Object.defineProperty(Buffer3.prototype, "length", {
            get: function() {
              return this.values.length;
            },
            enumerable: false,
            configurable: true
          });
          Buffer3.prototype.get = function(index) {
            return this.values[index];
          };
          Buffer3.prototype.set = function(index, value) {
            this.values[index] = value;
          };
          Buffer3.prototype.toString = function() {
            return this.values.map(encodeFromValue).join("");
          };
          Buffer3.tableLength = ENCODE_TABLE.length;
          return Buffer3;
        })()
      );
      exports.Buffer = Buffer2;
      function decodeToValue(v2) {
        return ENCODE_TABLE.indexOf(v2);
      }
      function encodeFromValue(index) {
        return ENCODE_TABLE[index];
      }
    }
  });

  // node_modules/tetris-fumen/lib/action.js
  var require_action = __commonJS({
    "node_modules/tetris-fumen/lib/action.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createActionEncoder = exports.createActionDecoder = void 0;
      var defines_1 = require_defines();
      function decodeBool(n) {
        return n !== 0;
      }
      var createActionDecoder = function(width, fieldTop, garbageLine) {
        var fieldMaxHeight = fieldTop + garbageLine;
        var numFieldBlocks = fieldMaxHeight * width;
        function decodePiece(n) {
          switch (n) {
            case 0:
              return defines_1.Piece.Empty;
            case 1:
              return defines_1.Piece.I;
            case 2:
              return defines_1.Piece.L;
            case 3:
              return defines_1.Piece.O;
            case 4:
              return defines_1.Piece.Z;
            case 5:
              return defines_1.Piece.T;
            case 6:
              return defines_1.Piece.J;
            case 7:
              return defines_1.Piece.S;
            case 8:
              return defines_1.Piece.Gray;
          }
          throw new Error("Unexpected piece");
        }
        function decodeRotation(n) {
          switch (n) {
            case 0:
              return defines_1.Rotation.Reverse;
            case 1:
              return defines_1.Rotation.Right;
            case 2:
              return defines_1.Rotation.Spawn;
            case 3:
              return defines_1.Rotation.Left;
          }
          throw new Error("Unexpected rotation");
        }
        function decodeCoordinate(n, piece, rotation) {
          var x = n % width;
          var originY = Math.floor(n / 10);
          var y = fieldTop - originY - 1;
          if (piece === defines_1.Piece.O && rotation === defines_1.Rotation.Left) {
            x += 1;
            y -= 1;
          } else if (piece === defines_1.Piece.O && rotation === defines_1.Rotation.Reverse) {
            x += 1;
          } else if (piece === defines_1.Piece.O && rotation === defines_1.Rotation.Spawn) {
            y -= 1;
          } else if (piece === defines_1.Piece.I && rotation === defines_1.Rotation.Reverse) {
            x += 1;
          } else if (piece === defines_1.Piece.I && rotation === defines_1.Rotation.Left) {
            y -= 1;
          } else if (piece === defines_1.Piece.S && rotation === defines_1.Rotation.Spawn) {
            y -= 1;
          } else if (piece === defines_1.Piece.S && rotation === defines_1.Rotation.Right) {
            x -= 1;
          } else if (piece === defines_1.Piece.Z && rotation === defines_1.Rotation.Spawn) {
            y -= 1;
          } else if (piece === defines_1.Piece.Z && rotation === defines_1.Rotation.Left) {
            x += 1;
          }
          return { x, y };
        }
        return {
          decode: function(v2) {
            var value = v2;
            var type = decodePiece(value % 8);
            value = Math.floor(value / 8);
            var rotation = decodeRotation(value % 4);
            value = Math.floor(value / 4);
            var coordinate = decodeCoordinate(value % numFieldBlocks, type, rotation);
            value = Math.floor(value / numFieldBlocks);
            var isBlockUp = decodeBool(value % 2);
            value = Math.floor(value / 2);
            var isMirror = decodeBool(value % 2);
            value = Math.floor(value / 2);
            var isColor = decodeBool(value % 2);
            value = Math.floor(value / 2);
            var isComment = decodeBool(value % 2);
            value = Math.floor(value / 2);
            var isLock = !decodeBool(value % 2);
            return {
              rise: isBlockUp,
              mirror: isMirror,
              colorize: isColor,
              comment: isComment,
              lock: isLock,
              piece: __assign(__assign({}, coordinate), { type, rotation })
            };
          }
        };
      };
      exports.createActionDecoder = createActionDecoder;
      function encodeBool(flag) {
        return flag ? 1 : 0;
      }
      var createActionEncoder = function(width, fieldTop, garbageLine) {
        var fieldMaxHeight = fieldTop + garbageLine;
        var numFieldBlocks = fieldMaxHeight * width;
        function encodePosition(operation) {
          var type = operation.type, rotation = operation.rotation;
          var x = operation.x;
          var y = operation.y;
          if (!(0, defines_1.isMinoPiece)(type)) {
            x = 0;
            y = 22;
          } else if (type === defines_1.Piece.O && rotation === defines_1.Rotation.Left) {
            x -= 1;
            y += 1;
          } else if (type === defines_1.Piece.O && rotation === defines_1.Rotation.Reverse) {
            x -= 1;
          } else if (type === defines_1.Piece.O && rotation === defines_1.Rotation.Spawn) {
            y += 1;
          } else if (type === defines_1.Piece.I && rotation === defines_1.Rotation.Reverse) {
            x -= 1;
          } else if (type === defines_1.Piece.I && rotation === defines_1.Rotation.Left) {
            y += 1;
          } else if (type === defines_1.Piece.S && rotation === defines_1.Rotation.Spawn) {
            y += 1;
          } else if (type === defines_1.Piece.S && rotation === defines_1.Rotation.Right) {
            x += 1;
          } else if (type === defines_1.Piece.Z && rotation === defines_1.Rotation.Spawn) {
            y += 1;
          } else if (type === defines_1.Piece.Z && rotation === defines_1.Rotation.Left) {
            x -= 1;
          }
          return (fieldTop - y - 1) * width + x;
        }
        function encodeRotation(_a2) {
          var type = _a2.type, rotation = _a2.rotation;
          if (!(0, defines_1.isMinoPiece)(type)) {
            return 0;
          }
          switch (rotation) {
            case defines_1.Rotation.Reverse:
              return 0;
            case defines_1.Rotation.Right:
              return 1;
            case defines_1.Rotation.Spawn:
              return 2;
            case defines_1.Rotation.Left:
              return 3;
          }
          throw new Error("No reachable");
        }
        return {
          encode: function(action) {
            var lock = action.lock, comment = action.comment, colorize = action.colorize, mirror = action.mirror, rise = action.rise, piece = action.piece;
            var value = encodeBool(!lock);
            value *= 2;
            value += encodeBool(comment);
            value *= 2;
            value += encodeBool(colorize);
            value *= 2;
            value += encodeBool(mirror);
            value *= 2;
            value += encodeBool(rise);
            value *= numFieldBlocks;
            value += encodePosition(piece);
            value *= 4;
            value += encodeRotation(piece);
            value *= 8;
            value += piece.type;
            return value;
          }
        };
      };
      exports.createActionEncoder = createActionEncoder;
    }
  });

  // node_modules/tetris-fumen/lib/comments.js
  var require_comments = __commonJS({
    "node_modules/tetris-fumen/lib/comments.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createCommentParser = void 0;
      var COMMENT_TABLE = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
      var MAX_COMMENT_CHAR_VALUE = COMMENT_TABLE.length + 1;
      var createCommentParser = function() {
        return {
          decode: function(v2) {
            var str = "";
            var value = v2;
            for (var count = 0; count < 4; count += 1) {
              var index = value % MAX_COMMENT_CHAR_VALUE;
              str += COMMENT_TABLE[index];
              value = Math.floor(value / MAX_COMMENT_CHAR_VALUE);
            }
            return str;
          },
          encode: function(ch, count) {
            return COMMENT_TABLE.indexOf(ch) * Math.pow(MAX_COMMENT_CHAR_VALUE, count);
          }
        };
      };
      exports.createCommentParser = createCommentParser;
    }
  });

  // node_modules/tetris-fumen/lib/quiz.js
  var require_quiz = __commonJS({
    "node_modules/tetris-fumen/lib/quiz.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Quiz = void 0;
      var defines_1 = require_defines();
      var Operation;
      (function(Operation2) {
        Operation2["Direct"] = "direct";
        Operation2["Swap"] = "swap";
        Operation2["Stock"] = "stock";
      })(Operation || (Operation = {}));
      var Quiz = (
        /** @class */
        (function() {
          function Quiz2(quiz) {
            this.quiz = Quiz2.verify(quiz);
          }
          Object.defineProperty(Quiz2.prototype, "next", {
            get: function() {
              var index = this.quiz.indexOf(")") + 1;
              var name = this.quiz[index];
              if (name === void 0 || name === ";") {
                return "";
              }
              return name;
            },
            enumerable: false,
            configurable: true
          });
          Quiz2.isQuizComment = function(comment) {
            return comment.startsWith("#Q=");
          };
          Quiz2.create = function(first, second) {
            var create = function(hold, other) {
              var parse = function(s) {
                return s ? s : "";
              };
              return new Quiz2("#Q=[".concat(parse(hold), "](").concat(parse(other[0]), ")").concat(parse(other.substring(1))));
            };
            return second !== void 0 ? create(first, second) : create(void 0, first);
          };
          Quiz2.trim = function(quiz) {
            return quiz.trim().replace(/\s+/g, "");
          };
          Object.defineProperty(Quiz2.prototype, "least", {
            get: function() {
              var index = this.quiz.indexOf(")");
              return this.quiz.substr(index + 1);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Quiz2.prototype, "current", {
            get: function() {
              var index = this.quiz.indexOf("(") + 1;
              var name = this.quiz[index];
              if (name === ")") {
                return "";
              }
              return name;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Quiz2.prototype, "hold", {
            get: function() {
              var index = this.quiz.indexOf("[") + 1;
              var name = this.quiz[index];
              if (name === "]") {
                return "";
              }
              return name;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Quiz2.prototype, "leastAfterNext2", {
            get: function() {
              var index = this.quiz.indexOf(")");
              if (this.quiz[index + 1] === ";") {
                return this.quiz.substr(index + 1);
              }
              return this.quiz.substr(index + 2);
            },
            enumerable: false,
            configurable: true
          });
          Quiz2.prototype.getOperation = function(used) {
            var usedName = (0, defines_1.parsePieceName)(used);
            var current = this.current;
            if (usedName === current) {
              return Operation.Direct;
            }
            var hold = this.hold;
            if (usedName === hold) {
              return Operation.Swap;
            }
            if (hold === "") {
              if (usedName === this.next) {
                return Operation.Stock;
              }
            } else {
              if (current === "" && usedName === this.next) {
                return Operation.Direct;
              }
            }
            throw new Error("Unexpected hold piece in quiz: ".concat(this.quiz));
          };
          Object.defineProperty(Quiz2.prototype, "leastInActiveBag", {
            get: function() {
              var separateIndex = this.quiz.indexOf(";");
              var quiz = 0 <= separateIndex ? this.quiz.substring(0, separateIndex) : this.quiz;
              var index = quiz.indexOf(")");
              if (quiz[index + 1] === ";") {
                return quiz.substr(index + 1);
              }
              return quiz.substr(index + 2);
            },
            enumerable: false,
            configurable: true
          });
          Quiz2.verify = function(quiz) {
            var replaced = this.trim(quiz);
            if (replaced.length === 0 || quiz === "#Q=[]()" || !quiz.startsWith("#Q=")) {
              return quiz;
            }
            if (!replaced.match(/^#Q=\[[TIOSZJL]?]\([TIOSZJL]?\)[TIOSZJL]*;?.*$/i)) {
              throw new Error("Current piece doesn't exist, however next pieces exist: ".concat(quiz));
            }
            return replaced;
          };
          Quiz2.prototype.direct = function() {
            if (this.current === "") {
              var least = this.leastAfterNext2;
              return new Quiz2("#Q=[".concat(this.hold, "](").concat(least[0], ")").concat(least.substr(1)));
            }
            return new Quiz2("#Q=[".concat(this.hold, "](").concat(this.next, ")").concat(this.leastAfterNext2));
          };
          Quiz2.prototype.swap = function() {
            if (this.hold === "") {
              throw new Error("Cannot find hold piece: ".concat(this.quiz));
            }
            var next = this.next;
            return new Quiz2("#Q=[".concat(this.current, "](").concat(next, ")").concat(this.leastAfterNext2));
          };
          Quiz2.prototype.stock = function() {
            if (this.hold !== "" || this.next === "") {
              throw new Error("Cannot stock: ".concat(this.quiz));
            }
            var least = this.leastAfterNext2;
            var head = least[0] !== void 0 ? least[0] : "";
            if (1 < least.length) {
              return new Quiz2("#Q=[".concat(this.current, "](").concat(head, ")").concat(least.substr(1)));
            }
            return new Quiz2("#Q=[".concat(this.current, "](").concat(head, ")"));
          };
          Quiz2.prototype.operate = function(operation) {
            switch (operation) {
              case Operation.Direct:
                return this.direct();
              case Operation.Swap:
                return this.swap();
              case Operation.Stock:
                return this.stock();
            }
            throw new Error("Unexpected operation");
          };
          Quiz2.prototype.format = function() {
            var quiz = this.nextIfEnd();
            if (quiz.quiz === "#Q=[]()") {
              return new Quiz2("");
            }
            var current = quiz.current;
            var hold = quiz.hold;
            if (current === "" && hold !== "") {
              return new Quiz2("#Q=[](".concat(hold, ")").concat(quiz.least));
            }
            if (current === "") {
              var least = quiz.least;
              var head = least[0];
              if (head === void 0) {
                return new Quiz2("");
              }
              if (head === ";") {
                return new Quiz2(least.substr(1));
              }
              return new Quiz2("#Q=[](".concat(head, ")").concat(least.substr(1)));
            }
            return quiz;
          };
          Quiz2.prototype.getHoldPiece = function() {
            if (!this.canOperate()) {
              return defines_1.Piece.Empty;
            }
            var name = this.hold;
            if (name === void 0 || name === "" || name === ";") {
              return defines_1.Piece.Empty;
            }
            return (0, defines_1.parsePiece)(name);
          };
          Quiz2.prototype.getNextPieces = function(max) {
            if (!this.canOperate()) {
              return max !== void 0 ? Array.from({ length: max }).map(function() {
                return defines_1.Piece.Empty;
              }) : [];
            }
            var names = (this.current + this.next + this.leastInActiveBag).substr(0, max);
            if (max !== void 0 && names.length < max) {
              names += " ".repeat(max - names.length);
            }
            return names.split("").map(function(name) {
              if (name === void 0 || name === " " || name === ";") {
                return defines_1.Piece.Empty;
              }
              return (0, defines_1.parsePiece)(name);
            });
          };
          Quiz2.prototype.toString = function() {
            return this.quiz;
          };
          Quiz2.prototype.canOperate = function() {
            var quiz = this.quiz;
            if (quiz.startsWith("#Q=[]();")) {
              quiz = this.quiz.substr(8);
            }
            return quiz.startsWith("#Q=") && quiz !== "#Q=[]()";
          };
          Quiz2.prototype.nextIfEnd = function() {
            if (this.quiz.startsWith("#Q=[]();")) {
              return new Quiz2(this.quiz.substr(8));
            }
            return this;
          };
          return Quiz2;
        })()
      );
      exports.Quiz = Quiz;
    }
  });

  // node_modules/tetris-fumen/lib/field.js
  var require_field = __commonJS({
    "node_modules/tetris-fumen/lib/field.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Mino = exports.Field = void 0;
      var inner_field_1 = require_inner_field();
      var defines_1 = require_defines();
      function toMino(operationOrMino) {
        return operationOrMino instanceof Mino ? operationOrMino.copy() : Mino.from(operationOrMino);
      }
      var Field4 = (
        /** @class */
        (function() {
          function Field5(field) {
            this.field = field;
          }
          Field5.create = function(field, garbage) {
            return new Field5(new inner_field_1.InnerField({
              field: field !== void 0 ? inner_field_1.PlayField.load(field) : void 0,
              garbage: garbage !== void 0 ? inner_field_1.PlayField.loadMinify(garbage) : void 0
            }));
          };
          Field5.prototype.canFill = function(operation) {
            if (operation === void 0) {
              return true;
            }
            var mino = toMino(operation);
            return this.field.canFillAll(mino.positions());
          };
          Field5.prototype.canLock = function(operation) {
            if (operation === void 0) {
              return true;
            }
            if (!this.canFill(operation)) {
              return false;
            }
            return !this.canFill(__assign(__assign({}, operation), { y: operation.y - 1 }));
          };
          Field5.prototype.fill = function(operation, force) {
            if (force === void 0) {
              force = false;
            }
            if (operation === void 0) {
              return void 0;
            }
            var mino = toMino(operation);
            if (!force && !this.canFill(mino)) {
              throw Error("Cannot fill piece on field");
            }
            this.field.fillAll(mino.positions(), (0, defines_1.parsePiece)(mino.type));
            return mino;
          };
          Field5.prototype.put = function(operation) {
            if (operation === void 0) {
              return void 0;
            }
            var mino = toMino(operation);
            for (; 0 <= mino.y; mino.y -= 1) {
              if (!this.canLock(mino)) {
                continue;
              }
              this.fill(mino);
              return mino;
            }
            throw Error("Cannot put piece on field");
          };
          Field5.prototype.clearLine = function() {
            this.field.clearLine();
          };
          Field5.prototype.at = function(x, y) {
            return (0, defines_1.parsePieceName)(this.field.getNumberAt(x, y));
          };
          Field5.prototype.set = function(x, y, type) {
            this.field.setNumberAt(x, y, (0, defines_1.parsePiece)(type));
          };
          Field5.prototype.copy = function() {
            return new Field5(this.field.copy());
          };
          Field5.prototype.str = function(option) {
            if (option === void 0) {
              option = {};
            }
            var skip = option.reduced !== void 0 ? option.reduced : true;
            var separator = option.separator !== void 0 ? option.separator : "\n";
            var minY = option.garbage === void 0 || option.garbage ? -1 : 0;
            var output = "";
            for (var y = 22; minY <= y; y -= 1) {
              var line = "";
              for (var x = 0; x < 10; x += 1) {
                line += this.at(x, y);
              }
              if (skip && line === "__________") {
                continue;
              }
              skip = false;
              output += line;
              if (y !== minY) {
                output += separator;
              }
            }
            return output;
          };
          return Field5;
        })()
      );
      exports.Field = Field4;
      var Mino = (
        /** @class */
        (function() {
          function Mino2(type, rotation, x, y) {
            this.type = type;
            this.rotation = rotation;
            this.x = x;
            this.y = y;
          }
          Mino2.from = function(operation) {
            return new Mino2(operation.type, operation.rotation, operation.x, operation.y);
          };
          Mino2.prototype.positions = function() {
            return (0, inner_field_1.getBlockXYs)((0, defines_1.parsePiece)(this.type), (0, defines_1.parseRotation)(this.rotation), this.x, this.y).sort(function(a, b) {
              if (a.y === b.y) {
                return a.x - b.x;
              }
              return a.y - b.y;
            });
          };
          Mino2.prototype.operation = function() {
            return {
              type: this.type,
              rotation: this.rotation,
              x: this.x,
              y: this.y
            };
          };
          Mino2.prototype.isValid = function() {
            try {
              (0, defines_1.parsePiece)(this.type);
              (0, defines_1.parseRotation)(this.rotation);
            } catch (e) {
              return false;
            }
            return this.positions().every(function(_a2) {
              var x = _a2.x, y = _a2.y;
              return 0 <= x && x < 10 && 0 <= y && y < 23;
            });
          };
          Mino2.prototype.copy = function() {
            return new Mino2(this.type, this.rotation, this.x, this.y);
          };
          return Mino2;
        })()
      );
      exports.Mino = Mino;
    }
  });

  // node_modules/tetris-fumen/lib/decoder.js
  var require_decoder = __commonJS({
    "node_modules/tetris-fumen/lib/decoder.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decode = exports.extract = exports.Page = void 0;
      var inner_field_1 = require_inner_field();
      var buffer_1 = require_buffer();
      var defines_1 = require_defines();
      var action_1 = require_action();
      var comments_1 = require_comments();
      var quiz_1 = require_quiz();
      var field_1 = require_field();
      var Page = (
        /** @class */
        (function() {
          function Page2(index, field, operation, comment, flags, refs) {
            this.index = index;
            this.operation = operation;
            this.comment = comment;
            this.flags = flags;
            this.refs = refs;
            this._field = field.copy();
          }
          Object.defineProperty(Page2.prototype, "field", {
            get: function() {
              return new field_1.Field(this._field.copy());
            },
            set: function(field) {
              this._field = (0, inner_field_1.createInnerField)(field);
            },
            enumerable: false,
            configurable: true
          });
          Page2.prototype.mino = function() {
            return field_1.Mino.from(this.operation);
          };
          return Page2;
        })()
      );
      exports.Page = Page;
      var FieldConstants = {
        GarbageLine: 1,
        Width: 10
      };
      function extract(str) {
        var format = function(version, data2) {
          var trim = data2.trim().replace(/[?\s]+/g, "");
          return { version, data: trim };
        };
        var data = str;
        var paramIndex = data.indexOf("&");
        if (0 <= paramIndex) {
          data = data.substring(0, paramIndex);
        }
        {
          var match = str.match(/[vmd]115@/);
          if (match !== void 0 && match !== null && match.index !== void 0) {
            var sub = data.substr(match.index + 5);
            return format("115", sub);
          }
        }
        {
          var match = str.match(/[vmd]110@/);
          if (match !== void 0 && match !== null && match.index !== void 0) {
            var sub = data.substr(match.index + 5);
            return format("110", sub);
          }
        }
        throw new Error("Unsupported fumen version");
      }
      exports.extract = extract;
      function decode(fumen) {
        var _a2 = extract(fumen), version = _a2.version, data = _a2.data;
        switch (version) {
          case "115":
            return innerDecode(data, 23);
          case "110":
            return innerDecode(data, 21);
        }
        throw new Error("Unsupported fumen version");
      }
      exports.decode = decode;
      function innerDecode(data, fieldTop) {
        var fieldMaxHeight = fieldTop + FieldConstants.GarbageLine;
        var numFieldBlocks = fieldMaxHeight * FieldConstants.Width;
        var buffer = new buffer_1.Buffer(data);
        var updateField = function(prev) {
          var result = {
            changed: true,
            field: prev
          };
          var index = 0;
          while (index < numFieldBlocks) {
            var diffBlock = buffer.poll(2);
            var diff = Math.floor(diffBlock / numFieldBlocks);
            var numOfBlocks = diffBlock % numFieldBlocks;
            if (diff === 8 && numOfBlocks === numFieldBlocks - 1) {
              result.changed = false;
            }
            for (var block = 0; block < numOfBlocks + 1; block += 1) {
              var x = index % FieldConstants.Width;
              var y = fieldTop - Math.floor(index / FieldConstants.Width) - 1;
              result.field.addNumber(x, y, diff - 8);
              index += 1;
            }
          }
          return result;
        };
        var pageIndex = 0;
        var prevField = (0, inner_field_1.createNewInnerField)();
        var store = {
          repeatCount: -1,
          refIndex: {
            comment: 0,
            field: 0
          },
          quiz: void 0,
          lastCommentText: ""
        };
        var pages = [];
        var actionDecoder = (0, action_1.createActionDecoder)(FieldConstants.Width, fieldTop, FieldConstants.GarbageLine);
        var commentDecoder = (0, comments_1.createCommentParser)();
        while (!buffer.isEmpty()) {
          var currentFieldObj = void 0;
          if (0 < store.repeatCount) {
            currentFieldObj = {
              field: prevField,
              changed: false
            };
            store.repeatCount -= 1;
          } else {
            currentFieldObj = updateField(prevField.copy());
            if (!currentFieldObj.changed) {
              store.repeatCount = buffer.poll(1);
            }
          }
          var actionValue = buffer.poll(3);
          var action = actionDecoder.decode(actionValue);
          var comment = void 0;
          if (action.comment) {
            var commentValues = [];
            var commentLength = buffer.poll(2);
            for (var commentCounter = 0; commentCounter < Math.floor((commentLength + 3) / 4); commentCounter += 1) {
              var commentValue = buffer.poll(5);
              commentValues.push(commentValue);
            }
            var flatten = "";
            for (var _i = 0, commentValues_1 = commentValues; _i < commentValues_1.length; _i++) {
              var value = commentValues_1[_i];
              flatten += commentDecoder.decode(value);
            }
            var commentText = unescape(flatten.slice(0, commentLength));
            store.lastCommentText = commentText;
            comment = { text: commentText };
            store.refIndex.comment = pageIndex;
            var text = comment.text;
            if (quiz_1.Quiz.isQuizComment(text)) {
              try {
                store.quiz = new quiz_1.Quiz(text);
              } catch (e) {
                store.quiz = void 0;
              }
            } else {
              store.quiz = void 0;
            }
          } else if (pageIndex === 0) {
            comment = { text: "" };
          } else {
            comment = {
              text: store.quiz !== void 0 ? store.quiz.format().toString() : void 0,
              ref: store.refIndex.comment
            };
          }
          var quiz = false;
          if (store.quiz !== void 0) {
            quiz = true;
            if (store.quiz.canOperate() && action.lock) {
              if ((0, defines_1.isMinoPiece)(action.piece.type)) {
                try {
                  var nextQuiz = store.quiz.nextIfEnd();
                  var operation = nextQuiz.getOperation(action.piece.type);
                  store.quiz = nextQuiz.operate(operation);
                } catch (e) {
                  store.quiz = store.quiz.format();
                }
              } else {
                store.quiz = store.quiz.format();
              }
            }
          }
          var currentPiece = void 0;
          if (action.piece.type !== defines_1.Piece.Empty) {
            currentPiece = action.piece;
          }
          var field = void 0;
          if (currentFieldObj.changed || pageIndex === 0) {
            field = {};
            store.refIndex.field = pageIndex;
          } else {
            field = { ref: store.refIndex.field };
          }
          pages.push(new Page(pageIndex, currentFieldObj.field, currentPiece !== void 0 ? field_1.Mino.from({
            type: (0, defines_1.parsePieceName)(currentPiece.type),
            rotation: (0, defines_1.parseRotationName)(currentPiece.rotation),
            x: currentPiece.x,
            y: currentPiece.y
          }) : void 0, comment.text !== void 0 ? comment.text : store.lastCommentText, {
            quiz,
            lock: action.lock,
            mirror: action.mirror,
            colorize: action.colorize,
            rise: action.rise
          }, {
            field: field.ref,
            comment: comment.ref
          }));
          pageIndex += 1;
          if (action.lock) {
            if ((0, defines_1.isMinoPiece)(action.piece.type)) {
              currentFieldObj.field.fill(action.piece);
            }
            currentFieldObj.field.clearLine();
            if (action.rise) {
              currentFieldObj.field.riseGarbage();
            }
            if (action.mirror) {
              currentFieldObj.field.mirror();
            }
          }
          prevField = currentFieldObj.field;
        }
        return pages;
      }
    }
  });

  // node_modules/tetris-fumen/lib/encoder.js
  var require_encoder = __commonJS({
    "node_modules/tetris-fumen/lib/encoder.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.encode = void 0;
      var inner_field_1 = require_inner_field();
      var buffer_1 = require_buffer();
      var defines_1 = require_defines();
      var action_1 = require_action();
      var comments_1 = require_comments();
      var quiz_1 = require_quiz();
      var FieldConstants = {
        GarbageLine: 1,
        Width: 10
      };
      function encode(pages) {
        var updateField = function(prev, current) {
          var _a2 = encodeField(prev, current), changed = _a2.changed, values = _a2.values;
          if (changed) {
            buffer.merge(values);
            lastRepeatIndex = -1;
          } else if (lastRepeatIndex < 0 || buffer.get(lastRepeatIndex) === buffer_1.Buffer.tableLength - 1) {
            buffer.merge(values);
            buffer.push(0);
            lastRepeatIndex = buffer.length - 1;
          } else if (buffer.get(lastRepeatIndex) < buffer_1.Buffer.tableLength - 1) {
            var currentRepeatValue = buffer.get(lastRepeatIndex);
            buffer.set(lastRepeatIndex, currentRepeatValue + 1);
          }
        };
        var lastRepeatIndex = -1;
        var buffer = new buffer_1.Buffer();
        var prevField = (0, inner_field_1.createNewInnerField)();
        var actionEncoder = (0, action_1.createActionEncoder)(FieldConstants.Width, 23, FieldConstants.GarbageLine);
        var commentParser = (0, comments_1.createCommentParser)();
        var prevComment = "";
        var prevQuiz = void 0;
        var innerEncode = function(index2) {
          var currentPage = pages[index2];
          currentPage.flags = currentPage.flags ? currentPage.flags : {};
          var field = currentPage.field;
          var currentField = field !== void 0 ? (0, inner_field_1.createInnerField)(field) : prevField.copy();
          updateField(prevField, currentField);
          var currentComment = currentPage.comment !== void 0 ? index2 !== 0 || currentPage.comment !== "" ? currentPage.comment : void 0 : void 0;
          var piece = currentPage.operation !== void 0 ? {
            type: (0, defines_1.parsePiece)(currentPage.operation.type),
            rotation: (0, defines_1.parseRotation)(currentPage.operation.rotation),
            x: currentPage.operation.x,
            y: currentPage.operation.y
          } : {
            type: defines_1.Piece.Empty,
            rotation: defines_1.Rotation.Reverse,
            x: 0,
            y: 22
          };
          var nextComment;
          if (currentComment !== void 0) {
            if (currentComment.startsWith("#Q=")) {
              if (prevQuiz !== void 0 && prevQuiz.format().toString() === currentComment) {
                nextComment = void 0;
              } else {
                nextComment = currentComment;
                prevComment = nextComment;
                prevQuiz = new quiz_1.Quiz(currentComment);
              }
            } else {
              if (prevQuiz !== void 0 && prevQuiz.format().toString() === currentComment) {
                nextComment = void 0;
                prevComment = currentComment;
                prevQuiz = void 0;
              } else {
                nextComment = prevComment !== currentComment ? currentComment : void 0;
                prevComment = prevComment !== currentComment ? nextComment : prevComment;
                prevQuiz = void 0;
              }
            }
          } else {
            nextComment = void 0;
            prevQuiz = void 0;
          }
          if (prevQuiz !== void 0 && prevQuiz.canOperate() && currentPage.flags.lock) {
            if ((0, defines_1.isMinoPiece)(piece.type)) {
              try {
                var nextQuiz = prevQuiz.nextIfEnd();
                var operation = nextQuiz.getOperation(piece.type);
                prevQuiz = nextQuiz.operate(operation);
              } catch (e) {
                prevQuiz = prevQuiz.format();
              }
            } else {
              prevQuiz = prevQuiz.format();
            }
          }
          var currentFlags = __assign({ lock: true, colorize: index2 === 0 }, currentPage.flags);
          var action = {
            piece,
            rise: !!currentFlags.rise,
            mirror: !!currentFlags.mirror,
            colorize: !!currentFlags.colorize,
            lock: !!currentFlags.lock,
            comment: nextComment !== void 0
          };
          var actionNumber = actionEncoder.encode(action);
          buffer.push(actionNumber, 3);
          if (nextComment !== void 0) {
            var comment = escape(currentPage.comment);
            var commentLength = Math.min(comment.length, 4095);
            buffer.push(commentLength, 2);
            for (var index_1 = 0; index_1 < commentLength; index_1 += 4) {
              var value = 0;
              for (var count = 0; count < 4; count += 1) {
                var newIndex = index_1 + count;
                if (commentLength <= newIndex) {
                  break;
                }
                var ch = comment.charAt(newIndex);
                value += commentParser.encode(ch, count);
              }
              buffer.push(value, 5);
            }
          } else if (currentPage.comment === void 0) {
            prevComment = void 0;
          }
          if (action.lock) {
            if ((0, defines_1.isMinoPiece)(action.piece.type)) {
              currentField.fill(action.piece);
            }
            currentField.clearLine();
            if (action.rise) {
              currentField.riseGarbage();
            }
            if (action.mirror) {
              currentField.mirror();
            }
          }
          prevField = currentField;
        };
        for (var index = 0; index < pages.length; index += 1) {
          innerEncode(index);
        }
        var data = buffer.toString();
        if (data.length < 41) {
          return data;
        }
        var head = [data.substr(0, 42)];
        var tails = data.substring(42);
        var split = tails.match(/[\S]{1,47}/g) || [];
        return head.concat(split).join("?");
      }
      exports.encode = encode;
      function encodeField(prev, current) {
        var FIELD_TOP = 23;
        var FIELD_MAX_HEIGHT = FIELD_TOP + 1;
        var FIELD_BLOCKS = FIELD_MAX_HEIGHT * FieldConstants.Width;
        var buffer = new buffer_1.Buffer();
        var getDiff = function(xIndex2, yIndex2) {
          var y = FIELD_TOP - yIndex2 - 1;
          return current.getNumberAt(xIndex2, y) - prev.getNumberAt(xIndex2, y) + 8;
        };
        var recordBlockCounts = function(diff2, counter2) {
          var value = diff2 * FIELD_BLOCKS + counter2;
          buffer.push(value, 2);
        };
        var changed = true;
        var prev_diff = getDiff(0, 0);
        var counter = -1;
        for (var yIndex = 0; yIndex < FIELD_MAX_HEIGHT; yIndex += 1) {
          for (var xIndex = 0; xIndex < FieldConstants.Width; xIndex += 1) {
            var diff = getDiff(xIndex, yIndex);
            if (diff !== prev_diff) {
              recordBlockCounts(prev_diff, counter);
              counter = 0;
              prev_diff = diff;
            } else {
              counter += 1;
            }
          }
        }
        recordBlockCounts(prev_diff, counter);
        if (prev_diff === 8 && counter === FIELD_BLOCKS - 1) {
          changed = false;
        }
        return {
          changed,
          values: buffer
        };
      }
    }
  });

  // node_modules/tetris-fumen/index.js
  var require_tetris_fumen = __commonJS({
    "node_modules/tetris-fumen/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.encoder = exports.decoder = exports.Mino = exports.Field = void 0;
      var decoder_1 = require_decoder();
      var encoder_1 = require_encoder();
      var field_1 = require_field();
      Object.defineProperty(exports, "Field", { enumerable: true, get: function() {
        return field_1.Field;
      } });
      Object.defineProperty(exports, "Mino", { enumerable: true, get: function() {
        return field_1.Mino;
      } });
      exports.decoder = {
        decode: function(data) {
          return (0, decoder_1.decode)(data);
        }
      };
      exports.encoder = {
        encode: function(data) {
          return "v115@".concat((0, encoder_1.encode)(data));
        }
      };
    }
  });

  // src/pieceData.ts
  var offsets = [
    [],
    // T
    [
      [
        [0, 1],
        [-1, 0],
        [0, 0],
        [1, 0]
      ],
      //   []
      // []<>[]
      [
        [0, 1],
        [0, 0],
        [1, 0],
        [0, -1]
      ],
      // []
      // <>[]
      // []
      [
        [-1, 0],
        [0, 0],
        [1, 0],
        [0, -1]
      ],
      // []<>[]
      //   []
      [
        [0, 1],
        [-1, 0],
        [0, 0],
        [0, -1]
      ]
      //   []
      // []<>
      //   []
    ],
    // I
    [
      [
        [-1, 0],
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      // []<>[][]
      [
        [0, 1],
        [0, 0],
        [0, -1],
        [0, -2]
      ],
      // []
      // <>
      // []
      // []
      [
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0]
      ],
      // [][]<>[]
      [
        [0, 2],
        [0, 1],
        [0, 0],
        [0, -1]
      ]
      // []
      // []
      // <>
      // []
    ],
    // L
    [
      [
        [1, 1],
        [-1, 0],
        [0, 0],
        [1, 0]
      ],
      //   []
      // []<>[]
      [
        [0, 1],
        [0, 0],
        [0, -1],
        [1, -1]
      ],
      // []
      // <>
      // [][]
      [
        [-1, 0],
        [0, 0],
        [1, 0],
        [-1, -1]
      ],
      // []<>[]
      // []
      [
        [-1, 1],
        [0, 1],
        [0, 0],
        [0, -1]
      ]
      // [][]
      //   <>
      //   []
    ],
    // J
    [
      [
        [-1, 1],
        [-1, 0],
        [0, 0],
        [1, 0]
      ],
      // []
      // []<>[]
      [
        [0, 1],
        [1, 1],
        [0, 0],
        [0, -1]
      ],
      // [][]
      // <>
      // []
      [
        [-1, 0],
        [0, 0],
        [1, 0],
        [1, -1]
      ],
      // []<>[]
      //   []
      [
        [0, 1],
        [0, 0],
        [-1, -1],
        [0, -1]
      ]
      //   []
      //   <>
      // [][]
    ],
    // S
    [
      [
        [0, 1],
        [1, 1],
        [-1, 0],
        [0, 0]
      ],
      //   [][]
      // []<>
      [
        [0, 1],
        [0, 0],
        [1, 0],
        [1, -1]
      ],
      // []
      // <>[]
      //   []
      [
        [0, 0],
        [1, 0],
        [-1, -1],
        [0, -1]
      ],
      //   <>[]
      // [][]
      [
        [-1, 1],
        [-1, 0],
        [0, 0],
        [0, -1]
      ]
      // []
      // []<>
      //   []
    ],
    // Z
    [
      [
        [-1, 1],
        [0, 1],
        [0, 0],
        [1, 0]
      ],
      // [][]
      //   <>[]
      [
        [1, 1],
        [0, 0],
        [1, 0],
        [0, -1]
      ],
      //   []
      // <>[]
      // []
      [
        [-1, 0],
        [0, 0],
        [0, -1],
        [1, -1]
      ],
      // []<>
      //   [][]
      [
        [0, 1],
        [-1, 0],
        [0, 0],
        [-1, -1]
      ]
      //   []
      // []<>
      // []
    ],
    // O
    [
      [
        [0, 1],
        [1, 1],
        [0, 0],
        [1, 0]
      ],
      // [][]
      // <>[]
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1]
      ],
      // <>[]
      // [][]
      [
        [-1, 0],
        [0, 0],
        [-1, -1],
        [0, -1]
      ],
      // []<>
      // [][]
      [
        [-1, 1],
        [0, 1],
        [-1, 0],
        [0, 0]
      ]
      // [][]
      // []<>
    ]
  ];
  var kick_offset_2x3 = [
    // Spawn
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    // CW
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    // 180
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    // CCW
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ]
  ];
  var kick_offset_1x4 = [
    // Spawn
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 0],
      [2, 0]
    ],
    // CW
    [
      [-1, 0],
      [0, 0],
      [0, 0],
      [0, 1],
      [0, -2]
    ],
    // 180
    [
      [-1, 1],
      [1, 1],
      [-2, 1],
      [1, 0],
      [-2, 0]
    ],
    // CCW
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, -1],
      [0, 2]
    ]
  ];
  var kick_offset_2x2 = [
    // Spawn
    [[0, 0]],
    // CW
    [[0, -1]],
    // 180
    [[-1, -1]],
    // CCW
    [[-1, 0]]
  ];
  var kick_offset_180_2x3 = [
    // Spawn
    [
      [0, 0],
      [0, 1]
    ],
    // CW
    [
      [0, 0],
      [1, 0]
    ],
    // 180
    [
      [0, 0],
      [0, 0]
    ],
    // CCW
    [
      [0, 0],
      [0, 0]
    ]
  ];
  var kick_offset_180_1x4 = [
    // Spawn
    [
      [1, -1],
      [1, 0]
    ],
    // CW
    [
      [-1, -1],
      [0, -1]
    ],
    // 180
    [
      [0, 0],
      [0, 0]
    ],
    // CCW
    [
      [0, 0],
      [0, 0]
    ]
  ];
  var kick_offset_180_2x2 = [
    // Spawn
    [[1, 1]],
    // CW
    [[1, -1]],
    // 180
    [[0, 0]],
    // CCW
    [[0, 0]]
  ];
  function gen_kick_table(offsets2, offsets_180) {
    const table = new Array(4);
    for (let a = 0; a < 4; a++) {
      table[a] = new Array(4);
      table[a][a] = [[0, 0]];
      let b = spin_cw(a);
      table[a][b] = offsets2[a].map((e, i) => e.map((f, j) => f - offsets2[b][i][j]));
      b = spin_ccw(a);
      table[a][b] = offsets2[a].map((e, i) => e.map((f, j) => f - offsets2[b][i][j]));
      b = spin_180(a);
      table[a][b] = offsets_180[a].map((e, i) => e.map((f, j) => f - offsets_180[b][i][j]));
    }
    return table;
  }
  var kicks_2x3 = gen_kick_table(kick_offset_2x3, kick_offset_180_2x3);
  var kicks_1x4 = gen_kick_table(kick_offset_1x4, kick_offset_180_1x4);
  var kicks_2x2 = gen_kick_table(kick_offset_2x2, kick_offset_180_2x2);
  var kick_map = [
    null,
    kicks_2x3,
    kicks_1x4,
    kicks_2x3,
    kicks_2x3,
    kicks_2x3,
    kicks_2x3,
    kicks_2x2
  ];
  var colour_table = [
    "#2e3440",
    "#b48ead",
    "#88C0D0",
    "#d08770",
    "#5e81ac",
    "#a3be8c",
    "#bf616a",
    "#ebcb8b",
    "#868686"
  ];
  var PieceEnum = /* @__PURE__ */ ((PieceEnum3) => {
    PieceEnum3[PieceEnum3["_"] = 0] = "_";
    PieceEnum3[PieceEnum3["T"] = 1] = "T";
    PieceEnum3[PieceEnum3["I"] = 2] = "I";
    PieceEnum3[PieceEnum3["L"] = 3] = "L";
    PieceEnum3[PieceEnum3["J"] = 4] = "J";
    PieceEnum3[PieceEnum3["S"] = 5] = "S";
    PieceEnum3[PieceEnum3["Z"] = 6] = "Z";
    PieceEnum3[PieceEnum3["O"] = 7] = "O";
    PieceEnum3[PieceEnum3["X"] = 8] = "X";
    return PieceEnum3;
  })(PieceEnum || {});
  var Rotation = /* @__PURE__ */ ((Rotation3) => {
    Rotation3[Rotation3["spawn"] = 0] = "spawn";
    Rotation3[Rotation3["right"] = 1] = "right";
    Rotation3[Rotation3["reverse"] = 2] = "reverse";
    Rotation3[Rotation3["left"] = 3] = "left";
    return Rotation3;
  })(Rotation || {});
  function get_colour(piece) {
    return colour_table[piece];
  }
  function spin_cw(rotation) {
    return (rotation + 1) % 4;
  }
  function spin_180(rotation) {
    return (rotation + 2) % 4;
  }
  function spin_ccw(rotation) {
    return (rotation + 3) % 4;
  }
  function get_offsets(piece, rotation) {
    return offsets[piece][rotation];
  }
  function get_kicks(piece, init_rot, target_rot) {
    return kick_map[piece][init_rot][target_rot];
  }
  function get_piece_number(piece) {
    return PieceEnum[piece];
  }

  // src/TetrisBoardPiece.ts
  var TetrisBoardPiece = class _TetrisBoardPiece {
    constructor(x, y, type, rotation) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "type");
      __publicField(this, "rotation");
      this.x = x;
      this.y = y;
      this.type = type;
      this.rotation = rotation;
    }
    getMinos() {
      return get_offsets(this.type, this.rotation).map(([dx, dy]) => ({
        x: this.x + dx,
        y: this.y + dy
      }));
    }
    getColor() {
      return get_colour(this.type);
    }
    move(dx, dy) {
      this.x += dx;
      this.y += dy;
    }
    copy() {
      return new _TetrisBoardPiece(this.x, this.y, this.type, this.rotation);
    }
  };

  // src/TetrisQueue.ts
  var BAGSIZE = 7;
  var TetrisQueue = class {
    constructor(previewSize, random, fillBags = true) {
      // size in queue must mantain to have previews
      __publicField(this, "previewSize");
      __publicField(this, "queue");
      __publicField(this, "length");
      __publicField(this, "pos");
      __publicField(this, "fillBags");
      __publicField(this, "random");
      this.previewSize = previewSize;
      this.fillBags = fillBags;
      this.queue = Array(this.previewSize + BAGSIZE - 1);
      this.pos = 0;
      this.length = 0;
      this.random = random;
    }
    reset() {
      this.pos = 0;
      this.length = 0;
      if (this.fillBags) {
        for (let i = 0; i < this.previewSize; i += BAGSIZE) {
          this.addBag();
        }
      }
    }
    addBag() {
      const bag = Array.from({ length: BAGSIZE }, (_, i) => i + 1);
      for (let i = BAGSIZE - 1; i >= 0; i--) {
        const rand = this.random.randInt(0, i + 1);
        this.queue[this.pos + this.length + BAGSIZE - 1 - i] = bag[rand];
        bag[rand] = bag[i];
      }
      this.length += BAGSIZE;
    }
    poll() {
      if (this.length == 0) {
        return 0;
      }
      this.length--;
      const oldPos = this.pos;
      this.pos = (this.pos + 1) % this.queue.length;
      if (this.fillBags && this.length < this.previewSize) {
        this.addBag();
      }
      return this.queue[oldPos];
    }
    enqueue(piece) {
      this.pos = (this.pos - 1 + this.queue.length) % this.queue.length;
      this.length++;
      if (this.length == this.queue.length) {
        this.queue.splice(this.pos, 0, piece);
      } else {
        this.queue[this.pos] = piece;
      }
    }
    preview() {
      return Array.from(
        { length: Math.min(this.length, this.previewSize) },
        (_, i) => this.queue[(this.pos + i) % this.queue.length]
      );
    }
    // used to set the queue
    set(queue) {
      this.length = queue.length;
      this.pos = 0;
      for (let i = 0; i < Math.min(queue.length, this.queue.length); i++) {
        this.queue[i] = get_piece_number(queue[i]);
      }
    }
    setFillBags(value) {
      this.fillBags = value;
    }
  };

  // src/TetrisBoard.ts
  var import_tetris_fumen2 = __toESM(require_tetris_fumen(), 1);

  // src/fumenUtils.ts
  var import_tetris_fumen = __toESM(require_tetris_fumen(), 1);

  // src/constants.ts
  var BAG = "TILJSZO";
  var PCSIZE = 10;
  var BOARDHEIGHT = 20;

  // src/fumenUtils.ts
  function getFieldHeight(field) {
    return field.str({ reduced: true, garbage: false }).split("\n").length;
  }
  function decodeWrapper(fumen) {
    let pages;
    try {
      pages = import_tetris_fumen.decoder.decode(fumen);
    } catch (err) {
      throw new Error(`Fumen ${fumen} could not be decoded: ${err.stack}`);
    }
    return pages;
  }
  function fumenSplit(fumen) {
    const pages = decodeWrapper(fumen);
    const fumens = [];
    for (const page of pages) {
      fumens.push(import_tetris_fumen.encoder.encode([page]));
    }
    return fumens;
  }
  function fumenCountPieces(fumen, frequencyCounter) {
    const pages = decodeWrapper(fumen);
    const field = pages[0].field;
    const height = getFieldHeight(field);
    for (const piece of BAG) {
      frequencyCounter[piece.charCodeAt(0)] = 0;
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < PCSIZE; x++) {
        const mino = field.at(x, y);
        if (mino != "_" && mino != "X") {
          frequencyCounter[mino.charCodeAt(0)]++;
        }
      }
    }
    for (const piece of BAG) {
      frequencyCounter[piece.charCodeAt(0)] >>= 2;
    }
  }
  function fumenClearLines(fumen, lines) {
    const pages = decodeWrapper(fumen);
    for (const page of pages) {
      const rows = page.field.str({ garbage: false }).split("\n");
      const height = rows.length;
      for (const line of lines) {
        rows.splice(height - 1 - line, 1);
      }
      page.field = import_tetris_fumen.Field.create(rows.join(""));
    }
    return import_tetris_fumen.encoder.encode(pages);
  }

  // src/TetrisBoard.ts
  var TetrisBoard = class {
    constructor(width, height) {
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "board", new Array());
      this.width = width;
      this.height = height;
      this.reset();
    }
    /**
     * Check if given row is full
     */
    lineFull(row) {
      if (row < 0 || row >= this.height) {
        throw new RangeError(`Given row out of bounds of 0-${this.height}`);
      }
      return this.board[row].every((cell) => cell != 0 /* _ */);
    }
    /**
     * Clears a row, doesn't check if filled
     */
    lineclear(row) {
      if (row < 0 || row >= this.height) {
        throw new RangeError(`Given row out of bounds of 0-${this.height}`);
      }
      this.board[this.height - 1] = new Array(this.width).fill(0 /* _ */);
      for (let i = row; i < this.height - 1; i++) {
        this.board[i] = this.board[i + 1];
      }
    }
    at(row, col) {
      if (row < 0 || row >= this.height) {
        throw new RangeError(`Given row out of bounds of 0-${this.height}`);
      }
      if (col < 0 || col >= this.width) {
        throw new RangeError(`Given col out of bounds of 0-${this.width}`);
      }
      return this.board[row][col];
    }
    isFilled(row, col) {
      return this.at(row, col) !== 0;
    }
    // return lines that are cleared
    place(piece, clear = false) {
      const lineclears = [];
      for (const { x, y } of piece.getMinos()) {
        this.board[y][x] = piece.type;
        if (clear && this.lineFull(y)) {
          lineclears.push(y);
          this.lineclear(y);
        }
      }
      return lineclears;
    }
    clearPiece(piece) {
      for (const { x, y } of piece.getMinos()) this.board[y][x] = 0 /* _ */;
    }
    isEmpty() {
      return this.board.flat().reduce((sum, c) => sum + c, 0) == 0 /* _ */;
    }
    fromFumen(fumen) {
      const fumenCellToCell = (cell) => PieceEnum[cell];
      const rows = decodeWrapper(fumen)[0].field.str({ reduced: true, garbage: false }).split("\n");
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < this.width; j++) {
          this.board[i][j] = fumenCellToCell(rows[rows.length - 1 - i][j]);
        }
      }
    }
    toFumen() {
      const cellToFumenCell = (cell) => PieceEnum[cell];
      const field = this.board.map((row) => row.map(cellToFumenCell).join("")).toReversed().join("");
      return import_tetris_fumen2.encoder.encode([{ field: import_tetris_fumen2.Field.create(field) }]);
    }
    reset() {
      this.board = Array.from({ length: this.height }, () => new Array(this.width).fill(0 /* _ */));
    }
    toString() {
      return this.board.toReversed().map((row) => row.map((val) => PieceEnum[val]).join("")).join("\n");
    }
  };

  // src/random.ts
  function sfc32(a, b, c, d2) {
    return function() {
      a |= 0;
      b |= 0;
      c |= 0;
      d2 |= 0;
      const t = (a + b | 0) + d2 | 0;
      d2 = d2 + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = c << 21 | c >>> 11;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
  }
  var seedGenerator = () => Math.random() * 2 ** 32 >>> 0;
  var PRNG = class {
    constructor() {
      __publicField(this, "sfc32Rand");
      __publicField(this, "random", () => {
        return this.sfc32Rand();
      });
      __publicField(this, "randInt", (start, end) => {
        return Math.floor(this.sfc32Rand() * (end - start)) + start;
      });
      this.sfc32Rand = sfc32(...this.genSeed());
    }
    genSeed() {
      return [seedGenerator(), seedGenerator(), seedGenerator(), seedGenerator()];
    }
    seed(seed) {
      this.sfc32Rand = sfc32(...seed);
    }
    reseed() {
      const seed = this.genSeed();
      this.seed(seed);
      return seed;
    }
  };

  // src/pieces/defines.ts
  var PIECE_ORDER = new Int8Array(128).fill(255);
  PIECE_ORDER["T".charCodeAt(0)] = 0;
  PIECE_ORDER["I".charCodeAt(0)] = 1;
  PIECE_ORDER["L".charCodeAt(0)] = 2;
  PIECE_ORDER["J".charCodeAt(0)] = 3;
  PIECE_ORDER["S".charCodeAt(0)] = 4;
  PIECE_ORDER["Z".charCodeAt(0)] = 5;
  PIECE_ORDER["O".charCodeAt(0)] = 6;
  function tetrisCompare(queue1, queue2) {
    const length = Math.min(queue1.length, queue2.length);
    for (let i = 0; i < length; i++) {
      const value = PIECE_ORDER[queue1.charCodeAt(i)] - PIECE_ORDER[queue2.charCodeAt(i)];
      if (value != 0) return value;
    }
    return 0;
  }

  // src/pieces/parser.ts
  var GEN_SPEC = [
    ["GEN_PIECES", "[TILJSZO*]|\\[\\^?(?:[TILJSZO]|\\[\\^?[TILJSZO]+\\])+\\]"],
    ["PERMUTE", "!|p\\d+"],
    ["WS", "\\s+"],
    ["MISMATCH", "."]
  ];
  var FILTER_SPEC = [
    ["RANGE_OP", "\\d+(?:-\\d+)?:"],
    ["PIECES", "(?:[TILJSZO*]|\\[[TILJSZO*]+\\])+"],
    ["COMP_OP", "=|<=|>=|!=|=|<|>"],
    ["NUMBER", "\\d+"],
    ["REGEX", "/[^/]+/"],
    ["OR", "\\|\\|"],
    ["AND", "&&"],
    ["NOT", "!"],
    ["LPAREN", "\\("],
    ["RPAREN", "\\)"],
    ["WS", "\\s+"],
    ["MISMATCH", "."]
  ];
  function compileLexerRegex(spec) {
    const fullPattern = spec.map(([name, pattern]) => `(?<${name}>${pattern})`).join("|");
    return new RegExp(fullPattern, "g");
  }
  var GEN_REGEX = compileLexerRegex(GEN_SPEC);
  var FILTER_REGEX = compileLexerRegex(FILTER_SPEC);
  var Token = class {
    constructor(kind, value) {
      __publicField(this, "kind", kind);
      __publicField(this, "value", value);
    }
    toString() {
      return `(${this.kind} ${this.value})`;
    }
  };
  var LBRACE_TOKEN = new Token("LBRACE", "{");
  var RBRACE_TOKEN = new Token("RBRACE", "}");
  function findEndFilterContext(text, start) {
    let i = start + 1;
    let inRegex = false;
    while (i < text.length) {
      const c = text[i];
      if (c === "/") inRegex = !inRegex;
      else if (c === "}" && !inRegex) return i;
      i++;
    }
    throw new Error("Unterminated filter {...}");
  }
  function tokenize(text) {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (c == "{") {
        const end2 = findEndFilterContext(text, i);
        tokens.push(LBRACE_TOKEN);
        const insideFilter = text.slice(i + 1, end2);
        for (const m2 of insideFilter.matchAll(FILTER_REGEX)) {
          const groups = m2.groups;
          if (!groups) continue;
          const kind = Object.keys(groups).find((key) => groups[key] !== void 0);
          let value = groups[kind];
          if (kind === "WS") continue;
          if (kind === "REGEX") {
            value = value.slice(1, -1);
          }
          if (kind === "MISMATCH") {
            throw new Error(`Unexpected character '${value}' at position ${m2.index}`);
          }
          tokens.push(new Token(kind, value));
        }
        tokens.push(RBRACE_TOKEN);
        i = end2 + 1;
        continue;
      } else if (c == "}") {
        throw new Error("Found closing '}' without open '{'");
      }
      let end = i + 1;
      while (end < text.length && text[end] !== "{") end++;
      const genBlock = text.slice(i, end);
      for (const m2 of genBlock.matchAll(GEN_REGEX)) {
        const groups = m2.groups;
        if (!groups) continue;
        const kind = Object.keys(groups).find((key) => groups[key] !== void 0);
        const value = groups[kind];
        if (kind === "WS") continue;
        if (kind === "MISMATCH") {
          throw new Error(`Unexpected character '${value}' at position ${m2.index}`);
        }
        tokens.push(new Token(kind, value));
      }
      i = end;
    }
    return tokens;
  }
  var PIECES_REGEX = /([TILJSZO*]|\[[TILJSZO*]+\])/g;
  var GENERATOR_REGEX = /([TILJSZO]|\[\^?[TILJSZO]+\])/g;
  var TETRIS_PIECES = new Set("TILJSZO");
  var TETRIS_ORDERED_PIECES = Array.from("TILJSZO");
  var Parser = class {
    constructor() {
      __publicField(this, "tokens");
      __publicField(this, "pos");
      this.tokens = [];
      this.pos = 0;
    }
    parse(expr) {
      this.tokens = tokenize(expr);
      this.pos = 0;
      const result = [];
      while (this.pos < this.tokens.length) {
        if (this.peek().kind === "LBRACE") {
          this.consume("LBRACE");
          result.push(this.parseFilter());
          this.consume("RBRACE");
        } else {
          result.push(this.parseGenerator());
        }
      }
      return result;
    }
    peek() {
      return this.pos < this.tokens.length ? this.tokens[this.pos] : new Token("MISMATCH", "");
    }
    consume(expected) {
      const token = this.peek();
      if (token.kind !== expected) throw Error(`Expected ${expected} but got ${token.kind}`);
      this.pos++;
      return token;
    }
    parseGeneratorPool(poolExpr) {
      if (poolExpr === "*") return TETRIS_ORDERED_PIECES;
      if (poolExpr.length == 1) return [poolExpr];
      let rawPieces = poolExpr.slice(1, -1);
      const outerComplement = rawPieces.startsWith("^");
      if (outerComplement) {
        rawPieces = rawPieces.slice(1);
      }
      const pool = [];
      let basePieces = [];
      for (const match of rawPieces.matchAll(GENERATOR_REGEX)) {
        let item = match[0];
        if (item.startsWith("[")) {
          item = item.slice(1, -1);
          let uniquePieces;
          if (item.startsWith("^")) {
            uniquePieces = TETRIS_PIECES.difference(new Set(item.slice(1)));
          } else {
            uniquePieces = new Set(item);
          }
          pool.push([...uniquePieces].sort(tetrisCompare).join(""));
        } else {
          basePieces.push(item);
        }
      }
      if (outerComplement) {
        basePieces = [...TETRIS_PIECES.difference(new Set(basePieces))];
      }
      basePieces.sort(tetrisCompare);
      if (basePieces.length > 0) pool.unshift(...basePieces);
      return pool;
    }
    parseFilterPieces(rawPieces, duplicates = false) {
      const pieces = [];
      let basePieces = /* @__PURE__ */ new Set();
      for (const match of rawPieces.matchAll(PIECES_REGEX)) {
        let item = match[0];
        if (item == "*") {
          if (duplicates) pieces.push(...TETRIS_ORDERED_PIECES);
          else basePieces = TETRIS_PIECES;
        } else if (item.startsWith("[")) {
          item = item.slice(1, -1);
          const itemSet = new Set(item);
          if (itemSet.has("*")) pieces.push("TILJSZO");
          else pieces.push([...itemSet].join(""));
        } else {
          if (duplicates) pieces.push(item);
          else basePieces.add(item);
        }
      }
      if (!duplicates) {
        pieces.push(...[...basePieces].sort(tetrisCompare));
      }
      return pieces;
    }
    parseGenerator() {
      if (this.peek().kind === "GEN_PIECES") {
        const poolExpr = this.consume("GEN_PIECES");
        const pool = this.parseGeneratorPool(poolExpr.value);
        let permute = 1;
        if (pool.length > 1 && this.peek().kind == "PERMUTE") {
          const permuteExpr = this.consume("PERMUTE");
          if (permuteExpr.value === "!") {
            permute = pool.length;
          } else {
            permute = Number(permuteExpr.value.slice(1));
            if (permute == 0) {
              throw new Error(`Permute cannot be 0 in ${poolExpr.value}p0`);
            }
            if (permute > pool.length) {
              throw new Error(
                `Given permute ${permute} larger than the pool ${poolExpr.value} -> ${pool}`
              );
            }
          }
        }
        return {
          type: 1 /* GeneratorLiteral */,
          pool,
          permute
        };
      } else {
        throw new Error(
          `Expected GEN_PIECES token for generator but got ${this.peek().kind} instead`
        );
      }
    }
    parseFilter() {
      return {
        type: 0 /* FilterBlock */,
        expr: this.parseOr()
      };
    }
    parseOr() {
      let left = this.parseAnd();
      while (this.peek().kind === "OR") {
        this.consume("OR");
        const right = this.parseAnd();
        left = {
          type: 2 /* BinaryOp */,
          left,
          op: "OR",
          right
        };
      }
      return left;
    }
    parseAnd() {
      let left = this.parseUnary();
      while (this.peek().kind === "AND") {
        this.consume("AND");
        const right = this.parseUnary();
        left = {
          type: 2 /* BinaryOp */,
          left,
          op: "AND",
          right
        };
      }
      return left;
    }
    parseUnary() {
      if (this.peek().kind === "NOT") {
        this.consume("NOT");
        const expr = this.parseUnary();
        return {
          type: 3 /* UnaryOp */,
          op: "NOT",
          expr
        };
      }
      if (this.peek().kind === "RANGE_OP") {
        const rangeExpr = this.consume("RANGE_OP");
        const expr = this.parseUnary();
        const endpoints = rangeExpr.value.slice(0, -1).split("-").map(Number);
        if (endpoints.length == 1) {
          endpoints.unshift(0);
        }
        return {
          type: 4 /* RangeLookup */,
          start: endpoints[0],
          end: endpoints[1],
          expr
        };
      }
      return this.parseAtom();
    }
    parseAtom() {
      const token = this.peek();
      switch (token.kind) {
        case "LPAREN": {
          this.consume("LPAREN");
          const expr = this.parseOr();
          this.consume("RPAREN");
          return expr;
        }
        case "REGEX": {
          const regexExpr = this.consume("REGEX");
          return {
            type: 7 /* RegexLiteral */,
            value: new RegExp(regexExpr.value)
          };
        }
        case "PIECES": {
          const pieces = this.consume("PIECES").value;
          const op = this.consume("COMP_OP").value;
          const nextToken = this.peek();
          switch (nextToken.kind) {
            case "PIECES": {
              if (op !== "<") {
                throw new Error("Comparison of pieces expression that isn't before operator of <");
              }
              const afterPieces = this.consume("PIECES").value;
              return {
                type: 6 /* BeforeLiteral */,
                beforePieces: this.parseFilterPieces(pieces, true),
                afterPieces: this.parseFilterPieces(afterPieces, true)
              };
            }
            case "NUMBER": {
              const count = Number(this.consume("NUMBER").value);
              return {
                type: 5 /* CountLiteral */,
                pieces: this.parseFilterPieces(pieces),
                op,
                count
              };
            }
            default:
              throw new Error(`Unexpected token after PIECES COMP_OP: ${token}`);
          }
        }
        default:
          throw new Error(`Unexpected token: ${token}`);
      }
    }
  };

  // src/pieces/evaluateFilter.ts
  var OPERATORS = {
    "=": (a, b) => a == b,
    "!=": (a, b) => a != b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b
  };
  function getCharIndices(queue) {
    const positions = {
      T: [],
      I: [],
      L: [],
      J: [],
      S: [],
      Z: [],
      O: []
    };
    for (const [index, char] of [...queue].entries()) {
      positions[char].push(index);
    }
    return positions;
  }
  function evaluateBefore(node, queue) {
    const posMap = getCharIndices(queue);
    const stack = [];
    stack.push({
      beforePieceCounts: new Uint16Array(7).fill(0),
      afterPieceCounts: new Uint16Array(7).fill(0),
      beforeIndex: 0,
      afterIndex: 0
    });
    while (stack.length > 0) {
      const stackNode = stack.pop();
      if (stackNode.beforeIndex == node.beforePieces.length) return true;
      const beforePiece = node.beforePieces[stackNode.beforeIndex];
      const afterPiece = node.afterPieces[stackNode.afterIndex];
      for (const bPiece of beforePiece) {
        const bIndices = posMap[bPiece];
        const bPieceIndex = PIECE_ORDER[bPiece.charCodeAt(0)];
        const bInstanceIdx = stackNode.beforePieceCounts[bPieceIndex];
        if (bIndices.length <= bInstanceIdx) continue;
        for (const aPiece of afterPiece) {
          const aIndices = posMap[aPiece];
          const aPieceIndex = PIECE_ORDER[aPiece.charCodeAt(0)];
          const aInstanceIdx = stackNode.afterPieceCounts[aPieceIndex];
          if (aIndices.length <= aInstanceIdx || bIndices[bInstanceIdx] < aIndices[aInstanceIdx]) {
            if (stackNode.afterIndex + 1 == node.afterPieces.length) {
              const newBeforePieceCounts = stackNode.beforePieceCounts.slice();
              newBeforePieceCounts[bPieceIndex]++;
              stack.push({
                beforePieceCounts: newBeforePieceCounts,
                afterPieceCounts: new Uint16Array(7).fill(0),
                beforeIndex: stackNode.beforeIndex + 1,
                afterIndex: 0
              });
              continue;
            }
            const newAfterPieceCounts = stackNode.afterPieceCounts.slice();
            newAfterPieceCounts[aPieceIndex]++;
            stack.push({
              beforePieceCounts: stackNode.beforePieceCounts,
              afterPieceCounts: newAfterPieceCounts,
              beforeIndex: stackNode.beforeIndex,
              afterIndex: stackNode.afterIndex + 1
            });
          }
        }
      }
    }
    return false;
  }
  function evaluateFilter(node, queue) {
    switch (node.type) {
      /**
       * Atomic
       */
      case 7 /* RegexLiteral */:
        return queue.match(node.value) !== null;
      case 5 /* CountLiteral */: {
        const comp = OPERATORS[node.op];
        for (const target of node.pieces) {
          let result = false;
          for (const piece of target) {
            let count = 0;
            for (const p of queue) if (p == piece) count++;
            if (comp(count, node.count)) {
              result = true;
              break;
            }
          }
          if (!result) return false;
        }
        return true;
      }
      case 6 /* BeforeLiteral */:
        return evaluateBefore(node, queue);
      /**
       * Operators
       */
      // restrict range of queue to apply expr
      case 4 /* RangeLookup */:
        return evaluateFilter(node.expr, queue.slice(node.start, node.end));
      case 3 /* UnaryOp */:
        return !evaluateFilter(node.expr, queue);
      case 2 /* BinaryOp */: {
        const left = evaluateFilter(node.left, queue);
        if (node.op === "AND" && !left) return false;
        if (node.op === "OR" && left) return true;
        return evaluateFilter(node.right, queue);
      }
      default:
        throw new Error(`Unknown AST node type or operation: ${node.type}`);
    }
  }

  // src/pieces/utils.ts
  var GeneratorFunction = Object.getPrototypeOf(function* () {
  }).constructor;
  var cache = {};
  var getLoopFunc = (length) => {
    return cache[length] ?? (cache[length] = mGetLoopFunc(length));
  };
  var mGetLoopFunc = (length) => {
    const indexes = Array.from({ length }, (_, i) => String(i));
    const start = indexes.map((index) => `for (const value${index} of arrays[${index}]) {`).join("\n");
    const middle = indexes.map((index) => `value${index}`).join("+");
    const end = "}\n".repeat(length);
    return new GeneratorFunction("arrays", `${start}
yield ${middle}
${end}`);
  };
  function* product(iterables) {
    const loopFunc = getLoopFunc(iterables.length);
    yield* loopFunc(iterables);
  }
  var factorials = Array.from({ length: 8 }, (_, i) => i);
  factorials[0] = 1;
  for (let i = 1; i < 8; i++) {
    factorials[i] *= factorials[i - 1];
  }
  function perm(n, k2) {
    if (k2 === void 0) k2 = n;
    if (n <= 7) return factorials[n] / factorials[n - k2];
    let result = n;
    for (let i = n - 1; i > k2; i--) {
      result *= i;
    }
    return result;
  }

  // src/pieces/evaluateGenerator.ts
  function* permutations(pool, r) {
    const n = pool.length;
    r = r === void 0 ? n : r;
    if (r > n) return;
    const cycles = Array(r).fill(0).map((_, index) => n - index);
    const indices = new Uint8Array(n).map((_, index) => index);
    const isValidPermutation = (limit) => {
      let usedMask = 0;
      let result = "";
      for (let k2 = 0; k2 < limit; k2++) {
        const originalIndex = indices[k2];
        const pieceType = pool[originalIndex];
        let prevIdx = originalIndex - 1;
        while (prevIdx >= 0 && pool[prevIdx] === pieceType) {
          const isPrevUsed = (usedMask & 1 << prevIdx) !== 0;
          if (!isPrevUsed) {
            return null;
          }
          prevIdx--;
        }
        usedMask |= 1 << originalIndex;
        result += pieceType;
      }
      return result;
    };
    yield pool.slice(0, r);
    while (true) {
      loop: {
        for (let i = r - 1; i >= 0; i--) {
          cycles[i] -= 1;
          if (cycles[i] === 0) {
            let index = indices[i];
            for (let j = n - 1; j >= i; j--) {
              const temp = index;
              index = indices[j];
              indices[j] = temp;
            }
            cycles[i] = n - i;
          } else {
            const j = n - cycles[i];
            const temp = indices[i];
            indices[i] = indices[j];
            indices[j] = temp;
            const result = isValidPermutation(r);
            if (result !== null) yield result;
            break loop;
          }
        }
        return;
      }
    }
  }
  var MinHeap = class {
    constructor() {
      __publicField(this, "data", []);
    }
    push(node) {
      this.data.push(node);
      this.up(this.data.length - 1);
    }
    pop() {
      if (this.data.length === 0) return void 0;
      const top = this.data[0];
      const bottom = this.data.pop();
      if (this.data.length > 0 && bottom !== void 0) {
        this.data[0] = bottom;
        this.down(0);
      }
      return top;
    }
    size() {
      return this.data.length;
    }
    up(i) {
      while (i > 0) {
        const p = i - 1 >> 1;
        if (tetrisCompare(this.data[i].value, this.data[p].value) > 0) break;
        this.swap(i, p);
        i = p;
      }
    }
    down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        const left = (i << 1) + 1;
        const right = left + 1;
        let best = left;
        if (right < len && this.data[right].value < this.data[left].value) {
          best = right;
        }
        if (this.data[i].value <= this.data[best].value) break;
        this.swap(i, best);
        i = best;
      }
    }
    swap(i, j) {
      const temp = this.data[i];
      this.data[i] = this.data[j];
      this.data[j] = temp;
    }
  };
  function mergeSortedUniquePermutations(generators) {
    const heap = new MinHeap();
    const result = [];
    for (let i = 0; i < generators.length; i++) {
      const element = generators[i].next();
      if (!element.done) {
        heap.push({
          value: element.value,
          generatorIndex: i
        });
      }
    }
    while (heap.size() > 0) {
      const minNode = heap.pop();
      if (result.length === 0 || result[result.length - 1] !== minNode.value) {
        result.push(minNode.value);
      }
      const parentGenerator = generators[minNode.generatorIndex];
      const element = parentGenerator.next();
      if (!element.done) {
        heap.push({
          value: element.value,
          generatorIndex: minNode.generatorIndex
        });
      }
    }
    return result;
  }
  function evaluateGenerator(node) {
    const pools = product(node.pool);
    const rawPermutations = [];
    for (let pool of pools) {
      pool = [...pool].sort(tetrisCompare).join("");
      rawPermutations.push(permutations(pool, node.permute));
    }
    if (rawPermutations.length == 1) return [...rawPermutations[0]];
    return mergeSortedUniquePermutations(rawPermutations);
  }
  function sampleableGenerator(node) {
    const flat_pool = node.pool.flat();
    return flat_pool.length == new Set(flat_pool).size;
  }
  function randomEvaluateGenerator(node, random) {
    const pools = [...product(node.pool)];
    const pool = [...pools[random(0, pools.length)]];
    let sample = "";
    for (let i = 0; i < node.permute; i++) {
      const randIndex = random(0, pool.length - i);
      sample += pool[randIndex];
      pool[randIndex] = pool[pool.length - i - 1];
    }
    return sample;
  }
  function totalQueues(node) {
    return perm(node.pool.length, node.permute);
  }

  // src/pieces/sfinderPieces.ts
  var parser = new Parser();
  function evaluateBlocks(blocks) {
    let runningQueues = [];
    for (const block of blocks) {
      switch (block.type) {
        case 1 /* GeneratorLiteral */:
          runningQueues.push(evaluateGenerator(block));
          break;
        case 0 /* FilterBlock */: {
          const filterFunc = (queue) => evaluateFilter(block.expr, queue);
          runningQueues = [
            product(runningQueues).filter(filterFunc).toArray()
          ];
          break;
        }
      }
    }
    return runningQueues[0];
  }
  function parsePattern(pattern) {
    if (pattern.length == 0) return [];
    const patterns = pattern.split(";");
    const parsed = [];
    for (const pattern2 of patterns) {
      const parts = pattern2.split(",");
      const allBlocks = [];
      for (const part of parts) {
        let blocks = parser.parse(part);
        while (blocks[0].type == 0 /* FilterBlock */) blocks = blocks.slice(1);
        const allBlocksInitialEnd = allBlocks.length;
        while (blocks.length > 0 && blocks[blocks.length - 1].type == 1 /* GeneratorLiteral */)
          allBlocks.splice(allBlocksInitialEnd, 0, [blocks.pop()]);
        if (blocks.length > 0) allBlocks.splice(allBlocksInitialEnd, 0, blocks);
      }
      parsed.push(allBlocks);
    }
    return parsed;
  }
  function sfinderPieces(parsedPattern) {
    const runningParts = [];
    for (const appendingParts of parsedPattern) {
      const runningQueues = [];
      for (const blocks of appendingParts) {
        runningQueues.push(evaluateBlocks(blocks));
      }
      for (const queue of product(runningQueues)) {
        runningParts.push(queue);
      }
    }
    return runningParts;
  }
  function randomSfinderPieces(parsedPattern, random) {
    if (parsedPattern.length == 0) return null;
    const weights = [];
    const choices = [];
    let total = 0;
    for (const appendingParts of parsedPattern) {
      let weight = 1;
      let queueChoice = "";
      for (const blocks of appendingParts) {
        if (blocks.length == 1) {
          const block = blocks[0];
          if (sampleableGenerator(block)) {
            queueChoice += randomEvaluateGenerator(block, random);
            weight *= totalQueues(block);
            continue;
          }
        }
        const evaluatedBlocks = evaluateBlocks(blocks);
        weight *= evaluatedBlocks.length;
        if (evaluatedBlocks.length == 0) return null;
        queueChoice += evaluatedBlocks[random(0, evaluatedBlocks.length)];
      }
      total += weight;
      weights.push(weight);
      choices.push(queueChoice);
    }
    if (choices.length == 1) return choices[0];
    const weightedChoice = random(0, total);
    let i = 0;
    let runningWeight = weights[i];
    while (runningWeight < weightedChoice) {
      i++;
      runningWeight += weights[i];
    }
    return choices[i];
  }

  // src/TetrisGame.ts
  var PREVIEWSIZE = 5;
  var INITIALY = 19;
  var INITIALX = 4;
  var DEFAULT_TUNING = {
    arr: 0,
    sdArr: 0,
    das: 80
  };
  var TetrisGame = class {
    constructor(pattern = "", fillBags = false, handling = DEFAULT_TUNING) {
      __publicField(this, "board");
      __publicField(this, "queue");
      __publicField(this, "holdPiece");
      __publicField(this, "active");
      __publicField(this, "softReset", false);
      __publicField(this, "handling");
      __publicField(this, "pieceCount");
      __publicField(this, "totalPieceCount");
      __publicField(this, "pendingEvents");
      // bridge to frontend
      __publicField(this, "random");
      __publicField(this, "seed");
      __publicField(this, "simulating");
      __publicField(this, "held");
      __publicField(this, "timers");
      __publicField(this, "parsedQueuePattern");
      __publicField(this, "currentQueue");
      __publicField(this, "operations");
      __publicField(this, "fillBags");
      this.handling = handling;
      this.pieceCount = 0;
      this.totalPieceCount = 0;
      this.pendingEvents = [];
      this.random = new PRNG();
      this.seed = this.random.reseed();
      this.simulating = false;
      this.queue = new TetrisQueue(PREVIEWSIZE, this.random);
      this.board = new TetrisBoard(PCSIZE, BOARDHEIGHT + 1);
      this.operations = [];
      this.parsedQueuePattern = null;
      this.currentQueue = null;
      this.fillBags = fillBags;
      this.parsedQueuePattern = parsePattern(pattern);
      this.queue.setFillBags(this.fillBags);
    }
    generateQueue() {
      return randomSfinderPieces(this.parsedQueuePattern, this.random.randInt);
    }
    setPattern(pattern) {
      if (pattern.length > 0) {
        this.parsedQueuePattern = parsePattern(pattern);
        this.queue.setFillBags(this.fillBags);
      }
      this.fullReset();
    }
    setActive(piece) {
      if ([0 /* _ */, 8 /* X */].includes(piece)) throw new Error("Unable to set active piece as gotten invalid piece");
      this.active = new TetrisBoardPiece(INITIALX, INITIALY, piece, 0 /* spawn */);
    }
    fullReset() {
      this.seed = this.random.reseed();
      this.operations = [];
      this.totalPieceCount = 0;
      this.reset();
    }
    reset(soft = false) {
      this.held = false;
      this.holdPiece = 0;
      this.timers = {
        left: -1,
        right: -1,
        sd: -1
      };
      this.queue.reset();
      this.board.reset();
      this.pieceCount = 0;
      if (this.parsedQueuePattern !== null) {
        if (soft) this.queue.set(this.currentQueue);
        else {
          this.regen();
        }
      }
      if (this.parsedQueuePattern !== null && this.queue.previewSize > 1) {
        this.holdPiece = this.queue.poll();
      }
      this.setActive(this.queue.poll());
    }
    regen() {
      const queue = this.generateQueue();
      if (queue === null) {
        throw new Error("Pattern generates no queues");
      }
      this.currentQueue = queue;
      this.queue.set(this.currentQueue);
    }
    checkCollide(piece) {
      for (const pos of piece.getMinos()) {
        if (pos.x < 0 || pos.x >= PCSIZE || pos.y < 0 || this.board.isFilled(pos.y, pos.x)) {
          return true;
        }
      }
      return false;
    }
    getGhost() {
      const ghost = this.active.copy();
      do
        ghost.move(0, -1);
      while (!this.checkCollide(ghost));
      ghost.move(0, 1);
      return ghost;
    }
    hold() {
      if (this.holdPiece === 0 /* _ */) {
        if (this.queue.length == 0) {
          this.setActive(this.active.type);
          return;
        }
        this.holdPiece = this.active.type;
        this.setActive(this.queue.poll());
        return;
      }
      const tmp = this.active.type;
      this.setActive(this.holdPiece);
      this.holdPiece = tmp;
    }
    movePiece(dx, dy) {
      this.active.move(dx, dy);
      if (!this.checkCollide(this.active)) {
        return true;
      }
      this.active.move(-dx, -dy);
      return false;
    }
    spin(rotation) {
      const init = this.active.rotation;
      this.active.rotation = rotation;
      for (const [dx, dy] of get_kicks(this.active.type, init, rotation)) {
        if (this.movePiece(dx, dy)) return;
      }
      this.active.rotation = init;
    }
    spinCW() {
      this.spin(spin_cw(this.active.rotation));
    }
    spinCCW() {
      this.spin(spin_ccw(this.active.rotation));
    }
    spin180() {
      this.spin(spin_180(this.active.rotation));
    }
    down() {
      this.movePiece(0, -1);
    }
    harddrop(piece = null, clear = true) {
      if (piece !== null) {
        this.active.x = piece.x;
        this.active.y = piece.y;
        this.active.rotation = piece.rotation;
      } else {
        while (this.movePiece(0, -1)) ;
        this.held = false;
        this.operations.push(this.active.copy());
      }
      this.pieceCount++;
      this.totalPieceCount++;
      return this.board.place(this.active, clear);
    }
    getNextPiece(resetted) {
      if (this.queue.length == 0) {
        if (this.holdPiece != 0 /* _ */) {
          this.setActive(this.holdPiece);
          this.holdPiece = 0 /* _ */;
        } else {
          this.reset(this.softReset);
        }
      }
      if (!resetted) {
        this.setActive(this.queue.poll());
      }
    }
    lock(piece = null) {
      this.harddrop(piece);
      this.getNextPiece(false);
      if (this.checkCollide(this.active)) {
        this.reset(this.softReset);
      }
    }
    undo() {
      if (this.operations.length == 0) return;
      this.random.seed(this.seed);
      this.operations.pop();
      this.reset();
      this.simulating = true;
      this.totalPieceCount = 0;
      if (this.holdPiece == 0 /* _ */) {
        this.hold();
      }
      for (const piece of this.operations) {
        if (this.active.type !== piece.type) {
          if (this.holdPiece !== piece.type) {
            console.error(
              `Undo neither piece in operations matches pieces in queue (active ${PieceEnum[this.active.type]}, hold ${PieceEnum[this.holdPiece]}, expected ${PieceEnum[piece.type]})`
            );
          }
          this.hold();
        }
        this.lock(piece);
      }
      this.simulating = false;
    }
    tick(time, actions2) {
      const buf = {
        left: false,
        right: false,
        sd: false
      };
      for (const action of actions2) {
        switch (action) {
          case "hold":
            this.hold();
            break;
          case "undo":
            this.undo();
            break;
          case "ccw":
            this.spinCCW();
            break;
          case "cw":
            this.spinCW();
            break;
          case "180":
            this.spin180();
            break;
          case "hd":
            this.lock();
            break;
          case "d1":
            this.down();
            break;
          case "reset":
            this.fullReset();
            break;
          case "left":
          case "right":
          case "sd":
            buf[action] = true;
            break;
        }
      }
      let ldas = -1;
      let rdas = -1;
      if (!buf["left"]) {
        this.timers["left"] = -1;
      } else if (this.timers["left"] != -1 && time - this.timers["left"] >= this.handling.das + this.handling.arr) {
        ldas = this.timers["left"] + this.handling.das;
      }
      if (!buf["right"]) {
        this.timers["right"] = -1;
      } else if (this.timers["right"] != -1 && time - this.timers["right"] >= this.handling.das + this.handling.arr) {
        rdas = this.timers["right"] + this.handling.das;
      }
      if (!(buf["left"] && buf["right"] && (ldas == -1 || rdas == -1)) && ldas != -1 && (rdas == -1 || ldas > rdas)) {
        while (ldas + this.handling.arr < time) {
          if (!this.movePiece(-1, 0)) {
            ldas = time;
            break;
          }
          ldas += this.handling.arr;
          if (buf["sd"]) {
            if (this.timers["sd"] == -1) {
              this.timers["sd"] = time;
            }
            let sddas = this.timers["sd"];
            while (sddas <= time) {
              if (!this.movePiece(0, -1)) {
                sddas = time;
                break;
              }
              sddas += this.handling.sdArr;
            }
            this.timers["sd"] = sddas;
          }
        }
        this.timers["left"] = ldas - this.handling.das;
        if (this.timers["right"] != -1) {
          this.timers["right"] = ldas - 1;
        }
      } else if (rdas != -1) {
        while (rdas + this.handling.arr < time) {
          if (!this.movePiece(1, 0)) {
            rdas = time - this.handling.das;
            break;
          }
          rdas += this.handling.arr;
          if (buf["sd"]) {
            if (this.timers["sd"] == -1) {
              this.timers["sd"] = time;
            }
            let sddas = this.timers["sd"];
            while (sddas <= time) {
              if (!this.movePiece(0, -1)) {
                sddas = time;
                break;
              }
              sddas += this.handling.sdArr;
            }
            this.timers["sd"] = sddas;
          }
        }
        this.timers["right"] = rdas - this.handling.das;
        if (this.timers["left"] != -1) {
          this.timers["left"] = rdas - 1;
        }
      }
      if (buf["left"] && this.timers["left"] == -1) {
        this.movePiece(-1, 0);
        this.timers["left"] = time;
      }
      if (buf["right"] && this.timers["right"] == -1) {
        this.movePiece(1, 0);
        this.timers["right"] = time;
      }
      if (buf["sd"]) {
        if (this.timers["sd"] == -1) {
          this.timers["sd"] = time;
        }
        let sddas = this.timers["sd"];
        while (sddas <= time) {
          if (!this.movePiece(0, -1)) {
            sddas = time;
            break;
          }
          sddas += this.handling.sdArr;
        }
        this.timers["sd"] = sddas;
      } else {
        this.timers["sd"] = -1;
      }
    }
    loadHandling(handling) {
      this.handling = handling;
    }
  };

  // node_modules/glue-fumen/dist/index.js
  var import_tetris_fumen3 = __toESM(require_tetris_fumen(), 1);
  var import_tetris_fumen4 = __toESM(require_tetris_fumen(), 1);
  var import_tetris_fumen5 = __toESM(require_tetris_fumen(), 1);
  var import_tetris_fumen6 = __toESM(require_tetris_fumen(), 1);
  var h = ((u) => (u[u._ = 0] = "_", u[u.T = 1] = "T", u[u.I = 2] = "I", u[u.L = 3] = "L", u[u.J = 4] = "J", u[u.S = 5] = "S", u[u.Z = 6] = "Z", u[u.O = 7] = "O", u[u.X = 8] = "X", u))(h || {});
  var M = ((r) => (r[r.spawn = 0] = "spawn", r[r.right = 1] = "right", r[r.reverse = 2] = "reverse", r[r.left = 3] = "left", r))(M || {});
  var H = [[], [[[1, 0], [2, 0], [1, 1], [0, 0]], [[0, 1], [0, 2], [1, 1], [0, 0]], [[0, 1], [1, 1], [-1, 1], [0, 0]], [[0, 1], [0, 2], [-1, 1], [0, 0]]], [[[1, 0], [2, 0], [3, 0], [0, 0]], [[0, 2], [0, 1], [0, 3], [0, 0]]], [[[1, 0], [2, 1], [2, 0], [0, 0]], [[0, 1], [0, 2], [1, 0], [0, 0]], [[1, 1], [2, 1], [0, 1], [0, 0]], [[0, 1], [-1, 2], [0, 2], [0, 0]]], [[[1, 0], [2, 0], [0, 1], [0, 0]], [[0, 1], [1, 2], [0, 2], [0, 0]], [[-1, 1], [0, 1], [-2, 1], [0, 0]], [[1, 1], [1, 2], [1, 0], [0, 0]]], [[[1, 0], [1, 1], [2, 1], [0, 0]], [[-1, 1], [0, 1], [-1, 2], [0, 0]]], [[[0, 0], [0, 1], [-1, 1], [1, 0]], [[0, 1], [1, 1], [1, 2], [0, 0]]], [[[0, 0], [0, 1], [1, 1], [1, 0]]]];
  function K(n, e) {
    let t = H[n], o = t.length;
    return e %= o, t[e];
  }
  function W(n, e) {
    let t = H[n].length;
    return Math.floor(e / t);
  }
  function te(n, e, t, o) {
    let r = K(t, o), i = W(t, o), [s, a] = r[i];
    return { x: n + s, y: e + a };
  }
  function G(n) {
    try {
      return import_tetris_fumen4.decoder.decode(n);
    } catch (e) {
      throw new Error(`Fumen '${n}' could not be decoded`, { cause: e });
    }
  }
  var I = new Uint8Array(256);
  I[84] = 1;
  I[73] = 1;
  I[76] = 1;
  I[74] = 1;
  I[83] = 1;
  I[90] = 1;
  I[79] = 1;
  function ne(n) {
    return I[n.charCodeAt(0)] == 1;
  }
  function D(n) {
    return (n & 7) != 0;
  }
  function oe(n, e, t = 20) {
    return 0 <= n && n < 10 && 0 <= e && e < t;
  }
  function F(n, e) {
    let t = (1 << n + 1) - 1;
    for (; (e & t) > 0; ) {
      for (; (e & t) > 0; ) e &= e - 1, n++;
      t = (1 << n + 1) - 1;
    }
    return n;
  }
  function v(n, e) {
    let t = 0;
    for (; e > 0; ) {
      let o = 31 - Math.clz32(e);
      n.isLineClear(o) && (t |= 1 << o), e &= ~(1 << o);
    }
    return t;
  }
  function re(n, e) {
    for (; e > 0; ) {
      let t = 31 - Math.clz32(e);
      n.lineClear(t), e &= ~(1 << t);
    }
  }
  var ie = Math.pow(2, 9);
  var se = 1400 * 4;
  var V = new Float64Array(se).fill(NaN);
  var d = class {
    constructor() {
    }
    static positions(e, t, o, r) {
      let i = e * 560 + t * 28 + o * 4 + r;
      if (i >= se) return -1;
      if (!isNaN(V[i])) return V[i];
      let s = K(o, r), a = W(o, r), [c, u] = s[a], p = 0;
      for (let [O, g] of s) {
        let y = e + O - c, x = t + g - u;
        if (!oe(y, x)) {
          p = -1;
          break;
        }
        let P = (y << 5) + x;
        p *= ie, p += P;
      }
      return V[i] = p, p;
    }
    static getMino(e) {
      let t = e & 31;
      return { x: e >> 5 & 15, y: t };
    }
    static nextMino(e) {
      return Math.floor(e / ie);
    }
  };
  var l = class {
    constructor() {
    }
    static encode(e) {
      let t = h[e.type];
      return t = (t << 2) + M[e.rotation], t = (t << 4) + e.x, t = (t << 5) + e.y, t;
    }
    static decode(e) {
      let t = e & 31;
      e >>= 5;
      let o = e & 15;
      e >>= 4;
      let r = M[e & 3];
      return e >>= 2, { type: h[e & 7], rotation: r, x: o, y: t };
    }
    static getY(e) {
      return e & 31;
    }
    static getX(e) {
      return e >> 5 & 15;
    }
    static getRotation(e) {
      return e >> 9 & 3;
    }
    static getPiece(e) {
      return e >> 11 & 7;
    }
    static setY(e, t) {
      return e & -32 | t;
    }
    static setX(e, t) {
      return e & -481 | t << 5;
    }
    static setRotation(e, t) {
      return e & -1537 | t << 9;
    }
    static setPiece(e, t) {
      return e & -14337 | t << 11;
    }
    static positions(e) {
      let t = this.getX(e), o = this.getY(e), r = this.getPiece(e), i = this.getRotation(e);
      return d.positions(t, o, r, i);
    }
  };
  var _e = 4;
  var ce = 16;
  var q = 15;
  var X = new Float32Array(10).map((n, e) => Math.pow(2, (10 - e - 1) * _e));
  var _a;
  var E = (_a = class {
    constructor(e, t = 20) {
      __publicField(this, "field");
      __publicField(this, "height");
      this.field = new Array(t).fill(0);
      let o = e.str({ garbage: false, reduced: true });
      if (!o) {
        this.height = 0;
        return;
      }
      let r = o.split(`
`).slice(-t);
      this.height = Math.min(r.length, t);
      for (let i = 0; i < this.height; i++) {
        let s = r[this.height - i - 1];
        for (let a = 0; a < 10; a++) this.field[i] *= ce, this.field[i] += h[s[a]];
      }
    }
    toField() {
      let e = "";
      for (let t = this.height - 1; t >= 0; t--) {
        let o = this.field[t], r = "";
        for (let i = 0; i < 10; i++) r = h[o & q] + r, o = Math.floor(o / ce);
        e += r;
      }
      return import_tetris_fumen5.Field.create(e);
    }
    at(e, t) {
      return ~~(this.field[t] / X[e]) & q;
    }
    unset(e, t) {
      let o = ~~(this.field[t] / X[e]) & q;
      this.field[t] -= o * X[e];
    }
    set(e, t, o) {
      this.height = t + 1 > this.height ? t + 1 : this.height, this.field[t] += h[o] * X[e];
    }
    getHeight() {
      return this.height;
    }
    isLineClear(e) {
      let t = this.field[e], o = t & 1048575, r = Math.floor(t / 1048576), i = (o + _a.NOT_HIGH_BITS_MASK & _a.HIGH_BITS_MASK) === _a.HIGH_BITS_MASK, s = (r + _a.NOT_HIGH_BITS_MASK & _a.HIGH_BITS_MASK) === _a.HIGH_BITS_MASK;
      return i && s;
    }
    lineClear(e) {
      this.field.copyWithin(e, e + 1, this.height + 1), this.height--;
    }
    copy() {
      let e = Object.create(Object.getPrototypeOf(this));
      return e.height = this.height, e.field = this.field.slice(), e;
    }
  }, __publicField(_a, "HIGH_BITS_MASK", 559240), __publicField(_a, "NOT_HIGH_BITS_MASK", 489335), _a);
  var R = class {
    constructor(e = 1024) {
      __publicField(this, "storage");
      __publicField(this, "head", 0);
      __publicField(this, "tail", 0);
      __publicField(this, "size", 0);
      __publicField(this, "capacity");
      this.capacity = e, this.storage = new Int32Array(this.capacity);
    }
    enqueue(e) {
      this.size === this.capacity && this.resize(), this.storage[this.tail] = e, this.tail = (this.tail + 1) % this.capacity, this.size++;
    }
    dequeue() {
      let e = this.storage[this.head];
      return this.head = (this.head + 1) % this.capacity, this.size--, e;
    }
    resize() {
      let e = this.capacity;
      this.capacity *= 2;
      let t = new Int32Array(this.capacity);
      for (let o = 0; o < this.size; o++) t[o] = this.storage[(this.head + o) % e];
      this.storage = t, this.head = 0, this.tail = this.size;
    }
    isEmpty() {
      return this.size === 0;
    }
  };
  var U = new Int32Array(512);
  var ue = 6;
  var m = new Int16Array(ue);
  var Se = [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]];
  var Te = [[[0, 0], [-1, 0], [2, 0], [-1, 0], [2, 0]], [[-1, 0], [0, 0], [0, 0], [0, 1], [0, -2]], [[-1, 1], [1, 1], [-2, 1], [1, 0], [-2, 0]], [[0, 1], [0, 1], [0, 1], [0, -1], [0, 2]]];
  var Ae = [[[0, 0]], [[0, -1]], [[-1, -1]], [[-1, 0]]];
  var He = [[[0, 0], [0, 1]], [[0, 0], [1, 0]], [[0, 0], [0, 0]], [[0, 0], [0, 0]]];
  var Fe = [[[1, -1], [1, 0]], [[-1, -1], [0, -1]], [[0, 0], [0, 0]], [[0, 0], [0, 0]]];
  var Re = [[[1, 1]], [[1, -1]], [[0, 0]], [[0, 0]]];
  function Z(n, e) {
    let t = new Array(4);
    for (let o = 0; o < 4; o++) {
      t[o] = new Array(4), t[o][o] = [[0, 0]];
      let r = de(o);
      t[o][r] = n[o].map((i, s) => i.map((a, c) => a - n[r][s][c])), r = pe(o), t[o][r] = n[o].map((i, s) => i.map((a, c) => a - n[r][s][c])), r = fe(o), t[o][r] = e[o].map((i, s) => i.map((a, c) => a - e[r][s][c]));
    }
    return t;
  }
  var k = Z(Se, He);
  var ke = Z(Te, Fe);
  var Ce = Z(Ae, Re);
  var Le = [k, ke, k, k, k, k, Ce];
  function de(n) {
    return n + 1 & 3;
  }
  function fe(n) {
    return n + 2 & 3;
  }
  function pe(n) {
    return n + 3 & 3;
  }
  function Ge(n, e, t) {
    return Le[n - 1][e][t];
  }
  function ve(n, e) {
    return n = l.setX(n, 4), n = l.setY(n, e), n;
  }
  function Xe(n, e) {
    l.getX(e) > 0 ? m[0] = e - 32 : m[0] = -1, l.getX(e) < 9 ? m[1] = e + 32 : m[1] = -1, l.getY(e) > 0 ? m[2] = e - 1 : m[2] = -1;
    let t = l.getRotation(e), o = e & -1537, r = de(t), i = pe(t), s = fe(t);
    m[3] = o | r << 9, m[4] = o | i << 9, m[5] = o | s << 9, m[3] = J(n, m[3], t, r), m[4] = J(n, m[4], t, i), m[5] = J(n, m[5], t, s);
  }
  function le(n, e) {
    let t = l.positions(e);
    if (t == -1) return true;
    for (; t > 0; ) {
      let o = d.getMino(t);
      if (n.at(o.x, o.y) === 8) return true;
      t = d.nextMino(t);
    }
    return false;
  }
  function J(n, e, t, o) {
    for (let [r, i] of Ge(l.getPiece(e), t, o)) {
      let s = e + (r << 5) + i;
      if (!le(n, s)) return s;
    }
    return -1;
  }
  function ae(n) {
    let e = n >> 5, o = 1 << (n & 31), r = (U[e] & o) !== 0;
    return U[e] |= o, r;
  }
  function me(n, e) {
    let t = ve(e, n.getHeight());
    if (e == t) return true;
    let o = new R(64);
    for (U.fill(0), o.enqueue(t), ae(t); !o.isEmpty(); ) {
      let r = o.dequeue();
      Xe(n, r);
      for (let i = 0; i < ue; i++) {
        let s = m[i];
        if (s !== -1) {
          if (s === e) return true;
          ae(s) || (i >= 3 || !le(n, s)) && o.enqueue(s);
        }
      }
    }
    return false;
  }
  var S = class extends l {
    static encode(e) {
      let t = e.absY << 14;
      return t |= super.encode(e), t;
    }
    static update(e, t) {
      let o = t << 14;
      return o |= e, o;
    }
    static getAbsY(e) {
      return e >> 14 & 31;
    }
    static stripY(e) {
      return e >> 5;
    }
  };
  var $ = class extends E {
    isLineClear(e) {
      return this.field[e] === 586406201480;
    }
    emptyColored() {
      for (let e = 0; e < this.height; e++) {
        let t = this.field[e], o = t & 1048575, r = Math.floor(t / 1048576);
        o &= E.HIGH_BITS_MASK, r &= E.HIGH_BITS_MASK, this.field[e] = r * 1048576 + (o >>> 0);
      }
    }
    checkColored() {
      for (let e = 0; e < this.height; e++) {
        let t = this.field[e], o = t & 1048575, r = Math.floor(t / 1048576);
        if (((o | r) & E.NOT_HIGH_BITS_MASK) != 0) return true;
      }
      return false;
    }
  };
  function Ye(n, e, t = "X") {
    let o = 0;
    for (let r = 0; r < 4; r++) {
      let i = d.getMino(e);
      n.unset(i.x, i.y), n.set(i.x, i.y, t), o |= 1 << i.y, e = d.nextMino(e);
    }
    return o;
  }
  function ze(n) {
    let e = new Uint8Array(8), t = n.getHeight(), o = 0;
    for (let r = 0; r < t; r++) for (let i = 0; i < 10; i++) {
      let s = n.at(i, r);
      D(s) && (e[s]++, o += Math.floor(e[s] / 4), e[s] %= 4);
    }
    return e.every((r) => r == 0) ? o : -1;
  }
  function Ke(n, e) {
    let t = n.map(S.stripY), o = new Set(t);
    for (let r of e) {
      if (n.length !== r.length) return false;
      if (r.map(S.stripY).every((s) => o.has(s))) return true;
    }
    return false;
  }
  function We(n) {
    return n >> 3;
  }
  function De(n, e, t) {
    if (e <= 1) return false;
    let o = true, r = [];
    for (let a = 0; a < 4; a++) {
      let c = d.getMino(t);
      o && (o = c.y != e && n.at(c.x, c.y - 1) == 8), c.y == e && r.push(c), t = d.nextMino(t);
    }
    if (o) return false;
    let i = 0, s = (1 << e) - (1 << Math.max(0, e - 5));
    for (let a of r) {
      for (let c = Math.max(0, e - 5); c < e; c++) i |= We(n.at(a.x, c)) << c;
      if (i == s) return false;
    }
    return true;
  }
  var Ve = 40;
  var qe = 74;
  function Je(n, e, t, o, r) {
    if (!r && De(n, t, o)) return { x: 0, y: Math.max(0, t - 4) };
    let i = d.getMino(o);
    for (o = d.nextMino(o); o > 0; ) {
      let s = d.getMino(o);
      s.x > i.x && t == s.y && (i = s), o = d.nextMino(o);
    }
    if (r || t == 0 || t == n.getHeight()) return { x: (i.x + 1) % 10, y: t + ~~((i.x + 1) / 10) };
    if (e >= 1 && n.at(e - 1, t - 1) == 4 && n.at(e, t + 1) == 4) return { x: e - 1, y: t - 1 };
    if (i.x < 9 && n.at(i.x + 1, i.y - 1) == 3 && n.at(i.x, i.y + 1) == 3) return { x: i.x + 1, y: i.y - 1 };
    if (e >= 2 && n.at(e - 2, t) == n.at(e, t + 1) && (Ve & 1 << n.at(e - 2, t)) != 0) return { x: e - 2, y: t };
    if (e >= 1 && (qe & 1 << n.at(e - 1, t)) != 0) {
      if (n.at(e - 1, t) == 4) {
        if (n.at(e, t + 1) == 8 && n.at(e, t + 2) == 4) return { x: e - 1, y: t };
      } else if (n.at(e - 1, t) == n.at(e, t + 1)) return { x: e - 1, y: t };
    }
    return { x: (i.x + 1) % 10, y: t + ~~((i.x + 1) / 10) };
  }
  function Ue(n, e, t, o, r) {
    let i = t.getHeight();
    for (; e < i; e++) {
      for (; n < 10; n++) {
        let s = t.at(n, e);
        if (!D(s) || e == i - 1 && s != 2) continue;
        let a = -1;
        if (o !== null) {
          for (let c = 0; c < r + 1; c++) o[c] == s && (a = c);
          if (a == -1) continue;
        }
        return { x: n, y: e, orderIndex: a };
      }
      n = 0;
    }
    return null;
  }
  function Ze(n, e, t, o) {
    let r = e.getHeight(), i = l.positions(n);
    if (i == -1) return -1;
    let s = l.getPiece(n), a = !t, c = i;
    for (let u = 0; u < 4; u++) {
      let p = d.getMino(c);
      if (p.y >= r || e.at(p.x, p.y) !== s) return -1;
      a && (a = p.y != 0 && e.at(p.x, p.y - 1) != 8), c = d.nextMino(c);
    }
    return a || o && !me(e, n) ? -1 : i;
  }
  function $e(n, e) {
    let t = e;
    for (; n > 0; ) {
      let o = 31 - Math.clz32(n), r = F(o, e);
      t |= 1 << r, n &= ~(1 << o);
    }
    return t;
  }
  function he(n, e, t, o, r, i) {
    let s = ze(n);
    if (s == -1) return [];
    if (s == 0) return [[]];
    let a = [], c = [];
    for (a.push({ x0: 0, y0: 0, field: n, operations: [], rowsCleared: 0, order: o }); a.length > 0; ) {
      let { x0: u, y0: p, field: O, operations: g, rowsCleared: y, order: x } = a.pop(), P = Ue(u, p, O, x, r);
      if (P === null) continue;
      let { x: T, y: C, orderIndex: be } = P, N = O.at(T, C);
      a.push({ x0: (T + 1) % 10, y0: C + Math.floor((T + 1) / 10), field: O, operations: g, rowsCleared: y, order: x });
      let Ee = H[N].length;
      for (let L = 0; L < Ee; L++) {
        let Oe = te(T, C, N, L), _ = l.encode({ ...Oe, type: h[N], rotation: M[L] }), B = Ze(_, O, t, i);
        if (B == -1) continue;
        let A = O.copy(), ye = Ye(A, B), Y = v(A, ye);
        re(A, Y);
        let Me = F(l.getY(_), y);
        if (_ = S.update(_, Me), g.length + 1 == s && !A.checkColored()) {
          if (g.push(_), Ke(g, c) || c.push(g), c.length == e) return c;
          continue;
        }
        let we = $e(Y, y), [j, Q] = [0, 0];
        if (Y == 0 && x === null && !i) {
          let ee = Je(O, T, C, B, t);
          j = ee.x, Q = ee.y;
        }
        let z = x?.slice() ?? null;
        z !== null && z.splice(be, 1), a.push({ x0: j, y0: Q, field: A, operations: [...g, _], rowsCleared: we, order: z });
      }
    }
    return c;
  }
  function ge(n, { solutionLimit: e = 1, order: t = "", hold: o = 0, srs180: r = false, floatingPieces: i = false } = {}) {
    let s = G(n), a = [], c = null;
    if (t !== "") {
      let u = Array.from(t);
      if (!u.every(ne)) throw new Error(`Given order '${t}' does not consist of only tetris pieces`);
      c = u.map((p) => h[p]);
    }
    if (o < 0) throw new Error(`Given hold expected to be nonnegative but ${o} gotten`);
    for (let u of s) {
      let p = new $(u.field, 20);
      r && e < 1 && (e = he(p, e, i, c, o, false).length);
      let O = he(p, e, i, c, o, r);
      p.emptyColored();
      let g = p.toField();
      for (let y of O) {
        let x = y.map((P) => ({ operation: S.decode(P) }));
        y.length == 0 ? x.push({ field: g }) : x[0].field = g, a.push(import_tetris_fumen3.encoder.encode(x));
      }
    }
    return a;
  }
  function xe(n) {
    let e = G(n), t = new E(e[0].field, 20), o = 0, r = 0;
    for (let i of e) {
      let s = i.operation;
      if (s === void 0) continue;
      let a = d.positions(s.x, s.y, h[s.type], M[s.rotation]);
      if (a == -1) throw new Error("One of the pieces goes off the board");
      for (let c = 0; c < 4; c++) {
        let u = d.getMino(a);
        u.y = F(u.y, r), t.set(u.x, u.y, s.type), o |= 1 << u.y, a = d.nextMino(a);
      }
      r |= v(t, o), o = 0;
    }
    return import_tetris_fumen6.encoder.encode([{ field: t.toField() }]);
  }

  // src/TetrisQuiz.ts
  var import_tetris_fumen7 = __toESM(require_tetris_fumen(), 1);
  var HEX_TO_SET_BIT_COUNT = new Uint8Array(128).fill(0);
  for (let i = 0; i < 16; i++) {
    const count = i.toString(2).replace(/0/g, "").length;
    const hex = i.toString(16);
    HEX_TO_SET_BIT_COUNT[hex.charCodeAt(0)] = count;
    HEX_TO_SET_BIT_COUNT[hex.toUpperCase().charCodeAt(0)] = count;
  }
  function countSetBits(hexstr) {
    let count = 0;
    for (let i = 0; i < hexstr.length; i++) {
      count += HEX_TO_SET_BIT_COUNT[hexstr[i].charCodeAt(0)];
    }
    return count;
  }
  var TetrisQuiz = class extends TetrisGame {
    constructor(pattern, initialFumen, targetFumen, coverMask = null, fillBag = false, handling = DEFAULT_TUNING) {
      super(pattern, fillBag, handling);
      __publicField(this, "initialFumen");
      __publicField(this, "targetFumen");
      __publicField(this, "coverMask");
      __publicField(this, "validTargetFumens");
      // frequency map of pieces in target fumen
      __publicField(this, "correctBuild");
      __publicField(this, "buildLength");
      this.initialFumen = initialFumen;
      this.targetFumen = targetFumen;
      this.coverMask = coverMask;
      this.validTargetFumens = [];
      this.correctBuild = new Uint8Array(128).fill(0);
      this.buildLength = -1;
      this.board.fromFumen(this.initialFumen);
    }
    setInitial(fumen) {
      this.initialFumen = fumen;
      this.fullReset();
    }
    setTarget(fumen) {
      this.targetFumen = fumen;
      this.fullReset();
    }
    setCoverMask(mask) {
      this.coverMask = mask;
      this.fullReset();
    }
    reset(soft) {
      super.reset(soft);
      this.board.fromFumen(this.initialFumen);
      this.getValidTargets();
    }
    generateQueue() {
      if (!this.coverMask) {
        return super.generateQueue();
      } else {
        const index = this.random.randInt(0, countSetBits(this.coverMask));
        const queues = sfinderPieces(this.parsedQueuePattern);
        return queues[index];
      }
    }
    // targetFumen can contain multiple accepted final board states, find which ones are covered
    getValidTargets() {
      this.validTargetFumens = [];
      const fumens = fumenSplit(this.targetFumen);
      if (fumens.length > 0) {
        const queue = (this.holdPiece != 0 /* _ */ ? PieceEnum[this.holdPiece] : "") + PieceEnum[this.active.type] + this.queue.queue.map((piece) => PieceEnum[piece]).join("");
        for (const fumen of fumens) {
          if (ge(fumen, { order: queue, hold: 1, srs180: true }).length > 0) {
            this.validTargetFumens.push(fumen);
          }
        }
      }
      if (this.validTargetFumens.length == 0) {
        throw new Error("Invalid parameters to quiz as no valid target answer for given queue " + this.currentQueue);
      }
      const initialBuild = new Uint8Array(128).fill(0);
      fumenCountPieces(this.initialFumen, initialBuild);
      fumenCountPieces(this.validTargetFumens[0], this.correctBuild);
      this.buildLength = 0;
      for (const piece of BAG) {
        const index = piece.charCodeAt(0);
        this.correctBuild[index] -= initialBuild[index];
        this.buildLength += this.correctBuild[index];
      }
    }
    lock(piece = null) {
      const lineclears = this.harddrop(piece, true);
      if (lineclears.length > 0) {
        this.validTargetFumens = this.validTargetFumens.map((fumen) => fumenClearLines(fumen, lineclears));
      }
      let resetted = false;
      if (this.pieceCount == this.buildLength) {
        let soft;
        const pages = [];
        const currentBuild = new Uint8Array(128).fill(0);
        for (const operation of this.operations.slice(
          this.totalPieceCount - this.pieceCount,
          this.totalPieceCount
        )) {
          const piece2 = PieceEnum[operation.type];
          pages.push({
            operation: {
              ...operation,
              type: piece2,
              rotation: Rotation[operation.rotation]
            }
          });
          currentBuild[piece2.charCodeAt(0)]++;
        }
        let correctPieces = true;
        for (const piece2 of BAG) {
          const index = piece2.charCodeAt(0);
          if (currentBuild[index] != this.correctBuild[index]) {
            correctPieces = false;
            break;
          }
        }
        if (correctPieces) {
          pages[0].field = decodeWrapper(this.initialFumen)[0].field;
          const fumen = xe(import_tetris_fumen7.encoder.encode(pages));
          let congruent = false;
          for (const validFumen of this.validTargetFumens) {
            congruent || (congruent = fumen == validFumen);
          }
          if (congruent) {
            soft = false;
            if (!this.simulating) this.pendingEvents.push("correct");
          } else {
            soft = true;
            if (!this.simulating) this.pendingEvents.push("wrong");
          }
          if (soft) {
            this.reset(true);
            resetted = true;
          }
        } else {
          this.reset(true);
          resetted = true;
        }
      }
      this.getNextPiece(resetted);
      if (this.checkCollide(this.active)) {
        this.reset(this.softReset);
      }
    }
  };

  // src/Keybind.ts
  var DEFAULT = {
    left: "ArrowLeft",
    right: "ArrowRight",
    hold: "KeyC",
    cw: "KeyX",
    ccw: "KeyZ",
    180: "ShiftLeft",
    sd: "ArrowDown",
    hd: "Space",
    d1: "KeyH",
    reset: "KeyR",
    undo: "Ctrl+Z"
  };
  var Keybind = class {
    constructor(binding) {
      __publicField(this, "binding");
      __publicField(this, "lookup", {});
      __publicField(this, "subscribers");
      this.binding = binding;
      this.subscribers = [];
      this.notify();
    }
    rebuildLookup() {
      this.lookup = {};
      for (const [action, key] of Object.entries(this.binding)) {
        this.lookup[key] = action;
      }
    }
    set(action, key) {
      if (action == "undo") return;
      const dupAction = Object.keys(this.binding).find(
        (k2) => this.binding[k2] === key
      );
      if (dupAction) this.binding[dupAction] = "-";
      this.binding[action] = key;
    }
    get(action) {
      return this.binding[action];
    }
    subscribe(run) {
      this.subscribers.push(run);
      run(this.binding);
      return () => {
        this.subscribers = this.subscribers.filter((fn) => fn !== run);
      };
    }
    notify() {
      this.rebuildLookup();
      this.subscribers.forEach((fn) => fn(this.binding));
    }
    reset(defaultBinds = DEFAULT) {
      this.binding = { ...defaultBinds };
      this.notify();
    }
  };
  var keybinds = new Keybind(DEFAULT);

  // src/index.ts
  var gameCtn = document.querySelector("#game-container");
  var boardCanvas = document.querySelector("#board");
  var queueCanvas = document.querySelector("#queue");
  var holdCanvas = document.querySelector("#hold");
  if (!gameCtn || !boardCanvas || !queueCanvas || !holdCanvas) {
    throw new Error("Required HTML elements are missing");
  }
  var game;
  var actions = /* @__PURE__ */ new Set();
  var showAnswer = false;
  var CELL_SIZE = 24;
  var controls = window.config.controls;
  var tuning = window.config.tuning;
  keybinds.reset(controls);
  var parameters = window.parameters;
  boardCanvas.width = PCSIZE * CELL_SIZE;
  boardCanvas.height = BOARDHEIGHT * CELL_SIZE;
  queueCanvas.width = 4 * CELL_SIZE;
  queueCanvas.height = 14 * CELL_SIZE;
  holdCanvas.width = 4 * CELL_SIZE;
  holdCanvas.height = 2 * CELL_SIZE;
  var boardCtx = boardCanvas.getContext("2d");
  var queueCtx = queueCanvas.getContext("2d");
  var holdCtx = holdCanvas.getContext("2d");
  holdCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 2 * CELL_SIZE);
  boardCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 20 * CELL_SIZE);
  queueCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 14 * CELL_SIZE);
  gameCtn.addEventListener("keydown", handleKeyDown);
  gameCtn.addEventListener("keyup", handleKeyUp);
  game = new TetrisQuiz(parameters.pattern, parameters.initialFumen, parameters.targetFumen, null, parameters.fillBag == "T");
  game.reset(false);
  game.loadHandling(tuning);
  var frame;
  var loop = (timestamp) => {
    game.tick(timestamp, actions);
    let tmpActions = /* @__PURE__ */ new Set();
    if (actions.has("left")) tmpActions.add("left");
    if (actions.has("right")) tmpActions.add("right");
    if (actions.has("sd")) tmpActions.add("sd");
    actions = tmpActions;
    handleEvents();
    drawGame(boardCtx, game);
    drawQueue(queueCtx, game.queue);
    drawHold(holdCtx, game.holdPiece);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  function handleKeyDown(event) {
    if (event.code == "KeyZ" && event.ctrlKey) {
      actions.add("undo");
    } else actions.add(keybinds.lookup[event.code]);
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
    }
  }
  function handleKeyUp(event) {
    actions.delete(keybinds.lookup[event.code]);
  }
  function handleEvents() {
    for (let event of game.pendingEvents) {
      switch (event) {
        case "correct":
          showAnswer = false;
          pycmd("tetris:answer");
          break;
        case "wrong":
          break;
        case "missing setup":
          break;
      }
    }
    game.pendingEvents = [];
  }
  function drawGame(context, game2) {
    drawBoard(context, game2.board);
    drawPiece(context, game2.active);
    if (showAnswer && game2.validTargetFumens.length > 0) {
      drawFumen(context, game2.validTargetFumens[0], "4D", game2.board);
    }
    drawPiece(context, game2.getGhost(), "4D");
  }
  function drawBoard(context, board) {
    context.fillStyle = get_colour(0);
    context.fillRect(0, 0, PCSIZE, BOARDHEIGHT);
    context.beginPath();
    for (let x = 1; x < PCSIZE; x++) {
      context.moveTo(x, 0);
      context.lineTo(x, 20);
    }
    for (let y = 1; y < BOARDHEIGHT; y++) {
      context.moveTo(0, y);
      context.lineTo(10, y);
    }
    let transform = context.getTransform();
    context.resetTransform();
    context.strokeStyle = "#ffffff0E";
    context.lineWidth = 1;
    context.stroke();
    context.setTransform(transform);
    for (let y = 0; y < BOARDHEIGHT; y++) {
      for (let x = 0; x < PCSIZE; x++) {
        if (board.isFilled(y, x)) {
          context.fillStyle = get_colour(board.at(y, x));
          context.fillRect(x, y, 1, 1);
        }
      }
    }
    if (document.activeElement !== gameCtn) {
      drawOOF(context);
    }
  }
  function drawQueue(context, queue) {
    context.fillStyle = get_colour(0 /* _ */);
    context.fillRect(0, 0, 4, 14);
    let preview = queue.preview();
    for (let i = 0; i < Math.min(preview.length, 5); i++) {
      let shiftX = 0;
      let shiftY = 0;
      if (preview[i] != 2 /* I */ && preview[i] != 7 /* O */) {
        shiftX = 0.5;
      }
      if (preview[i] == 2 /* I */) {
        shiftY = 0.5;
      }
      drawPiece(
        context,
        new TetrisBoardPiece(1 + shiftX, 12 - 3 * i + shiftY, preview[i], 0 /* spawn */)
      );
    }
  }
  function drawHold(context, hold) {
    context.fillStyle = get_colour(0 /* _ */);
    context.fillRect(0, 0, 4, 2);
    if (hold != 0 /* _ */) {
      let shiftX = 0;
      let shiftY = 0;
      if (hold != 2 /* I */ && hold != 7 /* O */) {
        shiftX = 0.5;
      }
      if (hold == 2 /* I */) {
        shiftY = 0.5;
      }
      context.fillStyle = get_colour(hold);
      drawPiece(context, new TetrisBoardPiece(1 + shiftX, shiftY, hold, 0 /* spawn */));
    }
  }
  function drawPiece(context, piece, opacity = "") {
    if (piece.type === 0 /* _ */) return;
    if (opacity === void 0) {
      opacity = "";
    }
    for (let { x, y } of piece.getMinos()) {
      context.fillStyle = get_colour(piece.type) + opacity;
      context.fillRect(x, y, 1, 1);
    }
  }
  function drawFumen(context, fumen, opacity = "", board = null) {
    const page = decodeWrapper(fumen)[0];
    const field = page.field.str({ reduced: true, garbage: false }).split("\n").toReversed();
    for (let row = 0; row < field.length; row++) {
      for (let col = 0; col < PCSIZE; col++) {
        if (board !== null && board.isFilled(row, col)) {
          continue;
        }
        const cell = field[row][col];
        const index = PieceEnum[cell];
        context.fillStyle = get_colour(index) + opacity;
        context.fillRect(col, row, 1, 1);
      }
    }
  }
  function drawOOF(context) {
    let transform = context.getTransform();
    context.resetTransform();
    context.font = `bold ${CELL_SIZE + 5}px Arial`;
    context.fillStyle = "rgba(235, 203, 139, 0.7)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("OUT OF FOCUS", context.canvas.width / 2, context.canvas.height / 2);
    context.setTransform(transform);
  }
  pycmd("");
})();
