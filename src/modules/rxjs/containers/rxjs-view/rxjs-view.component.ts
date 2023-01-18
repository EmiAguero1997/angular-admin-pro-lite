import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviourService } from '../../services/behaviour.service';
import { interval, Observable, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-view',
  templateUrl: './rxjs-view.component.html',
  styleUrls: ['./rxjs-view.component.scss']
})
export class RxjsViewComponent implements OnInit, OnDestroy {

  intervalSubscription:Subscription;
  pokemons:any;
  pokemons2:any = [];
  subs:Subscription[]=[];
  data$:Observable<any>;

  constructor(private _http:HttpClient, private behaviourService:BehaviourService) {
    this.data$ = this.behaviourService.getShareData;
    this.getPokemons().subscribe({
      next:response=>{
        this.pokemons = response.results;
        this.handler().then(()=>{     //SYNCHRONOUS ITERABLE HTTP REQ: handler() returns a promise, we wait the promise to finish and then we write
          console.log(this.pokemons2);
        })
      }
    });
    this.intervalSubscription = this.retornaObs().subscribe(
      response=>{
        console.log(response);
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
    this.subs.forEach((element)=>{
      element.unsubscribe();
    })
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
  
        // i==2 &&(
        //   i = -1,
        //   observer.error('i llego a 2')
        // )
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

  getPokemons():Observable<any>{
    return this._http.get('https://pokeapi.co/api/v2/pokemon');
  }

  getOnePokemon(name:string):Observable<any>{
    return this._http.get('https://pokeapi.co/api/v2/pokemon/'+name);
  }

  handler(){ // this returns a promise wich body has the http requests iteration
    const promise = new Promise<void>((resolve)=>{

        //iteration

        this.pokemons.forEach((element:any) => {

          //http request

          this.subs.push(this.getOnePokemon(element.name).subscribe({
            next:response=>{
              this.pokemons2.push(response);
            }
          }))
          
        })
        resolve();
    })

    //return the promise

    return promise;
  }

  changeBehaviour(){
    this.behaviourService.setShareData = {name:'i have changed'};
  }

}
