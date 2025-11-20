import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  countries = input.required<Country[]>();
 }
