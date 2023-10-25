import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core/utils/utils-function';
import { MessageConstants } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  validationMessage = {};
  forgotPasswordForm = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email])
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private utility: UtilityService) {
    this.validationMessage = MessageConstants.ValidationMessage;
  }

  ngOnInit(): void {
  }

  onSendMail() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    let userEmail = [this.forgotPasswordForm.value].map(({ email }) => email);
    this.authService.sendEmailForChangePassword(userEmail)
      .subscribe({
        next: (res) => {
          if (res && res.isSuccess) {
            this.toastr.success(res.message, 'Success');
            this.forgotPasswordForm.reset();
          }
          else {
            this.toastr.error(res.message, 'Error')
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error')
        }
      });
  }

}
