import { Component, OnInit } from '@angular/core';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../note';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  note: Note;
  id: Number;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private noteService: NotesService,
    private routerService: RouterService) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(params => console.log(params['noteId']));
    

    this.route.params.subscribe(params => {
      this.id = params['noteId'];
      this.note = this.noteService.getNoteById(this.id);
      console.log(this.id);
      console.log(this.note);
      this.openDialog();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNoteViewComponent, {
      width: '250px',
      data: { note: this.note }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.routerService.routeBack();
    });
  }
}