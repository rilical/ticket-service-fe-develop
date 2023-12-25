import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachCallsComponent } from './attach-calls.component';

describe('AttachCallsComponent', () => {
  let component: AttachCallsComponent;
  let fixture: ComponentFixture<AttachCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachCallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
