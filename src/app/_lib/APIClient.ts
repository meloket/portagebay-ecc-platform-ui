import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';
import { Pageable }    from './Pageable';
import { PageRequest } from './PageRequest';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class APIClient<T> {

    public constructor(private httpClient: HttpClient, public toastrService: ToastrService) {

    }

    public _getPageable<T>(url: string, dataTablePage?: any): Observable<Pageable<T>> {

        if (dataTablePage) {

            return this.httpClient.get<Pageable<T>>(`${ environment.API_BASE }/${ url }?${ dataTablePage.toParams() }`);

        } else {

            return this.httpClient.get<Pageable<T>>(`${ environment.API_BASE }/${ url }`);

        }

    }

    public get<T>(url: string): Observable<T> {

        return this.httpClient.get<T>(`${ environment.API_BASE }/${ url }`);

    }

    public search<T>(url: string, pageRequest: PageRequest): Observable<any> {

        return this.httpClient.get<T>(`${ environment.API_BASE }/${ url }?terms=${ pageRequest.terms }&limit=${ pageRequest.limit }&offset=${ pageRequest.offset }`);

    }

    public post<T>(url: string, body?: any): Observable<T> {

        try {
            console.log("Posting to URL: " + `${ environment.API_BASE }/${ url }`);
            return this.httpClient.post<T>(`${ environment.API_BASE }/${ url }`, body);

        } catch (e) {
            console.log("Exception while posting");
            console.log(e);

        }

    }

    public put<T>(url: string, body?: any): Observable<T> {

        return this.httpClient.put<T>(`${ environment.API_BASE }/${ url }`, body);

    }

    public delete<T>(url: string): Observable<T> {

        return this.httpClient.delete<T>(`${ environment.API_BASE }/${ url }`);

    }

}
