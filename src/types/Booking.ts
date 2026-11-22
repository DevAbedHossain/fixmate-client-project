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
    serviceImage?: string;
    category?: string;
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

    // Job timeline (optional feature)
    statusHistory?: { status: BookingStatus | "paid"; changedAt: string }[];

    // Rating & review after payment (optional feature)
    rating?: number;
    review?: string;
    reviewedAt?: string;
}

export interface IReview {
    _id: string;
    customerName: string;
    rating: number;
    review?: string;
    reviewedAt: string;
}
