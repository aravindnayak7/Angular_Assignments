import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteOpenerComponent } from '../edit-note-opener/edit-note-opener.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(
    public dialogRef: MatDialogRef<EditNoteOpenerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NotesService) {
    this.errMessage = '';
    this.note = data.note;
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      data => {
        this.dialogRef.close(this.data);
      }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
  }
}