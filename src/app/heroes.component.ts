import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HeroService} from './hero.service';
import {Router} from "@angular/router";
@Component({
  selector: 'my-heroes',
  styleUrls: ['./heroes.component.css'],
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      return this.heroes = heroes;
    })
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(private heroService: HeroService, private router: Router) {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
