import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches:any=[];
  path:string;
  matchToSearch:any;
  findedMatch:any=[];
  constructor(private router:Router, private matchService : MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        console.log("Here success",data);
        this.matches = data.matchesTab;
      },
      (err) => {console.log("Here error",err);}
    );
  // this.path= this.router.url;
  // if(this.path=="/matches/search"){
  //   this.matchToSearch=JSON.parse(localStorage.getItem("searchInput"));
  // //   // for (let i = 0; i < this.matches.length; i++) {
  // //   //   if(this.matches[i].team1.toLowerCase()==this.matchToSearch.toLowerCase() || this.matches[i].team2.toLowerCase()==this.matchToSearch.toLowerCase()){
  // //   //     this.findedMatch.push(this.matches[i])
  // //   //   }
  // //   // }
  // //   // this.matches=this.findedMatch;
  // //   this.findedMatch=this.matches.filter(obj=>{return obj.team1.toLowerCase()==this.matchToSearch.toLowerCase() || obj.team2.toLowerCase()==this.matchToSearch.toLowerCase()})
  // }
  }
  // getMatches(){
  //   this.matchService.getAllMatches().subscribe(
  //     (data) => {
  //       console.log("Here success",data);
  //       this.matches = data.matchesTab;
  //     },
  //     (err) => {console.log("Here error",err);}
  //   );
  // }
  updateMatches(T){
    this.matches=T;
  }
// Tunis@23
}
