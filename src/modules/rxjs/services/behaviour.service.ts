import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {
  shareData:BehaviorSubject<any> = new BehaviorSubject({name:'Behaviour'});
  constructor() { }

  get getShareData(){
    return this.shareData.asObservable();
  }

  set setShareData(data:any){
    this.shareData.next(data);
  }
}
