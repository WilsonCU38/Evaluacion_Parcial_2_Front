import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Miembro } from './miembro/miembro';
import { MiembroCreate } from './miembro-create/miembro-create';
import { MiembroEdit } from './miembro-edit/miembro-edit';
import { Entrenador } from './entrenador/entrenador';
import { EntrenadorCreate } from './entrenador-create/entrenador-create';
import { EntrenadorEdit } from './entrenador-edit/entrenador-edit';
import { Sesion } from './sesion/sesion';
import { SesionCreate } from './sesion-create/sesion-create';
import { SesionEdit } from './sesion-edit/sesion-edit';
import { Autenticacion } from './autenticacion/autenticacion';
import { autenticacionGuard } from './guard/autenticacion.guard';

export const routes: Routes = [
    {
        path: '',
        component: Autenticacion,
        pathMatch: "full"
    },
    {
        path: 'menu',
        component: Menu,
        pathMatch: "full",
        canActivate: [autenticacionGuard]
    },
    {
        path: 'miembro',
        component: Miembro,
        pathMatch: "full",
        canActivate: [autenticacionGuard]
    }
    ,
    {
        path: 'miembro/create',
        component: MiembroCreate,
        pathMatch: "full",
        canActivate: [autenticacionGuard]
    },
    {
        path: 'miembro/edit/:miembroId',
        component: MiembroEdit,
        pathMatch: "full",
        canActivate: [autenticacionGuard]
    }, {
        path: 'entrenador',
        component: Entrenador,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    },
    {
        path: 'entrenador/create',
        component: EntrenadorCreate,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    },
    {
        path: 'entrenador/edit/:entrenadorId',
        component: EntrenadorEdit,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    },
    {
        path: 'sesion',
        component: Sesion,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    },
    {
        path: 'sesion/create',
        component: SesionCreate,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    },
    {
        path: 'sesion/edit/:sesionId',
        component: SesionEdit,
        pathMatch: 'full',
        canActivate: [autenticacionGuard]
    }
];
