import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Party } from 'src/app/shared/models/party';
import { PartyState } from 'src/app/store/reducers/party.reducer';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent {
  @Input() tabActive = {isPersonal: true, isOrg: false, isAdd: false};
  @Output() tabActiveChange = new EventEmitter();
  @Output() addDetailsChange = new EventEmitter();
  @Input() set partyData(v: Party) {
    v ? this.loadApiData(v) : '';
  }

  loading: boolean = false;
  storeParties$ = this.store.select('parties');

  constructor(private fb: FormBuilder, private router: Router, private store: Store<PartyState>) {}
  
  addDetails = this.fb.group({
    login_access: [true],
    remark: [''],
    credit_limit: [0],
    apply_tds: [false]
  })
  
  
  loadApiData(partyData: Party) {
    this.addDetails.patchValue( {
      login_access: partyData.login_access,
      remark: partyData.remark,
      apply_tds: partyData.apply_tds,
      credit_limit: partyData.credit_limit
    });
  }
  
  onSubmit() {
    this.loading = true;
    this.addDetailsChange.emit({tabName: 'add', val: this.addDetails.value})
    this.storeParties$.subscribe(
          data=> {
            // after successful updation of the party rooute back to parties list
            const t = setTimeout(()=> {
              this.loading = false;
              // this.router.navigate(['parties-list']);
            }, 2000);
          }
        );
  }
  
  onPrev() {
    this.loading = true;
    this.addDetailsChange.emit({tabName: 'org', val: this.addDetails.value})
    const t = setTimeout(()=>{
      clearTimeout(t);
      this.tabActive.isOrg = true;
      this.tabActive.isAdd = false;
      this.loading = false;
      this.tabActiveChange.emit(this.tabActive)
    }, 1000)
  }
}
