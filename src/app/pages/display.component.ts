import { Component, HostListener } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ContentService } from '../services/content.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
	templateUrl: 'display.component.html'
})
export class DisplayComponent {

	public current_poll = 2;

	public doughnutChartLabels:string[] = ['Ya', 'Tidak'];
	public doughnutChartData:number[] = [50, 50];
	public doughnutChartType:string = 'doughnut';

	options: CloudOptions = {
		// if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
		width : 1,
		height : 200,
		overflow: true,
	}

	dataAnswer1: Array<CloudData> = [
	]

	public doughnutChart2Labels:string[] = ['Ya', 'Tidak'];
	public doughnutChart2Data:number[] = [50,50];
	public doughnutChart2Type:string = 'doughnut';
	public doughnutChart2Colors:string[] = ["#FDCF00", "#FF5E60"];

	constructor(public contentService: ContentService) { 
		this.loadData1();
		this.loadData2();
		setInterval(()=>{
		this.loadData1();
			this.loadData2();
		}, 60000)
	}

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

	loadData1(){
		this.contentService.getAnswers(1)
		.subscribe(data => {
			let cloudChange1 = [];
			console.log(data);
			if(data.success){
				let temp = data.data.sort((a,b) => {
					return a.answer > b.answer
				})
				console.log(temp);

				let current = null;
				let cnt = 0;
				for (let i = 0; i < data.data.length; i++){
					if(data.data[i].answer != current){
						if(cnt > 0){
							cloudChange1.push({text: current, weight: cnt, color: "#fff"})
							console.log(cloudChange1);
						}
						current = data.data[i].answer;
						cnt = 1;
					} else {
						cnt++;
					}
				}
				if (cnt > 0){
					cloudChange1.push({text: current, weight: cnt, color: "#fff"})
				}
				const changedData$: Observable<Array<CloudData>> = Observable.of(cloudChange1);
				changedData$.subscribe(res => this.dataAnswer1 = res);
			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

	loadData2(){
		this.contentService.getAnswers(2)
		.subscribe(data => {
			console.log(data);
			if(data.success){
				let yescounter = 0;
				let nocounter = 0;
				data.data.forEach(answer => {
					if(answer.answer == "yes"){
						yescounter++
					}
					else {
						nocounter++
					}
				})
				console.log(yescounter, nocounter);
				this.doughnutChart2Data = [yescounter, nocounter]
			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

	loadData3(){
		this.contentService.getAnswers(3)
		.subscribe(data => {
			console.log(data);
			if(data.success){

			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

	loadData4(){
		this.contentService.getAnswers(4)
		.subscribe(data => {
			console.log(data);
			if(data.success){

			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

	loadData5(){
		this.contentService.getAnswers(5)
		.subscribe(data => {
			console.log(data);
			if(data.success){

			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

}

