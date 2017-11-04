import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../services/user.service'
import {AlertService} from '../services/alert.service'

@Component({
	templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	@ViewChild("dangerModal") dangerModal;
	returnUrl: string;
	loginCredentials = {
		username: null,
		password: null
	}
	submitted = false;
	loginErrorMessage = null;

	constructor(public route: ActivatedRoute, public router: Router, public userService: UserService, public alertService: AlertService) { }

	login(){
		this.submitted = true;
		console.log(this.loginCredentials);
		this.userService.login(this.loginCredentials.username, this.loginCredentials.password)
		.subscribe(data => {
			console.log(data);
			if(data.success){
				localStorage.setItem("accessToken", data.data.id);
				this.userService.getUser(data.data.userId)
				.subscribe(data => {
					console.log(data);
					// if(data.admin){
						if(data.role_admin == "City Living CMS" || data.username == "batu_admin"){
							localStorage.setItem("userData", JSON.stringify(data));
							localStorage.setItem("userCred", JSON.stringify(this.loginCredentials));
							// this.router.navigateByUrl('/contents/list-contents');
							this.router.navigate([this.returnUrl])
							this.submitted = false;
						}
						else{
							this.loginErrorMessage = "Mohon maaf hanya admin yang dapat login"
							this.dangerModal.show();
							this.submitted = false;
						}
					})
			}
			else{
				//401 username or password error
				if(data.data.status===401){
					this.loginErrorMessage = "Mohon cek kembali username dan password anda";
				}
				//0 no internet connection
				else if(data.data.status===0){
					this.loginErrorMessage = "Mohon cek koneksi internet anda";
				}
				else{
					this.loginErrorMessage = "Terjadi masalah, silahkan coba lagi nanti";
				}
				this.dangerModal.show();
				this.submitted = false;
			}
		})
	}

	ngOnInit(){
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
}
