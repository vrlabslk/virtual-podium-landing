import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  liveUrl!: string;

  constructor() { }
}
