import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {

  searchMatchesForm:FormGroup;
  matches:any=[];
  isFound :boolean=true;

  constructor(private formBuilder:FormBuilder,private matchService : MatchService) { }

  ngOnInit() {
    this.searchMatchesForm = this.formBuilder.group({
      scoreOne: ['',[Validators.required]],
      scoreTwo:['',[Validators.required]],
    })
  }
  search(){
    console.log("Here searched matches", this.searchMatchesForm.value);
    this.matchService.searchMatchesByScore(this.searchMatchesForm.value).subscribe(
      (success)=>{
        console.log("Here finded matches",success.data);
        this.matches = success.data;
        success.data.length > 0 ? this.isFound=true : this.isFound = false
      },
      (err)=>{
        console.log("Here error",err);
      }
    );
  }

}
