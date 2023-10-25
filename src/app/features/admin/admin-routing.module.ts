import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmanagementComponent } from './components/adminmanagement/adminmanagement.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-management',
        component: AdminmanagementComponent,
        data: {
          title: 'admin management'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
