import { Injectable } from '@angular/core';
import { IPlayer } from './players.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export interface ILineup {
  name: string;
  id: string;
  description: string;
  date: Date;
  opponentName: string;
  finished: number;
  playing: IPlayer[];
  notPlaying: IPlayer[];
}

export interface IPosition {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue:number;
  restricted: number;
}


export interface IGamePosition {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue:number;
  restricted: number;
  player: IPlayer;
}

export interface IInning {
  label: string;
  id: string;
  abbreviation: string;
  name: string;
  sortValue:number;
}
export interface IPlayerInning {
  // keep track of what position the player played this inning
  inning: IInning;
  position: IPosition;
}
export interface IGameInning {
  inning: IInning;
  positions: IPosition[];
}

// left off keeping track of what innings have what players, and what positions players are playing for each inning
/*
  * IGameInning - keep track of the inning you are looking at, and which positions it has,

*/

@Injectable()
export class LineupsService {

  constructor(public af:AngularFire) {

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
}