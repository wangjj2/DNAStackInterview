import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../album.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albumList: [];
  newUserID: number = 1;
  newAlbumID: number = 0;
  newAlbumTitle: '';
  constructor(private albumService: AlbumService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAlbumList();
  }
  getAlbumList(){
    this.albumService.getAlbumList().subscribe(retrievedAlbumList => {
      this.albumList = JSON.parse(JSON.stringify(retrievedAlbumList))
      //next album added's id should be last album in the list's id +1
      this.newAlbumID = this.albumList[this.albumList.length-1].id+1;
    });
  }
  open(content) { //could make this a mixin
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  addNewAlbum(){
    //if we assume server handles the creation:
    this.albumService.createNewAlbum({
      "userId": this.newUserID,
      "id": this.newAlbumID,
      "title": this.newAlbumTitle
    }).subscribe(response=> {
      this.newAlbumID++;
      this.getAlbumList()
    });
  }
  removeAlbum(albumId){
    //if we assume that the server handles the delete:
    this.albumService.deleteAlbum(albumId).subscribe(response=> this.getAlbumList())
    // if you're doing it locally:
    // let albumPos = this.albumList.findIndex(albumObject => {return albumObject.id == albumId});
    // this.albumList.splice(albumPos,1);
  }
}
