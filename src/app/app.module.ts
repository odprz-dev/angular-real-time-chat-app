import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { RealTimeChartComponent } from './components/real-time-chart/real-time-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    RealTimeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
