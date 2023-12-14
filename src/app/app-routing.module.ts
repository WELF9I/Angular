import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembreComponent } from './membre/membre.component';
import { MaterielComponent } from './materiel/materiel.component';


const routes: Routes = [
  {
    component:MembreComponent,path:"membre"
  },
  {
    component:MaterielComponent,path:"materiel"
  },
  {
    component:MembreComponent,path:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
