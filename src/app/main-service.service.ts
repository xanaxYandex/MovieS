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

    public favouriteMovies: string[] = ['420818', '566555'];

    public infoTransitor: BehaviorSubject<any> = new BehaviorSubject(0);

    public selectedMovie: object;

    constructor(private http: HttpClient) {
        this.favouriteMovies = JSON.parse(localStorage.getItem('favourites'));
    }

    getMovies(currentPage: number): Observable<object> {
        return this
            .http
            // tslint:disable-next-line:max-line-length
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${currentPage}`);
    }

    getMovie(movieId: number) {
        console.log(3);

        return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
    }

    showFavourites() {
        console.log(JSON.parse(localStorage.getItem('favourites')));

        return this.favouriteMovies;
    }

    AddToFavourite(addId: number) {
        this.favouriteMovies.push(addId.toString());

        localStorage.setItem('favourites', JSON.stringify(this.favouriteMovies));
    }

    RemoveFromFavourite(removeId: number) {
        this.favouriteMovies.splice(this.favouriteMovies.indexOf(removeId.toString()), 1);

        localStorage.setItem('favourites', JSON.stringify(this.favouriteMovies));
    }

    toNextMovie(page: number, movieId: number) {
        let promise = new Promise((resolve, reject) => {
            this.getMovies(page).subscribe(result => {
                let nextId;
                let movies;
                movies = result['results'];
                for (const key in movies) {
                    if (movies.hasOwnProperty(key)) {
                        const element = movies[+key];
                        if (element.id === +movieId) {
                            resolve(movies[(+key) + 1].id);
                            console.log(1);
                            break;
                        }
                    }
                }
            });
        });

        promise.then(response => {
            console.log(2);
            return response;
        });
    }

}
