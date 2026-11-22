export type IRole = "admin" | "customer" | "technician";

export interface IUser {
    _id?: string,
    name: string,
    image: string,
    phone: string,
    area: string,
    bio: string,
    /** Older profiles saved the area as `location` */
    location?: string,
}

/** Row in the admin "Manage Users" table */
export interface IAdminUser {
    _id: string,
    name: string,
    email: string,
    image?: string,
    role: IRole,
    createdAt?: string,
}
