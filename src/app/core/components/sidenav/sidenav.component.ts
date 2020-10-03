import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceService } from '../../services/device.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() exitSidenav: EventEmitter<void> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() navigatedOut: EventEmitter<void> = new EventEmitter();
  @Input() user: Observable<User>;

  get onMobile(): boolean { return this.deviceService.isMobile; }

  public sideNavButtons = [
    { label: 'home', path: '', icon: 'home' },
    { label: 'profile', path: 'profile', icon: 'account_circle' },
    { label: 'account', path: 'account', icon: 'settings' },
  ];

  constructor(private deviceService: DeviceService) { }

  public ngOnInit(): void { }

  public onExitSidenav(): void {
    this.exitSidenav.emit();
  }

  public onNavigateOut(): void {
    this.navigatedOut.emit();
  }

  public onLogout(): void {
    this.logout.emit();
  }
}
