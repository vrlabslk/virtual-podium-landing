import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedService } from 'src/app/services/data/shared.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  url = "";
  name = "";
  storeLink = Constants.PLAY_STORE_CHROME;

  constructor(private deviceDetectorService: DeviceDetectorService,
    private sharedDataSerive: SharedService) { }

  ngOnInit(): void {
    this.name = this.sharedDataSerive.name;

    // check for device/user-agent
    const currentDevice = this.deviceDetectorService.getDeviceInfo();
    const browserVersion = parseFloat(currentDevice.browser_version);

    let liveUrl = Constants.WEBGL_2;

    if (currentDevice.os === "iOS" && currentDevice.browser === "Safari") {
      this.storeLink = Constants.APP_STORE_CHROME;
      if (browserVersion < 15)
        liveUrl = Constants.CHROME_LINK;
    }

    setTimeout(() => {
      if (currentDevice.os === "iOS" && currentDevice.browser === "Safari") {
        if (browserVersion < 15)
          setTimeout(function () { window.location.href = Constants.APP_STORE_CHROME; }, 500);
      }

      // window.location.href = liveUrl;
    }, 5000);
  }
}
