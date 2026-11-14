import BuildItem from '@civ-clone/core-city-build/BuildItem';
import City from '@civ-clone/core-city/City';
import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
/**
 * For a `BuildCostModifier` rule's criterion: the city building is a computer player's. A build item with no city (a
 * cost asked in general) is nobody's, so it's not.
 */
export declare const isComputerCity: (
  clientRegistry: ClientRegistry
) => (buildItem: BuildItem, city: City | null) => boolean;
/**
 * For a `BuildCostModifier` rule's effect: the cost times `ratio()` tenths, rounded to the nearest whole number. `ratio`
 * is asked each time, so it reads the level the game is at when the cost is asked.
 */
export declare const computerBuildCost: (
  ratio: () => number
) => (buildItem: BuildItem, city: City | null, cost: number) => number;
