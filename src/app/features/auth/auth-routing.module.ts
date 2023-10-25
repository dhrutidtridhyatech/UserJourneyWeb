import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register page'
        }
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent,
        data: {
          title: 'Reset Password page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotpasswordComponent,
        data: {
          title: 'Forgot Password page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
