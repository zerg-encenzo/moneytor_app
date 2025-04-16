import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors  } from '@angular/common/http'; // Add this import

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { credentialsInterceptor } from './app/interceptors/credentials.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(
      withInterceptors([credentialsInterceptor])
    ), // Add this provider
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
