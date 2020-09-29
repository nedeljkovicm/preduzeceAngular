import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { StavkaKatalogaDto } from 'src/app/model/stavkaKataloga';
import { NarudzbenicaFormaService } from 'src/app/shared/narudzbenica-forma.service';
import { StavkaNarudzbeniceDto } from 'src/app/model/stavkaNarudzbenice';

@Component({
  selector: 'app-tabela-stavke-kataloga',
  templateUrl: './tabela-stavke-kataloga.component.html',
  styleUrls: ['./tabela-stavke-kataloga.component.css']
})
export class TabelaStavkeKatalogaComponent implements OnInit {
  displayedColumns: string[] = ['redniBroj', 'naziv', 'trenutnaCena', 'stanjeNaZalihama', 'opis','actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.service.stavkeKataloga);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;


  stavkaNarudzbeniceDto : StavkaNarudzbeniceDto;
  redniBroj: number;

 kol: string;

  constructor(private service: NarudzbenicaFormaService) { }

  ngOnInit() {
    this.pripremi();
    this.service.dodaj2.asObservable().subscribe((data) => {
      console.log(this.service.stavkeKataloga);
      this.dataSource.data = this.service.stavkeKataloga;
      this.dataSource.filterPredicate = (dto: StavkaKatalogaDto, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        const listAsFlatString = (obj): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
            if (typeof val !== 'object') {
              returnVal = returnVal + ' ' + val;
            } else if (val !== null) {
              returnVal = returnVal + ' ' + listAsFlatString(val);
            }
          });
  
          return returnVal.trim().toLowerCase();
        };
  
        return listAsFlatString(dto).includes(transformedFilter);
      };
    });

   
  }
 
pripremi(){

  this.dataSource = new MatTableDataSource();
  this.dataSource.paginator = this.paginator;
  console.log(this.service.stavkeNarudzbenice);
  this.dataSource.data = this.service.stavkeKataloga;
 
}

add(row) {
  this.napraviStavkuNarudzbenice(row);
  if (!this.service.stavkeNarudzbenice.some(st => st.nazivIgracke === this.stavkaNarudzbeniceDto.nazivIgracke)) {
    this.service.dodaj3.next(this.stavkaNarudzbeniceDto);
    this.service.izabranKatalog=true;
    // this.service.formStavke.reset();
  }
}

napraviStavkuNarudzbenice(row){
  
  this.redniBroj = this.service.stavkeNarudzbenice.length+1;
this.stavkaNarudzbeniceDto = {
    stavkaNarudzbeniceId: {
          redniBroj: this.redniBroj
        },
    kolicina:this.service.formStavke.value.kolicina,
    iznos: 0,
    nazivIgracke: row.igracka.naziv,
    opisIgracke: row.igracka.opis,
    cenaIgracke: row.igracka.trenutnaCena,  
  }
  console.log(this.stavkaNarudzbeniceDto);
  this.stavkaNarudzbeniceDto.iznos=this.stavkaNarudzbeniceDto.cenaIgracke*this.stavkaNarudzbeniceDto.kolicina;
  
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
