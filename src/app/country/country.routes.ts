import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layout/CountryLayout/CountryLayout.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPage } from './pages/by-country-page/by-country-page';
import { ByRegionPage } from './pages/by-region-page/by-region-page';
import { CountryPage } from './pages/country-page/country-page';

export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPageComponent,
            },
            {
                path: 'by-country',
                component: ByCountryPage,
            },
            {
                path: 'by-region',
                component: ByRegionPage,
            },
            {
                path: 'by/:code',
                component: CountryPage,
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ],
    },
   
];

export default countryRoutes;
