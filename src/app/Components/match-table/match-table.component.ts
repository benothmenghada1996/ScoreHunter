import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.css']
})
export class MatchTableComponent implements OnInit {

  matches:any=[];
  constructor(private router:Router, private matchService : MatchService) { }

  ngOnInit() {
   this.getMatches();
  }
  goToDisplayMatch(id:number){
   this.router.navigate([`/match-Info/${id}`])
  }
  goToEditMatch(id:number){
    this.router.navigate([`/editMatch/${id}`])
  }
  deleteMatch(id:number){
    this.matchService.deleteMatchById(id).subscribe(
      (success) => {
        console.log("Here success",success.msg);
        this.getMatches();
      },
      (err) => {console.log("Here error",err);}
    );
  }
  getMatches(){
    this.matchService.getAllMatches().subscribe(
      (success) => {
        console.log("Here success",success);
        this.matches = success.matchesTab;
      },
      (err) => {
        console.log("Here error",err);
      }
    );
  }

}
