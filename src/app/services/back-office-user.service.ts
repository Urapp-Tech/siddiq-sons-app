import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  CreateBackOfficeUserPayload,
  CreateBackOfficeUserResponse,
  GetBackOfficeUsersResponse,
} from '../types/back-office-user.types';

@Injectable({ providedIn: 'root' })
export class BackOfficeUserService {
  constructor(private readonly httpClient: HttpClient) {}

  getBackOfficeUsers(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetBackOfficeUsersResponse>(
      API_PATHS.getBackOfficeUsers(page, size, search)
    );
  }

  createBackOfficeUser(payload: CreateBackOfficeUserPayload) {
    return this.httpClient.post<CreateBackOfficeUserResponse>(
      API_PATHS.createBackOfficeUser(),
      payload
    );
  }
}
