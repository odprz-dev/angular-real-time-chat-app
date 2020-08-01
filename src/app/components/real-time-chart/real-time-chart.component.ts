import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.scss']
})
export class RealTimeChartComponent implements OnInit {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }];

  constructor(public signalService: SignalrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.signalService.startConnection();
    this.signalService.addTransferChartDataListener();
    this.startHttpRequest();

    this.signalService.addBroadcastChartDataListener();

  }

  startHttpRequest() {
    this.http.get('https://localhost:44339/api/chart')
      .subscribe(result => {
        console.log(result+' !!!!Server response!!!');
      });
  }



  // Comunicacion bidireccional

  chartClicked(e){
    console.log(e);
    this.signalService.broadcastChartData();
  }

}
