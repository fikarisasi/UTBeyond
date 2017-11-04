import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { UserService } from '../services/user.service';
import * as moment from 'moment';

declare function unescape(s:string): string;
declare function escape(s:string): string;

@Component({
	templateUrl: 'user-management.component.html'
})
export class UserManagementComponent {
	showEditContent = false;
	showAlertSuccessNewContent = false;
	showAlertSuccessEditContent = false;
	showAlertSuccessDeleteContent = false;
	contents = [];
	//delete content
	contentTitleWillBeDeleted = "";
	dataContentToBeDeleted = {content: '', c: ''}
	//edit content
	// dataContentToBeEdited = {
	// 	category: "Please select",
	// 	sub_category: "Please select",
	// 	title: null,
	// 	description: null,
	// 	author: null,
	// 	posted_date: null,
	// 	id: null
	// }
	submitted = false;
	dataContentToBeEdited = {
		category: null
	};
	news: any;
	place: any;
	event: any;
	public_transport: any;
	emergency_contact: any;

	sub_category = {
		news: [],
		event: [],
		place: [],
		public_transport: [],
		emergency_contact: []
	}
	new_category = false;

	users: any;
	dataUserToBeVerified: any;
	showAlertSuccessVerifyUser = false;
	dataUserToBeDeleted: any;
	showAlertSuccessDeleteUser = false;
	constructor(public router: Router, private contentService: ContentService, public userService: UserService) {
		this.userService.getUsers().subscribe(users => {
			console.log("user");
			this.users = users;
			console.log(this.users);
		})
		console.log(localStorage.getItem("AlertSuccessNewContent")==="true");
		if(localStorage.getItem("AlertSuccessNewContent")==="true"){
			this.showAlertSuccessNewContent = true;
			setTimeout(() => {
				this.showAlertSuccessNewContent = false;
				localStorage.removeItem("AlertSuccessNewContent");
			}, 5000)
		}
		// this.contentService.getNews()
		// .subscribe(data => {
		// 	this.contents.push({category: "News", data: data});
		// 	this.contentService.getPlaces()
		// 	.subscribe(data => {
		// 		this.contents.push({category: "Places", data: data});
		// 		this.contentService.getPublicTransport()
		// 		.subscribe(data => {
		// 			this.contents.push({category: "Public Transport", data: data});
		// 			this.contentService.getEmergencyContacts()
		// 			.subscribe(data => {
		// 				this.contents.push({category: "Emergency Contacts", data: data});
		// 				this.contentService.getEvents()
		// 				.subscribe(data => {
		// 					this.contents.push({category: "Events", data: data});
		// 					console.log(this.contents);
		// 					localStorage.setItem("contents", JSON.stringify(this.contents));
		// 				})
		// 			})
		// 		})
		// 	})
		// })
	}

	loadUsers(){
		this.userService.getUsers().subscribe(users => {
			console.log("user");
			this.users = users;
			console.log(this.users);
		})
	}

	willVerifyUser(user){
		console.log(user);
		this.dataUserToBeVerified = user;
	}

	verifyUser(user){
		console.log(user);
		if(user.daftar_ahli){
			this.userService.putUser(user.id, {ahli: true})
			.subscribe(data => {
				console.log(data);
				this.showAlertSuccessVerifyUser = true;
				setTimeout(() => {
					this.showAlertSuccessVerifyUser = false;
					// localStorage.removeItem("AlertSuccessNewContent");
				}, 5000)
				this.loadUsers();
			})
		}
		else if(user.daftar_petani){
			this.userService.putUser(user.id, {petani: true})
			.subscribe(data => {
				console.log(data);
				this.showAlertSuccessVerifyUser = true;
				setTimeout(() => {
					this.showAlertSuccessVerifyUser = false;
					// localStorage.removeItem("AlertSuccessNewContent");
				}, 5000)
				this.loadUsers();
			})
		}
	}

	willEditUser(){

	}

	willDeleteUser(user){
		console.log(user);
		this.dataUserToBeDeleted = user;
	}

	deleteUser(user){
		console.log(user);
		this.userService.deleteUser(user["id"])
		.subscribe(data => {
			console.log(data);
			this.showAlertSuccessDeleteUser = true;
			setTimeout(() => {
				this.showAlertSuccessDeleteUser = false;
				// localStorage.removeItem("AlertSuccessNewContent");
			}, 5000)
			this.loadUsers();
		})
	}

