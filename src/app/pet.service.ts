import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { PETS } from './mock-pets';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  getPets(): Pet[] {
    return PETS;
  }

  // new method to get a pet by name
  getPetByName(name: string): Pet {
    return PETS.find(pet => pet.name === name)!;
  }
}