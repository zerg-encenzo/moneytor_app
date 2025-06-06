import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  showPassword: boolean = false;
  username: string = '';
  password: string = '';

  // moneytor_admin
  // M0n3yt0rAdm!n4.

  usernameHelperText: string = '';
  passwordHelperText: string = '';

  constructor(
    private api: ApiService,
    private loader: LoaderService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  async validateUsernameOrPassword(): Promise<boolean> {
    this.usernameHelperText = this.username === '' ? 'Username is required' : '';
    this.passwordHelperText = this.password === '' ? 'Password is required' : '';
    return this.username !== '' && this.password !== '';
  }

  async login() {
    if(await this.validateUsernameOrPassword()){
      this.loader.show('Logging in...').then(() => {
        this.usernameHelperText = '';
        this.passwordHelperText = '';

        this.api.postData('/Moneytor/Auth/login', { username: this.username, password: this.password }).subscribe({
          next: (response) => {
            // Handle successful login
            this.toast.success('Login successful!');
            console.log(response); // Log the response for debugging

            // Redirect to home/dashboard
            this.router.navigate(['/home']).then(() => {
              this.loader.dismiss(); // Dismiss the loader
            });
          },
          error: (err: HttpErrorResponse) => {
            this.loader.dismiss(); // Dismiss the loader
            let errorMessage = (err.error == "undefined") ? "Login Failed." : err.error;
            this.toast.error(errorMessage);   // Display the error to the user (you can use Ionic Toast or Alert)
          }
        });
      });
    }
    else {
      this.toast.error('Please fill in all required fields.');
    }
  }
}
