import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { MatchesComponent } from './Components/matches/matches.component';
import { TeamsComponent } from './Components/teams/teams.component';
import { PlayersComponent } from './Components/players/players.component';
import { CapEventComponent } from './Components/cap-event/cap-event.component';
import { ResultComponent } from './Components/result/result.component';
import { NewsComponent } from './Components/news/news.component';
import { StandingsComponent } from './Components/standings/standings.component';
import { BlogComponent } from './Components/blog/blog.component';
import { InfoComponent } from './Components/info/info.component';
import { ArticleComponent } from './Components/article/article.component';
import { MatchFormComponent } from './Components/match-form/match-form.component';
import { PlayerFormComponent } from './Components/player-form/player-form.component';
import { AddTeamComponent } from './Components/add-team/add-team.component';
import { EditTeamComponent } from './Components/edit-team/edit-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './Components/admin/admin.component';
import { TeamsTableComponent } from './Components/teams-table/teams-table.component';
import { MatchTableComponent } from './Components/match-table/match-table.component';
import { PlayersTableComponent } from './Components/players-table/players-table.component';
import { BannerComponent } from './Components/banner/banner.component';
import { MatchInfoComponent } from './Components/match-info/match-info.component';
import { SearchMatchComponent } from './Components/search-match/search-match.component';
import { PlayerInfoComponent } from './Components/player-info/player-info.component';
import { CriptagePipe } from './pipes/criptage.pipe';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { AddStadiumComponent } from './Components/add-stadium/add-stadium.component';
import { StadiumsTableComponent } from './Components/stadiums-table/stadiums-table.component';
import { SearchMatchesComponent } from './Components/search-matches/search-matches.component';
import { WeatherComponent } from './Components/weather/weather.component';
// import { JwPaginationModule } from 'jw-angular-pagination'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    MatchesComponent,
    TeamsComponent,
    PlayersComponent,
    CapEventComponent,
    ResultComponent,
    NewsComponent,
    StandingsComponent,
    BlogComponent,
    InfoComponent,
    ArticleComponent,
    MatchFormComponent,
    PlayerFormComponent,
    AddTeamComponent,
    EditTeamComponent,
    AdminComponent,
    TeamsTableComponent,
    MatchTableComponent,
    PlayersTableComponent,
    BannerComponent,
    MatchInfoComponent,
    SearchMatchComponent,
    PlayerInfoComponent,
    CriptagePipe,
    CustomFilterPipe,
    SortPipe,
    EditProfileComponent,
    AddStadiumComponent,
    StadiumsTableComponent,
    SearchMatchesComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
