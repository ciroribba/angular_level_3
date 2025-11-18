import { Component } from '@angular/core';

@Component({
  selector: 'by-capital-page',
  imports: [],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  onSearchByCapital(term: string): void {
     console.log({term});
  }
 }
