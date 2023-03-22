import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: any[] = [];

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.getPets();
  }

  getPets(): void {
    this.pets = this.petService.getPets();
  }
}
