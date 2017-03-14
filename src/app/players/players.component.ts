import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { Player, Inning, Position } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'qs-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy, AfterViewInit {
  items: FirebaseListObservable<any>;
  players: Player[];
  filteredPlayers: Player[] = new Array<Player>();
  playersSubscription: any;


  constructor(private _titleService: Title,
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MdSnackBar,
    public af: AngularFire,
    public media: TdMediaService) {
    this.players = new Array<Player>();




    //  console.log("inside constructor...");
  }

  loadData() {
    this._loadingService.register('players.list');
    this.playersSubscription = this.af.database.list('/players').subscribe(players => {

      this.filteredPlayers = players.map(toPlayer);
      console.log('players: ' + JSON.stringify(this.filteredPlayers, null, 2));
      this.players = this.filteredPlayers;
      this._loadingService.resolve('players.list');

    }, (error: Error) => {
      console.log('ERROR: ', error);
    });
  }



  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle('Ponytail Express Players');
    this.loadData();

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // console.log("destroying players...");
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
  }

  search(displayName: string = ''): void {

    this.filteredPlayers = this.players.filter((player: Player) => {
      return player.name.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  createLineupData(): void {
    for (let i: number = 1; i <= 6; i++) {
      let inning: Inning = <Inning>({
        label: i.toString(),
        name: i.toString(),
        abbreviation: i.toString(),
        sortValue: i
      })
      this.af.database.list('/innings').push(inning);
    }
    for (let i: number = 0; i <= 10; i++) {
      this.af.database.list('/positions10').push(toPosition(10,i));
    }
    for (let i: number = 0; i <= 9; i++) {
      this.af.database.list('/positions9').push(toPosition(9,i));
    }
  }



  createPlayers(): void {

    this.items = this.af.database.list('/players');
    for (let i = 0; i < 10; i++) {
      let player = <Player>({
        name: 'Player ' + i,
        email: 'player' + i + '@gmail.com',
        phone: '703-349-9059',
        image: '',
        description: '',
        birthdate: new Date(),
        year: 2017,
        season: 'Spring'
      });
      this.items.push(player);
    }
  }



  deletePlayer(id: string): void {
    this._dialogService
      .openConfirm({ message: 'Are you sure you want to delete this player?' })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this._loadingService.register('players.list');
          /*this._playersService.delete(id).subscribe(() => {
            this.players = this.players.filter((player: IPlayer) => {
              return player.id !== id;
            });
            this.filteredPlayers = this.filteredPlayers.filter((player: IPlayer) => {
              return player.id !== id;
            });
            this._loadingService.resolve('players.list');
            this._snackBarService.open('Player deleted', 'Ok');
          }, (error: Error) => {
            this._dialogService.openAlert({message: 'There was an error'});
            this._loadingService.resolve('players.list');
          });*/
        }
      });
  }

}

function toPlayer(json: any): Player {
  //console.log("json: " + JSON.stringify(json,null,2));
  return <Player>({
    id: json.$key,
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

function toPosition(total: number, num: number): Position {
  if (total === 10) {
    switch (num) {
      case 0:
        return <Position>({ id: '', sortValue: 0, abbreviation: "BN", restricted: 0, name: "Bench", label: 'Bench' });
      case 1:
        return <Position>({ id: '', sortValue: 1, abbreviation: "P", restricted: 0, name: "Pitcher", label: 'Pitcher' });
      case 2:
        return <Position>({ id: '', sortValue: 2, abbreviation: "C", restricted: 0, name: "Catcher", label: 'Catcher' });
      case 3:
        return <Position>({ id: '', sortValue: 3, abbreviation: "1B", restricted: 0, name: "1st Base", label: 'First Base' });
      case 4:
        return <Position>({ id: '', sortValue: 4, abbreviation: "2B", restricted: 0, name: "2nd Base", label: '2nd Base' });
      case 5:
        return <Position>({ id: '', sortValue: 5, abbreviation: "3B", restricted: 0, name: "3rd Base", label: '3rd Base' });
      case 6:
        return <Position>({ id: '', sortValue: 6, abbreviation: "SS", restricted: 0, name: "Shortstop", label: 'Shortstop' });
      case 7:
        return <Position>({ id: '', sortValue: 7, abbreviation: "LF", restricted: 0, name: "Left Field", label: 'Left Field' });
      case 8:
        return <Position>({ id: '', sortValue: 8, abbreviation: "LCF", restricted: 0, name: "Left Center Field", label: 'Left Center Field' });
      case 9:
        return <Position>({ id: '', sortValue: 9, abbreviation: "RCF", restricted: 0, name: "Right Center Field", label: 'Right Center Field' });
      case 10:
        return <Position>({ id: '', sortValue: 10, abbreviation: "RF", restricted: 0, name: "Right Field", label: 'Right Field' });
      default:
        return <Position>({ id: '', sortValue: 0, abbreviation: "BN", restricted: 0, name: "Bench", label: 'Bench' });
    }
  } else {
    switch (num) {
      case 0:
        return <Position>({ id: '', sortValue: 0, abbreviation: "BN", restricted: 0, name: "Bench", label: 'Bench' });
      case 1:
        return <Position>({ id: '', sortValue: 1, abbreviation: "P", restricted: 0, name: "Pitcher", label: 'Pitcher' });
      case 2:
        return <Position>({ id: '', sortValue: 2, abbreviation: "C", restricted: 0, name: "Catcher", label: 'Catcher' });
      case 3:
        return <Position>({ id: '', sortValue: 3, abbreviation: "1B", restricted: 0, name: "1st Base", label: 'First Base' });
      case 4:
        return <Position>({ id: '', sortValue: 4, abbreviation: "2B", restricted: 0, name: "2nd Base", label: '2nd Base' });
      case 5:
        return <Position>({ id: '', sortValue: 5, abbreviation: "3B", restricted: 0, name: "3rd Base", label: '3rd Base' });
      case 6:
        return <Position>({ id: '', sortValue: 6, abbreviation: "SS", restricted: 0, name: "Shortstop", label: 'Shortstop' });
      case 7:
        return <Position>({ id: '', sortValue: 7, abbreviation: "LF", restricted: 0, name: "Left Field", label: 'Left Field' });
      case 8:
        return <Position>({ id: '', sortValue: 8, abbreviation: "LCF", restricted: 0, name: "Center Field", label: 'Center Field' });
      case 9:
        return <Position>({ id: '', sortValue: 9, abbreviation: "RF", restricted: 0, name: "Right Field", label: 'Right Field' });
      default:
        return <Position>({ id: '', sortValue: 0, abbreviation: "BN", restricted: 0, name: "Bench", label: 'Bench' });
    }
  }

}
