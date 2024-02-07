import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { allTeams } from 'src/app/Data/matchesData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teams:any=[];
  team:any={};
  isDisplayed:boolean=true;
  isFound :boolean=true;
  searchForm: FormGroup;

  constructor(private router:Router, private teamService:TeamService) { }

  ngOnInit() {
  this.getTeams();
  }

  goToEditTeam(id:number){
  this.router.navigate([`/edit-Team/${id}`]);
   }
   goToDisplayTeam(id:number){
    this.router.navigate([`/match-Info/${id}`])
   }
   deleteTeam(id:number){
    this.teamService.deleteTeamById(id).subscribe(
      (success) => {
        console.log("Here success",success.msg);
        this.getTeams();
      },
      (err) => {console.log("Here error",err);}
    );
   }

  search(){
  // this.teams=allTeams
  // this.findedTeams=this.teams.filter(obj=>{return obj.Stadium==this.team.Stadium})
  // this.teams=this.findedTeams
  console.log("Here searched teams", this.teams);
  this.teamService.searchTeamsByStadium(this.team).subscribe(
    (success)=>{
      console.log("Here finded team",success.data);
      this.teams= success.data;
      success.data.length > 0 ? this.isFound=true : this.isFound = false
    },
    (err)=>{
      console.log("Here error",err);
    }
  );
  
  }

  getTeams(){
    this.teamService.getAllTeams().subscribe(
      (success) => {
        console.log("Here success",success);
       this.teams = success.teamsTab; 
      },
      (err) => {console.log("Here error",err);}
    );
  }
}
