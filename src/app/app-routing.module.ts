  import {NgModule} from '@angular/core';
  import {CommonModule} from '@angular/common';
  import {RouterModule, Routes} from '@angular/router';
  import {HomeComponent} from './pages/home/home.component';
  import {initialDataResolver} from './app.resolvers';


  const routes: Routes = [

    {
      path: '', pathMatch: "full", redirectTo: "home",
    },
    {
      path: 'redirect_uri', component: HomeComponent,
    },
    {
      path: 'home', component: HomeComponent,
      resolve: {
        initialData: initialDataResolver
      },


    }

  ];

  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(routes),
      CommonModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  }
