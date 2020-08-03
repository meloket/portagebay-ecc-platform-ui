import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private countriesInfoURL: string = '../../assets/countries-info.json';
    private countriesCodesURL: string = '../../assets/countries-codes.json';
    private worldLanguagesURL: string = '../../assets/world-languages.json';

    constructor(private http: HttpClient) { }

    allCountries(): Observable<any> {
        return this.http.get(this.countriesInfoURL);
    }

    allCountryCodes(): Observable<any> {
        return this.http.get(this.countriesCodesURL);
    }

    allLanguages(): Observable<any> {
        return this.http.get(this.worldLanguagesURL);
    }
}
