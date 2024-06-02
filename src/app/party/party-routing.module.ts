import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyComponent } from './party.component';
import { EditPartyComponent } from './edit-party/edit-party.component';
import { partyResolver } from './services/party.resolver.service';
import { AddPartyComponent } from './add-party/add-party.component';

const routes: Routes = [{ path: '', component: PartyComponent },
  {path: 'edit-party/:id', component: EditPartyComponent, resolve: {party: partyResolver}},
  { path: 'add-party', component: AddPartyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule { }
