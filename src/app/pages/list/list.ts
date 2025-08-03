import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import moviesJson from '../../../assets/moviesJson.json';
import peopleJson from '../../../assets/peopleJson.json';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  loadData = moviesJson;
  loadPeopleData = peopleJson;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
  calculateAge(birthDateString: string): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }
}
