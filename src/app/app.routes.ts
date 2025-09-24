import { Routes } from '@angular/router';
import { localeMatcher } from '../locale/locale.matcher';
import { localeRedirect } from '../locale/locale.redirect';
import { unsavedChangesGuard } from './guards/unsavedChangesGuard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    matcher: localeMatcher,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home-component').then((m) => m.HomeComponent),
      },
      {
        path: 'todos/:todoId',
        data: {
          isSomething: true,
        },
        resolve: { resolveFoo: () => 'My resolved data' },
        loadComponent: () => import('./pages/todos/todos-component').then((m) => m.TodosComponent),
      },
      {
        path: 'about',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/about/about-component').then((m) => m.AboutComponent),
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: '403',
        loadComponent: () => import('./pages/403/403-component').then((m) => m.NotFoundComponent),
      },
      {
        path: '404',
        loadComponent: () => import('./pages/404/404-component').then((m) => m.NotFoundComponent),
      },
    ],
  },
  {
    path: '**',
    // redirectTo: localeRedirect
    loadComponent: () => import('./pages/404/404-component').then((m) => m.NotFoundComponent),
  },
];
