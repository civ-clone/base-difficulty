"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelOf = void 0;
/**
 * The `level()` of the game's difficulty, or of `DefaultLevel` when no level is set (a game a host started without
 * asking, or a test). Each ruleset chooses the level such a game plays at.
 */
const levelOf = (gameDifficultyRegistry, DefaultLevel) => { var _a; return ((_a = gameDifficultyRegistry.get()) !== null && _a !== void 0 ? _a : DefaultLevel).level(); };
exports.levelOf = levelOf;
exports.default = exports.levelOf;
//# sourceMappingURL=level.js.map