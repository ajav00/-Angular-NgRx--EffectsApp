import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';

export interface UsuariosState {
    usuarios: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuariosInitialState: any = {
   usuarios: [],
   loaded: false,
   loading: false,
   error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,

    on(cargarUsuarios, state => ({ ...state, loading: true})),
    on(cargarUsuariosSuccess, (state, {usuarios}) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        usuarios: [...usuarios]
    })),
    on(cargarUsuariosError, (state, {payload}) => ({ 
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

export function usuariosReducer(state: any, action: Action) {
    return _usuariosReducer(state, action);
}