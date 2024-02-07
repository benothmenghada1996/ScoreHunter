import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  player : any={};
  players:any=[];
  playerForm: FormGroup;
  title:string="Add Player" ;
  btn:string="add";
  playerId:any;
  // findedPlayer: any;
  teams:any=[];
  teamId: any;
  t:any={};
  constructor(private activatedRoute : ActivatedRoute, private playerService : PlayerService,private teamService: TeamService
    ,private router :Router) { }
  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (success) => {
        console.log("Here success",success);
       this.teams = success.teamsTab; 
      },
      (err) => {console.log("Here error",err);}
    );
    
    // this.players=allPlayers;
    // this.playerId= this.activatedRoute.snapshot.paramMap.get("id");
    // if(this.playerId){
    //   //Edit Bloc
    //   this.title="Edit Player"
    //   this.playerService.getPlayerById(this.playerId).subscribe(
    //    (data) => {
    //      console.log("Here success",data);
    //      this.player = data.player;
    //    },
    //    (err) => {console.log("Here error",err);}
    //   );
    // }
  }
  // addOrEditPlayer(){
  //   if(this.playerId){
  //     this.playerService.editPlayer(this.player).subscribe(
  //       (success) => {console.log("Here success",success);
  //     this.router.navigate(["admin"]);},
  //       (err) => {console.log("Here error",err);}
  //     );
  //   } 
  //   else{
  //     console.log("Here added Player",this.player);
  //     this.player.tId = this.teamId;
  //     this.playerService.addPlayer(this.player).subscribe(
  //       (success) => {console.log("Here success",success);},
  //       (err) => {console.log("Here error",err);}
  //     );
  //   }
  addPlayer(){
    console.log("Add player click", this.player);
    this.player.teamId = this.teamId;
    this.playerService.addPlayer(this.player).subscribe(
            (success) => {
              console.log("Here success", success.msg);
              this.router.navigate(["admin"]);
            },
            (err) => {
              console.log("Here error", err);
            }
          );
  }
  selectTeam(evt) {
    console.log(" Here selected Team ID", evt.target.value);
    this.teamId =evt.target.value;
  }
    
  }



