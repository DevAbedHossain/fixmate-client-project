export interface IBookingRequest {
    serviceId: string,
    userEmail: string,
    price: number,
    duration: number,
    userId: string,
    status?: "requested" | "accepted" | "rejected" | "completed" | "in-progress",
}