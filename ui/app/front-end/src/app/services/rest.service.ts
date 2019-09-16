import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly path = 'http://localhost:8043/';

  constructor(private http: HttpClient) { }

  public getAllNodes() {
    return this.http.get(this.path + 'nodes/getAll');
  }

  // public translate(nodeset: NodeSet) {
  //   console.log(JSON.stringify(nodeset));
  //   return this.http.post(this.path + 'nodes/translate', JSON.stringify(nodeset));
  // }
}
