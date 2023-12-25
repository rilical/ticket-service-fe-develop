import {Component} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared';

@Component({
  selector: 'app-ticket-replies',
  templateUrl: './ticket-replies.component.html',
  styleUrls: ['./ticket-replies.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TicketRepliesComponent {

}
