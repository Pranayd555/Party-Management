import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Party } from 'src/app/shared/models/party';

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

  constructor(private fb: FormBuilder) {}
  
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
  }
  
  onPrev() {
    const t = setTimeout(()=>{
      clearTimeout(t);
      this.tabActive.isOrg = true;
      this.tabActive.isAdd = false;
      this.loading = false;
      this.tabActiveChange.emit(this.tabActive)
    }, 1000)
  }
}
