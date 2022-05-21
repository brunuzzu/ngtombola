import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  @Input() numero?: number;
  @Input() status: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
