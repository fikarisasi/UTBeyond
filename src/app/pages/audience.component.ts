import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

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

	constructor(public contentService: ContentService) {
		this.loadChosenQuestion();
		this.loadKomentar();
		if(this.nama){
			this.namaExist = true;
		}
	}

	loadKomentar(){
		this.contentService.getKomentar()
		.subscribe(data => {
			console.log(data);
			if(data.success){
				this.komentars = data.data.sort((a, b) => {
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
