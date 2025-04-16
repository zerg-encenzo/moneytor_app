// services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  /**
   * Show a toast message
   * @param message Message to display
   * @param color Toast color: 'success', 'warning', 'danger', 'primary', etc.
   * @param duration Duration in milliseconds
   * @param position Position: 'top', 'bottom', 'middle'
   */
  async showToast(
    message: string, 
    color: string = 'primary', 
    duration: number = 4000, 
    position: 'top' | 'bottom' | 'middle' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
      buttons: [
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
    return toast;
  }

  /**
   * Show a success toast
   * @param message Message to display
   */
  async success(message: string) {
    return this.showToast(message, 'success');
  }

  /**
   * Show an error toast
   * @param message Message to display
   */
  async error(message: string) {
    return this.showToast(message, 'danger');
  }

  /**
   * Show a warning toast
   * @param message Message to display
   */
  async warning(message: string) {
    return this.showToast(message, 'warning');
  }
}