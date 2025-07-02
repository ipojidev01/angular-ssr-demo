import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Provide a default value for API_DATA_FROM_SERVER to prevent injection errors
    { provide: 'API_DATA_FROM_SERVER', useValue: null }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
