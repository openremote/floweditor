import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphNode } from '../models/graphnode';
import { NodeSet } from '../models/translating/nodeset';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly path = 'http://localhost:8043/';

  constructor(private http: HttpClient) { }

  public getAllNodes() {
    return this.http.get(this.path + 'nodes/getAll');
  }

  public translate(nodeset: NodeSet) {
    console.log(JSON.stringify(nodeset));
    return this.http.get(this.path + 'nodes/translate?nodes=' + encodeURI(JSON.stringify(nodeset)));
  }
}
