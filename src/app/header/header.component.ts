import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { 

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showRegister = true;
          this.showLogin = false;
          this.showLogout = false;
        } else if(event['url'] == '/register'){
          // console.log("NU")
          this.showRegister = false;
          this.showLogin = true;
          this.showLogout = false;
        }
      }
    });

    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if(this.userDetails != undefined && this.userDetails !== ''){
         this.showLogout = true;
         this.showLogin = false;
         this.showRegister = false;

    }

  }

  userDetails = {};
  showRegister: boolean = false;
  showLogin: boolean = false;
  showLogout: boolean = false;
  ngOnInit(): void {

  }


  
}
