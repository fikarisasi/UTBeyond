import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ContentService } from '../services/content.service';

@Component({
	templateUrl: 'forms.component.html'
})
export class FormsComponent {
	showAlertSuccess = false;

	newContent : {
		category: string, 
		sub_category: string, 
		title: string,
		description: string,
		author: string, 
		posted_date: string,
	} = {
		category: "Please select", 
		sub_category: "Please select", 
		title: null,
		description: null,
		author: null, 
		posted_date: null,
	}

	constructor(private contentService: ContentService, public router: Router) { 

	}

	addNewContent(){
		this.newContent.posted_date = moment().format();
		console.log(this.newContent);
		let contentFix = {
			author: this.newContent.author,
			category: this.newContent.sub_category,
			description: this.newContent.description,
			photos: '',
			posted_date: this.newContent.posted_date,
			title: this.newContent.title
		}
		console.log(contentFix);
		this.contentService.postNews(contentFix)
		.subscribe(data => {
			console.log(data);
				this.showAlertSuccess = true;
			setTimeout(() => {
				this.showAlertSuccess = false;
			},3000)
			this.router.navigateByUrl('/components/tables');
		})
	}

}
