import { Component, HostListener } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  templateUrl: 'display.component.html'
})
export class DisplayComponent {

  public current_poll = 1;
  public doughnutChartLabels:string[] = ['Ya', 'Tidak'];
  public doughnutChartData:number[] = [50, 50];
  public doughnutChartType:string = 'doughnut';

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
    width : 1,
    height : 200,
    overflow: true,
  }
 
  data: Array<CloudData> = [
    {text: 'Weight-10-link-color', weight: 10, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10},
    {text: 'woi', weight: 10},
    {text: 'woi', weight: 10},
    {text: 'woi', weight: 10},
    {text: 'woi', weight: 10}
    // ... 
  ]

  constructor() { }

  public next() {
    if(this.current_poll < 5) {
      this.current_poll++
    }
  }

  public previous() {
    if(this.current_poll > 1) {
      this.current_poll--
    }
  }

}

