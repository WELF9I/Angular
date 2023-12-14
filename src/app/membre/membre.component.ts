import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { membremodel } from '../Model/membremodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  membredata!: membremodel[];
  finaldata: any;
  searchTerm: string = '';
  ngOnInit(): void {
    this.LoadMembre();
  }

  displayColums: string[] = ["id", "prenom", "nom", "cin", "tel", "email", "isactive", "action"];

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    });

    _popup.afterClosed().subscribe(r => {
      this.LoadMembre();
    });
  }

  LoadMembre() {
    this.api.Getallmembre().subscribe(response => {
      this.membredata = response;
      this.finaldata = new MatTableDataSource<membremodel>(this.membredata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
      this.applySearch();
    });
  }
  applySearch() {
    if (this.searchTerm.trim() === '') {
      this.finaldata = new MatTableDataSource<membremodel>(this.membredata);
    } else {
      this.finaldata = new MatTableDataSource<membremodel>(this.membredata.filter(member =>
        member.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
        
      ));
    }

    this.finaldata.paginator = this._paginator;
    this.finaldata.sort = this._sort;
  }

  search() {
    this.applySearch();
  }

  EditMembre(id: any) {
    this.Openpopup(id);
  }

  RemoveMembre(id: any) {
    Swal.fire({
      title: 'Remove Membre',
      text: 'Do you want to remove this membre?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.RemoveMembrebycode(id).subscribe(r => {
          this.LoadMembre();
          Swal.fire('Removed!', 'Membre has been removed.', 'success');
        });
      }
    });
  }
}
