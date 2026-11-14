import Difficulty from '@civ-clone/core-difficulty/Difficulty';
import { GameDifficultyRegistry } from '@civ-clone/core-difficulty/GameDifficultyRegistry';
/**
 * The `level()` of the game's difficulty, or of `DefaultLevel` when no level is set (a game a host started without
 * asking, or a test). Each ruleset chooses the level such a game plays at.
 */
export declare const levelOf: (
  gameDifficultyRegistry: GameDifficultyRegistry,
  DefaultLevel: typeof Difficulty
) => number;
export default levelOf;
