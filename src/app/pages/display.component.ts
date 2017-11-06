import { Component, HostListener } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ContentService } from '../services/content.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
	templateUrl: 'display.component.html'
})
export class DisplayComponent {

	public current_poll = 1;

	options: CloudOptions = {
		// if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
		width : 1,
		height : 300,
		overflow: true,
	}

	dataAnswer1: Array<CloudData> = [
	]

	public doughnutChart2Labels:string[] = ['Sangat urgent', 'Urgent', 'Penting tidak urgent', 'Tidak urgent', 'Tak ada opini'];
	public doughnutChart2Data:number[] = [0,0,0,0,0];
	public doughnutChart2Type:string = 'doughnut';
	public doughnutChart2Colors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

	public doughnutChart3Labels:string[] = ['Excited', 'Biasa saja', 'Takut'];
	public doughnutChart3Data:number[] = [0,0, 0];
	public doughnutChart3Type:string = 'doughnut';

	public doughnutChart4Labels:string[] = ['Ya', 'Tidak'];
	public doughnutChart4Data:number[] = [0,0];
	public doughnutChart4Type:string = 'doughnut';

	// public doughnutChart5Labels:string[] = ['Ya', 'Tidak'];
	// public doughnutChart5Data:number[] = [0,0];
	// public doughnutChart5Type:string = 'doughnut';
	// public doughnutChart5Colors:string[] = ["#FDCF00", "#FF5E60"];

	public participants = 0;
	public komentars = [];

	displayInputTarget = false;
	komenTarget = 500;
	sisaKomentar = 0;
	persenKomentar = 0;
	showReadyKickOff = false;
	displayOff = false;

	constructor(public contentService: ContentService) { 
		this.loadParticipant();
		this.loadKomentar();
		this.loadData1();
		this.loadData2();
		this.loadData3();
		this.loadData4();
		// this.loadData5();
		setInterval(()=>{
			this.loadParticipant();
			this.loadKomentar();
			this.loadData1();
			this.loadData2();
			this.loadData3();
			this.loadData4();
			// this.loadData5();
		}, 60000)
		// setInterval(()=>{
		// 	if(this.current_poll < 5){
		// 		this.current_poll++;
		// 	}
		// 	else{
		// 		this.current_poll = 0;
		// 	}
		// }, 5000)
	}

	public next() {
		if(this.current_poll < 4) {
			this.current_poll++
		}
	}

	public previous() {
		if(this.current_poll > 1) {
			this.current_poll--
		}
	}

	loadParticipant(){
		this.contentService.getAnswer()
		.subscribe(data => {
			console.log(data);
			if(data.success){
				this.participants = data.data.length;
			}
			else {
				console.log("cannot connect to api");
			}
		})
	}

	loadKomentar(){
		this.contentService.getKomentar()
		.subscribe(data => {
			console.log(data);
			if(data.success){
				this.komentars = data.data.sort((a, b) => {
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				})
				this.sisaKomentar = this.komenTarget - (this.komentars.length + this.participants);
				console.log(this.komenTarget, this.komentars.length, this.participants);
				this.persenKomentar = this.komentars.length/this.komenTarget*100;
				this.persenKomentar = Math.floor(this.persenKomentar);
				if(this.sisaKomentar<=0){
					this.showReadyKickOff = true;
				}
				else{
					this.showReadyKickOff = false;
				}
			}
			else {
				console.log("cannot connect to api");
			}
		})
	}

	clickSetTarget(){
		this.displayInputTarget = true;
	}

	setTarget(){
		console.log(this.komenTarget);
		this.displayInputTarget = false;
		this.loadKomentar();
	}

	loadData1(){
		this.contentService.getAnswers(1)
		.subscribe(data => {
			let cloudChange1 = [];
			console.log(data);
			if(data.success){
				let temp = data.data.sort((a,b) => {
					if (a.answer < b.answer)
					    return -1;
					  if (a.answer > b.answer)
					    return 1;
					  return 0;
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
				let acounter = 0;
				let bcounter = 0;
				let ccounter = 0;
				let dcounter = 0;
				let ecounter = 0;
				data.data.forEach(answer => {
					if(answer.answer == "Sangat urgent"){
						acounter++
					}
					else if(answer.answer == "Urgent"){
						bcounter++
					}
					else if(answer.answer == "Penting tapi tidak urgent"){
						ccounter++
					}
					else if(answer.answer == "Tidak urgent"){
						dcounter++
					}
					else {
						ecounter++
					}
				})
				console.log(acounter, bcounter, ccounter, dcounter, ecounter);
				this.doughnutChart2Data = [acounter, bcounter, ccounter, dcounter, ecounter]
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
				let acounter = 0;
				let bcounter = 0;
				let ccounter = 0;
				data.data.forEach(answer => {
					if(answer.answer == "Semangat dan excited"){
						acounter++
					}
					else if(answer.answer == "Biasa saja"){
						bcounter++
					}
					else {
						ccounter++
					}
				})
				console.log(acounter, bcounter, ccounter);
				this.doughnutChart3Data = [acounter, bcounter, ccounter]
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
				this.doughnutChart4Data = [yescounter, nocounter]
			}
			else{
				console.log("cannot connect to api");
			}
		})
	}

	// loadData5(){
	// 	this.contentService.getAnswers(5)
	// 	.subscribe(data => {
	// 		console.log(data);
	// 		if(data.success){
	// 			let yescounter = 0;
	// 			let nocounter = 0;
	// 			data.data.forEach(answer => {
	// 				if(answer.answer == "yes"){
	// 					yescounter++
	// 				}
	// 				else {
	// 					nocounter++
	// 				}
	// 			})
	// 			console.log(yescounter, nocounter);
	// 			this.doughnutChart5Data = [yescounter, nocounter]
	// 		}
	// 		else{
	// 			console.log("cannot connect to api");
	// 		}
	// 	})
	// }

}

