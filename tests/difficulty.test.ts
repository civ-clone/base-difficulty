import { computerBuildCost, isComputerCity } from '../lib/buildCost';
import AIClient from '@civ-clone/core-ai-client/AIClient';
import BuildItem from '@civ-clone/core-city-build/BuildItem';
import City from '@civ-clone/core-city/City';
import Client from '@civ-clone/core-client/Client';
import ClientRegistry from '@civ-clone/core-client/ClientRegistry';
import Difficulty from '@civ-clone/core-difficulty/Difficulty';
import GameDifficultyRegistry from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import Player from '@civ-clone/core-player/Player';
import { expect } from 'chai';
import isHuman from '../lib/isHuman';
import levelOf from '../lib/level';

class Easy extends Difficulty {
  static level(): number {
    return 0;
  }
}

class Middle extends Difficulty {
  static level(): number {
    return 3;
  }
}

class Hard extends Difficulty {
  static level(): number {
    return 4;
  }
}

const cityOf = (player: Player): City =>
    ({ player: (): Player => player } as unknown as City),
  item = {} as BuildItem;

describe('isHuman', (): void => {
  it("is true only for a player whose clients aren't a computer player's", (): void => {
    const clientRegistry = new ClientRegistry(),
      human = new Player(),
      computer = new Player(),
      unattached = new Player(),
      both = new Player();

    clientRegistry.register(
      new Client(human),
      new AIClient(computer),
      new Client(both),
      new AIClient(both)
    );

    expect(isHuman(human, clientRegistry)).true;
    expect(isHuman(computer, clientRegistry)).false;
    expect(isHuman(unattached, clientRegistry)).false;
    expect(isHuman(both, clientRegistry)).false;
  });
});

describe('levelOf', (): void => {
  it('is the default level until one is set, then the one set', (): void => {
    const gameDifficultyRegistry = new GameDifficultyRegistry();

    expect(levelOf(gameDifficultyRegistry, Middle)).equal(3);

    gameDifficultyRegistry.set(Hard);

    expect(levelOf(gameDifficultyRegistry, Middle)).equal(4);
    expect(levelOf(gameDifficultyRegistry, Easy)).equal(4);
  });
});

describe('isComputerCity', (): void => {
  it("is true for a computer player's city, false for a person's, a client-less player's and no city", (): void => {
    const clientRegistry = new ClientRegistry(),
      human = new Player(),
      computer = new Player();

    clientRegistry.register(new Client(human), new AIClient(computer));

    const computerCity = isComputerCity(clientRegistry);

    expect(computerCity(item, cityOf(computer))).true;
    expect(computerCity(item, cityOf(human))).false;
    // No client yet: not a person's, so it pays the computer's cost, as civ1-difficulty does.
    expect(computerCity(item, cityOf(new Player()))).true;
    expect(computerCity(item, null)).false;
  });
});

describe('computerBuildCost', (): void => {
  // civ1-difficulty's ratio, 16 - 2 × level: these are its costs today (`tests/difficulty.test.ts` there).
  const civ1Ratio = (level: number) => () => 16 - 2 * level;

  it("gives Civ1's computer costs: 160% on Chieftain down to 80% on Emperor", (): void => {
    expect(computerBuildCost(civ1Ratio(0))(item, null, 10)).equal(16);
    expect(computerBuildCost(civ1Ratio(0))(item, null, 40)).equal(64);
    expect(computerBuildCost(civ1Ratio(4))(item, null, 40)).equal(32);
    expect(computerBuildCost(civ1Ratio(3))(item, null, 30)).equal(30);
  });

  it('rounds to the nearest whole number, halves up', (): void => {
    expect(computerBuildCost(() => 13)(item, null, 5)).equal(7); // 6.5
    expect(computerBuildCost(() => 9)(item, null, 7)).equal(6); // 6.3
    expect(computerBuildCost(() => 9)(item, null, 5)).equal(5); // 4.5
  });

  it('asks the ratio each time', (): void => {
    let ratio = 10;
    const cost = computerBuildCost(() => ratio);

    expect(cost(item, null, 40)).equal(40);

    ratio = 15;

    expect(cost(item, null, 40)).equal(60);
  });
});
