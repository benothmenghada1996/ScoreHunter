import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,PatternValidator} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/custom-validators/confirm-pwd';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm :FormGroup;
  path :string;
  imagePreview :any;
  constructor(private formBuilder:FormBuilder, private userService : UserService, private router : Router) { 
  }
  ngOnInit() {
    this.path=this.router.url;
    console.log("Here path", this.path);
    this.signupForm = this.formBuilder.group({
      firstName :['', [Validators.required,Validators.minLength(3)]],
      lastName : ['', [Validators.required,Validators.minLength(5)]],
      email : ['', [Validators.required,Validators.email]],
      pwd: ['', [Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z])/)]],
      confirmPwd: [''],
      img : [''],
    },
      {
      validators: MustMatch('pwd','confirmPwd')
      }
    );
  }
  SignUp(){
    this.signupForm.value.role =(this.path == "/sign-up") ? "user" : "admin"
    console.log("this.signupForm.value", this.signupForm.value);
    this.userService.signUp(this.signupForm.value, this.signupForm.value.img).subscribe(
      (success) => {console.log("Here success",success);},
      (err) => {console.log("Here error",err);}
    )
    this.router.navigate(["login"]);
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
