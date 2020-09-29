import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { NarudzbenicaFormaService } from 'src/app/shared/narudzbenica-forma.service';
import { StavkaNarudzbeniceDto } from 'src/app/model/stavkaNarudzbenice';

@Component({
  selector: 'app-tabela-stavke',
  templateUrl: './tabela-stavke.component.html',
  styleUrls: ['./tabela-stavke.component.css']
})
export class TabelaStavkeComponent implements OnInit {
  displayedColumns: string[] = ['redniBroj', 'naziv', 'cena','kolicina', 'iznos', 'opis', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.service.stavkeNarudzbenice);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(private service: NarudzbenicaFormaService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.pripremi();
    this.service.dodaj3.asObservable().subscribe((data) => {
      console.log(this.service.stavkeNarudzbenice);
      this.dataSource.data = this.service.stavkeNarudzbenice;
    });
  }
  pripremi() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    console.log(this.service.stavkeNarudzbenice);
    this.dataSource.data = this.service.stavkeNarudzbenice;
    this.dataSource.filterPredicate = (dto: StavkaNarudzbeniceDto, filter: string) => {
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
  }
  delete(row) {
    const index = this.service.stavkeNarudzbenice.indexOf(row);
    this.service.stavkeNarudzbenice.splice(index, 1);
    this.dataSource.data = this.service.stavkeNarudzbenice;
    this.changeDetectorRefs.detectChanges();
    for (let i = 0; i < this.service.stavkeNarudzbenice.length; i++) {
      this.service.stavkeNarudzbenice[i].stavkaNarudzbeniceId.redniBroj = i + 1;
  }
  if(this.service.stavkeNarudzbenice.length==0){
    this.service.izabranKatalog=false;
  }
  }

  edit(row) {
    console.log(row);
    this.service.populateFormStavke(row);
    this.service.postoji=true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
