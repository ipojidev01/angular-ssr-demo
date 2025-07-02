import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { APP_INITIALIZER, Provider } from '@angular/core';

const API_DATA_KEY = makeStateKey<any>('apiData');

export default function bootstrap(options: { providers?: Provider[] } = {}) {
  const extraProviders: Provider[] = [
    ...(options.providers || []),
    {
      provide: APP_INITIALIZER,
      useFactory: (state: TransferState, data: any) => () => {
        if (data && typeof data === 'object') {
          state.set(API_DATA_KEY, data);
        }
      },
      deps: [TransferState, 'API_DATA_FROM_SERVER'],
      multi: true,
    },
  ];
  return bootstrapApplication(AppComponent, {
    ...config,
    providers: [...(config.providers || []), ...extraProviders],
  });
}
