import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedService } from 'src/app/services/data/shared.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  url = "";
  name = "";

  constructor(private deviceDetectorService: DeviceDetectorService, private sharedDataSerive: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.name = this.sharedDataSerive.name;

    // check for device/user-agent
    const currentDevice = this.deviceDetectorService.getDeviceInfo();
    let liveUrl = '';
    liveUrl = (currentDevice.os === "iOS" && currentDevice.browser === "Safari")
      ? 'googlechromes://virtualpodiumtest.z23.web.core.windows.net/'
      : 'https://virtualpodiumtest2.z23.web.core.windows.net/'

    setTimeout(() => {
      window.location.href = liveUrl;
    }, 2500);

    // this.url = this.sanitizer.sanitize(SecurityContext.URL, this.sharedDataSerive.liveUrl) + '';
  }

}
