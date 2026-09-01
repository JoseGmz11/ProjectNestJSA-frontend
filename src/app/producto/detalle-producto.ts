import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  imports: [ RouterModule ],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})
export class DetalleProducto implements OnInit{

  producto?: Producto;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('1. ID capturado de la URL:', id);
    this.productoService.detail(id).subscribe(
      data => {
        console.log('2. Datos recibidos con éxito:', data);
        this.producto = data;
        this.cdr.detectChanges();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
        console.log('Error completo',err);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
