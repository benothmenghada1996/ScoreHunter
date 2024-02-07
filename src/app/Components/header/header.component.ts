import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

role : string;
  constructor(private router : Router) { }

  ngOnInit() {
  }
  isLogged(){
    const jwt = sessionStorage.getItem("token");
    if (jwt) {
      let user : any=this.decodeToken(jwt);
      this.role= user.role;
      console.log(""); 
    }
    return !!jwt
    }
    decodeToken(token: string) {
      return jwt_decode(token);
    } 
  logOut(){
  sessionStorage.removeItem("token");
  this.router.navigate([""]);
  }  

}
