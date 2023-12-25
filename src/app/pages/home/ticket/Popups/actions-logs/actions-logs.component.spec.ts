import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsLogsComponent } from './actions-logs.component';

describe('ActionsLogsComponent', () => {
  let component: ActionsLogsComponent;
  let fixture: ComponentFixture<ActionsLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
