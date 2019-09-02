import { Movie } from './main-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export class MainServiceService {
    public favoriteMovies: string[] = [];
    public currentPage = 1;
    public infoTransition: BehaviorSubject<any> = new BehaviorSubject(0);
    public pageTransition: BehaviorSubject<any> = new BehaviorSubject(this.currentPage);
    private flag = false;
    public totalPages: number;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.favoriteMovies = JSON.parse(localStorage.getItem('favourites')) || [];
    }

    public getMovies(currentPage: number): Observable<object> {
        return this
            .http
            // tslint:disable-next-line:max-line-length
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${currentPage}`);
    }

    public getMovie(movieId?: number): Observable<object> {
        if (!movieId) {
            this.router.navigate(['/']);
        } else {
            // tslint:disable-next-line:max-line-length
            return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
        }

    }

    public showFavorites(): string[] {
        return this.favoriteMovies;
    }

    public AddToFavorite(addId: number): void {
        this.favoriteMovies.push(addId.toString());
        localStorage.setItem('favourites', JSON.stringify(this.favoriteMovies));
    }

    public RemoveFromFavorite(removeId: number): void {
        this.favoriteMovies.splice(this.favoriteMovies.indexOf(removeId.toString()), 1);
        localStorage.setItem('favourites', JSON.stringify(this.favoriteMovies));
    }

    public toNextMovie(movieId: number, isFavourite: boolean = false): number {
        if (isFavourite) {
            for (const key in this.favoriteMovies) {
                if (this.favoriteMovies.hasOwnProperty(key)) {
                    const element = this.favoriteMovies[key];
                    if (+element === +movieId) {
                        return +this.favoriteMovies[(+key) + 1];
                    }
                }
            }
        } else {
            let movieList: Movie[] = [];

            this.infoTransition.subscribe({
                next: result => {
                    movieList = result;
                }
            });

            if (+movieList[movieList.length - 1].id === +movieId && this.flag === false) {
                this.pageTransition.next(++this.currentPage);
                this.flag = true;
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        const element = movieList[+key];
                        if (element.id === +movieId) {
                            return movieList[(+key)].id;
                        }
                    }
                }
            }

            if (!this.flag) {
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        const element = movieList[+key];
                        if (element.id === +movieId) {
                            return movieList[(+key) + 1].id;
                        }
                    }
                }
            } else {
                this.flag = false;
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        // this.router.navigate([`/page/${this.currentPage}`]);
                        return movieList[key].id;
                    }
                }
            }
        }
    }

    public toPreviousMovie(movieId: number, isFavourite: boolean = false): number {
        if (isFavourite) {
            for (const key in this.favoriteMovies) {
                if (this.favoriteMovies.hasOwnProperty(key)) {
                    const element = this.favoriteMovies[key];
                    if (+element === +movieId) {
                        return +this.favoriteMovies[(+key) - 1];
                    }
                }
            }
        } else {
            let movieList: Movie[] = [];

            this.infoTransition.subscribe({
                next: result => {
                    movieList = result;
                }
            });

            if (+movieList[0].id === +movieId && this.flag === false) {
                this.pageTransition.next(--this.currentPage);
                this.flag = true;
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        const element = movieList[+key];
                        if (element.id === +movieId) {
                            return movieList[(+key)].id;
                        }
                    }
                }
            }

            if (!this.flag) {
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        const element = movieList[+key];
                        if (element.id === +movieId) {
                            return movieList[(+key) - 1].id;
                        }
                    }
                }
            } else {
                this.flag = false;
                for (const key in movieList) {
                    if (movieList.hasOwnProperty(key)) {
                        // this.router.navigate([`/page/${this.currentPage}`]);
                        return movieList[movieList.length - 1].id;
                    }
                }
            }
        }
    }
}