	loadContent(){
		this.contents = [];
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
							localStorage.setItem("contents", JSON.stringify(this.contents));
						})
					})
				})
			})
		})
	}

	resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
		console.log("resize called");
		// This will wait until the img is loaded before calling this function
		// return img.onload = () => {
			console.log("after onload");
			// Get the images current width and height
			var width = img.naturalWidth;
			var height = img.naturalHeight;
			console.log(width,height);
			// Set the WxH to fit the Max values (but maintain proportions)
			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}

			// create a canvas object
			var canvas = document.createElement("canvas");
			console.log(canvas);

			// Set the canvas to the new calculated dimensions
			console.log(width,height);
			canvas.width = width;
			canvas.height = height;
			// canvas.width = MAX_WIDTH;
			// canvas.height = MAX_HEIGHT;
			var ctx = canvas.getContext("2d");
			console.log(ctx);
			ctx.drawImage(img, 0, 0,  width, height);

			// Get this encoded as a jpeg
			// IMPORTANT: 'jpeg' NOT 'jpg'
			var dataUrl = canvas.toDataURL('image/jpeg');
			console.log(dataUrl);
			// callback with the results
			callback(dataUrl, img.src.length, dataUrl.length);
		// };
	}

	dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {type:mimeString});
	}

	newsImageEdited(event){
		console.log(event);
		let reader = new FileReader();
		let image : any;
		reader.onload = function (e){
			console.log(e.target['result']);
			document.getElementById("newsImage").setAttribute("style", "display: block; margin-bottom: 10px")
			document.getElementById("newsImage").setAttribute("src", e.target['result'])
			document.getElementById("newsImage").setAttribute("alt", event.target.files[0].name)
		}
		reader.readAsDataURL(event.target.files[0]);
	}

	placeImageEdited(event){
		console.log(event);
		let reader = new FileReader();
		let image : any;
		reader.onload = function (e){
			console.log(e.target['result']);
			document.getElementById("placeImage").setAttribute("style", "display: block; margin-bottom: 10px")
			document.getElementById("placeImage").setAttribute("src", e.target['result'])
			document.getElementById("placeImage").setAttribute("alt", event.target.files[0].name)
		}
		reader.readAsDataURL(event.target.files[0]);
	}

	publicTransportImageEdited(event){
		console.log(event);
		let reader = new FileReader();
		let image : any;
		reader.onload = function (e){
			console.log(e.target['result']);
			document.getElementById("publicTransportImage").setAttribute("style", "display: block; margin-bottom: 10px")
			document.getElementById("publicTransportImage").setAttribute("src", e.target['result'])
			document.getElementById("publicTransportImage").setAttribute("alt", event.target.files[0].name)
		}
		reader.readAsDataURL(event.target.files[0]);
	}

	emergencyContactImageEdited(event){
		console.log(event);
		let reader = new FileReader();
		let image : any;
		reader.onload = function (e){
			console.log(e.target['result']);
			document.getElementById("emergencyContactImage").setAttribute("style", "display: block; margin-bottom: 10px")
			document.getElementById("emergencyContactImage").setAttribute("src", e.target['result'])
			document.getElementById("emergencyContactImage").setAttribute("alt", event.target.files[0].name)
		}
		reader.readAsDataURL(event.target.files[0]);
	}

	eventImageEdited(event){
		console.log(event);
		let reader = new FileReader();
		let image : any;
		reader.onload = function (e){
			console.log(e.target['result']);
			document.getElementById("eventImage").setAttribute("style", "display: block; margin-bottom: 10px")
			document.getElementById("eventImage").setAttribute("src", e.target['result'])
			document.getElementById("eventImage").setAttribute("alt", event.target.files[0].name)
		}
		reader.readAsDataURL(event.target.files[0]);
	}

	onChange(){
		if(this.news.sub_category==='Please type new category' || this.event.sub_category==='Please type new category' || this.place.sub_category==='Please type new category'){
			this.new_category = true
		}
	}

	willEditContent(content, c){
		console.log(content, c);
		this.showEditContent = true;
		if(content.category==="News"){
			this.dataContentToBeEdited.category = "News";
			content.data.forEach(data => {
				if(this.sub_category.news.indexOf(data.category)+1){

				}
				else {
					this.sub_category.news.push(data.category);
				}
			})
			this.news = c;
			if(!this.news.created_at){
				this.news.created_at = this.news.posted_date;
			}
			if(!this.news.updated_at){
				this.news.updated_at = this.news.posted_date;
			}
			if(!this.news.featured){
				this.news.featured = false;
			}
			if(!this.news.sub_category){
				this.news.sub_category = this.news.category;
				this.news.category_real = "News";
			}
			if(!this.news.image){
				this.news.image = this.news.photos;
			}
		}
		else if(content.category==="Places"){
			this.dataContentToBeEdited.category = "Place";
			content.data.forEach(data => {
				if(this.sub_category.place.indexOf(data.category)+1){

				}
				else {
					this.sub_category.place.push(data.category);
				}
			})
			this.place = c;
			if(!this.place.category_real){
				this.place.category_real = "Place";
			}
			if(!this.place.sub_category){
				this.place.sub_category = this.place.category;
			}
			if(!this.place.title){
				this.place.title = this.place.place_name;
			}
			if(!this.place.description){
				this.place.description = this.place.deskripsi_profil_wisata;
			}
			if(!this.place.address){
				this.place.address = this.place.place_address;
			}
			if(!this.place.contact_person){
				this.place.contact_person = this.place.phone;
			}
			if(!this.place.image){
				this.place.image = this.place.photos[0];
			}
		}
		else if(content.category==="Events"){
			this.dataContentToBeEdited.category = "Event"
			this.event = c;
			content.data.forEach(data => {
				if(this.sub_category.event.indexOf(data.category)+1){

				}
				else {
					this.sub_category.event.push(data.category);
				}
			})
			if(!this.event.category_real){
				this.event.category_real = "Event";
			}
			if(!this.event.created_at){
				this.event.created_at = moment().format();
			}
			if(!this.event.description){
				this.event.description = this.event.event_description;
			}
			if(!this.event.end_date){
				this.event.end_date = this.event.event_date;
			}
			if(!this.event.featured){
				this.event.featured = false;
			}
			if(!this.event.image){
				this.event.image = this.event.photos;
			}
			if(!this.event.place_name){
				this.event.place_name = this.event.event_address;
			}
			if(!this.event.start_date){
				this.event.start_date = this.event.event_date;
			}
			if(!this.event.sub_category){
				this.event.sub_category = this.event.category;
			}
			if(!this.event.title){
				this.event.title = this.event.event_title;
			}
			if(!this.event.updated_at){
				this.event.updated_at = moment().format();
			}
		}
		else if(content.category==="Public Transport"){
			this.dataContentToBeEdited.category = "Public Transport";
			this.public_transport = c;
			if(!this.public_transport.category){
				this.public_transport.category = "Public Transport";
			}
			if(!this.public_transport.title){
				this.public_transport.title = this.public_transport.transport_name;
			}
			if(!this.public_transport.route){
				this.public_transport.route = this.public_transport.short_desc;
			}
		}
		else if(content.category==="Emergency Contacts"){
			this.dataContentToBeEdited.category = "Emergency Contact";
			this.emergency_contact = c;
			if(!this.emergency_contact.title){
				this.emergency_contact.title = this.emergency_contact.emergency_name;
			}
		}
		// this.dataContentToBeEdited = {
		// 	category: content.category,
		// 	sub_category: c.category,
		// 	title: c.title,
		// 	description: c.description,
		// 	author: c.author,
		// 	posted_date: c.posted_date,
		// 	id: c.id
		// }
		console.log(this.dataContentToBeEdited);
	}

	cancelEdit(){
		this.showEditContent = false;
	}

	editContent(){
		this.submitted = true;
		console.log(this.dataContentToBeEdited.category);
		if(this.dataContentToBeEdited.category==="News"){
			this.news.updated_at = moment().format();
			this.news.posted_date = moment().format();
			console.log(this.news);
			// resize gambar
			console.log(document.getElementById("newsImage"));
			this.resize(document.getElementById("newsImage"), 1000, 1000, (resized_jpg, before, after) =>{
				console.log(resized_jpg);
				console.log(before);
				console.log(after);
				// document.getElementById("newsImageAfter").setAttribute("style", "display: block")
				// document.getElementById("newsImageAfter").setAttribute("src", resized_jpg)
				let blobresized = this.dataURItoBlob(resized_jpg);
				console.log(blobresized);
				// upload blobresized to dropbox
				this.contentService.uploadImage(blobresized, '/city-living/news/' + this.news.title + '_' + this.news.created_at + '.jpg')
				.subscribe(data => {
					console.log(data);
					let param = {
            			"path": '/city-living/news/' + this.news.title + '_' + this.news.created_at + '.jpg'
					}
					this.contentService.getImageLink(param)
					.subscribe(data => {
						console.log(data);
						let temp = data.url;
						let url = temp.replace("?dl=0", "?dl=1");
						// store ke database
						this.news.image = url;
						this.news.photos = url; //replaceable
						console.log(this.news);
						this.contentService.putNews(this.news)
						.subscribe(data => {
							console.log(data);
							this.loadContent();
							this.showEditContent = false;
							this.submitted = false;
							this.showAlertSuccessEditContent = true;
							setTimeout(() => {
								this.showAlertSuccessEditContent = false;
							}, 5000)
						})
					})
				})
			})
			
		}
		else if(this.dataContentToBeEdited.category==="Place"){
			this.place.updated_at = moment().format();
			// replaceable
			this.place.category = this.place.sub_category;
			this.place.deskripsi_profil_wisata = this.place.description;
			this.place.open_hours = this.place.opentime + "-" + this.place.closetime + "/hari ini"
			this.place.phone = this.place.contact_person;
			this.place.place_address = this.place.address;
			this.place.place_name = this.place.title;
			console.log(this.place);
			// resize gambar
			console.log(document.getElementById("placeImage"));
			this.resize(document.getElementById("placeImage"), 1000, 1000, (resized_jpg, before, after) =>{
				console.log(resized_jpg);
				console.log(before);
				console.log(after);
				// document.getElementById("newsImageAfter").setAttribute("style", "display: block")
				// document.getElementById("newsImageAfter").setAttribute("src", resized_jpg)
				let blobresized = this.dataURItoBlob(resized_jpg);
				console.log(blobresized);
				// upload blobresized to dropbox
				this.contentService.uploadImage(blobresized, '/city-living/place/' + this.place.title + '_' + this.place.created_at + '.jpg')
				.subscribe(data => {
					console.log(data);
					let param = {
            			"path": '/city-living/place/' + this.place.title + '_' + this.place.created_at + '.jpg'
					}
					this.contentService.getImageLink(param)
					.subscribe(data => {
						console.log(data);
						let temp = data.url;
						let url = temp.replace("?dl=0", "?dl=1");
						// store ke database
						this.place.image = url;
						this.place.photos = [url]; //replaceable
						console.log(this.place);
						this.contentService.putPlace(this.place)
						.subscribe(data => {
							console.log(data);
							this.loadContent();
							this.showEditContent = false;
							this.submitted = false;
							this.showAlertSuccessEditContent = true;
							setTimeout(() => {
								this.showAlertSuccessEditContent = false;
							}, 5000)
						})
					})
				})
			})
		}
		else if(this.dataContentToBeEdited.category==="Event"){
			this.event.updated_at = moment().format();
			//replaceable
			this.event.category = this.event.sub_category;
			this.event.event_address = this.event.place_name;
			this.event.event_date = this.event.start_date;
			this.event.event_description = this.event.description;
			this.event.event_title = this.event.title;
			console.log(this.event);
			// resize gambar
			console.log(document.getElementById("eventImage"));
			this.resize(document.getElementById("eventImage"), 1000, 1000, (resized_jpg, before, after) =>{
				console.log(resized_jpg);
				console.log(before);
				console.log(after);
				// document.getElementById("newsImageAfter").setAttribute("style", "display: block")
				// document.getElementById("newsImageAfter").setAttribute("src", resized_jpg)
				let blobresized = this.dataURItoBlob(resized_jpg);
				console.log(blobresized);
				// upload blobresized to dropbox
				this.contentService.uploadImage(blobresized, '/city-living/event/' + this.event.title + '_' + this.event.created_at + '.jpg')
				.subscribe(data => {
					console.log(data);
					let param = {
            			"path": '/city-living/event/' + this.event.title + '_' + this.event.created_at + '.jpg'
					}
					this.contentService.getImageLink(param)
					.subscribe(data => {
						console.log(data);
						let temp = data.url;
						let url = temp.replace("?dl=0", "?dl=1");
						// store ke database
						this.event.image = url;
						this.event.photos = url; //replaceable
						console.log(this.event);
						this.contentService.putEvent(this.event)
						.subscribe(data => {
							console.log(data);
							this.loadContent();
							this.showEditContent = false;
							this.submitted = false;
							this.showAlertSuccessEditContent = true;
							setTimeout(() => {
								this.showAlertSuccessEditContent = false;
							}, 5000)
						})
					})
				})
			})
		}
		else if(this.dataContentToBeEdited.category==="Public Transport"){
			this.public_transport.updated_at = moment().format();
			this.public_transport.operational_hours = this.public_transport.start_operation + ' - ' + this.public_transport.end_operation + '/ hari ini';
			this.public_transport.short_desc = this.public_transport.route;
			this.public_transport.transport_name = this.public_transport.title;
			console.log(this.public_transport)
			// resize gambar
			console.log(document.getElementById("publicTransportImage"));
			this.resize(document.getElementById("publicTransportImage"), 1000, 1000, (resized_jpg, before, after) =>{
				console.log(resized_jpg);
				console.log(before);
				console.log(after);
				// document.getElementById("newsImageAfter").setAttribute("style", "display: block")
				// document.getElementById("newsImageAfter").setAttribute("src", resized_jpg)
				let blobresized = this.dataURItoBlob(resized_jpg);
				console.log(blobresized);
				// upload blobresized to dropbox
				this.contentService.uploadImage(blobresized, '/city-living/public-transport/' + this.public_transport.title + '_' + this.public_transport.created_at + '.jpg')
				.subscribe(data => {
					console.log(data);
					let param = {
            			"path": '/city-living/public-transport/' + this.public_transport.title + '_' + this.public_transport.created_at + '.jpg'
					}
					this.contentService.getImageLink(param)
					.subscribe(data => {
						console.log(data);
						let temp = data.url;
						let url = temp.replace("?dl=0", "?dl=1");
						// store ke database
						this.public_transport.image = url;
						this.public_transport.photos = url; //replaceable
						console.log(this.public_transport);
						this.contentService.putPublicTransport(this.public_transport)
						.subscribe(data => {
							console.log(data);
							this.loadContent();
							this.showEditContent = false;
							this.submitted = false;
							this.showAlertSuccessEditContent = true;
							setTimeout(() => {
								this.showAlertSuccessEditContent = false;
							}, 5000)
						})
					})
				})
			})
			
		}
		else if(this.dataContentToBeEdited.category==="Emergency Contact"){
			this.emergency_contact.updated_at = moment().format();
			this.emergency_contact.emergency_name = this.emergency_contact.title;
			console.log(this.emergency_contact)
			// resize gambar
			console.log(document.getElementById("emergencyContactImage"));
			this.resize(document.getElementById("emergencyContactImage"), 1000, 1000, (resized_jpg, before, after) =>{
				console.log(resized_jpg);
				console.log(before);
				console.log(after);
				// document.getElementById("newsImageAfter").setAttribute("style", "display: block")
				// document.getElementById("newsImageAfter").setAttribute("src", resized_jpg)
				let blobresized = this.dataURItoBlob(resized_jpg);
				console.log(blobresized);
				// upload blobresized to dropbox
				this.contentService.uploadImage(blobresized, '/city-living/emergency-contact/' + this.emergency_contact.title + '_' + this.emergency_contact.created_at + '.jpg')
				.subscribe(data => {
					console.log(data);
					let param = {
            			"path": '/city-living/emergency-contact/' + this.emergency_contact.title + '_' + this.emergency_contact.created_at + '.jpg'
					}
					this.contentService.getImageLink(param)
					.subscribe(data => {
						console.log(data);
						let temp = data.url;
						let url = temp.replace("?dl=0", "?dl=1");
						// store ke database
						this.emergency_contact.image = url;
						this.emergency_contact.emergency_images = url; //replaceable
						console.log(this.emergency_contact);
						this.contentService.putEmergencyContacts(this.emergency_contact)
						.subscribe(data => {
							console.log(data);
							this.loadContent();
							this.showEditContent = false;
							this.submitted = false;
							this.showAlertSuccessEditContent = true;
							setTimeout(() => {
								this.showAlertSuccessEditContent = false;
							}, 5000)
						})
					})
				})
			})
		}
		let contentFix = {
			// id: this.dataContentToBeEdited.id,
			// author: this.dataContentToBeEdited.author,
			// category: this.dataContentToBeEdited.sub_category,
			// description: this.dataContentToBeEdited.description,
			// photos: '',
			// posted_date: this.dataContentToBeEdited.posted_date,
			// title: this.dataContentToBeEdited.title
		}
		// this.contentService.putNews(contentFix)
		// .subscribe(data => {
		// 	console.log(data);
		// 	this.loadContent();
		// 	this.showEditContent = false;
		// 	this.showAlertSuccessEditContent = true;
		// 	setTimeout(() => {
		// 		this.showAlertSuccessEditContent = false;
		// 	}, 5000)
		// })
	}

	willDeleteContent(content, c){
		console.log(content, c);
		if(c.title){
			this.contentTitleWillBeDeleted = c.title;
		}
		else if(c.place_name){
			this.contentTitleWillBeDeleted = c.place_name;
		}
		this.dataContentToBeDeleted.content = content;
		this.dataContentToBeDeleted.c = c;
	}

	deleteContent(){
		console.log(this.dataContentToBeDeleted.c["id"]);
		console.log(this.dataContentToBeDeleted.content["category"])
		if(this.dataContentToBeDeleted.content["category"]==="News"){
			this.contentService.deleteNews(this.dataContentToBeDeleted.c["id"])
			.subscribe(data => {
				console.log(data);
				// if(data.count){
					console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
					let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
					console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
					let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
					this.contents[contentsIndex].data.splice(cIndex, 1);
					console.log(this.contents);
					this.contents = this.contents;
					this.showAlertSuccessDeleteContent = true;
					setTimeout(() => {
						this.showAlertSuccessDeleteContent = false;
					}, 5000)
				// }
			})
		}
		else if(this.dataContentToBeDeleted.content["category"]==="Places"){
			this.contentService.deletePlace(this.dataContentToBeDeleted.c["id"])
			.subscribe(data => {
				console.log(data);
				// if(data.count){
					console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
					let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
					console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
					let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
					this.contents[contentsIndex].data.splice(cIndex, 1);
					console.log(this.contents);
					this.contents = this.contents;
					this.showAlertSuccessDeleteContent = true;
					setTimeout(() => {
						this.showAlertSuccessDeleteContent = false;
					}, 5000)
				// }
			})			
		}
		else if(this.dataContentToBeDeleted.content["category"]==="Public Transport"){
			this.contentService.deletePublicTransport(this.dataContentToBeDeleted.c["id"])
			.subscribe(data => {
				console.log(data);
				// if(data.count){
					console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
					let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
					console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
					let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
					this.contents[contentsIndex].data.splice(cIndex, 1);
					console.log(this.contents);
					this.contents = this.contents;
					this.showAlertSuccessDeleteContent = true;
					setTimeout(() => {
						this.showAlertSuccessDeleteContent = false;
					}, 5000)
				// }
			})			
		}
		else if(this.dataContentToBeDeleted.content["category"]==="Emergency Contacts"){
			this.contentService.deleteEmergencyContacts(this.dataContentToBeDeleted.c["id"])
			.subscribe(data => {
				console.log(data);
				// if(data.count){
					console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
					let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
					console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
					let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
					this.contents[contentsIndex].data.splice(cIndex, 1);
					console.log(this.contents);
					this.contents = this.contents;
					this.showAlertSuccessDeleteContent = true;
					setTimeout(() => {
						this.showAlertSuccessDeleteContent = false;
					}, 5000)
				// }
			})			
		}
		else if(this.dataContentToBeDeleted.content["category"]==="Events"){
			this.contentService.deleteEvent(this.dataContentToBeDeleted.c["id"])
			.subscribe(data => {
				console.log(data);
				// if(data.count){
					console.log(this.contents.indexOf(this.dataContentToBeDeleted.content));
					let contentsIndex = this.contents.indexOf(this.dataContentToBeDeleted.content);
					console.log(this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c));
					let cIndex = this.contents[contentsIndex].data.indexOf(this.dataContentToBeDeleted.c);
					this.contents[contentsIndex].data.splice(cIndex, 1);
					console.log(this.contents);
					this.contents = this.contents;
					this.showAlertSuccessDeleteContent = true;
					setTimeout(() => {
						this.showAlertSuccessDeleteContent = false;
					}, 5000)
				// }
			})			
		}
	}

}
