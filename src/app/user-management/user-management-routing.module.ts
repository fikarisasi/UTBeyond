import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';
import { AddComponent } from './add-content.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Management'
    },
    children: [
      {
        path: 'list-users',
        component: UserManagementComponent,
        data: {
          title: 'List Users'
        }
      },
      {
        path: 'add-content',
        component: AddComponent,
        data: {
          title: 'Add New Content'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
