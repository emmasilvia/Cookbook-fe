import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component:LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "book", canActivate: [AuthGuard], loadChildren : () => import('./book/book.module').then(m=> m.BookModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
