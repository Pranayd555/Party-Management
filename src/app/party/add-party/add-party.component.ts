import { Component } from '@angular/core';
import { EditPartyComponent } from '../edit-party/edit-party.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PartyService } from '../services/party.service';
import { PartyState } from 'src/app/store/reducers/party.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent extends EditPartyComponent {
  constructor(public override route: ActivatedRoute, public override partyService: PartyService, public override router: Router, public override store: Store<PartyState>){
    super(route, partyService, router, store)
  }
}
