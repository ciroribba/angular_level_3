import { Component, inject, signal, computed } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
//import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource<Country[], { query: string }>({
    // de dónde salen los params
    params: () => ({ query: this.query() }),

    // el stream devuelve directamente el Observable
    stream: ({ params }) => {
      console.log({ params });

      if (!params.query) {
        // sin búsqueda → lista vacía
        return of<Country[]>([]);
      }

      // con búsqueda → llamamos al servicio que ya devuelve Observable<Country[]>
      return this.countryService.searchByCapital(params.query);
    },

    // opcional, pero muy cómodo para evitar undefined en templates
    defaultValue: [],
  });

  countries = computed(() => this.countryResource.value() ?? []);


  //usando resource
  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({ params }) => {
  //     console.log({params});
  //     if(!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     );
  //   }
  // });

  //usando forma tradicional
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
