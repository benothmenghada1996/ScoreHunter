import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchUrl:string="http://localhost:3000/matches"

  constructor(private httpClient:HttpClient) { }
  getAllMatches(){
    return this.httpClient.get<{ matchesTab: any }>(this.matchUrl);
  }
  addMatch(obj){
    return this.httpClient.post<{msg:string}>(this.matchUrl,obj); 
  }
  editMatch(obj){
    return this.httpClient.put<{ msg: string }>(this.matchUrl,obj) 
  }
  deleteMatchById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.delete<{ msg: string }>(`${this.matchUrl}/${id}`);
  }
  getMatchById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.get<{ match: any }>(`${this.matchUrl}/${id}`);
  }
  searchMatchesByScore(obj){
    return this.httpClient.post<{data:any}>(this.matchUrl + "/searchMatch",obj); 
  }
  // searchWeather(obj){
  //   return this.httpClient.post(this.matchUrl + "/searchWeather",obj); 
  // }
  
}
