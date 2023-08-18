import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  errMessage: string;
  noteObj:Note;
  notes:Note[];
  noteForm:FormGroup;
  title = new FormControl();
  text = new FormControl();

  constructor(private noteservice:NotesService){
    this.noteObj=new Note();
    this.notes=[];
    this.noteForm=new FormGroup({
      title:this.title,
      text:this.text
    })
  }
  ngOnInit(): void {
    this.noteservice.getNotes().subscribe(
      noteData => this.notes = noteData,
      err => (this.errMessage = err.message)
    )
  }
  addNote()
  {
    this.noteObj=this.noteForm.value;
    this.notes.push(this.noteObj);
    if(!this.noteObj.text || !this.noteObj.title){
      this.errMessage = 'Title and Text both are required fields';
    }
    else if (this.noteForm.valid){
      this.noteservice.addNotes(this.noteObj).subscribe(
        data => { },
        err1 => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
      )
      console.log(this.noteObj.title);
    console.log(this.noteObj.text);
    }
    else{
      this.errMessage = 'Title and Text both are required fields';
    }
    this.noteObj = new Note();
  }

}
