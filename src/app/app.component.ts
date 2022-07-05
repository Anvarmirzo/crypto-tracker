import {Component} from '@angular/core';
import {CurrencyService} from "./service/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto';
  selectedCurrency = 'USD';

  constructor(private currencyService: CurrencyService) {
  }

  sendCurrency(val: string) {
    this.currencyService.getCurrency().subscribe({
        next: data => {
          console.log(data)
        }
      }
    )
    this.currencyService.setCurrency(val);
  }
}
