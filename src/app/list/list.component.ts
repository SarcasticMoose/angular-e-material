import {Component, OnInit} from '@angular/core';
import {PersonService} from "../person.service";
import {Person} from "../person";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit{
  private readonly _personService : PersonService;
  public peoples : Person[];
  constructor(personService: PersonService) {
    this.peoples = [];
    this._personService = personService;
  }
  ngOnInit(): void {
    this.peoples = this._personService.getAll();
  }


  deletePerson(index: number) {
    if(confirm("Are you sure?")){
      this._personService.deletePerson(index)
      this.peoples = this._personService.getAll();
    }
  }
}
