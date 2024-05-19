export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
    phone_number: string
    address: string
    province_id: string
    city_id: string
    gender: string
    dob: Date
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User
    }
    info: App.Data.InfoData
    infos: App.Data.InfoData[]
    promo: App.Data.PromoData
    promos: App.Data.PromoData[]
    movie: App.Data.MovieData
    movies: App.Data.MovieData[]
    provinces: App.Data.ProvinceData[]
    city: App.Data.CityData
    cities: App.Data.CityData[]
    brands: App.Data.BrandData[]
    theater: App.Data.TheaterData
    showtime: App.Data.ShowtimeData
}
