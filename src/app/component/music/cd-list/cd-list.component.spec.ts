import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdListComponent } from './cd-list.component';

describe('CdListComponent', () => {
  let component: CdListComponent;
  let fixture: ComponentFixture<CdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
