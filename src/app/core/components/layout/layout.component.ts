import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public userAuth: Observable<User> = this.authService.getUserAuth;

  constructor(private authService: AuthService, private loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
  }

  public async onLogout(): Promise<void> {
    await this.authService.logout();
    this.sidenav.close();
    this.loadingService.toggleLoading(false);
    this.router.navigate(['auth']);
  }

  public onNavigatedOut(): void {
    this.sidenav.close();
  }
}
