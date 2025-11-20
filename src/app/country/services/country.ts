import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const BASE_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.http
    .get<RESTCountry[]>(`${BASE_URL}/capital/${query}`)
    .pipe(
      map(restCountries => restCountries.map(CountryMapper.mapRestCountryToCountry)),
      catchError(error => {
        console.log('Error fetching countries by capital',error);

        return throwError(() => new Error(`No se encontraron países con ese query #${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.http
    .get<RESTCountry[]>(`${BASE_URL}/name/${query}`)
    .pipe(
      map(restCountries => restCountries.map(CountryMapper.mapRestCountryToCountry)),
      catchError(error => {
        console.log('Error fetching countries by capital',error);

        return throwError(() => new Error(`No se encontraron países con ese query #${query}`));
      })
    );
  }

}
