import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Country } from '../../../../interfaces/country.interface';
import { DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './country-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformation {
  country = input.required<Country>();
  currentYear = computed(() => new Date().getFullYear());
 }
