import { Movie, MainServiceService } from './../main-service.service';
import { Component, OnInit, Input, Output, EventEmitter, Query } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movie-modal.component.html',
    styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

    public movieInfo: Movie;

    public isFavourite = false;

    public idParam: number;

    public backColor: string;

    constructor(
        private mainService: MainServiceService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.mainService.pageTransition.next(this.mainService.currentPage);
        this.route.params.subscribe(result => {
            this.idParam = +result['id'];
        });

        this.mainService.getMovie(this.idParam).subscribe(result => {
            this.movieInfo = result as Movie;
            this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
            setTimeout(() => {
                this.checkFavourite();
            }, 0);
        });
    }

    toNextMovie() {
        let id = +this.mainService.toNextMovie(this.movieInfo.id);

        setTimeout(() => {
            if (+id === +this.movieInfo.id) {
                id = +this.mainService.toNextMovie(this.movieInfo.id);
            }
    
            if (!this.route.snapshot.queryParams['favourite']) {
                this.mainService.getMovie(id).subscribe(result => {
                    this.router.navigate(
                        ['/modal', result['id']],
                        {
                            queryParams: {
                                favorite: false
                            }
                        }
                    );
                    this.movieInfo = result as Movie;
                    this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
                    this.isFavourite = false;
                    setTimeout(_ => {
                        this.checkFavourite();
                    }, 0);
                });
            } else {
                this.mainService.getMovie(+this.mainService.toNextMovie(this.movieInfo.id, true)).subscribe(result => {
                    this.movieInfo = result as Movie;
                    this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
                    this.isFavourite = false;
                    setTimeout(_ => {
                        this.checkFavourite();
                    }, 0);
                });
            }
        }, 50);
    }

    toPreviousMovie() {
        let id = +this.mainService.toPreviousMovie(this.movieInfo.id);

        setTimeout(() => {
            if (+id === +this.movieInfo.id) {
                id = +this.mainService.toPreviousMovie(this.movieInfo.id);
            }

            if (!this.route.snapshot.queryParams['favourite']) {
                this.mainService.getMovie(id).subscribe(result => {
                    this.router.navigate(
                        ['/modal', result['id']],
                        {
                            queryParams: {
                                favorite: false
                            }
                        }
                    );
                    this.movieInfo = result as Movie;
                    this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
                    this.isFavourite = false;
                    setTimeout(_ => {
                        this.checkFavourite();
                    }, 0);
                });
            } else {
                this.mainService.getMovie(+this.mainService.toPreviousMovie(this.movieInfo.id, true)).subscribe(result => {
                    this.movieInfo = result as Movie;
                    this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
                    this.isFavourite = false;
                    setTimeout(_ => {
                        this.checkFavourite();
                    }, 0);
                });
            }
        }, 50);
    }

    toFavourite() {
        if (!this.isFavourite) {
            this.mainService.AddToFavorite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        } else {
            this.mainService.RemoveFromFavorite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        }
    }

    checkFavourite() {
        this.mainService.showFavorites().forEach(elem => {
            if (+elem === +this.movieInfo.id) {
                this.isFavourite = true;
            }
        });
    }

}
