import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';

export interface UsuarioState {
    id: string | null,
    usuario: Usuario | null,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuarioInitialState: UsuarioState = {
   id: null,
   usuario: null,
   loaded: false,
   loading: false,
   error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state, {id}) => ({ 
        ...state, 
        loading: true,
        id,
        error: null
    })),
    on(cargarUsuarioSuccess, (state, {usuario}) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        usuario: {...usuario},
        error: null
    })),
    on(cargarUsuarioError, (state, {payload}) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usuarioReducer(state: any, action: Action) {
    return _usuarioReducer(state, action);
}