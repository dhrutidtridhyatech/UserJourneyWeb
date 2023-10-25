import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminmanagementComponent } from './components/adminmanagement/adminmanagement.component';


@NgModule({
  declarations: [
    AdminmanagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
