import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { API_PATHS } from 'src/environments/API-PATHS';
import { AddCabinResponse, GetCabinsResponse } from '../types/cabin.types';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CabinService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {}

  getCabins(page = 0, size = 10, search = '') {
    const { userData } = this.userService;
    if (!userData) return EMPTY;
    const { tenant, branch } = userData;
    return this.httpClient.get<GetCabinsResponse>(
      API_PATHS.getCabins(tenant, branch, page, size, search)
    );
  }

  addCabin(cabinNumber: string) {
    const { userData } = this.userService;
    if (!userData) return EMPTY;
    const { tenant, branch } = userData;
    return this.httpClient.post<AddCabinResponse>(API_PATHS.addCabin(), {
      tenant,
      branch,
      cabinNumber,
    });
  }
}
