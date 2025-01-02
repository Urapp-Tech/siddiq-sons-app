import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  CreateEmployeePayload,
  CreateEmployeeResponse,
  GetEmployeeCabinHistoryResponse,
  GetEmployeesResponse,
} from '../types/employee.types';

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

  createEmployee(payload: CreateEmployeePayload) {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    if (payload.address) formData.append('address', payload.address);
    if (payload.avatar) formData.append('avatar', payload.avatar);
    return this.httpClient.post<CreateEmployeeResponse>(
      API_PATHS.createEmployee(),
      formData
    );
  }
}
