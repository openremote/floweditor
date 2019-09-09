import { Pipe, PipeTransform } from '@angular/core';
import { GraphDataTypes } from 'node-structure';

@Pipe({
  name: 'graphSocketTypeColour'
})
export class GraphSocketTypeColourPipe implements PipeTransform {

  transform(type: GraphDataTypes): string {
    switch (type) {
      case GraphDataTypes.Number:
        return '#87db2e';
      case GraphDataTypes.String:
        return '#42b6f4';
      case GraphDataTypes.Boolean:
        return '#2932b5';
      case GraphDataTypes.Any:
        return '#b815d8';
      case GraphDataTypes.Color:
        return '#f4d142';
      case GraphDataTypes.Trigger:
        return '#ff9000';
    }
  }

}
