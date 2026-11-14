"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computerBuildCost = exports.isComputerCity = void 0;
const isHuman_1 = require("./isHuman");
/**
 * For a `BuildCostModifier` rule's criterion: the city building is a computer player's. A build item with no city (a
 * cost asked in general) is nobody's, so it's not.
 */
const isComputerCity = (clientRegistry) => (buildItem, city) => city !== null && !(0, isHuman_1.default)(city.player(), clientRegistry);
exports.isComputerCity = isComputerCity;
/**
 * For a `BuildCostModifier` rule's effect: the cost times `ratio()` tenths, rounded to the nearest whole number. `ratio`
 * is asked each time, so it reads the level the game is at when the cost is asked.
 */
const computerBuildCost = (ratio) => (buildItem, city, cost) => Math.round((cost * ratio()) / 10);
exports.computerBuildCost = computerBuildCost;
//# sourceMappingURL=buildCost.js.map