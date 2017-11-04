import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  user = JSON.parse(localStorage.getItem("userData"));

  constructor(public userService: UserService, public router: Router){}

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
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

  ngOnInit(): void {

  }
}
