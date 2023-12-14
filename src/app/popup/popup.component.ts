import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'; 
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.api.GetMembrebycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.membreform.setValue({
          id: this.editdata.id.toString(),
          prenom: this.editdata.prenom,
          nom: this.editdata.nom,
          cin: this.editdata.cin,
          tel: this.editdata.tel,
          email: this.editdata.email,
          isactive: this.editdata.isactive
        });
      });
    }
  }

  membreform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    prenom: this.builder.control('', Validators.required),
    nom: this.builder.control('', Validators.required),
    cin: this.builder.control('', Validators.required),
    tel: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    isactive: this.builder.control(true),
  });

  SaveMembre() {
    if (this.membreform.valid) {
      const Editid = this.membreform.getRawValue().id;
      if (Editid !== '' && Editid !== null) {
        this.api.UpdateMembre(Editid, this.membreform.getRawValue()).subscribe(response => {
          this.closepopup();
          Swal.fire('Success', 'Membre updated successfully.', 'success');
        });
      } else {
        this.api.CreateMembre(this.membreform.value).subscribe(response => {
          this.closepopup();
          Swal.fire('Success', 'Membre saved successfully.', 'success');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
