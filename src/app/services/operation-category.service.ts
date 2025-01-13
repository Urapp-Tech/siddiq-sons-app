import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetOperationCategoriesResponse } from '../types/operation-category.types';

@Injectable({ providedIn: 'root' })
export class OperationCategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  getOperationCategories(page = 0, size = 10, search = '') {
    return this.httpClient.get<GetOperationCategoriesResponse>(
      API_PATHS.getOperationCategories(page, size, search)
    );
  }
}
