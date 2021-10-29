import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Asian Congress on Endometriosis';

  ngOnInit(): void {
    this.checkOrientation();
  }

  constructor(
    private modalService: NgbModal) { }

  /**
   * Check for screen orientation change and show warning
   */
  checkOrientation(): void {
    var mql = window.matchMedia("(orientation: portrait)");
    if (window.orientation === 0 || window.orientation === 180 || !mql.matches) {
      let content = "Please change the orientation of your device for a better experience";
      this.modalService.open(content, { size: 'sm', centered: true, modalDialogClass: "text-center p-2" });
    } else {
      this.modalService.dismissAll();
    }
  }

  /**
   * Bind to orientation changes in a mobile device
   */
  @HostListener('window:orientationchange')
  orientationChanged(): void {
    this.checkOrientation();
  }
}
