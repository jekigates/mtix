export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    phone_number: string;
    address: string;
    province_id: string;
    city_id: string;
    gender: string;
    dob: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    promos: App.Data.PromoData[];
    movies: App.Data.MovieData[];
    provinces: App.Data.ProvinceData[];
};
