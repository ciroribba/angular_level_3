import { Component, inject, signal, resource } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
//import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({ params }) => {
      console.log({params});
      if(!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    }
  });

  // isLoading = signal(false);
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])

  // onSearchByCapital(query: string): void {
  //   if(this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //    console.log({query});
  //    this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       this.countries.set([]);
  //       this.isError.set(error);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     }
  //    });
  // }
 }
