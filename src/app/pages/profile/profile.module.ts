
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { profilePageRoutingModule } from './profile-routing.module';

import { profilePage } from './profile.page';
import { ContactModule} from'../../contact/contact.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactModule,
    profilePageRoutingModule
  ],
  declarations: [profilePage]
})
export class profilePageModule {}
