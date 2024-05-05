declare namespace App.Data {
    export type CityData = {
        id: string;
        name: string;
        province?: App.Data.ProvinceData;
    };
    export type GenreData = {
        id: string;
        name: string;
    };
    export type MovieData = {
        id: string;
        title: string;
        description: string;
        producer: string | null;
        director: string | null;
        writer: string | null;
        cast: string | null;
        distributor: string | null;
        website: string | null;
        duration: number;
        image: string;
        trailer: string;
        genres?: Array<App.Data.GenreData>;
    };
    export type ProvinceData = {
        id: string;
        name: string;
        cities?: Array<App.Data.CityData>;
    };
}
