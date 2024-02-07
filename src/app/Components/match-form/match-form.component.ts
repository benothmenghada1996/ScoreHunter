import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMatches } from 'src/app/Data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  match : any={};
  matches:any=[];
  MatchForm: FormGroup;
  title:string="Add Match";
  matchId:any;
  findedMatch: any;
  constructor(private activatedRoute : ActivatedRoute, private matchService : MatchService, private router :Router) { }

  ngOnInit() {
    this.matchId= this.activatedRoute.snapshot.paramMap.get("id");
    if(this.matchId){
      //Edit Bloc
      this.title="Edit Match"
     this.matchService.getMatchById(this.matchId).subscribe(
      (data) => {
        console.log("Here success",data);
        this.match = data.match;
      },
      (err) => {console.log("Here error",err);}
     );
    }
  }
  addOrEditMatch(){
  if(this.matchId){
    this.matchService.editMatch(this.match).subscribe(
      (success) => {console.log("Here success",success);},
      (err) => {console.log("Here error",err);}
    );
  } 
  else{
    this.matchService.addMatch(this.match).subscribe(
      (success) => {console.log("Here success",success);},
      (err) => {console.log("Here error",err);}
    );
  }
  this.router.navigate(["admin"]);
  }

}
