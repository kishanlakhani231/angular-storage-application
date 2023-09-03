import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
