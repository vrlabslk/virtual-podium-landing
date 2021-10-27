import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/data/shared.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  url = "";

  constructor(private sharedDataSerive: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.sanitize(SecurityContext.URL, this.sharedDataSerive.liveUrl) + '';
  }

}
