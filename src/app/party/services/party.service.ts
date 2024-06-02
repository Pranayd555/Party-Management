import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { LoginServiceService } from 'src/app/register/services/login-service.service';
import { PARTIES_URL } from 'src/app/shared/constants/urls';
import { Party } from 'src/app/shared/models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient, private toastrService: ToastrService, private loginService: LoginServiceService) { }

  getAllParties(): Observable<Party[]> {
    return this.http.get<Party[]>(PARTIES_URL).pipe(
      map(val => {
        return val as Party[];
      }),
      tap({
        error: err => {
          this.toastrService.error('Error fetching party details');
          
          if(err.status == 401) {
            this.toastrService.error('Authentication failed. Please login again');
          const t = setTimeout(() => {
            clearTimeout(t);
            this.loginService.logout();
          }, 1000);
          
        }
        }
      })
    );
  }

  getPartyById(id: number): Observable<any> {
    return this.http.get<any>(PARTIES_URL + '?id=' + id).pipe(
      tap({
      error: err => {
        this.toastrService.error('Error fetching party details');
        if(err.status == 401) {
          this.toastrService.error('Authentication failed. Please login again');
        const t = setTimeout(() => {
          clearTimeout(t);
          this.loginService.logout();
        }, 1000);
        
      }
      }
    }))
  }

  updateAllPartyData(party: FormData, id: number): Observable<any> {
    return this.http.put<any>((PARTIES_URL + '?id=' + id), party).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            'party has been successfully updated',
          )
        },
        error: (errorResponse) => {
          this.toastrService.error('error updating party, please try again');
        }
      })
    );
  }

  updatePartialPartyData(party: FormData, id:number): Observable<any> {
    return this.http.patch<any>((PARTIES_URL + '?id=' + id), party)
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete<any>(PARTIES_URL + '?id=' + id).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `party has been successfully deleted`,
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error)
        }
      })
    );
  }

  addNewParty(party: FormData): Observable<any> {
    return this.http.post<any>(PARTIES_URL, party).pipe(
      tap({
        next: (data) => {
          if(data.success == 'true' || true)
          this.toastrService.success(
            `party has been successfully Added`,
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(`Error while adding new party. Please try again`);
        }
      }));
  }
}
