import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-kupac-delete-dialog',
  templateUrl: './kupac-delete-dialog.component.html',
  styleUrls: ['./kupac-delete-dialog.component.css']
})
export class KupacDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<KupacDeleteDialogComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
