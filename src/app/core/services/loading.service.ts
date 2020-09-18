import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean;

  constructor() { }

  public toggleLoading(loadStatus: boolean): void {
    this.loading = !!loadStatus;
  }

  public isLoading(): boolean {
    return this.loading;
  }
}
