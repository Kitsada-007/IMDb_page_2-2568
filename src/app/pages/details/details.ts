import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import peopleJson from '../../../assets/peopleJson.json'
import { SafeResourceUrl } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule ,MatButtonToggleModule, MatGridListModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {
  loadData = peopleJson;
  id: String = '';
  data: any = null;
  trailerLink = '';
  safeUrl!: SafeResourceUrl;
  constructor(private activatedRoute: ActivatedRoute, private resourceUrl: DomSanitizer) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id') || '';
    this.loadPeople()
  }

  loadPeople() {
    this.data = this.loadData.find(d => d.Id === this.id);
    if (this.data) {
      this.trailerLink = this.data.trailerLink;
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
        this.safeUrl = this.resourceUrl.bypassSecurityTrustResourceUrl(embedUrl);
      }

    }
  }

}
