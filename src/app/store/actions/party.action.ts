import { createAction, props } from '@ngrx/store';
import { Party } from 'src/app/shared/models/party';


//get parties actions
export const getParties = createAction('[Party] get parties');
export const getPartiesSuccess = createAction(
  '[Party] get parties success',
    (parties: ReadonlyArray<Party>) => parties
);
export const getPartisFailure = createAction(
    '[Party] get parties failure',
  props<any>()
  );

// add party actions
export const addParty = createAction(
  '[Party] add party',
  (data: {partyForm: FormData, party: Party}) => data
);
export const addPartySuccess = createAction(
  '[Party] add party success',
  (party: Party) => party
);
export const addPartyFailure = createAction('[Party] add party failure');

// update partial party actions
export const updateParty = createAction(
    '[Party] update party',
    (data: {partyForm: FormData, id: number, party: Party}) => data
  );
  export const updatePartySuccess = createAction(
    '[Party] update party success',
    (party: Party) => party
  );
  export const updatePartyFailure = createAction('[Party] update party failure');

  
// update all party data actions
export const updateAllParty = createAction(
  '[Party] update all party',
  (data: {partyForm: FormData, id: number, party: Party}) => data
);
export const updateAllPartySuccess = createAction(
  '[Party] update all party success',
  (party: Party) => party
);
export const updateAllPartyFailure = createAction('[Party] update all party failure');

  
// delete party actions
export const deleteParty = createAction(
  '[Party] delete party',
  (partyId: {id: number, party: Party}) => partyId
);
export const deletePartySuccess = createAction(
  '[Party] delete party success',
  (party: Party) => party
);
export const deletePartyFailure = createAction('[Party] delete party failure');
