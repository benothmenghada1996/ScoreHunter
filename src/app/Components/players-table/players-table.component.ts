import { Component, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/Data/playersData';
import { Router} from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  players:any=[];
  constructor(private router:Router, private playerService : PlayerService) { }

  ngOnInit() {
     this.getPlayers();
  }
  
  getPlayers(){
    this.playerService.getAllPlayers().subscribe(
      (success) => {
        console.log("Here success",success);
        this.players = success.playersTab;
      },
      (err) => {console.log("Here error",err);}
    );
  }
  goToDisplayPlayer(id:number){
    this.router.navigate([`/player-Info/${id}`]);
  }
  goToEditPlayer(id:number){
     this.router.navigate([`/editPlayer/${id}`]);
  }
  deletePlayer(id:number){
    this.playerService.deletePlayerById(id).subscribe(
      (success) => {
        console.log("Here success",success.msg);
        this.getPlayers();
      },
      (err) => {console.log("Here error",err);}
    );
  }
}


