import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rollic-button',
  templateUrl: './rollic-button.component.html',
  styleUrls: ['./rollic-button.component.scss']
})
export class RollicButtonComponent implements OnInit {

  @Input()
  config!:RollicButtonModel
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    this.config?.onClick(this.config);
  }
}

export interface RollicButtonModel{
  styleClass:string
  buttonText?:string,
  withText:boolean,
  withIcon:boolean,
  icon?:string,
  onClick: (RollicButtonModel) => void,
  disabled?:boolean

}
