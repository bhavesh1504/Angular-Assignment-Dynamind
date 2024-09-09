import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Assignment-Dynamind';

  chartOptions: any;  // Holds the chart configuration data

  // This method is triggered when the form component emits data
  onChartDataReceived(chartOptions: any) {
    this.chartOptions = chartOptions;
  }
}
