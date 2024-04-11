export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    phone_number: string;
    address: string;
    province: string;
    city: string;
    gender: string;
    dob: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
