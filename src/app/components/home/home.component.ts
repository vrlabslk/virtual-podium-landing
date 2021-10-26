import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedService } from 'src/app/services/data/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public deviceDetectorService: DeviceDetectorService,
    private modalService: NgbModal,
    private sharedDataSerive: SharedService) {

  }
  ngOnInit(): void {
    this.checkOrientation();
  }

  /**
   * Check for screen orientation change and show warning
   */
  checkOrientation(): void {
    if (window.orientation === 0 || window.orientation === 180) {
      let content = "Please change the orientation of your device for a better experience";
      this.modalService.open(content, { size: 'sm', centered: true, modalDialogClass: "text-center p-2" });
    } else {
      this.modalService.dismissAll();
    }
  }

  @HostListener('window:orientationchange')
  orientationChanged(): void {
    this.checkOrientation();
  }

  login(): void {
    // if os == iOS
    /// if browser == safari
    // then, open in chrome
    // if 15>, 2.0
    // else 1.0

    // check for device/user-agent
    const currentDevice = this.deviceDetectorService.getDeviceInfo();
    let liveUrl = '';
    console.log(currentDevice);

    liveUrl = (currentDevice.os === "iOS" && currentDevice.browser === "Safari")
      ? 'googlechromes://virtualpodiumtest.z23.web.core.windows.net/'
      : 'https://virtualpodiumtest2.z23.web.core.windows.net/'

    this.sharedDataSerive.liveUrl = liveUrl;

    // navigate to tour
    
  }
}
