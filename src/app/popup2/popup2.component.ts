import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'; 
import { MaterielService } from '../shared/materiel.service';
import { materielmodel } from '../Model/materielmodel';  

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css']
})
export class Popup2Component implements OnInit {
  editdata: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: MaterielService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.api.GetMaterielbycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.materielform.setValue({
          id: this.editdata.id.toString(),
          nom: this.editdata.nom,
          description: this.editdata.description,
          quantite: this.editdata.quantite,
          fonctionne: this.editdata.fonctionne,
        });
      });
    }
  }

  materielform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nom: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    quantite: this.builder.control('', Validators.required),
    fonctionne: this.builder.control(true),
  });

  SaveMateriel() {
    if (this.materielform.valid) {
      const Editid = this.materielform.getRawValue().id;
      if (Editid !== '' && Editid !== null) {
        this.api.UpdateMateriel(Editid, this.materielform.getRawValue()).subscribe(response => {
          this.closepopup();
          Swal.fire('Success', 'Materiel updated successfully.', 'success');
        });
      } else {
        this.api.CreateMateriel(this.materielform.value).subscribe(response => {
          this.closepopup();
          Swal.fire('Success', 'Materiel saved successfully.', 'success');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
