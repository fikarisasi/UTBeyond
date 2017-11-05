import { Component, HostListener } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ContentService } from '../services/content.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
	templateUrl: 'display.component.html'
})
export class DisplayComponent {

	public current_poll = 4;

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

	public percent3a = 0;
	public percent3b = 0;
	public percent3c = 0;
	public percent3afloor = 0;
	public percent3bfloor = 0;
	public percent3cfloor = 0;

	public percent4a = 0;
	public percent4b = 0;
	public percent4c = 0;
	public percent4afloor = 0;
	public percent4bfloor = 0;
	public percent4cfloor = 0;

	constructor(public contentService: ContentService) { 
		this.loadData1();
		this.loadData2();
		this.loadData3();
		this.loadData4();
		setInterval(()=>{
			this.loadData1();
			this.loadData2();
			this.loadData3();
			this.loadData4();
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
			let bucket = [];
			console.log(data);
			if(data.success){
				console.log(data.data.length);
				let a = data.data.filter(a => {
					return a.answer == "Ya, segera"
				})
				console.log(a);
				let b = data.data.filter(b => {
					return b.answer == "Tidak usah buru-buru"
				})
				console.log(b);
				let c = data.data.filter(c => {
					return c.answer == "Tunggu dan amati"
				})
				console.log(c);

				this.percent3a = a.length/data.data.length * 100;
				this.percent3b = b.length/data.data.length * 100;
				this.percent3c = c.length/data.data.length * 100;
				this.percent3afloor = Math.floor(this.percent3a);
				this.percent3bfloor = Math.floor(this.percent3b);
				this.percent3cfloor = Math.floor(this.percent3c);
				console.log(this.percent3afloor, this.percent3bfloor, this.percent3cfloor);

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
				console.log(data.data.length);
				let a = data.data.filter(a => {
					return a.answer == "Akan mempersulit kehidupan kerja saya"
				})
				console.log(a);
				let b = data.data.filter(b => {
					return b.answer == "Akan membuat kehidupan kerja saya lebih efisien"
				})
				console.log(b);
				let c = data.data.filter(c => {
					return c.answer == "Tidak ada perubahan"
				})
				console.log(c);

				this.percent4a = a.length/data.data.length * 100;
				this.percent4b = b.length/data.data.length * 100;
				this.percent4c = c.length/data.data.length * 100;
				this.percent4afloor = Math.floor(this.percent4a);
				this.percent4bfloor = Math.floor(this.percent4b);
				this.percent4cfloor = Math.floor(this.percent4c);
				console.log(this.percent4afloor, this.percent4bfloor, this.percent4cfloor);
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

