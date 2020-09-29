import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class KupacFormaService {
  createKupac = false;
  updateKupac= false;
  viewKupac = false;

  form: FormGroup = new FormGroup({
    kupacId: new FormControl(''),
    naziv: new FormControl('', Validators.required),
    pib: new FormControl('',Validators.required),
    adresa: new FormControl('',Validators.required),
    kontaktTel: new FormControl('',Validators.required),
  });
  constructor() { }
  initializeFormGroup() {
    this.form.setValue({
      kupacId: '',
      naziv: '',
      pib: '',
      adresa: '',
      kontaktTel: '',

    });
  }
  populateForm(kupac) {
    this.form.setValue({
      kupacId: kupac.kupacId,
      naziv: kupac.naziv,
      pib: kupac.pib,
      adresa: kupac.adresa,
      kontaktTel: kupac.kontaktTel,
});
  }
  view(row) {
    this.createKupac = false;
    this.viewKupac = true;
    this.updateKupac = false;
    this.populateForm(row);

  }
  update(row) {
    this.createKupac = false;
    this.viewKupac = false;
    this.updateKupac = true;
    this.populateForm(row);
  }
  create() {
    this.createKupac = true;
    this.viewKupac = false;
    this.updateKupac = false;
  }
}
