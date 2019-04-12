import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private keysDown: string[] = [];

  constructor() {
    window.addEventListener('keydown', (e) => this.registerKeyDown(e), false);
    window.addEventListener('keyup', (e) => this.registerKeyUp(e), false);
  }

  private registerKeyDown(event: KeyboardEvent) {
    this.keysDown.push(event.key);
    console.log('down', event.key);
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

    console.log('up', event.key);
  }

  public isKeyDown(key: string): boolean {
    return this.keysDown.includes(key);
  }
}
