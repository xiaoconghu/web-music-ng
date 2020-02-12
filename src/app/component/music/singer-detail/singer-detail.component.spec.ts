import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerDetailComponent } from './singer-detail.component';

describe('SingerDetailComponent', () => {
  let component: SingerDetailComponent;
  let fixture: ComponentFixture<SingerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
