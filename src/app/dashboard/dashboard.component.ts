import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { Pet } from '../pet';
import { HeroService } from '../hero.service';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pets: Pet[] = [];

  constructor(
    private heroService: HeroService,
    private petService: PetService) 
    {}

  ngOnInit(): void {
    this.getHeroes();
    this.pets = this.petService.getPets();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  updateHeroPet(hero: Hero, petName: string): void {
    const pet = this.petService.getPetByName(petName);
    hero.pet = pet.name;
    this.heroService.updateHero(hero).subscribe();
  }

  onSelectPet(hero: Hero, event: any): void {
    const petName = event.target.value;
    this.updateHeroPet(hero, petName);
  }
}
