import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare const grecaptcha: any;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})

export class ContactForm {

  contactForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      mensagem: ['', Validators.required],
      recaptchaToken: ['']
    })

  }

  async onSubmit() {
    if (this.contactForm.valid) {

      grecaptcha.ready(async () => {
        const token = await grecaptcha.execute('6Lc6YyssAAAAAFkS3dDyd8EOjqU5Yjv1Vibcg-Qu', { action: 'contact_form' });
        this.contactForm.get('recaptchaToken')?.setValue(token);
        console.log(this.contactForm.get('recaptchaToken'))
        this.http.post('/api/contato', this.contactForm.value)
          .subscribe({
            next: (response) => {
              console.log('Sucesso!', response);
              alert('Mensagem enviada com sucesso!');
              this.contactForm.reset();
            },
            error: (error) => {
              console.error('Erro no envio:', error);
              alert('Houve um erro no envio. Tente novamente.');
              // O erro 401 do Serverless (robô) cairá aqui
            }
          });
      });
    } else {
      console.log('Formulário inválido, revise os campos.');
    }

  }
}
