import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRootComponent } from './notes-root/notes-root.component';
import { FormsModule } from '@angular/forms';
import { EditNotesComponentComponent } from './edit-notes-component/edit-notes-component.component';
import { NotesComponentComponent } from './notes-component/notes-component.component';
import { SortByTitleComponent } from './sort-by-title/sort-by-title.component';
import { DataService } from '../services/data.service';
import { NotesFeatureRoutingModule } from './notes-feature-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotesFeatureRoutingModule
  ],
  declarations: [
    NotesRootComponent,
    EditNotesComponentComponent,
    NotesComponentComponent,
    SortByTitleComponent
  ],
  providers: [DataService]
})
export class NotesFeatureModule { }
