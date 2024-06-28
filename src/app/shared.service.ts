import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  sendData(data: any): void {
    const event = new CustomEvent('angularEvent', { detail: data });
    window.dispatchEvent(event);
  }
}
