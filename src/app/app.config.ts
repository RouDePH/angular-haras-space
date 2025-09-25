import {
  ApplicationConfig,
  CSP_NONCE,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { DBConfig, provideIndexedDb } from 'ngx-indexed-db';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db: IDBDatabase, transaction: IDBTransaction) => {
      const store = transaction.objectStore('people');
      store.createIndex('country', 'country', { unique: false });
    },
    3: (db: IDBDatabase, transaction: IDBTransaction) => {
      const store = transaction.objectStore('people');
      store.createIndex('age', 'age', { unique: false });
    },
  };
}

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
      ],
    },
    {
      // animals added in version 2
      store: 'animals',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'name', keypath: 'name', options: { unique: true } }],
    },
  ],
  // provide the migration factory to the DBConfig
  migrationFactory,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: CSP_NONCE, useValue: 'CSP_NONCE_INJECTION' },
    provideIndexedDb(dbConfig),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(),
  ],
};
