import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Pet } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private petService: PetService,
    private location: Location
  ) {}

  @Input() hero?: Hero;
  pets: Pet[] = []; // list of available pets
  selectedPet?: Pet; // the pet selected for the hero

  ngOnInit(): void {
    this.getHero();
    this.getPets();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getPets(): void {
    this.pets = this.petService.getPets();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.hero.pet = this.selectedPet?.name || ''; // set the selected pet for the hero
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
