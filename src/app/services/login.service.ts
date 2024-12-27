import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { LoginUserPayload, LoginUserResponse } from '../types/login.types';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private readonly httpClient: HttpClient) {}

  loginUser(payload: LoginUserPayload) {
    return this.httpClient.post<LoginUserResponse>(
      API_PATHS.loginUser(),
      payload
    );
  }
}
