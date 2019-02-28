import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AlbumService} from '../album.service';
@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumDetails: any;
  newPhotos:any;
  constructor(private route: ActivatedRoute,private albumService: AlbumService) { }

  ngOnInit() {
    this.getAlbumPhotos();
  }
  getAlbumPhotos(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.albumService.getAlbumDetails(id)
      .subscribe(retrievedAlbumDetails => this.albumDetails = retrievedAlbumDetails);
  }
}
