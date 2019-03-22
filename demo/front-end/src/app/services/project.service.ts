import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graphnode';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: GraphNode[] = [];
  
  constructor() { }
}
