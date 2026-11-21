import { IService } from "@/types/Service";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const createService = async (data: IService) => {
    const res = await fetch(`${baseURL}/service`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const getServices = async () => {
    const res = await fetch(`${baseURL}/services`);
    return res.json();
}

export const updateService = async (data: boolean) => {
    const res = await fetch(`${baseURL}/service`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json();
}