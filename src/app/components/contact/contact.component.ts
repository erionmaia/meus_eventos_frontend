import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  contactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading = false;

  async onSubmit(): Promise<void> {
    if (this.isLoading) return;

    try {
      this.isLoading = true;
      // TODO: Implement your contact form submission logic here
      // Example:
      // const response = await this.contactService.sendMessage(this.contactData);
      // if (response.success) {
      //   // Show success message
      //   this.resetForm();
      // }
      
      // Temporary success simulation
      console.log('Mensagem enviada:', this.contactData);
      this.resetForm();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // TODO: Implement error handling
    } finally {
      this.isLoading = false;
    }
  }

  private resetForm(): void {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
