import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();
  @Input() authUser: Observable<User>;

  constructor() { }

  ngOnInit(): void { }

  public onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

}
