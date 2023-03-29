import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { PETS } from './mock-pets';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  getPets(): String[] {
    return PETS.map(pet => pet.name);
  }

  // Get a pet by name
  getPetByName(name: string): Pet {
    return PETS.find(pet => pet.name === name)!;
  }
}