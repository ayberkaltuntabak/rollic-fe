import { ToastService } from './../toast.service';
import { AppComponent } from './../app.component';
import { GameListService } from './../game-list.service';
import { RollicButtonModel } from './../rollic-button/rollic-button.component';
import {
  InputTypes,
  RollicInputModel,
} from './../rollic-input/rollic-input.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'game-creation-page',
  templateUrl: './game-creation-page.component.html',
  styleUrls: ['./game-creation-page.component.scss'],
})
export class GameCreationPageComponent implements OnInit {
  gameCreationForm: FormGroup;
  inputFields: RollicInputModel[];

  saveButtonConfig :RollicButtonModel = {
    onClick : (config:any)=>{
      if(this.gameCreationForm.status == "VALID"){
        this.gameListService.addItemToGameList(this.gameCreationForm.value);
        this.router.navigateByUrl("/game-list");
        this.toastService.addNotification({
          msg:"Game Created",
          type:"SUCCESS"
        })

      }
    },
    styleClass:"",
    withIcon:false,
    withText:true,
    buttonText:"Add Game",
    disabled:true
  }

  constructor(private formBuilder:FormBuilder,private gameListService:GameListService,private router: Router,private toastService:ToastService) {
    this.initFormGroupData();

  }

  ngOnInit(): void {
    this.initInputFieldsData();
  }
  initInputFieldsData() {
    let inputFields: RollicInputModel[] = [
      {
        styleClass: 'with-icon rollic-rounded large',
        withIcon: true,
        type: InputTypes.TEXT,
        placeholder: 'Game Name',
        icon: 'fa-solid fa-gamepad',
        formConfig:{
          formGroup:this.gameCreationForm,
          key:"gameName"
        }
      },
      {
        styleClass: 'with-icon rollic-rounded large',
        withIcon: true,
        type: InputTypes.TEXT,
        placeholder: 'Bundle',
        icon: 'fa-solid fa-file-zipper',
        formConfig:{
          formGroup:this.gameCreationForm,
          key:"bundle"
        }
      },
      {
        styleClass: 'with-icon rollic-rounded large',
        withIcon: true,
        type: InputTypes.EMAIL,
        placeholder: 'Owner',
        icon: 'fa-solid fa-user',
        formConfig:{
          formGroup:this.gameCreationForm,
          key:"owner"
        }
      },
      {
        styleClass: 'file-upload',
        withIcon: false,
        type: InputTypes.FILE,
        formConfig:{
          formGroup:this.gameCreationForm,
          key:"file",
          imageTarget:"image",
        }
      },
    ];
    this.inputFields = inputFields;
    // throw new Error('Method not implemented.');
  }
  initFormGroupData() {
    // this.formBuilder.group({
    //   "gameName":[[Validators.required]],
    //   "bundle":[
    //     Validators.required,
    //     Validators.pattern('/^([A-Za-z]{1}[A-Za-zd_]*.)+[A-Za-z][A-Za-zd_]*$/'),
    //   ]
    // })
    let gameCreationForm = new FormGroup({
      gameName: new FormControl('',[Validators.required]),
      bundle: new FormControl('',Validators.compose([Validators.required,
        Validators.pattern('^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$'),])),
      owner: new FormControl('',Validators.compose([Validators.required, Validators.email])),
      file: new FormControl('',[Validators.required]),
      image:new FormControl('',[Validators.required])
    });
    this.gameCreationForm = gameCreationForm;
    this.saveButtonConfig = {disabled:this.gameCreationForm.status != "VALID",...this.saveButtonConfig}
    this.gameCreationForm.valueChanges.subscribe((value)=>{
      this.saveButtonConfig["disabled"] = this.gameCreationForm.status != "VALID";

      console.log(this.saveButtonConfig,this.gameCreationForm.status != "VALID");
    })

  }
}
