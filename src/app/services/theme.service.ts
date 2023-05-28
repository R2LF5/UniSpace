import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _showThemeSelector = new Subject<void>();
  showThemeSelector$ = this._showThemeSelector.asObservable();

  showThemeSelector() {
    this._showThemeSelector.next();
  }
}
