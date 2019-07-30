import { MainServiceService } from './main-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieModalComponent } from './movie-modal/movie-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MovieListComponent,
        MovieModalComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [MainServiceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
