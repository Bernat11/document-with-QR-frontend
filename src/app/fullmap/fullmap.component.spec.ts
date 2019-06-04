import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullmapComponent } from './fullmap.component';

describe('FullmapComponent', () => {
  let component: FullmapComponent;
  let fixture: ComponentFixture<FullmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
