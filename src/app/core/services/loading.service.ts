import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean;

  get isLoading(): boolean {
    return this.loading;
  }

  constructor() { }

  public setLoading(loadStatus: boolean): void {
    this.loading = !!loadStatus;
  }
}
