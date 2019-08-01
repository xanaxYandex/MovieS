import { MainServiceService } from './main-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes = [
    { path: '', component: MovieListComponent },
    { path: 'modal/:id', component: MovieModalComponent },
    { path: 'favourites', component: FavouritesComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MovieListComponent,
        MovieModalComponent,
        FavouritesComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [MainServiceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
