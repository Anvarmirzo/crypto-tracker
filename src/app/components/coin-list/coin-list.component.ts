import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ICurrency} from "../../models";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {CurrencyService} from "../../service/currency.service";

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  bannerData: ICurrency[] = [];
  currency = 'USD';
  dataSource!: MatTableDataSource<ICurrency>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private currencyService: CurrencyService) {
  }


  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe({
      next: data => {
        this.currency = data;
        this.getAllData();
        this.getBannerData();
      }
    })
  }

  ngAfterViewInit() {
  }

  getAllData() {
    this.api.getCurrency(this.currency).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe({
      next: data => {
        this.bannerData = data;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  gotoDetails(row: { id: string }) {
    this.router.navigate(['coin-detail', row.id])
  }
}
