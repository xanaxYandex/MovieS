import { favouriteMovies } from './data/favourite';
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

    constructor(private http: HttpClient) { }

    getMovies(currentPage: number): Observable<object> {
        return this
            .http
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${currentPage}`);
    }

    showFavourites() {
        return favouriteMovies;
    }

    AddToFavourite(addId: number) {
        favouriteMovies.push(addId);
        console.log(favouriteMovies);

    }

    RemoveFromFavourite(removeId: number) {
        favouriteMovies.filter(id => id !== removeId);
        console.log(favouriteMovies);
    }

}
