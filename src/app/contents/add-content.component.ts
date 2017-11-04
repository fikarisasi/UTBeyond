import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ContentService } from '../services/content.service';

declare function unescape(s:string): string;
declare function escape(s:string): string;

@Component({
	templateUrl: 'add-content.component.html'
})
export class AddComponent {
	category = null;
	// sub_category = "Please select";
	uploadedImage = null;
	uploadedImageName = null;
	uploadedImages = [];
	news = {
		category_real: "News", //change this
		sub_category: null,
		title: null,
		description: null,
		author: null,
		photos: null,
		featured: false,
		created_at: null,
		updated_at: null,
		category: null,//replaceable
		image: null, //replaceable
		posted_date: null, //replaceable
	}
	event = {
		category_real: "Event",
		sub_category: null,
		title: null,
		description: null,
		ticket_price: null,
		place_name: null,
		geolocation: {lat: null, lng: null},
		start_date: null,
		end_date: null,
		contact_person: null,
		image: null,
		featured: false,
		created_at: null,
		updated_at: null,
		category: null, //replaceable
		event_address: null, //replaceable
		event_date: null,
		event_description: null,
		event_title: null,
		photos: null
	}
	place = {
		category_real: "Place",
		sub_category: null,
		title: null,
		description: null,
		price_range: null,
		address: null,
		geolocation: {lat: null, lng: null},
		opentime: null,
		closetime: null,
		contact_person: null,
		image: null,
		featured: false,
		created_at: null,
		updated_at: null,
		// replaceable
		category: null,
		deskripsi_profil_wisata: null,
		number_of_review: 0,
		open_hours: null,
		phone: null,
		photos: [],
		place_address: null,
		place_name: null,
		public_transport: ["Angkot 05: Baranangsiang - Warung Jambu", "Angkot 03: Baranangsiang - Merdeka"],
		status: true,
		total_rate: 0
	}
	public_transport = {
		category_real: "Public Transport",
		title: null,
		description: null,
		fare: null,
		route: null,
		start_operation: null,
		end_operation: null,
		contact_person: null,
		image: null,
		featured: false,
		created_at: null,
		updated_at: null,
		//replaceable
		operational_hours: null,
		photos: null,
		route_photos: "https://www.dropbox.com/s/wdfn4dvg20gr79v/ruteangkot03.jpg?dl=1",
		short_desc: null,
		transport_name: null
	}
	emergency_contact = {
		category_real: "Emergency Contact",
		title: null,
		description: null,
		address: null,
		geolocation: {lat: null, lng: null},
		phone: null,
		image: null,
		featured: false,
		created_at: null,
		updated_at: null,
		//replaceable
		emergency_images: null,
		emergency_name: null
	}

	sub_category = {
		news: [],
		event: [],
		place: [],
		public_transport: [],
		emergency_contact: []
	}

	submitted = false;

	new_category = false;

	constructor(private contentService: ContentService, public router: Router) {
		console.log(JSON.parse(localStorage.getItem("contents")));
		JSON.parse(localStorage.getItem("contents")).forEach(content => {
			if(content.category === "News"){
				content.data.forEach(data => {
					if(this.sub_category.news.indexOf(data.category)+1){

					}
					else {
						this.sub_category.news.push(data.category);
					}
				})
			}
			if(content.category === "Events"){
				content.data.forEach(data => {
					if(this.sub_category.event.indexOf(data.category)+1){

					}
					else {
						this.sub_category.event.push(data.category);
					}
				})
			}
			if(content.category === "Places"){
				content.data.forEach(data => {
					if(this.sub_category.place.indexOf(data.category)+1){

					}
					else {
						this.sub_category.place.push(data.category);
					}
				})
			}
			if(content.category === "Public Transport"){
				content.data.forEach(data => {
					if(this.sub_category.public_transport.indexOf(data.category)+1){

					}
					else {
						this.sub_category.public_transport.push(data.category);
					}
				})
			}
			if(content.category === "Emergency Contacts"){
				content.data.forEach(data => {
					if(this.sub_category.emergency_contact.indexOf(data.category)+1){

					}
					else {
						this.sub_category.emergency_contact.push(data.category);
					}
				})
			}
		})
		console.log(this.sub_category);
	}

