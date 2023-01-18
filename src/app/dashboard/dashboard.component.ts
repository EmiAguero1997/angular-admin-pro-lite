import { Component, AfterViewInit } from '@angular/core';
import { BehaviourService } from '../../modules/rxjs/services/behaviour.service';
import { Observable } from 'rxjs';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  data$:Observable<any>;
  subtitle: string;
  constructor(private behaviourService:BehaviourService) {
    this.subtitle = 'This is some text within a card block.';
    this.data$ = this.behaviourService.getShareData;
  }

  ngAfterViewInit() { }
}
