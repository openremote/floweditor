import { Pipe, PipeTransform } from '@angular/core';
import { NodeType } from '@openremote/model';

@Pipe({
  name: 'graphNodeTypeClass'
})
export class GraphNodeTypeClassPipe implements PipeTransform {

  transform(type: NodeType): string {
    switch (type) {
      case NodeType.INPUT:
        return 'node-input';
      case NodeType.OUTPUT:
        return 'node-output';
      case NodeType.PROCESSOR:
        return 'node-processor';
        case NodeType.THEN:
        return 'node-then';
    }
  }

}
