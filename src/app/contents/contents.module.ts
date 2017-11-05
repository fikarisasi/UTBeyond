import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/modal';
import { FormsModule }   from '@angular/forms';

// Dropzone Module
// import { DropzoneModule } from 'ngx-dropzone-wrapper';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ContentsComponent } from './contents.component';
import { AddComponent } from './add-content.component';
import { AccountComponent } from './account-content.component';

import { ContentsRoutingModule } from './contents-routing.module';

// const DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//   server: 'https://httpbin.org/post',
//   maxFilesize: 50,
//   acceptedFiles: 'image/*'
// };

@NgModule({
	imports: [
	ContentsRoutingModule,
	ModalModule.forRoot(),
	FormsModule,
	CommonModule,
    // DropzoneModule.forRoot(DROPZONE_CONFIG)
	],
	declarations: [ 
	ContentsComponent,
	AddComponent,
	AccountComponent
	]
})
export class ContentsModule { }
