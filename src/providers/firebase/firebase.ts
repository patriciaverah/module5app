import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// In this file i've created the necessary functions
// to make the database work properly: 
  // store and get objects

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }
 
  // Gets all the elements
  getToDoList() {
    return this.afd.list('/list/');
  }
 
  // Adds an element to the database
  // only inserting its name
  addItem(name) {
    this.afd.list('/list/').push(name);
  }
 
  // Removes an element from the database
  // using the ID
  removeItem(id) {
    this.afd.list('/list/').remove(id);
  }

}
