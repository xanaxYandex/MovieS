// import { favouriteMovies } from './data/favourite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    constructor(private http: HttpClient) { }

    getMovies(currentPage: number): Observable<object> {
        return this
            .http
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${currentPage}`);
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
    }

}
