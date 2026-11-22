export interface IService {
    _id?: string,
    title: string,
    category: 'Smartphone' | 'Laptop & PC' | 'AC' | 'Refrigerator' | 'TV' | 'Washing Machine' | 'Electrical',
    serviceArea: string,
    description: string,
    image: string,
    basePrice: number,
    /** Text such as "2-3 hours" (older services stored a number of hours) */
    estimatedDuration: string | number,
    serviceMode: string,
    isAvailable: boolean,
    approvalStatus: 'pending' | 'approved' | 'rejected',
    technicianEmail: string,
    technicianName: string,
    technicianId: string,
    createdAt?: string,
    /** Average customer rating (1–5) and number of reviews */
    ratingAvg?: number,
    ratingCount?: number,
}

export interface PaginatedServices {
    services: IService[],
    total: number,
    page: number,
    totalPages: number,
}