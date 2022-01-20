import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validors/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  myFormRegister! : FormGroup;
 
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myFormRegister=this.fb.group({
      email: ['',Validators.required], 
      password:['',

      {

        validators: [

          Validators.compose([

            Validators.required,
            CustomValidators.passwordStrength(),
            CustomValidators.matchValidator('confirmPassword', true)

          ])

        ],

        updateOn: 'blur'

      }],
      confirmPassword:['',{
        validators: [
            Validators.compose([
              Validators.required,
              CustomValidators.matchValidator('password')
            ])
        ]
      }],
      firstName:['',{
        validators: [
          Validators.compose([
            Validators.required,
            CustomValidators.correctName()
          ])
        ]
      }],
      lastName:['',{
        validators: [
          Validators.compose([
            Validators.required,
            CustomValidators.correctName()
          ])
        ]
      }]
    })
  }

  register(): void{
    console.log("Registered")
  }



 
  get email() {

    return this.myFormRegister.get('email');

  }

  get password() {

    return this.myFormRegister.get('password');

  }

  get confirmPassword() {

    return this.myFormRegister.get('confirmPassword');

  }

  get firstName() {

    return this.myFormRegister.get('firstName');

  }

  get lastName() {

    return this.myFormRegister.get('lastName');

  }


  
   

}
