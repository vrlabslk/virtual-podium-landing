import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/data/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required]);
  accessCode = new FormControl(null, [Validators.required]);

  loginForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      accessCode: this.accessCode
    }
  );

  constructor(
    private modalService: NgbModal,
    private router: Router,
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
    // validate
    if (this.name.valid && this.email.valid && this.accessCode.valid) {
      if (this.accessCode.value.startsWith("ACE")) {
        // this.sharedDataSerive.liveUrl = liveUrl;
        this.sharedDataSerive.name = this.name.value;

        // navigate to tour
        this.router.navigate(['tour']);
      }
    } else {
      this.modalService.open("Invalid Credentials", { modalDialogClass: "text-center p-4" });
    }
  }
}
