import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  bannerData = [];
  currency = 'USD';

  constructor() {
  }

  ngOnInit(): void {
  }

}
