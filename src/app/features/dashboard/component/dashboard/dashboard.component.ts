import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageRoutesConstants } from 'src/app/core/constants/page-routes.constant';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([PageRoutesConstants.Login]);
  }

}
