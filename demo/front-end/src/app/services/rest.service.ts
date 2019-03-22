import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphNode } from '../models/graphnode';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  readonly path = 'http://localhost:8043/';

  constructor(public http: HttpClient) { }

  public getAllNodes() {
    return this.http.get(this.path + 'nodes/getAll');
  }
}
