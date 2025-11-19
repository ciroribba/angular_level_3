import { Component, output, input} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput { 
  placeholder = input<string>('Buscar');
  value = output<string>();
}
