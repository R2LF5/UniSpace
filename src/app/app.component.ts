import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { ThemeService } from './services/theme.service'; // adjust the path as needed
import { NotificationService } from './services/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  id: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public actionSheetController: ActionSheetController,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private localNotifications: LocalNotifications
  ) {
    this.initializeTheme();
    this.themeService.showThemeSelector$.subscribe(() => {
      this.presentActionSheet();
    });
  }

  ngOnInit() {

    this.id = setInterval(() => {
     /* this.localNotifications.schedule({
        id:1,
        text:'test',
        data: {secret:'test'}
      })*/
      console.log('work');
      this.notificationService.findAllNotification().subscribe(res=>{
        for(let n of res){
        /*  console.log('n.time '+n.time)
          console.log('new Date().getTime() '+new Date().getTime())
          console.log(' 1 - 2 '+ (n.time - new Date().getTime()))*/
          if( ((new Date().getTime()) - n.time)  < 5000){
            console.log(n.content);
            // naamel create l new component w n3ayetlou houni ?

          }
        }
      })
    }, 5000);

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
