import {Injectable, OnInit} from '@angular/core';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonService{
  private readonly STORAGE_KEY = "stored-people-data";

  constructor() { }

  public getAll(): Person[] {
    let peopleArray: Person[];
    let peopleDataText = localStorage.getItem(this.STORAGE_KEY);
    if(!peopleDataText)
    {
      return [];
    }
    peopleArray = JSON.parse(peopleDataText);
    return peopleArray;
  }

  public getPerson(index: number): Person {
    let people = this.getAll();
    return people[index];
  }

  public addPerson(person: Person): void {
    let people = this.getAll();
    people.push(person);
    let newTable = JSON.stringify(people);
    localStorage.setItem(this.STORAGE_KEY,newTable);
  }

  public deletePerson(index: number): void {
    let people = this.getAll();
    people.splice(index,1);
    let newTable = JSON.stringify(people);
    localStorage.setItem(this.STORAGE_KEY,newTable);
  }
}
