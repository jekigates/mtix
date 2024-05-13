declare namespace App.Data {
    export type BrandData = {
        id: string
        name: string
    }
    export type CityData = {
        id: string
        name: string
        province_id: string
        province?: App.Data.ProvinceData
        theaters?: Array<App.Data.TheaterData>
    }
    export type GenreData = {
        id: string
        name: string
    }
    export type InfoData = {
        id: string
        title: string
        description: string
        image: string
        created_at: string
        updated_at: string
    }
    export type LocationData = {
        id: string
        name: string
        contact: string
        address: string
        city_id: string
        user_id: string
    }
    export type MovieData = {
        id: string
        title: string
        description: string
        minimum_age: number
        type: string
        producer: string | null
        director: string | null
        writer: string | null
        cast: string | null
        distributor: string | null
        website: string | null
        runtime: number
        image: string
        trailer: string
        screening_start_date: string | null
        screening_end_date: string | null
        genres?: Array<App.Data.GenreData>
        theater_movies?: Array<App.Data.TheaterMovieData>
    }
    export type ProductCategoryData = {
        id: string
        name: string
    }
    export type ProductData = {
        id: string
        name: string
        product_category_id: string
        image: string
    }
    export type PromoData = {
        id: string
        name: string
        description: string
        image: string
        banner_image: string
        valid_start_date: string
        valid_end_date: string
    }
    export type ProvinceData = {
        id: string
        name: string
        cities?: Array<App.Data.CityData>
    }
    export type ShowtimeData = {
        id: string
        theater_movie_id: string
        studio_id: string
        start_at: string
    }
    export type TheaterData = {
        id: string
        location_id: string
        brand_id: string
        location?: App.Data.LocationData
        brand?: App.Data.BrandData
        theater_movies?: Array<App.Data.TheaterMovieData>
        theater_products?: Array<App.Data.TheaterProductData>
    }
    export type TheaterMovieData = {
        id: string
        theater_id: string
        movie_id: string
        price: number
        theater?: App.Data.TheaterData
        showtimes?: Array<App.Data.ShowtimeData>
        movie?: App.Data.MovieData
    }
    export type TheaterProductData = {
        id: string
        theater_id: string
        product_id: string
        product_variant_id: string | null
        stock: number
        product?: App.Data.ProductData
    }
}
