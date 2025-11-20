import { ChangeDetectionStrategy, Component, signal, resource, inject } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList ],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({ params }) => {
      console.log({params});
      if(!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    }
  });
 }
