export interface Country {
    cca2: string;
    flag: string;
    flagSvg: string;
    name: string;
    capital: string;
    population: number;
    region: string;
    subregion: string;
    languages: string[];
    currencies: string[];
    borders: string[];
    flags: {
        png: string;
        svg: string;
    };
    coatOfArms: {
        png: string;
        svg: string;
    };
}