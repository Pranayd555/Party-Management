import { createReducer, on } from "@ngrx/store";
import * as partyAction from "../actions/party.action";
import { Party } from "src/app/shared/models/party";

export interface PartyState {
    parties: ReadonlyArray<Party>;
}

const initialState: PartyState = {
    parties: []
};

export const partyReducer = createReducer(
    initialState,
    on(partyAction.getPartiesSuccess, (state, parties) => ({
        ...state,
        parties: Object.values(parties).filter( v => typeof v !== 'string')
    })),
    on(partyAction.addPartySuccess, (state, party) => ({
        ...state,
        parties: [...state.parties, party]
    })),
    on(partyAction.updatePartySuccess, (state, party) => ({
        ...state,
        parties: state.parties.map( p => 
            (p.id == party.id) ? {...p, ...party}: p
            )
    })),
    on(partyAction.updateAllPartySuccess, (state, party) => ({
        ...state,
        parties: state.parties.map( p => 
            (p.id == party.id) ? party: p
            )
    })),
    on(partyAction.deletePartySuccess, (state, party) => ({
        ...state,
        parties: state.parties.filter(p => p.id != party.id)
    }))
);