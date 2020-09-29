import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { KupacFormaService } from 'src/app/shared/kupac-forma.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/shared/notifications.service';

@Component({
  selector: 'app-kupac-dialog',
  templateUrl: './kupac-dialog.component.html',
  styleUrls: ['./kupac-dialog.component.css']
})
export class KupacDialogComponent implements OnInit {
  constructor(private api: ApiService, private service: KupacFormaService, public dialogRef: MatDialogRef<KupacDialogComponent>,
    private notif: NotificationsService) { }

ngOnInit() {
}
save() {
this.api.saveKupac(this.service.form.value).subscribe(res => {
this.notif.succes('Uspešno sačuvan kupac');
}, err => {
this.notif.warn('Neuspešno sačuvan kupac');
});
this.service.form.reset();
this.service.initializeFormGroup();
this.close();
}
update() {
this.api.updateKupac(this.service.form.value).subscribe(res => {
this.notif.succes('Uspešno izmenjen kupac');

}, err => {
this.notif.warn('Neuspešno izmenjen kupac');
});
this.service.form.reset();
this.service.initializeFormGroup();
this.close();

}
clear() {
this.service.form.reset();
this.service.initializeFormGroup();
}
close() {
this.service.form.reset();
this.service.initializeFormGroup();
this.dialogRef.close();
}

}
