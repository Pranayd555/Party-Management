import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Party } from "src/app/shared/models/party";
import { PartyService } from "./party.service";
import { Injectable, inject } from "@angular/core";

@Injectable()
export class PartyResolveService {
constructor(private partyService: PartyService) {}
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Party | Observable<Party> | Promise<Party> {
    let id = route.params['id'];
    let party = this.partyService.getPartyById(id);
    return party;
}
}

export const partyResolver: ResolveFn<Party> =  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PartyResolveService).resolve(route, state);
}