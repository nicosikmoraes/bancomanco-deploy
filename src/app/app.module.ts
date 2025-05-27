import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { BancoPageComponent } from './banco-page/banco-page.component';

//Register pt-BR locale, usado para formatação de números com o pipe
registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    BancoPageComponent,
  ],

  imports: [
    BrowserModule
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

  bootstrap: [AppComponent]
})


export class AppModule {}