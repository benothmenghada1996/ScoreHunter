import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './Components/home/home.component';
import { AddTeamComponent } from './Components/add-team/add-team.component';
import { EditTeamComponent } from './Components/edit-team/edit-team.component';
import { MatchesComponent } from './Components/matches/matches.component';
import { PlayersComponent } from './Components/players/players.component';
import { MatchFormComponent } from './Components/match-form/match-form.component';
import { PlayerFormComponent } from './Components/player-form/player-form.component';
import { TeamsComponent } from './Components/teams/teams.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ResultComponent } from './Components/result/result.component';
import { MatchInfoComponent } from './Components/match-info/match-info.component';
import { SearchMatchComponent } from './Components/search-match/search-match.component';
import { PlayerInfoComponent } from './Components/player-info/player-info.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { SearchMatchesComponent } from './Components/search-matches/search-matches.component';
import { WeatherComponent } from './Components/weather/weather.component';



const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"signAdmin", component:SignUpComponent},
  {path:"add-Team", component:AddTeamComponent},
  {path:"edit-Team/:id", component:EditTeamComponent},
  {path:"matches", component:MatchesComponent},
  {path:"match-Info/:id", component:MatchInfoComponent},
  {path:"players", component:PlayersComponent},
  {path:"player-Info/:id", component:PlayerInfoComponent},
  {path:"add-Team", component:AddTeamComponent},
  {path:"add-Match", component:MatchFormComponent},
  {path:"editMatch/:id", component:MatchFormComponent},
  {path:"add-Player", component:PlayerFormComponent},
  {path:"editPlayer/:id", component:PlayerFormComponent},
  {path:"teams", component:TeamsComponent},
  {path:"admin", component:AdminComponent},
  {path:"match-form", component:MatchFormComponent}, 
  {path:"search", component:SearchMatchComponent},
  {path:"matches/search", component:MatchesComponent},
  {path:"editProfile", component:EditProfileComponent},
  {path:"searchMatches", component:SearchMatchesComponent},
  {path:"weather", component:WeatherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
