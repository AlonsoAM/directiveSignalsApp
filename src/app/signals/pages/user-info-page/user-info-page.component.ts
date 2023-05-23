import { Component, inject, signal, OnInit, computed } from '@angular/core';
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

  public fullName = computed<string>(() => {
    if (!this.currentUser) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userID());
  }

  loadUser(id: number) {
    if (id <= 0) return;
    this.userID.set(id);
    this.currentUser.set(undefined);
    this.usersService.getUserByID(id).subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      },
    });
  }
}
