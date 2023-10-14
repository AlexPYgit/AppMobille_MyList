import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  formParams = new FormGroup({
    nombreDeZone: new FormControl(''),
    changementDuration: new FormControl(''),
    pourQui: new FormControl('')
  }
  );

  showMe() {
    console.log(`${this.formParams.value.pourQui}`);
  }

}
