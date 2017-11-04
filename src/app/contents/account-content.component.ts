import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

declare function unescape(s:string): string;
declare function escape(s:string): string;

@Component({
	templateUrl: 'account-content.component.html'
})
export class AccountComponent {

	showAlertSuccessNewContent = false;
	pass = {
		newPassword: null,
	}

	pass2 = {
		newPassword2: null,
	}

	passNow = {
		password: null,
	}
	
	submitted = false;
	submitteded = false;

	user = JSON.parse(localStorage.getItem("userCred"));

	constructor(private userService: UserService, public router: Router) {
	}

	changePass(){
		console.log(this.passNow.password);
		console.log(this.pass.newPassword);
		console.log(this.pass2.newPassword2);
		if(this.passNow.password == this.pass.newPassword){
			alert('Password anda sama dengan sebelumnya, mohon ganti dengan password lain')
		}
		else if(this.user.password == this.passNow.password){
			this.userService.changePass(this.pass)
			.subscribe(()=> {
		      // localStorage.setItem("AlertSuccessNewContent", "true");
		      alert('Password berhasil diganti, silahkan kembali masuk');
		      // this.showAlertSuccessNewContent = true;
		      this.logout();
			})
		}
		else alert('Password lama anda salah')
	 //    this.submitted = true;
	 //    this.submitteded = true;
	 //    console.log('this.pass.newPassword');
	 //    console.log('this.pass.newPassword2');
	 //    if(this.pass.newPassword===this.pass2.newPassword2) {
		//     this.userService.changePass(this.pass)
		//     .subscribe(()=>{
		//       console.log(this.pass);
		//       localStorage.setItem("AlertSuccessNewContent", "true");
		//       alert('Password berhasil diganti, silahkan kembali masuk');
		//       this.logout();
		//       this.showAlertSuccessNewContent = true;
		//     });
		// } else {
		// 	alert('Password tidak sama, silahkan coba lagi!');
		// }
	  }

	  checkPass(){
	  	this.submitted = true;
	    this.submitteded = true;
	  	console.log('USERDATA: ' + this.user.password);
	  	console.log('PASS INPUT: ' + this.passNow.password);
	  	if(this.user.password==this.passNow.password) {
	  		alert('Password Benar');
	  	} else {
	  		alert('Password Salah');
	  	}
	    localStorage.setItem("AlertSuccessNewContent", "true");
	    this.router.navigateByUrl('/contents/account-content');
	  }

	  logout(){
	    console.log("logging out");
	    this.userService.logout()
	    .subscribe(()=>{
	      console.log("logged out!");
	      localStorage.removeItem("accessToken");
	      localStorage.removeItem("currentUser");
	      this.router.navigate(['pages/login']);
	    });
	  }

}
