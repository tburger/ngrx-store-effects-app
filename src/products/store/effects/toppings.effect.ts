import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';



@Injectable()
export class ToppingEffects{
    constructor(private actions$:Actions, private toppingService: fromServices.ToppingsService){}

    @Effect()
    loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
        switchMap(()=>{
            return this.toppingService.getToppings().pipe(
                map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
                catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
            );
        })
    )
}

