import { Movie, MainServiceService } from './../main-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { delay } from 'q';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-modal.component.html',
    styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

    @Input() movieInfo: Movie;

    @Output() backToMovie: EventEmitter<any> = new EventEmitter();

    @Output() nextMovie: EventEmitter<any> = new EventEmitter();

    public movieRating: string;

    public posterUrl: string;

    public isFavourite = false;

    constructor(private mainService: MainServiceService) { }

    ngOnInit() {
        this.checkFavourite();
        this.posterUrl = `http://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`;

        if (this.movieInfo.adult) {
            this.movieRating = 'NC-17';
        } else {
            this.movieRating = 'R';
        }
    }

    backToMovieList() {
        this.backToMovie.emit();
    }

    toNextMovie() {
        this.nextMovie.emit(this.movieInfo.id);
        this.isFavourite = !this.isFavourite;
        this.checkFavourite();
    }

    toFavourite() {
        if (this.isFavourite) {
            this.mainService.AddToFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        } else {
            this.mainService.RemoveFromFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        }

    }

    checkFavourite() {
        this.mainService.showFavourites().forEach(elem => {
            if (elem === this.movieInfo.id) {
                this.isFavourite = true;
            }
        });
    }

}
