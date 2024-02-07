import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userUrl: string = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) {}
  // obj = { email:valeur , pwd:valeur}
  login(obj) {
    return this.httpClient.post<{ msg: string; token: string }>(
      this.userUrl + "/login",
      obj
    );
  }
  // obj = { firstName: valeur, lastName:valeur, email:valeur , pwd:valeur}
  signUp(obj:any, img:File) {
    let formData =  new FormData();
    formData.append("img",img);
    formData.append("firstName",obj.firstName);
    formData.append("lastName",obj.lastName);
    formData.append("email",obj.email);
    formData.append("pwd",obj.pwd);
    formData.append("role",obj.role);
    return this.httpClient.post<{ msg: string }>(this.userUrl + "/signup", formData);
  }
  //  obj = {tel:....., pwd:.....}
  editProfile(obj) {
    return this.httpClient.put<{ msg: string }>(this.userUrl, obj);
  }
  getUserById(id){
    // return this.httpClient.delete(this.matchUrl+"/"+id)
    return this.httpClient.get<{ findedUser: any }>(`${this.userUrl}/${id}`);
  }
  //  email = a@a.a
  deleteUserByEmail(email) {
    return this.httpClient.delete(`${this.userUrl}/${email}`);
  }
  displayAllUsers() {
    return this.httpClient.get(this.userUrl);
  }
}
