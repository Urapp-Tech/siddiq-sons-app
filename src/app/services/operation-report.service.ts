import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import {
  CreateOperationReportPayload,
  CreateOperationReportResponse,
} from '../types/operation-report.types';

@Injectable({ providedIn: 'root' })
export class OperationReportService {
  constructor(private readonly httpClient: HttpClient) {}

  createOperationReport(payload: CreateOperationReportPayload) {
    return this.httpClient.post<CreateOperationReportResponse>(
      API_PATHS.createOperationReport(),
      payload
    );
  }
}
