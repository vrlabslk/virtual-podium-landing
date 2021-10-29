import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private deviceDetectorService: DeviceDetectorService,
    private sharedDataSerive: SharedService) { }

  ngOnInit(): void {
    this.name = this.sharedDataSerive.name;

    // check for device/user-agent
    const currentDevice = this.deviceDetectorService.getDeviceInfo();
    let liveUrl = 'https://virtualpodiumtest2.z23.web.core.windows.net/';
    // liveUrl = (currentDevice.os === "iOS" && currentDevice.browser === "Safari")
    //   ? 'googlechromes://virtualpodiumtest.z23.web.core.windows.net/'
    //   : 'https://virtualpodiumtest2.z23.web.core.windows.net/'

    if (currentDevice.os === "iOS" && currentDevice.browser === "Safari") {
      const browserVersion = parseFloat(currentDevice.browser_version);
      if (browserVersion < 15)
        liveUrl = 'googlechromes://virtualpodiumtest.z23.web.core.windows.net/'
    }

    setTimeout(() => {
      window.location.href = liveUrl;
    }, 2500);
  }
}
