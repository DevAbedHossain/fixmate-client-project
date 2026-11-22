import { IUser } from "@/types/UserType";

import { baseURL } from "./config";

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
