import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  get isMobile(): boolean { return this.deviceDetectorService.isMobile(); }
  get isTablet(): boolean { return this.deviceDetectorService.isTablet(); }
  get isDesktop(): boolean { return this.deviceDetectorService.isDesktop(); }

  constructor(private deviceDetectorService: DeviceDetectorService) { }
}
