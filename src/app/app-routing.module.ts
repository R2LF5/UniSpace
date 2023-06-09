import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import { UniNewsPage } from './main/uni-news/uni-news.page';
import { UniridePage } from './features/uniride/uniride.page';

import { EventlinkPage } from './main/eventlink/eventlink.page';
import { CourseMatePage } from './features/course-mate/course-mate.page';
import { InboxPage } from './features/inbox/inbox.page';
import { ProfilePage } from './profile/profile.page';
import { MyCalanderPage } from './my-calander/my-calander.page';
import { CoursePage } from './features/course-mate/course/course.page';
import { AdminPageModule } from './admin/admin.module';
import { AdminPage } from './admin/admin.page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      { path: 'UniNews', component: UniNewsPage },
      {
        path: 'UniRide',
        children: [
          { path: '', component: UniridePage },
          { path: 'findride/:depart/:destination', loadChildren: () => import('./features/uniride/findride/findride.module').then( m => m.FindridePageModule) },
        ]
      },
      { path: 'EventLink', component: EventlinkPage },
      { path: 'CourseMate', component: CourseMatePage },
      { path: 'Course', component: CoursePage },
      { path: 'Inbox', component: InboxPage },
      { path: 'Profile', component: ProfilePage },
      { path: 'Calendar', component:MyCalanderPage},
      { path: 'admin', component:AdminPage},
      { path: '', redirectTo: 'UniNews', pathMatch: 'full' }, // default child route
    ]
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: 'uni-news',
    loadChildren: () => import('./main/uni-news/uni-news.module').then( m => m.UniNewsModule)
  },
  {
    path: 'uniride',
    loadChildren: () => import('./features/uniride/uniride.module').then( m => m.UniridePageModule)
  },
  {
    path: 'eventlink',
    loadChildren: () => import('./main/eventlink/eventlink.module').then( m => m.EventlinkPageModule)
  },
  {
    path: 'course-mate',
    loadChildren: () => import('./features/course-mate/course-mate.module').then( m => m.CourseMatePageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./features/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'my-calander',
    loadChildren: () => import('./my-calander/my-calander.module').then( m => m.MyCalanderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./explore/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'chemistry',
    loadChildren: () => import('./department/chemistry/chemistry.module').then( m => m.ChemistryPageModule)
  },
  {
    path:'setup',
    loadChildren : () => import('./login/setup-profile/setup-profile.module').then(m => m.SetupProfilePageModule)
  },
  {
    path: 'math',
    loadChildren: () => import('./department/math/math.module').then( m => m.MathPageModule)
  },
  {
    path: 'physics',
    loadChildren: () => import('./department/physics/physics.module').then( m => m.PhysicsPageModule)
  },
  {
    path: 'dep',
    loadChildren: () => import('./login/dep-section/dep-section.module').then( m => m.DepSectionPageModule)
  },

  {
    path: 'computer',
    loadChildren: () => import('./department/computer/computer.module').then( m => m.ComputerPageModule)
  },
  {
    path: 'biology',
    loadChildren: () => import('./department/biology/biology.module').then( m => m.BiologyPageModule)
  },
  {
    path: 'geology',
    loadChildren: () => import('./department/geology/geology.module').then( m => m.GeologyPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./main/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'forgotPassword',
    loadChildren: () => import('./login/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-code',
    loadChildren: () => import('./login/reset-code/reset-code.module').then( m => m.ResetCodePageModule)
  },
  {
    path: 'reset/:token',
    loadChildren: () => import('./login/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'findride/:depart/:destination',
    loadChildren: () => import('./features/uniride/findride/findride.module').then( m => m.FindridePageModule)
  },
  {
    path: 'setup/department',
    loadChildren: () => import('./login/dep-section/dep-section-routing.module').then( m => m.DepSectionPageRoutingModule)
  },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
