import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn:'root'
})
export class NotesService {
  
  constructor(private httpClient:HttpClient,private authservice:AuthenticationService) { }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>("http://localhost:3000/api/v1/notes",
    {
      headers: new HttpHeaders().set('Authorization', `${this.authservice.getBearerToken()}`)
    });
  }

  addNotes(noteObj: Note)
  {
    return this.httpClient.post<Note>("http://localhost:3000/api/v1/notes",noteObj,
    {
      headers: new HttpHeaders().set('Authorization', `${this.authservice.getBearerToken()}`)
    });
  }

}
