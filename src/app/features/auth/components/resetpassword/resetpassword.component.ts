import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageRoutesConstants } from 'src/app/core/constants/page-routes.constant';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core/utils/utils-function';
import { MessageConstants } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  code: string = '';
  validationMessage = {};
  resetPasswordForm = new UntypedFormGroup({
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
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private utility: UtilityService) {
    this.validationMessage = MessageConstants.ValidationMessage;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => this.code = params['code']);
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    const resetPwdDet = this.resetPasswordForm.value;
    resetPwdDet.code = this.code;
    this.authService.resetPassword(resetPwdDet)
      .subscribe({
        next: (res) => {
          if (res && res.isSuccess) {
            this.toastr.success(res.message, 'Success')
            this.router.navigate([PageRoutesConstants.Login]);
          }
          else {
            this.toastr.error(res.message, 'Error')
          }
        },
        error: (err) => {
          this.toastr.success(err.error.message, 'Error')
        }
      });
  }

}
