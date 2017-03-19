import { Injectable } from '@angular/core';
import { Player, GamePlayer } from './players.service';
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
  player: Player;
  constructor() {
    this.player = new Player();
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
  constructor(inningNumber) {
    this.inning = new Inning();
    this.positions = new Array<Position>();
  }
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

  // tslint:disable-next-line:member-ordering
  static createPositionInnings(numPlayers): GameInning[] {
    let gameInnings: GameInning[] = new Array<GameInning>();
    for (let i = 0; i < 6; i++) {
      let pi: GameInning = new GameInning(i);
      let inning = this.getInning(i);
      pi.inning = inning;
      pi.positions = this.getDefaultPositions(numPlayers);
      gameInnings.push(pi);
    }
  //  console.log("game innings: " + JSON.stringify(gameInnings,null,2));
    return gameInnings;
  }

  // tslint:disable-next-line:member-ordering
  static getDefaultPositions(numPlayers): Position[] {
    let positions: Position[] = new Array<Position>();
    for (let i = 0; i < numPlayers; i++) {
      if (numPlayers >= 10) {
        positions.push(this.toPosition(10,i));
      } else {
        positions.push(this.toPosition(9,i));
      }
    }
    return positions;
  }

  // tslint:disable-next-line:member-ordering
  static toPosition(total: number, num: number): GamePosition {
    if (total === 10) {
    switch (num) {
      case 0:
        return <GamePosition>({ id: '', sortValue: 0, abbreviation: "BN", restricted: 0, name: 'Bench', label: 'Bench', style: 'bench', player: new Player()  });
      case 1:
        return <GamePosition>({ id: '', sortValue: 1, abbreviation: 'P', restricted: 0, name: 'Pitcher', label: 'Pitcher', style: 'pitcher', player: new Player()  });
      case 2:
        return <GamePosition>({ id: '', sortValue: 2, abbreviation: 'C', restricted: 0, name: 'Catcher', label: 'Catcher', style: 'catcher', player: new Player()  });
      case 3:
        return <GamePosition>({ id: '', sortValue: 3, abbreviation: '1B', restricted: 0, name: '1st Base', label: 'First Base', style:'firstbase', player: new Player()  });
      case 4:
        return <GamePosition>({ id: '', sortValue: 4, abbreviation: '2B', restricted: 0, name: '2nd Base', label: '2nd Base', style: 'secondbase', player: new Player()  });
      case 5:
        return <GamePosition>({ id: '', sortValue: 5, abbreviation: '3B', restricted: 0, name: '3rd Base', label: '3rd Base', style: 'thirdbase', player: new Player()  });
      case 6:
        return <GamePosition>({ id: '', sortValue: 6, abbreviation: 'SS', restricted: 0, name: 'Shortstop', label: 'Shortstop', style: 'shortstop', player: new Player()  });
      case 7:
        return <GamePosition>({ id: '', sortValue: 7, abbreviation: 'LF', restricted: 0, name: 'Left Field', label: 'Left Field', style: 'leftfield', player: new Player()  });
      case 8:
        return <GamePosition>({ id: '', sortValue: 8, abbreviation: 'LCF', restricted: 0, name: 'Left Center Field', label: 'Left Center Field', style: 'leftcenterfield', player: new Player()  });
      case 9:
        return <GamePosition>({ id: '', sortValue: 9, abbreviation: 'RCF', restricted: 0, name: 'Right Center Field', label: 'Right Center Field', style: 'rightcenterfield', player: new Player()  });
      case 10:
        return <GamePosition>({ id: '', sortValue: 10, abbreviation: 'RF', restricted: 0, name: 'Right Field', label: 'Right Field', style:'rightfield', player: new Player()  });
      default:
        return <GamePosition>({ id: '', sortValue: 0, abbreviation: 'BN', restricted: 0, name: 'Bench', label: 'Bench', style:'bench', player: new Player() });
    }
  } else {
    switch (num) {
      case 0:
        return <GamePosition>({ id: '', sortValue: 0, abbreviation: 'BN', restricted: 0, name: 'Bench', label: 'Bench', style: 'bench', player: new Player()  });
      case 1:
        return <GamePosition>({ id: '', sortValue: 1, abbreviation: 'P', restricted: 0, name: 'Pitcher', label: 'Pitcher', style: 'pitcher', player: new Player()  });
      case 2:
        return <GamePosition>({ id: '', sortValue: 2, abbreviation: 'C', restricted: 0, name: 'Catcher', label: 'Catcher', style: 'catcher', player: new Player()  });
      case 3:
        return <GamePosition>({ id: '', sortValue: 3, abbreviation: '1B', restricted: 0, name: '1st Base', label: 'First Base', style:'firstbase', player: new Player()  });
      case 4:
        return <GamePosition>({ id: '', sortValue: 4, abbreviation: '2B', restricted: 0, name: '2nd Base', label: '2nd Base', style: 'secondbase', player: new Player()  });
      case 5:
        return <GamePosition>({ id: '', sortValue: 5, abbreviation: '3B', restricted: 0, name: '3rd Base', label: '3rd Base', style: 'thirdbase', player: new Player()  });
      case 6:
        return <GamePosition>({ id: '', sortValue: 6, abbreviation: 'SS', restricted: 0, name: 'Shortstop', label: 'Shortstop', style: 'shortstop', player: new Player()  });
      case 7:
        return <GamePosition>({ id: '', sortValue: 7, abbreviation: 'LF', restricted: 0, name: 'Left Field', label: 'Left Field', style: 'leftfield', player: new Player()  });
      case 8:
        // tslint:disable-next-line:max-line-length
        return <GamePosition>({ id: '', sortValue: 8, abbreviation: 'CF', restricted: 0, name: 'Center Field', label: 'Center Field', style: 'centerfield', player: new Player()  });
      case 9:
        // tslint:disable-next-line:max-line-length
        return <GamePosition>({ id: '', sortValue: 9, abbreviation: 'RF', restricted: 0, name: 'Right Field', label: 'Right Field', style: 'rightfield', player: new Player()  });
     default:
      return <GamePosition>({ id: '', sortValue: 0, abbreviation: 'BN', restricted: 0, name: 'Bench', label: 'Bench', style:'bench', player: new Player()  });
      }
    }
}
}