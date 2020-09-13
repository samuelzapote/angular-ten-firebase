import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

}
