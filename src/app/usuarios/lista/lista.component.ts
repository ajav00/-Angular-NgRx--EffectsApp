import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios : Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe((user: Usuario[]) => this.usuarios = user );
    this.store.select('usuarios').subscribe( ({usuarios, loading, error}) => {
      this.usuarios = usuarios;
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch( cargarUsuarios() );
  }

}
