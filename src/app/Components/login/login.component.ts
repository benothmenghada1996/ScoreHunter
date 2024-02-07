import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : any={};
  loginForm: FormGroup;
  errorMsg : string ="";
  constructor(private router: Router, private userService: UserService) { 
  }

  ngOnInit() {

  }

  login(){
    this.userService.login(this.user).subscribe(
      (success) => {
        console.log("Here success",success);
        // this.user = success.user;
        if (success.token) {
          sessionStorage.setItem("token",success.token)
          // localStorage.setItem("connectedUser",success.token.id);
          let user :any = this.decodeToken(success.token);
          user.role == "admin" ?
          this.router.navigate(["admin"]) : 
          this.router.navigate([""]);
        } else {
          this.errorMsg="Please check Email/Pwd" 
        }
      },
      (err) => {console.log("Here error",err);}
    );
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }




}
