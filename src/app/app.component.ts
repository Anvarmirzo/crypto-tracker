import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto';
  selectedCurrency = 'inr';

  constructor() {
  }

  sendCurrency(val: MatSelectChange) {
    console.log(val)
  }
}
