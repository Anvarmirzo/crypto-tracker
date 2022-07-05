import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CoinDetailComponent} from './components/coin-detail/coin-detail.component';
import {CoinListComponent} from './components/coin-list/coin-list.component';
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    CoinDetailComponent,
    CoinListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
