import { Component, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { single, multi, multi2 } from './data';
import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { ItemsService, PlayersService } from '../../../services';

@Component({
  selector: 'qs-product-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  viewProviders: [ ItemsService, PlayersService ],
})
export class ProductOverviewComponent implements AfterViewInit {

  items: Object[];
  players: Object[];

  // Chart
  single: any[];
  multi: any[];
  multi2: any[];

  // Generic Chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  autoScale: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  orangeColorScheme: any = {
    domain: [
      '#E64A19', '#F57C00', '#FFA726', '#FFB74D', '#FFCC80',
    ],
  };

  blueColorScheme: any = {
    domain: [
      '#01579B', '#00B0FF', '#80D8FF', '#E1F5FE',
    ],
  };

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _playersService: PlayersService,
              private _loadingService: TdLoadingService) {
                // Chart Single
                Object.assign(this, {single});
                // Chart Multi
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
                // Chart Multi2
                this.multi2 = multi2.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Product Name' );

    this._loadingService.register('items.load');
    this._itemsService.query().subscribe((items: Object[]) => {
      this.items = items;
      setTimeout(() => {
        this._loadingService.resolve('items.load');
      }, 2000);
    }, (error: Error) => {
      this._itemsService.staticQuery().subscribe((items: Object[]) => {
        this.items = items;
        setTimeout(() => {
          this._loadingService.resolve('items.load');
        }, 2000);
      });
    });
    this._loadingService.register('players.load');
    this._playersService.query().subscribe((players: Object[]) => {
      this.players = players;
      setTimeout(() => {
        this._loadingService.resolve('players.load');
      }, 2000);
    }, (error: Error) => {
      this._playersService.staticQuery().subscribe((players: Object[]) => {
        this.players = players;
        setTimeout(() => {
          this._loadingService.resolve('players.load');
        }, 2000);
      });
    });
  }
  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}