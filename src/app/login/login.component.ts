import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  email = '';
  hide = true;
  password = '';


  login(){
      let loginDetails = {};
      loginDetails["email"] = this.email;
      loginDetails["password"] = this.password;
      console.log(loginDetails);
      this.userService.login(loginDetails).subscribe(data=>{
             console.log(data);
             if(data.length !== 0){
               window.localStorage.setItem("userDetails",JSON.stringify(data));
               this.router.navigate(['dashboard']);
             }else{
              Swal.fire({
                title: 'Login Failed!!!',
                text: 'Please check your login credentials.',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {

                  // Swal.fire(
                  //   'Deleted!',
                  //   'Your imaginary file has been deleted.',
                  //   'success'
                  // )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // Swal.fire(
                  //   'Cancelled',
                  //   'Your imaginary file is safe :)',
                  //   'error'
                  // )
                }
              })
             }
      });

  }
}
