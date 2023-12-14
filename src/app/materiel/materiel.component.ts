import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { materielmodel } from '../Model/materielmodel';
import { Popup2Component } from '../popup2/popup2.component';
import { MaterielService } from '../shared/materiel.service';
import Swal from 'sweetalert2'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: MaterielService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  materieldata!: materielmodel[];
  finaldata: any;
  searchTerm: string = '';
  ngOnInit(): void {
    this.LoadMateriel();
  }

  displayColums: string[] = ["id", "nom", "description", "quantite", "fonctionne", "action"];

  Openpopup2(id: any) {
    const _popup2 = this.dialog.open(Popup2Component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    });

    _popup2.afterClosed().subscribe(r => {
      this.LoadMateriel();
    });
  }

  LoadMateriel() {
    this.api.Getallmateriel().subscribe(response => {
      this.materieldata = response;
      this.finaldata = new MatTableDataSource<materielmodel>(this.materieldata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
      this.applySearch();
    });
  }
  applySearch() {
    if (this.searchTerm.trim() === '') {
      this.finaldata = new MatTableDataSource<materielmodel>(this.materieldata);
    } else {
      this.finaldata = new MatTableDataSource<materielmodel>(this.materieldata.filter(materiel =>
        materiel.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
        
      ));
    }

    this.finaldata.paginator = this._paginator;
    this.finaldata.sort = this._sort;
  }

  search() {
    this.applySearch();
  }

  EditMateriel(id: any) {
    this.Openpopup2(id);
  }

  RemoveMateriel(id: any) {
    Swal.fire({
      title: 'Remove Materiel',
      text: 'Do you want to remove this materiel?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.RemoveMaterielbycode(id).subscribe(r => {
          this.LoadMateriel();
          Swal.fire('Removed!', 'Materiel has been removed.', 'success');
        });
      }
    });
  }
}
