import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  name!: string;
  email!: string;
  liveUrl!: string;

  constructor() { }
}
