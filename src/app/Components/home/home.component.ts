import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  match: any = {};
  constructor() {}

  ngOnInit() {
    // this.match = {
    //   id: "1",
    //   team1: "Real",
    //   team2: "PSG",
    //   Score1: "1",
    //   Score2: "3",
    // };
  }
}
