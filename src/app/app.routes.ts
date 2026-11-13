import { Routes } from '@angular/router';

import { Books } from './components/books/books';
import { Members } from './components/members/members';
import { Assignments } from './components/assignments/assignments';
import { AvailabilityReport } from './components/availability-report/availability-report';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },

    { path: 'books', component: Books },

    { path: 'members', component: Members },

    { path: 'assignments', component: Assignments },

    { path: 'availability-report', component: AvailabilityReport },

    { path: '**', redirectTo: 'books' }
];