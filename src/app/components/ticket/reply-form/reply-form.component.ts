import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  replyForm!: FormGroup;
  attachments: File[] = [];
  attachmentNames: string = ''; // To store the names of attached files

  @Output() replySubmitted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.replyForm = this.formBuilder.group({
      message: ['', Validators.required],
      attachments: [null],
      visibleToReseller: [false],
      // Additional form controls for text formatting (Note: Actual formatting logic not included)
      textBold: [false],
      textItalic: [false],
      textUnderline: [false],
      textColor: ['#000000'] // Default color
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.attachments = Array.from(input.files);
    this.attachmentNames = this.attachments.map(file => file.name).join(', ');

    // Update the label to display the file names
    const label = document.querySelector('.custom-file-label');
    if (label) {
      label.textContent = this.attachmentNames || 'Choose Files';
    }
  }

  onSubmitReply(): void {
    if (this.replyForm.valid) {
      const formData = new FormData();
      formData.append('message', this.replyForm.value.message);
      formData.append('visibleToReseller', this.replyForm.value.visibleToReseller.toString());
      // Append text formatting data
      formData.append('textBold', this.replyForm.value.textBold.toString());
      formData.append('textItalic', this.replyForm.value.textItalic.toString());
      formData.append('textUnderline', this.replyForm.value.textUnderline.toString());
      formData.append('textColor', this.replyForm.value.textColor);

      this.attachments.forEach(file => {
        formData.append('attachments', file, file.name);
      });

      this.http.post('/api/tickets/replies', formData).subscribe(
        response => {
          console.log('Reply submitted successfully', response);
          this.replySubmitted.emit(response);
          this.resetForm();
        },
        error => {
          console.error('Error submitting reply:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.replyForm.reset({
      textBold: false,
      textItalic: false,
      textUnderline: false,
      textColor: '#000000',
      visibleToReseller: false
    });
    this.attachments = [];
    this.attachmentNames = '';

    // Reset the label
    const label = document.querySelector('.custom-file-label');
    if (label) {
      label.textContent = 'Choose Files';
    }
  }
}
