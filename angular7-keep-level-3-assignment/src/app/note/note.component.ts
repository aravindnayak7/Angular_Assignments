import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: Note;

  constructor(private routerService: RouterService) {

  }

  edit(id: any) {
    console.log(id);
    this.routerService.routeToEditNoteView(id);
  }
}