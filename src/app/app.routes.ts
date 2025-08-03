import { Routes } from '@angular/router';
import { List } from './pages/list/list';
import { Trailer } from './pages/trailer/trailer';
import { Details } from './pages/details/details';
export const routes: Routes = [
    {path: '', component: List},
    {path: 'trailer', component:Trailer},
    {path: 'trailer:id', component:Trailer},
    {path: 'details', component:Details},
    {path: 'details:id', component:Details}
];
