import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetOperationCategoryItemsResponse } from '../types/operation-category-item.types';

@Injectable({ providedIn: 'root' })
export class OperationCategoryItemService {
  constructor(private readonly httpClient: HttpClient) {}

  getOperationCategoryItems(
    categoryId: string,
    page = 0,
    size = 10,
    search = ''
  ) {
    return this.httpClient.get<GetOperationCategoryItemsResponse>(
      API_PATHS.getOperationCategoryItems(categoryId, page, size, search)
    );
  }
}
