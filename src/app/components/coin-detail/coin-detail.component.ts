import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {ICurrency} from "../../models";

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {
  coinData!: ICurrency;
  coinId!: string;
  imgURL = '';
  description?: string;
  currentPrice = 0;
  marketCap = 0;
  days = 1;
  currency = 'USD';

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.coinId = params['id'];
        this.getCoinData();
      }
    })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe({
      next: (data) => {
        this.coinData = data;
        this.currentPrice = data.market_data?.current_price.btc || 0
        this.marketCap = data.market_data?.market_cap.btc || 0
        this.description = data?.description?.en.split('. ')[0]
        if (typeof data.image === 'string') {
          this.imgURL = data.image
        } else {
          this.imgURL = data.image.large
        }
      }
    })
  }
}
