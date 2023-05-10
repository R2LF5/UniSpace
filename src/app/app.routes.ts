import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./login/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'new-password',
    loadComponent: () => import('./login/new-password/new-password.page').then( m => m.NewPasswordPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./explore/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'eventlink',
    loadComponent: () => import('./main/eventlink/eventlink.page').then( m => m.EventlinkPage)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },

  {
    path: 'reset-code',
    loadComponent: () => import('./login/reset-code/reset-code.page').then( m => m.ResetCodePage)
  },

  {
    path: 'news',
    loadComponent: () => import('./features/news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'uniride',
    loadComponent: () => import('./features/uniride/uniride.page').then( m => m.UniridePage)
  },
  {
    path: 'customize-profile',
    loadComponent: () => import('./login/customize-profile/customize-profile.page').then( m => m.CustomizeProfilePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'my-calander',
    loadComponent: () => import('./my-calander/my-calander.page').then( m => m.MyCalanderPage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'addpool',
    loadComponent: () => import('./features/uniride/addpool/addpool.page').then( m => m.AddpoolPage)
  },
  {
    path: 'inbox',
    loadComponent: () => import('./features/inbox/inbox.page').then( m => m.InboxPage)
  },
  {
    path: 'course-mate',
    loadComponent: () => import('./features/course-mate/course-mate.page').then( m => m.CourseMatePage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'chemistry',
    loadComponent: () => import('./department/chemistry/chemistry.page').then( m => m.ChemistryPage)
  },
  {
    path: 'setup-profile',
    loadComponent: () => import('./login/setup-profile/setup-profile.page').then( m => m.SetupProfilePage)
  },
  {
    path: 'dep-section',
    loadComponent: () => import('./login/dep-section/dep-section.page').then( m => m.DepSectionPage)
  },

  {
    path: 'math',
    loadComponent: () => import('./department/math/math.page').then( m => m.MathPage)
  },
  {
    path: 'physics',
    loadComponent: () => import('./department/physics/physics.page').then( m => m.PhysicsPage)
  },
  {
    path: 'computer',
    loadComponent: () => import('./department/computer/computer.page').then( m => m.ComputerPage)
  },
  {
    path: 'biology',
    loadComponent: () => import('./department/biology/biology.page').then( m => m.BiologyPage)
  },
  {
    path: 'geology',
    loadComponent: () => import('./department/geology/geology.page').then( m => m.GeologyPage)
  },
  {
    path: 'uni-news',
    loadComponent: () => import('./main/uni-news/uni-news.page').then( m => m.UniNewsPage)
  },
  {
    path: 'add-event',
    loadComponent: () => import('./main/add-event/add-event.page').then( m => m.AddEventPage)
  },



];
