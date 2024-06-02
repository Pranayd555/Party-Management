import { formatNumber } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Party } from 'src/app/shared/models/party';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css']
})
export class OrgDetailsComponent {
  @Input() tabActive = {isPersonal: true, isOrg: false, isAdd: false};
  @Output() tabActiveChange = new EventEmitter();
  @Input() set partyData(v: Party) {
    v ? this.loadApiData(v) : '';
  }

  @ViewChild('firstEle') firstEle!: ElementRef;

  loading: boolean = false;

  @Output() orgDetailsChange = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  orgDetails = this.fb.group({
    company_name: ['', Validators.required],
    gstin: ['', Validators.required],
    whatsapp_no: ['', [Validators.maxLength(20), Validators.pattern(new RegExp('^[0-9()+ \-]{1,20}$'))]],
    bank_id: this.fb.array([this.bankForm()])
});

loadBank(bank: any) {
  this.bankControls.clear();
  return bank.forEach((b: any)=> {
    this.bankControls.push(this.bankForm(b))
  })
}

loadApiData(partyData: Party) {
  this.orgDetails.patchValue( {
    company_name: partyData.company_name,
    gstin: partyData.gstin,
    whatsapp_no: partyData.whatsapp_no,
  });
  
  partyData.bank_id && partyData.bank_id.length > 0 ? this.loadBank(partyData.bank_id) : '';
}

bankForm(bank?: any) {
  return this.fb.group({
    id: bank && bank.id ? [bank.id] : [''],
    bank_ifsc_code: bank? [bank.bank_ifsc_code] : [''],
    bank_name: bank? [bank.bank_name] : [''],
    branch_name: bank? [bank.branch_name] : [''],
    account_no: bank? [bank.account_no] : [''],
    account_holder_name: bank? [bank.account_holder_name] : [''],
})
}

get bankControls() {
  return this.orgDetails.get('bank_id') as FormArray;
}

onSubmit() {
  if(this.orgDetails.valid) {
  this.loading = true;
  this.orgDetailsChange.emit({tabName: 'org', val: this.orgDetails.value});
  } else {
    this.orgDetails.markAllAsTouched();
    this.scrollToErrorField();
    return;
  }
}

onNext() {
  if(this.orgDetails.valid) {
  const t = setTimeout(()=>{
  clearTimeout(t);
  this.tabActive.isOrg = false;
  this.tabActive.isAdd = true;
  this.loading = false;
  this.tabActiveChange.emit(this.tabActive)
  this.movetoTop();
}, 1000)
  }
}

onPrev() {
  if(this.orgDetails.valid) {
  const t = setTimeout(()=>{
    clearTimeout(t);
    this.tabActive.isOrg = false;
    this.tabActive.isPersonal = true;
    this.loading = false;
    this.tabActiveChange.emit(this.tabActive);
    this.movetoTop();
  }, 1000)
}
}


scrollToErrorField(): void {
  for (const controlName in this.orgDetails.controls) {
    if (this.orgDetails.get(controlName)!.invalid) {
      const errorField = this.firstEle.nativeElement;
      errorField.scrollIntoView({ behavior: 'smooth', block: 'start' });
      break;
    }
  }
}

movetoTop() {
  window.scroll({ 
    top: 0, 
    left: 0, 
    behavior: 'smooth' 
  });
}

 // get form data
 get getCompanyName() {
  return this.orgDetails.get('company_name')!;
}

get getGstin() {
  return this.orgDetails.get('gstin')!;
}

get getWpNo() {
  return this.orgDetails.get('whatsapp_no')!;
}
}
