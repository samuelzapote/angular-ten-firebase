import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { LoadingService } from '../core/services/loading.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public user: Observable<User>;
  public authState: Observable<User>;

  constructor(private authService: AuthService, private loadingService: LoadingService, private router: Router) {
    this.user = this.authService.getUser;
    this.authState = this.authService.getAuthState;
  }

  ngOnInit(): void { }

  public async onLogout(): Promise<void> {
    this.loadingService.setLoading(true);
    await this.sidenav.close();
    await this.authService.logout();
    await this.router.navigate(['auth']);
    this.loadingService.setLoading(false);
  }

  public onNavigatedOut(): void {
    this.sidenav.close().catch();
  }
}
