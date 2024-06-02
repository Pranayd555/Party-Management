import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { PartyComponent } from './party.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { UtilityModule } from '../shared/modules/utilities.module';
import { EditPartyComponent } from './edit-party/edit-party.component';
import { PartyResolveService } from './services/party.resolver.service';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AddPartyComponent } from './add-party/add-party.component';


@NgModule({
  declarations: [
    PartyComponent,
    EditPartyComponent,
    PersonalDetailsComponent,
    OrgDetailsComponent,
    AddDetailsComponent,
    AddPartyComponent
  ],
  imports: [
    CommonModule,
    PartyRoutingModule,
    MatTableModule,
    MatIconModule,
    UtilityModule,
  ],
  providers: [PartyResolveService]
})
export class PartyModule { }
