import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayProgressComponent } from './play-progress.component';

describe('PlayProgressComponent', () => {
  let component: PlayProgressComponent;
  let fixture: ComponentFixture<PlayProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
