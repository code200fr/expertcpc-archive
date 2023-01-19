import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  protected readonly configUrl: string = './assets/app.json';
  protected config: Configuration;

  constructor(private http: HttpClient) { }

  load(): Promise<Configuration> {
    return new Promise((resolve: Function, reject: Function) => {
      this.http.get<Configuration>(this.configUrl)
        .subscribe((data: Configuration) => {
          this.config = data;

          return resolve(data);
        });
      });
  }

  get<P extends keyof Configuration>(property: P): Configuration[P] {
    return this.config[property];
  }

  set<P extends keyof Configuration>(property: P, value:Configuration[P]): void  {
    this.config[property] = value;
  }
}