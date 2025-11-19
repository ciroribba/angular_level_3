import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  onSearchByCapital(term: string): void {
     console.log({term});
  }
 }
