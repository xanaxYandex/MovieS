import { Movie } from './main-service.service';
// import { favouriteMovies } from './data/favourite';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { debug } from 'util';

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

    public flag = false;

    constructor(private http: HttpClient) {
        this.favoriteMovies = JSON.parse(localStorage.getItem('favourites'));
    }

    getMovies(currentPage: number): Observable<object> {
        return this
            .http
            // tslint:disable-next-line:max-line-length
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${currentPage}`);
    }

    getMovie(movieId?: number) {
        if (!movieId) {
            return this.http.get(`https://api.themoviedb.org/3/movie/${486589}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
        } else {
            // tslint:disable-next-line:max-line-length
            return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
        }

    }

    showFavorites(): string[] {
        return this.favoriteMovies;
    }

    AddToFavorite(addId: number) {
        this.favoriteMovies.push(addId.toString());
        localStorage.setItem('favourites', JSON.stringify(this.favoriteMovies));
    }

    RemoveFromFavorite(removeId: number) {
        this.favoriteMovies.splice(this.favoriteMovies.indexOf(removeId.toString()), 1);
        localStorage.setItem('favourites', JSON.stringify(this.favoriteMovies));
    }

    toNextMovie(movieId: number, isFavourite: boolean = false): number {
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
                        return movieList[key].id;
                    }
                }
            }
        }
    }

    toPreviousMovie(movieId: number, isFavourite: boolean = false): number {
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
                        return movieList[movieList.length - 1].id;
                    }
                }
            }
        }
    }
}
