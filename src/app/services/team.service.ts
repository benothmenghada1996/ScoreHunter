import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl:string="http://localhost:3000/teams"
  
  constructor(private httpClient:HttpClient) { }
  getAllTeams(){
    return this.httpClient.get<{ teamsTab: any }>(this.teamUrl);
  }
  addTeam(obj){
    return this.httpClient.post<{msg:string}>(this.teamUrl,obj);
  }
  editTeam(obj){
    return this.httpClient.put(this.teamUrl,obj) 
  }
  deleteTeamById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.delete<{ msg: string }>(`${this.teamUrl}/${id}`);
  }
  getTeamById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.get(`${this.teamUrl}/${id}`);
  }
  searchTeamsByStadium(obj){
    return this.httpClient.post<{data:any}>(this.teamUrl + "/search",obj); 
  }
  
  
}
