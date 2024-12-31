import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  AddCabinResponse,
  AssignCabinResponse,
  DeleteCabinResponse,
  EditCabinResponse,
  GetCabinsResponse,
} from '../types/cabin.types';

@Injectable({ providedIn: 'root' })
export class CabinService {
  constructor(private readonly httpClient: HttpClient) {}

  getCabins(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetCabinsResponse>(
      API_PATHS.getCabins(page, size, search)
    );
  }

  addCabin(cabinNumber: string) {
    return this.httpClient.post<AddCabinResponse>(API_PATHS.addCabin(), {
      cabinNumber,
    });
  }

  editCabin(cabinId: string, cabinNumber: string) {
    return this.httpClient.post<EditCabinResponse>(
      API_PATHS.editCabin(cabinId),
      {
        cabinNumber,
      }
    );
  }

  deleteCabin(cabinId: string) {
    return this.httpClient.post<DeleteCabinResponse>(
      API_PATHS.deleteCabin(cabinId),
      {}
    );
  }

  assignCabin(payload: { cabin: string; employee: string }) {
    return this.httpClient.post<AssignCabinResponse>(API_PATHS.assignCabin(), {
      ...payload,
    });
  }
}
