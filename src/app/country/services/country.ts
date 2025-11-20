import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable } from 'rxjs';
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
      map(restCountries => restCountries.map(CountryMapper.mapRestCountryToCountry))
    );
  }

}
