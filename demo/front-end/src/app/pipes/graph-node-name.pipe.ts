import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'graphNodeName'
})
export class GraphNodeNamePipe implements PipeTransform {

  transform(name: string): any {
    let newString = '';

    for (let i = 0; i < name.length; i++) {
      if (name[i].toUpperCase() === name[i] && i !== 0) {
        newString += ' ';
      }
      newString += name[i];
    }

    return newString;
  }

}
