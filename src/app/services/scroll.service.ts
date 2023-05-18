import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPositions = new Map<string, number>();

  setScrollPosition(key: string, position: number) {
    this.scrollPositions.set(key, position);
  }

  getScrollPosition(key: string): number | undefined {
    return this.scrollPositions.get(key);
  }
}
