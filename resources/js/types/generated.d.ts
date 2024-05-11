declare namespace App.Data {
    export type BrandData = {
        id: string;
        name: string;
    };
    export type CityData = {
        id: string;
        name: string;
        province_id: string;
        province?: App.Data.ProvinceData;
        theaters?: Array<App.Data.TheaterData>;
    };
    export type GenreData = {
        id: string;
        name: string;
    };
    export type LocationData = {
        id: string;
        name: string;
        contact: string;
        address: string;
        city_id: string;
        user_id: string;
    };
    export type MovieData = {
        id: string;
        title: string;
        description: string;
        minimum_age: number;
        type: string;
        producer: string | null;
        director: string | null;
        writer: string | null;
        cast: string | null;
        distributor: string | null;
        website: string | null;
        runtime: number;
        image: string;
        trailer: string;
        screening_start_date: string | null;
        screening_end_date: string | null;
        genres?: Array<App.Data.GenreData>;
    };
    export type PromoData = {
        id: string;
        name: string;
        description: string;
        image: string;
        banner_image: string;
    };
    export type ProvinceData = {
        id: string;
        name: string;
        cities?: Array<App.Data.CityData>;
    };
    export type TheaterData = {
        id: string;
        location_id: string;
        brand_id: string;
        location?: App.Data.LocationData;
    };
}
