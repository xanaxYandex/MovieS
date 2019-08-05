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

    public isFavouritePage = false;

    public idParam: number;

    public backColor: string;

    public posterUrl: string;

    public prevVision = 'flex';

    public nextVision = 'flex';

    constructor(
        private mainService: MainServiceService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(result => {
            this.idParam = +result['id'];
        });

        this.mainService.getMovie(this.idParam).subscribe(result => {
            this.getMovieData(result);
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
                    this.getMovieData(result);
                });
            } else {
                this.mainService.getMovie(this.mainService.toNextMovie(this.movieInfo.id, true)).subscribe(result => {
                    this.getMovieData(result);
                });
            }
        }, 200);
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
                    this.getMovieData(result);
                });
            } else {
                this.mainService.getMovie(+this.mainService.toPreviousMovie(this.movieInfo.id, true)).subscribe(result => {
                    this.getMovieData(result);
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

    getMovieData(result: object) {
        this.movieInfo = result as Movie;
        this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
        this.posterUrl = `http://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`;
        this.isFavourite = false;
        setTimeout(_ => {
            this.checkFavourite();
        }, 0);
        if (this.route.snapshot.queryParams['favourite']) {
            this.isFavouritePage = true;
            if (+this.mainService.favoriteMovies[0] === this.movieInfo.id) {
                this.prevVision = 'none';
                this.nextVision = 'flex';
            } else if (+this.mainService.favoriteMovies[this.mainService.favoriteMovies.length - 1] === this.movieInfo.id) {
                this.nextVision = 'none';
                this.prevVision = 'flex';
            } else {
                this.nextVision = 'flex';
                this.prevVision = 'flex';
            }
        } else {
            this.isFavouritePage = false;
            this.mainService.infoTransition.subscribe({
                next: result => {
                    if (this.mainService.currentPage === 1) {
                        if (this.movieInfo.id === result[0].id) {
                            this.prevVision = 'none';
                            this.nextVision = 'flex';
                        } else {
                            this.prevVision = 'flex';
                            this.nextVision = 'flex';
                        }
                    } else if (this.mainService.currentPage === this.mainService.totalPages) {
                        if (this.movieInfo.id === result[result.length - 1].id) {
                            this.prevVision = 'flex';
                            this.nextVision = 'none';
                        } else {
                            this.prevVision = 'flex';
                            this.nextVision = 'flex';
                        }
                    }
                }
            });
        }
    }
}

