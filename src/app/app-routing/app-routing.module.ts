import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { FavouritesComponent } from '../favourites/favourites.component';

const routes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'page/:number', component: MovieListComponent },
    { path: 'modal/:id', component: MovieModalComponent },
    { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
