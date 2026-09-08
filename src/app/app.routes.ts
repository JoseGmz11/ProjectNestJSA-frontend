import { Routes } from '@angular/router';
import { ListaProducto} from './producto/lista-producto'
import { EditarProducto } from './producto/editar-producto';
import { CrearProducto } from './producto/crear-producto';
import { DetalleProducto } from './producto/detalle-producto';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login},
  { path: 'registro', component: Register},

  { path: '', component: ListaProducto, canActivate: [authGuard] },
  { path: 'detalle/:id', component: DetalleProducto, canActivate: [authGuard] },
  { path: 'nuevo', component: CrearProducto, canActivate: [authGuard] },
  { path: 'editar/:id', component: EditarProducto, canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
