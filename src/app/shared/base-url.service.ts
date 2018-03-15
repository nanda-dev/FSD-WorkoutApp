import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlService {
  baseUrl: string = "http://localhost:8083/api/"

  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
