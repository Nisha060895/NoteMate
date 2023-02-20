import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Note } from 'src/app/core/models/note.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('showHideForm', [
      state('show', style({
        display: 'block'
      })),
      state('hide', style({
        display: 'none'
      })),
      transition('show => hide', [
        style({opacity: 0})
      ]),
      transition('hide => show', [
        style({opacity: 1}),
        animate('0.1s')
      ]),
    ])
  ]
})
export class NotesListComponent implements OnInit {

  public displayForm: boolean;
  public notesList: Note[] = [];
  public filteredList: Note[];
  public noteData: Note;
  public searchVal: string = '';

  constructor(public sharedService: SharedService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedService.notesList$.subscribe(res => {
      this.notesList = res;
      this.filteredList = res;
      this.searchVal = null;
    })
  }

  addNote() {
    this.noteData = null;
    this.displayForm = true;
  }

  hideForm() {
    this.displayForm = false;
  }

  search() {
    this.filteredList = this.searchVal ? 
    Object.assign([], this.notesList.filter(x => x.title.includes(this.searchVal) || x.description.includes(this.searchVal))) : 
    Object.assign([], this.notesList);
  }

  editNotePage(note) {
    this.displayForm = true;
    this.noteData = note;
  }

}
