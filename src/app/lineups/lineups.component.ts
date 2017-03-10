import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { ILineup, IGamePlayer, IInning } from '../../services';

@Component({
  selector: 'qs-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.scss'],
})
export class LineupsComponent implements AfterViewInit {
  items: FirebaseListObservable<any>;
  lineups: ILineup[];
  filteredLineups: ILineup[];
  lineupSubscription:any;

  constructor(private _titleService: Title,
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MdSnackBar,
    public af: AngularFire,
    public media: TdMediaService) {
     this.lineups = new Array<ILineup>();
  }

  loadData() {
    this._loadingService.register("lineups.list");
    this.lineupSubscription = this.af.database.list('/lineups').subscribe(lineups => {
      
      this.filteredLineups = lineups.map(toLineup);
      console.log("lineups: " + JSON.stringify(this.filteredLineups,null,2));
      this.lineups = this.filteredLineups;
      this._loadingService.resolve("lineups.list");

    }, (error: Error) => {
      console.log("ERROR: ", error);
    });
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle('Ponytail Express Lineups');
    this.loadData();
    
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
   // console.log("destroying players...");
    if (this.lineupSubscription) {
      this.lineupSubscription.unsubscribe();
    }
  }

  search(name: string = ''): void {
    this.filteredLineups = this.lineups.filter((lineup: ILineup) => {
      return lineup.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
  }

  loadPlayers(): void {
    
    this._loadingService.register('lineups.list');
    
  }

  createPlayers(): void {
    this.items = this.af.database.list('/lineups');
    for (let i = 0; i < 10; i++) {
      let lineup = <ILineup>({
        name: 'Player ' + i,
        opponentName: 'Opponent ' + i,
        description: '',
        date: new Date(),
        year: 2017,
        season: 'Spring',
        id: "Player" + i,
        playing: null,
        notPlaying: null,
        finished: 0,
      });
      this.items.push({ lineup: lineup });
    }
  }



  deletePlayer(id: string): void {
    this._dialogService
      .openConfirm({ message: 'Are you sure you want to delete this lineup?' })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this._loadingService.register('lineups.list');
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

function toLineup(json: any): ILineup {
  
 // console.log("r: " + JSON.stringify(r,null,2));
  return <ILineup>({
    name: json.name,
    description: json.description,
    opponentName: json.opponentName,
    date: json.date,
    year: json.year,
    season: json.season,
    id: json.$key,
    finished: json.finished,
    playing: toGamePlayers(json.playing),
    notPlaying: toGamePlayers(json.notPlaying),
  });
}

function toGamePlayers(players) {
  return players.map(toGamePlayer);
}

function toGamePlayer(player) {
  return <IGamePlayer>({
    id: player.$key,
    name: player.name,
    email: player.email,
    phone: player.phone,
    image: player.image,
    description: player.description,
    birthdate: player.birthDate,
    year: player.year,
    season: player.season,
    innings: player.innings,
  });
}
