import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageRoutesConstants } from 'src/app/core/constants/page-routes.constant';
import { ToastrService } from 'ngx-toastr';
import { MessageConstants } from 'src/app/core/constants/message.constant';
import { UtilityService } from 'src/app/core/utils/utils-function';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validationMessage = {};
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private utility: UtilityService) {
    this.validationMessage = MessageConstants.ValidationMessage;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (res) => {
          if (res && res.isSuccess) {
            localStorage.setItem('LoginUserDetail', JSON.stringify(res.data));
            this.toastr.success(res.message, 'Success')
            this.router.navigate([PageRoutesConstants.Dashboard]);
          } else {
            this.toastr.error(res.message, 'Error')
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error')
        }
      });
  }

}
