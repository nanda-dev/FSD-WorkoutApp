import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlService {
  baseUrl: string = "http://localhost:8081/api/"

  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
