import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User, SingleUserResponse } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  private htpp = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api/users/';

  getUserByID(id: number): Observable<User> {
    return this.htpp.get<SingleUserResponse>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      tap(console.log)
    );
  }
}
