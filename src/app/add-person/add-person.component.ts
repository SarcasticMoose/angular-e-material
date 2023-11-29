import {Component, OnInit} from '@angular/core';
import {Person} from "../person";
import {PersonService} from "../person.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit{
  person : Person = {
    address : {},
  };

  private readonly _personService : PersonService;
  private readonly _router: Router;

  constructor(personService : PersonService,router : Router) {
    this._personService = personService;
    this._router = router;
  }

  save() : void {
    this._personService.addPerson(this.person);
    this._router.navigate(["/list"]);
  }

  ngOnInit(): void {

  }
}
