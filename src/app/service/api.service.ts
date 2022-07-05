import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICurrency, ITrendingCurrency} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://api.coingecko.com/api/v3/coins';

  constructor(private http: HttpClient) {
  }

  getCurrency(currency: string) {
    return this.http.get<ICurrency[]>(`${this.baseUrl}/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }

  getTrendingCurrency(currency: string) {
    return this.http.get<ITrendingCurrency[]>(`${this.baseUrl}/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&price_change_percentage=24h&per_page=10&page=1`);
  }

  getGraphicalData(coinId: string, currency: string, days: string) {
    return this.http.get<{ prices: number[][] }>(`${this.baseUrl}/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  }

  getCurrencyById(coinId: string) {
    return this.http.get<ICurrency>(`${this.baseUrl}/${coinId}`);
  }
}

