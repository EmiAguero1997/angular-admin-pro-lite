import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-view',
  templateUrl: './rxjs-view.component.html',
  styleUrls: ['./rxjs-view.component.scss']
})
export class RxjsViewComponent implements OnInit, OnDestroy {

  intervalSubscription:Subscription

  constructor() {
    this.intervalSubscription = this.retornIntervalo().subscribe(
      response=>{
        console.log(response);
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  retornaObs():Observable<number>{
    const obs$ = new Observable<number>( observer =>{
      let i = -1;
      const interval = setInterval(()=>{
        i++;
        observer.next(i);
        i==4 && (
          observer.complete()
        )
  
        i==2 &&(
          i = -1,
          observer.error('i llego a 2')
        )
      },1000);
    });
    return obs$;
  }

  retornIntervalo():Observable<number>{
    return interval(500).pipe(
      take(10),
      map(response => response + 1),
      filter(response => response % 2 == 0),
    );
  }

}
