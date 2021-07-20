import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CameraAction } from './actions/camera.actions';
import { Camera } from '../../models/camera.model';