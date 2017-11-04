import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/modal';
import { FormsModule }   from '@angular/forms';

import { AudienceComponent } from './audience.component';
import { OperatorComponent } from './operator.component';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
	imports: [ 
	PagesRoutingModule, 
	CommonModule, 
	ModalModule.forRoot(),
	FormsModule 
	],
	declarations: [
	AudienceComponent,
	OperatorComponent,
	P404Component,
	P500Component,
	LoginComponent,
	RegisterComponent
	]
})
export class PagesModule { }
