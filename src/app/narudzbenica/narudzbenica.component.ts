import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NarudzbenicaDto } from '../model/narudzbenica';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatSort, MatDialogConfig } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { NarudzbenicaDialogComponent } from './narudzbenica-dialog/narudzbenica-dialog.component';
import { NarudzbenicaDeleteDialogComponent } from './narudzbenica-delete-dialog/narudzbenica-delete-dialog.component';
import { NarudzbenicaFormaService } from '../shared/narudzbenica-forma.service';

@Component({
  selector: 'app-narudzbenica',
  templateUrl: './narudzbenica.component.html',
  styleUrls: ['./narudzbenica.component.css']
})
export class NarudzbenicaComponent implements OnInit {

  narudzbenice: NarudzbenicaDto[] = [];
  displayedColumns: string[] = ['narudzbenicaId', 'datum', 'ukupanIznos', 'status', 'kupac', 'katalog', 'actions'];
  dataSource: MatTableDataSource<any>;
  idFilter = new FormControl('');
  datumFilter = new FormControl('');
  ukupanIznosFilter = new FormControl('');
  statusFilter = new FormControl('');
  kupacFilter = new FormControl('');
  katalogFilter = new FormControl('');
  filterValues = {
    ukupanIznos: '',
    datum: '',
    kupac: '',
    katalog: '',
    status: '',
    id: '',


  };

  constructor(private api: ApiService, private dialog: MatDialog, private service: NarudzbenicaFormaService,
              private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.tableFilter();
    this.getAll();
    this.applyFilter();
  }
  getAll() {
    this.api.getAllNarudzbenica().subscribe(
      res => {
        this.narudzbenice = res;
        this.dataSource.data = this.narudzbenice;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('Greška prilikom povezivanja na server');
        location.reload();
      }

    );

  }
  logData(row) {
  }
  applyFilter() {
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.ukupanIznosFilter.valueChanges
      .subscribe(
        ukupanIznos => {
          this.filterValues.ukupanIznos = ukupanIznos;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.datumFilter.valueChanges
      .subscribe(
        datum => {
          this.filterValues.datum = datum;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.kupacFilter.valueChanges
      .subscribe(
        kupac => {
          this.filterValues.kupac = kupac;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.katalogFilter.valueChanges
      .subscribe(
        katalog => {
          this.filterValues.katalog = katalog;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.statusFilter.valueChanges
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.service.create();
    this.dialog.open(NarudzbenicaDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
  edit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.service.update(row);
    this.dialog.open(NarudzbenicaDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }

  delete(row) {
    const index = this.narudzbenice.indexOf(row);
    this.openConfigDialog('Da li ste sigurni da želite da obrišete narudzbenicu?').afterClosed().
      subscribe(res => {
        if (res) {
          this.api.deleteNarudzbenica(row.narudzbenicaId).subscribe(() => {
            this.narudzbenice.splice(index, 1);
            this.dataSource.data = this.narudzbenice;
            this.changeDetectorRefs.detectChanges();
            this.notif.succes('Uspešno izbrisana narudzbenica');
          },
            err => {
              this.notif.warn('Neuspešno izbrisana narudzbenica');
            });
        }
      })
      ;
  }

  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.service.view(row);
    this.dialog.open(NarudzbenicaDialogComponent, dialogConfig);
  }

  openConfigDialog(msg) {
    return this.dialog.open(NarudzbenicaDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
  }
  priprema(row) {
    if (row.status === 'U pripremi') {
      return true;
    }
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key] || '', item);
    }
    return item[property];
  }
  tableFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line: only-arrow-functions
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.narudzbenicaId.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.ukupanIznos.toString().toLowerCase().indexOf(searchTerms.ukupanIznos) !== -1
        && data.datum.toString().toLowerCase().indexOf(searchTerms.datum) !== -1
        && data.kupac.naziv.toString().toLowerCase().indexOf(searchTerms.kupac) !== -1
        && data.katalog.naziv.toString().toLowerCase().indexOf(searchTerms.katalog) !== -1
        && data.status.toString().toLowerCase().indexOf(searchTerms.status) !== -1;

    };
    return filterFunction;
  }

}
