import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-narudzbenica-delete-dialog',
  templateUrl: './narudzbenica-delete-dialog.component.html',
  styleUrls: ['./narudzbenica-delete-dialog.component.css']
})
export class NarudzbenicaDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NarudzbenicaDeleteDialogComponent  >) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }


}
