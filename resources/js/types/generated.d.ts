declare namespace App.Data {
    export type CityData = {
        id: string;
        name: string;
        province?: App.Data.ProvinceData;
    };
    export type ProvinceData = {
        id: string;
        name: string;
        cities?: Array<App.Data.CityData>;
    };
    export type UserData = {
        id: string;
        name: string;
        email: string;
        email_verified_at: string;
        phone_number: string;
        address: string;
        province_id: string;
        city_id: string;
        gender: string;
        dob: string;
    };
}
