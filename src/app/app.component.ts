import { Component } from '@angular/core';

import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isLoading(): boolean {
    return this.loadingService.isLoading;
  }

  constructor(private loadingService: LoadingService) { }

}
