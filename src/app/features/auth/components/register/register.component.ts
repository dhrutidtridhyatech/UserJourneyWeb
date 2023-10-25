import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PageRoutesConstants } from 'src/app/core/constants/page-routes.constant';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core/utils/utils-function';
import { MessageConstants } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validationMessage = {};
  registerForm = new UntypedFormGroup({
    fullName: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private utility: UtilityService) {
    this.validationMessage = MessageConstants.ValidationMessage;
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.signupUser(this.registerForm.value)
      .subscribe({
        next: (res) => {
          if (res && res.isSuccess) {
            this.toastr.success(res.message, 'Success');
            this.router.navigate([PageRoutesConstants.Login]);
          } else {
            this.toastr.error(res.message, 'Error');
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        }
      });
  }

}
