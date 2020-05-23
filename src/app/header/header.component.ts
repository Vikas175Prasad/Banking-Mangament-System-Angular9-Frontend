import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

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
        } else if(event['url'] == '/register'){
          // console.log("NU")
          this.showRegister = false;
          this.showLogin = true;
        }
      }
    });

  }

  showRegister: boolean = false;
  showLogin: boolean = false;
  ngOnInit(): void {

  }


  
}
