import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { KupacDto } from '../model/kupac';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatSort, MatDialogConfig } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { KupacFormaService } from '../shared/kupac-forma.service';
import { KupacDialogComponent } from './kupac-dialog/kupac-dialog.component';
import { KupacDeleteDialogComponent } from './kupac-delete-dialog/kupac-delete-dialog.component';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {
  kupci: KupacDto[] = [];
  displayedColumns: string[] = ['kupacId', 'pib', 'naziv', 'adresa', 'kontaktTel','actions'];
  dataSource: MatTableDataSource<any>;

  idFilter = new FormControl('');
  nazivFilter = new FormControl('');
  PIBFilter = new FormControl('');
  adresaFilter = new FormControl('');
  kontaktTelFilter = new FormControl('');
  filterValues = {
    naziv: '',
    pib: '',
    id: '',
    adresa: '',
    kontaktTel: '',
  };

  constructor(private api: ApiService, private dialog: MatDialog, private service: KupacFormaService,
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
    this.api.getAllKupac().subscribe(
      res => {
        this.kupci = res;
        console.log(this.kupci);
        this.dataSource.data = this.kupci;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('Greška prilikom povezivanja na server');
      }

    );

  }

  logData(row) {
    console.log(row);
    console.log(this.kupci);
  }
  applyFilter() {
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.nazivFilter.valueChanges
      .subscribe(
        naziv => {
          this.filterValues.naziv = naziv;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );

    this.PIBFilter.valueChanges
      .subscribe(
        pib => {
          this.filterValues.pib = pib;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.adresaFilter.valueChanges
      .subscribe(
        adresa => {
          this.filterValues.adresa = adresa;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.kontaktTelFilter.valueChanges
      .subscribe(
        kontaktTel => {
          this.filterValues.kontaktTel = kontaktTel;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.create();
    this.dialog.open(KupacDialogComponent, dialogConfig).afterClosed().subscribe(res => {
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
    dialogConfig.width = '60%';
    this.service.update(row);
    this.dialog.open(KupacDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
  delete(row) {
    const index = this.kupci.indexOf(row);
    this.openConfigDialog('Da li ste sigurni da želite da obrišete kupca?').afterClosed().
      subscribe(res => {
        if (res) {
          this.api.deleteKupac(row.kupacId).subscribe(() => {
            this.kupci.splice(index, 1);
            this.dataSource.data = this.kupci;
            this.changeDetectorRefs.detectChanges();
            this.notif.succes('Uspešno izbrisan kupac');
          }, err => {
            this.notif.warn('Nespešno izbrisan kupac');
          });

        }
      })
      ;
  }
  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.view(row);
    this.dialog.open(KupacDialogComponent, dialogConfig);
  }
  openConfigDialog(msg) {
    return this.dialog.open(KupacDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
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
      return data.kupacId.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.naziv.toString().toLowerCase().indexOf(searchTerms.naziv) !== -1
        && data.pib.toString().toLowerCase().indexOf(searchTerms.pib) !== -1
        && data.adresa.toString().toLowerCase().indexOf(searchTerms.adresa) !== -1
        && data.kontaktTel.toString().toLowerCase().indexOf(searchTerms.kontaktTel) !== -1


    };
    return filterFunction;
  }

}
