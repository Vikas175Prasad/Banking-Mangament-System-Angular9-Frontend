import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showRegister = true;
          this.showLogin = false;
          this.showLogout = false;
        } else if (event['url'] == '/register') {
          // console.log("NU")
          this.showRegister = false;
          this.showLogin = true;
          this.showLogout = false;
        }
      }
    });

    console.log(userService.currentUser);
    if (userService.currentUser !== null && userService.currentUser !== undefined) {
      this.userDetails = userService.currentUser;
      this.showLogout = true;
      this.showLogin = false;
      this.showRegister = false;
    }

    userService.itemValue.subscribe(currentUser => {
      this.userDetails = currentUser;

      if (this.userDetails !== undefined) {
        this.userDetails = JSON.parse(localStorage.getItem("userDetails"));

        if (this.userDetails != undefined) {
          this.showLogout = true;
          this.showLogin = false;
          this.showRegister = false;

        }
      }
    });



  }

  userDetails: User;
  showRegister: boolean = false;
  showLogin: boolean = false;
  showLogout: boolean = false;
  ngOnInit(): void {

  }

  logout() {
    localStorage.removeItem("userDetails");
  }



}
