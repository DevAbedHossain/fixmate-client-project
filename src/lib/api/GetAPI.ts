import { IService } from "@/types/Service";
import { IUser } from "@/types/UserType";

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

export const updateUser = async (data: IUser) => {
    const res = await fetch(`${baseURL}/user/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    return res.json();
}