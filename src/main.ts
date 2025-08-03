import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, OidcSecurityService } from 'angular-auth-oidc-client';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth({
      config: {
        authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BC1xE6x21',
        redirectUrl: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/',
        clientId: '5tudoi21vbi6cvu08rs0nnk6sa',
        scope: 'openid email phone',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
      }
    }),
  ],
}).then(appRef => {
  const oidc = appRef.injector.get(OidcSecurityService);
  oidc.checkAuth().subscribe(result => {
    console.log('CheckAuth result:', result);
  });
});
