import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pets = [
    { name: 'Max' },
    { name: 'Spark' },
    { name: 'Tails' },
    { name: 'Sonic' },
    { name: 'Knuckles' },
  ];

  constructor() { }

  getPets() {
    return this.pets;
  }
}