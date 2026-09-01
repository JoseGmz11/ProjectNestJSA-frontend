import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-producto',
  imports: [RouterModule],
  templateUrl: './lista-producto.html',
  styleUrl: './lista-producto.css',
})
export class ListaProducto implements OnInit{
  productos: Producto[] = []

  listaVacia: string | undefined = undefined;

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ){  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
        if (this.productos.length === 0) {
            this.listaVacia = 'No hay productos registrados';
        } else {
            this.listaVacia = undefined;
        }
        this.cdr.detectChanges();
      },
      err => {
        this.listaVacia = err.error.message;
        this.cdr.detectChanges();
      }
    );
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sip',
      cancelButtonText: 'Nops'
    }).then((result) => {
      if (result.value) {
        this.productoService.delete(id).subscribe(res => {
          this.cargarProductos();
        });
        Swal.fire(
          'OK',
          'Producto eliminado',
          'success'
        );
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Producto a salvo',
          'error'
        );
      }
    });
  }
}
