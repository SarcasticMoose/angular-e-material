import {Component, Input, OnInit} from '@angular/core';
import {RandomService} from "../random.service";

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit{

  private readonly _randomService : RandomService;
  public myNumber : number = 0;
  @Input() max = 10;

  constructor(randomService : RandomService){
    this._randomService = randomService;
  }

  ngOnInit() {
    this.myNumber = this._randomService.randomNumber(this.max);
  }

  btnOnClick(){
    this.myNumber = this._randomService.randomNumber(this.max);
  }

  isSmallerThanHalf(): boolean{
    return this.myNumber <= this.max / 2;
  }

}
