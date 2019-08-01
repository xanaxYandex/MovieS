import { Movie, MainServiceService } from './../main-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-modal.component.html',
    styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

    public movieInfo: Movie;

    public movieRating: string;

    public posterUrl: string;

    public isFavourite = false;

    constructor(
        private mainService: MainServiceService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.mainService.getMovie(+this.route.snapshot.params['id']).subscribe(result => {
            this.movieInfo = result as Movie;
        });

        this.checkFavourite();

        if (!this.movieInfo.adult) {
            this.movieRating = 'NC-17';
        } else {
            this.movieRating = 'R';
        }
    }



    toNextMovie() {
        this.mainService.getMovie(+this.mainService.toNextMovie(1, this.movieInfo.id)).subscribe(result => {
            this.movieInfo = result as Movie;
        });


        this.isFavourite = false;

        setTimeout(_ => {
            this.checkFavourite();
        }, 0);

    }

    toFavourite() {
        if (!this.isFavourite) {
            this.mainService.AddToFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        } else {
            this.mainService.RemoveFromFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        }
    }

    checkFavourite() {
        this.mainService.showFavourites().forEach(elem => {
            if (+elem === +this.movieInfo.id) {
                this.isFavourite = true;
            }
        });
    }

    getBackground() {
        return this.sanitizer.bypassSecurityTrustStyle(`${this.posterUrl}`);
    }

}
