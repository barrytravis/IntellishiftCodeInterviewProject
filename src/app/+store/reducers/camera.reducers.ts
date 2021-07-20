import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CameraActions } from '../actions';
import { Camera } from '../../models/camera.model';