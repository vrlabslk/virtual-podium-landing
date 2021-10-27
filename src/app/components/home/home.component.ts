import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/data/shared.service';

import data from './../../../assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users = [];

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
    this.users = data["users"];
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

  /**
   * Bind to orientation changes in a mobile device
   */
  @HostListener('window:orientationchange')
  orientationChanged(): void {
    this.checkOrientation();
  }

  /**
   * Login click
   */
  login(): void {
    // validate
    if (this.name.valid && this.email.valid && this.accessCode.valid) {

      let user = this.users.filter(x => x["name"] === this.email.value);
      if (user.length > 0) {
        // this.accessCode.value.startsWith("ACE")
        if (this.accessCode.value.trim() === user[0]["accessCode"]) {
          this.sharedDataSerive.name = this.name.value;

          // navigate to tour
          this.router.navigate(["tour"]);
        }
        else {
          // invalid pw
          this.modalService.open("Invalid Credentials", { modalDialogClass: "text-center p-4" });
        }
      }
      else {
        // no user found
        this.modalService.open("User not found", { modalDialogClass: "text-center p-4" });
      }

    } else {
      this.modalService.open("Please fill data", { modalDialogClass: "text-center p-4" });
    }
  }
}
