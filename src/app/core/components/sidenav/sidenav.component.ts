import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as datefns from 'date-fns';

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

  readonly midDay: Date;

  get greeting(): string {
    return this.generateGreeting();
  }

  public sideNavButtons = [
    { label: 'home', path: '', icon: 'home' },
    { label: 'profile', path: 'profile', icon: 'account_circle' },
    { label: 'account', path: 'account', icon: 'settings' },
  ];

  constructor(private deviceService: DeviceService) {
    this.midDay = datefns.setHours(datefns.setSeconds(datefns.setMilliseconds(new Date(), 0), 0), 12);
  }

  public ngOnInit(): void { }

  public onExitSidenav(): void {
    this.exitSidenav.emit();
  }

  public generateGreeting(): string {
    return datefns.isBefore(new Date(), this.midDay) ? 'Good Morning,' : 'Good Afternoon,';
  }

  public onNavigateOut(): void {
    this.navigatedOut.emit();
  }

  public onLogout(): void {
    this.logout.emit();
  }
}
