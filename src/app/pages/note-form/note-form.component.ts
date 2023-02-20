import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from 'src/app/core/models/note.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  @Input() noteData: Note = null;
  @Output() hideForm: EventEmitter<any> = new EventEmitter();

  detailForm: FormGroup;

  constructor(private fb: FormBuilder,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.detailForm = this.fb.group({
        title: [this.noteData ? this.noteData.title : '', [Validators.required]],
        description: [this.noteData ? this.noteData.description : '']
      })
    }, 0);
  }

  addToNotesList() {
    if(this.noteData) {
      this.sharedService.update(new Note(this.detailForm.value.title, this.detailForm.value.description), this.noteData);
    } else {
      this.sharedService.addToList(new Note(this.detailForm.value.title, this.detailForm.value.description));
    }
    this.backToList();
  }

  backToList() {
    this.hideForm.emit('true');
  }

}
