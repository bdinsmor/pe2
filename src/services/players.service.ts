import { Position, PlayerInning, Inning } from './lineups.service';

export class Player {
  name: string;
  email: string;
  phone: string;
  image: string;
  description: string;
  birthdate: Date;
  year: number;
  season: string;
  id: string;
  admin: number;
  color: string;
  textColor: string;
  constructor() {
    this.name = 'Brian';
  }
}

export class GamePlayer {
  name: string;
  email: string;
  phone: string;
  image: string;
  description: string;
  birthdate: Date;
  year: number;
  season: string;
  id: string;
  admin: number;
  positions: PlayerInning[];
  hitting: AtBat[];
  color: string;
  textColor: string;
  constructor() {
    this.name = 'Brian';
  }
}

export class AtBat {
  inning: Inning;
  pitches: number;
  scored: number;
  hittype: HitType;
  totalbases: number;
  strikeout: number;  // yes/no
  fouls: number;
}

export class HitType {
  label: string; // single, double, triple, homerun, flyout, groundout
  bases: number;
  position: Position; // where did the hit go
  out: number; // get out or on base?

}

