import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyService } from '../core/services/alertify.service';
import { AuthService } from '../core/services/auth.service';
import { CustomValidators } from '../custom-validors/custom-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup
  subscribtion!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      email: ['',Validators.required], 
      password:['',

      {

        validators: [

          Validators.compose([

            Validators.required,
            CustomValidators.passwordStrength()

          ])

        ],

        updateOn: 'blur'

      }]
    })
    this.subscribtion = this.myForm.controls['email'].valueChanges.subscribe(value => {
      console.log(value);
    });
  }
  
  login(){
    console.log('login')
    if('token'){
      window.localStorage.setItem("token", "value");
      this.alertify.success('Logged succesfully')
    }else {
      this.alertify.error('User or password wrong');
    }
    

  }

  // saveInLocalStorage(token: string) {
  //   window.localStorage.setItem('token', token);
  // }

  // ngOnDestroy(): void {
  //   this.subscribtion.unsubscribe();
  // }

  get email() {

    return this.myForm.get('email');

  }

  get password() {

    return this.myForm.get('password');

  }

}
