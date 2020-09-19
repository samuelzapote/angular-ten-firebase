import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() navigatedOut: EventEmitter<void> = new EventEmitter();

  public sideNavButtons = [
    { label: 'home', path: '', icon: 'home' },
    { label: 'profile', path: 'profile', icon: 'account_circle' },
    { label: 'account', path: 'account', icon: 'settings' },
  ];

  constructor() { }

  ngOnInit(): void { }

  public onLogout(): void {
    this.logout.emit();
  }

  public onNavigateOut(): void {
    this.navigatedOut.emit();
  }
}
