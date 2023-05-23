import { Component, inject, signal, OnInit } from '@angular/core';
import { UsersServiceService } from '../../services/usersService.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {
  private usersService = inject(UsersServiceService);

  public userID = signal(1);

  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser(this.userID());
  }

  loadUser(id: number) {
    if (id <= 0) return;
    this.userID.set(id);
    this.currentUser.set(undefined);
    this.usersService
      .getUserByID(id)
      .subscribe((user) => this.currentUser.set(user));
  }
}
