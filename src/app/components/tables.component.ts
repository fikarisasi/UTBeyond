import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';

@Component({
	templateUrl: 'tables.component.html'
})
export class TablesComponent {
	contents = [];
	contentTitleWillBeDeleted = "";
	dataContentToBeDeleted = {content: '', c: ''}

	constructor(public router: Router, private contentService: ContentService) { 
		this.contentService.getNews()
		.subscribe(data => {
			this.contents.push({category: "News", data: data});
			this.contentService.getPlaces()
			.subscribe(data => {
				this.contents.push({category: "Places", data: data});
				this.contentService.getPublicTransport()
				.subscribe(data => {
					this.contents.push({category: "Public Transport", data: data});
					this.contentService.getEmergencyContacts()
					.subscribe(data => {
						this.contents.push({category: "Emergency Contacts", data: data});
						this.contentService.getEvents()
						.subscribe(data => {
							this.contents.push({category: "Events", data: data});
							console.log(this.contents);
						})
					})
				})
			})
		})
	}

	editContent(c){
		console.log(c);
		this.router.navigateByUrl('/components/forms');
	}

	willDeleteContent(content, c){
		console.log(content, c);
		this.contentTitleWillBeDeleted = c.title;
		this.dataContentToBeDeleted.content = content;
		this.dataContentToBeDeleted.c = c;
	}

	deleteContent(){
		console.log(this.dataContentToBeDeleted.c["id"]);
		this.contentService.deleteNews(this.dataContentToBeDeleted.c["id"])
		.subscribe(data => {
			console.log(data);
			if(data.count){
				console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
				let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
				console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
				let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
				this.contents[contentsIndex].data.splice(cIndex, 1);
				console.log(this.contents);
				this.contents = this.contents;
			}
		})
	}

}
