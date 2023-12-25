import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from 'src/app/shared/services/storage.service';
import { TicketModule } from './ticket/ticket.module'; 
import {TicketsListComponent} from './tickets-list/tickets-list.component';
import {TicketRepliesComponent} from './ticket-replies/ticket-replies.component';
import {SharedModule} from 'src/app/shared/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TicketModule,
    TicketsListComponent,
    TicketRepliesComponent


  ],
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute, private storageService: StorageService) {
    // this.checkLoginSesstion() ;
  }

}
