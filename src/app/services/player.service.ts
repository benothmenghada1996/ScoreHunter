import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl:string="http://localhost:3000/players"
  
  constructor(private httpClient:HttpClient) { }
  
  getAllPlayers(){
    return this.httpClient.get<{ playersTab: any }>(this.playerUrl);
  }
  addPlayer(obj){
    return this.httpClient.post<{ msg: string }>(this.playerUrl,obj);
  }
  editPlayer(obj){
    return this.httpClient.put<{ msg: string }>(this.playerUrl,obj) 
  }
  deletePlayerById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.delete<{ msg: string }>(`${this.playerUrl}/${id}`);
  }
  getPlayerById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.get<{ player: any }>(`${this.playerUrl}/${id}`);
  }
}
