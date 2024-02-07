import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  findedPlayer:any={};
  players:any=[];
  playerId:any;
  constructor(private activatedRoute:ActivatedRoute, private playerService : PlayerService) { }
 
   ngOnInit() {
     this.playerId=this.activatedRoute.snapshot.paramMap.get("id");
     this.playerService.getPlayerById(this.playerId).subscribe(
      (data) => {
        console.log("Here data",data);
        this.findedPlayer = data.player;
      },
      (err) => {console.log("Here error",err);}
    );
    //  this.players=allPlayers;
    //  this.findedPlayer=this.players.find(obj=>{return obj.id==this.playerId})
   }

}
