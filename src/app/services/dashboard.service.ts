import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetDashboardActivityResponse } from '../types/dashboard.types';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly httpClient: HttpClient) {}

  getDashboardActivity() {
    return this.httpClient.get<GetDashboardActivityResponse>(
      API_PATHS.getDashboardActivity()
    );
  }
}
