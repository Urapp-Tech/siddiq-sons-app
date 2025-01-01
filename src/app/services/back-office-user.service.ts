import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetBackOfficeUsersResponse } from '../types/users.types';

@Injectable({ providedIn: 'root' })
export class BackOfficeUserService {
  constructor(private readonly httpClient: HttpClient) {}

  getBackOfficeUsers(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetBackOfficeUsersResponse>(
      API_PATHS.getBackOfficeUsers(page, size, search)
    );
  }
}
