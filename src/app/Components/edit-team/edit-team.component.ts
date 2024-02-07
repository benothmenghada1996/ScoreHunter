import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { allTeams } from 'src/app/Data/matchesData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  team : any={};
  teams:any=[];
  teamForm: FormGroup;
  teamId:any;
  findedTeam: any;
  constructor(private activatedRoute : ActivatedRoute, private teamService:TeamService) { }

  ngOnInit() {
    this.teamId=this.activatedRoute.snapshot.paramMap.get("id");
    if (this.teamId){
     this.teamService.getTeamById(this.teamId).subscribe()
    } 
  }
EditTeam(){
  this.teamService.editTeam(this.team).subscribe();
}
}
