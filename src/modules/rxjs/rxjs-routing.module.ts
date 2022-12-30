import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsViewComponent } from './containers/rxjs-view/rxjs-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'rxjs'
  },
  {
    path:'rxjs',
    component:RxjsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
