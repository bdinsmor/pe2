import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Md2Datepicker } from 'md2';
import { TdMediaService, IStepChangeEvent } from '@covalent/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DragulaService } from 'ng2-dragula';

import { Lineup, Player, PlayerInning, Position, Inning, GameInning, GamePlayer, LineupsService } from '../../../services';

@Component({
  selector: 'qs-lineup-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [LineupsService],
})
export class LineupsFormComponent implements OnInit, AfterViewInit {

  name: string;
  displayName: string = "New Lineup";
  description: string;
  id: string;
  finished: boolean;
  lineup: Lineup;
  opponentName: string;
  field: string;
  date: Date = new Date();
  playing: GamePlayer[];
  notPlaying: Player[];
  action: string;
  positions: Position[];
  innings: Inning[];
  playingInnings: GameInning[];

  constructor(public af: AngularFire,
    private _route: ActivatedRoute,
    public _lineupsService: LineupsService,
    private dragulaService: DragulaService,
    public media: TdMediaService) {}

swap(list:Array<GamePlayer>, a: number, b: number) {
    if (a < 0 || a >= list.length || b < 0 || b >= list.length) {
        return list;
    }

    const temp = list[a];
    list[a] = list[b];
    list[b] = temp;

}

  goBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: { id: string }) => {
      let lineupId: string = params.id;
      this.id = lineupId;
      this.date = new Date();
      this.loadLineup();
    });
  }

  stepChange(event: IStepChangeEvent): void {

  }

  moveDown(currentIndex:number, list:Array<GamePlayer>) {
    this.swap(list, currentIndex, (currentIndex+1));
    
  }
  moveUp(currentIndex:number, list:Array<GamePlayer>) {
    this.swap(list, currentIndex, (currentIndex-1));
    
  }

  loadLineup() {
    this._lineupsService.getPositions()
      .subscribe((positionData) => {

        this.positions = positionData.map(this.toPosition);
      //  console.log("positions:" + JSON.stringify(this.positions, null, 2));
      });
    this._lineupsService.getInnings()
      .subscribe((data) => {
        this.innings = data.map(this.toInning);
        this._lineupsService.getPlayers()
          .subscribe((playerData) => {
            console.log("playerData:" + JSON.stringify(playerData, null, 2));
            this.playing = playerData.map(this.toGamePlayer);
            this.playingInnings = this.createGameInning();
          })
      });


    this.af.database.object('/lineups/' + this.id)
      .subscribe((data) => {
        if (data) {
          this.lineup = this.toLineup(this.id, data);
          this.opponentName = data.opponentName;
          if (data.date) {
            this.date = data.date;
          }

        }
        //console.log("data: " + JSON.stringify(data, null, 2));

      });
  }

  toLineup(id, data) {
    return null;
  }

  toPosition(data) {
    return <Position>({
      id: data.id,
      label: data.label,
      name: data.name,
      abbreviation: data.abbreviation,
    });
  }

  toInning(data) {
    return <Inning>({
      id: data.id,
      label: data.label,
      abbreviation: data.abbreviation,
      name: data.name,
      sortValue: data.sortValue,
    });
  }

  getPlayerInnings() {
    let inn = new Array<PlayerInning>();
    for (let i = 0; i < this.innings.length; i++) {
      inn.push(<PlayerInning>({
        id: '',
        inning: this.innings[i],
        position: null,
      }))
    }
    return inn;
  }

  toGamePlayer(data): GamePlayer {
    let playerPositions = LineupsService.createPlayerInnings();
    return <GamePlayer>({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: '',
      description: '',
      birthdate: data.birtdate,
      year: data.season,
      season: data.season,
      admin: data.admin,
      color: data.color,
      textColor: data.textColor,
      positions: playerPositions,
    });
  };

  save(): void {
    let gameFinished: number = (this.finished ? 1 : 0);
    let now: Date = new Date();
    this.lineup = <Lineup>({
      id: this.id,
      name: this.name,
      description: this.description,
      opponentName: '',
      playing: this.playing,
      notPlaying: this.notPlaying,
      field: this.field,
      finished: gameFinished,
      date: now,
    });
    if (this.action === 'add') {

    } else {

    }
  }
}


