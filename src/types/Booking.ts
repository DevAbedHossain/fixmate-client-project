export type BookingStatus =
    | "requested"
    | "accepted"
    | "in-progress"
    | "completed"
    | "rejected"
    | "cancelled";

export type PaymentStatus = "unpaid" | "paid";

export interface IBooking {
    _id?: string;

    // Service
    serviceId: string;
    serviceTitle: string;
    basePrice: number;

    // Technician
    technicianEmail: string;
    technicianName: string;

    // Customer
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    preferredDate: string;
    problemDescription: string;

    // Progress
    status: BookingStatus;
    finalAmount?: number;
    paymentStatus?: PaymentStatus;
    paidAt?: string;
    createdAt: string;

    //common
    success?: boolean;
    message?: string;
    data?: any;
}
