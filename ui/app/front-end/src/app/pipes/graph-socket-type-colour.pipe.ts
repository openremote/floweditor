import { Pipe, PipeTransform } from '@angular/core';
import { NodeDataType } from '@openremote/model';

@Pipe({
  name: 'graphSocketTypeColour'
})
export class GraphSocketTypeColourPipe implements PipeTransform {

  transform(type: NodeDataType): string {
    switch (type) {
      case NodeDataType.NUMBER:
        return '#87db2e';
      case NodeDataType.STRING:
        return '#42b6f4';
      case NodeDataType.BOOLEAN:
        return '#2932b5';
      case NodeDataType.ANY:
        return '#b815d8';
      case NodeDataType.COLOR:
        return '#f4d142';
      case NodeDataType.TRIGGER:
        return '#ff9000';
    }
  }

}
