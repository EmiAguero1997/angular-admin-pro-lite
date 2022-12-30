import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsViewComponent } from './rxjs-view.component';

describe('RxjsViewComponent', () => {
  let component: RxjsViewComponent;
  let fixture: ComponentFixture<RxjsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
