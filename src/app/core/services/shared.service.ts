
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public initialList: Note[]= [];

  public notesListSubject: BehaviorSubject<Note[]> = new BehaviorSubject(this.initialList);
  public notesList$: Observable<Note[]> = this.notesListSubject.asObservable();

  constructor() { }

  update(newValue: Note, oldValue: Note) {
    const ind = this.initialList.findIndex(x => x.title === oldValue.title);
    this.initialList[ind].title = newValue.title;
    this.initialList[ind].description = newValue.description;
    this.notesListSubject.next(this.initialList);
  }

  addToList(value: Note) {
    this.initialList.push(value);
    this.notesListSubject.next(this.initialList);
  }

  removeItem(value: Note) {
    this.initialList = this.initialList.filter(y => y.title !== value.title);
    this.notesListSubject.next(this.initialList);
  }
}
