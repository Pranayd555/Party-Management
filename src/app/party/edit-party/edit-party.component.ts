import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Party } from 'src/app/shared/models/party';
import { PartyService } from '../services/party.service';
import { filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { PartyState } from 'src/app/store/reducers/party.reducer';
import { addParty, updateAllParty, updateParty } from 'src/app/store/actions/party.action';

@Component({
  selector: 'app-edit-party',
  templateUrl: './edit-party.component.html',
  styleUrls: ['./edit-party.component.css']
})
export class EditPartyComponent implements OnInit {

  tabActive = {
    isPersonal : true,
    isAdd: false,
    isOrg: false,
  }

  partyData: Party = new Party();
  currentRoute: Params = {};

  storeParties$ = this.store.select('parties');
  
  constructor(public route: ActivatedRoute, public partyService: PartyService, public router: Router, public store: Store<PartyState>){}

  ngOnInit(): void {
    this.route.data.subscribe( {
      next: data => {
        this.partyData = data['party'] as Party;
      },
      error: error=> {
        console.log(error);
      }
    })

    this.route.params.subscribe(data=> {
      this.currentRoute = data;
      console.log(this.currentRoute)
    })
  }


  tabChange(tab: string){
    if(tab == 'personal') {
      this.tabActive.isPersonal = true;
      this.tabActive.isAdd = false;
      this.tabActive.isOrg = false;
    } else if(tab == 'org') {
      this.tabActive.isPersonal = false;
      this.tabActive.isAdd = false;
      this.tabActive.isOrg = true;
    } else if(tab == 'add') {
      this.tabActive.isPersonal = false;
      this.tabActive.isAdd = true;
      this.tabActive.isOrg = false;
    }
  }


  onPartyChange(event: any) {
    this.partyData = {...this.partyData, ...event.val}
    // when updating any existing party
    if(this.currentRoute['id']) {
      if(event['tabName'] == 'add') { // from additional details tab updating all party data through put
        const partyRequestData = this.getPartyReqData(this.partyData);
        this.store.dispatch(updateAllParty({partyForm: partyRequestData, id: this.partyData.id!, party: this.partyData}))
        
      } else { // partial update of party data 
        const partyRequestData = this.getPartyReqData(this.partyData, event['tabName']);
        this.store.dispatch(updateParty({partyForm: partyRequestData, id: this.partyData.id!, party: this.partyData}))
      }
    } else { // when creating new party, calling post on additional details tab submit button
      if(event['tabName']=='add') {
        const partyRequestData = this.getPartyReqData(this.partyData);
        this.store.dispatch(addParty({partyForm: partyRequestData, party: this.partyData}))
      }
    }
    
  } 

  getPartyReqData(party: Party, tabName?: string) {
    let reqData = new FormData();
    if(party.address && party.address.length > 0) {
      reqData.append('address', JSON.stringify(party.address))
    } else {
      reqData.append('address', JSON.stringify([]))
    }

    if(party.bank_id && party.bank_id.length > 0) {
      reqData.append('bank_id', JSON.stringify(party.bank_id))
    } else {
      reqData.append('bank_id', JSON.stringify([]))
    }
    party.name ? reqData.append('name', party.name.toString()!) : reqData.append('name', JSON.stringify(''))
    party.mobile_no ? reqData.append('mobile_no', party.mobile_no.toString()!) : reqData.append('mobile_no', JSON.stringify(null))
    party.telephone_no ? reqData.append('telephone_no', party.telephone_no.toString()!) : reqData.append('telephone_no', JSON.stringify(null))
    party.email ? reqData.append('email', party.email) : ''
    party.date_of_birth ? reqData.append('date_of_birth', party.date_of_birth!) : ''
    party.anniversary_date ? reqData.append('anniversary_date', party.anniversary_date!) : ''
    party.pan_no ? reqData.append('pan_no', party.pan_no.toString()!) : reqData.append('pan_no', JSON.stringify(null))
    party.image ? reqData.append('image', party.image!) : ''
    party.company_name ? reqData.append('company_name', party.company_name.toString()!) : reqData.append('company_name', JSON.stringify(''))
    party.whatsapp_no ? reqData.append('whatsapp_no', party.whatsapp_no.toString()!) : reqData.append('whatsapp_no', JSON.stringify(null))
    party.gstin ? reqData.append('gstin', party.gstin.toString()!) : reqData.append('gstin', JSON.stringify(null))
    party.login_access ? reqData.append('login_access', JSON.stringify(party.login_access)!) : reqData.append('login_access', "false")
    party.remark ? reqData.append('remark', party.remark.toString()!) : reqData.append('credit_limit', JSON.stringify(''))
    party.apply_tds ? reqData.append('apply_tds', party.apply_tds.toString()!) : reqData.append('apply_tds', JSON.stringify(false))
    party.credit_limit ? reqData.append('credit_limit', party.credit_limit.toString()!) : reqData.append('credit_limit', JSON.stringify(0))
    return reqData;
  }

}
