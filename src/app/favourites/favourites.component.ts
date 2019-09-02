import { MainServiceService } from '../../services/main-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    public favoriteMovies: object[] = [];

    constructor(
        private mainService: MainServiceService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.mainService.showFavorites().forEach(element => {
            this.mainService.getMovie(+element).subscribe(result => {
                this.favoriteMovies.push(result);
            });
        });
    }

    public toModal(id: number): void {
        this.router.navigate(
            ['/modal', id],
            {
                queryParams: {
                    favourite: true,
                }
            }
        );
    }

}
