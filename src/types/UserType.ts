export type IRole = "admin" | "customer" | "technician";

export interface IUser {
    _id?: string,
    name: string,
    image: string,
    phone: string,
    location: string,
    bio: string,
}


