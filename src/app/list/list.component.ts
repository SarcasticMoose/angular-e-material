import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  elements: string[];
  input : string;

  constructor() {
    this.elements = [];
    this.input = "";
  }

  ngOnInit() {
  }

  add():void{
    if(this.input == ""){
      return;
    }
    this.elements.push(this.input);
    this.restartIputText();
  }

  remove(index: number) : void{
    this.elements.splice(index,1);
  }
  restartIputText() : void {
    this.input = "";
  }
}
