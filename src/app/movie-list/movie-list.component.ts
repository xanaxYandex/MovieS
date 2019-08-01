import { PagerService } from './../pager.service';
import { MainServiceService, Movie } from './../main-service.service';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

    public movieList: Movie[];

    public countOfPages: number;

    public pager: any = {};

    constructor(private mainService: MainServiceService, private pagerService: PagerService) { }

    ngOnInit() {
        this.setPage(1);
    }

    setPage(page: number = 1) {
        this.mainService.getMovies(page).subscribe(response => {
            this.movieList = response['results'];
            this.mainService.infoTransitor.next(this.movieList);
            this.countOfPages = response['total_pages'];
            this.pager = this.pagerService.getPager(response['total_results'], page, 20);
        });
        for (const key in this.movieList) {
            if (this.movieList.hasOwnProperty(key)) {
                const element = this.movieList[key];
                
                if (element.poster_path === 'https://image.tmdb.org/t/p/w500null') {
                    this.movieList[key].poster_path = '../../assets/_Error_Document_Page-512.png';
                }
            }
        }
    }
}
