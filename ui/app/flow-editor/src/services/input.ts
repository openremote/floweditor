import { EventEmitter } from "events";

export class Input extends EventEmitter {
    public currentlyFocused: HTMLElement;
}
