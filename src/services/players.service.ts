import { IPosition, IPlayerInning, IInning } from './lineups.service';

export class IPlayer {
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

}

export class IGamePlayer {
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
  positions: IPlayerInning[];
  hitting: IAtBat[];

}

export class IAtBat {
  inning: IInning;
  pitches: number;
  scored: number;
  hittype: IHitType;
  totalbases: number;
  strikeout: number;  // yes/no
  fouls: number;
}

export class IHitType {
  label: string; // single, double, triple, homerun, flyout, groundout
  bases: number;
  position: IPosition; // where did the hit go
  out: number; // get out or on base?

}

