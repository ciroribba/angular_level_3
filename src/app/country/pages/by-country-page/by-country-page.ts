import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
//import { firstValueFrom, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList ],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
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
      return this.countryService.searchByCountry(params.query);
    },

    // opcional, pero muy cómodo para evitar undefined en templates
    defaultValue: [],
  });

  // computed para obtener el valor del resource.
  //  Es un Signal derivado que transforma el value() del rxResource en algo siempre seguro, estable y fácil de usar en el template.
  countries = computed(() => this.countryResource.value() ?? []);

  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({ params }) => {
  //     console.log({params});
  //     if(!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     );
  //   }
  // });
 }
