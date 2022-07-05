import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {ICurrency} from "../../models";
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {CurrencyService} from "../../service/currency.service";

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
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: {display: true},
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;


  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.coinId = params['id'];
      }
    })
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency().subscribe({
      next: (data) => {
        this.currency = data;
        this.getGraphData(this.days);
        this.getCoinData()
      }
    })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe({
      next: (data) => {
        this.coinData = data;
        this.description = data?.description?.en.split('. ')[0]
        if (typeof data.image === 'string') {
          this.imgURL = data.image
        } else {
          this.imgURL = data.image.large
        }

        if (this.currency === 'USD') {
          this.currentPrice = data.market_data?.current_price.usd || 0
          this.marketCap = data.market_data?.market_cap.usd || 0
        } else {
          this.currentPrice = data.market_data?.current_price.inr || 0
          this.marketCap = data.market_data?.market_cap.inr || 0
        }

      }
    })
  }

  getGraphData(days: number) {
    this.days = days
    this.api.getGraphicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe({
        next: data => {
          setTimeout(() => {
            this.myLineChart.chart?.update();
          }, 200)
          this.lineChartData.datasets[0].data = data.prices.map((a) => {
            return a[1];
          });
          this.lineChartData.labels = data.prices.map((a) => {
            let date = new Date(a[0]);
            let time = date.getHours() > 12 ?
              `${date.getHours() - 12}: ${date.getMinutes()} PM` :
              `${date.getHours()}: ${date.getMinutes()} AM`
            return this.days === 1 ? time : date.toLocaleDateString();
          })
        }
      });
  }
}
