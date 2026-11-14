import BuildItem from '@civ-clone/core-city-build/BuildItem';
import City from '@civ-clone/core-city/City';
import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import isHuman from './isHuman';

/**
 * For a `BuildCostModifier` rule's criterion: the city building is a computer player's. A build item with no city (a
 * cost asked in general) is nobody's, so it's not.
 */
export const isComputerCity =
  (
    clientRegistry: ClientRegistry
  ): ((buildItem: BuildItem, city: City | null) => boolean) =>
  (buildItem: BuildItem, city: City | null): boolean =>
    city !== null && !isHuman(city.player(), clientRegistry);

/**
 * For a `BuildCostModifier` rule's effect: the cost times `ratio()` tenths, rounded to the nearest whole number. `ratio`
 * is asked each time, so it reads the level the game is at when the cost is asked.
 */
export const computerBuildCost =
  (
    ratio: () => number
  ): ((buildItem: BuildItem, city: City | null, cost: number) => number) =>
  (buildItem: BuildItem, city: City | null, cost: number): number =>
    Math.round((cost * ratio()) / 10);
