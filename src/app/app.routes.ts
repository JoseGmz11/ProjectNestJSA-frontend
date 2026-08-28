import { Routes } from '@angular/router';
import { ListaProducto} from './producto/lista-producto'
import { EditarProducto } from './producto/editar-producto';
import { CrearProducto } from './producto/crear-producto';
import { DetalleProducto } from './producto/detalle-producto';

export const routes: Routes = [
  { path: '', component: ListaProducto },
  { path: 'detalle/:id', component: DetalleProducto },
  { path: 'nuevo', component: CrearProducto },
  { path: 'editar/:id', component: EditarProducto },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
