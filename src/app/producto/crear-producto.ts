import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  imports: [FormsModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
})
export class CrearProducto implements OnInit {
  nombre = '';
  precio: number = null!;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      (data) => {
        this.router.navigate(['/']).then(() => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        });
      },
      (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
