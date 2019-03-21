import { Pipe, PipeTransform } from '@angular/core';
import { GraphNodeType } from '../models/GraphNodeType';

@Pipe({
  name: 'graphNodeTypeClass'
})
export class GraphNodeTypeClassPipe implements PipeTransform {

  transform(type: GraphNodeType): string {
    switch (type) {
      case GraphNodeType.Input:
        return "node-input";
      case GraphNodeType.Output:
        return "node-output";
      case GraphNodeType.Processor:
        return "node-processor";
    }
  }

}
