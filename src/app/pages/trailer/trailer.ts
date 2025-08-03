import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import moviesJson from '../../../assets/moviesJson.json';
import peopleJson from '../../../assets/peopleJson.json';
@Component({
  selector: 'app-trailer',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatGridListModule,
  ],
  templateUrl: './trailer.html',
  styleUrl: './trailer.scss',
})
export class Trailer {
  id = '';
  loadJson = moviesJson;
  loadJsonPeople = peopleJson;
  movie: any = null;
  trailerLink = '';
  safeUrl!: SafeResourceUrl;
  videoId = '';
  constructor(
    private activeatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.id = this.activeatedRoute.snapshot.queryParamMap.get('id') || '';
    this.loadMovie();
  }

  loadMovie() {
    this.movie = this.loadJson.find((m) => m.Id === this.id);
    if (this.movie) {
      this.trailerLink = this.movie.trailerLink;
      let videoId: string | undefined;

      // 1. ถ้าเป็นลิงก์แบบ watch?v=
      if (this.trailerLink.includes('v=')) {
        videoId = this.trailerLink.split('v=')[1].split('&')[0];
      }
      // 2. ถ้าเป็นลิงก์แบบ youtu.be
      else if (this.trailerLink.includes('youtu.be/')) {
        videoId = this.trailerLink.split('youtu.be/')[1].split('?')[0];
      }

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
  }
}
