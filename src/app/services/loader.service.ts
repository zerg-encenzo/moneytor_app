// services/loader.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  /**
   * Show a loader with customizable message and options
   * @param message Text to display in the loader
   * @param options Additional loading options
   */
  async show(message: string = 'Please wait...', options: any = {}) {
    // Dismiss any existing loader
    await this.dismiss();

    // Create and present a new loader
    this.loader = await this.loadingController.create({
      message: message,
      spinner: 'circular',
      backdropDismiss: false,
      ...options
    });

    await this.loader.present();
    return this.loader;
  }

  /**
   * Dismiss the current loader if it exists
   */
  async dismiss() {
    if (this.loader) {
      await this.loader.dismiss().catch(() => {});
      this.loader = null;
    }
  }
}