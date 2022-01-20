import { ValidatorFn, AbstractControl, ValidationErrors, Validators } from "@angular/forms";



export class CustomValidators {

    static passwordStrength(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

            const value = control.value;

            if (!value) {

                return null;

            }

            const hasUpperCase = /[A-Z]+/.test(value);

            const hasLowerCase = /[a-z]+/.test(value);

            const hasNumeric = /[0-9]+/.test(value);

            const hasChar = /[_~!@*-+=|:;"'<,>(){}.?]+/.test(value);

            const isValidLength = /^.{6,}$/.test(value);

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isValidLength;


            return !passwordValid ? { passwordStrength: true } : null;
            

        }

    }

    static checkPasswords(): ValidatorFn{ 
        return (group: AbstractControl):  ValidationErrors | null => { 

            let pass = group.get('password')?.value;
            let confirmPass = group.get('confirmPassword')?.value
            return pass === confirmPass ? null : { notSame: true }
        
      }
    }


   static matchValidator(
        matchTo: string, 
        reverse?: boolean
      ): ValidatorFn {
        return (control: AbstractControl): 
        ValidationErrors | null => {
          if (control.parent && reverse) {
            const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
            if (c) {
              c.updateValueAndValidity();
            }
            return null;
          }
          return !!control.parent &&
            !!control.parent.value &&
            control.value === 
            (control.parent?.controls as any)[matchTo].value
            ? null
            : { matching: true };
        };
      }


static correctName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {

        return null;

    }
    const hasChar = /[_~!@*-+=|:;"'<,>(){}.?$]+/.test(value);

    const isValidLength = /^.{2,}$/.test(value);

   const nameValid = !hasChar && isValidLength;


return !nameValid ? { correctName: true } : null;
  }

}
}