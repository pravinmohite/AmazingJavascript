import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private apiUrl = 'http://localhost:3000/api/register'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  //to register a new user
  register(username: string, password: string) {
    const registrationData = { username, password };
    return this.http.post(this.apiUrl, registrationData);
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  deleteUser(username: string) {
    const deleteUrl = `${this.apiUrl}/${username}`;
    return this.http.delete(deleteUrl);
  }

  updatePassword(username: string, newPassword: string) {
    const updateUrl = `${this.apiUrl}/${username}`;
    const data = { newPassword };
    return this.http.patch(updateUrl, data);
  }
}
