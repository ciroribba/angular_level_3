import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information/country-information';

@Component({
  selector: 'country-page',
  imports: [ NotFound, CountryInformation ],
  templateUrl: './country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage { 
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
  params: () => ({ code: this.countryCode }),
  stream: ({ params }) => {
    return this.countryService.searchCountryByAlphaCode(params.code);
  },
  });

}
