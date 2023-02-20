import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/core/models/note.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() note: Note;
  @Output('editNote') editNote: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  deleteItem() {
    this.sharedService.removeItem(this.note);
  }

  editNoteFn() {
    this.editNote.emit(this.note);
  }

}
