import { Injectable } from '@angular/core';
import { ChartModel } from '../models/models';
import * as signalR from '@aspnet/signalr';

const HUB_URL = 'https://localhost:44339/';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }


  data: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = ()=> {
    this.hubConnection = new signalR.HubConnectionBuilder()
                          .withUrl(HUB_URL+'chart')
                          .build();

    this.hubConnection.start()
                      .then( () => console.log('Connection Started'))
                      .catch(err => console.log('Error mientras se establecia la coneccion'));
  }

  public addTransferChartDataListener = ()=>{
    this.hubConnection.on('transferChartData',(data)=>{
      this.data = data;
      console.log(data);
    });
  }


  // Transmitir datos
  public broadcastData: ChartModel[];

  public broadcastChartData =()=>{

    const data = this.data.map(e=>{
      const temp = {
        data: e.data,
        label: e.label
      }
      return temp;
    });

    this.hubConnection.invoke('broadcastchartdata',data)
    .catch(err => console.log(err));
  }

  public addBroadcastChartDataListener =() =>{
    this.hubConnection.on('broadcastchartdata', (data)=>{
      this.broadcastChartData = data;
    });
  }


}
