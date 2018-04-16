import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { LoginService } from './services/login.service';
import { OkexwsService } from './services/okexws.service';
import { LangService } from './services/lang.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent],
  providers: [SessionService, LoginService, OkexwsService, LangService]
})
export class AppModule { }
