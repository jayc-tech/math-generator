import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    FileSaverModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
