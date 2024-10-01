import { NgModule } from '@angular/core';
// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
@NgModule({

  exports:[
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule { }
