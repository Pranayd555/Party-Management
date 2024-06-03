import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Party } from 'src/app/shared/models/party';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit{


  constructor(private fb: FormBuilder) {}
  @Input() tabActive = {isPersonal: true, isOrg: false, isAdd: false};
  @Output() tabActiveChange = new EventEmitter();
  @Input() set partyData(v: Party) {
    v ? this.loadApiData(v) : '';
  }
  @Output() personalDetailsChange = new EventEmitter();
  @ViewChild('firstEle') firstEle!: ElementRef;

  selectedFile: File | null = null;
  loading: boolean = false;

  personalDetails = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    mobile_no: ['',[Validators.maxLength(20), Validators.pattern(new RegExp('^[0-9()+ \-]{1,20}$'))]],
    telephone_no: ['', [Validators.maxLength(20), Validators.pattern(new RegExp('^[0-9()+ \-]{1,20}$'))]],
    pan_no: ['', [Validators.maxLength(15)]],
    date_of_birth: [''],
    anniversary_date: [''],
    image:[new File([],'')],
    address : this.fb.array([this.addressForm()])
  });

  ngOnInit(): void {
    this.movetoTop();
  }

  loadApiData(partyData: Party) {
      this.personalDetails.patchValue( {
        name: partyData.name,
        email: partyData.email,
        mobile_no: partyData.mobile_no,
        telephone_no: partyData.telephone_no,
        pan_no: partyData.pan_no,
        date_of_birth: partyData.date_of_birth,
        anniversary_date: partyData.anniversary_date
      });
      
      partyData.address && partyData.address.length > 0 ? this.loadAddress(partyData.address) : '';
    }

    loadAddress(address: any) {
      this.addressControls.clear();
      return address.forEach((add: any)=> {
        this.addressControls.push(this.addressForm(add))
      })
    }

    addressForm(address?: any) {
      return this.fb.group({
        id: address && address.id ? [address.id.toString()] : [''],
        address_line_1: address? [address.address_line_1] : [''],
        address_line_2: address? [address.address_line_2] : [''],
        country: address? [address.country] : [''],
        state: address? [address.state] : [''],
        city: address? [address.city] : [''],
        pincode: address? [address.pincode.toString()] : [''],
  })
    }
    
    get addressControls() {
      return this.personalDetails.get('address') as FormArray;
    }

    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if(input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        this.uploadImg.setValue(this.selectedFile);
      }
    }    

    onSubmit() {
      console.log(this.personalDetails);
      if (this.personalDetails.valid) {
        this.loading = true;
        this.personalDetailsChange.emit({tabName: 'personal', val: this.personalDetails.value});
  
        const t = setTimeout(()=>{
          clearTimeout(t);
          this.tabActive.isOrg = true;
          this.tabActive.isPersonal = false;
          this.loading = false;
          this.tabActiveChange.emit(this.tabActive);
          this.movetoTop();
        }, 1000)
      } else {
        this.personalDetails.markAllAsTouched();
        this.scrollToErrorField();
        return;
      }
    }

    scrollToErrorField(): void {
      for (const controlName in this.personalDetails.controls) {
        if (this.personalDetails.get(controlName)!.invalid) {
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
    get uploadImg() {
      return this.personalDetails.get('image')!;
    }

    get getPancard() {
      return this.personalDetails.get('pan_no')!;
    }

    get getEmail(){
      return this.personalDetails.get('email')!;
    }

    get getMobileNo(){
      return this.personalDetails.get('mobile_no')!;
    }

    get getTeleNo(){
      return this.personalDetails.get('telephone_no')!;
    }

    get getName(){
      return this.personalDetails.get('name')!;
    }
}