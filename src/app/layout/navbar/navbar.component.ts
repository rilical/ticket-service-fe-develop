import {Component} from '@angular/core';
import {CreateTicketService} from "../../components/ticket/create-ticket/create-ticket.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isCreateTicketModalOpen = false;

  constructor(private createTicketService: CreateTicketService) {
  }

  ngOnInit() {
    this.createTicketService.modalState$.subscribe((isOpen) => {
      this.isCreateTicketModalOpen = isOpen;
    });
  }

  onClickCreateTicket() {
    this.createTicketService.openModal();
  }
}
