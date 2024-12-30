import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  GetBackOfficeUsersResponse,
  GetEmployeesResponse,
} from '../types/users.types';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {}

  getBackOfficeUsers(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetBackOfficeUsersResponse>(
      API_PATHS.getBackOfficeUsers(page, size, search)
    );
  }

  getEmployees(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetEmployeesResponse>(
      API_PATHS.getEmployees(page, size, search)
    );
  }
}
