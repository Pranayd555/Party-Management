import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";
import { PartyService } from "src/app/party/services/party.service";
import { addParty, addPartyFailure, addPartySuccess, deleteParty, deletePartyFailure, deletePartySuccess, getParties, getPartiesSuccess, getPartisFailure, updateAllParty, updateAllPartySuccess, updateParty, updatePartyFailure, updatePartySuccess } from "../actions/party.action";
import { Party } from "src/app/shared/models/party";
import { Store } from "@ngrx/store";
import { PartyState } from "../reducers/party.reducer";



@Injectable()
export class PartyEffects {

    constructor( private actions$: Actions, private partyService: PartyService, private store: Store<PartyState>) {}

    // get all parties
    loadParties$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getParties),
            mergeMap(() => this.partyService.getAllParties().pipe(
                map(
                    (parties: Party[]) => getPartiesSuccess(parties)
                ),
                catchError(err => of(getPartisFailure(err)))
            ))
        )
    })

    // add a new party
    addParty$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addParty),
            exhaustMap((newParty: {partyForm: FormData, party: Party}) => this.partyService.addNewParty(newParty.partyForm).pipe(
                map(
                    () => addPartySuccess(newParty.party)
                ),
                catchError(err => of(addPartyFailure()))
            ))
        )
    })

    // update partial data
    updateParty$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateParty),
            concatMap((newParty: {partyForm: FormData, id: number, party: Party}) => this.partyService.updatePartialPartyData(newParty.partyForm, newParty.id).pipe(
                map(
                    () => updatePartySuccess(newParty.party) // get all updated store data
                ),
                catchError(err => of(updatePartyFailure()))
            ))
        )
    })

    // update all party data
    updateallParty$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateAllParty),
            concatMap((newParty: {partyForm: FormData, id: number, party: Party}) => this.partyService.updateAllPartyData(newParty.partyForm, newParty.id).pipe(
                map(
                    () => updateAllPartySuccess(newParty.party)
                ),
                catchError(err => of(updatePartyFailure()))
            ))
        )
    })


    // delete party
    deleteParty$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteParty),
            mergeMap((partyId: {id: number, party: Party}) => this.partyService.deleteParty(partyId.id).pipe(
                map(
                    () => deletePartySuccess(partyId.party)
                ),
                catchError(() => of(deletePartyFailure()))
            ))
        )
    })
}