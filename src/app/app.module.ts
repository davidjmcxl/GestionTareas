import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { TaskCreateComponent } from './task-create/task-create.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
const routes: Routes = [
  { path: 'create-task', component: TaskCreateComponent },
  { path: 'list-tasks', component: TaskListComponent },
  { path: '', redirectTo: '/create-task', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,

    TaskListComponent
  ],
  imports: [
    BrowserModule,
    TaskCreateComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
