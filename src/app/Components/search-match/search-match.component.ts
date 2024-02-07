import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  match : any={};
  searchForm: FormGroup;
  searchInput:String;
 
  constructor(private router:Router) { }

  ngOnInit() {
  }
  search(){
  localStorage.setItem("searchInput",JSON.stringify(this.match.team));
  this.router.navigate(["/matches/search"])

  }

}
