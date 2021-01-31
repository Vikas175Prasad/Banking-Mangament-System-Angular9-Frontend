import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { 
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.maxDate = new Date(currentYear , currentMonth, currentDate);
  }

  ngOnInit(): void {
    
  }
  email: string = '';
  hide: boolean = true;
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  address: string = '';
  zip: string = '';
  dob: Date;
  maxDate: Date;

  register() {
    let registerDetails = {};
    registerDetails["email"] = this.email;
    registerDetails["firstName"] = this.firstName;
    registerDetails["lastName"] = this.lastName;
    registerDetails["email"] = this.email;
    registerDetails["zip"] = this.zip;
    registerDetails["address"] = this.address;
    registerDetails["mobile"] = this.mobile;
    registerDetails["dob"] = this.dob;
    console.log(registerDetails);
    this.userService.registerUser(registerDetails).subscribe(data => {

      console.log(data);
      if(data.id !== null){

        Swal.fire({
          title: 'Registered Successfully!!!',
          text: 'Please check your email for login details.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'LOGIN',
        }).then((result) => {
          if (result.value) {

          this.router.navigate(['login']);
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

    })
  }
}
