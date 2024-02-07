import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
weatherForm:FormGroup;
result : any;

  constructor(private formBuilder:FormBuilder,private weatherService : WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ['',[Validators.required]],
    })
  }
  search(){
    console.log("Here searched weather", this.weatherForm.value);
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (success)=>{
      console.log("here response ", success.response);
      this.result = success.response;
      },
      (err)=>{
        console.log("here error ", err);
      }
    );
    console.log("searchform",this.weatherForm.value);
  }

}
