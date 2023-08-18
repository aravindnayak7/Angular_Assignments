import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  @Input() notes: Array<Note>;
  constructor(private noteService: NotesService) {
  }
  ngOnInit(): void {
    this.noteService.getNotes().subscribe(p => this.notes = p);
  }
}