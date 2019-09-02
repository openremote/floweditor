import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private keysDown: string[] = [];
  private callbacks: ((key: string) => void)[] = [];

  public mousePos: { x: number, y: number };
  public focusInputCount = 0;

  constructor() {
    window.addEventListener('keydown', (e) => this.registerKeyDown(e), false);
    window.addEventListener('keyup', (e) => this.registerKeyUp(e), false);
    window.addEventListener('mousemove', (e) => this.updateMousePos(e), false);

    window.addEventListener('contextmenu', () => this.deregisterEverything(), false);
    window.onfocus = () => this.deregisterEverything();
    window.onblur =  () => this.deregisterEverything();
  }

  private deregisterEverything() {
    this.keysDown = [];
  }

  private registerKeyDown(event: KeyboardEvent) {
    this.keysDown.push(event.key);

    this.callbacks.forEach(callback => {
      callback(event.key);
    });
  }

  private registerKeyUp(event: KeyboardEvent) {
    const index = this.keysDown.indexOf(event.key);
    if (index === -1) { return; }
    const newKeys: string[] = [];

    this.keysDown.forEach(k => {
      if (k !== event.key) {
        newKeys.push(k);
      }
    });

    this.keysDown = newKeys;
  }

  updateMousePos(e: MouseEvent): any {
    this.mousePos = { x: e.clientX, y: e.clientY };
  }

  public registerCallback(callback: (key: string) => void) {
    this.callbacks.push(callback);
  }

  public deregisterCallback(callback: (key: string) => void) {
    this.callbacks.splice(this.callbacks.indexOf(callback), 1);
  }

  public isKeyDown(key: string): boolean {
    return this.keysDown.includes(key);
  }
}
