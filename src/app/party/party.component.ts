import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../register/services/login-service.service';
import { PartyService } from './services/party.service';
import { PartyInterface } from '../shared/interfaces/IParty';
import { Party } from '../shared/models/party';
import { Router } from '@angular/router';
import { PartyState } from '../store/reducers/party.reducer';
import { Store } from '@ngrx/store';
import { deleteParty, getParties } from '../store/actions/party.action';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit{


  constructor(private partyService: PartyService, private router: Router, private store: Store<PartyState>){}

  storeParties$ = this.store.select('parties');
  displayedColumns: string[] = ['name', 'company_name', 'mobile_no', 'email', 'edit', 'delete'];
  dataSource: PartyInterface[] = [];
  isDelete: number = NaN;
  isEdit: number = NaN;

  ngOnInit(): void {
    this.store.dispatch(getParties());
    this.storeParties$.subscribe(
      data=> {
        let storeData: Party[] = []
        for(let key in data) {
          if (key == 'parties') {
            storeData = JSON.parse(JSON.stringify(data[key]))
          } 
        }
        this.dataSource = storeData;
        this.isDelete = NaN;
      })
  }

  getPartiesData() {
    
  }

  editParty(party: Party) {
    this.isEdit = party.id!;
    this.router.navigate(['parties-list/edit-party', party.id])
  }

  deleteParty(party: Party) {
    this.isDelete = party.id!;
    this.store.dispatch(deleteParty({id : party.id!, party: party}))
  }
}
