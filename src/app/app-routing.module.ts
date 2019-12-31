import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {VideoEmbedComponent} from './components/video-embed/video-embed.component';
import {VideosComponent} from './components/videos/videos.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'embed/:id', component: VideoEmbedComponent },
  { path: 'videos', component: VideosComponent}
  // {path: 'course-category', component: CoursesCategoryComponent, canActivate: [AuthGuard]},
  // {path: 'login', component: LoginComponent},
  // {path: 'search', component: SearchComponent},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
