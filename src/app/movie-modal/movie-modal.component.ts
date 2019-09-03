import { Movie, MainServiceService } from '../../services/main-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    public prevVision = true;
    public nextVision = true;

    constructor(
        public mainService: MainServiceService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.idParam = this.route.snapshot.params.id;
        this.mainService.getMovie(this.idParam).subscribe(response => {
            this.getMovieData(response);
        });
    }

    public toNextMovie(): void {
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

    public toPreviousMovie(): void {
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

    public toFavourite(): void {
        if (!this.isFavourite) {
            this.mainService.AddToFavorite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        } else {
            this.mainService.RemoveFromFavorite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        }
    }

    private checkFavourite(): void {
        this.mainService.showFavorites().forEach(elem => {
            if (+elem === +this.movieInfo.id) {
                this.isFavourite = true;
            }
        });
    }

    private getMovieData(result: object): void {
        this.movieInfo = result as Movie;
        this.backColor = `http://image.tmdb.org/t/p/w500${this.movieInfo.backdrop_path}`;
        this.posterUrl = `http://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`;
        this.isFavourite = false;
        this.checkFavourite();
        this.checkButtonVision();


    }

    private checkButtonVision(): void {
        if (this.route.snapshot.queryParams['favourite']) {
            this.isFavouritePage = true;
            if (+this.mainService.favoriteMovies[0] === this.movieInfo.id) {
                this.prevVision = false;
                this.nextVision = true;
            } else if (+this.mainService.favoriteMovies[this.mainService.favoriteMovies.length - 1] === this.movieInfo.id) {
                this.nextVision = false;
                this.prevVision = true;
            } else {
                this.nextVision = true;
                this.prevVision = true;
            }
        } else {
            this.isFavouritePage = false;
            this.mainService.infoTransition.subscribe({
                // tslint:disable-next-line:no-shadowed-variable
                next: result => {
                    if (this.mainService.currentPage === 1) {
                        if (this.movieInfo.id === result[0].id) {
                            this.prevVision = false;
                            this.nextVision = true;
                        } else {
                            this.prevVision = true;
                            this.nextVision = true;
                        }
                    } else if (this.mainService.currentPage === this.mainService.totalPages) {
                        if (this.movieInfo.id === result[result.length - 1].id) {
                            this.prevVision = true;
                            this.nextVision = false;
                        } else {
                            this.nextVision = true;
                            this.prevVision = true;
                        }
                    }
                }
            });
        }
    }

}

