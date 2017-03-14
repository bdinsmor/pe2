import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

import { TdMediaService } from '@covalent/core';

import { Player } from '../../../services';

@Component({
  selector: 'qs-player-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class PlayersFormComponent implements OnInit, OnDestroy, AfterViewInit {

  displayName: string;
  email: string;
  id: string;
  admin: boolean;
  player: Player;
  action: string;
  image: string;
  playerSubscription: any;

  constructor(public af: AngularFire,
    private _route: ActivatedRoute,
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
      let playerId: string = params.id;
      this.loadPlayer(playerId);
      /*this._playersService.get(playerId).subscribe((player: any) => {
        this.displayName = player.displayName;
        this.email = player.email;
        this.admin = (player.siteAdmin === 1 ? true : false);
        this.id = player.id;
      });*/
    });
  }

  loadPlayer(id: string) {

    this.playerSubscription = this.af.database.object('/players/' + id)
      .subscribe((data) => {
        console.log("data: " + JSON.stringify(data, null, 2));
        this.player = toPlayer(id, data);
        this.displayName = this.player.name;
        this.email = this.player.email;
        this.id = id;
      });

  }

  ngOnDestroy() {
    // console.log("destroying players...");
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
  }

  save(): void {
    let siteAdmin: number = (this.admin ? 1 : 0);
    let now: Date = new Date();
    this.player = <Player>({
      name: this.displayName,
      email: this.email,
      description: '',
      year: 2017,
      season: 'Spring',
      admin: siteAdmin,
      id: this.id || this.displayName.replace(/\s+/g, '.'),
      birthdate: now,
      phone: '',
      image: ''
    });
    console.log("this id: " + this.id);
    this.af.database.object('/players/' + this.id).update(this.player)
      .then(_ => {
        console.log("Updated");
        this.goBack();
      })
      .catch(err => console.log(err, "Failed"));
    /*if (this.action === 'add') {
      this._playersService.create(this.player).subscribe(() => {
        this.goBack();
      });
    } else {
      this._playersService.update(this.id, this.player).subscribe(() => {
        this.goBack();
      });
    }*/
  }
}


function toPlayer(id: string, r: any): Player {

  let json = r;
  return <Player>({
    id: id,
    name: json.name,
    email: json.email,
    phone: json.phone,
    image: json.image,
    description: json.description,
    birthdate: json.birthDate,
    year: json.year,
    season: json.season
  });
}