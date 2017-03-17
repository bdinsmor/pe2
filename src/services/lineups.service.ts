import { Injectable } from '@angular/core';
import { GamePlayer } from './players.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export class Lineup {
  name: string;
  id: string;
  description: string;
  date: Date;
  opponentName: string;
  finished: number;
  playing: GamePlayer[];
  notPlaying: GamePlayer[];
  constructor() {
    this.playing = new Array<GamePlayer>();
    this.notPlaying = new Array<GamePlayer>();
  }
}

export class Position {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue: number;
  restricted: number;
}


export class GamePosition {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue: number;
  restricted: number;
  player: GamePlayer;
  constructor() {
    this.player = new GamePlayer();
  }
}

export class Inning {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue: number;
  constructor() {
    this.label = '1st';
    this.id = '';
    this.abbreviation = '1st';
    this.name = '1st';
    this.sortValue = 1;
  }
}



export class PlayerInning {
  // keep track of what position the player played this inning
  inning: Inning;
  position: Position;
  constructor() {
    this.inning = new Inning();
    this.position = new Position();
  }
}
export class GameInning {
  inning: Inning;
  positions: Position[];
}

function createGameInning(): GameInning {
 let gi:GameInning = new GameInning();
 return gi;
}

// left off keeping track of what innings have what players, and what positions players are playing for each inning
/*
  * IGameInning - keep track of the inning you are looking at, and which positions it has,

*/

@Injectable()
export class LineupsService {

  constructor(public af: AngularFire) {

  }

  getInnings(): any {
    return this.af.database.list('/innings');
  }

  getPositions(): any {
    return this.af.database.list('/positions10');
  }

  getPlayers(): any {
    return this.af.database.list('/players');
  }

  // tslint:disable-next-line:member-ordering
  static getInning(num: number) {
    let inning: Inning = new Inning();
    inning.label = (num + 1).toString();
    inning.sortValue = num + 1;
    switch (num) {
      case 0:
        inning.abbreviation = '1st';
        break;
      case 1:
        inning.abbreviation = '2nd';
        break;
      case 2:
        inning.abbreviation = '3rd';
        break;
      case 3:
        inning.abbreviation = '4th';
        break;
      case 4:
        inning.abbreviation = '5th';
        break;
      case 5:
        inning.abbreviation = '6th';
        break;
      default:
        inning.abbreviation = '1st';
    }
    return inning;
  }

  static getDefaultPosition() {
    let position: Position = new Position();
    position.abbreviation = 'BN';
    position.sortValue = 0;
    position.name = 'BENCH';
    position.label = 'BN';
    position.restricted = 0;
    return position;
  }

  static createPlayerInnings(): PlayerInning[] {
    let playerInnings: PlayerInning[] = new Array<PlayerInning>();
    for (let i = 0; i <= 6; i++) {
      let pi: PlayerInning = new PlayerInning();
      let inning = this.getInning(i);
      pi.inning = inning;
      pi.position = this.getDefaultPosition();
      playerInnings.push(pi);
    }
    return playerInnings;
  }
}