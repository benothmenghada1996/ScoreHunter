import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,PatternValidator} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  ediProfileForm :FormGroup;
  userId:any;
  user:any={};
  userTosend:any={};
  errorMsg:any;

  constructor(private formBuilder:FormBuilder, private userService : UserService, private router : Router) { 
  }
  ngOnInit() {
    this.userId = localStorage.getItem("connectedUser");
    this.userService.getUserById(this.userId).subscribe(
      (success) => {
        console.log("Here success",success.findedUser);
        this.user = success.findedUser;
      },
      (err) => {console.log("Here error",err);}
     );
     this.ediProfileForm = this.formBuilder.group({
      // tel :['', [Validators.required,Validators.minLength(8)]],
      fName : ['', [Validators.required]],
      lName : ['', [Validators.required]],
      oldPwd: ['', [Validators.required,Validators.pattern(/^.{6,12}$/)]],
      newPwd : ['', [Validators.required,Validators.pattern(/^.{6,12}$/)]],
      confirmNewPwd : ['', [Validators.required]],
    });
    }
    ediProfile(){
      this.userTosend = {
        id : this.userId,
        oldPwd: this.ediProfileForm.value.oldPwd,
        newPwd : this.ediProfileForm.value.newPwd,
      };
      console.log("Here object To Send", this.userTosend)
      
      this.userService.editProfile(this.userTosend).subscribe(
        (success) => {
           console.log("Here data after edit", success);
           if (success.msg == "0") {
            this.errorMsg="please check your pwd";
           } else {
            this.router.navigate([""]);
           }

        },
        (error) => {
          console.log("Here error", error);
        }
      );
    }
    
  }
  


