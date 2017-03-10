import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Md2Datepicker } from 'md2';
import { TdMediaService } from '@covalent/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { ILineup, IPlayer, IPlayerInning, IPosition, IInning, IGamePlayer, LineupsService } from '../../../services';

@Component({
  selector: 'qs-lineup-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [LineupsService],
})
export class LineupsFormComponent implements OnInit, AfterViewInit {

  name: string;
  description: string;
  id: string;
  finished: boolean;
  lineup: ILineup;
  opponentName: string;
  field: string;
  date: Date;
  playing: IGamePlayer[];
  notPlaying: IPlayer[];
  action: string;
  positions: IPosition[];
  innings: IInning[];

  constructor(public af: AngularFire,
    private _route: ActivatedRoute,
    private _lineupsService: LineupsService,
    public media: TdMediaService) { }

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
      this.loadLineup();
    });
  }

  loadLineup() {
    this._lineupsService.getPositions()
      .subscribe((positionData) => {
         
        this.positions = positionData.map(this.toPosition);
        console.log("positions:" + JSON.stringify(this.positions, null, 2));
      });
    this._lineupsService.getInnings()
      .subscribe((data) => {
        this.innings = data.map(this.toInning);
        this._lineupsService.getPlayers()
          .subscribe((playerData) => {
            console.log("playerData:" + JSON.stringify(playerData, null, 2));
            this.playing = playerData.map(this.toGamePlayer);
          })
      });


    this.af.database.object('/lineups/' + this.id)
      .subscribe((data) => {
        if (data) {
          this.lineup = this.toLineup(this.id, data);
          this.opponentName = data.opponentName;
          this.date = data.date;
        }
        //console.log("data: " + JSON.stringify(data, null, 2));

      });
  }

  toLineup(id, data) {
    return null;
  }

  toPosition(data) {
    return <IPosition>({
      id: data.id,
      label: data.label,
      name: data.name,
      abbreviation: data.abbreviation,
    });
  }

  toInning(data) {
    return <IInning>({
      id: data.id,
      label: data.label,
      abbreviation: data.abbreviation,
      name: data.name,
      sortValue: data.sortValue,
    });
  }

  getPlayerInnings() {
    let inn = new Array<IPlayerInning>();
    for (let i = 0; i < this.innings.length; i++) {
      inn.push(<IPlayerInning>({
        id: '',
        inning: this.innings[i],
        position: null,
      }))
    }
    return inn;
  }

  toGamePlayer(data): IGamePlayer {
    return <IGamePlayer>({
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
      positions: null
    });
  };

  save(): void {
    let gameFinished: number = (this.finished ? 1 : 0);
    let now: Date = new Date();
    this.lineup = <ILineup>({
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