	onChange(){
		if(this.news.sub_category==='Please type new category' || this.event.sub_category==='Please type new category' || this.place.sub_category==='Please type new category'){
			this.new_category = true
		}
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

		uploadNewsImageold(event){
			console.log(event);
			let images: any;
			images = event.target.files;
			console.log(images);

			for (var i = images.length - 1; i >= 0; i--) {
				let image = images[i]
				let reader = new FileReader();
				reader.onload = function (e){
					console.log(e.target["result"]);
					localStorage.setItem("image", e.target['result'])
				}
				reader.readAsDataURL(image)
				console.log(localStorage.getItem("image"));
				// let localImage = JSON.parse(localStorage.getItem("image"))
				// this.uploadedImages.push(localImage.target.result);
				// this.uploadedImages.push(localStorage.getItem("image"));
			}
			// var output = document.getElementById("result");
			// for(var i = 0; i< images.length; i++)
			// {
				// 	var file = images[i];
				// 	//Only pics
				// 	if(!file.type.match('image'))
				// 		continue;
				// 	var picReader = new FileReader();
				// 	picReader.addEventListener("load",function(event){
					// 		var picFile = event.target;
					// 		var div = document.createElement("div");
					// 		div.innerHTML = "<img class='thumbnail' src='" + picFile['result'] + "'" +
					// 		"title='" + picFile['name'] + "'/>";
					// 		output.insertBefore(div,null);
					// 	});
					// 	//Read the image
					// 	picReader.readAsDataURL(file);
					// }

					// this.uploadedImagesHTML = '<img src="' + event.target.files[0] + '" alt="..." class="img-thumbnail">';
				}

				uploadNewsImage(event){
					console.log(event);
					let reader = new FileReader();
					let image : any;
					reader.onload = function (e){
						console.log(e.target['result']);
						document.getElementById("newsImage").setAttribute("style", "display: block; margin-bottom: 10px")
						document.getElementById("newsImage").setAttribute("src", e.target['result'])
						document.getElementById("newsImage").setAttribute("alt", event.target.files[0].name)
					}
					reader.readAsDataURL(event.target.files[0])
				}

				uploadEventImage(event){
					console.log(event);
					let reader = new FileReader();
					let image : any;
					reader.onload = function (e){
						console.log(e.target['result']);
						document.getElementById("eventImage").setAttribute("style", "display: block; margin-bottom: 10px")
						document.getElementById("eventImage").setAttribute("src", e.target['result'])
						document.getElementById("eventImage").setAttribute("alt", event.target.files[0].name)
					}
					reader.readAsDataURL(event.target.files[0])
				}

				uploadPlaceImage(event){
					console.log(event);
					let reader = new FileReader();
					let image : any;
					reader.onload = function (e){
						console.log(e.target['result']);
						document.getElementById("placeImage").setAttribute("style", "display: block; margin-bottom: 10px")
						document.getElementById("placeImage").setAttribute("src", e.target['result'])
						document.getElementById("placeImage").setAttribute("alt", event.target.files[0].name)
					}
					reader.readAsDataURL(event.target.files[0])
				}

				uploadPublicTransportImage(event){
					console.log(event);
					let reader = new FileReader();
					let image : any;
					reader.onload = function (e){
						console.log(e.target['result']);
						document.getElementById("publicTransportImage").setAttribute("style", "display: block; margin-bottom: 10px")
						document.getElementById("publicTransportImage").setAttribute("src", e.target['result'])
						document.getElementById("publicTransportImage").setAttribute("alt", event.target.files[0].name)
					}
					reader.readAsDataURL(event.target.files[0])
				}

				uploadEmergencyContactImage(event){
					console.log(event);
					let reader = new FileReader();
					let image : any;
					reader.onload = function (e){
						console.log(e.target['result']);
						document.getElementById("emergencyContactImage").setAttribute("style", "display: block; margin-bottom: 10px")
						document.getElementById("emergencyContactImage").setAttribute("src", e.target['result'])
						document.getElementById("emergencyContactImage").setAttribute("alt", event.target.files[0].name)
					}
					reader.readAsDataURL(event.target.files[0])
				}

				addNewContent(){
					this.submitted = true;
					if(this.category==="News"){
						this.news.category = this.news.sub_category; //replaceable
						this.news.posted_date = moment().format(); //replaceable
						this.news.created_at = moment().format();
						this.news.updated_at = moment().format();
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
									this.contentService.postNews(this.news)
									.subscribe(data => {
										console.log(data);
										localStorage.setItem("AlertSuccessNewContent", "true");
										this.router.navigateByUrl('/contents/list-contents');
									})
								})
							})
						})
					}
					else if(this.category==="Event"){
						this.event.created_at = moment().format();
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
									this.contentService.postEvent(this.event)
									.subscribe(data => {
										console.log(data);
										localStorage.setItem("AlertSuccessNewContent", "true");
										this.router.navigateByUrl('/contents/list-contents');
									})
								})
							})
						})
					}
					else if(this.category==="Places"){
						this.place.created_at = moment().format();
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
									this.place.photos.push(url); //replaceable
									console.log(this.place);
									this.contentService.postPlace(this.place)
									.subscribe(data => {
										console.log(data);
										localStorage.setItem("AlertSuccessNewContent", "true");
										this.router.navigateByUrl('/contents/list-contents');
									})
								})
							})
						})
					}
					else if(this.category==="Public Transport"){
						this.public_transport.created_at = moment().format();
						this.public_transport.operational_hours = this.public_transport.start_operation + ' - ' + this.public_transport.end_operation + '/ hari ini';
						this.public_transport.short_desc = this.public_transport.route;
						this.public_transport.transport_name = this.public_transport.title;
						this.public_transport.updated_at = moment().format();
						console.log(this.public_transport);
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
									this.contentService.postPublicTransport(this.public_transport)
									.subscribe(data => {
										console.log(data);
										localStorage.setItem("AlertSuccessNewContent", "true");
										this.router.navigateByUrl('/contents/list-contents');
									})
								})
							})
						})
					}
					else if(this.category==="Emergency Contact"){
						this.emergency_contact.created_at = moment().format();
						this.emergency_contact.updated_at = moment().format();
						this.emergency_contact.emergency_name = this.emergency_contact.title;
						console.log(this.emergency_contact);
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
									this.contentService.postEmergencyContacts(this.emergency_contact)
									.subscribe(data => {
										console.log(data);
										localStorage.setItem("AlertSuccessNewContent", "true");
										this.router.navigateByUrl('/contents/list-contents');
									})
								})
							})
						})
					}
					// let contentFix = {
						// 	author: this.newContent.author,
						// 	category: this.newContent.sub_category,
						// 	description: this.newContent.description,
						// 	photos: '',
						// 	posted_date: this.newContent.posted_date,
						// 	title: this.newContent.title
						// }
						// console.log(contentFix);
						// this.contentService.postNews(contentFix)
						// .subscribe(data => {
							// 	console.log(data);
							// 	localStorage.setItem("AlertSuccessNewContent", "true");
							// 	this.router.navigateByUrl('/contents/list-contents');
							// })
							// this.contentService.postContent(contentFix)
							// .subscribe(data => {
								// 	console.log(data);
								// 	localStorage.setItem("AlertSuccessNewContent", "true");
								// 	this.router.navigateByUrl('/contents/list-contents');
								// })
							}

							onUploadSuccess(event){
								console.log(event);
							}

						}
