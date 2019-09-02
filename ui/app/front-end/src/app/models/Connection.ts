import { GraphSocket } from './graph.socket';
import { ElementRef } from '@angular/core';

export class Connection {
    constructor(
        public from: GraphSocket,
        public to: GraphSocket,
        public fromElement: Element,
        public toElement: Element) {
    }
}
