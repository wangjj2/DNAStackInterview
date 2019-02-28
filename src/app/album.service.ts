import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  getAlbumList(){
    return this.http.get('https://jsonplaceholder.typicode.com/albums')
  }
  getAlbumDetails(id){
    return this.http.get('https://jsonplaceholder.typicode.com/photos?albumId='+id)
  }
  createNewAlbum(payload){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
      })
    };
    return this.http.post(
      'https://jsonplaceholder.typicode.com/albums',
      JSON.stringify(payload),
      httpOptions
    )
  }
  deleteAlbum(albumId){
    return this.http.delete('https://jsonplaceholder.typicode.com/albums/'+albumId)
  }
}
