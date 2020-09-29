import { Component, OnInit } from '@angular/core';
import { StavkaNarudzbeniceDto } from 'src/app/model/stavkaNarudzbenice';
import { NarudzbenicaDto } from 'src/app/model/narudzbenica';
import { ApiService } from 'src/app/shared/api.service';
import { NarudzbenicaFormaService } from 'src/app/shared/narudzbenica-forma.service';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { KupacFormaService } from 'src/app/shared/kupac-forma.service';
import { KupacDto } from 'src/app/model/kupac';
import { KupacDeleteDialogComponent } from 'src/app/kupac/kupac-delete-dialog/kupac-delete-dialog.component';
import { KatalogDto } from 'src/app/model/katalog';
import { StavkaKatalogaDto } from 'src/app/model/stavkaKataloga';

@Component({
  selector: 'app-narudzbenica-dialog',
  templateUrl: './narudzbenica-dialog.component.html',
  styleUrls: ['./narudzbenica-dialog.component.css']
})
export class NarudzbenicaDialogComponent implements OnInit {
  stavkaNarudzbeniceDto: StavkaNarudzbeniceDto;
  narudzbenica: NarudzbenicaDto;

  kupci: KupacDto[];
  kup: KupacDto;
  selectedKupac: KupacDto;
  kupac:KupacDto;

  katalozi: KatalogDto[];
  kat: KatalogDto;
  selectedKatalog: KatalogDto;
  katalog:KatalogDto;
  stavkeKataloga : StavkaKatalogaDto[];

  redniBroj:number;
  rb:number;

  constructor(private api: ApiService, private service: NarudzbenicaFormaService, public dialogRef: MatDialogRef<NarudzbenicaDialogComponent>,
              private datePipe: DatePipe, private notif: NotificationsService ) { }
  ngOnInit() {
    this.getAllKupci();
    this.getAllKatalozi();
    if (this.service.updateNarudzbenica) {

      this.narudzbenica = {
        narudzbenicaId: this.service.form.value.narudzbenicaId,
        ukupanIznos: this.service.ukIznos,
        status: 'U pripremi',
        datum: this.service.form.value.datum,
        kupac: this.service.kupac,
        katalog: this.service.katalog,
        stavkeNarudzbenice: this.service.stavkeNarudzbenice
        };

        this.selectedKupac=this.narudzbenica.kupac;
        this.selectedKatalog= this.narudzbenica.katalog;
        
        
       
    }
   

  }
  save() {
    this.napraviNarudzbenicu();
    this.api.saveNarudzbenica(this.narudzbenica).subscribe(res => {
      this.notif.succes('Uspešno sačuvana narudzbenica');
     },
     err => {
      this.notif.warn('Neuspešno sačuvana narudzbenica');
     });
    this.service.form.reset();
    this.service.formStavke.reset();
    this.service.initializeFormGroup();
    this.service.initializeDataTable();
    this.close();
}
update() {
  this.napraviNarudzbenicu();
  this.api.updateNarudzbenica(this.narudzbenica, this.narudzbenica.narudzbenicaId.toString()).subscribe(res => {
    this.notif.succes('Uspešno izmenjena narudzbenica');
   },
   err => {
    this.notif.warn('Neuspešno izmenjena narudzbenica');
   });
  this.service.form.reset();
  this.service.formStavke.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.close();

}
updateZakljuci() {
  this.napraviNarudzbenicu();
  this.narudzbenica.status = 'Zakljucena';
  this.api.updateNarudzbenica(this.narudzbenica, this.narudzbenica.narudzbenicaId.toString()).subscribe(res => {
  this.notif.succes('Uspešno izmenjena narudzbenica');
  },
  err => {
   this.notif.warn('Neuspešno izmenjena narudzbenica');
  });
  this.service.form.reset();
  this.service.formStavke.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.close();
}
clear() {
  this.service.form.reset();
  this.service.formStavke.reset();
  this.service.initializeFormGroup();
}
close() {
  this.service.form.reset();
  this.service.formStavke.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.dialogRef.close();
}

getAllKupci(){
  this.api.getAllKupac().subscribe(
    res => {
      this.kupci = res;
      console.log(this.kupci);
      console.log('Kupci')
    },
    err => {
      alert('Greška prilikom povezivanja na server');
      location.reload();
    }

  );
}

getAllKatalozi(){
  this.api.getAllKatalog().subscribe(
    res => {
      this.katalozi = res;
      console.log(this.katalozi);
      console.log('Katalozi')
    },
    err => {
      alert('Greška prilikom povezivanja na server');
      location.reload();
    }

  );
}


getSelectedKupac(val: any) {
  this.service.kupac = val;
  console.log(this.service.kupac);

}

getSelectedKatalog(val: any) {
  this.service.katalog = val;
  this.service.stavkeKataloga=val.stavkeKataloga;
  console.log(this.service.katalog);
  console.log(this.service.stavkeKataloga);
  this.service.dodaj2.next(val.stavkeKataloga);

}

napraviNarudzbenicu() {
  this.service.form.value.datum = this.datePipe.transform(this.service.form.value.datum, 'yyyy-MM-dd');
  this.narudzbenica = {
  narudzbenicaId: this.service.form.value.narudzbenicaId,
  ukupanIznos: 0,
  status: 'U pripremi',
  datum: this.service.form.value.datum,
  kupac: this.service.kupac,
  katalog: this.service.katalog,
  stavkeNarudzbenice: this.service.stavkeNarudzbenice
  };

  for (let i = 0; i < this.service.stavkeNarudzbenice.length; i++) {
    this.narudzbenica.ukupanIznos+=this.service.stavkeNarudzbenice[i].iznos;
}

  console.log(this.narudzbenica);


}

addUpdateStavka(){ 
    this.napraviStavku();
    this.service.dodaj.next(this.stavkaNarudzbeniceDto);
    this.service.formStavke.reset();
    this.service.postoji=false;
}

napraviStavku(){
  if(this.service.postoji){
    this.redniBroj=this.service.rb;
  } else {
    this.redniBroj = this.service.stavkeNarudzbenice.length+1;
  }
  // console.log(this.redniBroj);
this.stavkaNarudzbeniceDto = {
    stavkaNarudzbeniceId: {
          redniBroj: this.redniBroj
        },
    kolicina:this.service.formStavke.value.kolicina,
    iznos: 0,
    nazivIgracke: this.service.formStavke.value.nazivIgracke,
    opisIgracke: this.service.formStavke.value.opisIgracke,
    cenaIgracke: this.service.formStavke.value.cenaIgracke  
  }
  console.log(this.stavkaNarudzbeniceDto);
  this.stavkaNarudzbeniceDto.iznos=this.stavkaNarudzbeniceDto.cenaIgracke*this.stavkaNarudzbeniceDto.kolicina;
  
}



}
