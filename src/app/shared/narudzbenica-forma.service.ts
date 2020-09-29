import { Injectable } from '@angular/core';
import { StavkaNarudzbeniceDto } from '../model/stavkaNarudzbenice';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NarudzbenicaDto } from '../model/narudzbenica';
import { KupacDto } from '../model/kupac';
import { KatalogDto } from '../model/katalog';
import { StavkaKatalogaDto } from '../model/stavkaKataloga';

@Injectable({
  providedIn: 'root'
})
export class NarudzbenicaFormaService {
  constructor() {
    this.dodaj.asObservable().subscribe((data) => {
      console.log('Stavka prosledjena:');
      console.log(data);
     this.dodajIzmeniStavkuNarudzbenice(data);
    });
    this.dodaj2.asObservable().subscribe((data) => {
     console.log('Stavka kataloga prosledjena:');
      console.log(data);
     this.stavkeKataloga=data;
    });
    this.dodaj3.asObservable().subscribe((data) => {
      console.log('Stavka prosledjena:');
      console.log(data);
     this.dodajStavkuNarudzbenice(data);
    });
  }
  createNarudzbenica = false;
  updateNarudzbenica = false;
  viewNarudzbenica = false;
  stavkeNarudzbenice : StavkaNarudzbeniceDto[] = [];
  dodaj = new BehaviorSubject<any>(null);
  dodaj2 = new BehaviorSubject<any>(null);
  dodaj3 = new BehaviorSubject<any>(null);
  selectKupci= new BehaviorSubject<any>(null);
  selectKatalozi= new BehaviorSubject<any>(null);
  kupac:KupacDto;
  kupacIme:string;
  katalog:KatalogDto;
  katalogIme:string;
  redniBroj: number;
  stavkaNarudzbeniceDto : StavkaNarudzbeniceDto;
  stavka:StavkaNarudzbeniceDto=null;
  rb:number;
  postoji:boolean;

  ukIznos: number;
  izn: number;

  stavkeKataloga : StavkaKatalogaDto[];

  izabranKatalog: boolean=false;

  form: FormGroup = new FormGroup({
    narudzbenicaId: new FormControl(''),
    ukupanIznos: new FormControl(''),
    datum: new FormControl(''),
    kupac: new FormControl(''),
    kupacIme: new FormControl(''),
    status: new FormControl(''),
    katalog: new FormControl(''),
    katalogIme: new FormControl('',)
    // nazivIgracke: new FormControl(''),
    // opisIgracke: new FormControl(''),
    // iznos: new FormControl(''),
    // kolicina: new FormControl(''),
  });

  formStavke: FormGroup = new FormGroup({
    // nazivIgracke: new FormControl('',Validators.required),
    // opisIgracke: new FormControl(''),
    // iznos: new FormControl(''),
    kolicina: new FormControl('',Validators.required),
    // cenaIgracke: new FormControl('',Validators.required),
  });
  narudzbenica: NarudzbenicaDto;
  minDate() {
    if (this.form.getRawValue().datum === '') {
     return   new Date(1900, 0, 1);
    } else {
      return this.form.getRawValue().datum;
    }
  }
  initializeFormGroup() {
    this.form.setValue({
      narudzbenicaId: '',
      ukupanIznos: '',
      datum: '',
      kupac: '',
      kupacIme: '',
      status: '',
      katalog: '',
      katalogIme: '',
    });

    this.formStavke.setValue({
      // nazivIgracke:'',
      // opisIgracke:'',
      // iznos: '',
     kolicina: '',
     //cenaIgracke:''
    });
  }

initializeKupac() {
  this.kupac = null;
}
initializeKatalog() {
  this.katalog = null;
  this.stavkeKataloga=[];
}

  populateForm(narudzbenica) {
    this.form.setValue({
      narudzbenicaId: narudzbenica.narudzbenicaId,
      ukupanIznos: narudzbenica.ukupanIznos,
      datum: narudzbenica.datum,
      kupac: narudzbenica.kupac,
      kupacIme : narudzbenica.kupac.naziv,
      katalogIme: narudzbenica.katalog.naziv,
      katalog : narudzbenica.katalog,
      status: narudzbenica.status,

    });
    this.formStavke.setValue({
      // nazivIgracke:"",
      // opisIgracke: "",
      // iznos:"",
      kolicina:"",
      // cenaIgracke: "",

    });
    this.kupac=narudzbenica.kupac;
    this.kupacIme=narudzbenica.kupac.naziv;
    this.katalog=narudzbenica.katalog;
    this.katalogIme=narudzbenica.katalog.naziv;
    //this.stavkeKataloga=narudzbenica.katalog.stavkeKataloga;
  
  }
  populateFormStavke(stavka) {
    this.rb=stavka.stavkaNarudzbeniceId.redniBroj;
    this.formStavke.setValue({
      nazivIgracke:stavka.nazivIgracke,
      opisIgracke:stavka.opisIgracke,
      iznos:stavka.iznos,
      kolicina:stavka.kolicina,
      cenaIgracke:stavka.cenaIgracke,

    });
  }
  populateDataTable(row) {
    this.stavkeNarudzbenice = row.stavkeNarudzbenice;
    console.log(this.stavkeNarudzbenice);
  }

  populateDataTableK(row) {
    this.stavkeKataloga = row.katalog.stavkeKataloga;
   console.log(this.stavkeKataloga);
  }

  initializeDataTable() {
    this.stavkeNarudzbenice = [];
    this.narudzbenica = null;
  }

  initializeDataTableK() {
    this.stavkeKataloga = [];
    this.katalog = null;
  }

  view(row) {
    this.createNarudzbenica = false;
    this.viewNarudzbenica = true;
    this.updateNarudzbenica = false;
    this.populateForm(row);
    this.populateDataTable(row);
    this.populateDataTableK(row);

  }
  update(row) {
    this.createNarudzbenica = false;
    this.viewNarudzbenica = false;
    this.updateNarudzbenica = true;
    this.populateForm(row);
    this.populateDataTable(row);
    this.populateDataTableK(row);
  }
  create() {
    this.createNarudzbenica = true;
    this.viewNarudzbenica = false;
    this.updateNarudzbenica = false;
    this.stavkeNarudzbenice = [];
    this.stavkeKataloga= [];
    
  }
  dodajIzmeniStavkuNarudzbenice(data){
    this.stavkaNarudzbeniceDto=data;
    if(this.postoji){
      this.stavkeNarudzbenice.splice(this.rb-1,1,this.stavkaNarudzbeniceDto);
    } else {
      this.stavkeNarudzbenice.push(this.stavkaNarudzbeniceDto);
    
    }
  }

  dodajStavkuNarudzbenice(data){
    this.stavkaNarudzbeniceDto=data;
   this.stavkeNarudzbenice.push(this.stavkaNarudzbeniceDto);
 
   
    
  } 

}
