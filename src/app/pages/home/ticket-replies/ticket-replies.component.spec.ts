import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketRepliesComponent} from './ticket-replies.component';

describe('TicketRepliesComponent', () => {
  let component: TicketRepliesComponent;
  let fixture: ComponentFixture<TicketRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketRepliesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
