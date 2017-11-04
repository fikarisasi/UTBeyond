import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentsComponent } from './contents.component';
import { AddComponent } from './add-content.component';
import { AccountComponent } from './account-content.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contents'
    },
    children: [
      {
        path: 'list-contents',
        component: ContentsComponent,
        data: {
          title: 'List Contents'
        }
      },
      {
        path: 'add-content',
        component: AddComponent,
        data: {
          title: 'Add New Content'
        }
      },
      {
        path: 'account-content',
        component: AccountComponent,
        data: {
          title: 'Pengaturan Akun'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule {}
