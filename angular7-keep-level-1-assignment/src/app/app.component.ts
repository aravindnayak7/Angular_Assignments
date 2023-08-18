import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  errMessage: string;
  noteObj:Note;
  noteList:Note[];
  constructor(private noteservice:NotesService){
    this.noteObj=new Note();
    this.noteList = [];
  }
  ngOnInit(): void {
    this.noteservice.getNotes().subscribe(
      noteData => this.noteList = noteData,
      err => {
        this.errMessage='Http failure response for http://localhost:3000/notes: 404 Not Found'
      }
    )
  }
  addNotes(noteForm:NgForm){
    if(!this.noteObj.title||!this.noteObj.text){
        this.errMessage = 'Title and Text both are required fields'
    }
    this.noteObj=noteForm.value;
    this.noteList.push(this.noteObj);
    if(noteForm.valid){
      this.noteservice.addNote(this.noteObj).subscribe(
        data => {},
        err1 => {
          this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'
        }
      )
      console.log(this.noteObj.title);
      console.log(this.noteObj.text);
    }
  }

 
}
