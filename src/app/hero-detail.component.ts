/**
 * Created by arrtem on 6/22/17.
 */
import {Component, OnInit, Input} from '@angular/core';
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import 'rxjs/add/operator/switchMap';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
@Component({
  selector: 'hero-detail',
  styleUrls:['./hero-detail.component.css'],
  templateUrl: `./hero-detail.component.html`,
  providers: [Location]
})


export class HeroDetailComponent implements OnInit {
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  @Input() hero: Hero;

  constructor(private heroService: HeroService, private location: Location, private route: ActivatedRoute) {

  }
}
