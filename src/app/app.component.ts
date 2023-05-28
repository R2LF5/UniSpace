import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { ThemeService } from './services/theme.service'; // adjust the path as needed

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public actionSheetController: ActionSheetController,
    private themeService: ThemeService
  ) {
    this.initializeTheme();
    this.themeService.showThemeSelector$.subscribe(() => {
      this.presentActionSheet();
    });
  }

  ngOnInit() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.document.body.classList.add('dark');
    } else if (storedTheme === 'light') {
      this.document.body.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        this.document.body.classList.add('dark');
      } else {
        this.document.body.classList.remove('dark');
      }
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme as 'dark' | 'light' | 'system');
    } else {
      this.setTheme('system');
    }
  }

  setTheme(theme: 'dark' | 'light' | 'system') {
    switch (theme) {
      case 'dark':
        this.document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        this.document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      case 'system':
        localStorage.removeItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          this.document.body.classList.add('dark');
        } else {
          this.document.body.classList.remove('dark');
        }
        break;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Theme',
      buttons: [
        {
          text: 'Light Theme',
          icon: 'sunny',
          handler: () => {
            this.setTheme('light');
          },
        },
        {
          text: 'Dark Theme',
          icon: 'moon',
          handler: () => {
            this.setTheme('dark');
          },
        },
        {
          text: 'System Default',
          icon: 'cog',
          handler: () => {
            this.setTheme('system');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
