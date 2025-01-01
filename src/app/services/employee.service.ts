import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  GetEmployeeCabinHistoryResponse,
  GetEmployeesResponse,
} from '../types/users.types';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private readonly httpClient: HttpClient) {}

  getEmployees(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetEmployeesResponse>(
      API_PATHS.getEmployees(page, size, search)
    );
  }

  getEmployeeCabinHistory(
    cabinId: string,
    employeeId: string,
    startDate: string,
    endDate: string,
    page = 0,
    size = 10
  ) {
    return this.httpClient.get<GetEmployeeCabinHistoryResponse>(
      API_PATHS.getEmployeeCabinHistory(
        cabinId,
        employeeId,
        startDate,
        endDate,
        page,
        size
      )
    );
  }
}
