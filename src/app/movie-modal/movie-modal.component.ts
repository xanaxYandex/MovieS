import { Movie, MainServiceService } from './../main-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

    constructor(
        private mainService: MainServiceService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(result => {
            console.log(result);
            this.idParam = +result['id'];
        });

        console.log(this.idParam);

        this.mainService.getMovie(this.idParam).subscribe(result => {
            this.movieInfo = result as Movie;
            setTimeout(() => {
                this.checkFavourite();
            }, 0);
        });
    }

    toNextMovie() {
        this.router.navigate(['modal', 420818]);
        // this.mainService.getMovie(+this.mainService.toNextMovie(this.movieInfo.id)).subscribe(result => {
        //     this.movieInfo = result as Movie;
        //     this.isFavourite = false;
        //     setTimeout(_ => {
        //         this.checkFavourite();
        //     }, 0);
        // });
    }

    toPreviousMovie() {
        this.mainService.getMovie(+this.mainService.toPreviousMovie(this.movieInfo.id)).subscribe(result => {
            this.movieInfo = result as Movie;
            this.isFavourite = false;
            setTimeout(_ => {
                this.checkFavourite();
            }, 0);
        });
    }

    toFavourite() {
        if (!this.isFavourite) {
            this.mainService.AddToFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        } else {
            this.mainService.RemoveFromFavourite(this.movieInfo.id);
            this.isFavourite = !this.isFavourite;
        }
    }

    checkFavourite() {
        this.mainService.showFavourites().forEach(elem => {
            if (+elem === +this.movieInfo.id) {
                this.isFavourite = true;
            }
        });
    }

}
