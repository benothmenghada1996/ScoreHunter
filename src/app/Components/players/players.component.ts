import { Component, OnInit, Input } from '@angular/core';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
 
  players:any=[];
  
  constructor(private playerService : PlayerService) { }
 
  ngOnInit() {
    // this.players=allPlayers;
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
}
