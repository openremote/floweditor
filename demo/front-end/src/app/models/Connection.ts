import { GraphSocket } from './graphsocket';
import { ElementRef } from '@angular/core';

export class Connection {
    constructor(
        public from: GraphSocket,
        public to: GraphSocket,
        public fromElement: Element,
        public toElement: Element) {
    }
}