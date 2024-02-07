import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() x:any;
  @Output() newMatches : EventEmitter<any> = new EventEmitter();

  constructor(private matchService : MatchService) { }

  ngOnInit() {
  }
  scoreResult(a,b){
    if(a>b){return 0}
    else if(a<b){return 1}
    else {return 2}
  }
  teamResult(a,b){
    if(a>b){return 'red'}
    else if(a<b){return 'green'}
    else {return 'blue'}
  }
  deleteMatch(id:number){
    this.matchService.deleteMatchById(id).subscribe(
      (success) => {
        console.log("Here success",success.msg);
        this.matchService.getAllMatches().subscribe(
          (data) => {
            // send data.matchesTab to matches component (parent)
            this.newMatches.emit(data.matchesTab);
          }
        )
      },
      (err) => {console.log("Here error",err);}
    );
  }

}
