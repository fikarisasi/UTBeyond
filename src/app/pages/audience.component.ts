import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ContentService } from '../services/content.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
	templateUrl: 'audience.component.html'
})
export class AudienceComponent {

	chosenQuestion = {
		question_number: 0
	};
	answer1: any;
	answer2: any;
	answer3: any;
	answer4: any;
	answer5: any;

	answer1Answered = localStorage.getItem("answer1Answered");
	answer2Answered = localStorage.getItem("answer2Answered");
	answer3Answered = localStorage.getItem("answer3Answered");
	answer4Answered = localStorage.getItem("answer4Answered");
	answer5Answered = localStorage.getItem("answer5Answered");

	nama = localStorage.getItem("nama");
	namaExist = false;
	komentar = null;

	komentars: any;

	showAlertKomentarTerkirim = false;

	public current_poll = 1;

	options: CloudOptions = {
		// if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
		width : 1,
		height : 150,
		overflow: true,
	}

	dataAnswer1: Array<CloudData> = [
	]

	public doughnutChart2Labels:string[] = ['Ya', 'Tidak'];
	public doughnutChart2Data:number[] = [0,0];
	public doughnutChart2Type:string = 'doughnut';

	public doughnutChart3Labels:string[] = ['Ya, segera', 'Tidak usah buru-buru', 'Tunggu dan amati'];
	public doughnutChart3Data:number[] = [0,0, 0];
	public doughnutChart3Type:string = 'doughnut';

	public doughnutChart4Labels:string[] = ['Mempersulit', 'Lebih efisien', 'Tidak ada perubahan'];
	public doughnutChart4Data:number[] = [0,0, 0];
	public doughnutChart4Type:string = 'doughnut';

	public doughnutChart5Labels:string[] = ['Ya', 'Tidak'];
	public doughnutChart5Data:number[] = [0,0];
	public doughnutChart5Type:string = 'doughnut';

	constructor(public contentService: ContentService) {
		this.loadChosenQuestion();
		this.loadKomentar();
		this.loadData1();
		this.loadData2();
		this.loadData3();
		this.loadData4();
		this.loadData5();
		if(this.nama){
			this.namaExist = true;
		}
		setInterval(()=>{
			this.loadChosenQuestion();
			this.loadKomentar();
			this.loadData1();
			this.loadData2();
			this.loadData3();
			this.loadData4();
			this.loadData5();
		}, 10000)
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
							cloudChange1.push({text: current, weight: cnt, color: "#000"})
							console.log(cloudChange1);
						}
						current = data.data[i].answer;
						cnt = 1;
					} else {
						cnt++;
					}
				}
				if (cnt > 0){
					cloudChange1.push({text: current, weight: cnt, color: "#000"})
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
				let acounter = 0;
				let bcounter = 0;
				let ccounter = 0;
				data.data.forEach(answer => {
					if(answer.answer == "Ya, segera"){
						acounter++
					}
					else if(answer.answer == "Tidak usah buru-buru"){
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
				let acounter = 0;
				let bcounter = 0;
				let ccounter = 0;
				data.data.forEach(answer => {
					if(answer.answer == "Akan mempersulit kehidupan kerja saya"){
						acounter++
					}
					else if(answer.answer == "Akan membuat kehidupan kerja saya lebih efisien"){
						bcounter++
					}
					else {
						ccounter++
					}
				})
				console.log(acounter, bcounter, ccounter);
				this.doughnutChart4Data = [acounter, bcounter, ccounter]
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
				this.doughnutChart5Data = [yescounter, nocounter]
			}
			else{
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
					return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
				})
			}
		})
	}

	loadChosenQuestion(){
		this.contentService.getShowQuestion()
		.subscribe(data => {
			console.log(data);
			if(data.success){
				let orderedData = data.data.sort((a, b) => {
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				})
				console.log(orderedData);
				if(!orderedData[0]){
					console.log("hei");
					this.chosenQuestion = {question_number: 0};
				}
				else{
					this.chosenQuestion = orderedData[0];

				}
				console.log(this.chosenQuestion);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	restartVote(){
		localStorage.removeItem("answer1Answered");
		localStorage.removeItem("answer2Answered");
		localStorage.removeItem("answer3Answered");
		localStorage.removeItem("answer4Answered");
		localStorage.removeItem("answer5Answered");
		this.answer1Answered = null;
		this.answer2Answered = null;
		this.answer3Answered = null;
		this.answer4Answered = null;
		this.answer5Answered = null;
		this.refreshPage();
	}

	refreshPage(){
		this.loadChosenQuestion();
		this.loadKomentar();
	}

	submitAnswer1(){
		console.log(this.answer1);
		this.contentService.postAnswer({question_number: 1, answer: this.answer1})
		.subscribe(data => {
			if(data.success){
				localStorage.setItem("answer1Answered", "true")
				this.answer1Answered = localStorage.getItem("answer1Answered");
				console.log(this.answer1Answered);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	submitAnswer2(answer){
		console.log(answer);
		this.contentService.postAnswer({question_number: 2, answer: answer})
		.subscribe(data => {
			if(data.success){
				localStorage.setItem("answer2Answered", "true")
				this.answer2Answered = localStorage.getItem("answer2Answered");
				console.log(this.answer2Answered);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	submitAnswer3(answer){
		console.log(answer);
		this.contentService.postAnswer({question_number: 3, answer: answer})
		.subscribe(data => {
			if(data.success){
				localStorage.setItem("answer3Answered", "true")
				this.answer3Answered = localStorage.getItem("answer3Answered");
				console.log(this.answer3Answered);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	submitAnswer4(answer){
		console.log(answer);
		this.contentService.postAnswer({question_number: 4, answer: answer})
		.subscribe(data => {
			if(data.success){
				localStorage.setItem("answer4Answered", "true")
				this.answer4Answered = localStorage.getItem("answer4Answered");
				console.log(this.answer4Answered);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	submitAnswer5(answer){
		console.log(answer);

		this.contentService.postAnswer({question_number: 5, answer: answer})
		.subscribe(data => {
			if(data.success){
				localStorage.setItem("answer5Answered", "true")
				this.answer5Answered = localStorage.getItem("answer5Answered");
				console.log(this.answer5Answered);
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

	changeName(){
		localStorage.removeItem("nama");
		this.nama = null;
		this.namaExist = false;
	}

	saveName(nama){
		localStorage.setItem("nama", nama);
		this.nama = nama;
		console.log(nama);
		this.namaExist = true;
	}

	comment(komentar){
		this.komentar = null;
		console.log(komentar);
		this.contentService.postKomentar({nama: this.nama, komentar: komentar})
		.subscribe(data => {
			if(data.success){
				console.log(data);
				this.showAlertKomentarTerkirim = true;
				setTimeout(() => {
					this.showAlertKomentarTerkirim = false;
				}, 5000)
				this.loadKomentar();
			}
			else{
				console.log("failed connect to api");
			}
		})
	}

}
