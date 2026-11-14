# base-difficulty

What a ruleset's difficulty rules share. It's a library: no `main`, nothing registered.

- `lib/isHuman`: `isHuman(player, clients)`, whether a person plays `player`. A player with no client isn't a person's.
- `lib/level`: `levelOf(game.difficulty, DefaultLevel)`, the game's level, or `DefaultLevel`'s when none is set.
- `lib/buildCost`: for a `BuildCostModifier` rule, `isComputerCity(clients)` (the criterion) and
  `computerBuildCost(ratio)` (the effect: the cost times `ratio()` tenths, rounded).

The levels themselves are the `base-difficulty-*` classes; each ruleset registers the ones it offers.
