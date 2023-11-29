import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Person} from "../person";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  public personId?: number;
  public person : Person | undefined;
  private readonly _route: ActivatedRoute;
  private readonly _personService: PersonService;

  constructor(route: ActivatedRoute,personService : PersonService) {
    this._route = route;
    this._personService = personService;
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.personId = params['id'];
      this.person = this.personId
        ? this._personService.getPerson(this.personId)
        : undefined;
    })
  }
}
