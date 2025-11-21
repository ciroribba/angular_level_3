import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const BASE_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase(); 
    const url = `${BASE_URL}/capital/${query}`;

    return this.http
    .get<RESTCountry[]>(url)
    .pipe(
      map(restCountries => (CountryMapper.mapRestCountryArrayToCountryArray(restCountries))),
      catchError(error => {
        console.log('Error fetching countries by capital',error);

        return throwError(() => new Error(`No se encontraron países con ese query #${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    query = query.trim().toLowerCase();
    const url = `${BASE_URL}/name/${query}`;

    return this.http
    .get<RESTCountry[]>(url)
    .pipe(
      map(restCountries => (CountryMapper.mapRestCountryArrayToCountryArray(restCountries))),
      delay(2000),
      catchError(error => {
        console.log('Error fetching countries by capital',error);

        return throwError(() => new Error(`No se encontraron países con ese query #${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    
    const url = `${BASE_URL}/alpha/${code}`;

    return this.http
    .get<RESTCountry[]>(url)
    .pipe(
      map(restCountries => (CountryMapper.mapRestCountryArrayToCountryArray(restCountries))),
      map(countries => countries.at(0)),
      catchError(error => {
        console.log('Error fetching countries by capital',error);

        return throwError(() => new Error(`No se encontraron países con ese codigo #${code}`));
      })
    );
  }

}
