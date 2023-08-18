import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NotesService {
  constructor(private httpClient:HttpClient) { }
  getNotes():Observable<Note[]> {
    return this.httpClient.get<Note[]>("http://localhost:3000/notes");
  }

  addNote(noteObj: Note): Observable<Note> {
    return this.httpClient.post<Note>("http://localhost:3000/notes",noteObj);
  }

}
