import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();
  @Input() authState: Observable<User>;

  constructor() { }

  ngOnInit(): void { }

  public onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
