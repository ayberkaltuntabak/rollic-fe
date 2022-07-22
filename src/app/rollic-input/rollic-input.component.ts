import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'rollic-input',
  templateUrl: './rollic-input.component.html',
  styleUrls: ['./rollic-input.component.scss']
})
export class RollicInputComponent implements OnInit {

  @Input()
  config!: RollicInputModel;

  @ViewChild("inputElement",{read:ViewContainerRef,static:false})
  inputElement:ViewContainerRef;

  @Output()
  onInputChange = new EventEmitter();

  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.FormControl){
      this.FormControl.valueChanges.subscribe((value)=>{
        if(this.config.type == InputTypes.FILE){
          this.uploadImage(this.inputElement.element.nativeElement);
        }
      })
    }

  }

  uploadImage(event:any){
    console.log(event.files);
    if (event.files && event.files[0] && this.config.type == InputTypes.FILE) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        let x = (<FileReader>event.target).result;
        console.log(x);
        let obj=  { };
        obj[this.config.formConfig.imageTarget] = x;
        this.formGroup.patchValue(obj);
      }
      reader.readAsDataURL(event.files[0])
    }
  }

  public get formGroup() : FormGroup {
    if(this.config.formConfig == undefined){
      return undefined
    }
    return this.config.formConfig.formGroup
  }

  public get FormControl() : AbstractControl {
    if(this.config.formConfig == undefined){
      return undefined
    }
    return this.config.formConfig.formGroup.get(this.config.formConfig.key);
  }

  public get clazzName(): string[] {
    return [this.config.styleClass , this.formGroup == undefined ? ""  : this.formGroup.get(this.config.formConfig.key).valid ? "" : " error"];
  }


  public get errors() : any {
    let formControl =this.config.formConfig.formGroup.get(this.config.formConfig.key);

    if(formControl.errors == undefined || formControl.errors == null || Object.keys(formControl.errors).length == 0){
      return undefined;
    }
    return Object.keys(formControl.errors).map((error)=>{
      switch (error) {
        case "required":
          return `${this.config.formConfig.key} is required`
        case "pattern":
            return `${this.config.formConfig.key}'s Pattern is Not Valid`
            case "email":
            return `Email is Not Valid`
        default:
          break;
      }
    })
  }



}

//TODO: Insert Into Model
export interface RollicInputModel {
  placeholder?:string,
  type: InputTypes,
  icon?: string,
  styleClass:string,
  withIcon:boolean,
  formConfig?:{
    formGroup:FormGroup,
    key:string,
    imageTarget?:string
  }
}

export enum InputTypes {
  TEXT = "text",
  NUMBER = "number",
  FILE = "file",
  EMAIL = "email"
}
