import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [EditEntryComponent],
  entryComponents: [EditEntryComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [EditEntryComponent]
})
export class SharedModule {}
