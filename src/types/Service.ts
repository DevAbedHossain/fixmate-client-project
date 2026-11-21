export interface IService {
    _id?: string,
    title: string,
    category: 'Smartphone' | 'Laptop & PC' | 'AC' | 'Refrigerator' | 'TV' | 'Washing Machine' | 'Electrical',
    serviceArea: string,
    description: string,
    image: string,
    basePrice: number,
    estimatedDuration: number,
    serviceMode: string,
    isAvailable: boolean,
    approvalStatus: 'pending' | 'approved' | 'rejected',
    technicianEmail: string,
    technicianName: string,
    technicianId: string,

}